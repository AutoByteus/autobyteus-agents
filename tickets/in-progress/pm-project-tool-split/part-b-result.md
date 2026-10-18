# Part B Result: remove `create_or_update_project`

- Status: `Completed`
- Operation: `update` (update intent: `cleanup`: end the project-tool transition from PR #57)
- Target package: Project Task Manager, `agents/project-task-manager/` (from `origin/main` at `c03a7cc`)
- Request/reference: Task `autobyteus-agents-23` (project_task_0bc3407f), Part B. The user, 2026-10-18: "we don't need this legacy tool since we have the new tool."

## Changes

- `agent-config.json`: `create_or_update_project` removed from `toolNames`.
- `SKILL.md` step 1: the "older AutoByteus app" sentence is removed; step 1 still creates with `create_project` and changes details with `update_project` by ID.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Real run on the new app | Pass | The Project Task Manager run picked up `create_project` and `update_project`. `update_project` updated the AutoByteus Project's description in the user's app (v1.5.6-beta.1) on 2026-10-18 (reported by the Project Task Manager). `create_project` was not run, to avoid a dummy Project. |
| Skill validator | Pass | `quick_validate.py`: valid |
| Changed JSON parses | Pass | `json.load` |
| No package lists `create_or_update_project` | Pass | Search of `autobyteus-agents` and `autobyteus-private-agents` outside `tickets/` |
| Order with the app change | Pass | AutoByteus Task autobyteus-121 removes the old tool from the app. Agents that still list it are unaffected, since unknown names are skipped (shown for Task b32eb64b and in this Task's evidence). So this PR does not wait for it. |

## Next expected action

After the merge, start a new Project Task Manager run to get the new tool list.
