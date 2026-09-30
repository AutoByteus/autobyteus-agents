# Agent Package Creation Result

Use `.claude/skills/agent-package-creation/references/result-and-handoff-contract.md` for field meanings and classification.

- Status: `Completed`
- Operation: `update`
- Package type: `team`
- Update intent: `repair` — make testing and implementation follow the real user and system scenarios the solution designer records
- Target package: `software-engineering-team`, `agent-teams/software-engineering-team/`
- Scope included: API/E2E engineer skill and two templates; implementation-engineer skill; code-reviewer test-review checklist and report template
- Scope excluded: solution designer, architecture reviewer, shared design principles and examples (already define and apply the rule), confidence categories and thresholds, routing, `.codex/skills` workflow copy
- Request/reference: user request that design, review, and testing follow real user and system scenarios and real production reachability; user correction that the rule is about respecting real usage (a tester opened two tabs to simulate one person, which a real person would not do)

## Summary

The solution designer records real scenarios in the requirements doc (`Relevant Scenarios And Journeys`: `SCN-*`, trigger, validity) and how production reaches each behavior in the design spec (`Relevant Behavior And Production-Path Map`). The shared design principles, architecture reviewer, and code reviewer already apply the supported-scenario gate. The API/E2E engineer had no such rule, and the implementation engineer had it only through the shared principles.

- **API/E2E engineer:** new section `Supported Scenarios And Real Usage`, placed before the coverage rules. Test the product the way real users and real system events use it; the two upstream tables are the authority. Build every test from a supported scenario, enter through its approved trigger, and follow the real actor's or event's steps with the sessions, order, and timing real use produces. Keep the simulation true to real use (the two-tab race is the named example); concurrency, multiple sessions, or forced timing only when the scenario defines them. A contrived scenario gets no test, cannot produce a `Fail`, and is not missing evidence. Material behavior without a supported scenario is routed, not tested as approved.
- **Confidence gate:** scores count supported scenarios exercised as real use only.
- **Probes:** a bug probe enters through the scenario's approved trigger.
- **Templates:** the coverage investigation gains a table linking each product scenario to the real steps the test follows and its planned tests; the execution report's evidence matrix names the product scenario.
- **Implementation engineer:** build for real use; fallback, recovery, defensive, concurrency, or lifecycle machinery, and tests for it, only for a supported scenario; otherwise `Requirement Gap`.
- **Code reviewer (test review):** one check that each test enters through the approved trigger and follows real steps.

## Ownership and design decisions

- Which scenarios are real, and their production path: solution designer's requirements doc and design spec (unchanged authority)
- How tests respect them: API/E2E `SKILL.md`, section `Supported Scenarios And Real Usage`; the operating sequence, confidence gate, and probe rule point to it
- Evidence of the link: coverage investigation and execution report templates
- Independent check of test fidelity: code-reviewer test-review checklist and report row
- Wording follows the authoring principle for prohibitions: positive route first, then the plausible mistake it prevents

## Changed paths

### Added

- `/Users/normy/autobyteus_org/autobyteus-agents/tickets/in-progress/tests-follow-supported-scenarios/agent-package-result.md`

### Modified

- `agent-teams/software-engineering-team/agents/api-e2e-engineer/skills/api-e2e-engineer/SKILL.md`
- `agent-teams/software-engineering-team/agents/api-e2e-engineer/skills/api-e2e-engineer/templates/api-e2e-coverage-investigation-template.md`
- `agent-teams/software-engineering-team/agents/api-e2e-engineer/skills/api-e2e-engineer/templates/api-e2e-execution-coverage-report-template.md`
- `agent-teams/software-engineering-team/agents/implementation-engineer/skills/implementation-engineer/SKILL.md`
- `agent-teams/software-engineering-team/agents/code-reviewer/skills/code-reviewer/SKILL.md`
- `agent-teams/software-engineering-team/agents/code-reviewer/skills/code-reviewer/templates/api-e2e-test-review-report-template.md`

### Moved or renamed

- None

### Removed

- None

## Approval state

- State: `Approved`
- Evidence or decision reference: user request and correction in conversation

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | `N/A` | No JSON changed |
| Frontmatter and names align | `Pass` | Frontmatter unchanged |
| Skill validator | `Pass` | `quick_validate.py`: api-e2e-engineer, implementation-engineer, code-reviewer valid |
| Markdown links and references resolve | `Pass` | No links added or changed |
| Term consistency | `Pass` | Section name identical in the API/E2E skill and template; `Relevant Scenarios And Journeys` and `Relevant Behavior And Production-Path Map` match the solution designer's template headings; validity labels match the shared design principles |
| Member refs and routes | `N/A` | Routing unchanged; `Requirement Gap`/`Unclear` already routed |
| Scope/diff review | `Pass` | 6 files; confidence categories, thresholds, and report/ledger names unchanged |

## Risks, questions, and blockers

- Behavior is not runtime-tested; watch the first coverage investigation for the new table and for tests that follow real steps.
- The templates use `Scenario ID` for test scenarios and `SCN-*` for product scenarios; the skill states the difference, but the column was not renamed to avoid changing report structure.
- The `.codex/skills` workflow copy is not synchronized, per repository AGENTS.md.

## Next expected action

User reviews and merges the pull request.

## Handoff state

- `get_handoff_rules` called: `Unavailable` (tool not present in this session)
- Handoffs sent: None
- Caller return: Yes, returned to the user with the pull request
