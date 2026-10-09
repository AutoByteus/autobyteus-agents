# Agent Package Creation Result

- Status: `Completed`
- Operation: `create`
- Package type: `agent` (standalone, shared), with a Marketing Team update
- Update intent: `new-package`
- Target package: Deep Researcher, `agents/deep-researcher/`
- Scope included: agent, config, bundled skill `deep-research`, brief template; Marketing Content Creator tools and skill step 10; Marketing `team.md` line; README entry.
- Scope excluded: the Research-to-Deck Team's team-local "deep researcher" (unchanged); other teams' delegation to research.
- Request/reference: User, 2026-10-09. The analysis in this folder first proposed a Marketing-only Market Researcher; the user chose one general Deep Researcher that any agent delegates research to.

## Summary

A shared Deep Researcher answers any research question from primary sources: plan sub-questions, search and read (browser tools for rendered pages; delegate sign-in work to a computer-use agent), keep `evidence.md` (each finding with source, date, and type `fact` / `self-claim` / `opinion`), and deliver a brief with the answer, comparisons like for like, a claims check (`supported` / `not supported` / `needs confirmation`), confidence, and gaps; results go back to the delegating agent with `send_message_to`. The Marketing Content Creator gains `list_available_agents` and `delegate_task` and delegates research for facts beyond its source material, drafting only from supported claims.

## Ownership and design decisions

- Research procedure: `deep-research` skill. Requesters own their content.
- No hard-coded recipient: requesters choose a research agent with `list_available_agents` (anti-patterns 3 and 12).
- Name: the agent is "Deep Researcher" (shared). The deck team's "deep researcher" is team-local, a separate scope in the server; the skill is named `deep-research` because `deep-researcher` is taken (anti-pattern 5).
- Our own product: public material may be used; non-public facts are `needs confirmation`, which the Content Creator handles as `Claim Review Needed`.

## Changed paths

### Added

- `agents/deep-researcher/agent.md`, `agent-config.json`, `skills/deep-research/SKILL.md`, `skills/deep-research/templates/research-brief-template.md`
- `tickets/in-progress/create-deep-researcher/agent-package-analysis.md`, `agent-package-result.md`

### Modified

- `agent-teams/marketing-team/agents/marketing-content-creator/agent-config.json` (+ `list_available_agents`, `delegate_task`)
- `agent-teams/marketing-team/agents/marketing-content-creator/skills/marketing-content-creation/SKILL.md` (step 10 Research; pointer in step 2)
- `agent-teams/marketing-team/team.md` (one Cooperation line)
- `README.md` (Deep Researcher entry)

## Approval state

- State: `Approved` — user, 2026-10-09: "we just need a deep researcher … able to do any types of deep research … delegated by other agents … can use a computer use operator as well."

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| JSON | `Pass` | Both configs parse. |
| Skill validator | `Pass` | `deep-research`, `marketing-content-creation`. |
| Links | `Pass` | Package links resolve; one pre-existing README link to the uncommitted English Bridge team. |
| Anti-patterns 3, 5, 12, 14 | `Pass` | No hard-coded researcher; unique skill name; no jargon terms in new text. |
| Runtime | Not observed | Delegation and return message not exercised live. |

## Next expected action

User decides: push to `main` or open a PR. First live test: ask the Content Creator for a post comparing our product with the market leader.

## Update 2026-10-09: mounted in the Marketing Team (user request)

- `team-config.json`: shared member `deep_researcher`; routes Content Creator → Deep Researcher (research request), Deep Researcher → Content Creator (brief or blocker), Deep Researcher ↔ Computer Use Operator (`Requested by: Deep Researcher`). 4 members, 10 routes, all resolve.
- Content Creator step 10: hand off `research-request.md` through the handoff rules; delegate with `delegate_task` only when no rule matches (standalone use).
- Deep Researcher: `get_handoff_rules` added; `agent.md` owns the transition (rules first, otherwise reply to the requester); the skill hands off browser work through the rules and falls back to delegation. Standalone behavior unchanged.
- `team.md` and README updated.
- Follow-up (user, 2026-10-09: general helpers serve every member): Performance Analyst ↔ Deep Researcher routes; the Analyst requests research for strategy context and marks each bet as based on our numbers, research, or both. Every member can now reach both shared helpers. 12 routes.
