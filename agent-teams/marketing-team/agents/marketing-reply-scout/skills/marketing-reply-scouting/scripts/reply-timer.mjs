#!/usr/bin/env node
// Reply Scout timer: wakes this agent's run every N minutes by sending it a message through the
// AutoByteus server, because agents act only when a message arrives. Node 22 or later, no packages.
//
//   node reply-timer.mjs start  --workspace <dir> --marker <text> [--minutes 30] [--port <serverPort>]
//   node reply-timer.mjs status --workspace <dir>
//   node reply-timer.mjs stop   --workspace <dir>
//
// start: finds this agent's run by a marker the agent printed with an earlier command (its run's
// traces contain it), then starts a detached loop and records it in <workspace>/outreach/timer.json.
// The loop sends a tick every N minutes and exits when timer.json is removed or names another pid.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [command, ...rest] = process.argv.slice(2);
const args = Object.fromEntries(rest.reduce((pairs, value, i, all) =>
  (value.startsWith("--") ? [...pairs, [value.slice(2), all[i + 1]]] : pairs), []));
if (!args.workspace) fail("missing --workspace");
const stateFile = join(args.workspace, "outreach", "timer.json");
const readState = () => (existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, "utf8")) : null);
const writeState = (state) => { mkdirSync(dirname(stateFile), { recursive: true }); writeFileSync(stateFile, JSON.stringify(state, null, 2) + "\n"); };
const alive = (pid) => { try { process.kill(pid, 0); return true; } catch { return false; } };

function fail(message) { console.error(message); process.exit(2); }

function findRun(marker) {
  const memory = process.env.AUTOBYTEUS_MEMORY_DIR
    ?? join(process.env.AUTOBYTEUS_DATA_DIR ?? fail("AUTOBYTEUS_MEMORY_DIR and AUTOBYTEUS_DATA_DIR are not set"), "memory");
  const since = Date.now() - 6 * 3600 * 1000;
  const candidates = [];
  const teams = join(memory, "agent_teams");
  if (existsSync(teams)) for (const team of readdirSync(teams)) {
    const teamDir = join(teams, team);
    if (!statSync(teamDir).isDirectory()) continue;
    for (const member of readdirSync(teamDir)) candidates.push({ dir: join(teamDir, member), teamRunId: team, agentRunId: member });
  }
  const agents = join(memory, "agents");
  if (existsSync(agents)) for (const run of readdirSync(agents)) candidates.push({ dir: join(agents, run), agentRunId: run });
  for (const c of candidates) {
    const trace = join(c.dir, "raw_traces_active.jsonl");
    if (existsSync(trace) && statSync(trace).mtimeMs > since && readFileSync(trace, "utf8").includes(marker)) return c;
  }
  fail(`no run found whose traces contain the marker; print it in one command, then start the timer in the next`);
}

function tick(state) {
  return new Promise((resolve) => {
    const id = `reply-timer-${Date.now()}`;
    const content = `Reply Scout timer tick (${new Date().toISOString()}): run the reply searches that are due, ` +
      `following marketing-reply-scouting. If none is due, or a search is still waiting for the Operator, do nothing and stop.`;
    const common = { content, context_file_paths: [], image_urls: [], message_id: id, dedupe_key: id };
    const [path, payload] = state.teamRunId
      ? [`/ws/agent-team/${state.teamRunId}`, { agent_run_id: state.agentRunId, ...common }]
      : [`/ws/agent/${state.agentRunId}`, common];
    const ws = new WebSocket(`ws://127.0.0.1:${state.port}${path}`);
    let sent = false;
    const done = (result) => { try { ws.close(); } catch {} resolve(result); };
    const timer = setTimeout(() => done("no acknowledgement"), 20000);
    ws.onmessage = (event) => {
      const message = JSON.parse(String(event.data));
      if (message.type === "CONNECTED") { ws.send(JSON.stringify({ type: "SEND_MESSAGE", payload })); sent = true; }
      // An agent run acknowledges with *_ACK; a team run echoes the member's input instead.
      if (sent && /ACK|MEMBER_INPUT_MESSAGE|TURN_STARTED/.test(message.type)) { clearTimeout(timer); done("delivered"); }
      if (/ERROR/.test(message.type)) { clearTimeout(timer); done(`error: ${JSON.stringify(message).slice(0, 200)}`); }
    };
    ws.onerror = () => { clearTimeout(timer); done("server not reachable"); };
  });
}

if (command === "start") {
  if (!args.marker) fail("missing --marker");
  const old = readState();
  if (old && alive(old.pid)) fail(`a timer is already running (pid ${old.pid}); stop it first`);
  const run = findRun(args.marker);
  const state = { ...run, port: Number(args.port ?? process.env.AUTOBYTEUS_SERVER_PORT ?? 8000),
    minutes: Number(args.minutes ?? 30), started: new Date().toISOString() };
  delete state.dir;
  const child = spawn(process.execPath, [fileURLToPath(import.meta.url), "loop", "--workspace", args.workspace],
    { detached: true, stdio: "ignore" });
  child.unref();
  writeState({ ...state, pid: child.pid });
  console.log(JSON.stringify({ ...state, pid: child.pid }));
} else if (command === "loop") {
  let failures = 0;
  for (;;) {
    const state = readState();
    if (!state || state.pid !== process.pid) process.exit(0);
    await new Promise((r) => setTimeout(r, state.minutes * 60 * 1000));
    const now = readState();
    if (!now || now.pid !== process.pid) process.exit(0);
    const result = await tick(now);
    failures = result === "delivered" ? 0 : failures + 1;
    writeState({ ...now, lastTick: new Date().toISOString(), lastResult: result });
    if (failures >= 3) { writeState({ ...now, lastResult: `stopped after 3 failed ticks: ${result}`, pid: null }); process.exit(1); }
  }
} else if (command === "status") {
  const state = readState();
  console.log(state ? JSON.stringify({ ...state, running: Boolean(state.pid && alive(state.pid)) }) : "no timer");
} else if (command === "stop") {
  const state = readState();
  if (state?.pid && alive(state.pid)) process.kill(state.pid);
  if (existsSync(stateFile)) unlinkSync(stateFile);
  console.log("stopped");
} else {
  fail("command must be start, status or stop");
}
