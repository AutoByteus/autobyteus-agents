# Agent Package Creation Result

Use `.claude/skills/agent-package-creation/references/result-and-handoff-contract.md` for field meanings and classification.

- Status: `Completed`
- Operation: `update`
- Package type: `skill`
- Update intent: `repair` — make the API/E2E and implementation-engineer testing guidance project-neutral; fix defects found in a principles review of both packages
- Target package: `api-e2e-engineer` and `implementation-engineer` bundled skills, `agent-teams/software-engineering-team/agents/`
- Scope included: both skills, their templates where a field restated the removed policy or contradicted the skill, and the API/E2E `agent.md` description
- Scope excluded: workflow, report/ledger names, confidence model, handoff rules and routing, other team skills, `.codex/skills/` workflow copy, `agent-config.json` files, product-repository `TESTING.md`
- Request/reference: user request "make the software-engineering team's testing skills project-neutral", plus the instruction to review both packages against the package principles and apply the reasonable parts independently

## Summary

Removed the hard-coded "browser first, desktop app last resort" policy. Both skills now read the project's testing guideline (`TESTING.md` or an equivalent `TESTING*.md` at the repository root, plus any closer one for the changed code). They fall back to AGENTS.md, README, manifests, test config, and existing tests, and report `No project testing guideline found`. A precedence rule says the guideline chooses how and where to test but cannot lower the evidence bar or override ownership, routing, or safety; conflicts are recorded. The general principles stay: most direct evidence, web vs shell classification, no disruption of the user's running app or data, cleanup of owned resources only, and screenshots as supporting evidence.

## Review findings and decisions

| # | Finding (principle) | Decision |
| --- | --- | --- |
| 1 | Project-specific test policy in a reusable skill (grounding; name a product only when it changes behavior) | Applied: removed from description, responsibility, and desktop section |
| 2 | `api-e2e-engineer/agent.md` description repeated "browser-preferred", but the request left it out (one owner, cross-file consistency) | Applied: description made neutral |
| 3 | Precedence as written would let a guideline weaken the confidence gate (safety/authority gap) | Applied: guideline cannot lower the evidence bar or change ownership, routing, or safety |
| 4 | "Root only" ignored monorepos, while the existing rule reads the closest applicable instructions (consistency) | Applied: root guideline plus any closer guideline for the changed code |
| 5 | Desktop section repeated "first read README", duplicating the discovery rules (one owner) | Applied: points to discovery instead |
| 6 | "Electron-shell" named a platform where the rule is general | Applied: "desktop-shell"; Electron kept only as an example |
| 7 | Implementation engineer had no rule for where local-check commands come from (flow gap) | Applied: reads the guideline before local checks; the guideline selects the method, not the owner |
| 8 | "evidence-basedly" (plain language) | Applied: reworded |
| 9 | Execution report hard-coded `Pass -> code_reviewer`, contradicting the direct low-risk route to Delivery and bypassing `get_handoff_rules` (recipients belong to config) | Applied: "Next recipient from `get_handoff_rules`" |
| 10 | Request said "don't change templates", but three template fields still re-encoded the removed policy (README-only, "Browser-tested") and one field was needed to record the guideline path | Partially departed: changed field labels only; no section, report, or ledger names changed |
| 11 | Second pass: the precedence rule merged two cases (conflict with the skill vs. a stale guideline) and named unspecified "safety rules" (precision) | Applied: split into two sentences; named the environment, data, and running-application safety rules |
| 12 | Second pass: the desktop surface choice ignored the guideline's conditions, so the generic "most direct evidence" rule could override the project (flow/precedence) | Applied: choose within the surfaces and conditions the guideline sets |
| 13 | Second pass: the broader-validation trigger "journeys that can be exercised independently in a browser" still assumed a browser surface | Applied: "web-equivalent desktop renderer journeys" |
| 14 | Second pass: "closer guideline in the directory of the changed code" was vague and phrased differently in each skill; the implementation preview rule lost "represents the changed UI"; "record X, Y, or the blocker" misread as alternatives | Applied: "any closer `TESTING*.md` between the root and the changed code" in both skills; restored "represents the changed UI"; fixed the list grammar |
| 15 | Implementation-engineer config grants `generate_speech`/`generate_image`/`edit_image` (tool fit) | Not changed: outside skill scope; reported as a risk |

## Ownership and design decisions

- Testing-guideline discovery, fallback, precedence (API/E2E): `Project Execution Discovery Rules` in the API/E2E `SKILL.md`; the desktop section and operating sequence point to it
- Testing-guideline use for local checks and preview (implementation): `Operating Rules` in the implementation `SKILL.md`; the frontend loop points to it
- Project-specific test policy: the product repository's own `TESTING.md` (not in this repository)
- Handoff recipients: `team-config.json` via `get_handoff_rules`; the template no longer names them

## Changed paths

### Added

- `/Users/normy/autobyteus_org/autobyteus-agents/tickets/in-progress/project-neutral-testing-skills/agent-package-result.md`

### Modified

- `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/software-engineering-team/agents/api-e2e-engineer/agent.md`
- `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/software-engineering-team/agents/api-e2e-engineer/skills/api-e2e-engineer/SKILL.md`
- `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/software-engineering-team/agents/api-e2e-engineer/skills/api-e2e-engineer/templates/api-e2e-coverage-investigation-template.md`
- `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/software-engineering-team/agents/api-e2e-engineer/skills/api-e2e-engineer/templates/api-e2e-execution-coverage-report-template.md`
- `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/software-engineering-team/agents/implementation-engineer/skills/implementation-engineer/SKILL.md`
- `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/software-engineering-team/agents/implementation-engineer/skills/implementation-engineer/templates/implementation-handoff-template.md`

### Moved or renamed

- None

### Removed

- None

## Durable artifacts and evidence

- Result: `/Users/normy/autobyteus_org/autobyteus-agents/tickets/in-progress/project-neutral-testing-skills/agent-package-result.md`
- Design/requirements: user request in conversation
- Validation evidence: command output recorded below
- Generated package artifacts: modified paths above

## Approval state

- State: `Approved`
- Evidence or decision reference: user asked for a principles review and improvement, applying the reasonable parts independently, then a second review pass and a pull request

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | `N/A` | No JSON changed by this work; all six agent configs and `team-config.json` still parse |
| Frontmatter and names align | `Pass` | `name`/`description` present in both skills and in `agent.md` |
| Skill folder/frontmatter align | `Pass` | `api-e2e-engineer`, `implementation-engineer` |
| Configured `skillNames` resolve | `Pass` | Both configs list their bundled skill; `browser-automation` in the API/E2E config is a pre-existing uncommitted change and was not checked here |
| Markdown links and references resolve | `Pass` | All seven relative links in both skills exist |
| Skill validator and changed scripts | `Pass` | `quick_validate.py`: "Skill is valid!" for both; no scripts |
| Member refs, coordinator, and rooted routes | `N/A` | Routing unchanged |
| Imported shared dependencies | `N/A` | None |
| Ownership and cross-file consistency | `Pass` | Grep finds no `browser-preferred`, `browser development path`, `last resort`, `Electron-shell`, `independently in a browser`; both skills reference the testing guideline; the template wording `No project testing guideline found` matches the skill |
| Scope/diff review | `Pass` | 6 files, field-label template changes only; `api-e2e-engineer/agent-config.json` diff was already there before this work |

## Risks, questions, and blockers

- Product-repository dependency: the browser-first / desktop-last policy must live in the target project's root `TESTING.md`. The user reports adding it there; until it lands, agents in that project choose surfaces by evidence directness.
- The `.codex/skills/software-engineering-workflow-skill` copy was not synchronized, per repository AGENTS.md.
- The implementation-engineer tool list includes media-generation tools unrelated to its skill; review separately.
- The pre-existing uncommitted `api-e2e-engineer/agent-config.json` change (browser tools replaced by `browser-automation`, which is not in this repository) should be settled in its own change.

## Next expected action

User reviews and merges the pull request from branch `project-neutral-testing-skills` into `main`.

## Handoff state

- `get_handoff_rules` called: `Unavailable` (tool not present in this session)
- Matching routes: None
- Handoffs sent: None
- Caller return: Yes, returned to the user with the pull request
