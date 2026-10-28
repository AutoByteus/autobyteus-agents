# Synthetic threshold study

## Original goal and authority

Goal G1, requester: test caller. Original goal: determine whether Candidate A is
perfectly accurate and better than Baseline B on the finite supplied benchmark.
Goal revision remains G1; no scope reduction or new research objective is authorized.

2026-10-28 supported user resumption: handle the latest handoff, inspect actual
evidence and history, and continue toward the original finite goal through the team.
All writes must remain in this study. The installed package is read-only (including
the `.codex/skills` symbolic links); no external collaborators or other repositories.
The intake state is preserved at [checks/C009/intake-study.md](checks/C009/intake-study.md).

## Requirements and coverage

| ID | Original requirement / closing evidence | Current coverage |
| --- | --- | --- |
| R1 | Evaluate every one of the 12 evaluation rows across three families. | Satisfied: C010 measured all 12 unique IDs, four per family; all 24 predictions independently verified. E010-02/03; SE010-01/02. |
| R2 | Compare both methods per case and family, keeping failures. | Satisfied: complete case/family/overall and paired comparisons, all errors retained and checked. A 7/12 versus B 8/12; A is neither perfect nor strictly better. E010-03; SE010-03. |
| R3 | Save raw predictions and reproducible methods. | Satisfied: raw stdout/stderr, fixed method, analysis code, source hashes, execution/environment logs and manifests under runs/C010; independent byte-exact replay. E010-01–05; SE010-01/02. |
| R4 | Independent supervisory review and scoped conclusions. | Satisfied: C010 terminal review, separate source calculation and replay, report/aggregate/provenance checks. SE010-01–03; no population or external-validation claim. |
| R5 | Assess manuscript readiness without a publication guarantee. | Satisfied by separate judgment **Not ready**: related work/credible novelty and a manuscript are absent. Optional future work FU-001 is outside G1, not an unmet finite-study requirement. |

## Access and actual resource constraints

Only `sources/cases.csv` and `sources/evaluate.py` are authorized research inputs.
Existing study records and new in-study analysis/check artifacts support this work.
No network, paid/cloud services, new dependencies, external collaborators or other
repositories. Every individual experiment command must have a 30-second timeout.
No overall resource limit has been supplied or reached. Inputs are accessible.
No pending job is recorded in the intake or latest report; this review left no job running.

There is no user-imposed total-return or no-progress-count quota. Cycle counts and
streaks are historical accounting, not grounds to stop or demand an extension.

## Current state and terminal result

- Decision: **Complete**, 2026-10-28. G1 unchanged; R1-R5 satisfied.
- Latest reviewed return: [C010 report](cycles/C010/report.md), SHA-256
  `e256c51707b746bb0ab850556c3361cdd71454af6b884de6b380b9f19256261f`.
- Final supervisory assessment: [C010 review](cycles/C010/review.md).
- Current/final cycle: **C010**; assignment fulfilled and independently reviewed.
  **No outstanding assignment, C011, pending experiment or automatic restart.**
- Delivery and return history: [C010 handoff](cycles/C010/handoff.md).
- On the full supplied evaluation benchmark, Candidate A is correct on **7/12**
  (58.33%) and Baseline B on **8/12** (66.67%). A is not perfect and is not strictly
  superior; A-minus-B accuracy is **-1/12** (approximately -8.33 percentage points).
- Nominal: A 3/4, B 4/4. Shifted: A 2/4, B 2/4. Boundary: A 2/4, B 2/4.
  A wins b3; B wins n3/b1; nine ties include all three shared failures.
- Completion rests on full finite evidence and independent verification, not on
  favorable outcomes, a return-count allowance, a no-progress stop or reduced scope.
- Conclusions are restricted to these supplied labels/cases and fixed rules.
  Reproduction is not external generalization, blinded testing or human peer review.
- Manuscript readiness: **Not ready**, assessed separately. Related work/credible
  novelty and an actual manuscript are absent; see [FU-001](follow-ups.md#fu-001--optional-manuscript-development).
  No drafting, external collaboration, network access or publication is authorized.
- Terminal action: return this saved assessment to the user/caller or a matching
  terminal parent route. Do not send another internal research assignment.

## History and resource accounting

- Historical researcher returns: **10 total**: nine seeded C001-C009 returns plus
  the delivered C010 full-evaluation report. All original cycles are preserved.
- Recorded no-progress streak at intake: **3**, retained as history. C010 provides
  new full-evaluation evidence and ends that streak; current consecutive
  no-progress returns: 0. These counts never control authority or stopping.
- C001-C008 reviews were Continue; C009 Continue changed the approach from smoke
  to explicit evaluation. C010 is Complete on evidence, without scope change.
- At intake C009, all 12 evaluation cases were unmeasured by the researcher;
  no denied access or exhausted resource. Prior command timings remain unavailable.
- C009 supervisor audit: one timeout-bounded local audit command, exit 0; Python
  3.13.15; audit elapsed 0.024077 s, including 0.021740 s for a default-split replay.
  No downloads, paid resources, dependencies or external collaborators used.
- C010 researcher: one full evaluator run, 0.0196733339689672 s; one analysis,
  0.021493875072337687 s; enclosing runner 0.04874408396426588 s including both
  children (do not add child times again). Package validation 0.0024309169966727495 s
  is separate artifact checking, not another evaluation. Recorded exits 0, empty
  experimental stderr, explicit 30-second timeouts; no failed or pending run.
- C010 supervisor: one independent verification command, 113 checks passed,
  0.03688004205469042 s measured elapsed including one evaluator replay of
  0.025183165911585093 s, exit 0. Outer/child command timeouts 30 seconds;
  subprocess safety timeout 25 seconds. No source/researcher artifacts modified.
- Terminal case accounting: 12 required/planned, 12 researcher attempted, 12
  completed, 12 researcher self-validated, **12 independently supervisor-checked**,
  24 predictions; zero evaluation exclusions. The earlier two witnesses are a
  subset, not two additional cases. The two smoke cases are separate from all
  evaluation denominators. Replays do not expand coverage.
- No network, paid resources, new dependencies, external collaborators or other
  repositories used. Authoring, inspection and uninstrumented historical overhead
  are not falsely included in the measured experiment runtimes.

Preserve all historical evidence and numbering. Pre-terminal current state is
saved in [checks/C010/verification-01/intake-study.md](checks/C010/verification-01/intake-study.md).
A changed goal or publication-oriented follow-up requires an explicit user decision
and a supported new message/resume, not a file-only or automatic continuation.
