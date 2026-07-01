# Delivery / Release / Deployment Report

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

## Release / Publication / Deployment Scope

## Handoff Summary

- Handoff summary artifact:
- Handoff summary status: `Updated` / `Blocked`
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

## Verification / Acceptance

- Verification owner: `User` / `Product Manager`
- Initial explicit user completion/verification received: `Yes` / `No` / `N/A - Product Manager acceptance`
- Product Manager acceptance status: `N/A` / `Requested` / `Accepted` / `Needs Rework` / `Blocked` (`Requested` is pre-decision only; only `Accepted` unlocks product-iteration ticket archival/finalization)
- Initial verification / acceptance reference:
- Renewed verification required after later re-integration: `Yes` / `No`
- Renewed verification received: `Yes` / `No` / `Not needed` / `Product Manager accepted`
- Renewed verification / acceptance reference:

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
- Method: `Release Script` / `Documented Command` / `Git Tag Method` / `GitHub Release` / `Deployment Path` / `Other`
- Method reference / command:
- Release/publication/deployment result: `Completed` / `Not required` / `Blocked`
- Release notes handoff result: `Used` / `Not required` / `Blocked`
- Blocker (if applicable):

## Post-Finalization Cleanup

- Dedicated ticket worktree path:
- Worktree cleanup result: `Completed` / `Not required` / `Blocked`
- Worktree prune result: `Completed` / `Not required` / `Blocked`
- Local ticket branch cleanup result: `Completed` / `Not required` / `Blocked`
- Remote branch cleanup result: `Not required` / `Completed` / `Blocked`
- Blocker (if applicable):

## Product Manager Iteration Acceptance Callback

- Product iteration mode: `Active` / `Inactive`
- Product Iteration Loop Status: `Inactive` / `Active` / `Paused` / `Blocked` / `Stopped`
- Product Manager recipient: `product_manager` / `N/A`
- Acceptance callback status: `Not Required` / `Not Started` / `Sent` / `Pending` / `Blocked`
- Acceptance packet source / payload path:
- `send_message_to(product_manager)` sent timestamp:
- Pending / blocker reason:
- Required packet fields confirmed (`ticket name`, `delivered scope`, `source brief/requirements reference`, `verification summary`, `docs sync result`, `finalization/release/deployment state or explicit not-yet-finalized status`, `residual risks/deferred items`, `relevant artifact paths`, `product implications/follow-up context`, `request for Product Manager acceptance and next feature if accepted`): `Yes` / `No`
- Relevant artifact paths:
- Product implications / follow-up context:
- Product Manager acceptance status: `N/A` / `Requested` / `Accepted` / `Needs Rework` / `Blocked` (`Requested` is pre-decision only; only `Accepted` unlocks product-iteration ticket archival/finalization)
- Next iteration owner: `product_manager`
- Next iteration status: `N/A` / `Proposal Sent` / `Pending` / `Blocked`
- Next Product Feature Brief path / message reference:
- Notes:

## Escalation / Reroute (Use Only If Final Handoff Cannot Complete)

- Classification: `Local Fix` / `Design Impact` / `Requirement Gap` / `Unclear`
- Recommended recipient:
- Why final handoff could not complete:

## Release Notes Summary

- Release notes artifact created before verification / acceptance:
- Archived release notes artifact used for release/publication:
- Release notes status: `Updated` / `Not required` / `Blocked`

## Deployment Steps

## Environment Or Migration Notes

## Verification Checks

## Rollback Criteria

## Final Status
