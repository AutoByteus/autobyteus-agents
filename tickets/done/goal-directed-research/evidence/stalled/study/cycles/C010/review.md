# C010 terminal supervisory review

Date: 2026-10-28. Author: Research Supervisor. Study: Synthetic threshold study.
Goal revision: **G1 unchanged**. Decision: **Complete**.
Manuscript readiness: **Not ready** (separate from research completion).

## Original question and final answer

G1 asks whether Candidate A is perfectly accurate and better than Baseline B on
the supplied finite benchmark, with every evaluation case measured, both methods
compared, reproducible evidence, independent review and a readiness assessment.

Both answers are **no** under the unchanged, pre-execution overall-accuracy rule:

| Evaluation group | Candidate A correct/total | Baseline B correct/total | A-minus-B accuracy |
| --- | --- | --- | --- |
| Nominal | 3/4 | 4/4 | -1/4 |
| Shifted | 2/4 | 2/4 | 0 |
| Boundary | 2/4 | 2/4 | 0 |
| Overall | **7/12** (58.33%) | **8/12** (66.67%) | **-1/12** (about -8.33 percentage points) |

A has five errors: n3,d1,d3,b1,b2. B has four: d1,d3,b2,b3. Neither is perfect.
A wins b3, B wins n3/b1; nine ties are six both-correct plus three both-wrong
(d1,d3,b2). B's one-case overall advantage is **not** dominance on every case.
These are verified exhaustive finite counts, not statistical significance,
population superiority, deployment utility or external generalization claims.

## Evidence revision and independent checks

Reviewed [C010 report](report.md), SHA-256
`e256c51707b746bb0ab850556c3361cdd71454af6b884de6b380b9f19256261f`,
[assignment](assignment.md), [C009 findings](../C009/review.md), original goal and
history. Read both primary inputs, [method](../../runs/C010/method.md),
[runner](../../runs/C010/run.py), [analysis](../../runs/C010/analyze.py),
[package checker](../../runs/C010/verify_package.py),
[raw predictions](../../runs/C010/full-01/evaluation.stdout.json),
[per-case CSV](../../runs/C010/full-01/analysis/per-case.csv),
[summary](../../runs/C010/full-01/analysis/summary.json), and
[execution record](../../runs/C010/full-01/execution.json).
Researcher self-checks were inspected, not accepted as independent review.

Authoritative primary input hashes, unchanged from C009:

- CSV: `25d07594722389f069659c063a2ce0f0e12c83e9c180a67de2cf086023ce6182`.
- Evaluator: `3b2615cb92debca462ccc6a0f971d7b1f263091bc09dd9969254f918944bc896`.

Exact versions of the report and material evidence (63 files) are pinned in
[supervisor input manifest](../../checks/C010/verification-01/input-manifest.json).
Approval applies to those versions; later changes do not silently inherit it.

Independent command, from the study root:

```sh
PYTHONDONTWRITEBYTECODE=1 timeout 30s python3 -B checks/C010/verify.py --out checks/C010/verification-01
```

For future authorized reproduction, choose a fresh `checks/C010/` output directory;
existing output directories are refused. No researcher evidence was rewritten.

- **SE010-01:** directly computed both threshold predictions and correctness for
  every CSV evaluation row using separate supervisor code, not imported researcher
  analysis. Verified exactly 12 unique IDs, four in each required family, all raw
  field values/types and absence of smoke. Rechecked original/protected/material/run
  hashes, append-only ledger prefixes and report version.
- **SE010-02:** reran the unchanged evaluator with explicit `--split evaluation`.
  Exit 0, empty stderr, byte-exact match to the researcher's raw output. Reproduction
  checks the same-input computation, not independent data or generalization.
- **SE010-03:** independently aggregated correctness pairs and checked every
  family/overall metric, exact fraction, failure, tie, paired difference, decision
  flag, per-case CSV and report table. Kept b3 as counterevidence to universal B
  dominance and the shared failures as counterevidence to reading ties as successes.
  Both earlier n3/b3 witnesses still agree.

Artifacts: [check code](../../checks/C010/verify.py),
[audit: 113 checks passed](../../checks/C010/verification-01/audit.json),
[independent predictions](../../checks/C010/verification-01/independent-predictions.json),
[independent comparisons](../../checks/C010/verification-01/independent-comparison.json),
[raw replay](../../checks/C010/verification-01/replay.stdout.json), and
[output fingerprints](../../checks/C010/verification-01/output-manifest.json).

## Every original requirement and earlier finding

| Requirement / finding | Closure evidence | Decision |
| --- | --- | --- |
| R1 / F009-01: all 12 evaluation cases across three families | E010-02/03 full run; SE010-01/02 confirms all IDs and all predictions, no exclusions. | Satisfied / closed. |
| R2 / F009-02: both methods per case/family, failures retained | E010-03 case/group/paired records; SE010-03 independently checks all values and opposing observations. | Satisfied / closed. |
| R3 / F009-03: raw predictions and reproducible methods | E010-01–05 fixed method, local code, raw output, hashes, execution/environment; SE010-01/02 preservation checks and exact replay. | Satisfied / closed. |
| R4 / F009-04: independent review and scoped conclusions | Separate supervisor calculation/replay and critical inspection, SE010-01–03 and this review; no researcher-result edits. | Satisfied / closed. |
| R5 / F009-05: assess readiness without guarantee | Separate Not ready judgment below, with blocking publication-oriented gaps and FU-001. R5 requires assessment, not a positive readiness outcome. | Satisfied / closed. |

Required/planned: 12. Researcher attempted: 12. Completed: 12. Researcher
self-validated: 12. Supervisor independently checked: **12**, covering **24
predictions**. The prior two source witnesses are included in, not added to, those
12 cases. The two smoke cases and repeat runs are not additional evaluation cases.

No investigation requirement, promised experiment or original-scale comparison is
missing. This is a supported negative answer, not a missing experiment renamed
inconclusive. All F009 findings are resolved without reducing G1.

## History, resources and stopping rationale

C001-C009 and the historical three-return no-progress streak remain preserved.
C009 diagnosed the smoke default and gave C010 a changed, coverage-specific task.
The delivered C010 report is the tenth researcher return and supplies new full
evidence. Counts did not impose a stop, require a numbered extension or justify
completion. The finite goal is now achieved; unchanged repetitions or new tuning
would add no required evidence, so no C011 assignment is warranted.

Researcher recorded runtime: enclosing evaluation/analysis runner 0.048744084 s,
including evaluator 0.019673334 s and analysis 0.021493875 s; package artifact check
0.002430917 s separately. Supervisor verification: 0.036880042 s including the
0.025183166 s evaluator replay. Child times are not added again to parent times.
Prior unrecorded runtime and authoring/inspection overhead are not assumed zero.
Commands were bounded by 30-second timeouts; the supervisor subprocess additionally
had a 25-second safety timeout. No observed failed run, timeout or pending job.
No network, paid/cloud resource, new dependency, external collaborator or other
repository was used. All check writes are in this study; package remains read-only.

## Separate manuscript-readiness assessment

**Not ready.** The benchmark report is inspectable and reproducible, but the
available two-source synthetic study contains no related-work or credible novelty
assessment establishing a manuscript-level contribution. No actual manuscript
exists for review of its argument, reporting, ethics/data rights or limitations.
The performance results alone cannot establish those elements or publishability.

These gaps block a positive manuscript-readiness judgment, **not completion of
G1**. Drafting, broader evidence, external literature and publication are outside
the present authorized finite study. Optional follow-up is recorded once as
[FU-001](../../follow-ups.md#fu-001--optional-manuscript-development), requiring a
new user scope/access decision; it is not a new research assignment or blocker.

This was independent checking by a different agent, not external human peer
review. Source labels are accepted as provided; family membership is fixed, not
sampled; contradictory labels at equal x remain distinct cases. Source visibility
and prior witnesses mean this was not blinded or held-out testing. No claim about
label validity, broader performance, novelty or acceptance is established. Any
future publication-oriented work should receive appropriate human/domain review
and, if inferential claims are added, statistical review; none was performed here.
No submission, upload or publication is authorized or performed.

## Terminal disposition

**Complete** for G1/R1-R5. No outstanding research assignment or pending process.
Return this file-backed assessment to the user/caller (or an explicitly matching
terminal parent route after checking configured rules). Do not route this terminal
assessment back into the internal research loop or launch more measurements.
A later changed user request requires saved scope authority and a supported
message/resume; file presence is not an autonomous restart trigger.
