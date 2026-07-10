# API/E2E Coverage Investigation

Write this artifact to a canonical file path in the assigned task workspace before final test execution, durable coverage edits, durable coverage removals, or failure rerouting.

Keep one canonical investigation path across reruns.
Do not create versioned copies by default.
Update this artifact whenever new evidence changes a test-validity or coverage decision.

## Contents

- [Project Execution Discovery](#project-execution-discovery)
- [Current Requirement And Design Basis](#current-requirement-and-design-basis)
- [Existing Durable Coverage Inventory](#existing-durable-coverage-inventory)
- [Repository Coverage Execution Plan And Results](#repository-coverage-execution-plan-and-results)
- [Post-Repository Confidence Scorecard](#post-repository-confidence-scorecard-mandatory)
- [Live-System / Browser Validation Decision](#live-system--browser-validation-decision-mandatory)
- [Investigation Decision](#investigation-decision)

## Investigation Meta

- Requirements Doc:
- Investigation Notes:
- Design Spec:
- Supplemental Solution Artifacts:
- Design Review Report:
- Implementation Handoff:
- Code Review Report:
- Current Investigation Round:
- Trigger:
- Prior Investigation Reviewed:
- Latest Authoritative Investigation:

## Project Execution Discovery

- Assigned task worktree / workspace:
- Project type and runtime stack:
- Conflicting, missing, or unclear project instructions:
- Required environment variables or secrets available: `Yes` / `No` / `N/A` (do not record secret values)

| Instruction / Configuration Path | Authority / Purpose | Commands, Setup, Or Constraints Learned |
| --- | --- | --- |
|  |  |  |

| Component / Dependency | Working Directory | Start / Setup Command | Isolated Port / Resource | Readiness Check | Stop / Cleanup Method |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

| Data / Fixture / Identity Need | Existing Project Mechanism Or Creation Method | Worktree Isolation | Cleanup / Retention |
| --- | --- | --- | --- |
|  |  |  |  |

## Current Requirement And Design Basis

Summarize the current behavior that must be proven from the approved requirements, acceptance criteria, reviewed design, applicable supplemental solution artifacts, implementation handoff, and code review report.

## Changed Behavior Summary

Identify behavior added, changed, removed, or intentionally preserved.

| Behavior / Boundary | Change Type (`Added`/`Changed`/`Removed`/`Preserved`/`Unclear`) | Upstream Evidence | Coverage Consequence |
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
| Native / lifecycle / process |  |  |  |  |  |
| Migration / persisted state |  |  |  |  |  |
| Worker / queue / distributed coordination |  |  |  |  |  |
| External integration |  |  |  |  |  |

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
| User-surface and browser confidence |  |  |  |  |
| Durable regression coverage quality and relevance |  |  |  |  |

- Overall post-repository confidence:
- Calculation method:
- Every critical acceptance criterion directly proven: `Yes` / `No`
- Any applicable category below `90%`: `No` / `Yes` — list:
- Default clean-confidence target of `95%` met: `Yes` / `No`
- Material residual risks:

## Live-System / Browser Validation Decision (Mandatory)

- Decision: `Required` / `Not Required` / `Blocked`
- Selected execution mode (`Browser`/`Live API`/`Native`/`CLI`/`Lifecycle`/`Worker or Distributed`/`Other`/`None`):
- Specific confidence gap or residual risk addressed:
- Why the selected mode can materially improve confidence:
- Expected confidence after the selected validation:
- Browser-specific decision and rationale:
- If `Not Required`, evidence proving the real changed boundary without broader execution:
- If `Blocked`, exact dependency or access that remains unavailable after safe setup/emulation attempts:

## Live Environment And Fixture Plan (Required When Broader Validation Runs)

- Startup order and commands:
- Worktree-specific ports, databases, storage, caches, and temporary paths:
- Health / readiness checks:
- Seed data / fixtures:
- Test identities, authentication, permissions, or session state:
- Requirement-linked journeys or scenarios:
- DOM, screenshot, log, API, process, or other evidence to capture:
- Owned processes and temporary state to clean up:

## Persisted Data Migration Coverage Basis (When Applicable)

- Persisted data shape changed: `No` / `Yes`
- Supported source schema/version and target schema/version:
- Approved migration trigger, owner, ordering, and completion gate:
- Representative source-data fixtures or setup:
- Target-schema validation scenario:
- Post-migration latest-schema-only runtime scenario:
- Interruption, restart-safety/idempotency, and recovery scenarios required by risk/design:
- Mixed-version access prevention or cutover/deployment-sequencing scenario, when applicable:
- Runtime compatibility scenarios intentionally excluded:
- Upstream ambiguity or reroute required:

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

## Execution Plan

State the ordered plan for durable coverage changes, temporary probes, final command execution, and evidence collection.

## Investigation Decision

- Proceed To API/E2E Execution: `Yes` / `No`
- Repository-Resident Durable Coverage Will Be Added / Updated / Removed: `No` / `Yes`
- Post-repository confidence:
- Live-system / browser validation decision:
- Reroute Required Before Validation Execution: `No` / `Yes`
- Recommended Recipient If Reroute Required:
- Notes:
