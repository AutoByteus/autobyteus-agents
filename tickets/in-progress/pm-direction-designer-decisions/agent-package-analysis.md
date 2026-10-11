# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (intent: `repair`)
- Package type: `skill` ×2
- Target package: `agents/project-task-manager/skills/project-task-management/SKILL.md`; `agent-teams/software-engineering-team/agents/solution-designer/skills/solution-designer/SKILL.md`
- Scope included: both skills; the Solution Designer `agent.md`, `references/requirements-engineering.md`, `templates/requirements-doc-template.md`, `team.md`, `team-config.json`; the PM `agent.md` and templates; other teams' designers and coordinators for the same pattern.
- Scope excluded: Product Team procedure (noted only); Agent Package Creator references; uncommitted local edits in the main checkout.
- Request/reference: Project Task `project_task_3c51140d-…` (user, 2026-10-11): the Project Task Manager sets the direction (~80%); the worker's designer owns the details and asks the user directly for real product or scope decisions.

## Baseline (`origin/main` `66e417b`)

| File | Current responsibility |
| --- | --- |
| PM skill §5 (line 43) | Task description: "what to do, why, the relevant context, constraints, and what done looks like, as detailed as the worker needs". "What to do" and "as detailed as the worker needs" invite design options and steps. |
| PM skill §7 (line 65) and scenario row (line 91) | "When a worker asks for the user's decision, relay it faithfully … your reply cannot stand in for theirs." Every decision a worker sends is relayed, whatever its kind. |
| Solution Designer skill §1–§2 | Investigates, writes requirements, records explicit user approval. Nothing says which decisions are the designer's own, or where to ask the user when another agent delegated the Task. Line 264: "A routine approval hold remains in the requirements conversation rather than triggering a handoff." |
| Solution Designer `agent.md` | "If no rule matches, return the result to the user or calling workflow." For a delegated Task, the calling workflow is the PM. |
| `requirements-engineering.md` | "If a material product decision remains open, keep the package `Draft` or `Ready for Approval`" (line 129); downstream scope changes need explicit user approval (line 26). |
| `requirements-doc-template.md` | "Open Decisions And Questions" table with a `Decision Owner` column. |

## Observed defect

Task `project_task_b541c02a-…` (delegated-copy-task-locator): after the user had approved the UI design, the Solution Designer sent "SR-001 ready for approval" with DEC-001 (which hosts show the summary) and DEC-002 (click on pages without a right panel) to the PM to relay. The user then delegated both back ("Resolved: … Solution Designer under user delegation (2026-10-11)", `requirements-doc.md` lines 215–216 in that ticket). The PM relayed DEC tables repeatedly between 2026-10-08 and 2026-10-11.

## Preserved behavior

- Explicit user approval of the requirements basis before design. "Never mark requirements Approved without explicit user approval." Scope changes need the user.
- The PM never decides or approves for the user; its reply can't stand in for theirs; answers go back in the user's words.
- Handoff rules and routes in `team-config.json`; Product Design request flow.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Content flow | PM §5 line 43: "what to do … as detailed as the worker needs" | PM skill | Tasks carry the PM's design guesses and steps; workers follow them instead of reasoning, and detail questions come back. | Describe Tasks at direction level: problem, why, facts and evidence, constraints, done. Leave the solution to the worker unless the user decided it. |
| 2 | Ownership | PM §7 line 65 and scenario row 91 relay every decision | PM skill | Detail decisions travel worker → PM → user → PM → worker, which is slow and loses detail. | Decisions within the direction go back to the worker. Real user decisions: the worker asks the user in its own conversation; the PM tells the user who is waiting. Relay faithfully only when really needed. |
| 3 | Ownership | Solution Designer skill has no rule on which decisions are its own | Solution Designer skill | It lists solution details as open user decisions. | Treat a delegated Task as a direction. Decide details within it, recording the choice and rationale. Leave only scope or product-direction decisions for the user. |
| 4 | Content flow | `agent.md` "return the result to … calling workflow" plus no "where to ask" rule | Solution Designer skill §2 | Approval requests go to the delegator, whose reply can't count as approval. | Ask the user directly in its own conversation; optionally tell the delegator in one line that it is waiting. Accept a delegator's message as the user's decision only when it carries the user's words. |

## Other teams (same pattern?)

- Product Team `product-experience-design`: the user confirms the visual design, and the report has a "User Decision Still Required" column. These are user-facing design choices, which the user legitimately owns, and nothing routes them through a delegator. Not the same problem: no change.
- Evidence-Driven Delivery Team, other teams: no rule relays decisions via a delegator. No change.

## Planned changes

- PM skill §5: Task descriptions at direction level.
- PM skill §7 "Decisions for the user", plus the scenario row: refine as in finding 2.
- Solution Designer skill: direction paragraph in Inputs; one §1 bullet on deciding details; one §2 bullet on asking the user directly.

Deliberately left out:
- The requirements template: its `Decision Owner` column already supports this.
- `agent.md` files: they point to the skill.
- An anti-pattern entry: the creator's anti-pattern file has uncommitted local entries 15–16, so a new number would clash again. Proposed as a follow-up.

## Open questions and approvals

- None. The Task states the user's decision.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Baseline from `origin/main` | Pass | Worktree `/tmp/pm-direction` at `66e417b` |
| Example evidence | Observed | `/Users/normy/autobyteus_org/autobyteus-worktrees/delegated-copy-task-locator/tickets/in-progress/delegated-copy-task-locator/requirements-doc.md` lines 16, 215–216 |
| Same-pattern sweep | Pass | `grep` for caller/delegator/relay with decision/approval across `agents/` and `agent-teams/` SKILL files |
