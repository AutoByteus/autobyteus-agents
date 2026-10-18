# Agent Package Analysis: Project Task Manager uses Task keys and "depends on"

- Status: `Completed`
- Operation: `update` (update intent: `extend`: use the app's Task keys and stored dependencies)
- Package type: `agent`
- Target package: Project Task Manager, `agents/project-task-manager/` (worktree `/tmp/pkd`, branch `pm-task-keys-deps`, from `origin/main` at `8437578`)
- Files read in full: `agent.md`, `agent-config.json`, `SKILL.md`, `templates/board-template.md`, `templates/task-plan-template.md`, read in this conversation. Since then only this agent's own tool-name PRs (#55–#58) changed the config and step 1 (`git log d8bcd68..HEAD`).
- Also read: the installed app's (1.5.6-beta.1) descriptions of `list_project_tasks`, `create_task` and `update_task`; the AutoByteus `handoff-summary.md` for task-keys-and-dependencies; the Project Task Manager's real board (`autobyteus-workspace-superrepo/task-plans/board.md`).
- Request/reference: Task `autobyteus-agents-24` (project_task_0cee87f3), follow-up FU-003 of AutoByteus Task 5fe913af. The PM's notes of 2026-10-18 cover keys in the UI, `depends_on` replacing on update, readiness, and "dependencies only inform".

## What the app now provides (installed 1.5.6-beta.1, which contains `1b108514cb` and `66429d6f31`)

- **Keys:**
  - Every Project Task has a permanent key such as `autobyteus-42`.
  - The tools return it as the Task's `taskId` and accept the key (any letter case) or the long ID.
  - A Task without a Project (one a description-only `delegate_task` created) has no key.
- **Depends on:**
  - `create_task` and `update_task` take `depends_on` (Tasks of the same Project that come first, or that this Task follows up).
  - On update, the list given replaces the saved one, and `[]` clears it.
  - `list_project_tasks` returns each Task's `dependsOn`.
  - Dependencies only inform and never stop work.
  - The UI derives "Blocked by", "Dependency cancelled", "Depends on" and "Required by".
- **UI:** keys show on the Task page, in the Depends-on and Required-by lists, and on the Blocked-by badge, not on board cards or the Workspaces tree.

## Baseline

| File | Today |
| --- | --- |
| `SKILL.md` step 1 | The board records "open Tasks not yet dispatched and what each waits for". |
| `SKILL.md` steps 3, 5 and 6 | Dependencies are decided in the plan and kept as notes. Readiness is "every Task it depends on is DONE". Tasks are named by `task_id` (the long ID). |
| `SKILL.md` scenarios | Follow-ups and dispatch-later Tasks; no dependency is recorded on the Task. |
| `board-template.md` | `Task ID` columns hold long IDs. The "Open Tasks not yet dispatched" section's "Waiting for" column includes "blocked by `<task_id>`". |
| `task-plan-template.md` | `Task ID` column; the plan's own "Depends on" column. |
| Real board | Long IDs in most rows; dependencies written into row text ("Depends on autobyteus-76"). |

## Findings

| # | Priority area | Evidence | Owner | Change |
| --- | --- | --- | --- | --- |
| F1 | Structure and ownership | Dependencies live in board notes and plan text, while the app now stores them on the Task (the same fact in two places) | `SKILL.md` steps 1, 3, 5 and 6; board template | Store dependencies with `depends_on`. The board keeps only what a Task cannot hold: workers, copy IDs, questions for the user, and waits on something other than a Task. |
| F2 | Clarity | The skill and templates name Tasks by long `task_id`; the user sees keys in the app | `SKILL.md`, both templates | Name Tasks by key in boards, plans and reports. Use the long ID only for a Task with no key. |
| F3 | Content flow | Readiness has no source for dependency status, and nothing covers a cancelled dependency | `SKILL.md` step 6 | Ready when every `depends_on` Task is DONE. Status comes from your own records or `list_project_tasks`. A cancelled dependency is a decision: remove it, or ask the user when it changes the plan. Dependencies only inform. |
| F4 | Economy | The scenarios table has no design → build row, and the follow-up row records no dependency | `SKILL.md` table | Update the follow-up and dispatch-later rows; add a design-then-build row. |

## Preserved behavior

- The board stays the record of workers and copies.
- Approval per dispatch, no double dispatch, close after cleanup.
- The judgement style, with no argument lists; the exact arguments come from the tool descriptions.

## Planned changes

- **`SKILL.md`:**
  - step 1: the board holds what Tasks can't, and dependencies are not copied there;
  - step 3: the plan's dependencies become `depends_on` when the Tasks are created;
  - step 5: keys in the Task tools note; a Dependencies paragraph; plans and confirmations use keys; dispatch-later uses `depends_on`;
  - step 6: readiness from `depends_on`, with the cancelled-dependency case;
  - scenarios table: the follow-up, dispatch-later and design → build rows.
- **`board-template.md`:** key columns. Rename "Open Tasks not yet dispatched" to Tasks waiting for something other than a Task.
- **`task-plan-template.md`:** a Key column; the "Depends on" column becomes each Task's `depends_on`.
- **`agent-config.json`:** no change (`create_task`, `update_task` and `list_project_tasks` are already listed).

## Open questions

- None. The real-run check is done by a new Project Task Manager run after the merge (Done-when).
