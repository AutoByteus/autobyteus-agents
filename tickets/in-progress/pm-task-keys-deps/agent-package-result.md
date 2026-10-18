# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `agent`
- Update intent: `extend`: Task keys and stored dependencies
- Target package: Project Task Manager, `agents/project-task-manager/`
- Request/reference: Task `autobyteus-agents-24` (project_task_0cee87f3); analysis `agent-package-analysis.md`

## Summary

The Project Task Manager now:

- stores dependencies on the Tasks (`depends_on`) instead of board and plan notes;
- decides readiness from them (ready when every dependency is DONE, a cancelled dependency is a decision, and dependencies only inform);
- names Tasks by key (the long ID only for a Task with no key);
- keeps on the board only what Tasks can't hold.

## Ownership and design decisions

- What counts as a dependency: `SKILL.md` step 3.
- How to store it, and that dependencies only inform: the Dependencies paragraph in step 5.
- Keys: the Keys paragraph in step 5.
- Readiness: step 6.
- The templates only show columns.

## Changed paths

### Modified

- `skills/project-task-management/SKILL.md`:
  - step 1: the board holds what Tasks can't, and dependencies are not copied there;
  - step 3: planned dependencies are stored on the Tasks;
  - step 5: Task tools note (dependencies), Keys and Dependencies paragraphs, keys in plans and confirmations, dispatch-later via `depends_on`;
  - step 6: readiness from `depends_on`, the cancelled-dependency case, and how to read status without listing DONE Tasks;
  - scenarios table: the follow-up and dispatch-later rows, and a new design-then-build row.
- `templates/board-template.md`:
  - "Open Tasks not yet dispatched" becomes "Waiting for something other than a Task", with no "blocked by" waits;
  - Key columns.
- `templates/task-plan-template.md`: Key column; the plan's "Depends on" becomes each Task's `depends_on` when the Tasks are created.

### Added

- `tickets/in-progress/pm-task-keys-deps/` (analysis, result)

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | Pass | `quick_validate.py`: valid |
| Links resolve | Pass | Both template links exist |
| Matches the installed tools | Pass | 1.5.6-beta.1 descriptions of `list_project_tasks`, `create_task` and `update_task`: keys as `taskId`, keys or long IDs accepted, `depends_on` on create and update (replaces on update), `dependsOn` in the list, dependencies only inform |
| `agent-config.json` | N/A | No change; the needed tools are already listed |
| Final review | Pass | Round 1: moved the "store on the Tasks" sentence after step 3's judgement, and cut step 5's repeat of step 3's examples and the sharing-code rule. Round 2: removed the board template's repeat of the key rule. Round 3: no findings. |
| Real run on the new release | Pass | 2026-10-18: a Project Task Manager run with the merged skill (`887e79d`) on app 1.5.6-beta.1 set `depends_on` on the real CI-gating Task (long ID `7ea7804f…`) with `update_task`. The tool accepted long IDs, replaced the list, and returned keys: Task `autobyteus-65`, dependsOn `autobyteus-103`, `autobyteus-104`, `autobyteus-59`, `autobyteus-116`, `autobyteus-115`. The user's screenshot shows the amber "Blocked by autobyteus-59 +4" badge on `autobyteus-65`. |
