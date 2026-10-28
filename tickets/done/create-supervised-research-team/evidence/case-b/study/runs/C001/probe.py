#!/usr/bin/env python3
"""Read-only prerequisite probe. Run from the study root; no fallback sources."""
import datetime, hashlib, json, os, platform, sys, time
from pathlib import Path
start = time.monotonic()
p = Path('sources/private-cohort.csv')
r = {'timestamp_utc': datetime.datetime.now(datetime.timezone.utc).isoformat(),
     'source': str(p), 'cwd': os.getcwd(), 'python': sys.version,
     'platform': platform.platform(),
     'probe_sha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
     'source_location_sha256': hashlib.sha256(Path('source-location.txt').read_bytes()).hexdigest()}
try:
    with p.open('rb') as f:
        data = f.read()
    r.update(status='readable', bytes=len(data), source_sha256=hashlib.sha256(data).hexdigest())
except OSError as e:
    r.update(status='absent' if isinstance(e, FileNotFoundError) else 'inaccessible',
             error_type=type(e).__name__, errno=e.errno, error=str(e))
r['elapsed_seconds'] = time.monotonic() - start
print(json.dumps(r, indent=2))
