# Evidence
E001: seeded historical smoke output runs/smoke.json; source sources/cases.csv; 2 smoke rows, both methods correct. Full evaluation not yet measured by the researcher.

## S001 — Supervisor smoke reproduction (2026-10-28)

- Author: Research Supervisor, independent of the historical researcher handoffs.
- Provenance: C006 report SHA-256
  `657eb6edaa43cebbca6722951e5deb0abe25c8512dfe3fc507e285768b8c8a87`;
  all reviewed input hashes and Python/platform version are saved in
  [review-inputs.json](checks/C006/review-inputs.json).
- Commands, each completed with exit code 0:
  `timeout 30s python3 -B sources/evaluate.py --split smoke` (stdout saved to
  [smoke-rerun.json](checks/C006/smoke-rerun.json));
  `timeout 30s python3 -B checks/C006/verify.py` (stdout saved to
  [check-results.json](checks/C006/check-results.json)).
- Result: semantic JSON equality with E001; 2/2 correct for both methods, all case
  IDs and prediction fields preserved. All verification assertions passed.
- Limit: same-input reproducibility only; smoke is not the required evaluation
  split, evidence of generalization, or evidence of method superiority.

## S002 — Supervisor input and coverage audit (2026-10-28)

- Author: Research Supervisor. Same input manifest, verification command and raw
  check result as S001; no new research inputs.
- Source: [cases.csv](sources/cases.csv), all six historical reports and assignments,
  earlier reviews, E001 and the researcher-owned `runs/` directory.
- Result: 14 supplied rows, comprising 2 smoke and 12 evaluation rows. Evaluation
  contains 4 nominal, 4 shifted and 4 boundary rows; unique IDs and no ID overlap
  between splits. The only researcher raw output found is `runs/smoke.json`.
  All six reports explicitly state the evaluation was not measured. Thus 12 are
  required/planned; no researcher attempts are evidenced; 0 evaluation rows are
  completed with saved researcher predictions; no full evaluation is independently
  checked. S003 is one distinct supervisory spot-check, not a researcher return.
- Limit: the historical reports' generic new-observation statements are not
  accompanied by distinct evidence records; the inherited no-progress streak of
  0 cannot be audited. No historical return is discarded or counter reset.

## S003 — Supervisor counterexample to perfection (2026-10-28)

- Author: Research Supervisor. Inputs and command as S001; independently expressed
  integer threshold arithmetic in [verify.py](checks/C006/verify.py), tracing
  `sources/evaluate.py` line 7 and the supplied row n3.
- Result: n3, nominal family, x=4, supplied label=1. Candidate A's threshold x>=5
  predicts 0 (incorrect); Baseline B's threshold x>=4 predicts 1 (correct).
  Exact values/assertions are in [check-results.json](checks/C006/check-results.json).
- Supported inference: Candidate A is not perfectly accurate on this supplied
  finite benchmark. This is a counterexample, not a full evaluation run.
- Limit: one case does not establish aggregate or per-family relative accuracy;
  no uncertainty, novelty, external validity or manuscript claim follows. The
  supervisor has not authored the missing researcher experiment or approved its
  own substitute research report.
