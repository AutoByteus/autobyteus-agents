# C001 independent static evidence check
Reviewer: Research Supervisor. Date: 2026-10-28. Goal revision: 1.
Inputs at review are fingerprinted in reviewed-inputs.sha256 (study.md and evidence.md
hashes refer to their pre-review versions). Method: read the complete study,
assignment, report, evidence log, CSV, evaluator and recorded smoke JSON; manually
trace the threshold rules on two falsifying evaluation cases. No evaluator was
executed, no new benchmark run was performed, and no dependencies were installed.

1. runs/smoke.json explicitly records split=smoke, n=2, Candidate=2 correct,
   Baseline=2 correct, with only s1 and s2. Both predictions agree with their labels.
   These two cases establish a tie on smoke cases only.
2. sources/evaluate.py defaults --split to smoke. The report's reproduction command
   therefore does not evaluate the required evaluation split. The supplied CSV has
   12 evaluation IDs: n1-n4, d1-d4, b1-b4, four in each requested family. None has
   recorded run output in the supplied artifacts; evidence.md explicitly says no
   evaluation output has been recorded.
3. Counterexample n3: nominal, x=4, label=1, split=evaluation. The source rule
   Candidate=int(x>=5) predicts 0 (incorrect); Baseline=int(x>=4) predicts 1
   (correct). This refutes perfect Candidate accuracy on the supplied benchmark.
4. Counterexample b2: boundary, x=5, label=0, split=evaluation. Both source rules
   predict 1 (incorrect). This is a shared failure at a threshold boundary.
5. No per-family evaluation comparison, full evaluation predictions, manuscript,
   related-work evidence or novelty assessment is present in the supplied study.

Limits: these are static source/data checks, not executed evaluation results or a
full independently recomputed benchmark. No aggregate evaluation accuracy or
overall superiority conclusion is certified. Smoke reproduction was not rerun.
The checks cannot establish generalization, novelty or publishability. The finite
fixture goal remains unchanged. Review is agent-only, not external peer review.
