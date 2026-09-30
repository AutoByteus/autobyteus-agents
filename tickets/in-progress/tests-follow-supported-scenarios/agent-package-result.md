# Agent Package Creation Result

Use `.claude/skills/agent-package-creation/references/result-and-handoff-contract.md` for field meanings and classification.

- Status: `Completed`
- Operation: `update`
- Package type: `team`
- Update intent: `repair` — make testing and implementation follow the real user and system scenarios the solution designer records
- Target package: `software-engineering-team`, `agent-teams/software-engineering-team/`
- Scope included: API/E2E engineer skill and coverage investigation template; implementation-engineer skill; code-reviewer test-review checklist and report template
- Scope excluded: solution designer, architecture reviewer, shared design principles and examples (already define and apply the rule), confidence categories and thresholds, routing, `.codex/skills` workflow copy
- Request/reference: user request that design, review, and testing follow real user and system scenarios and real production reachability; user correction that the rule is about respecting real usage (a tester opened two tabs to simulate one person, which a real person would not do)

## Summary

The solution designer records real scenarios in the requirements doc (`Relevant Scenarios And Journeys`) and how production reaches each behavior in the design spec (`Relevant Behavior And Production-Path Map`). The shared design principles, architecture reviewer, and code reviewer already apply the supported-scenario gate. The API/E2E engineer had no such rule.

- **API/E2E engineer:** new section `Supported Scenarios And Real Usage` (four rules), placed before the coverage rules. Test the product the way real users and real system events use it. The designer's two tables are the starting basis, not a complete list: the tester adds the real-use scenarios that its investigation of the implemented behavior shows complete coverage needs. It reasons these out itself from the requirements, design, and code; no new routing rule was added (the pre-existing rule for undecidable test validity is unchanged). Every test enters through the real trigger and follows the real actor's or event's steps; a setup real use does not produce (the two-tab race) does not represent the scenario. A scenario the designer recorded as contrived is not tested and cannot fail or lower confidence.
- **Confidence gate and probes:** one line each, pointing at real-use scenarios.
- **Coverage investigation template:** three lines (designer scenarios covered, real-use scenarios added, contrived scenarios not tested). A first draft used a seven-column table and changed the execution report header; both were removed as bloat.
- **Implementation engineer:** one pointer to the shared supported-scenario gate it already reads, instead of restating it.
- **Code reviewer (test review):** one check and one report row: each test enters through the real trigger and follows real steps.

User corrections applied: the rule is positive (respect real usage) rather than "do not invent"; the designer's list is not assumed complete; documents stay lean.

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
| Scope/diff review | `Pass` | 5 skill/template files, +23/−3; confidence categories, thresholds, and report/ledger names unchanged |

## Risks, questions, and blockers

- Behavior is not runtime-tested; watch the first coverage investigation for the new table and for tests that follow real steps.
- Whether a tester-added scenario is real use is the tester's judgment; the code reviewer's test review is the independent check.
- The `.codex/skills` workflow copy is not synchronized, per repository AGENTS.md.

## Next expected action

User reviews and merges the pull request.

## Handoff state

- `get_handoff_rules` called: `Unavailable` (tool not present in this session)
- Handoffs sent: None
- Caller return: Yes, returned to the user with the pull request
