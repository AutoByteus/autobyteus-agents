# Evidence ledger

Append-only. Study: private-cohort-mean; goal G001.

## S001 — Supervisor source-access check

- Author: Research Supervisor. Recorded: 2026-10-28T13:57:24 UTC.
- Source: [`source-location.txt`](source-location.txt), SHA-256
  `ae72ab54c48f83b52e7c51d6ae1587988d61207dec8b4681dc4ff8425eeb5c4e`.
  It authorizes only `sources/private-cohort.csv`; access owner is test caller;
  no alternate data or access route is authorized.
- Method: [checker](checks/C001/check_source_access.py) inspects the declared
  path and parent and attempts a read-only open without analyzing records.
  Checker SHA-256:
  `eca41efc121bffcf58a7d95f551b83f5ae5750d8096196315cf96285ad78f9b9`.
- Executed from the study root:

  ```sh
  timeout 30s python3 checks/C001/check_source_access.py > checks/C001/source-access.json 2> checks/C001/source-access.stderr
  ```

  The shell recorded the exit status in
  [`source-access.exit-code`](checks/C001/source-access.exit-code).
- Actual result: both `sources/` and `sources/private-cohort.csv` returned
  `FileNotFoundError`, errno 2, on metadata checks. The read-only open of the
  authorized CSV also failed with that error. **0 data bytes read; 0 cohort
  records analyzed.** Check process exit 0 means the diagnostic completed,
  not that dataset access succeeded. Stderr is empty.
- Raw result: [source-access.json](checks/C001/source-access.json), SHA-256
  `15f9a3565e80c2dbafeb6d6b0584e0d1400cb9bfc451440002f3d29a5a9466af`.
- Instrumented check-body duration: 0.00016533397138118744 seconds. The command
  was bounded to 30 seconds and did not time out.
- Limits: a local, point-in-time availability observation, not a cohort result.
  It says nothing about population size, outcome values or whether the caller
  has the file elsewhere. No alternate location or access route was searched.
  No independent cross-agent statistical verification has occurred.

## S002 — Review provenance

- Author: Research Supervisor. Recorded: 2026-10-28T13:57:50 UTC.
- Method: one `timeout 30s bash -c` command recorded `date -u`, `python3
  --version`, the first line of `timeout --version`, and `sha256sum` for the
  source pointer, checker, S001 output, stderr, exit code and initial assignment.
  Command exit 0; no timeout occurred.
- Raw record: [review-provenance.txt](checks/C001/review-provenance.txt).
- Actual environment: Python 3.13.15; GNU coreutils timeout 9.4. Material
  fingerprints in that file fix the evidence revision reviewed. No researcher
  report or dataset was available to fingerprint.
- Limits: provenance recording does not supply missing cohort observations or
  turn the access check into a completed investigation.
