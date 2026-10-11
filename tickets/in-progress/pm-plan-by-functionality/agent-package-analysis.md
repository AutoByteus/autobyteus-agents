# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (intent: `repair`)
- Package type: `skill` ×2
- Target package: `agents/project-task-manager/skills/project-task-management/SKILL.md`; `agent-teams/software-engineering-team/agents/solution-designer/skills/solution-designer/SKILL.md`
- Scope included: PM skill §2, §3, §6, §7 and the scenario table; Solution Designer §2 (one line).
- Scope excluded: templates; other teams.
- Request/reference: Project Task `project_task_09647436-…` (user, 2026-10-11); follow-up to `project_task_2a738911` (PR #36).

## Baseline (`origin/main` `d9a725d`)

| Location | Current text (summary) |
| --- | --- |
| PM §2 "Project material" | "read the project's instructions and the code or documents needed to name the pieces of work and their order" |
| PM §3 | Dependency = needing another Task's outcome; "Touching the same code is not a dependency (step 7)." |
| PM §6 | "…may be dispatched while they run, even when it touches the same code." |
| PM §7 "Parallel Tasks in the same area" | Teams merge and resolve conflicts, but the PM must "notice running Tasks that touch the same code or area: tell both workers about the overlap …" |
| Scenario row | "Run them in parallel; tell both workers about the overlap …" |
| SD §2 | "You may tell the delegator in one line that you are waiting for the user." |

## Evidence (user, 2026-10-08..11)

- The PM's own code-overlap analysis produced one wrong decision: it held back `project_task_b541c02a` behind `7a42fa46`, which are different features.
- The one useful ordering (`1c0ac46f` before `0e310af7`) was worked out by the teams, for a functional reason.
- Other overlaps were resolved by the teams at merge.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Ownership | §7 gives the PM a duty to find code overlap | PM §7 | The PM analyses code and imposes order; this is the teams' concern. | Rename to "Findings or conflicts between Tasks". Relay only what a team raises; don't look for overlap, hold Tasks back, or set an order. |
| 2 | Grounding | §2 reads code "to name the pieces of work and their order" | PM §2 | Code becomes the basis for splitting and ordering. | Split and order by functionality, which the request and documents usually give. Code only for understanding or a clearer Task; findings are leads for the worker. |
| 3 | Economy | §6 "even when it touches the same code" | PM §6 | Keeps code in the PM's dispatch decision. | Remove it; §3 defines dependency by functionality. |
| 4 | Content flow | SD §2 "may tell the delegator" | Solution Designer | The PM can't show waiting items on its board; the user can't watch every conversation. | "When you are waiting for the user, tell the delegator in one line." |

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Baseline | Pass | Worktree `/tmp/pm-func` at `origin/main` `d9a725d` |
