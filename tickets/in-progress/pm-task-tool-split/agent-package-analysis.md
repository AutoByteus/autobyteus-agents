# Agent Package Analysis: Project Task Manager moves to `create_task` / `update_task`

- Status: `Completed`
- Operation: `update` (update intent: `repair`: keep task tools working across the AutoByteus tool split)
- Package type: `agent`
- Target package: Project Task Manager, `agents/project-task-manager/` (worktree `/tmp/tts`, branch `pm-task-tool-split`, from `origin/main` at `1e36ab6`)
- Scope included: the Project Task Manager's config, skill and templates; every agent, team, org and skill in the packages the app loads that names `create_or_update_task` or tells an agent to close Tasks.
- Files read in full: `agents/project-task-manager/agent.md`, `agent-config.json`, `skills/project-task-management/SKILL.md`, `templates/board-template.md`, `templates/task-plan-template.md` (at `1e36ab6`). The Deep Researcher and Marketing Content Creator delegation passages were read for the closing check.
- Scope excluded: AutoByteus code (done in its Task ee74d72b); removing the old name, which comes after the release is installed.
- Request/reference: Project Task `project_task_b32eb64b-e62e-48f6-8079-5147a4c3ee95`. User go-ahead on 2026-10-16: "let's do it now, because only after that we could do the next beta release."

## What changes in AutoByteus

From the archived ticket `tickets/done/task-tool-split/` on `personal` (`release-notes.md`, `handoff-summary.md`), merged as `32ab7d2164`, after `v1.5.4`:

- `create_or_update_task` is split into `create_task` (creates a Project Task) and `update_task` (changes any Task by ID: description, status, context files, closing with DONE or CANCELLED, reopening).
- The old name is removed with no alias. An unknown name is skipped with a warning.
- No task tool is added to agents automatically any more. The closing guidance moves into the `update_task` description.

## Evidence: how each app version treats the names

The installed app is v1.5.4 (`/Applications/AutoByteus.app`, `CFBundleShortVersionString` 1.5.4).

| Check | v1.5.4, the installed app | New release (`personal`, after `32ab7d2164`) |
| --- | --- | --- |
| Code: unknown name in `toolNames` | No validation when the definition loads. Claude/Codex MCP catalog: no route and no error (`agent-tool-mcp-catalog.ts` `resolveRuntimeSessionToolExposure`). Native runtime: "Tool '…' not found in registry. Skipping." (`autobyteus-agent-tool-resolver.ts`) | The same. Native resolver line 121 has the same skip warning. |
| Code: automatic task tool | `create_or_update_task` is added for every run with a member context (`runtime-agent-tool-exposure.ts` `automaticCollaborationToolNames`) | None |
| Run of the shipped code: `toolNames` with old **and** new names | Agent gets `list_project_tasks`, `create_or_update_task`; `create_task`/`update_task` dropped, no error (`evidence/old-app-v1.5.4-probe.txt` (script `evidence/old-app-probe.mjs`)) | Agent gets `list_project_tasks`, `create_task`, `update_task`; `create_or_update_task` dropped, no error (`evidence/new-release-probe.txt`) |
| Run: new names only | **No create/update tool without a member context**; with one, only the automatic `create_or_update_task` | (target state) |
| Run: old name only (current package) | Works | **No create/update tool**, with or without a member context |
| Real runs in the user's app | `server.log` has 2,888 "not found in registry. Skipping." lines from real native runs (for example `patch_file` for SuperAgent, 223 times), and those agents kept running. This live run (v1.5.4) lists no task tool in its config but has `create_or_update_task`, the automatic one. | Not installed yet |
| Third-party name clash | The six configured MCP servers (`mcps.json`) expose no tool named `create_task` or `update_task`, so the new names cannot pick up a foreign tool in v1.5.4. | The release protects both names. |

The old-app run imported the installed app's compiled server modules from `/Applications/AutoByteus.app/Contents/Resources/server/dist`. The new-release run used `vitest` on the current `personal` source; the probe test was deleted after the run.

## Baseline

| File | Current responsibility |
| --- | --- |
| `agent-config.json` | `toolNames` lists `create_or_update_task` (line 6). |
| `SKILL.md` | Lines 43, 89 and 93 name `create_or_update_task` for create, update and reopen. Steps 6–7 and Rules describe IN_PROGRESS, DONE, CANCELLED and reopen as actions without a tool name. |
| Templates | No tool names. |

## Preserved behavior

- Every Project Task Manager action: create, extend, set IN_PROGRESS, close (DONE or CANCELLED), reopen, attach files.
- The judgement style and the Common scenarios table.
- All other tools.

## Findings

| # | Priority area | Evidence | Owner | Impact | Change |
| --- | --- | --- | --- | --- | --- |
| F1 | Grounding | Old name only gives no create/update tool in the new release (probe) | `agent-config.json` | After the release the Project Task Manager cannot create, update or close Tasks. | Add `create_task` and `update_task`. |
| F2 | Grounding | New names only give no create/update tool in v1.5.4 without a member context (probe) | `agent-config.json` | Dropping the old name now would break the installed app. | Keep `create_or_update_task` until the release is installed; each version skips the names it does not know (code and probes). |
| F3 | Clarity | `SKILL.md` 43, 89 and 93 name only the old tool | `SKILL.md` | In the new release the named tool does not exist. | Name the new tools; one short note in step 5 says what each does and that an older app has `create_or_update_task` for both. |
| F4 | Scope check | Only the Project Task Manager names `create_or_update_task` in either app-loaded package (`autobyteus-agents`, `autobyteus-private-agents`). `delegate_task` without a task tool: the Deep Researcher and the Marketing Content Creator; neither is told to close Tasks. | None | None | No change. |

## Planned changes

- `agents/project-task-manager/agent-config.json`: `toolNames` gets `create_task` and `update_task`, and keeps `create_or_update_task` for the transition.
- `agents/project-task-manager/skills/project-task-management/SKILL.md`:
  - step 5: a two-sentence "Task tools" note: `create_task` creates, `update_task` changes, closes or reopens by ID, and an older app has `create_or_update_task` for both, so use the ones in your tool list;
  - lines 43, 89 and 93: name `create_task` and `update_task`.
- After the release is installed (follow-up): remove `create_or_update_task` from `toolNames` and the older-app sentence from step 5.

## Open questions and approvals

- No real choice for the user: listing both names is the only transition that keeps task tools in both versions (F1, F2). The PR waits for the user's "approved, merge".

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Installed version | Pass | 1.5.4; `v1.5.4` is an ancestor of `32ab7d2164` |
| Old-app run with both names | Pass | `evidence/old-app-v1.5.4-probe.txt` (script `evidence/old-app-probe.mjs`) |
| New-release run with both names | Pass | `evidence/new-release-probe.txt` |
| Repository and app-loaded package search | Pass | Only the Project Task Manager |
| Limitation | Note | The runs exercised the shipped tool-resolution code, not a full LLM session. A full Project Task Manager session in the new release can only happen once it is built. |
