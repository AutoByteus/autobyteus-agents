# Board — <Project name>

- Project ID: `<project_id>`

## Workers

Who has delivered each kind of work well.

| Kind of work | Address | Note |
| --- | --- | --- |
| <e.g. software changes> | `<address, e.g. /software_engineering_team>` | <e.g. delivered the archive Task, 2026-10-08> |

## Waiting for something other than a Task

Tasks created for later dispatch that wait for the user's word, a release, or another trigger. A Task that waits only for other Tasks needs no row: its `depends_on` records that. Move a row to open dispatches when you dispatch it.

| Key | Task | Waiting for | Created |
| --- | --- | --- | --- |
| `<key, e.g. shop-42>` | <short title> | <e.g. the user's go-ahead; the next release> | <date> |

## Your questions waiting for the user

Your own questions to the user, such as a dispatch approval or a plan change. Remove a row once the user answers.

| Key or plan | Question | Asked |
| --- | --- | --- |
| `<key>` or `<plan folder>` | <e.g. dispatch to the software team?> | <date> |

## Open dispatches

Tasks you delegated that are not yet closed. Copy ID: what `delegate_task` takes for a follow-up (a Team's `target_team_run_id`, an Agent's `target_agent_run_id`). Message ID: what `send_message_to` takes (the Agent's run, or the Team's `target_team_coordinator_agent_run_id`).

| Key | Task | Worker | Copy ID | Message ID | Dispatched | Approval |
| --- | --- | --- | --- | --- | --- | --- |
| `<key>` | <short title> | `<address>` | `<target_team_run_id or target_agent_run_id>` | `<agent run ID>` | <date> | <user's words> |

## Closed dispatches

Recent Tasks that are DONE or CANCELLED, kept for follow-up Tasks to the same copy or for reopening. Keep the row of the copy that cut the latest release: the next release goes to it as a follow-up. Move other rows to an archive file beside the board once neither is likely.

| Key | Task | Worker | Copy ID | Message ID | Closed |
| --- | --- | --- | --- | --- | --- |
| `<key>` | <short title> | `<address>` | `<target_team_run_id or target_agent_run_id>` | `<agent run ID>` | <DONE or CANCELLED, date> |
