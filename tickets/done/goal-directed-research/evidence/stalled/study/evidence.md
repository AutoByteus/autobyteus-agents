# Evidence
E001: seeded historical smoke output runs/smoke.json; source sources/cases.csv; 2 smoke rows, both methods correct. Full evaluation not yet measured by the researcher.

## SE009-01 — Supervisor inventory and historical provenance (2026-10-28)

Author: Research Supervisor. Read all C001-C009 assignments/reports and C001-C008
reviews, original study, E001, supplied CSV and evaluator. Fingerprints (SHA-256 and
byte counts) are in `checks/C009/input-manifest.json`; pre-review study/evidence
snapshots are adjacent. All nine returns contain only the same smoke evidence.
Command: `PYTHONDONTWRITEBYTECODE=1 timeout 30s python3 checks/C009/check_evidence.py`.
Raw check result: `checks/C009/audit.json`. Independently counted 14 unique source
IDs: 2 smoke and 12 evaluation, with 4 evaluation rows per family (nominal, shifted,
boundary). Source inspection shows default `--split smoke`, with `evaluation`
supported; thresholds are Candidate A x >= 5 and Baseline B x >= 4. This inventory
does not measure aggregate evaluation accuracy. No researcher evaluation output
exists among the inspected supplied runs.

## SE009-02 — Supervisor smoke reproduction and method diagnosis (2026-10-28)

Author: Research Supervisor. Same bounded audit command as SE009-01 (not another
run). Independently calculated both smoke predictions and compared every field with
E001, then replayed `python3 sources/evaluate.py` (nested 20-second timeout within
the outer 30-second command). Exit 0, no stderr, exact JSON match, 2/2 for both.
Raw replay: `checks/C009/default-replay.stdout.json`; execution metadata in
`checks/C009/audit.json`. Python 3.13.15; audit elapsed 0.02407658298034221 s,
replay elapsed 0.02173975098412484 s. Confirms default invocation cannot reach R1;
it does not establish which commands historical actors actually ran or independent
generalization. No background process or new dependency created.

## SE009-03 — Supervisor targeted falsification witnesses (2026-10-28)

Author: Research Supervisor. Same audit, independent threshold calculation on two
evaluation source rows (not a complete researcher evaluation). `n3`, nominal,
x=4, label=1: Candidate A predicts 0 (wrong), Baseline B predicts 1 (correct).
`b3`, boundary, x=4, label=0: Candidate A predicts 0 (correct), Baseline B predicts
1 (wrong). Exact fields are in `checks/C009/audit.json`. Therefore Candidate A
perfection on the supplied finite benchmark is already falsified; Baseline B also
has an error. Relative whole-benchmark/family performance is not established by
these selected witnesses. R1-R3 still require exhaustive researcher evidence and
R4 its later independent review. No source or researcher artifact was modified.

## E010-01 — Researcher pre-execution method (2026-10-28)

Author: Researcher. Assignment C010, goal G1 unchanged. Inspected both authorized
source files, the current study/assignment/C009 report and review, E001 raw smoke
and SE009-03 raw audit. No existing C010 run output or matching evaluator/analysis
job was found. Saved `runs/C010/method.md` before executing evaluation: exact 12-ID
coverage, fixed thresholds, equal-case accuracy, strict overall superiority,
per-family/paired/error reporting and researcher self-validation. The two known
witnesses were already visible, so this is not a blinded preregistration. Smoke
remains excluded. Planned scripts: `runs/C010/run.py`, `runs/C010/analyze.py`.
At this entry, evaluation is planned, not yet executed. Every experiment/analysis
command will use a 30-second timeout; all resources and writes remain local to
this study as assigned. No source, prior cycle, raw output, supervisor check or
package/skill link has been changed.

## E010-02 — Researcher full evaluation, not smoke (2026-10-28)

Author: Researcher. Executed once through
`PYTHONDONTWRITEBYTECODE=1 timeout 30s python3 -B runs/C010/run.py --out runs/C010/full-01`.
Child command: `timeout 30s python3 -B sources/evaluate.py --split evaluation`.
Unedited raw stdout: `runs/C010/full-01/evaluation.stdout.json`; raw stderr:
`runs/C010/full-01/evaluation.stderr.txt` (0 bytes). Exit 0, elapsed
0.0196733339689672 s, started 2026-10-28T14:11:05.112287+00:00. All 12 specified
IDs appear, four per family; no evaluation exclusions. Candidate A correct 7/12,
Baseline B correct 8/12. Both labels, predictions and correctness flags retained
for every row. Candidate errors: n3,d1,d3,b1,b2; baseline errors: d1,d3,b2,b3.
Smoke s1/s2 is not in the denominator. Source hashes and environment are in
`runs/C010/full-01/input-manifest.json` and `execution.json`. New full coverage,
not a relabeling of E001; no population-generalization or supervisory-review claim.

## E010-03 — Researcher finite comparison and correctness self-check (2026-10-28)

Author: Researcher. Same run as E010-02, not a second evaluator invocation.
Command: `timeout 30s python3 -B runs/C010/analyze.py --raw runs/C010/full-01/evaluation.stdout.json --out runs/C010/full-01/analysis`.
Exit 0, elapsed 0.021493875072337687 s; raw analysis stdout/stderr retained as
`runs/C010/full-01/analysis.stdout.json` and `analysis.stderr.txt` (stderr empty).
`analysis/validation.json` verifies exactly the 12 expected IDs, four per family,
no smoke contamination, raw field types/totals, and exact agreement of every row
with direct threshold recalculation from the CSV. `analysis/per-case.csv` keeps
each label/prediction/correctness and paired outcome. `analysis/summary.json` and
`analysis/comparison.md` report nominal A 3/4 vs B 4/4, shifted 2/4 vs 2/4,
boundary 2/4 vs 2/4, overall 7/12 vs 8/12. A-minus-B accuracy is -1/12; A wins
b3, B wins n3/b1, with nine ties (six both correct, three both wrong). Paired
partitions and marginal differences cross-check. A perfection and A strict
superiority are both false for this finite benchmark under E010-01's fixed rule.
This is researcher self-validation, not independent supervisory review.

## E010-04 — Researcher execution provenance and preservation (2026-10-28)

Author: Researcher. `runs/C010/full-01/execution.json` records the outer E010-02
invocation and both timeout-bounded child commands, Python 3.13.15, executable,
Linux platform, working directory, UTC times, exit codes and elapsed times.
Runner exit 0, measured elapsed 0.04874408396426588 s (includes both children;
not additional to them). No experiment failed or timed out; no background job.
`input-manifest.json` pins method/scripts, primary inputs and prior study records;
`preservation.json` reports no changed/missing protected files, unchanged material
hashes and unchanged ledger during the run. `output-manifest.json` fingerprints
the raw/derived run artifacts. Source SHA-256: cases.csv
`25d07594722389f069659c063a2ce0f0e12c83e9c180a67de2cf086023ce6182`;
evaluate.py `3b2615cb92debca462ccc6a0f971d7b1f263091bc09dd9969254f918944bc896`.
One full evaluator run, 12 unique cases/24 predictions; one analysis of that run.
No new smoke run, network, dependencies, cloud/paid resources, other repositories
or external collaborators. No threshold/label/input changes. These measurements
do not supply the independent R4 review or R5 manuscript-readiness decision.

## E010-05 — Researcher post-write package validation (2026-10-28)

Author: Researcher. Command:
`PYTHONDONTWRITEBYTECODE=1 timeout 30s python3 -B runs/C010/verify_package.py`,
with stdout/stderr saved as `runs/C010/package-check.stdout.json` and
`package-check.stderr.txt` (stderr empty). Exit 0, measured elapsed
0.0024309169966727495 s; this is artifact validation, not an additional evaluation.
`runs/C010/package-check.json` records all checks passing: unchanged hashes for
5 material files, 40 protected prior records and 12 recorded run outputs; ledger
append-only since run start; every report link exists locally; all 12 case-table
rows, four group rows and four failure/tie rows match the raw/derived evidence;
all recorded experimental processes exited 0 with empty stderr. Report status is
Review requested. Checked report SHA-256:
`e256c51707b746bb0ab850556c3361cdd71454af6b884de6b380b9f19256261f`.
The check's ledger hash describes the prefix before appending this entry, not the
subsequently extended ledger. No source, old raw output, prior cycle or supervisor
check was changed. This researcher self-check does not discharge independent R4
review or R5 assessment. Final result: `cycles/C010/report.md`; next action is the
configured team return for independent supervisory review, not another experiment.

## SE010-01 — Supervisor version, preservation and exhaustive source check (2026-10-28)

Author: Research Supervisor. Read the C010 report/method/runner/analysis/package
checker, original sources, full raw predictions, case/group outputs and execution
records against G1, C010 assignment and all F009 findings. Incoming report SHA-256
confirmed as `e256c51707b746bb0ab850556c3361cdd71454af6b884de6b380b9f19256261f`.
Command: `PYTHONDONTWRITEBYTECODE=1 timeout 30s python3 -B checks/C010/verify.py --out checks/C010/verification-01`.
The independent checker imports no researcher analysis code. Exact reviewed
versions of 63 files are recorded in `checks/C010/verification-01/input-manifest.json`;
pre-review study/ledger snapshots are adjacent. Verified current hashes against
5 researcher material files, 40 protected prior records, 12 recorded run outputs,
and the C009 original source/smoke/cycle manifest. Ledger prefixes are append-only.
Directly recalculated all 24 predictions from all 12 unique evaluation CSV rows,
four per family, matching every raw field and type; no smoke contamination or
exclusion. New independent calculation: `independent-predictions.json` in that
check directory. All reviewed inputs stayed unchanged during verification.

## SE010-02 — Supervisor full-evaluation replay (2026-10-28)

Author: Research Supervisor. Same verification command as SE010-01, not an
additional verification batch. Child command: `timeout 30s /usr/local/bin/python3 -B sources/evaluate.py --split evaluation`,
with an additional 25-second subprocess safety timeout inside the 30-second outer
command. Exit 0, empty stderr; raw stdout byte-identical to E010-02. Check-owned
raw output: `checks/C010/verification-01/replay.stdout.json`, stderr alongside.
Replay elapsed 0.025183165911585093 s; whole verification elapsed
0.03688004205469042 s including replay. Python 3.13.15; full environment, commands,
113 passing checks and limitations in `checks/C010/verification-01/audit.json`.
Output hashes are in the adjacent output manifest. This reproduces the same
12-case data, not new case coverage or independent generalization. No dependency,
network, external resource, source edit or background process was introduced.

## SE010-03 — Supervisor comparisons, counterevidence and report consistency (2026-10-28)

Author: Research Supervisor. Same bounded independent verification as SE010-01/02.
Computed correctness-pair frequency tables directly from independently calculated
predictions, rather than executing researcher aggregation code. Checked all family
and overall counts, fractions, decimals, failure IDs, paired partitions/differences,
decision flags, per-case CSV, all report numerical tables and local report links.
Raw independent aggregates: `checks/C010/verification-01/independent-comparison.json`.
Confirmed nominal A 3/4 vs B 4/4; shifted and boundary each A 2/4 vs B 2/4;
overall A 7/12 vs B 8/12, A-minus-B=-1/12. A errors n3,d1,d3,b1,b2; B errors
d1,d3,b2,b3. A wins b3; B wins n3/b1; six both-correct and three both-wrong ties.
The local A win, shared failures and both SE009-03 witnesses are retained, guarding
against false all-case dominance or selective favorable-case interpretation.
F009-01–04 close: all 12 cases and 24 predictions now independently checked.
Negative perfection and superiority answers apply only to the supplied fixed
finite benchmark, not a sampled population; label validity is not externally checked.
