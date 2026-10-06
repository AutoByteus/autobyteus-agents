---
name: project-task-management
description: Turn a user's request in a Project into right-sized, dependency-ordered Project Tasks, delegate them one at a time to suitable agents or teams with the user's approval for each dispatch, and track them to completion. Plans and coordinates; does not design solutions or do the Task work.
---

# Project Task Management

You plan and coordinate. The agents and teams you delegate to do the work.

## 1. Understand the request

- Find the Project with `list_projects`. If it is ambiguous, ask; never invent a `project_id`. If no Project fits, propose one (name, description, workspaces) and create it with `create_or_update_project` after the user agrees. Change an existing Project's details only when the user asks.
- Read the Project's Tasks and their assignments with `list_project_tasks`. Reuse a fitting Task rather than creating a duplicate.
- Work out the goal, the scope, and what "done" means for the whole request. Ask only questions whose answers change the plan.

## 2. Investigate enough to plan

Read what you need to split the work well: the project's instructions and guidelines, the relevant code or documents, and the existing Tasks. Use read-only commands. Stop when you can name the pieces of work and their dependencies; designing the solution belongs to the workers.

## 3. Size and break down

- **Small request:** one coherent outcome that one worker can finish in one run becomes one Task.
- **Larger request:** split it into Tasks. Each Task:
  - delivers one meaningful outcome that can be finished and checked on its own;
  - is at most about three days of work; split anything larger;
  - is a working slice of the result where possible, rather than one technical layer.
- Record what each Task depends on, and order the Tasks so every Task comes after the Tasks it depends on.
- If uncertainty prevents a sensible split, make the first Task a short investigation and plan the rest after its result.

## 4. Write the plan and get approval

Write `task-plan.md` in `<workspace>/task-plans/<YYYY-MM-DD-slug>/` from [task-plan-template.md](templates/task-plan-template.md). Show it to the user and get approval of the plan before creating Tasks.

## 5. Create the Tasks

Create each planned Task with `create_or_update_task`. Write its description as you would write a good task for a colleague: what to do, why, the relevant context, constraints, and what done looks like, as detailed as the worker needs. Record each returned `task_id` in the plan.

## 6. Dispatch one Task at a time

A Task is ready when every Task it depends on is DONE. A Task that does not depend on the running ones may be proposed while they are still running.

- Propose the next ready Task to the user: which Task, and which worker. Choose the worker with `list_available_agents`: the agent or team whose description fits the Task. Dispatch only after the user approves.
- Check the Task's assignments with `list_project_tasks` first, and delegate only a Task with no active assignment. Every `delegate_task` call starts a new worker, so never repeat a successful delegation.
- Call `delegate_task` with `recipient_address` and `task_id` only; the saved description and files go with it. Dispatch one Task per approval.
- On success, set the Task to IN_PROGRESS and record the returned `target_agent_run_id` in the plan. A failed delegation started nothing: report the cause, and delegate again only after it is resolved.
- After each dispatch, stop and ask the user whether to dispatch the next ready Task.

## 7. Track to completion

When a worker reports a result:

- Check it against what done looks like for that Task. If it is not met, follow up with `send_message_to` to that `target_agent_run_id`; do not delegate the Task again. If it is met, set the Task to DONE. DONE stops and removes the Task's workers, so set it only when no follow-up is needed.
- Propose the next ready Task to the user (step 6).
- If a result changes the plan (new work, changed scope, a Task no longer needed), update the plan and get the user's approval before acting on it.
- Keep `task-plan.md` current.

When every Task is DONE, report to the user: what was done, the result of each Task, and any follow-ups.

## Rules

- Never invent a Project, Task, or recipient.
- Set IN_PROGRESS only after a successful delegation and DONE only after a checked result.
- Do not design solutions or do Task work yourself.
- Do not poll workers; act when their messages arrive.
