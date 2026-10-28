# C009 independent supervisory review

Date: 2026-10-28. Study: Synthetic threshold study. Goal revision: **G1 unchanged**.
Report reviewed: [report.md](report.md), status Review requested. Decision: **Continue**.

## Evidence and history actually checked

Read the original study and E001, all nine assignments/reports, all eight existing
reviews, [CSV](../../sources/cases.csv), [evaluator](../../sources/evaluate.py),
and [smoke raw output](../../runs/smoke.json). Exact reviewed file versions are
fingerprinted in [input-manifest.json](../../checks/C009/input-manifest.json),
including C009 report and both primary inputs. The inherited reports honestly
disclaim full evaluation and completion; the defect is missing investigation,
not a falsely positive conclusion. Earlier reviews' R1-R4 gaps remain unclosed.

Independent check command:

`PYTHONDONTWRITEBYTECODE=1 timeout 30s python3 checks/C009/check_evidence.py`

- **SE009-01:** verified 12 distinct evaluation cases, four in each of three
  families; inspected both threshold rules and the evaluator's smoke default.
- **SE009-02:** independently recomputed the two smoke predictions and replayed
  the evaluator default. Exact match to E001; both methods correct on 2/2. The
  executable default is a concrete mechanism for repeated non-progress, but the
  historical command lines were not saved, so their exact invocation is unknown.
- **SE009-03:** selected counterexamples rather than more favorable smoke cases.
  On n3, x=4/label=1, Candidate A predicts 0 incorrectly; on b3, x=4/label=0,
  Baseline B predicts 1 incorrectly. Candidate perfection is falsified by a source
  witness, but these two checks do not establish overall/family superiority.

Raw results: [audit.json](../../checks/C009/audit.json) and
[default replay](../../checks/C009/default-replay.stdout.json). Check code is
[check_evidence.py](../../checks/C009/check_evidence.py). The check script uses
exclusive output creation to preserve this record; any future rerun must write to
a new check directory. Same-input reproduction is not independent generalization.
The supervisor did not write a full researcher evaluation or report.

## Requirement coverage and actionable findings

| Finding | Requirement | Observed gap and effect | Smallest useful next work / closure evidence |
| --- | --- | --- | --- |
| F009-01 | R1 | All 12 evaluation cases remain unmeasured by the researcher; 2 smoke cases cannot represent the requested finite benchmark. | Explicitly select `evaluation` and save all 12 unique expected IDs, with four per family and no exclusions. |
| F009-02 | R2 | Neither per-family nor whole-evaluation comparison exists; selected witnesses do not settle superiority. | Report both methods' predictions/correctness for each case, failure IDs, exact family and overall counts/denominators, and paired differences; interpret perfection and superiority separately. |
| F009-03 | R3 | Evaluation raw output and execution provenance are absent. | Save immutable evaluation output, reproducible commands/analysis, source hashes, environment, runtime/exit status and deviations under this study. Keep smoke separate. |
| F009-04 | R4 | Full-evaluation claims cannot yet undergo independent verification. | Researcher returns C010 report with evidence IDs and coverage, then supervisor independently checks that evidence without rewriting it. |
| F009-05 | R5 | No terminal manuscript-readiness judgment is yet warranted. | On terminal review assess readiness separately, disclose finite synthetic scope and agent-only review. No external literature search or publication is authorized. |

Required/planned evaluation cases: 12; researcher attempted/completed: 0 in the
available evidence; supervisor-targeted checked: 2. Smoke checked: 2, separately.
All original requirements remain visible. A negative answer to perfection does
not waive the explicit all-case comparison and reproducibility requirements.

## Why continue, and why change approach

Nine returns and a recorded three-return no-progress streak are historical facts,
not research budgets. No count-based stop, numbered extension or scope reduction
is authorized or needed. Local inputs are accessible; no job or denied resource is
recorded; no overall limit is reached. Useful authorized work is a small, finite,
previously omitted evaluation. Repeating smoke would be uninformative.

The revised approach is to require explicit evaluation-split coverage and its
artifact/ID accounting rather than another generic instruction to inspect the
benchmark. Detailed analysis remains the researcher's responsibility. Evidence
may reject either hypothesis; no preferred outcome is prescribed.

## Decision and next action

**Continue** with one numbered assignment:
[C010 assignment](../C010/assignment.md). No assignment was outstanding at intake;
this is now the sole outstanding assignment. Hand off to the configured Researcher
through normal team messaging, not external delegation. Delivery is tracked in
[C010 handoff](../C010/handoff.md).

Resource use: one local audit, exit 0, 0.024077 seconds measured elapsed, including
a 0.021740-second smoke replay; outer timeout 30 seconds and inner timeout 20
seconds. No paid/network/new-dependency use. Prior cycle usage is unrecorded, not
assumed zero. No async work remains from this review.

Manuscript readiness: **Not assessed at this nonterminal review**. R5 remains due
at terminal review; a small finite synthetic comparison does not itself establish
novelty, broader generalization or publishability. No drafting/publication requested.
