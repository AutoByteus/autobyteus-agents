# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (intent: `repair`)
- Package type: `team` members (Software Engineering Team): code reviewer (main), Solution Designer requirements template
- Target package: `agent-teams/software-engineering-team/` at `origin/main` `25dd779`
- Scope included:
  - code reviewer `agent.md`, `agent-config.json`, `SKILL.md`, report templates;
  - requirements-doc template ("Request / ticket", Scope Guardrail);
  - for scope-creep patterns: implementation-engineer, api-e2e-engineer and architecture-reviewer skills.
- Scope excluded:
  - how much to validate (Task `9c96bc42`);
  - `team-config.json` routes (unchanged; follow-up requests go outside the team);
  - other roles' existing follow-up lists (see Findings 6).
- Request/reference: Project Task `project_task_62a46806-…` (user, 2026-10-13).

## Baseline

| Location | Current rule |
| --- | --- |
| requirements-doc template, "Scope Guardrail (Mandatory)" | "The canonical change boundary for requirements, architecture design, implementation, and technical review." It has In-Scope Use Cases, Out Of Scope, Non-Goals, Preserved Behavior Boundary, and Review Authority. Review Authority says every blocking finding "must cite an approved requirement, acceptance criterion, or preserved-behavior ID", and "an adjacent concern outside the approved boundary may be recorded as a non-blocking … separate-ticket candidate". |
| requirements-doc template line 12 | "Request / ticket:". It doesn't record who requested the work, so it gives no destination for follow-ups. |
| architecture reviewer `SKILL.md` line 71 | "Treat a concern that the scope guardrail explicitly places out of scope as non-blocking unless evidence shows the design violates a different approved requirement." |
| implementation engineer `SKILL.md` lines 64–66, 89 | Stays within the Scope Guardrail; "List dead code found elsewhere as a follow-up." |
| api-e2e engineer `SKILL.md` lines 98, 110 | Existing tests get an `Out Of Scope` disposition; "Do not use this stage to introduce unrelated test or source architecture changes." |
| code reviewer `SKILL.md` | Step 2 confirms "out-of-scope behavior" but never uses it. The candidate gate offers only `Promote` / `Hold for Evidence` / `Reject`, and every promoted finding becomes a `Local Fix` / `Design Impact` / … routed into this ticket. "Audit existing as well as newly introduced … machinery" (line 193). The failure-origin list has no "pre-existing, unrelated to this change". |
| code reviewer `agent-config.json` | `send_message_to`, `get_handoff_rules`; no `list_available_agents`. |

## Observed defect (user, 2026-10-13)

A UI ticket was implemented and passed API/E2E. Back at code review, the reviewer found an unrelated problem, analysed it, and sent it to the implementation engineer, who started fixing it in the ticket. Each round found more, so the scope kept growing. That return to code review was the successful-API/E2E test-code review, whose rules already limit it to "durable test files added, updated, or removed during API/E2E".

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Ownership / content flow | The code reviewer doesn't apply the guardrail's Review Authority; the architecture reviewer does (line 71) | code reviewer `SKILL.md` | Promoted findings outside the ticket reopen implementation, round after round. | A "Ticket Scope" section: the guardrail is the boundary. For each promoted finding, judge in-ticket vs `Follow-up` (caused by this change, blocks an in-scope acceptance criterion or preserved behavior, or a trivial fix in code the change touches, versus pre-existing and unrelated), with worked examples including the user's UI case. |
| 2 | Content flow | No follow-up path | code reviewer `SKILL.md`, `agent-config.json` | Out-of-scope findings either grow the ticket or are lost. | Record follow-ups in the report and send one follow-up request to the agent that manages the project's Tasks (the requester recorded in the requirements doc, or one found with `list_available_agents`). If there is none, leave them in the report. A follow-up never fails the review or reopens implementation. Add `list_available_agents`. |
| 3 | Content flow | The failure-origin list lacks "pre-existing, unrelated" | code reviewer `SKILL.md` | An unrelated failing test is attributed to this ticket. | Add that origin: send a follow-up and return to API/E2E to record it as out of scope. |
| 4 | Clarity | Entry points | code reviewer `SKILL.md` | Test-code and failure-origin reviews widened into source review (the user's case). | One line: an unrelated observation at any entry point is a follow-up, not a reason to widen the review. |
| 5 | Grounding | requirements-doc "Request / ticket:" | Solution Designer requirements template | The reviewer can't tell who manages the Task. | "Request / ticket, and the requester or delegating agent's address:". |
| 6 | Consistency | The implementation engineer lists follow-ups; the architecture reviewer has "separate-ticket candidates"; neither sends them anywhere | — | Not scope creep; those roles already stay in scope. | No change in this PR (the smallest coherent delta). Noted as a possible follow-up: one shared follow-up path for the team. |

The Solution Designer needs no new scope statement: the Scope Guardrail and Review Authority are already firm, so the fix is that the code reviewer applies them.

## Principle check of the follow-up path

§6: "A role never contacts anyone that neither the user nor the rules named." The follow-up recipient sits outside the team, so a team rule can't name it. Here the user named the path explicitly (follow-ups to the Project Task Manager, found with `list_available_agents`), and the Task's own requester is recorded in the package. The skill names the role generically ("the agent that manages the project's Tasks"), not another team's internals (anti-pattern 3).
