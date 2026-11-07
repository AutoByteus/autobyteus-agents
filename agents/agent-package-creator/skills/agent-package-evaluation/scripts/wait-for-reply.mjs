#!/usr/bin/env node
// Waits until an agent run (a single agent or a Team/Org member) has finished its turn, then prints its
// final reply. "Finished" means its trace log ends with an assistant message and has not changed for
// --stable seconds. Usage:
//   node wait-for-reply.mjs --data-root <isolated app dataRoot> --agent <agentRunId>
//        [--stable 30] [--timeout 1800] [--out <reply.md>]
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, value, i, all) =>
  (value.startsWith("--") ? [...pairs, [value.slice(2), all[i + 1]]] : pairs), []));
for (const key of ["data-root", "agent"]) {
  if (!args[key]) { console.error(`missing --${key}`); process.exit(2); }
}
const memory = join(args["data-root"], "server-data", "memory");
const stableMs = Number(args.stable ?? 30) * 1000;
const deadline = Date.now() + Number(args.timeout ?? 1800) * 1000;

function traceFile() {
  const hit = readdirSync(memory, { recursive: true })
    .find((p) => p.includes(args.agent) && p.endsWith("raw_traces_active.jsonl"));
  return hit && join(memory, hit);
}

let lastSize = -1;
let since = Date.now();
while (Date.now() < deadline) {
  const file = traceFile();
  if (file) {
    const size = statSync(file).size;
    if (size !== lastSize) { lastSize = size; since = Date.now(); }
    const traces = readFileSync(file, "utf8").trim().split("\n").map((line) => JSON.parse(line));
    const last = traces.at(-1);
    if (last?.trace_type === "assistant" && Date.now() - since >= stableMs) {
      const reply = last.content ?? "";
      if (args.out) writeFileSync(args.out, reply);
      console.log(reply);
      process.exit(0);
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 5000));
}
console.error("timed out before the agent finished");
process.exit(1);
