#!/usr/bin/env node
// Sends one user message to an agent run, or to a member of a Team or Org run, in a (preferably isolated)
// AutoByteus app, then records the socket events for a while. Usage:
//   node send-message.mjs --port <serverPort> --kind agent --agent <agentRunId> --text "<message>"
//   node send-message.mjs --port <serverPort> --kind team|org --run <teamRunId|orgRunId>
//        --agent <member agentRunId> --text "<message>"
//   options: [--text-file <path> instead of --text] [--seconds 20] [--log <events.jsonl>]
//        [--ws-module <path to a package.json whose node_modules has "ws">]
import { createRequire } from "node:module";
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";

const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, value, i, all) =>
  (value.startsWith("--") ? [...pairs, [value.slice(2), all[i + 1]]] : pairs), []));
if (!["agent", "team", "org"].includes(args.kind)) { console.error("--kind must be agent, team or org"); process.exit(2); }
for (const key of args.kind === "agent" ? ["port", "agent"] : ["port", "run", "agent"]) {
  if (!args[key]) { console.error(`missing --${key}`); process.exit(2); }
}
const text = args.text ?? (args["text-file"] && readFileSync(args["text-file"], "utf8"));
if (!text) { console.error("missing --text or --text-file"); process.exit(2); }
const require = createRequire(args["ws-module"] ?? import.meta.url);
const WebSocket = require("ws");
const log = args.log ?? "live-check-events.jsonl";
writeFileSync(log, "");
const id = `live-check-${Date.now()}`;
const common = { content: text, context_file_paths: [], image_urls: [], message_id: id, dedupe_key: id };
const routes = {
  agent: [`/ws/agent/${args.agent}`, common],
  team: [`/ws/agent-team/${args.run}`, { agent_run_id: args.agent, ...common }],
  org: [`/ws/agent-org/${args.run}`, { root_subject_kind: "agent_org", root_run_id: args.run,
    target_agent_run_id: args.agent, command_id: id, ...common }],
};
const [path, payload] = routes[args.kind];
const ws = new WebSocket(`ws://127.0.0.1:${args.port}${path}`);
let sent = false;
ws.on("message", (raw) => {
  appendFileSync(log, `${raw}\n`);
  const event = JSON.parse(raw.toString());
  if (!sent && event.type === "CONNECTED") {
    sent = true;
    ws.send(JSON.stringify({ type: "SEND_MESSAGE", payload }));
    console.log("sent");
  }
  if (/ACK|ERROR/.test(event.type)) console.log(raw.toString().slice(0, 300));
});
ws.on("error", (error) => { console.error(error.message); process.exit(1); });
setTimeout(() => { ws.close(); process.exit(sent ? 0 : 1); }, Number(args.seconds ?? 20) * 1000);
