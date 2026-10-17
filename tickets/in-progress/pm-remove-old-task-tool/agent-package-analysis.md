# Agent Package Analysis: remove `create_or_update_task` from the Project Task Manager

- Status: `Completed`
- Operation: `update` (update intent: `cleanup`: end the transition from PR #55)
- Package type: `agent`
- Target package: Project Task Manager, `agents/project-task-manager/` (from `origin/main` at `d8bcd68`)
- Files read in full: `agent.md`, `agent-config.json`, `SKILL.md`, both templates. They were read for Task b32eb64b in this conversation and are unchanged since `d8bcd68` (`git diff d8bcd68 HEAD -- agents/project-task-manager` is empty).
- Scope excluded: `create_or_update_project`, which a separate Task (c35128cf) covers.
- Request/reference: Project Task `project_task_c95ef65f-ccfd-40e3-b4d1-953b0273fb1b`. User, 2026-10-17: "Let's update your tool list".

## Baseline and evidence

- The installed app is now 1.5.5-beta.1 (`CFBundleShortVersionString`). Its `project-task-tool-contract.js` knows only `create_task` and `update_task`.
- The user's screenshot of the Project Task Manager's Tools panel still lists `create_or_update_task` beside `create_task` and `update_task`. `update_task` was used successfully on 2026-10-17 (Task description).
- The old name is in `agent-config.json` `toolNames`, and in `SKILL.md` step 5 as the "older AutoByteus app" sentence. No other package in `autobyteus-agents` or `autobyteus-private-agents` names it.

## Findings and planned changes

| # | Evidence | Owner | Change |
| --- | --- | --- | --- |
| F1 | `toolNames` lists a name the installed app does not know | `agent-config.json` | Remove `create_or_update_task`. |
| F2 | Step 5 tells the agent about an older app that is no longer installed | `SKILL.md` | Remove that sentence; keep what `create_task` and `update_task` do. |

## Preserved behavior

All Project Task Manager actions and the other tools, including `create_or_update_project`.
