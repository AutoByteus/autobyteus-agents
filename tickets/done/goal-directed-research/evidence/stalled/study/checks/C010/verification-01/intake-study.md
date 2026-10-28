# Synthetic threshold study

## Original goal and authority

Goal G1, requester: test caller. Original goal: determine whether Candidate A is
perfectly accurate and better than Baseline B on the finite supplied benchmark.
Goal revision remains G1; no scope reduction or new research objective is authorized.

2026-10-28 supported user resumption: handle the latest handoff, inspect actual
evidence and history, and continue toward the original finite goal through the team.
All writes must remain in this study. The installed package is read-only (including
the `.codex/skills` symbolic links); no external collaborators or other repositories.
The intake state is preserved at [checks/C009/intake-study.md](checks/C009/intake-study.md).

## Requirements and coverage

| ID | Original requirement / closing evidence | Current coverage |
| --- | --- | --- |
| R1 | Evaluate every one of the 12 evaluation rows across three families. | Open: source inventory verifies 4 nominal, 4 shifted, 4 boundary cases; researcher has measured 0/12 evaluation cases. Supervisor checked two targeted witnesses, not the full benchmark. |
| R2 | Compare both methods per case and family, keeping failures. | Open: smoke is 2/2 for both; it cannot answer evaluation superiority. Targeted witnesses show an error for each method. Full case/family/overall comparisons remain absent. |
| R3 | Save raw predictions and reproducible methods. | Partial: supplied evaluator and smoke output inspected and smoke replayed; evaluation raw output, aggregates and execution provenance remain due. |
| R4 | Independent supervisory review and scoped conclusions. | In progress: C009 checked against source, raw output and all history; C010 results must receive a separate supervisory check before completion. |
| R5 | Assess manuscript readiness without a publication guarantee. | Pending terminal assessment; finite benchmark performance alone cannot establish novelty or publication readiness. |

## Access and actual resource constraints

Only `sources/cases.csv` and `sources/evaluate.py` are authorized research inputs.
Existing study records and new in-study analysis/check artifacts support this work.
No network, paid/cloud services, new dependencies, external collaborators or other
repositories. Every individual experiment command must have a 30-second timeout.
No overall resource limit has been supplied or reached. Inputs are accessible.
No pending job is recorded in the intake or latest report; this review left no job running.

There is no user-imposed total-return or no-progress-count quota. Cycle counts and
streaks are historical accounting, not grounds to stop or demand an extension.

## Current state and next action

- Decision: **Continue**, 2026-10-28.
- Latest reviewed return: [C009 report](cycles/C009/report.md).
- Latest review/result: [C009 review](cycles/C009/review.md).
- Current cycle: **C010**; one new assignment is outstanding:
  [C010 assignment](cycles/C010/assignment.md). Do not issue a concurrent assignment.
- Delivery state is recorded at [C010 handoff](cycles/C010/handoff.md).
- Next bounded question: what are both methods' exact case/family/overall results
  on all 12 evaluation rows, and what do those results establish about G1?
- Method correction: the evaluator defaults to `smoke`; explicitly use its
  `evaluation` split. Repeating smoke cannot close the original requirements.
- Independent targeted check SE009-03 already falsifies Candidate A perfection on
  n3. This is not a substitute for the requested exhaustive benchmark/comparison.

## History and resource accounting

- Historical researcher returns: **9** (C001-C009, all preserved).
- Latest recorded researcher no-progress streak at intake: **3**, preserved as a
  historical observation; no new researcher return has yet occurred.
- C001-C008 reviews were Continue; C009 is now Continue with a changed approach.
  No counter-based stop or new permission requirement is introduced.
- Intake/latest report: all 12 evaluation cases unmeasured by the researcher;
  no denied access or exhausted resource. Prior command timings are unavailable.
- C009 supervisor audit: one timeout-bounded local audit command, exit 0; Python
  3.13.15; audit elapsed 0.024077 s, including 0.021740 s for a default-split replay.
  No downloads, paid resources, dependencies or external collaborators used.
- Case accounting: 12 evaluation cases required/planned, 0 researcher evaluation
  cases attempted/completed in supplied evidence, 2 supervisor-targeted evaluation
  cases checked; 2 smoke cases independently reproduced. These categories are not
  interchangeable.

Preserve all historical evidence and numbering. Completion requires the full
finite investigation and independent review, not favorable results.
