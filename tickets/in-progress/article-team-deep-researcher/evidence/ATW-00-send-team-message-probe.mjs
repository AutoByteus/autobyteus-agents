// Sends one user message to a team member over the isolated instance's team socket and records events.
import { createRequire } from "node:module";
import { writeFileSync, appendFileSync } from "node:fs";
const require = createRequire("/Users/normy/autobyteus_org/autobyteus-workspace-superrepo/autobyteus-server-ts/package.json");
const WebSocket = require("ws");
const [port, teamRunId, agentRunId, content, seconds] = process.argv.slice(2);
const log = "/tmp/atdr-probe/events.jsonl"; writeFileSync(log, "");
const ws = new WebSocket(`ws://127.0.0.1:${port}/ws/agent-team/${teamRunId}`);
let sent = false;
ws.on("message", (raw) => { appendFileSync(log, raw.toString() + "\n");
  const m = JSON.parse(raw.toString());
  if (!sent && (m.type === "CONNECTED" || m.type === "TEAM_SNAPSHOT" || m.type)) { sent = true;
    const id = `probe-${Date.now()}`;
    ws.send(JSON.stringify({ type: "SEND_MESSAGE", payload: { agent_run_id: agentRunId, content, context_file_paths: [], image_urls: [], message_id: id, dedupe_key: id } }));
    console.log("sent after", m.type);
  }
  if (m.type === "ERROR" || /ERROR|REJECT/.test(m.type)) console.log("server:", raw.toString().slice(0, 300));
});
setTimeout(() => { ws.close(); process.exit(0); }, Number(seconds) * 1000);
