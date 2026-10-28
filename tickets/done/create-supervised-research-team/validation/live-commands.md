# Live-check recipe and observed setup

Run only in a disposable instance. The original runtime directory
`/tmp/supervised-research-check.cuWmHC` and port 45051 were removed after evidence
collection. Replace them with a fresh root/free port; never target the user's node.
The installed container entry used was `/app/autobyteus-server-ts/dist/app.js`.

1. Created separate `data`, `codex`, `package/agent-teams`, and study directories;
   copied only the final Supervised Research Team into the package directory,
   preserving its symlinks. The temporary Codex home had a minimal config and a
   symlink to `/root/.codex/auth.json` for existing sign-in; no credentials were
   printed, archived, copied into the package or committed.
2. Wrote a test-owned `.env` in `data` containing only `AUTOBYTEUS_SERVER_HOST` for
   the private test port, `AUTOBYTEUS_AGENT_PACKAGE_ROOTS` for its package directory,
   and `DB_TYPE=sqlite`. Started a managed foreground process with a clean
   `env -i` environment, system PATH/HOME/USER, temporary `CODEX_HOME`, and:
   `node /app/autobyteus-server-ts/dist/app.js --host 127.0.0.1 --port 45051 --data-dir <test-root>/data`.
3. Introspected the actual GraphQL schema. Package-root discovery registered the
   package; `mutation { reloadAgentPackageDefinitions }` succeeded. Queried
   `agentTeamDefinitions`, `agentDefinitions`, `availableToolNames` and
   `providerModelCatalogSnapshots(runtimeKind: "codex_app_server")`.
4. Ran `python3 seed_studies.py <test-root>/studies` (the folder must not yet exist).
   For each case used `createAgentTeamRun` with the following input shape; replace
   workspace path for B/C. The schema returns `success`, `message`, `teamRunId`.

```json
{
  "teamDefinitionId": "supervised-research-team",
  "teamConfigs": [{
    "teamAddress": "/", "runtimeKind": "codex_app_server",
    "llmModelIdentifier": "gpt-6-astra", "llmConfig": {"reasoning_effort": "high"},
    "autoExecuteTools": true, "workspaceRootPath": "<test-root>/studies/case-a"
  }],
  "memberConfigs": [
    {
      "memberAddress": "/research_supervisor",
      "agentDefinitionId": "team-local-agent:supervised-research-team:research-supervisor",
      "runtimeKind": "codex_app_server", "llmModelIdentifier": "gpt-6-astra",
      "llmConfig": {"reasoning_effort": "high"}, "autoExecuteTools": true,
      "workspaceRootPath": "<test-root>/studies/case-a"
    },
    {
      "memberAddress": "/researcher",
      "agentDefinitionId": "team-local-agent:supervised-research-team:researcher",
      "runtimeKind": "codex_app_server", "llmModelIdentifier": "gpt-6-astra",
      "llmConfig": {"reasoning_effort": "high"}, "autoExecuteTools": true,
      "workspaceRootPath": "<test-root>/studies/case-a"
    }
  ]
}
```

5. Read each supervisor's run ID from its test-owned execution tree; sent exactly
   one request using the Creator's `scripts/send-message.mjs`, `--kind team`, with
   the case's request file, `--ws-module /app/autobyteus-server-ts/package.json` and
   the isolated port. No additional reminder was sent. Agent messages ran the loop.
6. Observed the actual communication log, tool events, output files and final replies.
   Collected artifacts with `collect_live_evidence.py <test-root> <new-output-folder>`;
   run-ID API receipts were saved as `run-a.json`, `run-b.json`, `run-c.json` in the
   instance root for that collector. Source/loaded package equality was verified.
7. Called `terminateAgentTeamRun(teamRunId: ...)` for all three owned runs; stopped
   only the test server, verified its port and temporary-home processes were gone,
   then removed only its test-owned temporary tree. No production runtime was
   stopped or configured.

For a local read-only structural check, use `validate_package.py` on the team root
with `--tool-catalog tool-catalog.json`. For re-evaluation, keep paid inference
bounded and review the current app schema/model catalog rather than assume that
these 2026-10-28 API/model identifiers are still available.
