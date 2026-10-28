# C007 terminal supervisory review — G1 unchanged / P001

Date: 2026-10-28. Author: Research Supervisor.

## Decision: Complete

The original **synthetic finite-benchmark investigation** is complete. All 12
requested evaluation rows across all three families have researcher-owned raw
results, complete comparisons and reproducible methods, and have now been
independently checked. The supported answer is negative: **Candidate A is neither
perfectly accurate nor better than Baseline B on this benchmark.** This conclusion
does not generalize beyond the supplied rows/labels and is not manuscript approval.

Completion is based on fulfilled G1/R1–R5 and verified evidence, not a return-count
or no-progress threshold. The six historical returns and their dated assessments
remain unchanged; C007 is the seventh researcher return, for historical accounting
only. P001 still rejects count-based stops and replacement extension allowances.

## Exact evidence revision reviewed

Reviewed [report.md](report.md), [assignment.md](assignment.md),
[resumption-review.md](resumption-review.md), the original G1 and current state,
C006 findings F001–F003, E001–E004 and S001–S004, the two supplied research inputs,
the new methods/scripts, both full raw executions, all derived outputs and execution
metadata, and the researcher's manifest/preservation audit.

- C007 report SHA-256:
  `8910c24734061b674a03994b7d6e6f339bbaa7407bf4cb0c61d8c55970b1ae65`.
- CSV SHA-256:
  `25d07594722389f069659c063a2ce0f0e12c83e9c180a67de2cf086023ce6182`.
- Evaluator SHA-256:
  `3b2615cb92debca462ccc6a0f971d7b1f263091bc09dd9969254f918944bc896`.
- All three full-evaluation stdout files (primary, researcher replay, supervisor
  rerun) SHA-256:
  `6f794c1fdb1df1c43c717e1bbea1418353ab7075f52eeb2973d8507c4d60ccf3`.

The complete [review input manifest](../../checks/C007/full-review/review-inputs.json)
fingerprints this revision, including all 41 researcher-manifest entries, the
researcher manifest itself, methods, scripts, metadata and review-time ledger/state.
Subsequent supervisory ledger/state updates intentionally do not match the old
whole-file administrative hashes; the approved researcher report/results remain
unchanged. Changed material research evidence requires a new review.

## Independent checks, not acceptance of the summary

- **S005 — provenance and preservation:** independently verified all 41 manifest
  entries and 33 protected records in each primary/replay snapshot, including the
  preserved ledger prefixes. Inspected source, runner, analysis and audit code;
  checked pinned source/method/output hashes, recorded exit/timeout metadata and
  byte-identical replay artifacts. The six earlier cycles and supervisor checks
  were not rewritten. This does not retroactively authenticate undocumented past
  progress claims, or measure historical total resource use.
- **S006 — full raw reproduction:** ran the authorized evaluator explicitly on
  `--split evaluation` in fresh supervisor-owned storage, with a 30-second limit.
  Exit 0, no timeout, empty stderr, stdout byte-identical to the researcher runs.
  Actual measured evaluator elapsed: 0.035891624982468784 seconds, including overhead.
- **S007 — independent prediction/arithmetic and adversarial coverage check:**
  using a new verifier that does not import the researcher's analysis, recomputed
  every prediction and correctness value from the original CSV and fixed thresholds;
  compared every raw field, per-case CSV entry, failure entry, family/overall count,
  exact fraction, paired partition and reported difference. Verified 12 distinct
  evaluation IDs and four per family, no evaluation exclusions and no smoke
  contamination. Retained repeated x values as the requested distinct cases.
  Confirmed n3 from S003, A-only b3, and both family ties, testing claims broader
  than the reported overall ranking rather than selecting only favorable evidence.

All assertions passed. Full command, code, raw outputs, environment, exact
timing and check limitations: [checks/C007](../../checks/C007/README.md).
The outer verifier completed with exit 0 in a measured 0.04383708303794265 seconds.
Researcher runs are reproducibility controls, not independent data; this supervisor
is a separate reviewing agent, not an external peer reviewer. No researcher artifact
was edited to pass these checks and no replacement researcher report was authored.

## Independently supported results

| Scope | A correct/total | B correct/total | A minus B accuracy |
| --- | --- | --- | --- |
| nominal | 3/4 (75%) | 4/4 (100%) | −25 percentage points |
| shifted | 2/4 (50%) | 2/4 (50%) | 0 |
| boundary | 2/4 (50%) | 2/4 (50%) | 0 |
| **Overall** | **7/12 (58.3333…%)** | **8/12 (66.6666…%)** | **−1/12 = −8.3333… percentage points** |

- A failures: n3, d1, d3, b1, b2. B failures: d1, d3, b2, b3.
- Both correct: n1, n2, n4, d2, d4, b4 (six).
- A-only correct: b3 (one). B-only correct: n3, b1 (two).
- Both wrong: d1, d3, b2 (three).

Thus A is not perfect, and B's total accuracy is higher by exactly one correct
case. B does not win on every case or strictly within every family. The supplied
labels are the benchmark reference, not externally validated real-world truth.
These are exact census counts, not statistical significance or unseen-data estimates.

## Every original requirement and prior finding

| Requirement | Evidence / independent closure | Status |
| --- | --- | --- |
| R1: all 12 evaluation rows across three families | E002 raw output; S006 full rerun; S007 exact IDs/families and all-row predictions. Planned 12, researcher attempted 12, completed 12, independently checked 12 unique rows; zero evaluation exclusions. Two researcher runs do not turn 12 cases into 24 independent observations. | Satisfied |
| R2: both methods per case/family, keeping failures | E003 per-case CSV, failures and comparison JSON; S007 rechecks every field, family, error and paired outcome. | Satisfied |
| R3: raw predictions and reproducible methods | E002–E004 stdout, pre-execution method, fixed source/code hashes, exact commands, environment, outcomes and replay; S005/S006 verify provenance and reproduction. | Satisfied |
| R4: independent supervisory review and scoped conclusions | S005–S007 and this pinned review; both negative G1 answers independently supported without broad generalization. | Satisfied |
| R5: separate manuscript-readiness assessment | Not ready, with the distinct reasons below. The requirement was to assess readiness, not guarantee it. | Satisfied |

- **F001 closed:** the full evaluation and provenance missing at C006 now exist
  and are independently reproduced/coverage-checked (E002–E004, S005–S007).
- **F002 closed:** full per-case/family/overall relative accuracy and failures are
  present and independently recomputed, resolving both G1 predicates (E003, S007).
- **F003 forward-looking part closed:** C007 supplies distinct artifact-backed new
  evidence E002–E004; it is not another unsupported inventory return. Historical
  generic progress claims remain explicitly unaudited, not retrospectively repaired.
  That historical accounting limitation does not invalidate the complete new finite
  evaluation and is not an unmet G1 experiment or a count-based stop.

No original-goal investigation requirement remains unmet; no further researcher
assignment is warranted just to seek a favorable answer. The previous missing
experiment has now been done, so this negative result is not a disguised omission.

## Manuscript readiness: Not ready

The finite synthetic result and its reproducibility are now supported; the previous
missing-evaluation blocker is **closed**, not carried forward as if still absent.
However, relevant prior work and credible novelty have not been assessed, and no
manuscript/claim-to-literature argument has been developed or reviewed. The narrow
synthetic demonstration alone does not establish a paper contribution or external
validity. These publication-development gaps do not reopen the completed finite
study or authorize new research. No real research, external sources, manuscript
development, external collaboration or publication was requested/authorized here.

This is agent-only verification against supplied labels, not human/domain or
external peer review. Any later manuscript effort would need a separate user
request, appropriate source/access permissions and relevant human/domain review;
acceptance or publishability is not guaranteed. See out-of-scope FU002 in
[follow-ups.md](../../follow-ups.md). Nothing has been submitted or uploaded.

## Final state and return

C007 has returned and is reviewed; no assignment or process remains pending.
All writes stayed inside this synthetic study; package, sources and earlier
records were preserved. Both researcher full executions and the supervisor rerun
used the existing 30-second experiment limit and no network/dependency/outside work.
Known local timings are recorded, but no unsupported historical cumulative runtime
or replacement resource budget is asserted.

Return this terminal **Complete / manuscript Not ready** assessment to the user/
caller unless a configured terminal route matches. Do not route it as another
Researcher assignment or create C008. Any new scope would require a separate user
decision, not an invented count allowance.
