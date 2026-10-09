# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (began as `analyze`; user approved on 2026-10-09)
- Package type: `team` (Software Engineering Team)
- Target package: `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/software-engineering-team/` at `origin/main` `590f951`
- Scope included: `shared/design-principles.md`; Solution Designer, Architecture Reviewer, Implementation Engineer, and Code Reviewer skills and templates.
- Scope excluded: changes to any file.
- Request/reference: User, 2026-10-09: dead code (unreachable, no longer used) must be removed; it should be a design principle and a code-review criterion, or the codebase bloats.
- Criteria applied: `package-design-principles.md` §3 (one owner per rule) and §4; anti-patterns 4 (copied rule) and 14.

## Answer

Partly covered, in the wrong place, and only for code a change touches. The shared design principles never mention dead code; they cover removing paths that a change replaces ("clean-cut replacement", "removal is first-class architecture work"). The Implementation Engineer removes dead code "in scope" and the Code Reviewer checks "cleanup completeness in changed scope". The Solution Designer and Architecture Reviewer have no dead-code rule, so a design never plans removal and a design review never checks it.

## Baseline

| File | Dead-code coverage |
| --- | --- |
| `shared/design-principles.md` | None by name. Lines 158–160, 195–199, 277–278, 382, 408: remove obsolete paths, wrappers, and dual paths that the change replaces. |
| Solution Designer skill and templates | None. |
| Architecture Reviewer skill | None. |
| `implementation-engineer/SKILL.md:89` | "Remove superseded paths, dead code, obsolete files, unused helpers/tests/flags/adapters, and dormant replaced paths in scope." Handoff template line 76 records it. |
| `code-reviewer/templates/code-review-report-template.md` | Scorecard row "Dead/obsolete code cleanup completeness in changed scope" (lines 178, 202); mandatory removal table with types `DeadCode`, `UnusedHelper`, `UnusedTest`, `UnusedFlag`, `DormantPath`, … (line 207). |

## Preserved behavior

- Clean-cut replacement and explicit removal of replaced paths.
- Implementation removes and review checks, with the existing removal table.
- Changes stay within approved scope; behavior changes need user approval.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure and ownership | The dead-code rule lives only in two role files; the shared file all four roles read has none (anti-pattern 4 risk: two definitions). | `shared/design-principles.md` | Design and design review ignore dead code; implementation and code review define it separately. | Add a "No dead code" principle to the shared file: what counts as dead, the evidence needed, and the scope rule. The two role files point to it. |
| 2 | Content flow (missing behavior) | Solution Designer and Architecture Reviewer have no dead-code step. | Shared principles (Required Design Questions), design-spec template | Removal is discovered late, at implementation or code review, instead of planned. | A required design question: "Which code in the affected area is dead, and is its removal in the change inventory?"; the Architecture Reviewer checks the answer. |
| 3 | Grounding | "Dead" is not defined; detection method is not stated. | Shared principles | Reviewers judge by impression; risky removals (dynamic imports, reflection, public APIs, plugin entry points) are possible. | Define dead code (unreachable branches, functions/exports/files/imports with no callers, tests of deleted code, flags with one live value, code reachable only from its own tests) and require evidence (no references found by search or compiler/lint/unused-export tools; dynamic and external entry points checked). |
| 4 | Scope (decision needed) | Implementation and review limit removal to "in scope" / "changed scope". | Shared principles | Pre-existing dead code next to the change stays; dead code elsewhere is never recorded. | Proposed rule: dead code in the files and area a change touches is removed in that change, including dead code that was already there; dead code found elsewhere is listed as a follow-up cleanup task, not silently left and not mixed into an unrelated change. |

## Recommended changes

Not applied; they need an `update` request.

1. `shared/design-principles.md`: "No dead code" in Core Principles (definition, evidence, scope); one Required Design Question; one Design Smell.
2. Solution Designer design-spec template: dead-code removals in the change inventory (`Remove`), with evidence.
3. Architecture Reviewer skill: one line to check the dead-code answer.
4. Implementation Engineer and Code Reviewer: replace their own definitions with a pointer to the shared principle; keep the review table and scorecard row, renamed "in the affected area".

## Open questions and approvals

1. Scope: decided (user, 2026-10-09, "use your principles to update"): the recommended scope - remove dead code in the files and modules a change touches, including code already dead there; list dead code found elsewhere as follow-up tasks.

## Handoff state

- `get_handoff_rules` called: `Yes`
- Handoffs sent: None
- Caller return: Yes; no rule matched.
