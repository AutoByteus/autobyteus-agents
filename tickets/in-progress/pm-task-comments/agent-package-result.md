# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `agent` (Project Task Manager)
- Request/reference: Task autobyteus-agents-52; Task comments released in 1.5.9-beta.1 (autobyteus-259, 187). The user, 2026-10-21: updating a Task meant rewriting the whole description.

## Change (`project-task-management/SKILL.md`)

| Where | Change |
| --- | --- |
| Step 5, "New input …" (the one home) | New input extends a Task with a comment (`update_task` with `add_comment`) or attached files. Comments are short, dated and sourced, can't be edited or deleted, and carry no author. The description stays the brief and is rewritten only when the brief changes. A running worker sees neither comments nor files, so message it when it must know. Read a Task's comments before acting on it. |
| Step 5, fold small work | Small related work goes in "as a comment"; an existing small Task is copied into the staying Task as a comment and cancelled with "merged into <key>". |
| Task tools, step 2, Common scenarios | Point to the rule (`add_comment`; descriptions, comments or assignments; comment on the Task that absorbs). |

## Evaluation (isolated instances, app 1.5.9-beta.1, PM claude-opus-5)

Setup: greeter-1, a 14-line brief dispatched to a running stand-in worker; greeter-2, a small related Task. The user's message: a decision for greeter-1, fold greeter-2 into it, and a new Task.

| | Old text | New text |
| --- | --- | --- |
| Decision on greeter-1 | `update_task` with the full description rewritten (21 lines resent) | `add_comment`: "The user, 2026-10-23 (decisions, these are the user's): …"; brief unchanged (14 lines) |
| Fold greeter-2 | Into the rewritten description; greeter-2 CANCELLED with a comment | Content as a comment on greeter-1; greeter-2 CANCELLED with "merged into greeter-1 (the user, 2026-10-23 …)" |
| Running worker | Messaged | Messaged ("saved as comments … but you are already running") |
| New Task | Full description | Full description |
