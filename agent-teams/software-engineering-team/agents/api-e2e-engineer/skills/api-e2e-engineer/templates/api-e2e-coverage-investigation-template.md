# API/E2E Coverage Investigation

Write this artifact to a canonical file path in the assigned task workspace before final test execution, durable coverage edits, durable coverage removals, or failure rerouting.

Keep one canonical investigation path across reruns.
Do not create versioned copies by default.
Update this artifact whenever new evidence changes a test-validity or coverage decision.

## Investigation Meta

- Requirements Doc:
- Investigation Notes:
- Requirements Revision Record:
- Design Spec: `N/A — not applicable` for the direct route
- Supplemental Task Artifacts:
- Architecture Design Revision Record: `N/A — not applicable` for the direct route
- Design Review Report: `N/A — not applicable` for the direct route
- Architecture Review Revision Record: `N/A — not applicable` for the direct route
- Implementation Handoff:
- Implementation Revision Record:
- Code Review Report:
- Code Review Revision Record:
- Delivery Revision Record (delivery re-entry only):
- Relevant Delivery Revision IDs:
- API/E2E Revision Record (created after the first completed result):
- Current API/E2E Revision ID: `N/A` / `API-REV-*`
- Current Investigation Round:
- Trigger:
- Prior Investigation Reviewed:
- Latest Authoritative Investigation:

## Routing Classification

- Task size (`Small`/`Medium`/`Large`):
- Architectural risk (`Low`/`High`):
- Input route (`Reviewed`/`Direct Low-Risk`):
- Successful-output route (`Code Review`/`Delivery`):
- Proportional test-code review decision: `Required` / `Not Required — direct low-risk route` / `Not Applicable`

## Current Requirement And Design Basis

Summarize the current behavior that must be proven from the approved requirements, acceptance criteria, reviewed design or direct low-risk requirements package, applicable supplemental task artifacts and revision records, implementation handoff, and applicable review artifacts. Record `N/A — not applicable` for architecture or source-review artifacts omitted by the direct route.

## Changed Behavior Summary

Identify behavior added, changed, removed, or intentionally preserved.

| Behavior ID / Boundary | Change Type (`Added`/`Changed`/`Removed`/`Preserved`/`Unclear`) | Upstream Evidence | Coverage Consequence |
| --- | --- | --- | --- |
|  |  |  |  |

## Changed Surface And Boundary Classification

| Surface / Boundary | Affected? (`Yes`/`No`) | Actual Changed Boundary | Repository Evidence Available | Material Risk Not Exercised By That Evidence | Candidate Broader Validation Mode |
| --- | --- | --- | --- | --- | --- |
| Domain / backend logic |  |  |  |  |  |
| API / transport / contract |  |  |  |  |  |
| Frontend component / state |  |  |  |  |  |
| Browser integration / user journey |  |  |  |  |  |
| Authentication / session / permissions |  |  |  |  |  |
| Desktop renderer / web-equivalent UI |  |  |  |  |  |
| Desktop shell / Electron-specific integration |  |  |  |  |  |
| Process / lifecycle |  |  |  |  |  |
| Persisted-data transition |  |  |  |  |  |
| Worker / queue / distributed coordination |  |  |  |  |  |
| External integration |  |  |  |  |  |

## Project Execution Discovery

- Assigned task worktree / workspace:
- Project type and runtime stack:
- Conflicting, missing, or unclear project instructions:
- Required environment variables or secrets available: `Yes` / `No` / `N/A` (do not record secret values)

| Instruction / Configuration Path | Authority / Purpose | Commands, Setup, Or Constraints Learned |
| --- | --- | --- |
|  |  |  |

| Component / Dependency | Working Directory | Start / Setup Command | Runtime / Resource Notes | Readiness Check | Stop / Cleanup Method |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

| Data / Fixture / Identity Need | Existing Project Mechanism Or Creation Method | Environment / Data-Safety Notes | Cleanup / Retention |
| --- | --- | --- | --- |
|  |  |  |  |

## Persisted Data Transition Coverage Basis (When Applicable)

- Approved decision (`Not Affected`/`Directly Usable — No Migration`/`Discard or Rebuild`/`Migration Required`/`Undetermined`):
- Design-spec and implementation-handoff references:
- Representative existing-data setup and required behavior:
- Evidence planned for the approved direct-use, discard/rebuild, or migration outcome:
- Migration-specific completion/recovery scenarios, only when `Migration Required`:
- Upstream ambiguity or reroute required:

## Existing Durable Coverage Inventory

List relevant repository-resident API, E2E, integration, lifecycle, CLI, or executable coverage artifacts for the changed scope.

| Path / Scenario | Current Assertion Or Intent | Related Requirement / Acceptance Criteria / Design | Validity Decision (`Still Valid`/`Needs Update`/`Stale / Remove`/`Replace`/`Out Of Scope`/`Unclear`) | Evidence | Action |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

Decision rules:
- `Still Valid`: the assertion still represents approved current behavior.
- `Needs Update`: the scenario remains useful, but setup, assertions, fixtures, or expected output must change.
- `Stale / Remove`: the scenario asserts obsolete behavior that is intentionally removed or no longer meaningful.
- `Replace`: the old scenario should be removed or retired because a different scenario now proves the current boundary better.
- `Out Of Scope`: the artifact is not relevant to this task's changed behavior.
- `Unclear`: upstream requirements or design do not decide the test's validity.

## Stale Or Obsolete Coverage Decisions

Use this section before deleting or disabling existing durable coverage.

| Path / Scenario | Obsolete Assertion | Why It Is Obsolete | Upstream Evidence | Replacement Coverage | No-Replacement Rationale |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Durable Coverage To Add

| Scenario ID | Behavior / Boundary | Requirement / Acceptance Criteria / Design Evidence | Planned Artifact / Path | Why Durable Coverage Is Needed |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Durable Coverage To Update

| Scenario ID | Existing Path / Scenario | Required Update | Requirement / Acceptance Criteria / Design Evidence | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Durable Coverage To Remove

| Existing Path / Scenario | Removal Reason | Requirement / Acceptance Criteria / Design Evidence | Replacement Or No-Replacement Decision |
| --- | --- | --- | --- |
|  |  |  |  |

## Repository Coverage Execution Plan And Results

Plan the narrowest relevant checks first and the broader affected suites afterward. Update this table with actual results before making the confidence decision.

| Order | Command | Working Directory / Configuration | Boundary Or Scenario Proven | Result (`Planned`/`Pass`/`Fail`/`Blocked`) | Evidence / Output Path |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Post-Repository Confidence Scorecard (Mandatory)

Score each applicable category from `0%` to `100%`. Use `N/A` only with a concrete inapplicability reason. Do not let the average hide a weak category or unproven critical behavior.

| Confidence Category | Score (`0-100%`/`N/A`) | What Supports The Score | Remaining Uncertainty | Additional Validation That Could Improve It |
| --- | --- | --- | --- | --- |
| Requirement and acceptance-criteria proof |  |  |  |  |
| Changed-boundary execution directness |  |  |  |  |
| Cross-boundary integration realism and mock gap |  |  |  |  |
| Environment, configuration, identity, and fixture fidelity |  |  |  |  |
| Failure, edge-case, lifecycle, and recovery evidence |  |  |  |  |
| User-surface, browser, and desktop-shell confidence |  |  |  |  |
| Durable regression coverage quality and relevance |  |  |  |  |

- Overall post-repository confidence:
- Calculation method:
- Every critical acceptance criterion directly proven: `Yes` / `No`
- Any applicable category below `90%`: `No` / `Yes` — list:
- Default clean-confidence target of `95%` met: `Yes` / `No`
- Material residual risks:

## Broader Validation Decision (Mandatory)

- Decision: `Required` / `Not Required` / `Blocked`
- Selected execution mode (`Browser`/`Live API`/`Project Desktop Validation`/`CLI`/`Lifecycle`/`Worker or Distributed`/`Other`/`None`):
- Specific confidence gap or residual risk addressed:
- Why the selected mode can materially improve confidence:
- Expected confidence after the selected validation:
- Browser-specific decision and rationale:
- If `Not Required`, evidence proving the real changed boundary without broader execution:
- If `Blocked`, exact dependency or access that remains unavailable after safe setup/emulation attempts:

## Desktop Application Validation Decision (When Applicable)

- Desktop framework / shell:
- Relevant README or development instructions:
- Web-equivalent behavior:
- Shell-specific or lifecycle behavior:
- Chosen validation approach and why it fits the project:
- Server/frontend setup when browser validation is used:
- Effect on any already-running desktop application: `None` / explain
- Behavior not directly proven and confidence consequence:

## Live Environment And Fixture Plan (Required When Broader Validation Runs)

- Startup order and commands:
- Environment choices that materially affect the run:
- Health / readiness checks:
- Seed data / fixtures:
- Test identities, authentication, permissions, or session state:
- Requirement-linked journeys or scenarios:
- DOM, screenshot, log, API, process, or other evidence to capture:
- Owned processes and temporary state to clean up:

## Temporary Executable Validation Plan

| Scenario ID | Probe / Harness / Runtime Setup | Behavior Proven | Why This Should Not Remain As Durable Coverage |
| --- | --- | --- | --- |
|  |  |  |  |

## Not Tested / Infeasible / Deferred

| Behavior / Boundary | Reason | Risk | Required Follow-Up Or Escalation |
| --- | --- | --- | --- |
|  |  |  |  |

## Ambiguities Or Reroute Triggers

| Issue | Classification (`Requirement Gap`/`Design Impact`/`Unclear`/`Local Fix`) | Evidence | Recommended Recipient |
| --- | --- | --- | --- |
|  |  |  |  |

## Investigation Decision

- Proceed To API/E2E Execution: `Yes` / `No`
- Repository-Resident Durable Coverage Will Be Added / Updated / Removed: `No` / `Yes`
- Post-repository confidence:
- Broader validation decision:
- Reroute Required Before Validation Execution: `No` / `Yes`
- Recommended Recipient If Reroute Required:
- Notes:
