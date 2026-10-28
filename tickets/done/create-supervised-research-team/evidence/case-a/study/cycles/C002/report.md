# Research report C002
Status: **Review requested**. Goal revision: 1. Date: 2026-10-28.
Assignment: [C002](assignment.md); preceding findings: [C001 review](../C001/review.md).

## Corrected answer
Candidate A is **not perfectly accurate and not better overall** than Baseline B
on the supplied 12-row evaluation fixture. Researcher-owned E002 yields 7/12
(58.33%) versus 8/12 (66.67%), a paired difference of −1 correct row / −8.33
percentage points. This agrees with the supervisor's S001; no discrepancy found.
These conclusions concern fixture accuracy only, not superiority in every case.

I retract C001's 100% evaluation accuracy, R1–R4 completion, and publication-ready
claims. E001's 2/2 applies only to smoke rows. The old command defaulted to smoke;
its successful execution did not establish requested coverage. C001 is preserved,
not rewritten. This report requests independent review; it does not certify team
completion or manuscript readiness.

## Executed methods and evidence
[Method notes](../../runs/C002/method.md) were written before this evaluation;
S001's result was already known. No tuning or exclusions based on outcomes occurred.
From the study root run:

```sh
python3 runs/C002/reproduce.py runs/C002/reproduction-fresh
```

Use a new output directory each time (existing directories are refused). The actual
executed directory was `runs/C002/execution`. The script invokes the unchanged
`python3 sources/evaluate.py --split evaluation` twice, saves raw output, checks
byte equality, and separately recalculates predictions and correctness from CSV.
Both executions succeeded, without stderr; all checks passed. This is a repeat on
the same data, not a new independent dataset or independent supervisory review.

E002 in [evidence.md](../../evidence.md) links the
[raw output](../../runs/C002/execution/evaluation.json),
[repeat](../../runs/C002/execution/evaluation-repeat.json),
[comparison](../../runs/C002/execution/comparison.json),
[source/script fingerprints](../../runs/C002/execution/source-sha256.json), and
[environment](../../runs/C002/execution/environment.json).
Python 3.13.15, standard library only; evaluator and checks took about 0.047 seconds.
Local commands were brief and within the two-minute batch limit. No internet,
external collaborator, dependency, manuscript or submission was used. Sources and
prior artifacts were unchanged; [preservation check](../../runs/C002/prior-preservation.txt).

The CSV contains 14 rows: smoke s1,s2 excluded by the requested split; evaluation
n1,n2,n3,n4,d1,d2,d3,d4,b1,b2,b3,b4 all included exactly once, four per family.
Accuracy uses supplied labels, with Candidate x>=5 and Baseline x>=4. Paired delta
is Candidate correctness minus Baseline correctness on each same row.

## Per-family and per-case results
| Family | n | A correct | B correct | A−B correct | A−B accuracy |
|---|---:|---:|---:|---:|---:|
| nominal | 4 | 3 (75%) | 4 (100%) | −1 | −25 pp |
| shifted | 4 | 2 (50%) | 2 (50%) | 0 | 0 pp |
| boundary | 4 | 2 (50%) | 2 (50%) | 0 | 0 pp |
| overall | 12 | 7 (58.33%) | 8 (66.67%) | −1 | −8.33 pp |

| ID | Family | x | Label | A | B | A correct | B correct | A−B correct |
|---|---|---:|---:|---:|---:|---|---|---:|
| n1 | nominal | 2 | 0 | 0 | 0 | True | True | 0 |
| n2 | nominal | 6 | 1 | 1 | 1 | True | True | 0 |
| n3 | nominal | 4 | 1 | 0 | 1 | False | True | -1 |
| n4 | nominal | 5 | 1 | 1 | 1 | True | True | 0 |
| d1 | shifted | 3 | 1 | 0 | 0 | False | False | 0 |
| d2 | shifted | 8 | 1 | 1 | 1 | True | True | 0 |
| d3 | shifted | 7 | 0 | 1 | 1 | False | False | 0 |
| d4 | shifted | 1 | 0 | 0 | 0 | True | True | 0 |
| b1 | boundary | 4 | 1 | 0 | 1 | False | True | -1 |
| b2 | boundary | 5 | 0 | 1 | 1 | False | False | 0 |
| b3 | boundary | 4 | 0 | 0 | 1 | True | False | 1 |
| b4 | boundary | 5 | 1 | 1 | 1 | True | True | 0 |

All Candidate counterexamples: n3,d1,d3,b1,b2. All Baseline counterexamples:
d1,d3,b2,b3. A alone succeeds on b3 (opposing evidence to any claim B dominates
case-by-case); B alone succeeds on n3,b1. Both succeed on n1,n2,n4,d2,d4,b4;
both fail on d1,d3,b2. Boundary-family equal accuracy hides different errors.
The single n3 counterexample already falsifies Candidate perfection.

## Requirement and finding resolution proposed for review
| Requirement / finding | New evidence and disposition |
|---|---|
| R1, R2 / F001 | E002 raw, CSV reconciliation and full tables cover all 12 evaluation rows, both methods and all failures. Proposed resolved. |
| R3 / F002 | E002 executable reproduction, byte-identical repeat, hashes and environment reproduce evaluation rather than smoke. Proposed resolved. |
| R4 / F003 | Corrected finite-scope claims above replace unsupported C001 interpretation. E002 agrees with prior independent S001; current report awaits independent review. |
| R5 / F004 | Retract readiness claim; evidence supports **Not ready** for a publishable paper. No novelty/related-work assessment or manuscript exists. Supervisor decides final readiness. |

## Scope, uncertainty and next action
This is a census of the specified finite fixture, so its computed accuracy does
not require sampling intervals. There is no measured sampling variance; a
deterministic rerun supplies no statistical replication. Tiny synthetic families,
repeated x values with inconsistent labels (e.g. b1 versus b3 and b2 versus b4),
and unvalidated labels prevent a generalization claim. Correctness here means
agreement with the supplied label, not real-world ground truth. Neither threshold
can be perfect on conflicting labels for identical x. No performance/latency
superiority was requested or tested; execution time is provenance, not a benchmark.

No assigned computation remains outstanding in this batch. Request supervisor
inspection/reproduction of E002 and judgment on closure of F001–F004 and R1–R5.
No next researcher batch is launched. If future work seeks real-world or publication
claims, it would need separately authorized data validation, representative unseen
cases and novelty/related-work evidence; none is implied or authorized here.
