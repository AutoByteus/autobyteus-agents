# Delivery / Release / Deployment Report

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

## Release / Publication / Deployment Scope

## Project Release Guide

- Release guide path and revision, or `No project release guide`:
- Deviations from the guide and why: `None` / list
- Proposed guide fixes, and whether the user agreed: `None` / list

## Handoff Summary

- Handoff summary artifact:
- Handoff summary status: `Updated` / `Blocked`
- Delivery revision record:
- Current delivery revision ID: `DR-*`
- Notes:

## Initial Delivery Integration Refresh

- Bootstrap base reference:
- Latest tracked remote base reference checked:
- Base advanced since bootstrap or previous refresh: `Yes` / `No`
- New base commits integrated into the ticket branch: `Yes` / `No`
- Local checkpoint commit result: `Completed` / `Not needed` / `Blocked`
- Integration method: `Merge` / `Rebase` / `Already current`
- Integration result: `Completed` / `Blocked`
- Post-integration executable checks rerun: `Yes` / `No`
- Post-integration verification result: `Passed` / `Blocked`
- No-rerun rationale (only if no new base commits were integrated):
- Delivery edits started only after integrated state was current: `Yes` / `No`
- Handoff state current with latest tracked remote base: `Yes` / `No`
- Blocker (if applicable):

## Verification

- Evidence judged: `Sufficient` / `Insufficient`
- Evidence relied on (execution report, critical acceptance criteria, confidence, journeys, integrated-state rerun):
- More evidence requested (from whom, what, result): `None` / list
- User check needed: `No` / `Yes` — why (unreachable without the user after what API/E2E tried, or the user asked to check):
- User check reference, when needed:
- Re-verification after later re-integration: `Not needed` / result and evidence

## Release Decision

- Decision: `No release` / `Beta` / `Stable` / `Deployment` / `Other`
- Decided by: the user's words and reference, or the release guide's default

## Docs Sync Result

- Docs sync artifact:
- Docs sync result: `Updated` / `No impact`
- Docs updated:
- No-impact rationale (if applicable):

## Ticket State Transition

- Ticket moved to `tickets/done/<ticket-name>`: `Yes` / `No`
- Archived ticket path:

## Version / Tag / Release Commit

## Repository Finalization

- Bootstrap context source:
- Ticket branch:
- Ticket branch commit result:
- Ticket branch push result:
- Finalization target remote:
- Finalization target branch:
- Target advanced after verification / acceptance: `Yes` / `No`
- Delivery-owned edits protected before re-integration: `Completed` / `Not needed` / `Blocked`
- Re-integration before final merge result: `Completed` / `Not needed` / `Blocked`
- Target branch update result:
- Merge into target result:
- Push target branch result:
- Repository finalization status: `Completed` / `Blocked`
- Blocker (if applicable):

## Release / Publication / Deployment

- Applicable: `Yes` / `No`
- Method: `Project Release Guide` / `Release Script` / `Documented Command` / `Git Tag Method` / `GitHub Release` / `Deployment Path` / `Other`
- Method reference / command:
- Pipelines triggered and their results:
- Published artifacts checked against what the release should produce:
- Release/publication/deployment result: `Completed` / `Partial` / `Not required` / `Blocked`
- Release notes handoff result: `Used` / `Not required` / `Blocked`
- Blocker (if applicable):

## Post-Finalization Cleanup

- Dedicated ticket worktree path:
- Worktree cleanup result: `Completed` / `Not required` / `Blocked`
- Worktree prune result: `Completed` / `Not required` / `Blocked`
- Local ticket branch cleanup result: `Completed` / `Not required` / `Blocked`
- Remote branch cleanup result: `Not required` / `Completed` / `Blocked`
- Blocker (if applicable):


## Escalation / Reroute (Use Only If Final Handoff Cannot Complete)

- Classification: `Local Fix` / `Design Impact` / `Requirement Gap` / `Unclear`
- Recommended recipient:
- Why final handoff could not complete:

## Release Notes Summary

- Release notes artifact created before verification / acceptance:
- Archived release notes artifact used for release/publication:
- Release notes status: `Updated` / `Not required` / `Blocked`

## Deployment Steps

## Environment Or Persisted-Data Transition Notes

- Approved persisted-data decision:
- Delivery action required: `None` / `Discard or Rebuild` / `Migration Required`
- Result and evidence:
- Migration completion, validation, recovery, and rollout evidence, only when `Migration Required`:

## Verification Checks

## Rollback Criteria

## Final Status

- Verification complete (from the evidence, or the user's check where needed): `Yes` / `No`
- Repository finalization complete: `Yes` / `No`
- Applicable release/deployment/rollout complete or not required: `Yes` / `No`
- Applicable safe cleanup complete or not required: `Yes` / `No`
- Unresolved blocker: `None` / blocker
- Successful terminal package eligible for return: `Yes` / `No`
- Terminal package sent to `/solution_designer`: `Yes` / `No`
- Terminal message/reference:
