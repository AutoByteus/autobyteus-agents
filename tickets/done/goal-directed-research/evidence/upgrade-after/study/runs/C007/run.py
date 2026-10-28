"""Capture a bounded evaluator execution and self-check, without replacing files."""
import argparse
import json
import os
import platform
import shutil
import subprocess
import sys
import time
import traceback
from datetime import datetime, timezone
from pathlib import Path

from analyze import ROOT, EXPECTED, analyze, read_cases, sha, write_json


def utc():
    return datetime.now(timezone.utc).isoformat()


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--out", required=True)
    args = p.parse_args()
    assert Path.cwd().resolve() == ROOT, "Run from the documented study directory"
    out = (ROOT / args.out).resolve()
    assert out.is_relative_to(ROOT / "runs/C007"), "Researcher outputs must stay in runs/C007"
    out.mkdir(parents=True, exist_ok=False)
    began, clock = utc(), time.perf_counter()
    protected = [ROOT / name for name in ("study.md", "evidence.md", "follow-ups.md", "runs/smoke.json")]
    for directory in ("sources", "checks", "cycles"):
        protected += sorted(x for x in (ROOT / directory).rglob("*") if x.is_file())
    control = {str(x.relative_to(ROOT)): {"sha256": sha(x), "bytes": x.stat().st_size}
               for x in protected}
    pinned = [ROOT / n for n in ("sources/cases.csv", "sources/evaluate.py",
              "runs/C007/method.md", "runs/C007/run.py", "runs/C007/analyze.py")]
    hashes = {str(x.relative_to(ROOT)): sha(x) for x in pinned}
    environment = {"python": sys.version, "python_executable": sys.executable,
                   "python3_resolved": shutil.which("python3"),
                   "timeout_resolved": shutil.which("timeout"), "platform": platform.platform(),
                   "environment": {k: os.environ.get(k) for k in
                                   ("LANG", "LC_ALL", "TZ", "PYTHONHASHSEED", "PYTHONPATH")},
                   "randomness": "None; fixed deterministic integer thresholds, no seeds needed",
                   "dependencies": "Python standard library and existing local timeout utility"}
    command = ["python3", "-B", "sources/evaluate.py", "--split", "evaluation"]
    metadata = {"cwd": str(ROOT), "run_started_utc": began,
                "invocation_argv": sys.argv,
                "outer_command": f"timeout 30s python3 -B runs/C007/run.py --out {args.out}",
                "outer_timeout_seconds": 30, "evaluator_argv": command,
                "evaluator_timeout_seconds": 30, "pinned_sha256": hashes,
                "environment": environment, "planned_unique_rows": 12,
                "planned_ids": EXPECTED, "attempted_unique_rows": 0,
                "completed_unique_rows": 0, "status": "preflight pending"}
    write_json(out / "run-start.json", metadata)
    write_json(out / "preservation-before.json", control)
    try:
        cases = read_cases()
    except Exception:
        (out / "preflight-error.txt").write_text(traceback.format_exc())
        metadata.update(status="preflight failed; evaluator not launched", run_ended_utc=utc(),
                        runner_elapsed_seconds=time.perf_counter() - clock)
        write_json(out / "execution.json", metadata)
        return 1
    write_json(out / "preflight.json", {"status": "all preflight assertions passed",
               "recorded_utc": utc(), "evaluation_ids": [r["id"] for r in cases],
               "evaluation_rows": len(cases), "smoke_rows_excluded": 2,
               "source_sha256": {k: v for k, v in hashes.items() if k.startswith("sources/")}})
    attempt = {"started_utc": utc(), "argv": command, "timeout_seconds": 30,
               "requested_ids": EXPECTED, "requested_row_count": 12}
    write_json(out / "evaluator-attempt.json", attempt)
    eval_clock = time.perf_counter()
    try:
        with (out / "evaluation.stdout.json").open("xb") as stdout, (out / "evaluation.stderr.txt").open("xb") as stderr:
            completed = subprocess.run(command, cwd=ROOT, stdout=stdout, stderr=stderr, timeout=30)
        metadata.update(evaluator_exit_code=completed.returncode, evaluator_timed_out=False)
    except subprocess.TimeoutExpired:
        metadata.update(evaluator_exit_code=None, evaluator_timed_out=True,
                        timeout_action="subprocess.run killed and waited for its evaluator child")
    except Exception:
        (out / "launch-error.txt").write_text(traceback.format_exc())
        metadata.update(evaluator_exit_code=None, evaluator_timed_out=False,
                        evaluator_launch_failed=True)
    metadata.update(evaluator_started_utc=attempt["started_utc"], evaluator_ended_utc=utc(),
                    evaluator_elapsed_seconds=time.perf_counter() - eval_clock,
                    status="evaluator failed or timed out")
    if metadata.get("evaluator_exit_code") == 0:
        metadata["attempted_unique_rows"] = 12
        analysis_clock = time.perf_counter()
        try:
            summary = analyze(out / "evaluation.stdout.json", out)
            metadata.update(status="evaluation and researcher self-check passed",
                            completed_unique_rows=summary["coverage"]["completed"])
        except Exception:
            (out / "analysis-error.txt").write_text(traceback.format_exc())
            metadata["status"] = "evaluation completed; analysis failed"
        metadata["analysis_elapsed_seconds"] = time.perf_counter() - analysis_clock
    else:
        metadata["attempted_unique_rows"] = None
        metadata["attempted_rows_limit"] = "12 requested; per-case attempts not instrumented on failed evaluator"
    current_hashes = {str(x.relative_to(ROOT)): sha(x) for x in pinned}
    metadata["pinned_inputs_unchanged"] = hashes == current_hashes
    metadata.update(run_ended_utc=utc(), runner_elapsed_seconds=time.perf_counter() - clock)
    metadata["output_sha256"] = {x.name: sha(x) for x in sorted(out.iterdir()) if x.is_file()}
    write_json(out / "execution.json", metadata)
    print(json.dumps({"output_directory": str(out), "status": metadata["status"],
                      "evaluator_exit_code": metadata["evaluator_exit_code"],
                      "evaluator_timed_out": metadata["evaluator_timed_out"],
                      "completed_unique_rows": metadata["completed_unique_rows"]}, indent=2))
    return 0 if (metadata["status"] == "evaluation and researcher self-check passed"
                 and metadata["pinned_inputs_unchanged"]) else 1


if __name__ == "__main__":
    raise SystemExit(main())
