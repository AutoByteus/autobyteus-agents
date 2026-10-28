# Supervisory review C002 — terminal assessment
Date: 2026-10-28. Goal revision: **1 (unchanged)**. Decision: **Complete**.
Manuscript readiness: **Not ready**.

## Material reviewed and independent checks
Reviewed the original goal, C002 assignment, [C002 report](report.md), C001 review,
E001/S001/E002, CSV/evaluator, researcher reproduction code, method notes, raw
predictions, paired/family comparisons, hashes, environment and preservation logs.
Exact report and material-evidence versions are in
[reviewed SHA256 manifest](../../checks/C002/reviewed-sha256.txt).

S002 independently executed:

```sh
python3 runs/C002/reproduce.py checks/C002/reproduction
python3 checks/C002/verify.py > checks/C002/verification.json
```

Both passed. The first regenerated raw evaluation, repeat, comparison and per-case
output byte-identically to E002 (excluding naturally variable environment/time).
The second supervisor-authored script recalculated every prediction and correctness
flag from the original CSV, checked counts and families, all paired partitions,
accuracy/difference arithmetic, every report table row, original source fingerprints,
C001 artifact preservation and agreement with S001. Details:
[verification](../../checks/C002/verification.json),
[verification code](../../checks/C002/verify.py),
[rerun outputs](../../checks/C002/reproduction/).
No missing rows, changed thresholds, excluded failures or unresolved discrepancy
was found. All 12 planned evaluation cases were attempted, completed and
independently checked; smoke cases are separately identified and not counted.

## Final answer and counterevidence
| Family | Cases | Candidate correct | Baseline correct |
|---|---:|---:|---:|
| nominal | 4 | 3 | 4 |
| shifted | 4 | 2 | 2 |
| boundary | 4 | 2 | 2 |
| total | 12 | 7 (58.33%) | 8 (66.67%) |

Candidate A is neither perfectly accurate nor better in overall accuracy on this
finite benchmark. Its accuracy is 8.33 percentage points lower. All Candidate
failures are n3,d1,d3,b1,b2; all Baseline failures are d1,d3,b2,b3. Baseline wins
alone on n3,b1, whereas Candidate wins alone on b3; thus better aggregate Baseline
accuracy does not establish per-case dominance. Six cases are jointly correct and
three jointly wrong. The complete negative answer is not a missing experiment.

## Requirement and finding closure
- **R1 / F001 closed:** E002 and S002 cover all 12 unique evaluation rows across
  three families, with no smoke/evaluation conflation or unrequested exclusions.
- **R2 / F001 closed:** Full per-case, paired and per-family comparisons preserve
  both methods' failures, including evidence against Baseline casewise dominance.
- **R3 / F002 closed:** Raw predictions, exact commands, executable reproduction,
  source/script hashes and environment are inspectable and reproduced by S002.
- **R4 / F003 closed:** C002 explicitly retracts C001's unsupported claims, keeps
  the finite original scope and is corroborated by S001 and fresh S002 checks.
  Earlier records remain unchanged as the audit trail, not current conclusions.
- **R5 / F004 closed as an assessment, not a readiness endorsement:** Unsupported
  publication claims are withdrawn; the independent judgment is **Not ready**.
  No literature search or manuscript was required to give this honest judgment.

## Readiness and limits
The finite fixture result is reproducible, but credible novelty and related-work
positioning are unassessed and no manuscript exists. These block publication or
manuscript-development readiness; favorable results would not have removed them.
The data are tiny and synthetic; labels have not been externally validated and
identical x values can have conflicting labels. Correctness means agreement with
supplied labels only. A full census resolves this fixture without sampling intervals,
not a population claim. Agent-only checking on the same inputs is neither external
peer review nor independent dataset validation. There is no real-world, statistical
significance, latency-superiority or publication-acceptance claim.

Potential expansion is recorded as [FU001](../../follow-ups.md), outside the completed
scope. It would need explicit user authorization and appropriate human/domain review;
no internet, submission or external collaboration is authorized or performed.

## Terminal state
Two of three researcher batches used (C001 and C002), one unused; C002 provides new
relevant evidence, so consecutive no-progress returns are zero. Its recorded evaluator
and check elapsed time is about 0.047 seconds; the recorded work is consistent with
the two-minute local-command limit, not a claim of a platform-enforced runtime audit.
No assignment remains outstanding, no C003 is issued, and no process is pending.
The original investigation is complete without a scope reduction. Return this
assessment to the user/caller or any matching terminal parent route; do not route
another internal research batch. Follow-ups require a new authorized request.
