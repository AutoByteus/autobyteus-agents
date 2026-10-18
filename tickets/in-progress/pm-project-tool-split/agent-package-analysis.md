# Agent Package Analysis: Project Task Manager moves to `create_project` / `update_project` (Part A)

- Status: `Completed`
- Operation: `update` (update intent: `repair`: keep project tools working across the AutoByteus project-tool split)
- Package type: `agent`
- Target package: Project Task Manager, `agents/project-task-manager/` (from `origin/main` at `99e9655`)
- Files read in full: the whole package, read for Tasks b32eb64b and c95ef65f in this conversation and unchanged since `99e9655` (`git diff 99e9655 HEAD -- agents/project-task-manager` is empty).
- Scope excluded: Part B (removing `create_or_update_project`), done separately; the Task-key and `depends_on` changes (Task 0cee87f3).
- Request/reference: Task `autobyteus-agents-23` (project_task_0bc3407f); follow-up FU-1 from AutoByteus Task c35128cf (merges `a716a4632e`, `98e44053b7` on `personal`).

## Evidence

| Version | Names it knows | Agent listing old + new names gets | Source |
| --- | --- | --- | --- |
| v1.5.5-beta.2 (before the split) | `create_or_update_project` | `create_or_update_project` on native and MCP; `create_project` and `update_project` skipped with warnings; 0 resolver errors | `evidence/ac005-probe-release-v1.5.5-beta.2.txt` (AutoByteus API/E2E) |
| New build (`personal`, after the split) | `create_project`, `update_project`, and still `create_or_update_project` | All three; every combination of names gives the right tools, checked in an isolated real app, including real Claude runs that created and updated a Project | `evidence/app-new-journey-results.json` (APP-NEW, APP-OLD, APP-MIX, APP-NONE, REAL-*), all Pass |
| Installed here | 1.5.6-beta.1: `create_project`, `update_project`, `create_or_update_project` in `project-task-tool-contract.js` | Same as the new build | Checked on this machine, 2026-10-18 |

- The split is in tags `v1.5.5`, `v1.5.5-beta.3` and `v1.5.6-beta.1`; the user runs 1.5.6-beta.1.
- An app before v1.5.5 skips the new names. The new app still serves the old name until AutoByteus removes it (FU-2, DEC-006).

## Findings and planned changes

| # | Evidence | Owner | Change |
| --- | --- | --- | --- |
| F1 | `toolNames` lists only `create_or_update_project` | `agent-config.json` | Add `create_project` and `update_project`; keep the old name for apps before v1.5.5. |
| F2 | Step 1 names `create_or_update_project` for create | `SKILL.md` | Name `create_project` (create) and `update_project` (change by ID); one sentence says an older app has a single `create_or_update_project`. |
| F3 | Search of `autobyteus-agents` and `autobyteus-private-agents` | None | Only the Project Task Manager names the project tools; no other change. |

## Part B readiness

The user's installed app (1.5.6-beta.1) already has the new tools, so Part B is ready now:

- remove `create_or_update_project` from `toolNames` and the older-app sentence;
- then a new Project Task Manager run creates and updates one Project to confirm.
