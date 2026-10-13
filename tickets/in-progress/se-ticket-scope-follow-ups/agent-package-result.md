# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `team` members (Software Engineering Team)
- Update intent: `repair`
- Target package: `agent-teams/software-engineering-team/` (code reviewer; Solution Designer requirements template)
- Request/reference: Project Task `project_task_62a46806-…` (user, 2026-10-13). Analysis: [agent-package-analysis.md](agent-package-analysis.md).

## Summary

- **Code reviewer `SKILL.md`, new "Ticket Scope" section:**
  - The Scope Guardrail is the ticket's boundary, and its Review Authority applies to findings.
  - Each promoted finding is judged:
    - **This ticket:** caused by the change, blocks an in-scope acceptance criterion or preserved behavior, or a small fix in code the change already modifies.
    - **Follow-up:** pre-existing, unrelated, and not blocking acceptance. It is recorded in the report and never fails the review, lowers the score, or reopens implementation.
    - **Requirement Gap:** the fix would need unapproved behavior.
  - Stay within the entry point you were called for.
  - Three worked examples, including the user's UI case.
  - Follow-up requests go together in one message to the agent that manages the project's Tasks: the delegating agent under "Requested by", or one found with `list_available_agents`. Each carries what, where, evidence, why outside, and a suggested Task description. With no such agent, the follow-ups stay in the report.
- **Code reviewer failure-origin review:** new origin, "a pre-existing problem unrelated to this change". The reviewer sends a follow-up request and returns the package to the API/E2E owner to record the failure as out of scope.
- **Code reviewer Classification and Handoff Rules:** `Follow-up` is not a classification; follow-up requests leave the team and aren't team handoffs.
- **Code reviewer `agent-config.json`:** adds `list_available_agents`.
- **Code reviewer report templates** (code review and API/E2E test review): a "Follow-ups" section (ID, what and where, evidence, why outside, suggested Task description, where it was sent).
- **Solution Designer requirements template:** a new "Requested by (the user, or the delegating agent's address)" field, so downstream roles know where follow-ups go.

## Worked example (the user's UI-ticket case)

A UI ticket is implemented and passes API/E2E. The package comes to the code reviewer for the successful-API/E2E **test-code review**. While reading, the reviewer notices that a neighbouring panel, untouched by the ticket, has a pre-existing layout bug.

1. **Ticket Scope:** the bug existed before the change, is unrelated to it, and doesn't block any of the ticket's acceptance criteria, so it's a **Follow-up**. The reviewer is also at the test-code entry point, so it doesn't widen into source review.
2. **Report:** the reviewer judges the test review on the changed durable tests only (`Pass` here) and records the bug under "Follow-ups" with path, evidence, the reason it's outside the ticket, and a suggested Task description.
3. **Follow-up request:** the requirements doc's "Requested by" names `/project_task_manager`, so the reviewer sends it one message with the follow-up. It records the address and message reference in the report.
4. **Handoff:** the reviewer sends the passed package to the delivery engineer as usual. **The implementation engineer isn't involved, and the ticket isn't reopened.** The PM can create a Project Task from the follow-up.

## Preserved behavior

- The reviewer still blocks on real problems caused by the change (`Local Fix` / `Design Impact`), on an in-scope acceptance criterion or preserved behavior that fails, and on `Requirement Gap`.
- Candidate gate, scorecard, entry points, and team routes (`team-config.json` unchanged).

## Deliberately left out

- **Solution Designer scope statement:** not changed. The mandatory Scope Guardrail (In-Scope Use Cases, Out Of Scope, Non-Goals, Preserved Behavior Boundary, Review Authority) is already firm; the gap was that the code reviewer didn't apply it.
- **API/E2E and implementation engineers:** no scope-creep pattern. They already keep to the guardrail; API/E2E uses an `Out Of Scope` disposition and no unrelated changes.
- **One shared follow-up path for the team:** the implementation engineer's "list … as a follow-up" and the architecture reviewer's "separate-ticket candidate" are recorded but sent nowhere. A possible follow-up, not done here to keep this ticket's own scope.
- **Validation depth:** Task `9c96bc42`; not touched.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | Pass | `quick_validate.py` → "Skill is valid!" for `code-reviewer` and `solution-designer`. |
| Changed JSON parses | Pass | code reviewer `agent-config.json`. |
| Tool wiring | Pass | The skill's `list_available_agents` and `send_message_to` are both in the agent config. |
| Member refs, coordinator, and rooted routes | N/A | `team-config.json` unchanged. |
| Ownership and cross-file consistency | Pass | Matches the architecture reviewer's out-of-scope rule and the guardrail's Review Authority; the templates point to the skill's Ticket Scope. |
| Scope/diff review | Pass | 5 files (+62/−3) and this ticket folder. |
| Final review against the standard and anti-patterns | `Pass` (round 3) | Round 1: the Follow-up bullet overlapped "the change caused it" for regressions outside the guardrail, so it's now "pre-existing, unrelated, not blocking acceptance". "The requester" could be the user, so it's now "the delegating agent under 'Requested by'". The API/E2E template's Follow-ups block was moved below the Findings notes it had split. Round 2: re-wrapped one paragraph. Round 3: clean. Anti-patterns 1, 3, 4, 12 and 14 were checked: follow-ups go outside the team to the requester or a discovered Task manager as the user directed, with no hard-coded team recipient and no rule copied. |
