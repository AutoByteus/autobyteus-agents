# API/E2E Execution Coverage Report

The run record and the result: what ran, what it proves, how confident you are, and the outcome. The coverage investigation is the plan; `api-e2e-revision-record.md` is the history across rounds.

Keep one canonical path across rounds, in the assigned task workspace. Start it before the first case runs and fill each case's row when the case completes; the test progress log tracks cases while they run. At the end of a round it holds the latest complete result.
Omit a section marked `(When Applicable)` when it does not apply. For any other table with nothing to record, write `None`.

## Round

- Coverage investigation (the plan; it lists the upstream documents):
- API/E2E revision record and current revision ID: `N/A` / `API-REV-*`
- Test progress log (when used):
- Round and trigger:
- Prior round reviewed:
- Deviations from the investigation's plan, and why: `None` / list
- Evidence folder (absolute path; the handoff message gives the commit that holds it):

## Routing Classification

- Task size (`Small`/`Medium`/`Large`):
- Architectural risk (`Low`/`High`):
- Input route (`Reviewed`/`Direct Low-Risk`):
- Successful-output route (`Code Review`/`Delivery`):
- Proportional test-code review decision: `Required` / `Not Required — direct low-risk route` / `Not Applicable`

## Tested Builds And Environments

Each case names the environment it ran in.

| Env ID | Commit Tested | Platform / OS | Runtime, Browser, Or App Build | Other Settings That Matter (data, identity, locale, viewport) |
| --- | --- | --- | --- | --- |
| ENV-1 |  |  |  |  |

## Cases

The one record of what ran and what it proves, under the case IDs the investigation planned (add new IDs only for newly found cases, and reuse them across rounds). Write a case's row when it completes. A case that was interrupted or never ran is `Not Tested`, with the reason in Notes; never infer a result.

| Case ID | Criteria (AC / Requirement IDs) | Boundary / Surface | Command Or Steps | Env | Result (`Pass`/`Fail`/`Blocked`/`Not Tested`) | Evidence Files | Look For | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  | <exact command, or the journey steps> | ENV-1 |  | <paths inside the evidence folder> | <the key line quoted exactly as in the file, a count, or a screenshot detail> |  |

## Acceptance-Criteria Proof

Each criterion and the cases that prove it; the cases hold the evidence.

| Acceptance-Criteria ID | Critical (`Yes`/`No`) | Proven By Case IDs | Result (`Proven`/`Not Proven`/`Only The User Can Check`) | For A User-Only Part: What You Tried And Why It Still Needs The User |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Validation Confidence Scorecard (Mandatory)

Fill the post-repository scores after the repository cases, then the final scores after broader validation. If broader validation did not run, repeat the post-repository score as final and say why.

| Confidence Category | Post-Repository Score (`0-100%`/`N/A`) | Final Score (`0-100%`/`N/A`) | What Supports It (Case IDs) | Residual Uncertainty | What Could Improve It |
| --- | --- | --- | --- | --- | --- |
| Requirement and acceptance-criteria proof |  |  |  |  |  |
| Changed-boundary execution directness |  |  |  |  |  |
| Cross-boundary integration realism and mock gap |  |  |  |  |  |
| Environment, configuration, identity, and fixture fidelity |  |  |  |  |  |
| Failure, edge-case, lifecycle, and recovery evidence |  |  |  |  |  |
| User-surface, browser, and desktop-shell confidence |  |  |  |  |  |
| Durable regression coverage quality and relevance |  |  |  |  |  |

- Overall post-repository confidence:
- Overall final confidence:
- Calculation method:
- Every critical acceptance criterion directly proven, apart from parts only the user can check: `Yes` / `No`
- Any final applicable category below `90%`: `No` / `Yes` — list:
- Default final confidence target of `95%` met: `Yes` / `No`
- Confidence-limiting residual risks:

## Broader Validation Decision (Mandatory)

Decide after the post-repository scores.

- Decision: `Required` / `Not Required` / `Blocked`
- Execution mode (`Browser`/`Live API`/`Project Desktop Validation`/`CLI`/`Lifecycle`/`Worker or Distributed`/`Other`/`None`):
- Confidence gap or residual risk it addresses, and the expected gain:
- Browser validation needed, and why or why not:
- If `Not Required`: the cases that already exercise the real changed boundary:
- If `Blocked`: the exact unavailable dependency or access, and what you tried:

## Desktop Application Validation (When Applicable)

- Approach executed, and any deviation from the investigation's plan:
- Cases proving web-equivalent behavior, and cases proving shell-specific or lifecycle behavior:
- Effect on any already-running desktop application: `None` / explain
- Behavior not directly proven and its confidence consequence:

## Persisted-Data Transition Checks (When Applicable)

- Approved persisted-data decision:
- Representative existing data used:
- Approved transition followed without an unnecessary migration: `Yes` / `No (reroute required)`
- Cases proving the direct-use, discard/rebuild, or migration outcome (completion and recovery only when `Migration Required`):
- Version-specific runtime branch, dual read/write, or compatibility fallback observed: `No` / `Yes (reroute required)`
- Residual untested persisted-data risk:

## Compatibility / Legacy Scope Check

- Reviewed requirements/design introduce, tolerate, or ambiguously describe backward compatibility in scope: `No` / `Yes (invalid upstream; reroute required)`
- Compatibility-only or legacy-retention behavior observed in implementation: `No` / `Yes (invalid implementation scope; reroute required)`
- Durable coverage added or retained only for compatibility-only behavior: `No` / `Yes (invalid; explain)`
- If compatibility-related invalid scope was observed, reroute classification used: `Local Fix` / `Design Impact` / `Requirement Gap` / `Unclear`
- Upstream recipient notified:

## Durable Coverage Changed In The Codebase

- Repository-resident durable coverage added, updated, or removed this round: `No` / `Yes`

| Path / Test | Change (`Added`/`Updated`/`Removed`) | Case IDs | For A Removal: Obsolete Assertion, Upstream Evidence, And Replacement Or No-Replacement Rationale |
| --- | --- | --- | --- |
|  |  |  |  |

- Added or updated paths attached for proportional test-code review: `Yes` / `No` / `Not Applicable`
- Diff or repository evidence supplied for removed paths:

## Dependencies Mocked Or Emulated

| Dependency | Method | Why Real Dependency Was Not Used | Confidence Limitation |
| --- | --- | --- | --- |
|  |  |  |  |

## Temporary Methods And Cleanup

Probes, harnesses, processes, data and browser state this run created, and what happened to them. Keep the evidence.

| Item | Owned By This Run (`Yes`/`No`) | Cleanup Action | Result |
| --- | --- | --- | --- |
|  |  |  |  |

## Preliminary Classification (On `Fail`)

- `Local Fix`: the main issue is a bounded implementation, test, fixture, environment, execution, or report correction; identify the owning specialist.
- `Design Impact`: the main issue is a weakness or mismatch in the reviewed design.
- `Requirement Gap`: intended behavior or acceptance criteria are missing or ambiguous.
- `Unclear`: the issue is cross-cutting or cannot yet be classified cleanly from the available evidence.

This is the API/E2E engineer's evidence-based recommendation. The failure-origin review confirms the origin and final owner before rework begins.

## Latest Authoritative Result

The outcome; the reasons are in the sections above.

- Result: `Pass` / `Fail` / `Blocked`
- Criteria not proven, or parts only the user can check (IDs): `None` / list
- Preliminary classification and recommended owner (on `Fail`):
- Next recipient from `get_handoff_rules` (`Blocked` -> user request):
- Notes:
