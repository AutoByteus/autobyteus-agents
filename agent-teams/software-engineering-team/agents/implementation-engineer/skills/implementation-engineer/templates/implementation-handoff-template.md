# Implementation Handoff

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

## Upstream Artifact Package

- Requirements doc:
- Investigation notes:
- Design spec:
- Supplemental task artifacts:
- Solution revision record:
- Triggering rework report, revision record, or evidence, when applicable:

## Current Implementation Summary

Summarize the complete current implementation. For a post-initial delta, reference the applicable `IR-*` entry instead of turning this section into a revision log.

- Implementation cycle: `Initial` / `Rework`
- Implementation revision record: absolute path
- Current implementation revision ID: `N/A` / `IR-*`
- Related solution revision ID: `N/A` / `SR-*`
- Related code review revision IDs: `N/A` / `CRR-*`
- Related API/E2E revision IDs: `N/A` / `API-REV-*`
- Triggering finding IDs: `N/A` / list

## Approved Behavior Implementation Trace

Reuse the design spec's stable behavior IDs. Record the actual implementation path and outcome without copying the full upstream behavior narrative.

| Behavior ID | Approved Change / Preserved Outcome | Implemented Production Path / Key Files | Result / Notes |
| --- | --- | --- | --- |
|  |  |  |  |

## Key Files Or Areas

## Important Assumptions

## Known Risks

## Task Design Health Assessment Implementation Check

- Design change posture:
- Design root-cause classification:
- Design refactor decision (`Refactor Needed Now`/`No Refactor Needed`/`Deferred`):
- Implementation matched the design assessment (`Yes`/`No`):
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

- Design-spec decision (`Not Affected`/`Directly Usable — No Migration`/`Discard or Rebuild`/`Migration Required`):
- Design-spec decision reference:
- Implementation follows the design-spec decision without an unplanned migration or version-specific runtime fallback: `Yes` / `No (blocked)`
- Direct-use evidence or discard/rebuild result, when applicable:
- Migration implementation and focused checks, only when `Migration Required`:
- Deviation from the design-spec transition decision: `None` / explain and reroute:

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
