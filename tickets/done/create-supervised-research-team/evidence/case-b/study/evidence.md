# Research evidence

## E-C001-001 — Researcher, authorized-source availability
- Goal G1, cycle C001; source locator: [source-location.txt](source-location.txt), source owner test caller.
- Preregistered prerequisite and conditional calculation: [method](runs/C001/method.md).
- Executed from study root: `timeout 5s python3 runs/C001/probe.py > runs/C001/probe.json`.
- Raw observation: [probe.json](runs/C001/probe.json) records normal read-only open of `sources/private-cohort.csv` returning `FileNotFoundError`, errno 2. Exact path unavailable at observation time. No source content read, fingerprint available, schema inspected, or mean calculated.
- Reproduction code and code/locator SHA-256, Python/platform and timestamp retained in [probe.py](runs/C001/probe.py) and raw JSON. No alternate source or access workaround attempted.
- Limits: this establishes unavailable path in this environment, not nonexistence of the private cohort elsewhere; not an empirical result about outcomes. One probe executed, no independent check yet.
- Runtime instrumentation: [runtime.json](runs/C001/runtime.json). Tool timings conflict with internal timing; exact cumulative duration is unverified. No job remains running.
- Setup failure retained: initial `cat shared/research-contract.md` returned no such file, so contract was read at the skill-prescribed `.codex/skills/evidence-research/research-contract.md` symlink. This did not involve dataset discovery.

## S-C001-001 — Supervisor independent availability review
- Reviewed G1/C001 report, method, source locator, probe code, raw output and runtime ledger. Pre-review fingerprints: [reviewed-sha256.txt](checks/C001/reviewed-sha256.txt). Researcher manifest verified before appending this entry: [manifest-check.txt](checks/C001/manifest-check.txt); all seven entries matched. Evidence/follow-ups are append-only living records, so their original hashes refer to the pre-review revisions.
- Ran from study root: `timeout 5s python3 runs/C001/probe.py > checks/C001/probe-rerun.json`. Independently also used Python standard-library `os.open('sources/private-cohort.csv', os.O_RDONLY)` (close if successful). Both returned FileNotFoundError, errno 2; [rerun](checks/C001/probe-rerun.json), [independent open](checks/C001/independent-access.json).
- Confirms the authorized path is unavailable now, not that a cohort is empty or nonexistent elsewhere. No source rows read; no mean or counts checked. No alternate data used. These are supervisor checks, not an additional researcher batch.
- Timing remains unverified: researcher's final message reports fourth tool duration 0.000011333 s, four-command sum 0.000049583 s; this remains inconsistent with internal probe duration 0.008601792 s. Artifact writer elapsed file reports 0.000363875 s, also not a total-runtime measurement. No exact cumulative-runtime certification is possible from these records.
