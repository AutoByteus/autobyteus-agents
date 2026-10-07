# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (began as `analyze` of the bug report; user approved the fix on 2026-10-07)
- Package type: `team` (Software Engineering Team), plus the Agent Package Creator's own principles that produced the rule
- Target packages:
  - `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/software-engineering-team/`
  - `/Users/normy/autobyteus_org/autobyteus-agents/agents/agent-package-creator/skills/agent-package-creation/`
  - `/Users/normy/autobyteus_org/autobyteus-agents/docs/agent-package-authoring.md`
- Scope included: Solution Designer `agent.md` and skill, `team.md`, `team-config.json`; Org configs and summaries that route from the Solution Designer; every package that forbids `delegate_task`; the creator's principles and authoring guide.
- Scope excluded: changes to any file; runtime source code.
- Request/reference: User bug report, 2026-10-07: "Send to @Product Team to work on the UI first" was refused because no handoff rule matched.

## Answer

The refusal is produced by the instructions, not by the runtime. Three layers combine:

1. **The route exists only in the Orgs.** The Solution Designer → Product route is in `agent-orgs/autobyteus-org/org-config.json` and `agent-orgs/software-development-department/org-config.json`. The run used the Software Engineering Team on its own, so `get_handoff_rules` returned only the team's three routes (architecture review, implementation, delivery), exactly as reported.
2. **The member skill hard-codes another team.** The Solution Designer skill defines a `Product Design Requested` outcome and describes the Product UI/UX Designer's modes, repository, and Bootstrapper. That outcome has a destination only inside an Org; in a standalone team it is an outcome with nowhere to go.
3. **A blanket ban with no user exception.** `agent.md`, the skill, and `team.md` each say: if no rule matches, return to the user, and "do not substitute `delegate_task`". Nothing allows an explicit user request to involve a collaborator. The runtime's @mention note offers the address and the tool, but the more specific role instructions win, so the agent loops back to the user.

The ban originates in the Agent Package Creator's own principles (`package-design-principles.md` §6 and `docs/agent-package-authoring.md`): "`delegate_task` is a distinct execution mechanism, not a substitute for result-based handoff." The intent was right (do not bypass configured routing for ordinary workflow results), but it was written as a blanket rule and copied into packages without a user-directed exception.

## Baseline

| File | Relevant text |
| --- | --- |
| `solution-designer/agent.md` lines 19–24 | Call `get_handoff_rules`, send to returned recipients; "If no rule matches, return the result to the user"; "Do not substitute `delegate_task`". |
| `solution-designer/skills/solution-designer/SKILL.md` line 114 | "When the user … requests Product Team help, persist context, classify `Product Design Requested` and use the handoff rules." Line 33 and 248–252 describe Product-owned modes, repository, and artifacts. |
| `SKILL.md` lines 284–285 | "Do not infer or hard-code recipients or use `delegate_task` as a replacement. If no rule applies, return the result to the user." |
| `team.md` §Communication Convention | "parent rules own cross-team Product handoffs … Do not use `delegate_task` as a substitute." |
| `team-config.json` | Solution Designer routes: `/architecture_reviewer`, `/implementation_engineer`, `/delivery_engineer` only. |
| `autobyteus-org/org-config.json`, `software-development-department/org-config.json` | `/software_engineering_team/solution_designer` → `/product_team/product_ui_ux_designer` "When Solution Designer classifies the outcome as Product Design Requested …". |
| Same ban elsewhere | `english-bridge-team/agents/english-translator/agent.md`, `agent-orgs/software-development-department/org.md`. |
| Creator principles | `package-design-principles.md` line 78; `docs/agent-package-authoring.md` lines 218–224. |

## Preserved behavior

- Configured handoff rules stay the routing authority for a role's normal workflow results; recipients are never invented.
- The Org's Solution Designer → Product route keeps working when the team runs inside an Org.
- User approval of intended behavior stays with the user; Product owns its own work and artifacts.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure and ownership (missing behavior) | No principle or package covers a collaborator the user brings in at runtime; the only paths are configured rules or "return to the user". | Creator principles; `result-and-handoff-contract.md`; authoring guide | Every package built from these principles can refuse dynamic collaboration. | Add one rule: configured rules route normal workflow results; when the user explicitly asks to involve a named agent or team, send it the persisted context (`send_message_to`, or `delegate_task` when the user wants a separate copy), even without a rule. Never contact anyone the user or the rules did not name. |
| 2 | Clarity | "`delegate_task` is not a substitute for result-based handoff" is read as a blanket ban. | Creator principles; authoring guide | The ban blocks the runtime's own collaboration guidance. | Scope it: do not use `delegate_task` to bypass a configured route for a normal result; user-directed collaboration is a separate, allowed case. |
| 3 | Structure and ownership | Solution Designer skill names the Product Team and describes its modes, repository, and Bootstrapper. | Solution Designer skill | A member skill depends on another team and on an Org-only route; standalone, the outcome has no destination. | Keep the outcome name `Product Design Requested` (the Org route keys on it) but remove Product internals; when no rule matches and the user named a collaborator, use the user-directed rule. |
| 4 | Content flow (duplication) | The ban and the "return to the user" rule appear in `agent.md`, the skill, and `team.md`; also in the English Translator and the Software Development Department summary. | Each role's `agent.md` (universal transition) | Five copies drift; fixing one leaves the others refusing. | State the transition once per role in `agent.md` including the user-directed case; remove the duplicates from the skill and `team.md`; apply the same wording to the other two packages. |
| 5 | Validation (missing check) | Creator validation checks that routes resolve, not that each routed outcome has a destination in the package being run. | Creator `SKILL.md` step 3 | A team can ship an outcome that only an Org can route. | Add a check: every outcome a role hands off has a destination in the containing config, or the package states which parent provides it and what happens standalone. |

## Recommended changes

Not applied; they need an `update` request.

1. Creator principles (`package-design-principles.md` §6, `result-and-handoff-contract.md` handoff protocol, `docs/agent-package-authoring.md`): add the user-directed collaboration rule and scope the `delegate_task` sentence (findings 1, 2). Add the outcome-destination check to the creator's validation step (finding 5).
2. Software Engineering Team:
   - Solution Designer `agent.md`: one transition paragraph — rules for normal results; user-directed collaboration when the user names a collaborator; return to the user only when neither applies.
   - Solution Designer skill: remove the duplicate ban and the Product internals; keep `Product Design Requested` as an outcome.
   - `team.md`: drop the duplicate ban; one line that user-directed collaboration is allowed.
3. Same transition wording in `english-bridge-team/agents/english-translator/agent.md` and `agent-orgs/software-development-department/org.md`.

## Open questions and approvals

1. For user-directed collaboration, which tool by default: `send_message_to` (one instance that stays in the run and can reply) or `delegate_task` (a new copy)? Recommendation: `send_message_to` by default, `delegate_task` when the user asks for a separate copy or parallel work.
2. Should the fix also cover all other teams' members now (they share the same transition wording in their `agent.md`), or only the Software Engineering Team plus the two packages with the explicit ban?

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Product route location | Orgs only | Team config has 3 Solution Designer routes; two Org configs add Product. |
| Ban locations | 5 packages + creator principles | `grep` for `delegate_task` prohibitions. |
| Runtime behavior | Not reproduced | Based on the user's report; matches the instructions exactly. |

## Decisions (user, 2026-10-07)

- The Solution Designer skill breaks the package principles; fix it. A user's explicit request to involve a collaborator is a dynamic handoff and needs no configured rule.
- Tool: the one the user's request names (`delegate_task` when the user asks to delegate; `send_message_to` when the user asks to message). The user's report said "delegate".
- Scope: creator principles, Software Engineering Team (`agent.md`, skill, `team.md`), Software Development Department `org.md`. The English Translator is untracked work in progress by someone else and is left as a follow-up.

## Next action

Apply the changes, validate, and write `agent-package-result.md`.

## Handoff state

- `get_handoff_rules` called: `Yes`
- Handoffs sent: None
- Caller return: Yes; no rule matched.
