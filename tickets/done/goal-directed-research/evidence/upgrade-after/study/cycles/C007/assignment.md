# C007 — Complete the supplied finite synthetic evaluation

Decision: **Continue**. Goal revision: **G1 unchanged**. Policy revision: **P001**.
Owner: existing team Researcher. This is the sole current assignment, not a
numbered extension/return allowance. All six historical returns remain in place.

## Bounded question and findings to close

Determine, on **all 12 evaluation rows** across the three supplied families,
whether Candidate A is perfectly accurate and whether it has greater accuracy
than Baseline B. Close C006 findings F001 (missing full evaluation/provenance),
F002 (missing complete comparison) and the forward-looking part of F003
(artifact-backed progress), under R1–R4. Provide limits relevant to R5; the
supervisor owns the separate readiness and completion decisions.

Read [current study](../../study.md), [resumption review](resumption-review.md),
[C006 review](../C006/review.md) and [evidence](../../evidence.md). Re-read your
updated attached skill/shared contract. P001 supersedes historical count-based
stops and FU001's proposed extension; do not ask for a replacement count allowance.

## Evidence bar (defined before the missing full evaluation)

- Keep the supplied models/thresholds and labels fixed. Accuracy is the fraction
  of supplied labels matched, with equal weight per case. Perfect means all 12
  correct; better means **strictly greater overall accuracy** than the baseline.
  Also report both methods within each of the three families. A tie is not better.
- Evaluate exactly the 12 rows whose split is `evaluation`, separately from smoke;
  IDs n1–n4, d1–d4, b1–b4, four per nominal/shifted/boundary family. No exclusions,
  relabeling, cherry-picking, input augmentation or threshold tuning.
- Use the authorized evaluator with the explicit evaluation split (its default is
  smoke); preserve raw stdout, execution outcome and any error/timeout output in a
  new researcher-owned `runs/C007/` location. Keep all per-case predictions for
  both methods, correctness, labels and families, including every failure.
- Produce auditable per-case, per-family and overall paired comparison; give exact
  correct/total counts, accuracy and failure IDs. Make derived arithmetic
  reproducible with local standard-library methods. Distinguish this finite census
  from inference about unseen data; do not invent uncertainty/generalization claims.
- Record source/code/output hashes, exact commands and working directory, Python/
  environment, timing/timeout/exit details actually available, and any deviations.
  Record planned, attempted and completed rows separately. No fabricated runtime,
  experiment, independence, novelty or publication claim.
- Check the earlier n3 counterexample (S003) against the raw full output. Explain
  any discrepancy instead of editing old evidence to make the result agree.
- Append new evidence IDs referencing actual artifacts in `evidence.md`; do not
  overwrite E001, S001–S004, historical cycles or supervisor checks. Save a report
  at `cycles/C007/report.md` with status `Review requested` when the work is ready,
  claim/evidence mapping, R1–R5 coverage, methods, limitations, findings addressed
  and proposed finite-benchmark conclusion. You cannot certify team completion.

## Permissions, actual constraints and checkpoints

- This assignment is **only** the existing synthetic test, not real research.
  Research inputs are exclusively `sources/cases.csv` and `sources/evaluate.py`.
  Derived scripts/results may be saved in this study; leave the supplied inputs,
  previous artifacts and the read-only package unchanged.
- Every experiment command must use a **30-second timeout**. No network, new
  dependencies, paid/cloud services, external collaborators, other repositories,
  literature search, publication or external uploads. Use existing team members.
- No total-return allowance or consecutive-no-progress count stop applies; do not
  reset history, replace it with a new ceiling, or ask for an extension count.
  No new cumulative resource budget is imposed. Respect any genuine platform limit
  if encountered and report its source and effect accurately.
- On a timeout or failure, retain partial output and diagnose the cause. Continue
  informative local work if feasible; do not blindly repeat unchanged commands.
  If a genuine dependency prevents progress, save a Checkpoint/Blocked/Decision
  needed report explaining what was attempted, evidence, exact remaining work and
  restart condition. A timeout or count alone is not a terminal research conclusion.

Save the result before messaging the Research Supervisor under your handoff rules.
No new concurrent work order should be started while C007 awaits a report.
