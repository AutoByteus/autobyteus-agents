# C010 researcher report — complete finite evaluation

**Status: Review requested**  
Date: 2026-10-28. Author: Researcher. Study: Synthetic threshold study.  
Goal revision: **G1 unchanged**. Assignment: [C010](assignment.md).
Prior review: [C009](../C009/review.md). Evidence ledger: [evidence.md](../../evidence.md).

## Proposed answers to G1, separately

1. **Is Candidate A perfectly accurate? No.** On all 12 supplied evaluation
   cases, A is correct on 7 and wrong on 5 (accuracy 7/12, approximately 58.33%).
   Its errors are n3, d1, d3, b1 and b2. [E010-02, E010-03]
2. **Is Candidate A better than Baseline B? No, under the fixed overall accuracy
   rule.** B is correct on 8/12 (2/3, approximately 66.67%), so A-minus-B accuracy
   is exactly -1/12, or approximately -8.33 percentage points. B has one more
   correct case overall. A wins one paired case and loses two; nine are ties.
   This is a finite-set comparison, not a population claim. [E010-01–E010-03]

These are proposed research conclusions for independent review, **not a team
completion or manuscript-readiness decision**. Neither method is perfect overall.

## Scope and method

The [method specified before execution](../../runs/C010/method.md) fixes the two
claims, exact cases, baselines, metrics, checks and limits (E010-01). The source
and known n3/b3 witnesses were already inspected: this was not blinded or an
independent preregistration. The only research inputs are the unchanged
[CSV](../../sources/cases.csv) and [evaluator](../../sources/evaluate.py).

The supplied evaluator was executed with explicit `--split evaluation`, correcting
the smoke-default mechanism documented in C009. Candidate A predicts 1 iff x >= 5;
B predicts 1 iff x >= 4. All 12 specified IDs are retained, four per family.
Smoke s1/s2 is excluded because of its split, not its outcomes. No tuning, label
changes, deduplication, additional cases, training or randomness occurred.

Accuracy is correct/total with equal weight for each evaluation row. Strict
superiority requires positive A-minus-B overall accuracy; a tie is not superiority.
The [analysis code](../../runs/C010/analyze.py) checks schema, types, exact coverage,
all raw fields against direct CSV-based threshold calculation, raw totals and the
paired partition before accepting the comparison. This is a correctness check,
not a speed comparison or independent supervisory review. There were no
experimental deviations from the saved method. [E010-02–E010-04]

## Complete per-case results

Correctness is per-case accuracy (1 = correct, 0 = wrong). Source of this table:
[unedited evaluator output](../../runs/C010/full-01/evaluation.stdout.json) and
[per-case CSV](../../runs/C010/full-01/analysis/per-case.csv). [E010-02, E010-03]

| ID | Family | x | Observed label | A prediction | B prediction | A correct | B correct | Paired outcome |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| n1 | nominal | 2 | 0 | 0 | 0 | 1 | 1 | Both correct |
| n2 | nominal | 6 | 1 | 1 | 1 | 1 | 1 | Both correct |
| n3 | nominal | 4 | 1 | 0 | 1 | 0 | 1 | B win |
| n4 | nominal | 5 | 1 | 1 | 1 | 1 | 1 | Both correct |
| d1 | shifted | 3 | 1 | 0 | 0 | 0 | 0 | Both wrong |
| d2 | shifted | 8 | 1 | 1 | 1 | 1 | 1 | Both correct |
| d3 | shifted | 7 | 0 | 1 | 1 | 0 | 0 | Both wrong |
| d4 | shifted | 1 | 0 | 0 | 0 | 1 | 1 | Both correct |
| b1 | boundary | 4 | 1 | 0 | 1 | 0 | 1 | B win |
| b2 | boundary | 5 | 0 | 1 | 1 | 0 | 0 | Both wrong |
| b3 | boundary | 4 | 0 | 0 | 1 | 1 | 0 | A win |
| b4 | boundary | 5 | 1 | 1 | 1 | 1 | 1 | Both correct |

## Family and overall comparisons

Exact counts and fractions determine the result; percentages are display values.
All group summaries, failure IDs and tie subtypes are in
[summary.json](../../runs/C010/full-01/analysis/summary.json). [E010-03]

| Group | A correct/total (accuracy) | B correct/total (accuracy) | A-B accuracy, exact | A wins | B wins | Ties |
| --- | --- | --- | --- | --- | --- | --- |
| Nominal | 3/4 (75%) | 4/4 (100%) | -1/4 | 0 | 1 | 3 |
| Shifted | 2/4 (50%) | 2/4 (50%) | 0 | 0 | 0 | 4 |
| Boundary | 2/4 (50%) | 2/4 (50%) | 0 | 1 | 1 | 2 |
| Overall | 7/12 (58.33% approx.) | 8/12 (66.67% approx.) | -1/12 | 1 | 2 | 9 |

| Group | A failure IDs | B failure IDs | Both correct ties | Both wrong ties |
| --- | --- | --- | --- | --- |
| Nominal | n3 | None | n1,n2,n4 | None |
| Shifted | d1,d3 | d1,d3 | d2,d4 | d1,d3 |
| Boundary | b1,b2 | b2,b3 | b4 | b2 |
| Overall | n3,d1,d3,b1,b2 | d1,d3,b2,b3 | n1,n2,n4,d2,d4,b4 | d1,d3,b2 |

A's only paired win is b3; B's wins are n3 and b1. The six both-correct plus three
both-wrong ties account for the other nine cases. Thus 1-2 = -1 correct case,
matching 7-8 = -1. The methods tie on shifted and boundary accuracy; A is not
strictly better in any supplied family. B's overall advantage is not dominance on
every case: b3 is retained opposing evidence against that stronger assertion.

## Evidence mapping and prior findings

| Claim / finding | Evidence and artifact | Disposition proposed for review |
| --- | --- | --- |
| F009-01: omitted evaluation | E010-02 raw output; E010-03 [validation](../../runs/C010/full-01/analysis/validation.json) | All 12 expected IDs measured with four per family, no omissions or unexpected IDs. |
| F009-02: missing comparisons | E010-03 per-case CSV and summary; tables above | Complete family/overall accuracy, all errors, paired wins/losses/ties supplied. |
| A is not perfect | E010-02/03; earlier SE009-03 n3 witness | Five measured failures, confirming rather than substituting for the earlier witness. |
| A is not strictly superior overall | E010-01 fixed metric; E010-02/03 full counts | Exact A-B difference -1/12; b3 is a local A advantage, not overall superiority. |
| F009-03: missing raw output/provenance | E010-02–E010-04; manifests, logs, commands and code below | Reproducible full evaluation supplied; no prior evidence overwritten. |
| F009-04: full claims not independently reviewed | This report and E010-01–E010-04 | Evidence now ready; **supervisory review remains pending**. |
| F009-05: manuscript-readiness judgment | Finite scope and limitations below | **Not resolved by researcher**; supervisor's terminal assessment remains due. |

E001's 2/2 smoke performance for both methods remains valid for those two rows;
it never established either evaluation claim. The new full run agrees with both
SE009-03 witnesses (n3 and b3) and adds the previously absent exhaustive comparison.
All nine historical returns, prior raw evidence and checks remain preserved.

## G1 and R1–R5 coverage

| Requirement | Current researcher coverage |
| --- | --- |
| G1 | Both finite questions answered separately and negatively; scope unchanged. |
| R1 | 12 planned, 12 attempted, 12 completed, 12 researcher-self-validated unique evaluation cases; one evaluator invocation, 24 predictions. Four cases in every family. |
| R2 | Every case and group compared; all failures and nine ties retained. |
| R3 | Unedited stdout/stderr, analysis outputs/code, hashes, environment, commands, status/timing and preservation checks supplied. |
| R4 | Ready for independent supervisory check; 0 C010 results independently reviewed at this report. The prior supervisor's two source witnesses are separate and not counted as full C010 verification. |
| R5 | Evidence informs, but does not replace, supervisor's manuscript-readiness assessment. No manuscript requested or written; no publication action or guarantee. |

No evaluation measurement remains outstanding within this bounded assignment.
This coverage statement is not permission to skip the remaining independent
review and manuscript-readiness assessment.

## Reproduction and provenance

Executed from `/tmp/research-goal-check.XJcMUu/studies/stalled`:

```sh
PYTHONDONTWRITEBYTECODE=1 timeout 30s python3 -B runs/C010/run.py --out runs/C010/full-01
```

The [runner](../../runs/C010/run.py) saved the following child commands and all
exit statuses in [execution.json](../../runs/C010/full-01/execution.json):

```sh
timeout 30s python3 -B sources/evaluate.py --split evaluation
timeout 30s python3 -B runs/C010/analyze.py --raw runs/C010/full-01/evaluation.stdout.json --out runs/C010/full-01/analysis
```

For a researcher reproduction, use the same outer command with a fresh `--out
runs/C010/reproduction-01`; existing paths are refused. A supervisor should keep
its rerun evidence in its own fresh `checks/` directory, execute the evaluator
directly with the same split/timeout, and independently recompute the comparison.
The analysis script can also read a check's raw path and write to a new in-study
analysis directory. Re-execution is deterministic; it is not additional case
coverage or external validation.

[Input manifest](../../runs/C010/full-01/input-manifest.json) pins both primary
inputs, method/code and protected prior records:

| Input | SHA-256 |
| --- | --- |
| sources/cases.csv | `25d07594722389f069659c063a2ce0f0e12c83e9c180a67de2cf086023ce6182` |
| sources/evaluate.py | `3b2615cb92debca462ccc6a0f971d7b1f263091bc09dd9969254f918944bc896` |

[Preservation check](../../runs/C010/full-01/preservation.json) found unchanged
inputs/material and no changed/missing protected records.
[Output manifest](../../runs/C010/full-01/output-manifest.json) fingerprints raw
and derived outputs. All new experimental artifacts are under `runs/C010/`.
The supervisor-owned study, assignment, handoff, reviews and checks were not edited.

Environment: Python 3.13.15, `/usr/local/bin/python3`,
Linux-6.12.54-linuxkit-aarch64-with-glibc2.39, standard library only;
`PYTHONDONTWRITEBYTECODE=1` and `-B`. No seed: deterministic fixed rules.

| Executed work | Exit | Measured elapsed seconds |
| --- | --- | --- |
| Full evaluator, 12 cases | 0 | 0.0196733339689672 |
| Analysis/self-validation | 0 | 0.021493875072337687 |
| Runner including both children and provenance/preservation work | 0 | 0.04874408396426588 |

Times are monotonic wall-clock measurements, not model-speed benchmarks. The
runner time includes the child times and must not be added to them. Every
experiment/analysis command used a 30-second timeout. Both raw stderr files are
empty; no experiment failed or timed out. No additional smoke run, dependency,
network, paid/cloud resource, external collaborator or background job was used.
Read/write preparation and report-authoring time are not experiment runtime and
were not measured end-to-end. No total-budget or historical-count limit was used.

## Limits and exact next action

This is an exhaustive answer for these supplied labels and 12 evaluation cases,
not an estimate for a broader population. The families are fixed synthetic groups,
not sampled populations. Distinct IDs can have equal x and differing labels; they
remain distinct required cases, and no label correction is inferred. Known prior
witnesses and full source visibility preclude describing this as blinded or
held-out testing. No label-validity, external generalization, novelty, statistical
significance, deployment utility or publication-readiness claim follows. Exact
finite counts need no sampling interval; residual uncertainty concerns scope and
independent verification, not an unmeasured subset of this benchmark.

**Next action: independent supervisory review of C010**, including direct source
and raw-artifact inspection, reproduction of all 12 cases and group/paired totals,
then the supervisor's G1/R1–R5 and manuscript-readiness decisions. No new
researcher experiment or scope expansion is proposed or launched. If a specific
verification discrepancy is found, a new bounded correction assignment should
identify it; the current negative answers are not grounds for favorable-case tuning.
