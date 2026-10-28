# C007 method — recorded before the evaluation execution

Author: Researcher. Study: synthetic threshold study, G1 unchanged; C007 under
P001. This protocol follows the assignment, not the superseded count-stop policy.
The supplied CSV/evaluator and S003 were read before writing it; it is not a
blinded protocol. No full evaluation has been executed by this researcher yet.

## Question, selection and falsification

- Test whether fixed Candidate A is perfect and strictly more accurate than fixed
  Baseline B on the complete supplied **evaluation** split. These are separate
  predicates: perfection requires 12/12, and better requires A's total correct to
  exceed B's. One wrong A prediction rejects perfection; a tie or loss rejects
  better. S003 is inherited opposing evidence for perfection, to be checked rather
  than treated as sufficient aggregate evidence.
- Census: n1–n4 (nominal), d1–d4 (shifted), b1–b4 (boundary), four in each family.
  All 12 are planned; at protocol creation none has yet been attempted in C007.
  Exclude exactly the two smoke rows by the supplied split, not by outcomes.
- Only research inputs: `sources/cases.csv` and `sources/evaluate.py`. Keep labels,
  rows, order and supplied thresholds unchanged: A predicts 1 at integer x>=5;
  B predicts 1 at integer x>=4. No fitting, tuning, augmentation or new sources.

## Measurement and controls

1. Cheap preflight: parse the CSV, check schema, integer values, binary labels,
   unique IDs, all expected IDs/families, 12 evaluation/2 smoke rows and disjoint
   splits. Record source, method and script SHA-256 hashes plus execution context.
   A failed prerequisite prevents evaluator launch, not an excuse to run smoke.
2. Execute the authorized evaluator with **`--split evaluation`**. Preserve exact
   stdout bytes, stderr bytes, the launched argv, UTC times, measured monotonic
   durations, exit status and timeout outcome. Never default to smoke.
3. Reconstruct each expected row with separate standard-library code (integer
   `x>4` and `x>3`), checking input fields, both predictions and correctness flags,
   exact coverage and evaluator totals. This is a researcher self-check, not the
   required independent supervisory review. Explicitly trace n3 against S003.
4. Save `per-case.csv`, all cases where either method fails (`failures.json`), and
   `comparison.json` with overall and each family correct/total, exact rational
   accuracy, decimal accuracy, failure IDs and paired categories. Accuracy is
   correct/total with equal row weight. A-minus-B is (A correct − B correct)/n;
   percentage-point difference is 100 times that fraction. Paired categories are
   both correct, A-only correct, B-only correct and both wrong; their counts must
   partition n and reproduce the net difference. Duplicate x values remain
   separate supplied cases, not deduplicated observations.
5. Run the identical pipeline once more into a new `replay/` directory to check
   same-input deterministic reproducibility, not to select a favorable run or
   claim more data. Compare raw stdout and derived results byte for byte. Counts
   of distinct cases remain 12, not 24. No statistical confidence interval, unseen
   distribution, novelty, speed comparison or publication inference is planned.
6. Fingerprint and audit preserved study/history/supervisor files; allow only an
   append to `evidence.md`. Save a new C007 report and request independent review.

## Reproduction and actual resource boundaries

Working directory for every command:
`/tmp/research-goal-check.XJcMUu/studies/upgrade`.

Planned commands (each has a 30-second outer limit; the runner also gives its
evaluator subprocess a 30-second timeout):

```sh
timeout 30s python3 -B runs/C007/run.py --out runs/C007/primary
timeout 30s python3 -B runs/C007/run.py --out runs/C007/replay
timeout 30s python3 -B runs/C007/finalize.py
```

To reproduce without overwriting evidence, use a fresh in-study output directory
in place of `primary`/`replay`; the runner refuses existing directories. The exact
evaluator argv is `python3 -B sources/evaluate.py --split evaluation` with the
working directory above and `subprocess.run(..., timeout=30)`. The analyzer can
also be rerun separately using its CLI, under `timeout 30s`, into a fresh directory.

Standard-library Python and the existing local `timeout` executable only. No
network, dependencies, paid/cloud jobs, external collaborators, other repositories,
package/source/history edits, literature, manuscripts or publication. There is no
cumulative runtime or return-count allowance. A timeout/failure preserves available
raw files and preflight/attempt records for diagnosis; an interrupted outer command
may lack a finished metadata record and must not be called a completed experiment.
No background process or automatic restart is planned.

The current evidence ledger, historical reports and supervisor checks are control/
provenance records, not extra research datasets. Historical total runtime/progress
claims remain unknown; this work does not rewrite or retrospectively validate them.
