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
    - **This ticket** only when it is an inherent part of the ticket: the change introduced it (including a design problem in the code the change adds), or without it an in-scope acceptance criterion or preserved behavior fails.
    - **Follow-up** when everything the ticket delivers works without it (a pre-existing bug or design problem in surrounding code, even code the change touches). When unsure and the ticket works, prefer a follow-up. It never fails the review, lowers the score, or reopens implementation.
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

## Revision 2 (user, 2026-10-13): put the scope where the real workflow writes and uses it

The user asked that each instruction sit at the step where a real solution designer or reviewer would do that work, in that order.

- **Solution Designer, requirements phase (SKILL step 1):** "Write the requirements doc's Scope Guardrail: the use cases this ticket may change, what is out of scope, non-goals and preserved behavior." Previously the skill only said "scope/non-goals"; the guardrail was named only in a reference and the template.
- **Solution Designer, end of design (SKILL step 3, item 4), before classification:** "Once the design is decided, write its Change Scope: the areas and files this change modifies, what nearby it deliberately leaves alone, and problems found during design that become follow-ups." Step 4 then classifies "the completed design's actual scope".
- **Design-spec template:** a new "Change Scope (Mandatory)" section right after "Intended Change". It is written last but placed early, like Task Size, so readers see the boundary first. It records in scope (guardrail IDs, areas and files), deliberately left alone, and follow-ups. The Section Fill Order adds "10. change scope, written once the design is decided".
- **Code reviewer review sequence:** step 2 reads the ticket's scope (Scope Guardrail plus Change Scope); step 6 judges each promoted candidate's scope; step 7 scores and routes this ticket's findings only, records follow-ups, and sends the follow-up request.
- **Code reviewer test-code review rules:** "An unrelated problem you notice here is a follow-up (Ticket Scope)." This is the entry point of the user's case.
- **Code reviewer Ticket Scope:** the boundary is now the guardrail plus the Change Scope.
- **Code-review report template:** the candidate table has a "Scope, if promoted" column.

Final review of revision 2:

1. Round 1 found three things:
   - the skill and the template both explained who uses Change Scope, so the explanation stays only in the template;
   - the test-code bullet repeated "does not fail … reopen", so it now only points to Ticket Scope;
   - two long lines were re-wrapped.
2. Round 2 found nothing more. The validator passes for both skills.

## Revision 3 (user, 2026-10-13): judge by how critical the finding is to this ticket

The user's criterion: fix it in this ticket only when it is an inherent part of the ticket, so that without it the ticket's functionality is broken; otherwise a follow-up is easier, since everything works.

- **Ticket Scope:**
  - the judgement is now the question "is it an inherent part of this ticket, so that without fixing it the ticket's change does not work or is not done properly?";
  - "a small fix in code this change already modifies" is removed;
  - when the ticket works and the reviewer is unsure, it prefers a follow-up;
  - two design-problem examples: duplicated logic in the code the change adds is this ticket; an older oversized class in a touched module, while the ticket works, is a follow-up.
- **Break C from the third analysis, fixed:**
  - the `team-config.json` failure-origin route to `/api_e2e_engineer` now also covers "a pre-existing problem unrelated to this change, which API/E2E records as out of scope";
  - the API/E2E skill records such a failure as out of scope, with the reviewer's follow-up reference, and finishes on the in-scope checks.
- **Gap E, fixed:** the reviewer reads the Change Scope "when the design spec has one".
- **Gap D, not changed** (Project Task Manager package): a worker's follow-up request has no written handling in the PM skill, though it works in practice. Left for a separate decision.

Final review: round 1 found the result file and PR description still described the removed "small fix" rule, so both were updated. Round 2 was clean. The validator passes for code-reviewer, api-e2e-engineer and solution-designer, and `team-config.json` parses.
