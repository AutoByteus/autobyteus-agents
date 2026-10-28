# C010 method — specified before full evaluation

Author: Researcher. Date: 2026-10-28. Study: Synthetic threshold study.
Assignment C010, goal G1 unchanged. This is a finite census, not a sampled estimate.

## Prior knowledge and hypotheses

I read the assignment, study, C009 report/review, evidence ledger, supplied CSV and
evaluator, E001 raw smoke and SE009-03 raw witnesses before specifying this method.
The evaluator defaults to smoke. No C010 output directory or matching evaluation/
analysis process existed at intake. The n3/b3 counterexamples are known; this method
is pre-execution but **not blinded or an independent preregistration**.

- Perfection: Candidate A is correct on all 12 evaluation rows. Any retained error
  falsifies it. The known n3 witness already opposes it, but all cases are due.
- Superiority: Candidate A has strictly greater ordinary accuracy than Baseline B
  on the 12 equally weighted evaluation rows. Equal or fewer correct predictions
  refute strict superiority on this finite set. Neither smoke nor the selected
  witnesses determine the whole-set comparison.

## Fixed cases, controls and metrics

Research inputs: unchanged `sources/cases.csv` and `sources/evaluate.py` only.
Evaluate n1,n2,n3,n4 (nominal), d1,d2,d3,d4 (shifted), and b1,b2,b3,b4 (boundary),
four per family. Exclude s1/s2 because their source split is smoke, not because of
outcomes. Do not deduplicate distinct IDs, change labels or tune thresholds.
Candidate A is 1 iff integer x >= 5; Baseline B is 1 iff integer x >= 4. There is
no training, randomness, prior-best modification or improvement search. B is the
fixed assigned comparator.

Accuracy = count(prediction == observed label) / group size. Report exact
correct/total and rational accuracy; decimal displays are approximations. The
primary comparison is overall accuracy on 12 cases, not a selected family result.
Per-family denominators are four. Report A-minus-B accuracy and correct-count
differences. A paired win means A correct/B wrong; a loss means A wrong/B correct;
a tie means both correct or both wrong, retaining both tie subtypes and IDs. List
every error, not just disagreements. Per-case accuracy is correctness (1 or 0).

No confidence intervals, population significance test, out-of-sample inference,
novelty claim or manuscript-readiness certification. Exact finite counts have no
sampling uncertainty here; labels, representativeness and utility beyond these
rows are not validated.

## Execution and correctness checks

1. Save SHA-256/byte counts of inputs, method/code and protected prior artifacts.
   Record Python/platform, UTC time, working directory and commands.
2. Execute the supplied evaluator with **explicit `--split evaluation`**, saving
   byte-for-byte stdout/stderr under a fresh exclusive run directory. Record exit
   status and monotonic elapsed time. Never replace an earlier run.
3. Analyze with Python standard library only. Before aggregation require source
   schema, unique IDs, exact split/ID/family coverage, field types, all prediction/
   label/correctness fields, and consistent raw totals. Recalculate both threshold
   rules directly from the CSV and compare every raw row. This is researcher
   self-validation, not supervisory review.
4. Save per-case CSV, group summary JSON and readable comparison table, including
   all failures and paired tie subtypes. Recheck source/prior-artifact hashes.
5. Append evidence and save the C010 report as `Review requested`; hand off for
   independent supervisory review.

Coverage or execution errors are failures to preserve, diagnose and disclose, not
permission to exclude cases. Partial stdout/stderr remain if a process fails.
Invalid prerequisites prevent acceptance of aggregates. Any changed method/input
requires a new run and a deviation note.

## Commands and limits

From `/tmp/research-goal-check.XJcMUu/studies/stalled`:

```sh
PYTHONDONTWRITEBYTECODE=1 timeout 30s python3 -B runs/C010/run.py --out runs/C010/full-01
```

The runner executes and records these individually bounded commands:

```sh
timeout 30s python3 -B sources/evaluate.py --split evaluation
timeout 30s python3 -B runs/C010/analyze.py --raw runs/C010/full-01/evaluation.stdout.json --out runs/C010/full-01/analysis
```

To reproduce, use the outer command with a fresh in-study `--out` path, e.g.
`runs/C010/reproduction-01`. Existing destinations are refused. Timing/provenance
differ between runs; predictions and derived analysis should not. No install needed.

Each experiment/analysis command has a 30-second timeout, including the outer
runner. All writes remain in this study. No network, new dependencies, paid/cloud
resources, collaborators, other repositories or package/skill edits. No overall
budget or count-based stopping limit applies. No background job is intended.
