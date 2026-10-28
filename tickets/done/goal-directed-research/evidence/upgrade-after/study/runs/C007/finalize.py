"""Self-audit deterministic replay/preservation, then seal the written handoff."""
import argparse
import hashlib
import json
import re
import time
from datetime import datetime, timezone
from pathlib import Path

from analyze import ROOT, EXPECTED, sha, write_json

RUN = ROOT / "runs/C007"


def preserved(snapshot):
    result = {}
    for name, old in snapshot.items():
        current = (ROOT / name).read_bytes()
        # Only the ledger may grow, and its old byte prefix must stay exact.
        data = current[:old["bytes"]] if name == "evidence.md" else current
        ok = hashlib.sha256(data).hexdigest() == old["sha256"]
        if name != "evidence.md":
            ok = ok and len(current) == old["bytes"]
        assert ok, f"Protected artifact changed: {name}"
        result[name] = {"unchanged" if name != "evidence.md" else "old_prefix_unchanged": True,
                        "old_bytes": old["bytes"], "current_bytes": len(current)}
    return result


def audit():
    clock = time.perf_counter()
    started = datetime.now(timezone.utc).isoformat()
    primary, replay = RUN / "primary", RUN / "replay"
    a, b = [json.loads((p / "execution.json").read_text()) for p in (primary, replay)]
    assert a["pinned_sha256"] == b["pinned_sha256"]
    preservation = {}
    for label, directory, metadata in (("primary", primary, a), ("replay", replay, b)):
        assert metadata["evaluator_exit_code"] == 0 and not metadata["evaluator_timed_out"]
        assert metadata["status"] == "evaluation and researcher self-check passed"
        assert metadata["completed_unique_rows"] == metadata["attempted_unique_rows"] == 12
        assert metadata["pinned_inputs_unchanged"]
        for name, digest in metadata["pinned_sha256"].items():
            assert sha(ROOT / name) == digest
        for name, digest in metadata["output_sha256"].items():
            assert sha(directory / name) == digest
        status = json.loads((RUN / f"{label}-command.status.json").read_text())
        assert status["exit_code"] == 0
        assert (RUN / f"{label}-command.stderr.txt").read_bytes() == b""
        assert (directory / "evaluation.stderr.txt").read_bytes() == b""
        snapshot = json.loads((directory / "preservation-before.json").read_text())
        preservation[label] = preserved(snapshot)
    files = ("evaluation.stdout.json", "evaluation.stderr.txt", "per-case.csv",
             "failures.json", "comparison.json", "validation.json")
    matching = {}
    for name in files:
        assert (primary / name).read_bytes() == (replay / name).read_bytes(), name
        matching[name] = {"byte_identical": True, "sha256": sha(primary / name)}
    raw = json.loads((primary / "evaluation.stdout.json").read_text())
    n3 = next(row for row in raw["rows"] if row["id"] == "n3")
    prior = json.loads((ROOT / "checks/C006/check-results.json").read_text())["targeted_counterexample"]
    assert all(prior[k] == v for k, v in n3.items()), "S003 disagrees with full output"
    result = {"status": "all self-audit assertions passed", "started_utc": started,
              "command": "timeout 30s python3 -B runs/C007/finalize.py", "cwd": str(ROOT),
              "timeout_seconds": 30, "replay_matches": matching,
              "same_pinned_sources_code_and_method": True,
              "saved_output_hashes_verified": True, "preservation": preservation,
              "S003_raw_reference": "checks/C006/check-results.json",
              "S003_raw_sha256": sha(ROOT / "checks/C006/check-results.json"),
              "S003_fields_all_agree": True, "n3_full_evaluation_row": n3,
              "unique_case_coverage": {"planned": 12, "attempted": 12, "completed": 12,
                                       "ids": EXPECTED, "researcher_self_checked": 12,
                                       "historical_supervisor_spot_checked": 1,
                                       "full_result_supervisor_review": "pending"},
              "executions": {"primary_evaluation": 1, "same_input_replay": 1,
                             "evaluator_row_executions": 24, "distinct_evaluation_rows": 12},
              "limits": ["Same-input researcher reproduction is not independent review or new data.",
                         "Historical return claims/runtime remain unaudited; six returns preserved."],
              "ended_utc": datetime.now(timezone.utc).isoformat(),
              "elapsed_seconds": time.perf_counter() - clock}
    write_json(RUN / "audit.json", result)
    print(json.dumps({"status": result["status"], "audit": "runs/C007/audit.json",
                      "matching_outputs": list(matching), "S003_fields_all_agree": True}, indent=2))


def seal():
    clock = time.perf_counter()
    audit_result = json.loads((RUN / "audit.json").read_text())
    assert audit_result["status"] == "all self-audit assertions passed"
    for label in ("primary", "replay"):
        snapshot = json.loads((RUN / label / "preservation-before.json").read_text())
        preserved(snapshot)
    # Check local relative links before fingerprinting the saved researcher report.
    report = ROOT / "cycles/C007/report.md"
    links = []
    for raw_target in re.findall(r"\]\(([^)]+)\)", report.read_text()):
        target = (report.parent / raw_target.split("#")[0]).resolve()
        assert target.is_relative_to(ROOT) and target.exists(), raw_target
        links.append(str(target.relative_to(ROOT)))
    paths = sorted(p for p in RUN.rglob("*") if p.is_file())
    paths += [report, ROOT / "evidence.md", ROOT / "sources/cases.csv", ROOT / "sources/evaluate.py"]
    artifacts = {str(p.relative_to(ROOT)): {"sha256": sha(p), "bytes": p.stat().st_size}
                 for p in paths}
    result = {"status": "researcher handoff artifacts fingerprinted; independent review pending",
              "command": "timeout 30s python3 -B runs/C007/finalize.py --seal", "cwd": str(ROOT),
              "timeout_seconds": 30, "created_utc": datetime.now(timezone.utc).isoformat(),
              "preservation_rechecked": True, "report_links_checked": links,
              "artifacts": artifacts, "elapsed_seconds": time.perf_counter() - clock,
              "manifest_note": "Manifest does not include its own hash or certify supervisory completion."}
    write_json(RUN / "manifest.json", result)
    print(json.dumps({"status": result["status"], "manifest": "runs/C007/manifest.json",
                      "artifacts_fingerprinted": len(artifacts)}, indent=2))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--seal", action="store_true")
    args = parser.parse_args()
    assert Path.cwd().resolve() == ROOT
    seal() if args.seal else audit()
