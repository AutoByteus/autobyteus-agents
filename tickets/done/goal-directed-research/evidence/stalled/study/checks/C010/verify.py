"""Independent supervisory verification; never imports researcher analysis code."""
import argparse
import csv
from collections import Counter
from datetime import datetime, timezone
from fractions import Fraction
import hashlib
import json
from pathlib import Path
import platform
import re
import subprocess
import sys
import time

ROOT = Path(__file__).resolve().parents[2]


def digest(path):
    data = path.read_bytes()
    return {"sha256": hashlib.sha256(data).hexdigest(), "bytes": len(data)}


def local(name):
    path = (ROOT / name).resolve()
    assert path.is_relative_to(ROOT), name
    return path


def read_json(name):
    return json.loads(local(name).read_text())


def main():
    start = time.perf_counter()
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    out = local(args.out)
    assert out.is_relative_to(ROOT / "checks/C010")
    out.mkdir(parents=True, exist_ok=False)

    def save(name, value):
        with (out / name).open("x") as handle:
            json.dump(value, handle, indent=2)
            handle.write("\n")

    checks = []

    def require(name, condition):
        checks.append({"name": name, "passed": bool(condition)})
        assert condition, name

    paths = [ROOT / "study.md", ROOT / "evidence.md"]
    paths += sorted((ROOT / "cycles").glob("C*/*.md"))
    for directory in ("sources", "runs", "checks/C009"):
        paths += sorted(p for p in (ROOT / directory).rglob("*") if p.is_file())
    paths += [Path(__file__).resolve()]
    before = {str(p.relative_to(ROOT)): digest(p) for p in paths}
    save("input-manifest.json", before)
    for name in ("study.md", "evidence.md"):
        with (out / ("intake-" + name)).open("xb") as handle:
            handle.write((ROOT / name).read_bytes())
    report_path = ROOT / "cycles/C010/report.md"
    expected_report_hash = "e256c51707b746bb0ab850556c3361cdd71454af6b884de6b380b9f19256261f"
    require("incoming_report_version_matches", digest(report_path)["sha256"] == expected_report_hash)
    report = report_path.read_text()

    # Validate historical provenance rather than accepting researcher check flags.
    run_inputs = read_json("runs/C010/full-01/input-manifest.json")
    manifests = {
        "researcher_material": run_inputs["material"],
        "protected_prior": run_inputs["protected_before"],
        "run_outputs": read_json("runs/C010/full-01/output-manifest.json"),
    }
    for label, entries in manifests.items():
        require(label + "_hashes_match", all(digest(local(p)) == value for p, value in entries.items()))
    original = read_json("checks/C009/input-manifest.json")
    require("original_sources_smoke_and_cycles_preserved", all(
        digest(local(p)) == value for p, value in original.items() if p not in ("study.md", "evidence.md")))
    ledger = (ROOT / "evidence.md").read_bytes()
    for label, old in (
        ("run_start", run_inputs["evidence_ledger_at_start"]),
        ("package_check", read_json("runs/C010/package-check.json")["checked_fingerprints"]["evidence.md"]),
    ):
        require("evidence_append_only_since_" + label,
                hashlib.sha256(ledger[:old["bytes"]]).hexdigest() == old["sha256"])
    for target in re.findall(r"\[[^\]]*\]\(([^)]+)\)", report):
        path = (report_path.parent / target.split("#")[0]).resolve()
        require("report_link:" + target, path.is_relative_to(ROOT) and path.is_file())

    with (ROOT / "sources/cases.csv").open(newline="") as handle:
        source = list(csv.DictReader(handle))
    require("source_unique_ids", len(source) == len({r["id"] for r in source}))
    selected = [r for r in source if r["split"] == "evaluation"]
    expected_ids = [prefix + str(i) for prefix in ("n", "d", "b") for i in range(1, 5)]
    require("all_required_ids_and_no_smoke", [r["id"] for r in selected] == expected_ids)
    require("four_cases_per_family", Counter(r["family"] for r in selected) ==
            {"nominal": 4, "shifted": 4, "boundary": 4})

    # Direct source computation, using a separate implementation from analyze.py.
    independent = []
    for r in selected:
        x, label = int(r["x"]), int(r["label"])
        a, b = (0 if x < 5 else 1), (0 if x < 4 else 1)
        independent.append({"id": r["id"], "family": r["family"], "x": x,
                            "label": label, "candidate": a, "baseline": b,
                            "candidate_correct": a == label, "baseline_correct": b == label})
    save("independent-predictions.json", independent)
    raw_path = "runs/C010/full-01/evaluation.stdout.json"
    raw = read_json(raw_path)
    require("raw_schema", set(raw) == {"split", "n", "candidate_correct", "baseline_correct", "rows"})
    require("raw_evaluation_denominator", raw["split"] == "evaluation" and type(raw["n"]) is int and raw["n"] == 12)
    require("all_raw_rows_match_direct_source_calculation", raw["rows"] == independent)
    require("all_raw_field_types", all(type(r[k]) is type(e[k]) for r, e in zip(raw["rows"], independent) for k in e))

    command = ["timeout", "30s", sys.executable, "-B", "sources/evaluate.py", "--split", "evaluation"]
    replay_start = time.perf_counter()
    with (out / "replay.stdout.json").open("xb") as stdout, (out / "replay.stderr.txt").open("xb") as stderr:
        replay = subprocess.run(command, cwd=ROOT, stdout=stdout, stderr=stderr, timeout=25)
    replay_seconds = time.perf_counter() - replay_start
    require("replay_exit_zero", replay.returncode == 0)
    require("replay_stderr_empty", (out / "replay.stderr.txt").stat().st_size == 0)
    require("replay_byte_exact_to_researcher_raw", (out / "replay.stdout.json").read_bytes() == local(raw_path).read_bytes())

    research_groups = read_json("runs/C010/full-01/analysis/summary.json")["groups"]
    require("group_inventory", set(research_groups) == {"nominal", "shifted", "boundary", "overall"})
    independently_counted = {}
    for group in ("nominal", "shifted", "boundary", "overall"):
        rows = [r for r in independent if group == "overall" or r["family"] == group]
        by_correctness = Counter((r["candidate_correct"], r["baseline_correct"]) for r in rows)
        both_ok, both_bad = by_correctness[(True, True)], by_correctness[(False, False)]
        a_only, b_only = by_correctness[(True, False)], by_correctness[(False, True)]
        n, a, b = len(rows), both_ok + a_only, both_ok + b_only
        delta = Fraction(a - b, n)
        g = research_groups[group]
        require(group + "_counts_and_cases", g["total"] == n and g["case_ids"] == [r["id"] for r in rows])
        require(group + "_delta", g["candidate_minus_baseline_correct"] == a - b and
                g["accuracy_difference_exact"] == str(delta) and g["accuracy_difference_decimal"] == float(delta))
        require(group + "_decision_flags", g["candidate_perfect"] == (a == n) and g["candidate_strictly_better"] == (a > b))
        failures = {}
        for method, correct in (("candidate", a), ("baseline", b)):
            failures[method] = [r["id"] for r in rows if not r[method + "_correct"]]
            expected = {"correct": correct, "total": n, "accuracy_exact": str(Fraction(correct, n)),
                        "accuracy_decimal": correct / n, "failure_ids": failures[method]}
            require(group + "_" + method + "_all_metrics", g[method] == expected)
        paired = {}
        for key, pair in (("candidate_win", (True, False)), ("baseline_win", (False, True)),
                          ("both_correct", (True, True)), ("both_wrong", (False, False))):
            ids = [r["id"] for r in rows if (r["candidate_correct"], r["baseline_correct"]) == pair]
            paired[key + "_ids"], paired[key + "_count"] = ids, len(ids)
        paired["tie_count"] = both_ok + both_bad
        require(group + "_all_paired_metrics", g["paired"] == paired)
        require(group + "_paired_marginal_identity", a_only - b_only == a - b)
        independently_counted[group] = {"total": n, "candidate_correct": a, "baseline_correct": b,
                                      "difference_exact": str(delta), "failures": failures, "paired": paired}
    save("independent-comparison.json", independently_counted)
    overall = independently_counted["overall"]
    require("raw_header_totals_match", all(type(raw[m + "_correct"]) is int and
            raw[m + "_correct"] == overall[m + "_correct"] for m in ("candidate", "baseline")))

    with local("runs/C010/full-01/analysis/per-case.csv").open(newline="") as handle:
        per_case = list(csv.DictReader(handle))
    require("per_case_csv_count", len(per_case) == 12)
    outcomes = {(True, True): ("both_correct", "Both correct"), (False, False): ("both_wrong", "Both wrong"),
                (True, False): ("candidate_win", "A win"), (False, True): ("baseline_win", "B win")}
    for row, saved in zip(independent, per_case):
        pair = row["candidate_correct"], row["baseline_correct"]
        expected = {k: str(v) for k, v in row.items()}
        expected.update(paired_outcome=outcomes[pair][0], candidate_minus_baseline_correct=str(int(pair[0]) - int(pair[1])))
        require("per_case_csv:" + row["id"], saved == expected)
        cells = [row["id"], row["family"], str(row["x"]), str(row["label"]), str(row["candidate"]),
                 str(row["baseline"]), str(int(pair[0])), str(int(pair[1])), outcomes[pair][1]]
        require("report_case:" + row["id"], report.count("| " + " | ".join(cells) + " |") == 1)
    report_tables = [[c.strip() for c in line.strip("|").split("|")] for line in report.splitlines() if line.startswith("| ")]
    for group, values in independently_counted.items():
        group_rows = [row for row in report_tables if len(row) == 7 and row[0].lower() == group]
        require("report_single_summary_row:" + group, len(group_rows) == 1)
        row = group_rows[0]
        expected = [group, str(values["candidate_correct"]) + "/" + str(values["total"]),
                    str(values["baseline_correct"]) + "/" + str(values["total"]), values["difference_exact"],
                    str(values["paired"]["candidate_win_count"]), str(values["paired"]["baseline_win_count"]), str(values["paired"]["tie_count"])]
        require("report_summary:" + group, [row[0].lower(), row[1].split()[0], row[2].split()[0], *row[3:]] == expected)
        failure_rows = [row for row in report_tables if len(row) == 5 and row[0].lower() == group]
        require("report_single_failure_row:" + group, len(failure_rows) == 1)
        parsed = [[] if field == "None" else field.split(",") for field in failure_rows[0][1:]]
        require("report_failures:" + group, parsed == [values["failures"]["candidate"], values["failures"]["baseline"],
                values["paired"]["both_correct_ids"], values["paired"]["both_wrong_ids"]])

    # Adversarial interpretation checks: opposite-direction wins and shared failures.
    require("candidate_advantage_not_suppressed", overall["paired"]["candidate_win_ids"] == ["b3"])
    require("baseline_advantages_retained", overall["paired"]["baseline_win_ids"] == ["n3", "b1"])
    require("shared_failures_retained", overall["paired"]["both_wrong_ids"] == ["d1", "d3", "b2"])
    require("no_coverage_multiplication", len(independent) == len({r["id"] for r in independent}) == 12)
    for witness in read_json("checks/C009/audit.json")["targeted_evaluation_witnesses"]:
        require("prior_witness:" + witness["id"], witness in independent)
    execution = read_json("runs/C010/full-01/execution.json")
    require("recorded_execution_success", execution["exit_code"] == 0 and len(execution["commands"]) == 2)
    require("recorded_children_timeout_and_exit", all(c["argv"][:2] == ["timeout", "30s"] and
            c["exit_code"] == 0 and local(c["stderr"]).stat().st_size == 0 for c in execution["commands"]))
    require("all_reviewed_inputs_unchanged_during_check", all(digest(local(p)) == value for p, value in before.items()))

    result = {
        "author": "Research Supervisor", "goal": "G1", "cycle": "C010", "status": "all checks passed",
        "finished_utc": datetime.now(timezone.utc).isoformat(),
        "command": "PYTHONDONTWRITEBYTECODE=1 timeout 30s python3 -B checks/C010/verify.py --out " + args.out,
        "outer_timeout_seconds": 30, "python": sys.version, "platform": platform.platform(),
        "report_sha256": expected_report_hash, "input_manifest_file_count": len(before),
        "verified_researcher_manifest_counts": {key: len(value) for key, value in manifests.items()},
        "replay_command": command, "replay_subprocess_timeout_seconds": 25,
        "replay_exit_code": replay.returncode, "replay_elapsed_seconds": replay_seconds,
        "elapsed_seconds": time.perf_counter() - start,
        "required_cases": 12, "researcher_cases_completed": 12, "supervisor_cases_checked": 12,
        "predictions_checked": 24, "smoke_cases_in_denominator": 0, "exclusions": [],
        "comparison": independently_counted, "checks": checks,
        "limitations": ["Same fixed synthetic data, not independent generalization evidence.",
                       "Source labels accepted as given; not externally validated.",
                       "Source-visible deterministic check, not blinded testing or population inference.",
                       "No claim of novelty, publication readiness or external human peer review.",
                       "Recorded prior execution times checked as artifacts, not independently timed retroactively."],
    }
    save("audit.json", result)
    save("output-manifest.json", {str(p.relative_to(ROOT)): digest(p) for p in sorted(out.iterdir()) if p.is_file()})
    print(json.dumps({k: result[k] for k in ("status", "report_sha256", "input_manifest_file_count", "verified_researcher_manifest_counts",
                                            "replay_exit_code", "replay_elapsed_seconds", "elapsed_seconds", "supervisor_cases_checked", "predictions_checked")}))
    print(json.dumps({"check_count": len(checks), "comparison": independently_counted}, indent=2))


if __name__ == "__main__":
    main()
