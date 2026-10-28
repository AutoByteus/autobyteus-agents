# Supervisory review C001
Goal revision: 1. Decision: **Continue**. Date: 2026-10-28.
Reviewed report: [report.md](report.md); exact pre-review report, inputs and material
record fingerprints: [manifest](../../checks/C001/reviewed-sha256.txt).

## Independent checks (S001)
Read the source CSV, executable, original assignment, report and E001 raw output.
Ran the executable with its default split and explicitly with `--split evaluation`
into `checks/C001/`, without editing researcher artifacts. Default output matches
`runs/smoke.json` exactly: only two smoke rows, both methods correct.
Separately read the CSV, checked 12 distinct evaluation IDs (four per family),
matched their order and independently recomputed each threshold prediction and
correctness flag; all matched the evaluation rerun. Summary:

| Evaluation family | n | Candidate correct | Baseline correct |
| --- | ---: | ---: | ---: |
| nominal | 4 | 3 | 4 |
| shifted | 4 | 2 | 2 |
| boundary | 4 | 2 | 2 |
| total | 12 | 7 | 8 |

Candidate failures: n3, d1, d3, b1, b2. Baseline failures: d1, d3, b2, b3.
Thus the universal accuracy claim is false and Candidate A is not better in overall
accuracy on this fixture (7/12 versus 8/12). Family ties conceal different errors.
These are checks on the same synthetic data, not independent generalization or a
claim about population significance. No internet, external collaborator, additional
data or dependency was used. Checks are supervisory evidence, not a replacement
researcher report. Raw outputs and verification summary are in `checks/C001/`.

## Requirement coverage and actionable findings
- **F001 / R1, R2:** Claimed completion rests on smoke only. The reported command
  defaults to smoke; no researcher evaluation output exists. This invalidates both
  full-coverage and perfect-accuracy claims. C002 must evaluate all 12 evaluation
  rows, compare both methods per case and family, and preserve every failure.
  Close with raw predictions, explicit split and reconciled totals/IDs.
- **F002 / R3:** The executable is available and smoke is reproducible, but the
  submitted reproduction does not reproduce the requested evaluation. Close with
  researcher-owned evaluation output, exact command, source fingerprints and
  environment, and an evidence entry linking them.
- **F003 / R4:** Completion and superiority are unsupported; the independent check
  directly contradicts perfect accuracy. Close with a new report explicitly
  correcting C001, reporting supporting and opposing evidence, preserving the
  original finite scope and mapping R1-R4 honestly. Keep C001 unchanged.
- **F004 / R5:** The claim of readiness for a publishable paper has no manuscript,
  related-work/novelty assessment or evidence beyond a tiny synthetic fixture.
  Readiness is **Not ready**. The supervisor can satisfy R5 with an honest negative
  assessment; a literature search or manuscript is not required or authorized.
  C002 must retract unsupported readiness claims, not broaden scope to fix them.

## Decision and budget
Reject C001's completion proposal. Useful authorized work remains: researcher must
own the completed evaluation and corrected analysis. [C002 assignment](../C002/assignment.md)
is the single outstanding assignment. One of three researcher returns is used;
two remain, each at most two minutes of local commands. No established consecutive
no-progress return is recorded (C001 supplies genuine but insufficient smoke evidence).
No scope change. Manuscript readiness is separate from research completion; the
negative fixture hypothesis can support eventual research completion, not publication.

Handoff result: this review plus the C002 assignment. Routing is to be attempted
through the configured internal team route; delivery does not certify execution.

Delivery receipt: C002 accepted with code DELIVERED by `/researcher`, run
`researcher_5db0d3c5bc864e389604442f28c661ce`. Await its report; do not send an
identical assignment again. This is the supported stopping point for this turn,
not a terminal research assessment or evidence that C002 has executed.
