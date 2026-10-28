"""Supervisor checks only: reproduce smoke, inventory evaluation, trace one case.

This does not perform the researcher's missing full evaluation or family analysis.
Run from this study with: timeout 30s python3 -B checks/C006/verify.py
"""
import csv
import hashlib
import json
import platform
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

root = Path(__file__).resolve().parents[2]
out = Path(__file__).resolve().parent
inputs = [root / "study.md", root / "evidence.md"]
inputs += sorted((root / "cycles").glob("C*/assignment.md"))
inputs += sorted((root / "cycles").glob("C*/report.md"))
inputs += sorted((root / "cycles").glob("C*/review.md"))
inputs += [root / "sources/cases.csv", root / "sources/evaluate.py",
           root / "runs/smoke.json"]
fingerprints = {
    str(p.relative_to(root)): hashlib.sha256(p.read_bytes()).hexdigest()
    for p in inputs
}
(out / "review-inputs.json").write_text(json.dumps({
    "checked_at_utc": datetime.now(timezone.utc).isoformat(),
    "sha256": fingerprints,
    "check_script_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
    "python": sys.version,
    "platform": platform.platform(),
}, indent=2) + "\n")

with (root / "sources/cases.csv").open(newline="") as handle:
    rows = list(csv.DictReader(handle))
assert len({r["id"] for r in rows}) == len(rows), "Non-unique case IDs"
assert all(r["split"] in {"smoke", "evaluation"} for r in rows)
assert all(r["label"] in {"0", "1"} for r in rows)
evaluation = [r for r in rows if r["split"] == "evaluation"]
smoke = [r for r in rows if r["split"] == "smoke"]
families = dict(sorted(Counter(r["family"] for r in evaluation).items()))
assert len(evaluation) == 12
assert families == {"boundary": 4, "nominal": 4, "shifted": 4}
assert len(smoke) == 2
assert not ({r["id"] for r in smoke} & {r["id"] for r in evaluation})

saved = json.loads((root / "runs/smoke.json").read_text())
rerun = json.loads((out / "smoke-rerun.json").read_text())
assert saved == rerun, "Smoke rerun differs from historical artifact"
assert rerun["split"] == "smoke" and rerun["n"] == 2
assert rerun["candidate_correct"] == rerun["baseline_correct"] == 2
assert {r["id"] for r in rerun["rows"]} == {r["id"] for r in smoke}
assert all(r["candidate_correct"] and r["baseline_correct"] for r in rerun["rows"])

# Source-traced counterexample, independently expressed for these integer inputs.
# evaluate.py line 7 defines Candidate A as x>=5 and Baseline B as x>=4.
case = next(r for r in evaluation if r["id"] == "n3")
x, label = int(case["x"]), int(case["label"])
candidate = 1 if x > 4 else 0
baseline = 1 if x > 3 else 0
assert (x, label, candidate, baseline) == (4, 1, 0, 1)
assert candidate != label and baseline == label

print(json.dumps({
    "status": "all assertions passed",
    "smoke_rerun": {
        "semantic_match_to_saved": True,
        "n": 2,
        "candidate_correct": 2,
        "baseline_correct": 2,
    },
    "inventory": {
        "total_source_rows": len(rows),
        "evaluation_rows": len(evaluation),
        "evaluation_ids": [r["id"] for r in evaluation],
        "evaluation_rows_by_family": families,
        "unique_ids": True,
        "smoke_evaluation_id_overlap": [],
    },
    "targeted_counterexample": {
        "id": case["id"], "family": case["family"], "x": x, "label": label,
        "candidate": candidate, "baseline": baseline,
        "candidate_correct": False, "baseline_correct": True,
        "method": "Trace supplied evaluate.py line 7; independent integer threshold calculation",
    },
    "researcher_raw_files_found": [str(p.relative_to(root)) for p in sorted((root / "runs").rglob("*")) if p.is_file()],
    "coverage": {
        "evaluation_rows_required": 12,
        "researcher_evaluation_rows_with_saved_predictions": 0,
        "supervisor_evaluation_rows_spot_checked": 1,
        "full_evaluation_rerun": False,
    },
    "limits": [
        "Smoke reproducibility is not full evaluation or generalization.",
        "The n3 counterexample disproves perfection only on the supplied benchmark.",
        "One case does not establish aggregate or per-family relative accuracy.",
        "No researcher experiment, missing per-family analysis, or independent dataset was created.",
    ],
}, indent=2))
