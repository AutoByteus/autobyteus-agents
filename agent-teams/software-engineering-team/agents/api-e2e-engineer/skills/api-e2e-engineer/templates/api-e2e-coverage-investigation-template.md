# API/E2E Coverage Investigation

The plan: what must be proven, how, the decisions about existing tests, and the planned cases. Results, confidence scores and the broader-validation decision go in the execution coverage report.

Write this artifact to a canonical file path in the assigned task workspace before final test execution, durable coverage edits, durable coverage removals, or failure rerouting.

Keep one canonical investigation path across reruns.
Do not create versioned copies by default.
Update this artifact whenever new evidence changes a test-validity or coverage decision.
Omit a section marked `(When Applicable)` when it does not apply. For any other table with nothing to record, write `None`.

## Investigation Meta

- Requirements Doc:
- Investigation Notes:
- Solution Revision Record:
- Design Spec (required on every route):
- Supplemental Task Artifacts:
- Design Review Report: `N/A — not applicable` when architecture review was not selected
- Architecture Review Revision Record: `N/A — not applicable` when architecture review was not selected
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

## Current Requirement And Design Basis

Summarize the current behavior that must be proven from the approved requirements, acceptance criteria, completed design spec with applicable review evidence, applicable supplemental task artifacts and revision records, implementation handoff, and applicable review artifacts. Record `N/A — not applicable` for independent architecture-review or source-review artifacts omitted by the direct route; the design spec remains required.

## Supported Scenarios And Real Usage

- Designer scenarios covered (`SCN-*`):
- Real-use scenarios added from investigating the implemented behavior, each with its real trigger:
- Designer scenarios recorded as `Technically Possible but Unsupported/Contrived` (not tested):

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
- Project testing guideline path(s), or `No project testing guideline found`:
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

| Path / Test | Current Assertion Or Intent | Related Requirement / Acceptance Criteria / Design | Validity Decision (`Still Valid`/`Needs Update`/`Stale / Remove`/`Replace`/`Out Of Scope`/`Unclear`) | Evidence | Action |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

Decision rules:
- `Still Valid`: the assertion still represents approved current behavior.
- `Needs Update`: the scenario remains useful, but setup, assertions, fixtures, or expected output must change.
- `Stale / Remove`: the scenario asserts obsolete behavior that is intentionally removed or no longer meaningful.
- `Replace`: the old scenario should be removed or retired because a different scenario now proves the current boundary better.
- `Out Of Scope`: the artifact is not relevant to this task's changed behavior.
- `Unclear`: upstream requirements or design do not decide the test's validity.

## Planned Cases

Every case you plan to run, repository checks and broader journeys alike, narrowest first. The execution report's Cases table records each one under the same ID.

| Case ID | Criteria (AC / Requirement IDs) | Boundary / Surface | Kind (`Durable`/`Existing Test`/`Temporary Probe`/`Journey`) | Planned Command Or Steps | For A Temporary Probe: Why It Should Not Stay As Durable Coverage |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

- Test progress log needed (more than one case, or a long case): `Yes` / `No`

## Durable Coverage To Add

The case's criteria and boundary are in Planned Cases above.

| Case ID | Planned Test Path | Why Durable Coverage Is Needed |
| --- | --- | --- |
|  |  |  |

## Durable Coverage To Update

| Case ID | Existing Path / Test | Required Update | Notes |
| --- | --- | --- | --- |
|  |  |  |  |

## Durable Coverage To Remove

Complete this before deleting or disabling existing durable coverage.

| Existing Path / Test | Obsolete Assertion And Why | Requirement / Acceptance Criteria / Design Evidence | Replacement Coverage Or No-Replacement Rationale |
| --- | --- | --- | --- |
|  |  |  |  |

## Desktop Application Validation Plan (When Applicable)

- Desktop framework / shell:
- Testing guideline, README, or development instructions used:
- Web-equivalent behavior:
- Shell-specific or lifecycle behavior:
- Chosen validation approach and why it fits the project:
- Server/frontend setup when browser validation is used:
- How the run avoids disturbing an already-running desktop application:

## Live Environment And Fixture Plan (When Broader Validation Is Likely)

- Startup order and commands:
- Environment choices that materially affect the run:
- Health / readiness checks:
- Seed data / fixtures:
- Test identities, authentication, permissions, or session state:
- Requirement-linked journeys or scenarios:
- DOM, screenshot, log, API, process, or other evidence to capture:
- Owned processes and temporary state to clean up:

## Not Tested / Infeasible / Deferred

| Behavior / Boundary | Reason | Risk | Only The User Can Check? (`Yes`/`No`) | Required Follow-Up Or Escalation |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Ambiguities Or Reroute Triggers

| Issue | Classification (`Requirement Gap`/`Design Impact`/`Unclear`/`Local Fix`) | Evidence | Recommended Owner |
| --- | --- | --- | --- |
|  |  |  |  |

## Investigation Decision

- Proceed To API/E2E Execution: `Yes` / `No`
- Repository-Resident Durable Coverage Will Be Added / Updated / Removed: `No` / `Yes`
- Reroute Required Before Validation Execution: `No` / `Yes`
- Recommended Owner If Reroute Required:
- Notes:
