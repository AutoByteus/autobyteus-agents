"""Independent supervisor verification; never imports researcher analysis code.

Run from study root under a 30-second command timeout, into a new checks directory.
"""
import argparse
import csv
import hashlib
import json
import math
import platform
import re
import subprocess
import sys
import time
from collections import Counter
from datetime import datetime, timezone
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def read(name):
    return json.loads((ROOT / name).read_text())


def save(path, value):
    with path.open("x") as handle:
        json.dump(value, handle, indent=2)
        handle.write("\n")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    assert Path.cwd().resolve() == ROOT
    out = (ROOT / args.out).resolve()
    assert out.is_relative_to(ROOT / "checks")
    out.mkdir(parents=True, exist_ok=False)
    started, clock = datetime.now(timezone.utc).isoformat(), time.perf_counter()

    # Validate the actual sealed handoff before approving any of its claims.
    manifest = read("runs/C007/manifest.json")
    verified = {}
    for name, declared in manifest["artifacts"].items():
        path = (ROOT / name).resolve()
        assert path.is_relative_to(ROOT), name
        assert path.stat().st_size == declared["bytes"], name
        assert digest(path) == declared["sha256"], name
        verified[name] = declared
    extras = ["runs/C007/manifest.json", "study.md", "follow-ups.md",
              "cycles/C007/assignment.md", "cycles/C007/resumption-review.md",
              "cycles/C007/handoff.md", "cycles/C006/review.md",
              "checks/C006/check-results.json", "checks/C007/resumption-inputs.json"]
    for name in extras:
        path = ROOT / name
        verified[name] = {"sha256": digest(path), "bytes": path.stat().st_size}
    save(out / "review-inputs.json", {
        "checked_at_utc": started, "artifacts": verified,
        "researcher_manifest_entries_verified": len(manifest["artifacts"]),
        "verifier_sha256": digest(Path(__file__)),
        "python": sys.version, "platform": platform.platform(),
    })

    protected_counts = {}
    for label in ("primary", "replay"):
        protected = read(f"runs/C007/{label}/preservation-before.json")
        for name, before in protected.items():
            data = (ROOT / name).read_bytes()
            if name == "evidence.md":
                data = data[:before["bytes"]]
            assert len(data) == before["bytes"], name
            assert hashlib.sha256(data).hexdigest() == before["sha256"], name
        protected_counts[label] = len(protected)
        execution = read(f"runs/C007/{label}/execution.json")
        assert execution["evaluator_argv"] == ["python3", "-B", "sources/evaluate.py", "--split", "evaluation"]
        assert execution["evaluator_exit_code"] == 0 and execution["evaluator_timed_out"] is False
        assert execution["outer_timeout_seconds"] == execution["evaluator_timeout_seconds"] == 30
        assert execution["planned_unique_rows"] == execution["attempted_unique_rows"] == execution["completed_unique_rows"] == 12
        assert execution["evaluator_elapsed_seconds"] < 30
        for name, sha in execution["pinned_sha256"].items():
            assert digest(ROOT / name) == sha, name
        for name, sha in execution["output_sha256"].items():
            assert digest(ROOT / f"runs/C007/{label}" / name) == sha, name
        assert read(f"runs/C007/{label}-command.status.json")["exit_code"] == 0
    assert read("runs/C007/audit-command.status.json")["exit_code"] == 0
    replay_files = ["evaluation.stdout.json", "evaluation.stderr.txt", "comparison.json",
                    "per-case.csv", "failures.json", "validation.json"]
    for name in replay_files:
        assert (ROOT / "runs/C007/primary" / name).read_bytes() == (ROOT / "runs/C007/replay" / name).read_bytes(), name

    # Explicit full-split rerun in supervisor-owned storage.
    argv = ["python3", "-B", "sources/evaluate.py", "--split", "evaluation"]
    save(out / "run-start.json", {"started_utc": started, "cwd": str(ROOT),
         "outer_command": f"timeout 30s python3 -B checks/C007/verify-full.py --out {args.out}",
         "outer_timeout_seconds": 30, "evaluator_argv": argv,
         "evaluator_timeout_seconds": 30})
    run_clock = time.perf_counter()
    with (out / "evaluation.stdout.json").open("xb") as stdout, (out / "evaluation.stderr.txt").open("xb") as stderr:
        try:
            process = subprocess.run(argv, cwd=ROOT, stdout=stdout, stderr=stderr, timeout=30)
        except subprocess.TimeoutExpired:
            save(out / "execution.json", {"evaluator_timed_out": True,
                 "evaluator_elapsed_seconds": time.perf_counter() - run_clock,
                 "action": "subprocess.run killed and waited for evaluator child"})
            raise
    elapsed = time.perf_counter() - run_clock
    save(out / "execution.json", {"evaluator_timed_out": False,
         "evaluator_exit_code": process.returncode, "evaluator_elapsed_seconds": elapsed,
         "evaluator_stdout_sha256": digest(out / "evaluation.stdout.json"),
         "evaluator_ended_utc": datetime.now(timezone.utc).isoformat()})
    assert process.returncode == 0
    assert (out / "evaluation.stderr.txt").read_bytes() == b""
    assert (out / "evaluation.stdout.json").read_bytes() == (ROOT / "runs/C007/primary/evaluation.stdout.json").read_bytes()

    # Independent oracle and exact arithmetic from the only authorized CSV.
    with (ROOT / "sources/cases.csv").open(newline="") as handle:
        all_cases = list(csv.DictReader(handle))
    assert len(all_cases) == len({r["id"] for r in all_cases}) == 14
    cases = [r for r in all_cases if r["split"] == "evaluation"]
    smoke = [r["id"] for r in all_cases if r["split"] == "smoke"]
    ids = [r["id"] for r in cases]
    assert ids == [f"{p}{i}" for p in "ndb" for i in range(1, 5)]
    assert len(smoke) == 2 and not (set(smoke) & set(ids))
    assert Counter(r["family"] for r in cases) == {"nominal": 4, "shifted": 4, "boundary": 4}
    rows = []
    for source in cases:
        x, y = int(source["x"]), int(source["label"])
        assert y in (0, 1)
        a, b = int(x >= 5), int(x >= 4)
        rows.append({"id": source["id"], "family": source["family"], "x": x, "label": y,
                     "candidate": a, "baseline": b, "candidate_correct": a == y,
                     "baseline_correct": b == y})
    raw = json.loads((out / "evaluation.stdout.json").read_text())
    assert raw == {"split": "evaluation", "n": 12, "rows": rows,
                   "candidate_correct": sum(r["candidate_correct"] for r in rows),
                   "baseline_correct": sum(r["baseline_correct"] for r in rows)}
    assert all(type(r[k]) is bool for r in raw["rows"] for k in ("candidate_correct", "baseline_correct"))

    categories = ["both_wrong", "baseline_only", "candidate_only", "both_correct"]
    augmented = [dict(r, split="evaluation", paired_outcome=categories[2 * r["candidate_correct"] + r["baseline_correct"]]) for r in rows]
    with (ROOT / "runs/C007/primary/per-case.csv").open(newline="") as handle:
        stored_csv = list(csv.DictReader(handle))
    assert stored_csv == [{k: str(v) for k, v in r.items()} for r in augmented]
    assert read("runs/C007/primary/failures.json") == [r for r in augmented if r["paired_outcome"] != "both_correct"]
    comparison = read("runs/C007/primary/comparison.json")
    coverage = comparison["coverage"]
    assert coverage["planned"] == coverage["attempted"] == coverage["completed"] == 12
    assert coverage["excluded_evaluation_ids"] == []
    for field in ("planned_unique_ids", "attempted_unique_ids", "completed_unique_ids"):
        assert coverage[field] == ids
    scopes = {"overall": augmented}
    scopes.update({family: [r for r in augmented if r["family"] == family]
                   for family in sorted({r["family"] for r in augmented})})
    independent = {}
    for scope, selected in scopes.items():
        claimed = comparison["overall"] if scope == "overall" else comparison["families"][scope]
        n = len(selected)
        totals = [sum(r[f"{model}_correct"] for r in selected) for model in ("candidate", "baseline")]
        assert claimed["n"] == n
        for model, total in zip(("candidate", "baseline"), totals):
            item = claimed[model]
            correct = [r["id"] for r in selected if r[f"{model}_correct"]]
            failures = [r["id"] for r in selected if not r[f"{model}_correct"]]
            assert item["correct"] == total and item["total"] == n
            assert item["correct_over_total"] == f"{total}/{n}"
            assert Fraction(item["accuracy_exact"]) == Fraction(total, n)
            assert math.isclose(item["accuracy"], total / n, rel_tol=0, abs_tol=1e-15)
            assert item["correct_ids"] == correct and item["failure_ids"] == failures
        paired = {category: [r["id"] for r in selected if r["paired_outcome"] == category] for category in categories}
        for category, members in paired.items():
            assert claimed["paired"][category] == {"count": len(members), "ids": members}
        assert sum(map(len, paired.values())) == n
        delta = Fraction(totals[0] - totals[1], n)
        assert claimed["candidate_minus_baseline_correct"] == totals[0] - totals[1]
        assert Fraction(claimed["accuracy_difference_exact"]) == delta
        assert math.isclose(claimed["accuracy_difference"], float(delta), rel_tol=0, abs_tol=1e-15)
        assert math.isclose(claimed["difference_percentage_points"], float(100 * delta), rel_tol=0, abs_tol=1e-12)
        assert claimed["candidate_perfect"] is (totals[0] == n)
        assert claimed["candidate_strictly_better"] is (delta > 0)
        independent[scope] = {"n": n, "candidate_correct": totals[0], "baseline_correct": totals[1],
                              "difference_exact": str(delta), "paired_ids": paired,
                              "candidate_failure_ids": [r["id"] for r in selected if not r["candidate_correct"]],
                              "baseline_failure_ids": [r["id"] for r in selected if not r["baseline_correct"]]}

    n3 = next(r for r in rows if r["id"] == "n3")
    prior = read("checks/C006/check-results.json")["targeted_counterexample"]
    assert all(prior[k] == v for k, v in n3.items())
    # Explicitly retain cases adverse to an overbroad 'B wins everywhere' claim.
    assert independent["overall"]["paired_ids"]["candidate_only"] == ["b3"]
    assert independent["boundary"]["difference_exact"] == "0"
    assert independent["shifted"]["difference_exact"] == "0"
    report = ROOT / "cycles/C007/report.md"
    for target in re.findall(r"\]\(([^)]+)\)", report.read_text()):
        link = (report.parent / target.split("#")[0]).resolve()
        assert link.is_relative_to(ROOT) and link.exists(), target
    # No review check may change the researcher's handoff or protected controls.
    for name, before in verified.items():
        assert digest(ROOT / name) == before["sha256"], name

    result = {"status": "all independent assertions passed", "scopes": independent,
              "per_case_independently_recomputed": augmented,
              "raw_rerun_byte_identical_to_researcher": True,
              "primary_replay_files_verified_identical": replay_files,
              "researcher_manifest_entries_verified": len(manifest["artifacts"]),
              "researcher_preservation_records_verified": protected_counts,
              "S003_n3_confirmed": True,
              "case_coverage": {"planned": 12, "researcher_attempted": 12,
                                "researcher_completed": 12, "supervisor_independently_checked": 12,
                                "distinct_cases": 12, "excluded_evaluation_cases": 0},
              "evaluator_elapsed_seconds": elapsed, "review_script_elapsed_seconds": time.perf_counter() - clock,
              "limits": ["Independent agent and arithmetic, not independent data or external peer review.",
                         "Exact finite supplied-label census; no unseen-data inference or significance test.",
                         "History/provenance checked for preservation, not retroactively validated progress/runtime.",
                         "No literature, novelty, manuscript or publication assessment is supplied by this script."]}
    save(out / "verification.json", result)
    print(json.dumps({"status": result["status"], "overall": independent["overall"],
                      "researcher_manifest_entries_verified": result["researcher_manifest_entries_verified"],
                      "preservation_records": protected_counts,
                      "report_sha256": digest(report), "evaluator_elapsed_seconds": elapsed,
                      "review_script_elapsed_seconds": result["review_script_elapsed_seconds"]}, indent=2))


if __name__ == "__main__":
    main()
