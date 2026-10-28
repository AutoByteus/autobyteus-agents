# Live regression recipe and observed invocation

Date: 2026-10-28. This uses an **isolated installed server**, not the production
app, its tasks, its runs or real research data. Test agents may write only their
synthetic study. The four cases deliberately use existing team messaging, not
delegation to production agents.

## Isolation and inputs

Observed root: `/tmp/research-goal-check.XJcMUu`; port `56219`. Start command:

```sh
env -i HOME=/root USER=root LOGNAME=root \
  PATH=/usr/local/bin:/usr/bin:/bin LANG=C.UTF-8 \
  CODEX_HOME="$R/codex" \
  node /app/autobyteus-server-ts/dist/app.js \
  --host 127.0.0.1 --port 56219 --data-dir "$R/data"
```

Use a new owned temporary root/unused port for a replay. Its private server `.env`
sets `AUTOBYTEUS_AGENT_PACKAGE_ROOTS=$R/package`, SQLite, and that server's URL.
Its isolated Codex configuration uses `gpt-6-astra`, reasoning `max`, with access
to the existing local runtime sign-in. **Never archive auth files, their contents,
or the server database.** No new paid/cloud infrastructure was provisioned.

Load the old team only, from baseline `1ae93e344410e8a9425bd23e122af426ed12e029`:

```sh
mkdir -p "$R/package"
git archive 1ae93e344410e8a9425bd23e122af426ed12e029 \
  agent-teams/supervised-research-team | tar -x -C "$R/package"
python3 -B tickets/done/goal-directed-research/validation/seed_studies.py "$R/studies"
```

The generator reuses the old toy data generator, **not** its obsolete Case C
acceptance test. Six/nine earlier cycles are seeded history, not live executions.
Only the subsequent decisions, new research and handoffs are live observations.

## Catalog, runs and messages

POST GraphQL JSON `{query, variables}` to the isolated `/graphql` endpoint:

```graphql
mutation { reloadAgentPackageDefinitions }
query {
  agentTeamDefinitions {
    id name coordinatorMemberName
    handoffs { from to rules }
    loadIssues { code reason }
  }
}
mutation($input: CreateAgentTeamRunInput!) {
  createAgentTeamRun(input: $input) { success message teamRunId }
}
```

Create input: teamDefinitionId `supervised-research-team`; one teamConfig at `/`;
two memberConfigs at `/research_supervisor` and `/researcher`, with definition IDs
`team-local-agent:supervised-research-team:research-supervisor` and
`team-local-agent:supervised-research-team:researcher`. All configs use
`runtimeKind: codex_app_server`, `llmModelIdentifier: gpt-6-astra`,
`llmConfig: {reasoning_effort: max}`, `autoExecuteTools: true`, and that case's
synthetic workspaceRootPath. Member run IDs come from its saved execution tree.

Use the Creator's existing `scripts/send-message.mjs` from `/tmp`:

```sh
node "$REPO/agents/agent-package-creator/skills/agent-package-creation/scripts/send-message.mjs" \
  --port 56219 --kind team --run "$TEAM" --agent "$SUPERVISOR" \
  --text-file "$REQUEST" --seconds 3 \
  --ws-module /app/autobyteus-server-ts/package.json --log "$EVENT_LOG"
```

`--seconds` only controls the observer's WebSocket connection, **not research
duration**. Original neutral request: `upgrade-before-request.txt` (the initial
connection used 4 seconds). Wait for the old decision, inspect files and archive
with `collect_case.py R upgrade OUTPUT`. Do not update the package while that turn
is working.

Copy the final worktree's team files into the **same** isolated package path,
preserving the two relative symlinks. Reload the catalog; save its returned route
and the existing execution tree separately. Send `upgrade-after-request.txt` to
the **same supervisor run**. It contains the actual changed user authority; it
does not prescribe the numeric research answer. Do not create a replacement team.

Create the other three cases from the final catalog and send `stalled-request.txt`,
`paused-request.txt`, `blocked-request.txt`. No additional reminders were sent to
any case. Only upgrade received its planned policy-change/resume message.

## Observation, capture and cleanup

```graphql
query($t: String!) {
  getTeamRunExecutionCheckpoint(teamRunId: $t) {
    rootTeamRunId hasOpenExecutionWork changeSequence
  }
}
mutation($t: String!) {
  terminateAgentTeamRun(teamRunId: $t) { success message }
}
```

Introspect the installed schema if a replay's termination input differs. A harness
observed checkpoint state every 15 seconds, with a 30-minute observer timeout—not
a team policy or a cycle allowance. Idle is not itself a passing result: inspect
the files, actual messages, tool receipts and evidence. `collect_case.py` archives
observable events and study files, excluding reasoning/system instructions and
runtime/auth directories. Retained `system_task_notification` records show skill
updates. `capture.json` binds each snapshot to source/study hashes and symlink targets.

Terminate only these test teams, stop only this server, verify its port/processes
are gone, and remove its private temporary root after capture. Do not stop the
production server or unrelated model processes. The final validation report records
the observed cleanup, not a claim that this recipe itself performs it.
