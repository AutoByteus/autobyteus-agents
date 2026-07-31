# Product Iteration Plan

Write this artifact to the assigned workspace, ticket folder, or artifact directory when file access exists. If no durable file path is available, include this structure in the message body and record that no path exists.

## Plan Meta

- Product / project goal:
- Product Iteration Loop Status: `Active` / `Paused` / `Blocked` / `Stopped`
- Product Goal Completion Status: `Incomplete` / `Complete`
- Product Goal Completion Evidence / Reference: `N/A` unless Product Goal Completion Status is `Complete`; then required and non-empty
- Product Goal Stop Reason: `N/A` / `Product Goal Complete` / `Needs Rework` / `Blocked` / `Paused By Product Manager` / `Stopped By Product Manager`
- Current cursor / current slice ID:
- Next selected slice ID: exactly one slice ID while incomplete/continuing; `N/A` when complete or not continuing
- Next Iteration Status: `Proposal Sent` / `Pending` / `Blocked` / `Product Goal Complete` / `N/A`
- Last updated:
- Owner: `product_manager`

## Assumptions / Constraints

## Ordered Candidate Slices / Backlog

This table is the ordered candidate slices/backlog for the product loop.

| Slice ID | Title | User / product value | Priority rationale | Dependencies / constraints | Status (`Candidate`/`Selected`/`In Engineering`/`Accepted`/`Needs Rework`/`Blocked`/`Deferred`) | Notes |
| --- | --- | --- | --- | --- | --- | --- |

## Accepted / Delivered History

| Slice ID | Delivery packet / handoff source | Acceptance decision reference | Accepted date | Product notes |
| --- | --- | --- | --- | --- |

## Rework / Blocker History

| Slice ID | Decision (`Needs Rework`/`Blocked`) | Finding source | Reason | Current owner / next action |
| --- | --- | --- | --- | --- |

## Source / Artifact References

- User goal / project brief:
- Product Feature Briefs:
- Delivery acceptance packets:
- Engineering artifacts:
- Other product evidence:

## Next Selected Slice Rationale

Use these combinations exactly:

| Decision | Product Goal Completion Status | Product Goal Completion Evidence / Reference | Product Goal Stop Reason | Product Iteration Loop Status | Next Iteration Status | Next slice / brief |
| --- | --- | --- | --- | --- | --- | --- |
| Accepted + incomplete | `Incomplete` | `N/A` | `N/A` | `Active` | `Proposal Sent` / `Pending` / `Blocked` according to truthful route result | Exactly one each |
| Accepted + complete | `Complete` | Required and non-empty | `Product Goal Complete` | `Stopped` | `Product Goal Complete` | None; next selected slice ID `N/A` |
| Needs Rework | `Incomplete` | `N/A` | `Needs Rework` | `Paused` | `N/A` | None; route Product Acceptance Finding |
| Blocked | `Incomplete` | `N/A` | `Blocked` | `Blocked` | `N/A` | None; route finding or document user/product decision |

When Product Goal Completion Status is `Complete`, write the completion evidence and explain why no next slice is required. Do not create a next brief in that state. Do not treat Delivery Engineer Acceptance Callback Status `Sent` as PM acceptance or completion.

## Open Product Questions
