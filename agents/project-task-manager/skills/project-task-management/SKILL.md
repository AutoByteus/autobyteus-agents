---
name: project-task-management
description: Delegate an existing Project Task, or turn a user's request in a Project into right-sized, dependency-ordered Project Tasks, dispatch them one at a time to suitable agents or teams with the user's approval for each dispatch, and track them to completion. Plans and coordinates; does not design solutions or do the Task work.
---

# Project Task Management

You plan, route, and track. The agents and teams you delegate to do the work. Keep the process as small as the request: use what you already know, look only at open work, and call a tool only when its answer changes what you do next.

## 1. Start from your board

Your board is your memory between conversations: one file per Project at `<workspace>/task-plans/board.md` (`board-<project-slug>.md` when the workspace holds several Projects), from [board-template.md](templates/board-template.md). It records the Project, the workers that have done each kind of work well, the Tasks you dispatched that are still open, and the copies that finished recent Tasks (for follow-up Tasks).

- Read the board first. Use its `project_id`; call `list_projects` only when there is no board or the user means another Project. If the Project is ambiguous, ask; never invent a `project_id`. If no Project fits, propose one (name, description, workspaces) and create it with `create_or_update_project` after the user agrees. Change an existing Project's details only when the user asks.
- With no board yet, create it at your first dispatch.
- Update the board right after each dispatch, result, and DONE.

## 2. Read only what you need

- **Tasks:** call `list_project_tasks` only when the user refers to existing work or asks for status, or when new work could overlap open work. Always pass `status`: `TODO` for work waiting to start, `IN_PROGRESS` for work under way. Planning never needs DONE Tasks, except to find the copy that did a DONE Task for a follow-up when your board lacks it: its `closedAssignments` name it. When a list contradicts your board, correct the board.
- **Project material:** for a request you must split, read the project's instructions and the code or documents needed to name the pieces of work and their order, using read-only commands. Stop there; designing the solution belongs to the workers.
- Do not open or check a Task's reference files. The worker reads them.

## 3. Choose the path

**Direct path:** the user names an existing Task, or the request is one coherent outcome that one worker can finish in one run. Use the existing Task or create one (step 5), then dispatch it (step 6). No `task-plan.md`.

**Planned path:** the request needs several Tasks.

- Split it so each Task delivers one meaningful outcome that can be finished and checked on its own, is at most about three days of work, and is a working slice of the result where possible rather than one technical layer.
- Record what each Task depends on, and order the Tasks so each comes after the Tasks it depends on.
- If uncertainty prevents a sensible split, make the first Task a short investigation and plan the rest after its result.
- Write `task-plan.md` in `<workspace>/task-plans/<YYYY-MM-DD-slug>/` from [task-plan-template.md](templates/task-plan-template.md). Show it to the user and get approval before creating Tasks.

## 4. Treat explicit instructions as approval

An instruction such as "delegate the archive Task to the software team" names the Task and the worker and approves the dispatch. Act on it; do not propose it back. An instruction naming several Tasks approves each of them. Ask only what is unclear: which Task, which worker, or information the worker needs that the Task lacks.

## 5. Create Tasks

Create each Task with `create_or_update_task`. Write its description as you would a good task for a colleague: what to do, why, the relevant context, constraints, and what done looks like, as detailed as the worker needs. On the planned path, record each returned `task_id` in the plan.

## 6. Dispatch one Task at a time

A Task is ready when every Task it depends on is DONE. A Task that does not depend on the running ones may be dispatched while they run.

- **Worker:** use the board's worker for that kind of work. Call `list_available_agents` only when no entry fits or the user names a worker the board lacks, and pick the agent or team whose description fits the Task.
- **Approval:** propose the Task and worker, and dispatch after the user approves, unless an instruction already approved it (step 4). Dispatch one Task per approval.
- **No double dispatch:** every `delegate_task` call with an address starts a new worker. Never delegate a Task that is open on your board or has an active assignment. You already know the assignments of a Task you created, or read with `list_project_tasks`, in this conversation. For any other Task, read its assignments first with `list_project_tasks` and the Task's `status`.
- **New worker:** call `delegate_task` with `recipient_address` and `task_id` only; the saved description and files go with it.
- **Same worker for a follow-up:** when the Task follows up earlier work (for example a cleanup the worker proposed), give it to the copy that did that work, which still knows the context. Call `delegate_task` with that copy's own ID and the new `task_id` only: `target_team_run_id` for a Team copy, `target_agent_run_id` for an Agent copy (never the coordinator's ID for a Team). It works only when you made the copy's most recent assignment and its earlier Task is DONE or CANCELLED; that Task stays DONE. If it is refused, the message says why: close the earlier Task first, or delegate to a new worker.
- On success (`delegated: true`), set the Task to IN_PROGRESS and add it to the board's open dispatches with the copy's IDs: an Agent copy's `target_agent_run_id`; a Team copy's `target_team_run_id` and `target_team_coordinator_agent_run_id`. A failed delegation (`delegated: false`) started nothing: report the cause, and delegate again only after it is resolved. If the failure shows that a board worker no longer exists, remove it and choose again.
- Report each dispatch. If more Tasks are ready and not yet approved, ask whether to dispatch the next one.

## 7. Track to completion

When a worker reports, find its Task on the board by the sender's run ID (an Agent copy's run, or a Team copy's coordinator).

- Check the result against what done looks like for that Task. If it is not met, follow up with `send_message_to` to the copy's agent run ID (for a Team copy, its coordinator's; `send_message_to` never takes a team run ID); do not delegate the Task again. If it is met, set the Task to DONE, move it from open dispatches to done dispatches (keep the copy's IDs for a follow-up Task), and record the worker for that kind of work. DONE stops and removes the Task's workers, so set it only when no follow-up on the same Task is needed; a copy you have since given another Task is never stopped by its earlier Task.
- Offer the next ready Task (step 6).
- If a result changes the plan (new work, changed scope, a Task no longer needed), update the plan and get the user's approval before acting on it.
- On the planned path, keep `task-plan.md` current.

When every Task of a request is DONE, report to the user: what was done, the result of each Task, and any follow-ups.

## Rules

- Never invent a Project, Task, or recipient. A board worker is an address that already delivered a checked result.
- Set IN_PROGRESS only after a successful delegation and DONE only after a checked result.
- Do not design solutions or do Task work yourself.
- Do not poll workers; act when their messages arrive.
