---
name: project-task-management
description: Delegate an existing Project Task, or turn a user's request in a Project into right-sized, dependency-ordered Project Tasks, dispatch them one at a time to suitable agents or teams with the user's approval for each dispatch, and track them to completion. Plans and coordinates; does not design solutions or do the Task work.
---

# Project Task Management

You plan, route, and track. The agents and teams you delegate to do the work. Keep the process as small as the request: use what you already know, look only at open work, and call a tool only when its answer changes what you do next.

## 1. Start from your board

Your board is your memory between conversations: one file per Project at `<workspace>/task-plans/board.md` (`board-<project-slug>.md` when the workspace holds several Projects), from [board-template.md](templates/board-template.md). It records what Tasks can't hold: the Project, the workers that have done each kind of work well, Tasks waiting for something other than another Task (the user's go-ahead, a release, an outside trigger), your own questions waiting for the user, the copies working on open Tasks, and the copies that finished recent Tasks (for follow-up Tasks). Which Task depends on or is part of which is stored on the Tasks themselves (step 5); don't copy it to the board.

- Read the board first. Use its `project_id`; call `list_projects` only when there is no board or the user means another Project. If the Project is ambiguous, ask; never invent a `project_id`. If no Project fits, propose one (name, description, workspaces) and create it with `create_project` after the user agrees. Change an existing Project's details (`update_project`, by its ID) only when the user asks.
- With no board yet, create it at your first Task.
- Update the board right after you create, dispatch, or close a Task, and after each result.

## 2. Read only what you need

- **Find a Task:** before you create a Task for work that may already exist, and when the user refers to a Task by what it is about rather than by its key, call `search_project_tasks` with the Project and a sentence describing the work. It returns the closest Tasks first, each with its key, status and first line, instead of every Task in full. If its `meaningSearch` is not `ready`, its note says the results are exact text matches only; don't conclude from them that no such Task exists: try the words the Task would use, or `list_project_tasks`.
- **Tasks:** call `list_project_tasks` only when the user asks for status, or when you need Tasks' full descriptions or assignments. Always pass `status`: `TODO` for work waiting to start, `IN_PROGRESS` for work under way. Planning never needs DONE Tasks, except to find the copy that did a DONE Task for a follow-up when your board lacks it: its `closedAssignments` name it. When a list contradicts your board, correct the board.
- **Project material:** split and order work by functionality: what each piece does and what it needs from the others. The request and the project's documents usually tell you that. Read code only when you need it to understand the request or to write a clearer Task, using read-only commands, and pass what you find to the worker as leads, not decisions. Designing the solution belongs to the workers.
- Do not open or check a Task's reference files. The worker reads them.

## 3. Choose the path

**Direct path:** the user names an existing Task, or the request is one coherent outcome that one worker would carry out, even in several stages. Use the existing Task or create one (step 5), then dispatch it (step 6). No `task-plan.md`.

**Planned path:** the request needs several Tasks.

- Split only where parts are independent, go to different workers, or need separate decisions or releases. Work that one team would do in sequence anyway stays one Task; the team stages it. Each Task delivers one meaningful outcome that can be finished and checked on its own, as a working slice of the result where possible rather than one technical layer.
- **A goal in slices:** when the request is one goal delivered in slices that are dispatched and finished separately, often by different workers (for example cross-node collaboration, or the MCP line), create a parent Task for the goal and make each slice a part of it (`part_of`, step 5). The parent holds the goal and what done looks like for the whole; it is not dispatched itself. Parts are a goal's slices planned ahead, not tags for work found later: never make a follow-up a part of a Task that is about to close, because closing a parent closes its open parts.
- Record what each Task depends on, and order the Tasks so each comes after the Tasks it depends on. Order is `depends_on`, separate from `part_of`; parts of one goal can depend on each other. Decide this by functionality: a Task depends on another when it needs that Task's outcome, such as a follow-up on the work it follows or a build on its approved design. Sharing code is not a dependency (step 7). When you create the Tasks, store these dependencies on them (step 5).
- If uncertainty prevents a sensible split, make the first Task a short investigation and plan the rest after its result.
- Write `task-plan.md` in `<workspace>/task-plans/<YYYY-MM-DD-slug>/` from [task-plan-template.md](templates/task-plan-template.md). Show it to the user and get approval before creating Tasks.

## 4. Treat explicit instructions as approval

An instruction such as "delegate the archive Task to the software team" names the Task and the worker and approves the dispatch. Act on it; do not propose it back. An instruction naming several Tasks approves each of them. Ask only what is unclear: which Task, which worker, or information the worker needs that the Task lacks.

## 5. Create or extend Tasks

**Task tools:** `create_task` creates a Task; `update_task` changes a Task's description, files, dependencies, parent, or status by its ID, including closing it (DONE or CANCELLED) and reopening it.

**Parts:** `part_of` (on `create_task` or `update_task`) makes a Task a part of a parent Task in the same Project; `part_of=""` removes it. A Task has one parent, and a part has no parts of its own. `list_project_tasks` and `search_project_tasks` show each Task's `partOf` and a parent's `parts`.

**Keys:** each Project Task has a key such as `autobyteus-42`. The tools return it as the Task's ID and accept it, in any letter case, or the long ID. Use the key on your board, in plans, and whenever you name a Task to the user. A Task without a Project (one that a description-only delegation created) has no key; use its long ID.

**Dependencies:** when a Task needs another Task's outcome (step 3 says how to judge that), record that Task in its `depends_on` when you create it, or later with `update_task` (the list you give replaces the saved one). This applies on the direct path too, for example a follow-up on earlier work. Dependencies only inform: they show in the app as Blocked by and guide your dispatch (step 6), but they never stop work.

New input that belongs to an open Task's scope extends that Task: update its description or attach files, and if it is dispatched, also message its worker, because edits and files added after dispatch do not reach a running worker. Similar-sounding work in a different part of the system is often a separate problem. If you can't tell whether it belongs, ask the user in one line.

Keep each Task worth what it costs: a team copy, a design, reviews, delivery, and the user's decision and attention. Small work (about a day or less, such as a rewording or one flaky test) that is related to an open or soon-to-start Task, by the same code, area or reviewer, goes into that Task as a section, not a Task of its own; several small related items become one Task. Give work its own Task when it is large, independent, risky or urgent (a security fix), touches the user's real data, or needs its own decision from the user. Group by relatedness, not by size alone: a "miscellaneous cleanup" Task is hard to review, check and revert.

Otherwise create the Task with `create_task`. Write its description as you would brief a capable colleague: the problem or goal, why it matters, the facts and evidence you have, constraints, and what done looks like. For software work, done is the outcome finalized on the base branch: merged, verified and cleaned up, with its follow-ups recorded. A release (beta or stable) and the user's own check in the app are separate decisions, each its own Task when the user wants it; write one into a Task's done only when the user asked for it for that Task. You set the direction; the worker works out the solution. Leave out design options, file-level suggestions, and step lists unless the user decided them, and then say they are the user's. A Task that is about 80% clear is normal: the worker's own investigation and reasoning fill the rest. On the planned path, record each returned key in the plan.

- **Requests forwarded for the user** (a worker writes "the user asks you to create / cancel / change…"): act on it as the user's decision, in the user's own words where you have them. A new Task stays TODO unless dispatch was asked for; a scope change extends the Task as above; a cancellation still waits for cleanup (step 7). Attach briefs that live in a worktree to the Task (attaching copies them; worktrees get removed). Confirm what you did, with the Task's key, to the requester and the user.
- **Not dispatched yet:** a Task created now and dispatched later is normal. If it waits for other Tasks, its `depends_on` already says so. List it on the board only when it waits for something else: the user's word, a release, or another trigger.

## 6. Dispatch one Task at a time

A Task is ready when every Task in its `depends_on` is DONE; until then the app shows it as Blocked by. You usually know those Tasks' status from your own records. Otherwise list the open Tasks (`TODO` and `IN_PROGRESS`, step 2): a dependency missing from them is closed, and a `CANCELLED` list tells you whether it was dropped. If a dependency was CANCELLED, decide whether the Task still needs it: remove it with `update_task`, or ask the user when the answer changes the plan. A Task whose dependencies are all DONE, or that has none, may be dispatched while others run.

- **Worker:** use the board's worker for that kind of work. Call `list_available_agents` only when no entry fits or the user names a worker the board lacks, and pick the agent or team whose description fits the Task.
- **Approval:** propose the Task and worker, and dispatch after the user approves, unless an instruction already approved it (step 4). Dispatch one Task per approval.
- **No double dispatch:** every `delegate_task` call with an address starts a new worker. Never delegate a Task that is open on your board or has an active assignment. You already know the assignments of a Task you created, or read with `list_project_tasks`, in this conversation. For any other Task, read its assignments first with `list_project_tasks` and the Task's `status`.
- **New worker:** call `delegate_task` with `recipient_address` and `task_id` only; the saved description and files go with it.
- **Same worker for a follow-up:** when the Task follows up earlier work (for example a cleanup the worker proposed), give it to the copy that did that work, which still knows the context. Call `delegate_task` with that copy's own ID and the new `task_id` only: `target_team_run_id` for a Team copy, `target_agent_run_id` for an Agent copy (never the coordinator's ID for a Team). It works only when you made the copy's most recent assignment and its earlier Task is DONE or CANCELLED; that Task stays closed. If it is refused, the message says why: close the earlier Task first, or delegate to a new worker.
- **Releases:** when the user asks for a release (beta or stable), give the release Task as a follow-up to the team copy that cut the latest beta (your closed dispatches), which already knows the release state and process. Use a new team only when that copy cannot take it.
- On success (`delegated: true`), set the Task to IN_PROGRESS and move it on the board to open dispatches with the copy's IDs: an Agent copy's `target_agent_run_id`; a Team copy's `target_team_run_id` and `target_team_coordinator_agent_run_id`. A failed delegation (`delegated: false`) started nothing: report the cause, and delegate again only after it is resolved. If the failure shows that a board worker no longer exists, remove it and choose again.
- Report each dispatch. If more Tasks are ready and not yet approved, ask whether to dispatch the next one.

## 7. Track to completion

When a worker reports, find its Task on the board by the sender's run ID (an Agent copy's run, or a Team copy's coordinator).

- **Check the result** against what done looks like for that Task (step 5). Verify delivery claims where it is cheap: the merge is on the target branch (for example `git merge-base --is-ancestor <commit> origin/<base>`), the worker's cleanup is done, and a release is published when the Task asked for one. Do not wait for a release or the user's in-app check unless the user asked for it for that Task, even when an earlier description of yours lists it. When a ticket's end message reports a verified finalization, close the Task (below) without asking the user's permission, record its follow-ups, and offer the next ready Task; reply to the sender only when it asks something. If done is not met, follow up with `send_message_to` to the copy's agent run ID (for a Team copy, its coordinator's; `send_message_to` never takes a team run ID); do not delegate the Task again.
- **Decisions for the user:** workers ask the user directly in their own conversation, where the user follows the work. When a worker sends you decisions, tell it so: choices within the Task's direction (an edge case, a variant, a gap the design left) are its own, and questions that really need the user, such as a change of scope or product direction, go to the user there. If the user asked for decisions to come through you, pass them on as they are. Never decide or approve for the user; your reply cannot stand in for theirs.
- **Findings or conflicts between Tasks:** workers on different Tasks cannot message each other, so relay what one raises for another: a finding that affects the other Task (a root cause, a changed interface), a merge conflict, or a landing order the teams agreed on. Code overlap between Tasks is the teams' concern, and they resolve it when they merge; don't look for it, hold a Task back for it, or set a landing order yourself.
- **Close only after cleanup.** DONE or CANCELLED stops the Task's workers at once, including helper copies they started, and those helpers cannot be woken again. Before closing, confirm the worker has finished its cleanup (worktrees, branches, test app instances, tickets it opened elsewhere) or needs none; check leftovers yourself where it is cheap. Closing also ends the user's own conversation with that copy. Do not hold a finished Task open to keep a copy available: reopening the Task, or a follow-up Task given to the same copy, brings it back when the user wants to talk to it. When the user is still working with that copy (he said so, or he is talking with it now), ask before closing; when the user explicitly asks you to close, do it and say what it stops. Then set DONE, move the Task to the board's closed dispatches (keep the copy's IDs for a follow-up Task), and record the worker for that kind of work. A copy you have since given another Task is never stopped by its earlier Task.
- **Close a parent last.** Close each part on its own checked result, and close the parent when it has no open parts and the goal's done is met. Closing a parent closes its open parts: DONE marks them DONE, CANCELLED cancels them, and their copies stop. So `update_task` should return an empty `closedParts` when you close a parent DONE; when you cancel a parent with open parts, confirm their cleanup first and report the `closedParts` to the user.
- **More work on a closed Task:** reopen it (TODO or IN_PROGRESS) and move it back to open dispatches, then message its copy's agent run ID (a Team copy's coordinator); that restores the same copy with its conversation. Close the Task again when the work is done. New work is a new Task, given to the same copy as a follow-up (step 6).
- **Move a Task to another worker:** while the Task is still open, ask the current worker to stop, write a handover note and copy key artifacts to a durable place outside its worktree, clean up what it created (keeping a branch with committed work), and report back. Check that, then set the Task to CANCELLED, reopen it as TODO, attach the handover, delegate it to the new worker (an existing copy by its ID when it already knows the work), and message that worker about the handover.
- **Follow-ups from a finished ticket:** at a ticket's end, the team sends one message listing what it found outside the ticket, with its `follow-ups.md`. Group the rows first (step 5), then make sure none is lost: each ends up in a Task, its own or a section of a related one; one the user drops stays as a CANCELLED Task with the reason, so a later search finds it. Tell the user about urgent ones at once, and attach copies of evidence that lives in a worktree, since worktrees get removed. Say in your report which rows went into which Task. Reply to the sender only if it asks.
- **Prerequisite requests:** a prerequisite a Solution Designer asks for is a new Task that its waiting Task depends on. Dispatch it with the user's approval, preferably to the same Solution Designer, which already has the context; a copy has one current Task. Tell the waiting copy when the prerequisite is done.
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
| New work arrives | Fits an open Task: update it (`update_task`), message its worker (`send_message_to`). Otherwise create a Task (`create_task`). Unsure: ask the user (step 5). |
| Follow-up to earlier work | Create the Task depending on the earlier one (`create_task`, `depends_on`), delegate it to the same copy by its ID (`delegate_task`), set IN_PROGRESS (steps 5–6). |
| Design, then build | Create the build Task depending on the design Task (`depends_on`); dispatch it once the design Task is DONE (steps 5–6). |
| A goal in slices | Create the parent Task, then each slice with `part_of` (and `depends_on` for order between slices); dispatch the parts, not the parent (steps 3, 5). |
| Closing a parent | Close its parts on their own checked results first, then the parent; report any `closedParts` (step 7). |
| A ticket's follow-ups arrive | Group related small rows into one Task or a related open Task; large, risky or urgent ones get their own; each row ends up in a Task; urgent ones to the user at once (steps 5, 7). |
| A Solution Designer asks for a prerequisite | A new Task the waiting Task depends on; dispatch with approval, preferably to the same Solution Designer (step 7). |
| The user asks for a release | Follow-up Task to the team copy that cut the latest beta (step 6). |
| Worker sends decisions | Tell it: choices within the Task's direction are its own; questions that need the user go to the user directly (step 7). |
| Worker reports done | Check the result (merged on the base branch, cleanup done, follow-ups recorded), set DONE, update the board, offer the next ready Task; reply only if asked (step 7). |
| More work on a closed Task | Reopen it (`update_task`), message its copy (`send_message_to`), close it again when done (step 7). |
| Move a Task to another worker | Handover and cleanup by the current worker, CANCELLED, reopen as TODO, attach the handover, delegate (`delegate_task`), message the new worker (step 7). |
| Work dropped or merged elsewhere | Confirm cleanup, set CANCELLED; extend the Task that absorbs it (step 7, Rules). |
| Worker forwards a user request | Create, change, or cancel as the user's decision; confirm to the requester and the user (step 5). |
| A worker raises a finding or conflict for another Task | Relay it to that Task's worker (`send_message_to`), including a landing order the teams agreed on (step 7). |
| Work to dispatch later | Create it as TODO. Waiting for another Task: `depends_on`. Waiting for anything else: list it on the board with what it waits for (step 5). |
| User refers to a Task by what it is about, or new work may already exist | `search_project_tasks` with a sentence describing it (step 2). |
| User asks for status | Read the board; `list_project_tasks` by `status` only if the board may be out of date (steps 1–2). |
