# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (intent: `repair`)
- Package type: `team` (Software Engineering Team): delivery engineer (main), API/E2E engineer, Solution Designer, team files
- Target package: `agent-teams/software-engineering-team/` at `origin/main` `2074d75`
- Files read in full:
  - **this Task, at `2074d75`:**
    - delivery engineer: `agent.md`, `agent-config.json`, `SKILL.md`, `templates/release-deployment-report-template.md`, `delivery-revision-record-template.md`, `docs-sync-report-template.md`, `release-guide-template.md` (written in #42 and in this conversation);
    - API/E2E engineer: `agent.md`, `agent-config.json`, `SKILL.md`, `templates/api-e2e-coverage-investigation-template.md`, `api-e2e-execution-coverage-report-template.md`, `api-e2e-revision-record-template.md`, `api-e2e-test-case-ledger-template.md`.
  - **Earlier in this conversation, still in context; `git diff a9beb12 2074d75` shows only my #46 edits since:** Solution Designer and code reviewer packages (every file), `team.md`, `team-config.json`, `shared/design-principles.md`, `shared/design-examples.md` Examples 9–11.
- Request/reference: Project Task `project_task_c2b4ff85-…` (user, 2026-10-13).

## Why the delivery engineer always waits for the user

1. **An unconditional hold.** Delivery `SKILL.md` line 79: "Wait for explicit user verification before moving the ticket to `done`, pushing, merging into the finalization target branch, or running release, publication, or deployment work." It is repeated in:
   - Purpose (10), You Own (22: "user-verification hold"), 58, 78, 80, 82, 88, 91–93, 116;
   - `agent.md` (10);
   - the report template ("User Verification", "Explicit user testing/verification complete");
   - the revision record;
   - `team.md` (24: "explicit user verification");
   - `team-config.json` delivery → designer ("after explicit user verification");
   - the designer's receipt check (`SKILL.md` 339: "explicit user-verification reference");
   - the designer's own step-2 safety net (152–153: "the user's verification before finalization").
2. **No owner for the judgement.** Nothing tells the delivery engineer to judge the API/E2E evidence; it only waits for "the user signal".
3. **No way to ask for more evidence.** The API/E2E skill (line 32) accepts "an API/E2E-owned `Local Fix` from code review or delivery", but `team-config.json` has no `/delivery_engineer` → `/api_e2e_engineer` route. A delivery engineer that found the evidence too weak could only wait for the user.
4. **"Does it work?" and "Do we release?" are tied together.** The project's release decision is taken at the manual check. The AutoByteus `RELEASE.md` "Release Decision" says "The user decides at verification", although it already makes "No release" the default when the user doesn't ask for one.

## The evidence is already decision-grade

The API/E2E skill and execution report already require:
- a scorecard (overall ≥ 95%, no category below 90%);
- "Every critical acceptance criterion directly proven";
- the broader-validation decision with the journeys run (DOM, screenshot, log, API evidence);
- mocked dependencies with their confidence limits;
- a "Not Tested / Infeasible / Deferred" table with reasons and risk;
- `Blocked` instead of claimed success.

One thing is missing: which untested items only the user can check, such as their own accounts, machines or nodes. Without it, the delivery engineer can't tell "not testable here" from "needs the user".

## Preserved behavior

- Integration refresh, post-integration rerun, docs sync, finalization order, the release guide's precedence, pipeline watching, partial releases, never moving a published tag, cleanup, and blockers.
- The user can always ask to check themselves.
- Product visual approval (Product Team) and requirements approval happen upstream, unchanged.

## Findings and planned changes

| # | Priority area | Owner | Change |
| --- | --- | --- | --- |
| 1 | Ownership / flow | delivery `SKILL.md` | New "Verify From Evidence" section. The delivery engineer judges whether the evidence proves the change works. If yes, it records that judgement and continues. If not, it names the gap and asks API/E2E (or the defect's owner) for it, then judges again. It asks the user only when evidence can't settle it, with the reason (taste or feel no approved design settles, things tests can't reach, a check the user asked for). Two short examples. |
| 2 | Ownership | delivery `SKILL.md` | "Release Decision": separate from verification. Release only when the user asked for it, or the release guide makes it the default; otherwise finalize without releasing and say a release is available. Release safety unchanged. |
| 3 | Consistency | delivery `SKILL.md` lines 10, 22, 58, 78–93, 116; `agent.md` | "user verification / user signal" becomes verification from evidence, or the user's check where one was needed. |
| 4 | Routing | `team-config.json` | New `/delivery_engineer` → `/api_e2e_engineer` route for an evidence gap. The delivery → designer terminal rule says "after verification", not "after explicit user verification". |
| 5 | Consistency | delivery report and revision templates | "User Verification" becomes "Verification" (evidence judgement, evidence asked for, user check yes/no and why), plus a "Release decision" line. |
| 6 | Evidence | API/E2E `SKILL.md`, investigation and execution-report templates | Mark what only the user can check, and why. |
| 7 | Consistency | Solution Designer `SKILL.md` lines 152–153 and 339; `team.md` line 24 | Safety net and receipt check use "verification before finalization" and "verification record". |
| 8 | Report only | AutoByteus `RELEASE.md` (other repo; not edited here) | Proposed: "The user decides at verification" becomes "The user decides in the request or any time before finalization; without a decision, finalize with no release." |
