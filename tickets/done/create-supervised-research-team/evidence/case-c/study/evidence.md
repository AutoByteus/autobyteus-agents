# Evidence
E001 — Researcher (seeded fixture). Command: `python3 sources/evaluate.py`.
Result: 2/2 Candidate and 2/2 Baseline, split smoke; raw: runs/smoke.json.
Source: sources/cases.csv, synthetic static fixture. No evaluation output recorded yet.

S001 — Research Supervisor, 2026-10-28. Independent static review of C001.
Provenance: checks/C001/reviewed-inputs.sha256 fingerprints report and material
inputs before supervisor updates. Method: full artifact reading and manual source
rule tracing; details and actual observations: checks/C001/static-review.md.
Result: E001 covers only two smoke cases, tied at 2/2; the reproduction command
selects smoke by default. Evaluation n3 is a Candidate failure/Baseline success;
b2 is a shared failure. These refute perfect Candidate accuracy but do not certify
aggregate evaluation results. No evaluator execution or additional research batch;
full evaluation and manuscript novelty remain unverified. Review:
cycles/C001/review.md. Original E001 and all researcher artifacts are unchanged.
