# Live Checks In An AutoByteus App

How to check a package change with real agents, as step 4's "Real use" check asks. Use an isolated instance, never the user's running app or data. Observed with AutoByteus 1.5.6 (2026-10-19); if a call below fails, read the app's GraphQL schema (introspection) and adapt.

## 1. Start an isolated app

Follow the AutoByteus repository's testing guide (`TESTING.md`, "Isolated desktop instance"): from that repository, `pnpm --silent isolated-app start --app /Applications/AutoByteus.app`. Keep `instanceId`, `graphqlUrl`, `serverPort`, and `dataRoot` from its JSON output. Stop it at the end with `pnpm --silent isolated-app stop <instanceId>`, which also removes its data.

## 2. Load the package under test

- **Import** the worktree as a local package: `mutation { importAgentPackage(input: { sourceKind: LOCAL_PATH, source: "<worktree>" }) { __typename } }`.
- **After editing files,** `mutation { reloadAgentPackageDefinitions }`. Remove a stale copy with `removeAgentPackage(packageId: "local:<url-encoded path>")`, so only the text under test defines the package.
- **Check it loaded:** `agentTeamDefinitions` or `agentOrgDefinitions` (members, handoffs, `loadIssues`), and `agentDefinitions` for IDs. Team-local agents are `team-local-agent:<team-id>:<agent-id>`.

## 3. Start a run

- **Models:** `providerModelCatalogSnapshots(runtimeKind: "claude_agent_sdk") { llmModels { modelIdentifier name } }`. Use a capable model for the role under test and a cheap one for the rest.
- **Single agent:** `createAgentRun(input: { agentDefinitionId, workspaceRootPath, llmModelIdentifier, runtimeKind, autoExecuteTools: true }) { success message runId }`.
- **Team:** `createAgentTeamRun(input: { teamDefinitionId, teamConfigs: [{ teamAddress: "/", runtimeKind, llmModelIdentifier, autoExecuteTools: true, workspaceRootPath }], memberConfigs: [{ memberAddress, agentDefinitionId, runtimeKind, llmModelIdentifier, autoExecuteTools: true, workspaceRootPath }] })`. Every member needs an entry.
- **Org:** `createAgentOrgRun(input: { agentOrgDefinitionId, rootConfiguration: { runtimeKind, llmModelIdentifier, autoExecuteTools: true, workspaceRootPath }, teamOverrides: [], agentOverrides: [] })`.
- **Member run IDs** are in `<dataRoot>/server-data/memory/agent_teams/<teamRunId>/team_run_execution_tree.json`, or for an Org in `getAgentOrgRunInspection(orgRunId)`.

## 4. Give the scenario and observe

- **Scenario:** build the smallest realistic input that exercises the change, such as a request that needs the new route, or a test repository with the trap the rule is about. When the change is about how an agent judges or designs, ask a neutral question that does not hint at the answer, and run it on the old text and on the new text: load one package, run, remove it, load the other (both define the same IDs), or use two instances. Give each run its own copy of the repository it works on: runs write notes there, and a later run that finds an earlier run's notes builds on them instead of judging independently.
- **Replay a real miss:** when the change comes from a real incident, the best test data is the incident itself. Clone the repository at the commit where the agent got it wrong (the ticket's history and revision records name it), send the same message the agent received then, once on the old text and once on the new, and compare what each catches. The clone keeps the user's repositories untouched.
- **Test data:** create what each point of the change needs in order to happen: files, seeded state, a stale process, a misleading log, a merged branch. Make the data consistent, because an agent reacts to a flaw in the data instead of to the rule under test. Capable agents avoid traps through good habits, so a trap that only a careless agent would fall into tests nothing: build the situation so that a careful agent still meets it, or treat its avoidance as the answer. When the old text already behaves well in the situation, the rule adds nothing; shorten or drop it. Leave the agent the tools and reading it would have in real use, so it acts on the text under test.
- **Delegation starts real work:** an agent that delegates in the scenario starts a real worker, which works on whatever its Task names, including the user's repositories. When the scenario only needs to show whom the agent picks, import only the agent under test (a copy of its folder) and use placeholder run IDs on its board, so the call is refused and visible in the traces instead of run.
- **Send** the message to the agent or member with [send-message.mjs](../scripts/send-message.mjs) (`--kind agent`, `team`, or `org`; `--text-file` for a long scenario). Run it from a folder outside the repositories, and point `--ws-module` at a `package.json` whose `node_modules` contains `ws`, for example the AutoByteus server's.
- **Observe from files.** [wait-for-reply.mjs](../scripts/wait-for-reply.mjs) waits until a run's turn has ended and prints its final reply; run it in the background for long turns. An agent can add a short postscript after a background task; when the printed reply reads like one, find the main reply in the traces. Then read:
  - the run's message log (`team_communication_messages_active.jsonl` or `agent_org_communication_messages_active.jsonl`; `senderAgentRunId`, `content`);
  - each member's `raw_traces_active.jsonl` (`trace_type` `user`, `assistant`, tool calls);
  - the files the agents write.
- **Judge** against what the change should produce: the order of messages, the rule an agent quotes from `get_handoff_rules`, the file it writes, where it stops. List each point of the change and find where the run exercised it. A point the run did not exercise is untested, not passed: build data that exercises it and run again. A fresh agent sometimes answers without opening its skill (no skill call in its traces), which tests nothing; a long-running agent in real use has it loaded, so first ask it to load its skill.

## 5. Record and clean up

- **Evidence:** save excerpts with a header (case, step, app version, model, date), as the target team's evidence rules describe, in the ticket folder.
- **Clean up:** terminate the runs (`terminateAgentRun`, `terminateAgentTeamRun`, `terminateAgentOrgRun`), stop the instance, and remove temporary folders.
- **Re-run after a fix:** when a check leads to a fix, run it again on the final text.
