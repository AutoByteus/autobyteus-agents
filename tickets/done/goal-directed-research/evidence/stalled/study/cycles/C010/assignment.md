# C010 — Close the omitted finite evaluation

Owner: Researcher. Supervisor decision: **Continue**, 2026-10-28.
Study: Synthetic threshold study. Goal revision: **G1 unchanged**.
Outstanding assignment: C010 only. This resumes existing work, not a fresh study.

## Bounded question

On every one of the 12 supplied **evaluation** cases, what are Candidate A and
Baseline B's exact predictions and accuracy, per case, per family and overall?
Does the finite evidence support Candidate A being perfectly accurate and being
better than Baseline B? Answer the two claims separately, retaining all failures
and ties. Either positive or negative findings are acceptable; complete coverage
and verifiable evidence, not a preferred answer, are required.

This closes F009-01 through F009-03, supplies evidence for F009-04, and informs the
supervisor's eventual R5 assessment. Read [C009 review](../C009/review.md),
[study.md](../../study.md), [evidence.md](../../evidence.md), and the original two
source files. All C001-C009 records remain preserved and applicable.

## Correct the unproductive method

The supplied evaluator defaults to `--split smoke`. Another unchanged default run
cannot close this assignment. Explicitly select `--split evaluation` for the full
run (for example, `timeout 30s python3 sources/evaluate.py --split evaluation`).
Choose and document your detailed analysis method using only available local
standard-library tooling. Do not change either supplied source file or the model
rules, tune thresholds, alter labels, deduplicate distinct cases, or substitute a
new benchmark. Keep the two smoke cases out of evaluation denominators.

## Evidence bar and deliverables

1. Save raw full-evaluation predictions under a new path such as `runs/C010/`.
   Cover exactly `n1,n2,n3,n4,d1,d2,d3,d4,b1,b2,b3,b4`, with four cases each in
   nominal, shifted and boundary families. Preserve the observed labels and both
   predictions/correctness flags for every case. Any unexpected coverage is a
   finding to explain, not grounds for silent exclusion.
2. Save reproducible analysis giving both methods' exact correct/total and accuracy
   per family and overall, all failure IDs, ties and paired win/loss counts. Define
   accuracy and the finite-benchmark superiority rule before running the evaluation
   (ordinary accuracy on all 12 equally weighted cases, higher accuracy means better,
   ties are not strict superiority); document deviations. This is not a population
   generalization or significance-testing assignment.
3. Record commands, Python/environment version, source SHA-256 hashes, execution
   exit status and elapsed time; retain stderr/failed or partial outputs. New
   analysis code belongs under a researcher-owned in-study run directory, not in
   supervisor `checks/` or the installed package. Append distinct researcher
   evidence IDs to `evidence.md` rather than changing E001 or SE009-*.
4. Write `cycles/C010/report.md` with status `Review requested` when complete,
   G1/R1-R5 coverage, claim-to-evidence mapping, methods/deviations, supporting and
   opposing observations, scope/limitations, finding closure links, actual resource
   use and exact next action: independent supervisory review. Propose conclusions;
   do not certify team completion or manuscript readiness yourself.

The supervisor has independently checked n3 and b3 as falsification witnesses
(SE009-03). They do not replace your complete run or authorize skipping other rows.
No new researcher run exists yet; inspect artifacts before starting to avoid
duplicating any subsequently recovered output.

## Permissions, timeouts and checkpoint conditions

- All writes stay in `/tmp/research-goal-check.XJcMUu/studies/stalled`.
- Research inputs are only `sources/cases.csv` and `sources/evaluate.py`;
  installed package and its skill symlinks are read-only.
- No network, paid/cloud services, new dependencies, external collaborators,
  other repositories, manuscript submission or publication.
- Every experiment/analysis command must have an explicit 30-second timeout.
  No overall budget or return-count cap has been imposed; historical counts do not
  block useful work. Do not request an extension solely because of prior returns.
- If a command fails or times out, preserve partial artifacts, diagnose the actual
  cause and choose a changed useful authorized method. Do not retry unchanged smoke
  or declare the finite study inconclusive merely because evaluation was omitted.
- If genuinely blocked, return the exact error/dependency, attempts, partial
  findings and restart action; do unrelated useful authorized analysis first.
  Do not leave an unmanaged background job or promise a watchdog.

Before messaging, save the report and evidence. Use the configured team handoff
back to the supervisor with absolute result paths. Only subsequent independent
review can close G1; no new scope authorization is needed for this assignment.
