// Sends one user message to an Org member over the isolated instance's Org socket and records events.
import { createRequire } from "node:module";
import { writeFileSync, appendFileSync } from "node:fs";
const require = createRequire("/Users/normy/autobyteus_org/autobyteus-workspace-superrepo/autobyteus-server-ts/package.json");
const WebSocket = require("ws");
const [port, orgRunId, target, content, seconds] = process.argv.slice(2);
const log = "/tmp/aorg-probe/events.jsonl"; writeFileSync(log, "");
const ws = new WebSocket(`ws://127.0.0.1:${port}/ws/agent-org/${orgRunId}`);
ws.on("message", (raw) => { appendFileSync(log, raw.toString() + "\n");
  const m = JSON.parse(raw.toString());
  if (m.type === "CONNECTED") {
    const id = `probe-${Date.now()}`;
    ws.send(JSON.stringify({ type: "SEND_MESSAGE", payload: { root_subject_kind: "agent_org", root_run_id: orgRunId, target_agent_run_id: target, command_id: id, content, context_file_paths: [], image_urls: [], message_id: id, dedupe_key: id } }));
  }
  if (m.type === "AGENT_COMMAND_ACK") console.log("ACK", JSON.stringify(m.payload));
});
setTimeout(() => { ws.close(); process.exit(0); }, Number(seconds) * 1000);
