"""Supervisor intake audit; not a replacement for the researcher's full evaluation."""
import csv
import hashlib
import json
import platform
import subprocess
import sys
import time
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

started = time.perf_counter()
study = Path(__file__).resolve().parents[2]
out = Path(__file__).resolve().parent
paths = [study / "study.md", study / "evidence.md"]
paths += sorted((study / "cycles").glob("C*/*.md"))
paths += sorted((study / "sources").glob("*"))
paths += sorted((study / "runs").glob("*"))
manifest = {
    str(p.relative_to(study)): {
        "sha256": hashlib.sha256(p.read_bytes()).hexdigest(),
        "bytes": p.stat().st_size,
    }
    for p in paths if p.is_file()
}
with (out / "input-manifest.json").open("x") as f:
    json.dump(manifest, f, indent=2)
for name in ("study.md", "evidence.md"):
    with (out / ("intake-" + name)).open("xb") as f:
        f.write((study / name).read_bytes())

with (study / "sources/cases.csv").open(newline="") as f:
    source = list(csv.DictReader(f))
assert len(source) == len({r["id"] for r in source}), "Duplicate IDs"
assert set(r["split"] for r in source) == {"smoke", "evaluation"}
evaluation = [r for r in source if r["split"] == "evaluation"]
smoke = [r for r in source if r["split"] == "smoke"]
assert len(evaluation) == 12 and len(smoke) == 2
families = dict(sorted(Counter(r["family"] for r in evaluation).items()))
assert families == {"boundary": 4, "nominal": 4, "shifted": 4}

def expected_row(r):
    x, y = int(r["x"]), int(r["label"])
    # Independent simple threshold implementation, not imported evaluator code.
    candidate = 0 if x < 5 else 1
    baseline = 0 if x < 4 else 1
    return {
        "id": r["id"], "family": r["family"], "x": x, "label": y,
        "candidate": candidate, "baseline": baseline,
        "candidate_correct": candidate == y, "baseline_correct": baseline == y,
    }

historical = json.loads((study / "runs/smoke.json").read_text())
expected_smoke = [expected_row(r) for r in smoke]
assert historical == {
    "split": "smoke", "n": 2, "candidate_correct": 2,
    "baseline_correct": 2, "rows": expected_smoke,
}
command = [sys.executable, "sources/evaluate.py"]
run_started = time.perf_counter()
replay = subprocess.run(command, cwd=study, capture_output=True, text=True, timeout=20)
replay_seconds = time.perf_counter() - run_started
with (out / "default-replay.stdout.json").open("x") as f:
    f.write(replay.stdout)
with (out / "default-replay.stderr.txt").open("x") as f:
    f.write(replay.stderr)
assert replay.returncode == 0, replay.stderr
assert json.loads(replay.stdout) == historical

# Targeted falsification only: the researcher still owns exhaustive measurement.
by_id = {r["id"]: r for r in evaluation}
witnesses = [expected_row(by_id[name]) for name in ("n3", "b3")]
assert witnesses[0]["candidate_correct"] is False
assert witnesses[1]["baseline_correct"] is False

result = {
    "author": "Research Supervisor",
    "checked_at_utc": datetime.now(timezone.utc).isoformat(),
    "python": platform.python_version(),
    "intake_manifest": "checks/C009/input-manifest.json",
    "dataset_rows": len(source),
    "evaluation_rows": len(evaluation),
    "evaluation_family_counts": families,
    "evaluation_ids": [r["id"] for r in evaluation],
    "historical_smoke_matches_independent_calculation": True,
    "default_replay_matches_historical_smoke": True,
    "replay_command": "python3 sources/evaluate.py",
    "replay_exit_code": replay.returncode,
    "replay_elapsed_seconds": replay_seconds,
    "targeted_evaluation_witnesses": witnesses,
    "researcher_evaluation_rows_measured": 0,
    "supervisor_targeted_evaluation_cases_checked": 2,
    "elapsed_seconds": time.perf_counter() - started,
    "limitations": [
        "Source inventory is not an exhaustive evaluation result.",
        "Only two evaluation cases were checked for falsification, not aggregate superiority.",
        "Same-input replay checks reproducibility, not independent generalization.",
        "No network, external sources, dependencies or other repositories used.",
        "No researcher artifacts modified; full evaluation remains assigned work.",
    ],
}
with (out / "audit.json").open("x") as f:
    json.dump(result, f, indent=2)
print(json.dumps(result, indent=2))
