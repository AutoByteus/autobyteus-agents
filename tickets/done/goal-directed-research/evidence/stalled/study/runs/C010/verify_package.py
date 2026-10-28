"""Post-write artifact validation only; no additional evaluator invocation."""
from datetime import datetime, timezone
from fractions import Fraction
import hashlib
import json
from pathlib import Path
import re
import sys
import time

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "runs/C010/package-check.json"


def fingerprint(path):
    data = path.read_bytes()
    return {"sha256": hashlib.sha256(data).hexdigest(), "bytes": len(data)}


def read_json(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))


def main():
    start = time.perf_counter()
    result = {"author": "Researcher", "cycle": "C010", "goal": "G1",
              "started_utc": datetime.now(timezone.utc).isoformat(),
              "command": "PYTHONDONTWRITEBYTECODE=1 timeout 30s python3 -B runs/C010/verify_package.py",
              "python_version": sys.version, "cwd": str(ROOT), "timeout_seconds": 30,
              "additional_evaluator_invocations": 0, "checks": {}, "issues": []}

    def check(name, condition):
        result["checks"][name] = bool(condition)
        if not condition:
            result["issues"].append(name)

    manifest = read_json("runs/C010/full-01/input-manifest.json")
    outputs = read_json("runs/C010/full-01/output-manifest.json")
    for name, entries in (("material", manifest["material"]),
                          ("protected_prior", manifest["protected_before"]),
                          ("recorded_run_outputs", outputs)):
        differences = [p for p, expected in entries.items()
                       if not (ROOT / p).is_file() or fingerprint(ROOT / p) != expected]
        result[name + "_file_count"] = len(entries)
        result[name + "_differences"] = differences
        check(name + "_hashes_unchanged", not differences)
    evidence = (ROOT / "evidence.md").read_bytes()
    old_ledger = manifest["evidence_ledger_at_start"]
    check("evidence_append_only_since_run_start",
          hashlib.sha256(evidence[:old_ledger["bytes"]]).hexdigest() == old_ledger["sha256"])

    report_path = ROOT / "cycles/C010/report.md"
    report = report_path.read_text(encoding="utf-8")
    check("report_requests_review", "**Status: Review requested**" in report)
    missing_links = []
    for target in re.findall(r"\[[^\]]*\]\(([^)]+)\)", report):
        destination = (report_path.parent / target.split("#")[0]).resolve()
        if not destination.is_relative_to(ROOT) or not destination.is_file():
            missing_links.append(target)
    result["missing_or_nonlocal_report_links"] = missing_links
    check("all_report_links_exist_in_study", not missing_links)

    raw = read_json("runs/C010/full-01/evaluation.stdout.json")
    summary = read_json("runs/C010/full-01/analysis/summary.json")["groups"]
    by_id = {r["id"]: r for r in raw["rows"]}
    case_count = group_count = failure_count = 0
    for line in report.splitlines():
        if not line.startswith("| "):
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if cells[0] in by_id:
            r = by_id[cells[0]]
            a, b = r["candidate_correct"], r["baseline_correct"]
            outcome = "Both correct" if a and b else "Both wrong" if not a and not b else "A win" if a else "B win"
            expected = [r["id"], r["family"], str(r["x"]), str(r["label"]),
                        str(r["candidate"]), str(r["baseline"]), str(int(a)), str(int(b)), outcome]
            check("report_case_" + r["id"], cells == expected)
            case_count += 1
        name = cells[0].lower()
        if name in summary and len(cells) == 7:
            g, paired = summary[name], summary[name]["paired"]
            expected = [name, f"{g['candidate']['correct']}/{g['total']}",
                        f"{g['baseline']['correct']}/{g['total']}",
                        str(Fraction(g["candidate_minus_baseline_correct"], g["total"])),
                        str(paired["candidate_win_count"]), str(paired["baseline_win_count"]), str(paired["tie_count"])]
            actual = [name, cells[1].split()[0], cells[2].split()[0], *cells[3:]]
            check("report_group_" + name, actual == expected)
            group_count += 1
        if name in summary and len(cells) == 5:
            g, paired = summary[name], summary[name]["paired"]
            expected = [g["candidate"]["failure_ids"], g["baseline"]["failure_ids"],
                        paired["both_correct_ids"], paired["both_wrong_ids"]]
            actual = [[] if c == "None" else c.split(",") for c in cells[1:]]
            check("report_failures_and_ties_" + name, actual == expected)
            failure_count += 1
    check("report_has_exactly_12_case_rows", case_count == 12)
    check("report_has_all_four_group_rows", group_count == 4)
    check("report_has_all_four_failure_and_tie_rows", failure_count == 4)
    execution = read_json("runs/C010/full-01/execution.json")
    check("all_recorded_processes_exited_zero", execution["exit_code"] == 0 and
          len(execution["commands"]) == 2 and all(c["exit_code"] == 0 for c in execution["commands"]))
    check("all_experimental_stderr_empty", all((ROOT / c["stderr"]).stat().st_size == 0 for c in execution["commands"]))
    result["checked_fingerprints"] = {
        p: fingerprint(ROOT / p) for p in ("cycles/C010/report.md", "evidence.md",
        "runs/C010/verify_package.py", "runs/C010/full-01/input-manifest.json",
        "runs/C010/full-01/output-manifest.json")}
    result["elapsed_seconds"] = time.perf_counter() - start
    result["finished_utc"] = datetime.now(timezone.utc).isoformat()
    result["exit_code"] = 0 if not result["issues"] else 1
    with OUT.open("x", encoding="utf-8") as handle:
        json.dump(result, handle, indent=2)
        handle.write("\n")
    print(json.dumps(result, indent=2))
    return result["exit_code"]


if __name__ == "__main__":
    sys.exit(main())
