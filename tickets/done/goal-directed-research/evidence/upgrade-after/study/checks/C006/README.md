# C006 independent supervisor checks

The researcher inputs and historical artifacts were not modified. These checks
verify the handoff's smoke claim and missing coverage, and trace one falsifying
case; they do **not** supply the researcher's full evaluation.

## Commands actually executed

Working directory: `/tmp/research-goal-check.XJcMUu/studies/upgrade`.

```sh
timeout 30s python3 -B sources/evaluate.py --split smoke > checks/C006/smoke-rerun.json
timeout 30s python3 -B checks/C006/verify.py > checks/C006/check-results.json
```

Both commands returned 0; every assertion passed. No seeds, dependencies, network,
paid services, cloud jobs or persistent processes were used. The evaluator has a
default split of `smoke`; future full evaluation must explicitly select
`--split evaluation`.

## Records

- [review-inputs.json](review-inputs.json): SHA-256 fingerprints of the original
  study/evidence state, all historical reports/assignments/reviews, and decisive
  researcher inputs/output; check-script hash and environment. The original
  study/evidence hashes predate this review's permitted supervisory updates.
- [smoke-rerun.json](smoke-rerun.json): raw evaluator stdout, semantically identical
  to `runs/smoke.json`.
- [verify.py](verify.py): independent checks using Python's standard library.
- [check-results.json](check-results.json): assertions, inventory, n3 counterexample,
  coverage and limitations.

For a later reproduction, preserve this directory. Copy `verify.py` into a fresh
`checks/<new-review-id>/` directory, save the smoke rerun in that new directory,
and run the copied verifier, both with the same 30-second timeout. Its inputs are
the current study state, so it creates a new manifest rather than inheriting this
review's approval.

The finite benchmark's supplied labels are taken as ground truth for G1 only.
Smoke reproducibility is not independent-data validation. The n3 counterexample
rules out perfection but does not measure full relative performance.
