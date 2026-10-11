# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (intent: `repair`)
- Package type: `skill`
- Target package: `agents/project-task-manager/skills/project-task-management/SKILL.md`
- Scope included: the skill (§3, §6, §7, scenario table) and its `task-plan-template.md` (`Depends on` column).
- Scope excluded: worker teams' skills (their branch-and-merge practice is already how they work); Task relationships design (Task `project_task_21c58d74`).
- Request/reference: Project Task `project_task_2a738911-…` (user, 2026-10-11).

## Baseline (`origin/main` `79765da`)

| File | Current responsibility |
| --- | --- |
| SKILL §3 line 31 | "Record what each Task depends on, and order the Tasks…". No definition of a dependency. |
| SKILL §6 line 50 | "A Task is ready when every Task it depends on is DONE. A Task that does not depend on the running ones may be dispatched while they run." |
| SKILL §7 line 66 | "Parallel Tasks in the same area": warn both workers, forward findings, relay merge conflicts. Doesn't say the Tasks stay independent, or who decides a landing order. |
| Scenario row line 97 | "Warn both workers; relay findings and conflicts between them". |

## Observed defect

On 2026-10-11 the PM told the Task-summary team (`project_task_b541c02a`) to wait for the team-status-colours Task (`project_task_7a42fa46`) because both change the same Workspaces tree row. It also passed "theirs lands first" between the teams. The user and that team's Solution Designer corrected it: the two Tasks are different functionality that only overlap in code. Teams build from the base branch in their own worktree and branch, merge the latest base at delivery, and resolve the conflicts themselves.

## Preserved behavior

- Recording dependencies and dispatching only ready Tasks; one dispatch per approval.
- Telling both workers about the overlap, forwarding findings that affect the other Task, and relaying conflicts (workers can't message each other).

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Clarity | §3 line 31 doesn't define "depends on" | SKILL §3 | Code overlap gets treated as a dependency. | Define it once: a Task depends on another when it needs that Task's outcome (a follow-up on the work it follows, a build on its approved design); sharing code is not a dependency. |
| 2 | Content flow | §6 line 50 | SKILL §6 | Overlapping but independent Tasks get held back. | Independent Tasks may run in parallel even when they touch the same code. |
| 3 | Ownership | §7 line 66 and row 97 | SKILL §7 | The PM imposes a landing order that belongs to the teams. | No hold or landing order from the PM. Teams merge the latest base and resolve conflicts at delivery. Relay an order only when the teams agree one helps. |

## Planned changes

The three findings above in SKILL.md, plus the scenario row. No template change: the `Depends on` column fits the new definition.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Baseline | Pass | Worktree `/tmp/pm-overlap` at `origin/main` `79765da` |
