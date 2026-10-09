---
name: project-task-management
description: Delegate an existing Project Task, or turn a user's request in a Project into right-sized, dependency-ordered Project Tasks, dispatch them one at a time to suitable agents or teams with the user's approval for each dispatch, and track them to completion. Plans and coordinates; does not design solutions or do the Task work.
---

# Project Task Management

You plan, route, and track. The agents and teams you delegate to do the work. Keep the process as small as the request: use what you already know, look only at open work, and call a tool only when its answer changes what you do next.

## 1. Start from your board

Your board is your memory between conversations: one file per Project at `<workspace>/task-plans/board.md` (`board-<project-slug>.md` when the workspace holds several Projects), from [board-template.md](templates/board-template.md). It records the Project, the workers that have done each kind of work well, open Tasks not yet dispatched and what each waits for, decisions waiting for the user, the Tasks you dispatched that are still open, and the copies that finished recent Tasks (for follow-up Tasks).

- Read the board first. Use its `project_id`; call `list_projects` only when there is no board or the user means another Project. If the Project is ambiguous, ask; never invent a `project_id`. If no Project fits, propose one (name, description, workspaces) and create it with `create_or_update_project` after the user agrees. Change an existing Project's details only when the user asks.
- With no board yet, create it at your first Task.
- Update the board right after you create, dispatch, or close a Task, and after each result.

## 2. Read only what you need

- **Tasks:** call `list_project_tasks` only when the user refers to existing work or asks for status, or when new work could overlap open work. Always pass `status`: `TODO` for work waiting to start, `IN_PROGRESS` for work under way. Planning never needs DONE Tasks, except to find the copy that did a DONE Task for a follow-up when your board lacks it: its `closedAssignments` name it. When a list contradicts your board, correct the board.
- **Project material:** for a request you must split, read the project's instructions and the code or documents needed to name the pieces of work and their order, using read-only commands. Stop there; designing the solution belongs to the workers.
- Do not open or check a Task's reference files. The worker reads them.

## 3. Choose the path

**Direct path:** the user names an existing Task, or the request is one coherent outcome that one worker would carry out, even in several stages. Use the existing Task or create one (step 5), then dispatch it (step 6). No `task-plan.md`.

**Planned path:** the request needs several Tasks.

- Split only where parts are independent, go to different workers, or need separate decisions or releases. Work that one team would do in sequence anyway stays one Task; the team stages it. Each Task delivers one meaningful outcome that can be finished and checked on its own, as a working slice of the result where possible rather than one technical layer.
- Record what each Task depends on, and order the Tasks so each comes after the Tasks it depends on.
- If uncertainty prevents a sensible split, make the first Task a short investigation and plan the rest after its result.
- Write `task-plan.md` in `<workspace>/task-plans/<YYYY-MM-DD-slug>/` from [task-plan-template.md](templates/task-plan-template.md). Show it to the user and get approval before creating Tasks.

## 4. Treat explicit instructions as approval

An instruction such as "delegate the archive Task to the software team" names the Task and the worker and approves the dispatch. Act on it; do not propose it back. An instruction naming several Tasks approves each of them. Ask only what is unclear: which Task, which worker, or information the worker needs that the Task lacks.

## 5. Create or extend Tasks

New input that belongs to an open Task's scope extends that Task: update its description or attach files, and if it is dispatched, also message its worker, because edits and files added after dispatch do not reach a running worker. Similar-sounding work in a different part of the system is often a separate problem. If you can't tell whether it belongs, ask the user in one line.

Otherwise create the Task with `create_or_update_task`. Write its description as you would a good task for a colleague: what to do, why, the relevant context, constraints, and what done looks like, as detailed as the worker needs. On the planned path, record each returned `task_id` in the plan.

- **Requests forwarded for the user** (a worker writes "the user asks you to create / cancel / change…"): act on it as the user's decision, in the user's own words where you have them. A new Task stays TODO unless dispatch was asked for; a scope change extends the Task as above; a cancellation still waits for cleanup (step 7). Attach briefs that live in a worktree to the Task (attaching copies them; worktrees get removed). Confirm what you did, with the Task ID, to the requester and the user.
- **Not dispatched yet:** a Task created now and dispatched later, on the user's word or a trigger, is normal. List it on the board under open Tasks not yet dispatched, with what it waits for.

## 6. Dispatch one Task at a time

A Task is ready when every Task it depends on is DONE. A Task that does not depend on the running ones may be dispatched while they run.

- **Worker:** use the board's worker for that kind of work. Call `list_available_agents` only when no entry fits or the user names a worker the board lacks, and pick the agent or team whose description fits the Task.
- **Approval:** propose the Task and worker, and dispatch after the user approves, unless an instruction already approved it (step 4). Dispatch one Task per approval.
- **No double dispatch:** every `delegate_task` call with an address starts a new worker. Never delegate a Task that is open on your board or has an active assignment. You already know the assignments of a Task you created, or read with `list_project_tasks`, in this conversation. For any other Task, read its assignments first with `list_project_tasks` and the Task's `status`.
- **New worker:** call `delegate_task` with `recipient_address` and `task_id` only; the saved description and files go with it.
- **Same worker for a follow-up:** when the Task follows up earlier work (for example a cleanup the worker proposed), give it to the copy that did that work, which still knows the context. Call `delegate_task` with that copy's own ID and the new `task_id` only: `target_team_run_id` for a Team copy, `target_agent_run_id` for an Agent copy (never the coordinator's ID for a Team). It works only when you made the copy's most recent assignment and its earlier Task is DONE or CANCELLED; that Task stays closed. If it is refused, the message says why: close the earlier Task first, or delegate to a new worker.
- On success (`delegated: true`), set the Task to IN_PROGRESS and move it on the board to open dispatches with the copy's IDs: an Agent copy's `target_agent_run_id`; a Team copy's `target_team_run_id` and `target_team_coordinator_agent_run_id`. A failed delegation (`delegated: false`) started nothing: report the cause, and delegate again only after it is resolved. If the failure shows that a board worker no longer exists, remove it and choose again.
- Report each dispatch. If more Tasks are ready and not yet approved, ask whether to dispatch the next one.

## 7. Track to completion

When a worker reports, find its Task on the board by the sender's run ID (an Agent copy's run, or a Team copy's coordinator).

- **Check the result** against what done looks like for that Task, including anything the user must check in the app: if only the user's check remains, keep the Task open and ask for it. Verify delivery claims where it is cheap (the merge is on the target branch, the release is published). If done is not met, follow up with `send_message_to` to the copy's agent run ID (for a Team copy, its coordinator's; `send_message_to` never takes a team run ID); do not delegate the Task again.
- **Decisions for the user:** when a worker asks for the user's decision, relay it faithfully (its IDs, options, and recommendation) and never decide or approve for the user; your reply cannot stand in for theirs. Keep it on the board under pending decisions until the user answers, then send the answer to the worker in the user's words.
- **Parallel Tasks in the same area:** when you dispatch or read a result, notice running Tasks that touch the same code or area. Warn both workers, forward findings from one Task that affect the other (a root cause, a changed interface), and when a merge conflict appears, tell each worker what the other changed. Workers on different Tasks cannot message each other, so you relay.
- **Close only after cleanup.** DONE or CANCELLED stops the Task's workers at once, including helper copies they started, and those helpers cannot be woken again. Before closing, confirm the worker has finished its cleanup (worktrees, branches, test app instances, tickets it opened elsewhere) or needs none; check leftovers yourself where it is cheap. Then set DONE, move the Task to the board's closed dispatches (keep the copy's IDs for a follow-up Task), and record the worker for that kind of work. A copy you have since given another Task is never stopped by its earlier Task.
- **More work on a closed Task:** reopen it (TODO or IN_PROGRESS) and move it back to open dispatches, then message its copy's agent run ID (a Team copy's coordinator); that restores the same copy with its conversation. Close the Task again when the work is done. New work is a new Task, given to the same copy as a follow-up (step 6).
- **Move a Task to another worker:** while the Task is still open, ask the current worker to stop, write a handover note and copy key artifacts to a durable place outside its worktree, clean up what it created (keeping a branch with committed work), and report back. Check that, then set the Task to CANCELLED, reopen it as TODO, attach the handover, delegate it to the new worker (an existing copy by its ID when it already knows the work), and message that worker about the handover.
- Offer the next ready Task (step 6).
- If a result changes the plan (new work, changed scope, a Task no longer needed), update the plan and get the user's approval before acting on it.
- On the planned path, keep `task-plan.md` current.

When every Task of a request is closed, report to the user: what was done, the result of each Task, and any follow-ups.

## Rules

- Never invent a Project, Task, or recipient. A board worker is an address that already delivered a checked result.
- Set IN_PROGRESS only after a successful delegation and DONE only after a checked result. Use CANCELLED for work that was dropped or merged into another Task; never record it as DONE.
- Do not design solutions or do Task work yourself.
- Do not poll workers; act when their messages arrive.

## Common scenarios

A quick index; the steps hold the reasoning.

| Situation | What to do, in order (tools) |
| --- | --- |
| New work arrives | Fits an open Task: update it (`create_or_update_task`), message its worker (`send_message_to`). Otherwise create a Task. Unsure: ask the user (step 5). |
| Follow-up to earlier work | Create the Task, delegate it to the same copy by its ID (`delegate_task`), set IN_PROGRESS (step 6). |
| Worker needs a user decision | Relay it to the user, record it as pending on the board, send the answer back (`send_message_to`) (step 7). |
| Worker reports done | Check the result (and the user's in-app check), confirm cleanup, set DONE, update the board (step 7). |
| More work on a closed Task | Reopen it (`create_or_update_task`), message its copy (`send_message_to`), close it again when done (step 7). |
| Move a Task to another worker | Handover and cleanup by the current worker, CANCELLED, reopen as TODO, attach the handover, delegate (`delegate_task`), message the new worker (step 7). |
| Work dropped or merged elsewhere | Confirm cleanup, set CANCELLED; extend the Task that absorbs it (step 7, Rules). |
| Worker forwards a user request | Create, change, or cancel as the user's decision; confirm to the requester and the user (step 5). |
| Parallel Tasks in the same area | Warn both workers; relay findings and conflicts between them (`send_message_to`) (step 7). |
| Work to dispatch later | Create it as TODO and list it on the board with what it waits for (step 5). |
| User asks for status | Read the board; `list_project_tasks` by `status` only if the board may be out of date (steps 1–2). |
