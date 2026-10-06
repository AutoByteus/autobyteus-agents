# Agent Package Analysis

- Status: `Completed`
- Operation: `update`
- Package type: `team` (Software Engineering Team; testing-guideline handling across members)
- Target package: `/home/autobyteus/workspace/autobyteus-agents/agent-teams/software-engineering-team/`
- Scope included: how every member finds, reads, applies and records the project's testing guideline (`TESTING.md`). Members: api-e2e-engineer, implementation-engineer, code-reviewer, solution-designer, delivery-engineer, architecture-reviewer.
- Scope excluded:
  - any project's `TESTING.md`
  - design-principle handling (done in PRs #27-#29)
  - routes and configs
- Request/reference: user direction (conversation, 2026-10-06), "it's the same for testing.md". The general skills hold general practice for any software project. A project's `TESTING.md` holds that project's specifics. The general layer only says to check for it, apply the general practice, and respect the project's as well. The user delegated the decisions to my reasoning, with the goal that the team works well and consistently. Update intent: `repair`.

## Baseline: how each member handles the project testing guideline

| Member | Reads `TESTING.md`? | Where / when | Conflict rule | Record |
| --- | --- | --- | --- | --- |
| api-e2e-engineer | Yes | `SKILL.md` L50, L55, L62-65: root plus closer `TESTING*.md` before planning validation; fallback to README/AGENTS/scripts | Yes (L64): the guideline doesn't lower the evidence bar or change ownership/routing/safety; on conflict follow the skill and record it; record discrepancies | Coverage investigation: path(s) or `No project testing guideline found` |
| implementation-engineer | Yes | `SKILL.md` L76 (local checks), L131 (UI preview surface); fallback to README/scripts | Partial: "The guideline selects how to check, not who owns the check." No conflict/discrepancy rule. | Handoff template L106 |
| code-reviewer | **No** | Reviews durable API/E2E test code (L233-253) and classifies failure origin, including "fixture/environment/execution issue" (L255-278), without reading the project's testing guideline | n/a | none |
| solution-designer | No | Doesn't plan test execution; verification ownership is downstream | n/a | n/a |
| architecture-reviewer, delivery-engineer | No | No test-execution or test-code judgment | n/a | n/a |

Project side: the workspace `TESTING.md` ("Testing AutoByteus") holds the project specifics, such as layers, `pnpm` commands, Electron main-process tests and live-E2E environment variables. The general skills don't restate them.

## Preserved behavior

- API/E2E discovery, conflict, discrepancy and fallback rules; its desktop validation strategy; its confidence gate.
- The implementation engineer's guideline use and fallback.
- The code reviewer's proportional test-review standard, failure-origin classification and routes.
- No project `TESTING.md` is edited, and no route or config changes.

## Findings

| # | Priority area | Evidence | Owner | Impact | Change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure (missing behavior) | code-reviewer `SKILL.md` L233-253 judges durable test files (isolation, determinism, real-trigger entry, stale tests). L264-273 classifies failures as test, fixture, environment or execution issues. Its "Required Shared Reads" (L77-83) cover only design principles. | `code-reviewer/SKILL.md`; `api-e2e-test-review-report-template.md` | Test code and failure origin are judged without the project's testing rules (layers, fixtures, test locations, execution paths). That is the testing counterpart of reviewing source without `DESIGN.md`. | Under Required Shared Reads: for test-code and failure-origin review, read the project testing guideline(s) the coverage investigation records, apply the skill's general rules, and respect the project's as well. On conflict the skill's rules win and the conflict is recorded. Add a guideline field to the test-review report meta. |
| 2 | Clarity / consistency | implementation-engineer L76 lacks the conflict/discrepancy rule that API/E2E (L64) and the shared design layer have | `implementation-engineer/SKILL.md` | Inconsistent behavior when a project rule conflicts or is stale | Add one sentence: project testing rules add to this skill's rules; on conflict follow this skill and record the conflict in the handoff; record a guideline command or surface that no longer works. |

### Considered and left unchanged

- **API/E2E "Desktop Application Validation Strategy" (L74-80) and its template rows.** This is general practice for any desktop application: separate web-equivalent from shell behavior, take setup from the project's guideline, and don't disrupt the user's running app. "Such as an Electron" names an example category, not project internals. Kept.
- **Implementation engineer: "Do not disrupt an unrelated user-running desktop process".** A general safety rule. Kept.
- **Solution designer.** It doesn't own test execution or test code; requirements carry verification intent only. Adding a `TESTING.md` read would add a duty without a decision that depends on it.
- **A shared "general testing principles" file like `design-principles.md`.** Testing guidance is already owned per role, matched to each role's decision. Extracting it would add a layer without fixing a defect.

## Planned changes

- `agents/code-reviewer/skills/code-reviewer/SKILL.md`: one bullet in Required Shared Reads (Finding 1).
- `agents/code-reviewer/skills/code-reviewer/templates/api-e2e-test-review-report-template.md`: one Review Meta field (Finding 1).
- `agents/implementation-engineer/skills/implementation-engineer/SKILL.md`: one sentence at L76 (Finding 2).

## Open questions and approvals

- Decisions delegated by the user. None open.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Testing-guideline text across the team | Mapped | `grep -i "TESTING\|testing guideline\|electron\|desktop"` over `agent-teams/software-engineering-team` |
| Coverage investigation records guideline path | Yes | `api-e2e-coverage-investigation-template.md` L79 |
| Workspace `TESTING.md` holds the project specifics | Yes | `/home/autobyteus/workspace/autobyteus-workspace/TESTING.md`: layers, commands, environment variables |

## Next action

Apply the planned changes, validate, open and merge the PR.
