# Future-State Runtime Call Stacks (Debug-Trace Style)

## Design Basis

- Scope Classification: `Medium`
- Call Stack Version: `v1`
- Requirements: [requirements.md](requirements.md) (`Design-ready`)
- Source Artifact: [proposed-design.md](proposed-design.md) (`v1`)
- Referenced Sections:
  - Data-flow spine inventory and primary spines
  - Ownership map and derived interface boundary mapping
  - Error handling and edge cases
  - Use-case coverage matrix

This is a future-state model for a text-defined agent package. The frame names are stable workflow sections rather than claims about executable functions in this repository.

## Use Case Index (Stable IDs)

| use_case_id | Spine ID(s) | Spine Scope | Governing Owner | Source Type | Requirement ID(s) | Design-Risk Objective | Use Case Name | Coverage Target |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-001 | DS-001, LS-001 | Primary End-to-End | Agent Team Architect skill | Requirement | FR-1, FR-2, FR-3, FR-5, FR-6, FR-7, FR-8, FR-9, FR-10 | N/A | Create a new agent-team package | Yes/Yes/Yes |
| UC-002 | DS-002, RS-001, LS-001 | Primary End-to-End | Agent Team Architect skill | Requirement | FR-1, FR-2, FR-4, FR-5, FR-6, FR-7, FR-8, FR-10 | N/A | Update an existing agent-team package | Yes/Yes/Yes |

## Transition Notes

- There is no migration path because the package is additive.
- If a result-based runtime lacks handoff rules, the future-state terminal path returns the persisted result to the caller instead of inventing a recipient.
- If the workflow finds an in-scope correctable defect, it re-enters the bounded local update loop for the affected canonical boundary before final classification.

## Use Case: UC-001 — Create a New Agent-Team Package

### Spine Context

- Spine ID(s): DS-001, LS-001
- Spine Scope: Primary End-to-End plus bounded local package-authoring cycle
- Governing Owner: `agent-team-architecture` skill
- Why This Use Case Matters To This Spine: It proves the new package is designed as a coherent set of owned files rather than a collection of disconnected prompts.

### Goal

Create a new agent-team package that follows the repository's current package, ownership, artifact, validation, and handoff conventions.

### Preconditions

- The user has supplied a team goal, constraints, and desired outcome.
- The target package does not already exist, or the caller has explicitly confirmed that a new package is intended.
- Applicable repository instructions and comparable packages are readable.
- Any material behavior, scope, destructive removal, or ambiguous ownership decisions are approved or explicitly recorded as unresolved.

### Expected Outcome

The required package files exist with coherent ownership, explicit runtime wiring, a complete team/agent/skill topology where applicable, validated references/configuration, and a persisted result envelope classified as `Completed` or a truthful blocked/clarification outcome.

### Primary Runtime Call Stack

```text
[ENTRY] user/calling-workflow:invokeAgentTeamArchitect(request)
├── agents/agent-team-architect/agent.md:establishArchitectIdentity(...)
├── agents/agent-team-architect/skills/agent-team-architecture/SKILL.md:selectMode(...) # selects create
├── agents/agent-team-architect/skills/agent-team-architecture/SKILL.md:readRepositoryContract(...) [IO]
├── agents/agent-team-architect/skills/agent-team-architecture/SKILL.md:designOwnershipAndTopology(...) [STATE]
├── agents/agent-team-architect/skills/agent-team-architecture/SKILL.md:createCanonicalPackageFiles(...) [IO]
├── agents/agent-team-architect/skills/agent-team-architecture/SKILL.md:reconcileCrossFileContracts(...) [STATE]
├── agents/agent-team-architect/skills/agent-team-architecture/SKILL.md:validatePackage(...) [IO]
├── agents/agent-team-architect/skills/agent-team-architecture/SKILL.md:writeResultEnvelope(...) [IO]
└── agents/agent-team-architect/skills/agent-team-architecture/SKILL.md:routeOrReturnResult(...) [ASYNC]
```

### Branching / Fallback Paths

```text
[FALLBACK] if an existing package with the requested identity is found
agents/agent-team-architect/skills/agent-team-architecture/SKILL.md:classifyExistingTarget(...)
└── select update mode or request caller confirmation; do not create a duplicate package
```

```text
[ERROR] if a material ownership or approval decision is unresolved
agents/agent-team-architect/skills/agent-team-architecture/SKILL.md:writeRequirementOrApprovalGap(...)
└── agents/agent-team-architect/skills/agent-team-architecture/SKILL.md:writeResultEnvelope(...)
```

```text
[ERROR] if package validation fails
agents/agent-team-architect/skills/agent-team-architecture/SKILL.md:recordValidationFinding(...)
└── agents/agent-team-architect/skills/agent-team-architecture/SKILL.md:reenterAffectedBoundaryOrBlock(...)
```

### State And Data Transformations

- User request -> normalized create request with target scope, constraints, and approval state.
- Repository conventions -> ownership and package-topology design.
- Design -> new canonical files and cross-file references.
- Validation observations -> result envelope with status, evidence, risks, and next action.

### Observability And Debug Points

- Persist the operation, target scope, chosen ownership boundaries, changed paths, and validation evidence in the result artifact.
- Persist unresolved approval/requirement gaps instead of silently converting them to success.
- Record the exact artifact paths supplied in the handoff.

### Design Smells / Gaps

- Any legacy/backward-compatibility branch present? `No`.
- Any tight coupling or cyclic cross-package dependency introduced? `No`.
- Any naming-to-responsibility drift detected? `No; validation must check this.`

### Open Questions

- If the caller does not provide a target location, the skill uses the repository's established package location after confirming the package type.

### Coverage Status

- Primary Path: `Covered by package and result-contract validation`.
- Fallback Path: `Covered by existing-target decision rule`.
- Error Path: `Covered by approval-gap and validation-finding rules`.

## Use Case: UC-002 — Update an Existing Agent-Team Package

### Spine Context

- Spine ID(s): DS-002, RS-001, LS-001
- Spine Scope: Primary End-to-End, return/event, and bounded local update cycle
- Governing Owner: `agent-team-architecture` skill
- Why This Use Case Matters To This Spine: It proves updates preserve the existing package's intended behavior while moving each changed rule to its canonical owner.

### Goal

Apply the smallest coherent change to an existing agent-team package. Optimization, repair, consistency correction, extension, and simplification are expressed as `update_intent` values rather than separate operation modes.

### Preconditions

- The target package and its relevant files are identifiable and readable.
- The user has described the desired delta, and any material behavior or scope change has approval or a visible decision point.
- The agent has read the current topology before editing.

### Expected Outcome

The affected package is updated at its canonical ownership boundaries, stale or duplicate paths are removed when in scope, cross-file configuration/references are reconciled, validation evidence is persisted, and the result envelope is classified as `Completed`, `Blocked`, `Requirement Gap`, or `Design Impact` as appropriate.

### Primary Runtime Call Stack

```text
[ENTRY] user/calling-workflow:invokeAgentTeamArchitect(request, existingPackage)
├── agents/agent-team-architect/agent.md:establishArchitectIdentity(...)
├── agents/agent-team-architect/skills/agent-team-architecture:selectMode(...) # selects update
├── agents/agent-team-architect/skills/agent-team-architecture:readExistingPackageTopology(...) [IO]
├── agents/agent-team-architect/skills/agent-team-architecture:classifyUpdateIntent(...) [STATE]
├── agents/agent-team-architect/skills/agent-team-architecture:mapCanonicalOwnersAndImpact(...) [STATE]
├── agents/agent-team-architect/skills/agent-team-architecture:applySmallestCoherentDelta(...) [IO]
├── agents/agent-team-architect/skills/agent-team-architecture:reconcileCrossFileContracts(...) [STATE]
├── agents/agent-team-architect/skills/agent-team-architecture:validatePackage(...) [IO]
├── agents/agent-team-architect/skills/agent-team-architecture:writeResultEnvelope(...) [IO]
└── agents/agent-team-architect/skills/agent-team-architecture:routeOrReturnResult(...) [ASYNC]
```

### Branching / Fallback Paths

```text
[FALLBACK] if the update affects only a skill
agents/agent-team-architect/skills/agent-team-architecture:mapCanonicalOwnersAndImpact(...)
└── update the owning skill/reference; keep agent shell and team routing unchanged unless evidence requires it
```

```text
[ERROR] if a requested update changes intended behavior without approval
agents/agent-team-architect/skills/agent-team-architecture:recordRequirementOrApprovalGap(...)
└── agents/agent-team-architect/skills/agent-team-architecture:writeResultEnvelope(...)
```

```text
[ERROR] if validation exposes an ownership or cross-file consistency defect
agents/agent-team-architect/skills/agent-team-architecture:recordValidationFinding(...)
└── agents/agent-team-architect/skills/agent-team-architecture:applySmallestCoherentDelta(...) [ASYNC]
```

```text
[FALLBACK] if no conditional handoff rule matches
agents/agent-team-architect/skills/agent-team-architecture:callGetHandoffRules(...)
└── user/calling-workflow:returnResult(resultEnvelope, artifactPaths)
```

### State And Data Transformations

- User request + existing package -> normalized update request with `update_intent`.
- Existing topology + repository conventions -> impacted-file and canonical-owner map.
- Approved delta -> updated package files and removed stale paths when explicitly in scope.
- Validation observations -> result envelope with status, evidence, residual risks, and next action.

### Observability And Debug Points

- Record the baseline package paths and intended behavior before applying changes.
- Record every changed/removed path and its owning rule.
- Record validation commands/results and any unresolved gap.
- Record the exact cumulative artifact paths in the result and handoff.

### Design Smells / Gaps

- Any legacy/backward-compatibility branch present? `No; obsolete paths are removed when the approved update makes them unnecessary.`
- Any tight coupling or cyclic cross-package dependency introduced? `No; recipient selection remains outside the skill.`
- Any naming-to-responsibility drift detected? `Validation checks this before completion.`

### Open Questions

- If the requested update spans multiple package owners and the correct ownership boundary is unclear, return a visible clarification/requirement gap instead of choosing silently.

### Coverage Status

- Primary Path: `Covered by update-flow and cross-file contract checks`.
- Fallback Path: `Covered by update-intent and zero-match handoff rules`.
- Error Path: `Covered by approval-gap and validation re-entry rules`.
