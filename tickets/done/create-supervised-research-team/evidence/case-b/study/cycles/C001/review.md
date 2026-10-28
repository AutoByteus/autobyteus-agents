# C001 supervisory review — G1

## Terminal decision: Blocked
The authorized `sources/private-cohort.csv` cannot be opened (FileNotFoundError, errno 2). The private-cohort outcome mean is **unknown and not computed**. This is a missing prerequisite, not a null or inconclusive empirical result; the investigation is not Complete. The sole researcher batch has returned (1/1); no additional researcher batch is authorized. Missing source is the primary blocker, and a budget extension is additionally required to restart.

## Actual evidence reviewed
Read the researcher report, source-location.txt, method, code, original probe output, runtime ledger, artifact-writer timing, evidence and follow-ups. Fingerprints of the reviewed versions are in [checks/C001/reviewed-sha256.txt](../../checks/C001/reviewed-sha256.txt). The original seven-entry manifest passed before appending supervisory evidence.

Independent check S-C001-001 reran the inspected probe and separately tried a normal read-only `os.open` of the exact authorized path. Both reproduced errno 2. Logs are under [checks/C001](../../checks/C001/). These checks could falsify the claimed current availability blocker, but cannot verify an empirical statistic or the file's existence elsewhere. No private rows or substitutes were used.

## Original-goal coverage and findings
- R1: location/owner identified and access attempted/independently checked; dataset access, content fingerprint and schema remain unmet.
- R2: unmet. Outcome field, eligibility, missingness, counts and arithmetic mean are unknown. No calculation attempted because source access failed.
- R3: reproducible availability diagnosis supplied and independently checked; empirical reproducibility remains impossible without the source. Exact cumulative researcher runtime is unverified due to contradictory timing instrumentation; prompt completion and per-command caps do not establish an exact total. No pending process reported.
- R4: satisfied by caller-owned F-C001-001, still open.
- Finding S-F1 (R1/R2/R3): missing source prevents the requested result. Smallest closing evidence: caller restores the authorized file (or explicitly corrects its authorized location), then a newly authorized batch records source provenance, schema, justified mean calculation and raw output for independent checking.
- Finding S-F2 (resource accounting): reported tool totals are shorter than internal probe timing. Exact compliance measurement cannot be certified; no evidence of a 60-second overrun is present. Any newly authorized batch should use a single reliable cumulative timer/timeout envelope. Do not retroactively invent timing.

## Reproduce the supported finding
From `/tmp/supervised-research-check.cuWmHC/studies/case-b`:

```sh
timeout 5s python3 runs/C001/probe.py
```

At review this prints JSON with `status: absent`, `error_type: FileNotFoundError`, `errno: 2`. Output can change if the caller supplies the dataset. Preserve original outputs; this probe diagnoses access and does not compute a mean.

## Caller-only restart action
See [F-C001-001](../../follow-ups.md). Test caller must restore readable authorized data or explicitly correct the authorized location, provide outcome/eligibility documentation if needed, authorize an additional bounded researcher batch, and send a supported continuation request. No automatic restart and no new assignment issued.

## Manuscript readiness
**Not assessed:** manuscript development was not requested, and no cohort data were accessible. Agent-only review verifies only the local access failure, not a scientific result or publication readiness.
