# C007 supervisory checks

These records belong to the Research Supervisor, not the researcher. The earlier
[resumption-inputs.json](resumption-inputs.json) remains unchanged. Full-result
review used [verify-full.py](verify-full.py), without importing or executing the
researcher's analysis/runner/audit code.

## Command actually executed

Working directory: `/tmp/research-goal-check.XJcMUu/studies/upgrade`.

```sh
timeout 30s python3 -B checks/C007/verify-full.py --out checks/C007/full-review
```

The outer command returned 0. The verifier ran
`python3 -B sources/evaluate.py --split evaluation` with `subprocess.run(timeout=30)`;
its exit was 0, stderr empty, and stdout byte-identical to both researcher runs.
Evaluator elapsed wall time was 0.035891624982468784 seconds; the complete verifier
measured 0.04383708303794265 seconds. These include local overhead, are not model
performance benchmarks, and do not measure historical cumulative runtime.

## Saved evidence

- [full-review/review-inputs.json](full-review/review-inputs.json): review-time
  fingerprints, byte lengths, Python/platform and verifier hash. All 41 entries
  in the researcher manifest were verified before supervisory record updates.
- [full-review/run-start.json](full-review/run-start.json) and
  [execution.json](full-review/execution.json): exact command, limits and measured
  evaluator outcome.
- [evaluation.stdout.json](full-review/evaluation.stdout.json) and
  [evaluation.stderr.txt](full-review/evaluation.stderr.txt): untouched rerun output.
- [verification.json](full-review/verification.json): independent predictions for
  every case, family/overall exact counts, paired groups, all failures, coverage,
  preservation checks and limitations. Every assertion passed.

## Scope of verification

1. Hash-checked the actual report, raw/derived evidence, methods, scripts and
   metadata against the researcher manifest; inspected the code rather than
   assuming a successful audit flag was sufficient.
2. Rechecked 33 protected records in each researcher snapshot, allowing only the
   documented old ledger byte prefix, plus pinned input/output hashes and recorded
   30-second/exit/timeout outcomes. This preserves history, not the truth of past
   undocumented progress or resource claims.
3. Re-executed the explicit evaluation split and independently constructed all
   predictions from the supplied CSV and fixed thresholds. Checked every raw field,
   per-case CSV entry, failure record, family/overall fraction and paired category.
4. Checked all 12 unique evaluation IDs, four per family; smoke was excluded by
   split and there were no evaluation exclusions or deduplication of shared x
   values. Confirmed S003 n3 and retained A-only b3 and two family-level ties as
   counterevidence to an overbroad claim of baseline dominance.

For later benchmark reproduction, keep these outputs intact, use a fresh
supervisor-owned output directory, and execute the explicit evaluator under
`timeout 30s`. The source-derived arithmetic is inspectable in `verify-full.py`
and every expected row is in `verification.json`. The full verifier additionally
checks the *sealed handoff's administrative revision*: later intentional ledger
appends or supervisory-state edits require a new provenance review, not blindly
reusing old state hashes. The saved input manifest fingerprints the ledger/state
**before** S005–S007 and the terminal review were written.

No independent dataset, significance test, literature search, human/external
peer review, manuscript development or real-world research was performed. Exact
accuracy concerns only the supplied labels and finite benchmark.
