# Board — <Project name>

- Project ID: `<project_id>`

## Workers

Who has delivered each kind of work well.

| Kind of work | Address | Note |
| --- | --- | --- |
| <e.g. software changes> | `<address, e.g. /software_engineering_team>` | <e.g. delivered the archive Task, 2026-10-08> |

## Open Tasks not yet dispatched

Tasks created for later dispatch, on the user's word or a trigger. Move a row to open dispatches when you dispatch it.

| Task ID | Task | Waiting for | Created |
| --- | --- | --- | --- |
| `<task_id>` | <short title> | <e.g. the user's go-ahead; blocked by `<task_id>`; trigger> | <date> |

## Open dispatches

Tasks you delegated that are not yet closed. Copy ID: what `delegate_task` takes for a follow-up (a Team's `target_team_run_id`, an Agent's `target_agent_run_id`). Message ID: what `send_message_to` takes (the Agent's run, or the Team's `target_team_coordinator_agent_run_id`).

| Task ID | Task | Worker | Copy ID | Message ID | Dispatched | Approval |
| --- | --- | --- | --- | --- | --- | --- |
| `<task_id>` | <short title> | `<address>` | `<target_team_run_id or target_agent_run_id>` | `<agent run ID>` | <date> | <user's words> |

## Closed dispatches

Recent Tasks that are DONE or CANCELLED, kept for follow-up Tasks to the same copy or for reopening. Drop rows once neither is likely.

| Task ID | Task | Worker | Copy ID | Message ID | Closed |
| --- | --- | --- | --- | --- | --- |
| `<task_id>` | <short title> | `<address>` | `<target_team_run_id or target_agent_run_id>` | `<agent run ID>` | <DONE or CANCELLED, date> |
