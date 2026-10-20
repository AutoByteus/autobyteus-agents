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
- **Team:** `createAgentTeamRun(input: { teamDefinitionId, teamConfigs: [{ teamAddress: "/", runtimeKind, llmModelIdentifier, autoExecuteTools: true, workspaceRootPath }], memberConfigs: [{ memberAddress, agentDefinitionId, runtimeKind, llmModelIdentifier, autoExecuteTools: true, workspaceRootPath }] })`. Every member needs an entry.
- **Org:** `createAgentOrgRun(input: { agentOrgDefinitionId, rootConfiguration: { runtimeKind, llmModelIdentifier, autoExecuteTools: true, workspaceRootPath }, teamOverrides: [], agentOverrides: [] })`.
- **Member run IDs** are in `<dataRoot>/server-data/memory/agent_teams/<teamRunId>/team_run_execution_tree.json`, or for an Org in `getAgentOrgRunInspection(orgRunId)`.

## 4. Give the scenario and observe

- **Scenario:** build the smallest realistic input that exercises the change, such as a request that needs the new route, or a test repository with the trap the rule is about.
- **Send** the message to the member with [send-message.mjs](../scripts/send-message.mjs). Run it from a folder outside the repositories, and point `--ws-module` at a `package.json` whose `node_modules` contains `ws`, for example the AutoByteus server's.
- **Observe from files**, with a background wait loop rather than repeated manual checks:
  - the run's message log (`team_communication_messages_active.jsonl` or `agent_org_communication_messages_active.jsonl`; `senderAgentRunId`, `content`);
  - each member's `raw_traces_active.jsonl` (`trace_type` `user`, `assistant`, tool calls);
  - the files the agents write.
- **Judge** against what the change should produce: the order of messages, the rule an agent quotes from `get_handoff_rules`, the file it writes, where it stops.

## 5. Record and clean up

- **Evidence:** save excerpts with a header (case, step, app version, model, date), as the target team's evidence rules describe, in the ticket folder.
- **Clean up:** terminate the runs (`terminateAgentTeamRun`, `terminateAgentOrgRun`), stop the instance, and remove temporary folders.
- **Re-run after a fix:** when a check leads to a fix, run it again on the final text.
