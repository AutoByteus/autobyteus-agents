#!/usr/bin/env node
// Sends one user message to a member of a running Team or Org in a (preferably isolated) AutoByteus app,
// then records the socket events for a while. Usage:
//   node send-message.mjs --port <serverPort> --kind team|org --run <teamRunId|orgRunId>
//        --agent <member agentRunId> --text "<message>" [--seconds 20] [--log <events.jsonl>]
//        [--ws-module <path to a package.json whose node_modules has "ws">]
import { createRequire } from "node:module";
import { appendFileSync, writeFileSync } from "node:fs";

const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, value, i, all) =>
  (value.startsWith("--") ? [...pairs, [value.slice(2), all[i + 1]]] : pairs), []));
for (const key of ["port", "kind", "run", "agent", "text"]) {
  if (!args[key]) { console.error(`missing --${key}`); process.exit(2); }
}
const require = createRequire(args["ws-module"] ?? import.meta.url);
const WebSocket = require("ws");
const log = args.log ?? "live-check-events.jsonl";
writeFileSync(log, "");
const id = `live-check-${Date.now()}`;
const message = args.kind === "org"
  ? { type: "SEND_MESSAGE", payload: { root_subject_kind: "agent_org", root_run_id: args.run, target_agent_run_id: args.agent,
      command_id: id, content: args.text, context_file_paths: [], image_urls: [], message_id: id, dedupe_key: id } }
  : { type: "SEND_MESSAGE", payload: { agent_run_id: args.agent, content: args.text, context_file_paths: [], image_urls: [],
      message_id: id, dedupe_key: id } };
const path = args.kind === "org" ? `/ws/agent-org/${args.run}` : `/ws/agent-team/${args.run}`;
const ws = new WebSocket(`ws://127.0.0.1:${args.port}${path}`);
let sent = false;
ws.on("message", (raw) => {
  appendFileSync(log, `${raw}\n`);
  const event = JSON.parse(raw.toString());
  if (!sent && event.type === "CONNECTED") { sent = true; ws.send(JSON.stringify(message)); console.log("sent"); }
  if (/ACK|ERROR/.test(event.type)) console.log(raw.toString().slice(0, 300));
});
ws.on("error", (error) => { console.error(error.message); process.exit(1); });
setTimeout(() => { ws.close(); process.exit(sent ? 0 : 1); }, Number(args.seconds ?? 20) * 1000);
