# C007 researcher report — full finite synthetic evaluation

**Status: Review requested.** Author: Researcher. Date: 2026-10-28.
Study: synthetic threshold study. **G1 unchanged; policy P001.**
Work order: [C007 assignment](assignment.md), supported by the
[resumption review](resumption-review.md). This report proposes conclusions and
finding closure for independent judgment; it does not certify team completion.

## Proposed answer and evidence

On **all 12 supplied evaluation rows**, Candidate A is **not perfect** and is
**not more accurate than Baseline B**:

- A: **7/12 correct = 58.333333…%**, five failures.
- B: **8/12 correct = 66.666666…%**, four failures.
- A minus B: **−1/12 accuracy = −8.333333… percentage points**.

This is an exact finite-census comparison against the supplied labels, not a
significance test or a claim about unseen data. B has strictly higher overall
accuracy here, but does **not** win every case: A alone is correct on b3.

Claim-to-evidence map ([append-only ledger E002–E004](../../evidence.md)):

| Claim | Evidence and checkable artifacts | Opposing evidence / limit |
| --- | --- | --- |
| Exactly 12 evaluation cases were evaluated, four per family | E002: [raw stdout](../../runs/C007/primary/evaluation.stdout.json), [preflight](../../runs/C007/primary/preflight.json), [execution](../../runs/C007/primary/execution.json) | Smoke is not part of this denominator; no evaluation exclusions. |
| A is not perfect | E002/E003: five A failures in [per-case CSV](../../runs/C007/primary/per-case.csv) and [failures JSON](../../runs/C007/primary/failures.json) | Historical E001's 2/2 smoke success has a different scope and cannot establish perfection. |
| A is not better overall; B leads by one correct case | E003: [exact counts/fractions and paired comparison](../../runs/C007/primary/comparison.json) | A-only b3 offsets one of the two B-only wins; two family-level ties prohibit claims that B wins every family. |
| S003 is confirmed without using it to assume an aggregate conclusion | E003 [source-based validation](../../runs/C007/primary/validation.json); E004 [direct raw-field comparison](../../runs/C007/audit.json) | S003 alone covered only n3, not the aggregate. |
| Results reproduce with the same inputs and code; protected history remains intact | E004: [replay execution](../../runs/C007/replay/execution.json), [audit](../../runs/C007/audit.json) | Researcher self-checks/replay are not independent supervisory review or new sampled cases. |

## Complete per-case evidence

Predictions and supplied labels are binary. “Correct” refers only to equality with
that row's supplied label. All 12 rows below come from `split=evaluation` in the
unchanged [CSV](../../sources/cases.csv); the raw output retains the same order.

| ID | Family | x | Label | A prediction | A correct | B prediction | B correct | Paired outcome |
| --- | --- | ---: | ---: | ---: | --- | ---: | --- | --- |
| n1 | nominal | 2 | 0 | 0 | Yes | 0 | Yes | Both correct |
| n2 | nominal | 6 | 1 | 1 | Yes | 1 | Yes | Both correct |
| n3 | nominal | 4 | 1 | 0 | No | 1 | Yes | B only |
| n4 | nominal | 5 | 1 | 1 | Yes | 1 | Yes | Both correct |
| d1 | shifted | 3 | 1 | 0 | No | 0 | No | Both wrong |
| d2 | shifted | 8 | 1 | 1 | Yes | 1 | Yes | Both correct |
| d3 | shifted | 7 | 0 | 1 | No | 1 | No | Both wrong |
| d4 | shifted | 1 | 0 | 0 | Yes | 0 | Yes | Both correct |
| b1 | boundary | 4 | 1 | 0 | No | 1 | Yes | B only |
| b2 | boundary | 5 | 0 | 1 | No | 1 | No | Both wrong |
| b3 | boundary | 4 | 0 | 0 | Yes | 1 | No | A only |
| b4 | boundary | 5 | 1 | 1 | Yes | 1 | Yes | Both correct |

**S003 check:** n3 is nominal, x=4, label=1; the supplied A threshold x>=5 gives
0/wrong, while B's x>=4 gives 1/correct. Every field agrees with the preserved
[S003 raw check](../../checks/C006/check-results.json). No discrepancy was found,
and the earlier supervisory artifacts were not altered.

## Family, overall and paired comparisons

Every row has equal weight; both models use identical denominators. The exact
fractions govern; displayed percentages are descriptive, not estimated uncertainty.

| Scope | A correct/total (accuracy) | B correct/total (accuracy) | A − B (percentage points) | A failure IDs | B failure IDs |
| --- | --- | --- | --- | --- | --- |
| nominal | 3/4 (75%) | 4/4 (100%) | −25 | n3 | None |
| shifted | 2/4 (50%) | 2/4 (50%) | 0 | d1, d3 | d1, d3 |
| boundary | 2/4 (50%) | 2/4 (50%) | 0 | b1, b2 | b2, b3 |
| **Overall** | **7/12 (58.333333…%)** | **8/12 (66.666666…%)** | **−8.333333…** | **n3, d1, d3, b1, b2** | **d1, d3, b2, b3** |

| Scope | Both correct | A-only correct | B-only correct | Both wrong |
| --- | ---: | ---: | ---: | ---: |
| nominal | 3 | 0 | 1 | 0 |
| shifted | 2 | 0 | 0 | 2 |
| boundary | 1 | 1 | 1 | 1 |
| Overall | 6 | 1 | 2 | 3 |

Overall both-correct IDs: n1, n2, n4, d2, d4, b4. A-only: b3. B-only: n3, b1.
Both-wrong: d1, d3, b2. Thus A's 6+1=7 and B's 6+2=8 correct reproduce the
aggregate totals. The boundary tie masks different failures, rather than identical
predictions. Machine-readable family paired IDs are retained in E003.

## Methods, execution and provenance

The [pre-execution protocol](../../runs/C007/method.md) defines hypotheses,
falsification, census selection, controls, fixed baselines, exact arithmetic and
constraints. It was written after reading the sources/S003 but before running the
full evaluation; this was not blinded research. There were no methodological
deviations, fitting, threshold changes, relabeling, outcome-based selection or
unreported evaluator failures.

- Research inputs were exclusively the supplied CSV and [evaluator](../../sources/evaluate.py).
  The evaluator defaults to smoke; both executions explicitly selected evaluation.
- [run.py](../../runs/C007/run.py) performed input preflight, captured the evaluator
  as a bounded subprocess, and invoked [analyze.py](../../runs/C007/analyze.py).
  The latter separately expresses the fixed integer thresholds as x>4 and x>3,
  verifies every input/prediction/correctness field, recomputes raw totals and
  paired partitions, and writes exact rational and decimal summaries.
- The planned replay was a same-input reproducibility control only. Raw stdout,
  stderr, per-case CSV, failures, comparison and validation are byte-identical
  between `primary/` and `replay/` (E004). No tuning occurred between them.
- All 12 distinct cases were planned, attempted, completed and researcher-self-
  checked. There were two evaluator executions, hence 24 row executions but only
  **12 distinct cases**. Previously, the supervisor spot-checked one of those
  cases (n3); independent review of the **full** result is pending, not counted as
  already performed.

Executed from `/tmp/research-goal-check.XJcMUu/studies/upgrade`:

```sh
timeout 30s python3 -B runs/C007/run.py --out runs/C007/primary
timeout 30s python3 -B runs/C007/run.py --out runs/C007/replay
timeout 30s python3 -B runs/C007/finalize.py
```

Each runner invokes `python3 -B sources/evaluate.py --split evaluation` using
`subprocess.run(..., timeout=30)`. Exact argv, working directory, UTC timestamps,
source/code/method/output hashes and environment are in each execution JSON.
The shell wrappers additionally saved the runner's stdout/stderr and outer exit
codes: [primary](../../runs/C007/primary-command.status.json),
[replay](../../runs/C007/replay-command.status.json),
[audit](../../runs/C007/audit-command.status.json).

| Execution | Evaluator elapsed seconds | Runner elapsed seconds | Outer / evaluator exit | Timeout |
| --- | ---: | ---: | --- | --- |
| Primary | 0.021488 | 0.025673 | 0 / 0 | No |
| Same-input replay | 0.019241 | 0.022961 | 0 / 0 | No |

These rounded monotonic wall durations measure this execution including subprocess
launch/wait overhead, not model latency or total historical study runtime. Full
precision is saved. The self-audit also exited 0; measured in-script duration was
0.002088 seconds. Evaluator and experiment-wrapper stderr files are empty. A
non-experiment intake heading-format diagnostic is separately disclosed in
[intake notes](../../runs/C007/intake-notes.md); it did not affect source reads.

Environment: existing Python **3.13.15**, `/usr/local/bin/python3`, Linux aarch64
with glibc 2.39; existing `/usr/bin/timeout`. Only Python standard-library code was
used. No dependency installation, network, paid/cloud job, external collaboration,
other repository, package write or background process was used. No timeout or
blocking dependency occurred. The per-command limit remained **30 seconds**;
no cumulative runtime/return allowance was introduced. Historical runtime is unknown.

Decisive SHA-256 fingerprints:

| Artifact | SHA-256 |
| --- | --- |
| `sources/cases.csv` | `25d07594722389f069659c063a2ce0f0e12c83e9c180a67de2cf086023ce6182` |
| `sources/evaluate.py` | `3b2615cb92debca462ccc6a0f971d7b1f263091bc09dd9969254f918944bc896` |
| Primary/replay raw stdout | `6f794c1fdb1df1c43c717e1bbea1418353ab7075f52eeb2973d8507c4d60ccf3` |
| Primary/replay comparison | `012ae824292eb819e1e127cf18c3c72c8fbd90cb4df3112316fafe23b9957982` |

The final handoff inventory is `runs/C007/manifest.json`, generated after this
report and the evidence append using `timeout 30s python3 -B runs/C007/finalize.py
--seal`. It fingerprints the report, current ledger, scripts and all run artifacts;
it is not a supervisor approval. Existing artifacts are never overwritten. For a
researcher replay use a fresh `runs/C007/` output directory; for supervisory
verification, run the authorized evaluator explicitly into a fresh supervisor-owned
`checks/` location and independently recompute the paired metrics.

## Findings addressed and original-goal coverage

| Finding / requirement | New evidence and proposed disposition |
| --- | --- |
| F001 / R1, R3: missing full evaluation and provenance | E002/E003 now supply all 12 IDs, complete raw predictions, exact source/code hashes, environment, commands and execution outcomes; E004 reproduces them. Researcher deliverable supplied; closure is proposed for independent review. |
| F002 / R2, R4: missing complete comparison | E003 and the tables above retain every case/family/failure and overall paired arithmetic. Both G1 predicates have scoped negative answers. Independent closure is requested, not self-certified. |
| F003, forward-looking: artifact-backed progress | E002–E004 link new full-evaluation/analysis/replay artifacts, rather than another generic inventory return. All six historical returns and their 18 files remain intact. Past unsupported progress statements remain unaudited, not retrospectively repaired. |
| R4: independent review and scoped conclusions | The scoped researcher conclusion is ready. S003 remains a prior narrow independent check; the full result must still be independently reviewed. |
| R5: separate manuscript-readiness assessment | No manuscript was requested or written; no literature/novelty/external validity assessment was authorized or performed. The supervisor must reassess readiness separately. This finite negative result is not a publication claim. |

E004's preservation audit checks 33 existing source/control/history records,
including all six supervisor check files and the old ledger prefix; the ledger was
only appended. The supervisor-owned study, assignments, dated reviews, follow-ups
and checks were not edited. P001 supersedes the historical counter-stop/FU001
extension proposal; no reset or replacement count-permission request was made.

## Limitations and precise next action

This is the complete requested synthetic split, not real-world research or a random
sample. The same CSV supplies the reference labels; they have not been externally
validated. Shared/repeated x values remain separate equally weighted supplied
cases. Repeating this deterministic evaluator does not create independent data,
variance estimates or generalization evidence. No significance, external validity,
novelty, universal dominance, manuscript-readiness or publication conclusion follows.

**Next action: Research Supervisor independently review E002–E004 and the actual
artifacts**, verify source/output hashes, reproduce the explicit evaluation split,
recompute complete per-case/family/overall arithmetic, and decide F001/F002 and
forward-looking F003 closure, original-goal completion, and R5 separately. No
further researcher experiment is currently missing from C007; no outside-scope
study, pending process or automatic next batch is proposed. A negative answer to
perfection/better accuracy is the proposed research result, not a failure to run
the assigned evaluation.
