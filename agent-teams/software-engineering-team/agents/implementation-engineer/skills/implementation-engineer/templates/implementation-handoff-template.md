# Implementation Handoff

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

## Upstream Artifact Package

- Requirements doc:
- Investigation notes:
- Requirements revision record:
- Design spec:
- Supplemental task artifacts:
- Architecture design revision record:
- Design review report:
- Architecture review revision record:
- Triggering rework report, revision record, or evidence, when applicable:

## Current Implementation Summary

Summarize the complete current implementation. For a post-initial delta, reference the applicable `IR-*` entry instead of turning this section into a revision log.

- Implementation cycle: `Initial` / `Rework`
- Implementation revision record:
- Current implementation revision ID: `IR-*`
- Related architecture design revision IDs: `AD-REV-*` / `N/A`
- Related architecture-review revision IDs: `ARCH-REV-*` / `N/A`
- Related code-review revision IDs: `CRR-*` / `N/A`
- Related API/E2E revision IDs: `API-REV-*` / `N/A`
- Related delivery revision IDs: `DR-*` / `N/A`
- Triggering finding IDs: `N/A` / list

## Routing Classification (Mandatory)

Carry these values from `design-spec.md`, then confirm them against the
completed implementation before handoff.

- Task size (`Small`/`Medium`/`Large`):
- Architecture risk (`Low`/`High`):
- Classification confirmed or changed: `Confirmed` / `Changed`
- Evidence and rationale for confirmation or change:
- Selected route (`Direct API/E2E`/`Code Review`/`Architecture Designer`):
- Lightweight implementation self-review completed for the direct route: `Yes` / `No` / `Not Applicable`
- New design impact or escalation trigger: `None` / describe

## Reviewed Behavior Implementation Trace

Reuse the design spec's stable behavior IDs. Record the actual implementation path and outcome without copying the full upstream behavior narrative.

| Behavior ID | Approved Change / Preserved Outcome | Implemented Production Path / Key Files | Result / Notes |
| --- | --- | --- | --- |
|  |  |  |  |

## Key Files Or Areas

## Important Assumptions

## Known Risks

## Task Design Health Assessment Implementation Check

- Reviewed change posture:
- Reviewed root-cause classification:
- Reviewed refactor decision (`Refactor Needed Now`/`No Refactor Needed`/`Deferred`):
- Implementation matched the reviewed assessment (`Yes`/`No`):
- If challenged, routed as `Design Impact` (`Yes`/`No`/`N/A`):
- Evidence / notes:

## Legacy / Compatibility Removal Check

- Backward-compatibility mechanisms introduced: `None` / `List + redesign required`
- Legacy old-behavior retained in scope: `No` / `Yes (blocked)`
- Dead/obsolete code, obsolete files, unused helpers/tests/flags/adapters, and dormant replaced paths removed in scope: `Yes` / `No (blocked)`
- Shared structures remain tight (no one-for-all base or overlapping parallel shapes introduced): `Yes` / `No (blocked)`
- Canonical shared design guidance was reapplied during implementation, and file-level design weaknesses were routed upstream when needed: `Yes` / `No (blocked)`
- Changed source implementation files stayed within proactive size-pressure guardrails (`>500` avoided; `>220` assessed/acted on): `Yes` / `No (blocked)`
- Notes:

## Persisted Data Transition Check (When Applicable)

- Approved decision (`Not Affected`/`Directly Usable — No Migration`/`Discard or Rebuild`/`Migration Required`):
- Design-spec decision reference:
- Implementation follows the approved decision without an unapproved migration or version-specific runtime fallback: `Yes` / `No (blocked)`
- Direct-use evidence or discard/rebuild result, when applicable:
- Migration implementation and focused checks, only when `Migration Required`:
- Deviation from the reviewed transition decision: `None` / explain and reroute:

## Environment Or Dependency Notes

## Local Implementation Checks Run

Record only implementation-scoped checks here, such as build, typecheck, unit tests, narrow integration checks around the changed code, and the normal development or preview setup needed for frontend self-validation.
Do not stand up broader downstream API/E2E execution environments or treat that work as part of this section.
Do not report API, E2E, or broader executable checks as passed in this artifact.

## Frontend Rendered-Result Check (When Applicable)

For frontend-affecting work, summarize the implementation feedback loop without turning this into an API/E2E report:

- Affected surfaces / journeys:
- Approved UI/UX, interaction, requirement, or design references:
- Existing design system, shared components, and adjacent product surfaces reviewed:
- Project development / preview instructions and rendered surface used:
- States, layouts, viewports, and interactions inspected:
- Visual or interaction issues found and corrected:
- Supporting evidence and remaining unverified states or limitations:

If the change does not affect a rendered frontend, write `Not Applicable` with a short reason. This check records implementation self-validation and polish; it is not downstream API/E2E sign-off.

## Downstream Coverage Hints / Suggested Scenarios

## API / E2E / Executable Coverage Investigation And Execution Still Required
