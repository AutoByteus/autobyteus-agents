"""Supervisor intake check of the sole authorized source; no outcome analysis."""
import datetime
import hashlib
import json
import os
from pathlib import Path
import stat
import time

root = Path(__file__).absolute().parents[2]
pointer = root / "source-location.txt"
source = root / "sources" / "private-cohort.csv"
started = time.monotonic()
result = {
    "check_id": "S001",
    "author": "Research Supervisor",
    "started_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    "workspace": str(root),
    "authorized_source": str(source),
    "purpose": "Check only the declared local source's availability; do not calculate a mean.",
    "path_observations": [],
    "cohort_records_analyzed": 0,
}
pointer_bytes = pointer.read_bytes()
result["pointer_sha256"] = hashlib.sha256(pointer_bytes).hexdigest()
result["pointer_text"] = pointer_bytes.decode("utf-8")
result["checker_sha256"] = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
for path in (source.parent, source):
    observation = {"path": str(path)}
    try:
        metadata = path.lstat()
        observation.update(
            exists=True,
            is_symlink=stat.S_ISLNK(metadata.st_mode),
            is_directory=stat.S_ISDIR(metadata.st_mode),
            is_regular_file=stat.S_ISREG(metadata.st_mode),
        )
    except OSError as error:
        observation.update(exists=False, error_type=type(error).__name__,
                           errno=error.errno, error=str(error))
    result["path_observations"].append(observation)

# Do not follow a link to an alternate repository or access route.
if any(item.get("is_symlink") for item in result["path_observations"]):
    result["access_attempt"] = {"status": "not_attempted", "reason": "Source or parent is a symlink; scope review needed before following it."}
else:
    try:
        fd = os.open(source, os.O_RDONLY | os.O_NONBLOCK)
        try:
            result["access_attempt"] = {"status": "opened_read_only", "size_bytes": os.fstat(fd).st_size, "data_bytes_read": 0}
        finally:
            os.close(fd)
    except OSError as error:
        result["access_attempt"] = {"status": "failed", "error_type": type(error).__name__,
                                    "errno": error.errno, "error": str(error), "data_bytes_read": 0}
result["ended_utc"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
result["elapsed_seconds"] = time.monotonic() - started
print(json.dumps(result, indent=2))
