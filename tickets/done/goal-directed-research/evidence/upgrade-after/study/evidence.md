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

## S004 — Supervisor resumption and preservation audit (2026-10-28)

- Author: Research Supervisor. Policy authority: current user's rejection of the
  package's count stops and supported resume; platform notice of updated attached
  skill/contract. This is a policy/evidence audit, not a new researcher return.
- Re-read the updated skill/contract, original goal/current state, C006 assignment,
  report/review, evidence/follow-ups, and both authorized inputs. Saved SHA-256
  fingerprints of the unchanged history/material inputs and current policy files
  in [resumption-inputs.json](checks/C007/resumption-inputs.json).
- Method: a local standard-library SHA-256/inventory command under `timeout 30s
  python3 -B` compared the prior C006 manifest's historical/researcher inputs;
  completed with exit 0. All comparisons passed. The new manifest also fingerprints
  the original C006 review/checks and pre-correction study/evidence/follow-ups.
- Result: six historical returns retained; only `runs/smoke.json` exists as raw
  researcher output; no C007 existed before this resumption; no pending assignment
  was recorded. A narrow local process listing found no active evaluator for this
  study. No full benchmark experiment was run by the supervisor at resumption.
- Limit: the process check is a point-in-time local observation, not a platform
  runtime watchdog. Historic aggregate runtime and distinct progress observations
  remain unknown. Source fingerprints preserve S001–S003's scope, not approval of
  missing full results. P001 supersedes the old counter-based stop without rewriting
  its dated assessment or inventing a replacement total budget.

## E002 — Researcher full evaluation execution (C007, 2026-10-28)

- Author: Researcher. G1 unchanged, P001; same study, not a replacement extension.
  Pre-execution [method](runs/C007/method.md) defines the complete evaluation census,
  fixed thresholds/labels, accuracy, paired comparison and falsification rules.
- Command from the study root:
  `timeout 30s python3 -B runs/C007/run.py --out runs/C007/primary`.
  The runner executes `python3 -B sources/evaluate.py --split evaluation` with
  `subprocess.run(..., timeout=30)` and preserves unmodified stdout/stderr.
  [Outer outcome](runs/C007/primary-command.status.json) and
  [execution/provenance](runs/C007/primary/execution.json): both runner and evaluator
  exit 0, no timeout, empty stderr. Evaluator duration: 0.02148758398834616 seconds
  (monotonic elapsed including process launch/wait; not a model speed benchmark).
- [Preflight](runs/C007/primary/preflight.json) passed before launch. Required/
  planned: 12; attempted: 12; completed with saved predictions: 12 unique IDs,
  four per nominal/shifted/boundary family; zero evaluation exclusions. Smoke
  rows were excluded by split and were not rerun or included in the denominator.
- [Raw predictions](runs/C007/primary/evaluation.stdout.json): Candidate A 7/12,
  Baseline B 8/12. Raw SHA-256:
  `6f794c1fdb1df1c43c717e1bbea1418353ab7075f52eeb2973d8507c4d60ccf3`.
  CSV SHA-256: `25d07594722389f069659c063a2ce0f0e12c83e9c180a67de2cf086023ce6182`;
  evaluator SHA-256: `3b2615cb92debca462ccc6a0f971d7b1f263091bc09dd9969254f918944bc896`.
  Script/method hashes, exact argv/cwd, Python 3.13.15, platform, UTC times and
  source-unchanged check are recorded in execution metadata.
- Limit: complete finite supplied-label evidence, not unseen-data inference or
  independent supervisory approval. Historical runtime/progress remain unaudited.

## E003 — Researcher paired analysis and counterexample check (C007, 2026-10-28)

- Author: Researcher. Executed inside the E002 runner with standard-library
  [analyze.py](runs/C007/analyze.py), whose hash is pinned in E002 metadata.
  [Validation](runs/C007/primary/validation.json) passed: exact ID/order/family
  coverage, all source fields, separately reconstructed integer predictions,
  correctness, raw totals, paired partitions and net differences.
- Artifacts: complete [per-case CSV](runs/C007/primary/per-case.csv),
  [all failure cases](runs/C007/primary/failures.json), and
  [family/overall paired counts](runs/C007/primary/comparison.json).
  Nominal: A 3/4, B 4/4; shifted: A 2/4, B 2/4; boundary: A 2/4, B 2/4.
  Overall A-minus-B is exactly -1/12 (-8.333333... percentage points).
- A failures: n3, d1, d3, b1, b2. B failures: d1, d3, b2, b3.
  Paired: both correct 6; A-only correct 1 (b3); B-only correct 2 (n3, b1);
  both wrong 3 (d1, d3, b2). The b3 counterexample rules out claiming B wins
  every case, despite B's strictly higher aggregate accuracy.
- S003 agrees with the full output: n3 has x=4, label=1, A=0/wrong, B=1/correct.
  The earlier counterexample is confirmed, not assumed to establish aggregate
  superiority. No source, historical evidence or supervisory check was changed.
- Proposed inference, scoped to these 12 rows: A is neither perfect nor strictly
  more accurate than B. No claim that a tie is better, no statistical significance
  inference, and no generalization from this census. These are researcher checks;
  independent review of the full results is still requested.

## E004 — Researcher deterministic replay and preservation audit (C007, 2026-10-28)

- Author: Researcher. Executed the protocol's same-input replay:
  `timeout 30s python3 -B runs/C007/run.py --out runs/C007/replay`.
  [Replay execution](runs/C007/replay/execution.json) and
  [outer outcome](runs/C007/replay-command.status.json): evaluator and runner
  exit 0, no timeout, empty stderr; evaluator elapsed 0.01924054103437811 seconds.
  The same code, labels, thresholds and source/method hashes were used.
- Executed `timeout 30s python3 -B runs/C007/finalize.py`; exit 0 in the saved
  [outer outcome](runs/C007/audit-command.status.json), empty stderr.
  [Audit](runs/C007/audit.json) confirms byte-identical primary/replay raw stdout,
  stderr, per-case CSV, failures, comparison and validation, and verifies the
  pinned inputs/code plus saved output hashes. The primary and replay both retain
  every expected ID; this is 24 row executions but **12 distinct supplied rows**.
- Direct field-by-field comparison to the preserved S003 raw artifact agrees on
  every n3 value. Self-audit checks preserve 33 pre-existing control/history/source
  records (32 unchanged files plus the unchanged old byte prefix of `evidence.md`),
  including all 18 C001–C006 assignment/report/review files and all 6 supervisor
  check files. The replay snapshot additionally verifies the E002/E003 ledger
  append remained intact. Only new C007 research artifacts and append-only ledger
  entries were produced; supervisory state/assessments were not edited.
- Limits: same-input reproducibility is not new independent evidence or an
  independent supervisory review. Past undocumented progress/runtime remains
  undocumented; no total-return, streak or cumulative-runtime allowance is applied.
  Full-result supervisory review and the supervisor's separate R5 decision remain
  pending at handoff.

## S005 — Supervisor C007 provenance and preservation verification (2026-10-28)

- Author: Research Supervisor. Reviewed report SHA-256
  `8910c24734061b674a03994b7d6e6f339bbaa7407bf4cb0c61d8c55970b1ae65`.
  Inspected the supplied evaluator, researcher protocol/runner/analysis/audit code,
  raw/derived evidence and metadata; no researcher analysis was imported or executed.
- Command: `timeout 30s python3 -B checks/C007/verify-full.py --out
  checks/C007/full-review` from the study root, exit 0. Code and environment:
  [checks README](checks/C007/README.md), [verifier](checks/C007/verify-full.py),
  [input manifest](checks/C007/full-review/review-inputs.json).
- Result: all 41 entries of the sealed researcher manifest matched saved byte
  counts/SHA-256. Independently verified 33 protected records in each researcher
  snapshot, including old ledger prefixes; pinned sources/code/method/output hashes
  and recorded command outcomes checked. All six primary/replay output pairs in
  the audit are byte-identical. All original historical cycles/checks remain intact.
- Limit: these checks verify preservation and inspectable provenance, not past
  undocumented progress or historical total runtime. Review-time ledger/state hashes
  precede the current intentional supervisor append/update; no research artifact was
  changed. Later changed research evidence requires a new review.

## S006 — Supervisor complete evaluation reproduction (2026-10-28)

- Author: Research Supervisor. The S005 command launched `python3 -B
  sources/evaluate.py --split evaluation` with a 30-second subprocess limit inside
  its 30-second outer command, saving output only in `checks/C007/full-review/`.
- Raw [stdout](checks/C007/full-review/evaluation.stdout.json),
  [stderr](checks/C007/full-review/evaluation.stderr.txt),
  [command](checks/C007/full-review/run-start.json),
  [execution](checks/C007/full-review/execution.json).
- Result: exit 0, no timeout, empty stderr, all 12 evaluation rows present. Stdout
  matches both researcher runs byte-for-byte, SHA-256
  `6f794c1fdb1df1c43c717e1bbea1418353ab7075f52eeb2973d8507c4d60ccf3`.
  Measured evaluator elapsed seconds: 0.035891624982468784, including overhead.
- Limit: same-input reproduction by a separate reviewing agent is not new
  independent data, a model speed benchmark or external peer review.

## S007 — Supervisor all-row oracle, arithmetic and falsification checks (2026-10-28)

- Author: Research Supervisor. Within S005's independent verifier, reconstructed
  each prediction from the original CSV/fixed thresholds and recomputed metrics
  without importing the researcher analysis. Full raw result and per-case oracle:
  [verification.json](checks/C007/full-review/verification.json).
- Result: every source/raw prediction/correctness field, per-case CSV entry,
  retained failure, exact family/overall fraction, paired category and delta matches.
  Twelve unique evaluation rows, four per family, zero exclusions, smoke excluded
  by split, shared x values retained. Required/planned, researcher attempted,
  completed and now independently checked counts are all 12 distinct cases.
- Verified overall: A 7/12, B 8/12, A−B = −1/12 accuracy. Nominal A/B=3/4 vs 4/4;
  shifted=2/4 vs 2/4; boundary=2/4 vs 2/4. Paired: six both correct; A-only b3;
  B-only n3,b1; both wrong d1,d3,b2. S003 n3 matches every raw field. A-only b3
  and both family ties disallow an overbroad claim that B wins everywhere.
- Supported conclusion: A is neither perfect nor strictly better on this complete
  finite supplied-label benchmark. All verification assertions passed; full script
  elapsed 0.04383708303794265 seconds, outer exit 0. No claim about unseen data,
  statistical significance, label validity beyond the supplied test, novelty,
  manuscript readiness or publication follows from these numerical checks alone.
