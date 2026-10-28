"""Exclusive-output, timeout-bounded local runner; preserves raw subprocess logs."""
import argparse
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import platform
import shlex
import subprocess
import sys
import time
import traceback

ROOT = Path(__file__).resolve().parents[2]


def now():
    return datetime.now(timezone.utc).isoformat()


def fingerprint(path):
    content = path.read_bytes()
    return {"sha256": hashlib.sha256(content).hexdigest(), "bytes": len(content)}


def write_json(path, value):
    with path.open("x", encoding="utf-8") as handle:
        json.dump(value, handle, indent=2)
        handle.write("\n")


def rel(path):
    return str(path.relative_to(ROOT))


def main():
    started, start = now(), time.perf_counter()
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    out = (ROOT / args.out).resolve()
    if not out.is_relative_to(ROOT / "runs/C010"):
        raise ValueError("Run outputs must be under runs/C010")
    out.mkdir(parents=False, exist_ok=False)
    material = [ROOT / p for p in ("sources/cases.csv", "sources/evaluate.py",
                "runs/C010/method.md", "runs/C010/analyze.py", "runs/C010/run.py")]
    protected = [ROOT / "study.md"]
    for directory in ("sources", "cycles", "checks", "runs"):
        protected.extend(p for p in (ROOT / directory).rglob("*")
                         if p.is_file() and not p.is_symlink()
                         and not p.is_relative_to(ROOT / "runs/C010"))
    protected = sorted(set(protected))
    before = {rel(p): fingerprint(p) for p in protected}
    manifest = {
        "created_utc": now(),
        "material": {rel(p): fingerprint(p) for p in material},
        "protected_before": before,
        "evidence_ledger_at_start": fingerprint(ROOT / "evidence.md"),
    }
    write_json(out / "input-manifest.json", manifest)
    env = os.environ.copy()
    env["PYTHONDONTWRITEBYTECODE"] = "1"
    execution = {
        "author": "Researcher", "study": "Synthetic threshold study", "cycle": "C010", "goal": "G1",
        "started_utc": started, "cwd": str(ROOT), "output_directory": str(out),
        "python_version": sys.version, "python_executable": sys.executable,
        "platform": platform.platform(),
        "environment_overrides": {"PYTHONDONTWRITEBYTECODE": "1"},
        "invocation": shlex.join(["timeout", "30s", "python3", "-B", rel(Path(__file__).resolve()), *sys.argv[1:]]),
        "seed": None, "randomness": "None; deterministic fixed threshold rules.",
        "commands": [],
    }
    write_json(out / "started.json", execution)

    def invoke(name, command, stdout_name):
        entry = {"name": name, "command": shlex.join(command),
                 "argv": command, "timeout_seconds": 30, "started_utc": now(),
                 "stdout": rel(out / stdout_name), "stderr": rel(out / (name + ".stderr.txt"))}
        tick = time.perf_counter()
        with (out / stdout_name).open("xb") as stdout, (out / (name + ".stderr.txt")).open("xb") as stderr:
            process = subprocess.run(command, cwd=ROOT, env=env, stdout=stdout, stderr=stderr, check=False)
        entry.update({"exit_code": process.returncode, "elapsed_seconds": time.perf_counter() - tick,
                      "finished_utc": now()})
        execution["commands"].append(entry)
        if process.returncode != 0:
            raise RuntimeError(f"{name} exited {process.returncode}; raw logs retained")

    exit_code = 0
    try:
        invoke("evaluation", ["timeout", "30s", "python3", "-B", "sources/evaluate.py", "--split", "evaluation"],
               "evaluation.stdout.json")
        invoke("analysis", ["timeout", "30s", "python3", "-B", "runs/C010/analyze.py", "--raw",
               rel(out / "evaluation.stdout.json"), "--out", rel(out / "analysis")], "analysis.stdout.json")
    except Exception as error:
        exit_code = 1
        execution["error"] = repr(error)
        with (out / "runner.error.txt").open("x", encoding="utf-8") as handle:
            handle.write(traceback.format_exc())
    finally:
        after = {rel(p): fingerprint(p) if p.exists() else None for p in protected}
        differences = [path for path in before if before[path] != after[path]]
        material_after = {rel(p): fingerprint(p) for p in material}
        write_json(out / "preservation.json", {
            "checked_utc": now(), "protected_file_count": len(protected),
            "protected_after": after, "changed_or_missing_protected_paths": differences,
            "material_after": material_after,
            "material_unchanged": material_after == manifest["material"],
            "evidence_ledger_unchanged_during_run": fingerprint(ROOT / "evidence.md") == manifest["evidence_ledger_at_start"],
        })
        if differences or material_after != manifest["material"]:
            exit_code = 1
            execution["preservation_error"] = True
        execution.update({"finished_utc": now(), "elapsed_seconds": time.perf_counter() - start,
                          "exit_code": exit_code, "no_background_job_started": True})
        write_json(out / "execution.json", execution)
        output_manifest = {rel(p): fingerprint(p) for p in sorted(out.rglob("*")) if p.is_file()}
        write_json(out / "output-manifest.json", output_manifest)
    print(json.dumps({"out": rel(out), "exit_code": exit_code,
                      "elapsed_seconds": execution["elapsed_seconds"]}))
    return exit_code


if __name__ == "__main__":
    sys.exit(main())
