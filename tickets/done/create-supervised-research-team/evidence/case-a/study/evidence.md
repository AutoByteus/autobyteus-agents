# Evidence
E001 — Researcher (seeded fixture). Command: `python3 sources/evaluate.py`.
Result: 2/2 Candidate and 2/2 Baseline, split smoke; raw: runs/smoke.json.
Source: sources/cases.csv, synthetic static fixture. No evaluation output recorded yet.

S001 — Supervisor, C001 review, 2026-10-28. Source and report fingerprints:
`checks/C001/reviewed-sha256.txt`; interpreter: `checks/C001/environment.txt`.
Commands: `python3 sources/evaluate.py > checks/C001/smoke-rerun.json` and
`python3 sources/evaluate.py --split evaluation > checks/C001/evaluation-rerun.json`.
CSV parsing and separate threshold/correctness recalculation verified all 12 unique
evaluation rows, four per family, and every prediction; smoke output matches E001.
Verification summary: `checks/C001/independent-check.json`. Evaluation result: A 7/12,
B 8/12; nominal A 3/4 B 4/4; shifted and boundary each A 2/4 B 2/4.
Candidate failures n3,d1,d3,b1,b2 refute perfect accuracy. See C001 review for limits.
This checks supplied data only; it does not validate population generalization,
novelty or publication readiness, and does not replace researcher-owned deliverables.

E002 — Researcher, C002, 2026-10-28, goal revision 1. Pre-run method:
`runs/C002/method.md`. Executed `python3 runs/C002/reproduce.py runs/C002/execution`
from study root; this runs `python3 sources/evaluate.py --split evaluation` twice,
then checks all CSV rows, predictions and correctness with separate integer
threshold expressions. Raw: `runs/C002/execution/evaluation.json` and
`runs/C002/execution/evaluation-repeat.json` (byte-identical). Source and script
SHA256: `runs/C002/execution/source-sha256.json`; interpreter, exact subprocess
command, platform and elapsed time: `runs/C002/execution/environment.json`.
All 12 unique evaluation IDs included (four per family); only s1,s2 smoke excluded.
A 7/12, B 8/12; nominal 3/4 vs 4/4, shifted and boundary each 2/4 vs 2/4.
A failures n3,d1,d3,b1,b2; B failures d1,d3,b2,b3. Paired A-only b3,
B-only n3,b1, six both-correct and three both-wrong. Per-case table and checks:
`runs/C002/execution/per-case.md`, `runs/C002/execution/comparison.json`.
No discrepancy with S001. No tuning, new data, random variation or external access.
Repeated evaluation is reproduction, not new independent statistical evidence.
Prior C001 artifacts and smoke preserved: `runs/C002/prior-before.sha256` and
`runs/C002/prior-preservation.txt`. E001 is unchanged. Finite supplied labels only;
no generalization, novelty or publication-readiness evidence.

S002 — Supervisor, C002 terminal review, 2026-10-28. Reviewed versions fingerprinted
in `checks/C002/reviewed-sha256.txt`. Read researcher source and method, then ran
`python3 runs/C002/reproduce.py checks/C002/reproduction` (stdout saved in
`checks/C002/reproduction-stdout.json`) and supervisor-authored
`python3 checks/C002/verify.py > checks/C002/verification.json`.
PASS: regenerated raw outputs, comparison and per-case table match E002 byte-for-byte;
CSV-derived independent recalculation validates all 12 rows, family counts, failures,
paired partitions and metric arithmetic. Report table rows match raw data. Source
hashes and C001 artifacts match prior manifests. Candidate 7/12, Baseline 8/12;
Candidate-only b3, Baseline-only n3,b1; no discrepancy with S001. Verification code,
raw reruns and environment are retained under `checks/C002/`. This is independent
agent checking of a finite supplied fixture, not external peer review, independent
data, label validation or novelty evidence. Findings F001-F004 closed as specified
in `cycles/C002/review.md`; research Complete, manuscript Not ready.
