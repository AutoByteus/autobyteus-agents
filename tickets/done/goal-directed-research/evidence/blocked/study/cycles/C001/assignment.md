# C001 — Authorized cohort access and mean

Study: private-cohort-mean. Goal revision: G001. Created: 2026-10-28 UTC.
Intake decision: **Continue**. Delivery: not dispatched; contingent on intake
source-access preflight. This is not evidence that research ran.

## Bounded question

Can the mean outcome of the exact authorized cohort in
`sources/private-cohort.csv` be established from actual accessible records?
Resolve R01–R03 while respecting R04 and documenting R05.

## Evidence expected

- Establish authorized source access/provenance, outcome definition, cohort and
  denominator; expose ambiguous schema or missing/invalid values rather than
  silently selecting or imputing them.
- If accessible, preserve reproducible methods and raw results supporting the
  arithmetic mean, count and exclusions. Include source/code fingerprints and
  commands sufficient for a separate supervisor check.
- If unavailable, record the actual bounded access attempt and error. A missing
  source is not a completed mean calculation or an inconclusive cohort finding.
  Identify the test caller's dependency and exact restart action; do not search
  elsewhere or attempt a different source or access route.
- Researcher-owned output, if work is dispatched: `report.md` in this cycle and
  append-only evidence records. Do not certify the team's completion.

## Boundaries and checkpoints

All local experiment commands must have a **30-second timeout**. Use existing
local dependencies only. No internet, paid/cloud work, installations, external
collaborators, other repositories, substitute data or alternate access route.
Do not expose private records in messages. Checkpoint on timeout or access failure;
record actual usage and determine whether any useful authorized work remains.
There is no invented total budget or fixed return allowance.

Upstream records: [study](../../study.md),
[authorized-source pointer](../../source-location.txt).
