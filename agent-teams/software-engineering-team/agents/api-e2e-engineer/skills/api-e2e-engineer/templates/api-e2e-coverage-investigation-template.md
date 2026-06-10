# API/E2E Coverage Investigation

Write this artifact to a canonical file path in the assigned task workspace before final test execution, durable coverage edits, durable coverage removals, or failure rerouting.

Keep one canonical investigation path across reruns.
Do not create versioned copies by default.
Update this artifact whenever new evidence changes a test-validity or coverage decision.

## Investigation Meta

- Requirements Doc:
- Investigation Notes:
- Design Spec:
- Design Review Report:
- Implementation Handoff:
- Code Review Report:
- Current Investigation Round:
- Trigger:
- Prior Investigation Reviewed:
- Latest Authoritative Investigation:

## Current Requirement And Design Basis

Summarize the current behavior that must be proven from the approved requirements, acceptance criteria, reviewed design, implementation handoff, and code review report.

## Changed Behavior Summary

Identify behavior added, changed, removed, or intentionally preserved.

| Behavior / Boundary | Change Type (`Added`/`Changed`/`Removed`/`Preserved`/`Unclear`) | Upstream Evidence | Coverage Consequence |
| --- | --- | --- | --- |
|  |  |  |  |

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
- Reroute Required Before Validation Execution: `No` / `Yes`
- Recommended Recipient If Reroute Required:
- Notes:
