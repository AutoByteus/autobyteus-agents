# Implementation Handoff

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

## Upstream Artifact Package

- Requirements doc:
- Investigation notes:
- Design spec:
- Supplemental solution artifacts:
- Design review report:

## What Changed

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

## Persisted Data Migration Check (When Applicable)

- Persisted data shape changed: `No` / `Yes`
- Latest canonical schema / version:
- Migration path, trigger, owner, and ordering:
- Normal business, API, domain, and repository paths use the latest schema only: `Yes` / `No (blocked)` / `N/A`
- Historical schema types, decoders, and transforms are confined to migration-owned files: `Yes` / `No (blocked)` / `N/A`
- Dual reads/writes, runtime old-shape branches, and compatibility fallbacks introduced: `None` / `List + redesign required`
- Restart-safety or idempotency strategy:
- Target-schema validation and completion marker:
- Partial-failure, backup, rollback, quarantine, or operator-recovery behavior:
- Mixed-version access prevention and cutover / maintenance / deployment sequencing:
- Migration-focused checks run and results:

## Environment Or Dependency Notes

## Local Implementation Checks Run

Record only implementation-scoped checks here, such as build, typecheck, unit tests, and narrow integration checks around the changed code.
Do not stand up API/E2E execution environments or treat that work as part of this section.
Do not report API, E2E, or broader executable checks as passed in this artifact.

## Downstream Coverage Hints / Suggested Scenarios

## API / E2E / Executable Coverage Investigation And Execution Still Required
