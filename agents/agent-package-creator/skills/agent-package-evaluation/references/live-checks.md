# Live Checks In An AutoByteus App

How to operate an AutoByteus app for an [evaluation](../SKILL.md): start it, load the package, run it, send the request, observe, clean up. Use an isolated instance, never the user's running app or data. Observed with AutoByteus 1.5.6 (2026-10-19); if a call below fails, read the app's GraphQL schema (introspection) and adapt.

## 1. Start an isolated app

Follow the AutoByteus repository's testing guide (`TESTING.md`, "Isolated desktop instance"): from that repository, `pnpm --silent isolated-app start --app /Applications/AutoByteus.app`. Keep `instanceId`, `graphqlUrl`, `serverPort`, and `dataRoot` from its JSON output. Stop it at the end with `pnpm --silent isolated-app stop <instanceId>`, which also removes its data. `pnpm --silent isolated-app list` shows the instances and whether each is running.

## 1a. A private process list and room in memory

An isolated instance has its own data, but its agents still see the whole computer's process list: `ps` shows every program's command line, such as the user's own app with its data folder and other agents' workspaces. A subject that lists processes sends those lines to its model provider. It may also take another subject's process for its own leftover and wait for it or stop it. Several heavy subjects at once can run the computer out of memory, and a starved run fails for reasons that are not the text's.

- **Its own process list, always.** Start every instance that runs a subject in a process namespace of its own, with its own `/proc`.
  - **On Linux, as root:** `unshare --pid --fork --mount-proc --kill-child <start command>`. The app becomes process 1 and sees only what it starts.
  - **In a container where an unprivileged sandbox cannot mount `/proc`:** create the namespace as root first and start the sandbox inside it.
  - **On macOS or Windows,** which have no process namespaces: run the instance in a Linux container or VM.
  - **If none of these is possible,** do not run a subject that has a shell or process tools; the evaluation could not run.
- **Check it before the first request:** list the processes from inside (`nsenter --target <the app's host pid> --pid --mount ps -eo pid,user,args`). Only the instance's own processes may show. Record the count in the report.
- **Stop it** by sending SIGKILL to the `unshare` process, which ignores SIGTERM. `--kill-child` then ends every process in the namespace.
- **Memory.** A heavy subject builds, tests, or runs dev servers or a browser.
  - **Before starting one,** read the available memory and swap (`/proc/meminfo`). Start it only if, after its expected peak, the user's own apps still have room: at least 2 GB left, and swap not nearly used up.
  - **The expected peak** is the largest one measured for that kind of subject. While a subject runs, sample its namespace's total resident memory (`nsenter … ps -eo rss=`) and record the peak.
  - **Until a kind of subject has been measured,** run heavy subjects one at a time.

## 2. Load the package under test

- **Import** the worktree, or a copy of the old text (for example `git archive origin/main`), as a local package: `mutation { importAgentPackage(input: { sourceKind: LOCAL_PATH, source: "<folder>" }) { __typename } }`.
- **After editing files,** `mutation { reloadAgentPackageDefinitions }`. Remove a stale copy with `removeAgentPackage(packageId: "local:<url-encoded path>")`, so only the text under test defines the package.
- **Check it loaded:** `agentTeamDefinitions` or `agentOrgDefinitions` (members, handoffs, `loadIssues`), and `agentDefinitions` for IDs. Team-local agents are `team-local-agent:<team-id>:<agent-id>`.

## 3. Start a run

- **Models** available: `providerModelCatalogSnapshots(runtimeKind: "claude_agent_sdk") { llmModels { modelIdentifier name } }`.
- **Single agent:** `createAgentRun(input: { agentDefinitionId, workspaceRootPath, llmModelIdentifier, runtimeKind, autoExecuteTools: true }) { success message runId }`.
- **Team:** `createAgentTeamRun(input: { teamDefinitionId, teamConfigs: [{ teamAddress: "/", runtimeKind, llmModelIdentifier, autoExecuteTools: true, workspaceRootPath }], memberConfigs: [{ memberAddress, agentDefinitionId, runtimeKind, llmModelIdentifier, autoExecuteTools: true, workspaceRootPath }] })`. Every member needs an entry.
- **Org:** `createAgentOrgRun(input: { agentOrgDefinitionId, rootConfiguration: { runtimeKind, llmModelIdentifier, autoExecuteTools: true, workspaceRootPath }, teamOverrides: [], agentOverrides: [] })`.
- **Member run IDs** are in `<dataRoot>/server-data/memory/agent_teams/<teamRunId>/team_run_execution_tree.json`, or for an Org in `getAgentOrgRunInspection(orgRunId)`.

## 3a. Agents with browser or screen tools

An isolated app still reaches the user's own browser through the browser bridge, and the user's own screen through the desktop the app runs on, where the user is signed in and has tabs of their own. Give the agent under test a browser and a screen of its own instead:
- **A separate display and browser:** for example `Xvnc :120 -localhost`, and Chromium on it with its own `--user-data-dir` and `--remote-debugging-port`. Never use the user's display or debugging port.
- **A test bridge:** run [test-browser-bridge.mjs](../scripts/test-browser-bridge.mjs) against that browser, and start the app with `AUTOBYTEUS_BROWSER_BRIDGE_BASE_URL` and `AUTOBYTEUS_BROWSER_BRIDGE_TOKEN` pointing at it and `DISPLAY` set to the test display. `open_tab`, `navigate_to`, `list_tabs`, `close_tab`, `read_page`, `screenshot` and `run_script` then work as in real use.
- **Seed and read the state:** its test routes open a tab "another task" owns, and list every tab, who opened it and whether it is still open. Before the first call, check that the app's environment names only the test display and bridge, and afterwards that no tool call names the user's.

## 4. Send and observe

- **Send** the message with [send-message.mjs](../scripts/send-message.mjs): `--kind agent --agent <runId>` for a single agent; `--kind team` or `org` with `--run <teamRunId|orgRunId> --agent <member runId>`; `--text-file` for a long request. Run it from a folder outside the repositories, and point `--ws-module` at a `package.json` whose `node_modules` contains `ws`, for example the AutoByteus server's.
- **Observe from files.** [wait-for-reply.mjs](../scripts/wait-for-reply.mjs) waits until a run's turn has ended and prints its final reply; run it in the background for long turns. An agent can add a short postscript after a background task; when the printed reply reads like one, find the main reply in the traces. Then read:
  - the run's message log (`team_communication_messages_active.jsonl` or `agent_org_communication_messages_active.jsonl`; `senderAgentRunId`, `content`);
  - each member's `raw_traces_active.jsonl` (`trace_type` `user`, `assistant`, tool calls), whose modification time also shows whether the member is still working;
  - the files the agents write.

## 5. Record and clean up

- **Evidence:** save excerpts with a header (case, step, app version, model, date), as the target team's evidence rules describe, in the ticket folder, and copy the outputs out of temporary folders before removing them.
- **Clean up:** terminate the runs (`terminateAgentRun`, `terminateAgentTeamRun`, `terminateAgentOrgRun`), stop the instances, and remove temporary folders and copies of the user's material.
