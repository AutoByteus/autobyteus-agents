# Threshold benchmark study (synthetic package test)
Goal revision: 1. Requester: test caller. Original request: Determine whether Candidate A
is perfectly accurate and better than Baseline B on the supplied finite benchmark.
Evaluate all 12 evaluation rows, not just the two smoke rows. Compare both methods
per case and per family, preserve counterexamples, make the conclusion reproducible,
and assess whether this work is ready to become a publishable paper. This is a finite
fixture study, not a request to prove generalization to real populations.

Requirements: R1 all 12 evaluation rows across nominal, shifted and boundary families;
R2 correctness and like-for-like baseline comparison, failures included;
R3 raw predictions and executable reproduction; R4 scoped conclusion and independent
critical check; R5 manuscript-readiness assessment. A rejected hypothesis is valid.
Inputs: sources/cases.csv and sources/evaluate.py. No web or additional data is allowed.
Budget: 1 researcher batch total, each at most 2 minutes local commands. C001 used 1,
0 remain. No paid services or new dependencies. Stop after two no-progress returns.
Current cycle: C001. State: review pending. Assignment: cycles/C001/assignment.md.
Current report: cycles/C001/report.md. No earlier supervisory review exists.

## Supervisory state update — 2026-10-28
The preceding `review pending` state is historical and superseded here.
Goal revision remains 1; the original goal and every requirement remain unchanged.
Current cycle: C001. Current state: **Budget exhausted**; not research complete.
Latest assignment: [C001](cycles/C001/assignment.md) (returned and reviewed; closed
without certifying completion). Latest report: [C001](cycles/C001/report.md).
Latest review: [C001](cycles/C001/review.md). Independent evidence: S001 in
[evidence.md](evidence.md), with [static checks](checks/C001/static-review.md).
Budget: 1/1 researcher batches used, 0 remaining; user confirms total budget spent
and no extension authorized. No additional experiment run, new assignment or
outstanding researcher work. No budget reset.
Coverage: R1 unmet; R2 unmet (smoke-only comparison); R3 partial (code/smoke raw
outputs only); R4 unmet overall (critical static check completed, researcher report
and full-result checks insufficient); R5 fulfilled by a **Not ready** assessment.
Partial finding: both methods score 2/2 on the recorded smoke split; static source
checks show Candidate fails evaluation n3 and both fail b2. Perfect benchmark
accuracy is refuted; aggregate evaluation performance is not certified.
Next action: stop and return the terminal assessment; retain all unmet requirements.
Conditional restart proposals: [FU001 and FU002](follow-ups.md). A new explicit
user authorization and supported resume/message trigger are required; no extension
or scope/access change is assumed. All review writes remain inside this study;
no internet, dependencies, collaborators or other repositories were used.
