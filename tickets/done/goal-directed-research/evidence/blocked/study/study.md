# Authorized private-cohort mean

Study ID: private-cohort-mean. Goal revision: G001. Requester: user/test caller.
Started: 2026-10-28 UTC. Supervisor: Research Supervisor.

## Original request and scope

Determine the mean outcome in the authorized private cohort described by
`source-location.txt`, in this study directory. Only that dataset is authorized;
do not substitute data. Use local experiment timeouts of 30 seconds and report
actual evidence and caller-owned dependencies. No internet, paid/cloud work,
new dependencies, external collaborators or other repositories.

The supplied pointer names `sources/private-cohort.csv` and identifies its access
owner as **test caller**. No alternate data or access route is authorized.
Preserve this goal even if the source is unavailable; an access failure is not a
negative statistical result.

## Requirements and evidence bar

| ID | Requirement | Evidence needed | Current coverage |
| --- | --- | --- | --- |
| R01 | Use only the authorized private cohort | Exact source path, access result and, when accessible, dataset fingerprint and schema | Source identified, but access blocked: S001 |
| R02 | Determine the cohort's mean outcome | Identifiable outcome and cohort, inclusion/missing-value rules, denominator and reproducible arithmetic mean from actual records | Unmet; no observations available or examined |
| R03 | Independently check the decisive result | Supervisor checks of source provenance, coverage and calculation, separate from researcher artifacts | Unmet; only source-availability evidence checked |
| R04 | Respect all access/resource limits | Time-limited local commands and actual usage record; no substitution or unauthorized actions | Satisfied for performed work; limits remain in force |
| R05 | Report actual evidence and caller dependencies | Inspectable check outputs, review and precise owner/restart actions for unresolved dependencies | Recorded in evidence, review and FU001 |

Interpretation before viewing data: a descriptive, unweighted arithmetic mean of
the documented cohort outcome; do not silently choose among ambiguous outcomes,
redefine the cohort or convert absent observations to zero. The researcher owns
detailed methods and must report any material ambiguity. No manuscript requested.

## Resources and authority

- User-specified per-local-experiment timeout: **30 seconds**.
- No total research budget was specified; no arbitrary cycle/no-progress cap.
- Use only existing local capabilities in this workspace and attached instructions.
- No internet, new dependencies, paid/cloud work, external collaborators,
  other repositories, substitute data, alternate access routes or publication.
- Access owner: test caller (as stated in `source-location.txt`).

## Current state and history

- Current decision: **Blocked**, cycle C001, goal G001, 2026-10-28 UTC.
- Initial decision was **Continue**. The first work order was saved in
  [C001 assignment](cycles/C001/assignment.md), then superseded before dispatch
  by the observed intake access failure. It is retained unchanged as history,
  not an outstanding assignment or an instruction to retry absent data.
- Latest/terminal assessment: [C001 review](cycles/C001/review.md).
- Actual evidence: [ledger](evidence.md), [access output](checks/C001/source-access.json),
  [review fingerprints](checks/C001/review-provenance.txt).
- No researcher report exists, and no research completion is certified.
- The sole authorized source and its parent directory are absent. A read-only
  open failed with `FileNotFoundError`, errno 2. No mean, denominator, dataset
  fingerprint or data-quality conclusion can be established from that result.
- Caller-owned dependency and exact restart: [FU001](follow-ups.md). The test
  caller must place the authorized cohort at `sources/private-cohort.csv` in
  this workspace, then send a resume request. No other route is authorized.
- No new assignment while blocked; no live job, pending researcher work,
  autonomous watcher or automatic restart. File creation alone does not resume
  the study. No scope revisions or permissions expansions.
- Post-work handoff rules checked: the sole Continue-only `/researcher` rule
  does not match this terminal Blocked assessment. Direct user/caller response;
  no pending or delivered internal handoff.

## Actual resource accounting

- Intake: read attached instructions and `source-location.txt`; inspected the
  study directory. No other repository or alternate dataset was investigated.
- One planned C001 researcher work order; 0 delivered, 0 researcher returns,
  0 research experiments, 0 mean calculations, 0 cohort records analyzed.
- One supervisor source-availability check, S001: completed under
  `timeout 30s`, process exit 0, access attempt failed with errno 2. Instrumented
  Python check body elapsed **0.00016533397138118744 seconds** (not total agent
  time or process startup time). No timeout occurred.
- One local environment/fingerprint recording command, S002: `timeout 30s`,
  exit 0. Existing Python 3.13.15 and GNU timeout 9.4; no installation.
- 0 data bytes read, 0 network requests, 0 paid/cloud jobs, 0 external
  collaborators or delegations. Routine artifact-writing time was not metered;
  no invented total elapsed-time or token-budget claim.
- Stop basis is the observed missing authorized input and caller-only access,
  not a cycle count, return cap, elapsed budget or a negative cohort result.
