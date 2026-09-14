# Requirements — Merge Solution Designer

## Current Approved Revision — Design Before Classification

The later user clarification supersedes the original requirements-only bypass:
Solution Designer completes investigation and requirements, obtains explicit user
approval, completes a proportionate design spec, then classifies task size/risk and
uses configured handoff rules. Every implementation package carries design;
Small/Medium Low-risk packages may bypass independent reviews, not design.
The current implementation and validation record is
`.codex/artifacts/solution-designer-consistency-audit/optimization-analysis.md` and
its linked `validation.md`. Earlier sections below describe the prior merge round
and are historical where they conflict with this revision.

Status: Design-ready

## Goal
Restore one Solution Designer owning investigation, requirements engineering and architecture design, preserving the improved current practices instead of reverting to main.

## Approved intent
The user approved the prior analysis: merge ownership, preserve disciplines, keep explicit requirements approval before architecture design and renewed approval for changed intended behavior. Preserve bounded direct implementation and independent downstream specialists. Update current repository only; preserve existing uncommitted improvements. No commit/push/merge until user verification.

## Initial scope
Consolidate the two agent/skill packages, canonical investigation and revision ownership, team configuration, downstream contracts and README references. Validate topology, references and representative workflow scenarios.

## Refined requirements and acceptance criteria
Scope: Medium. Refined from the initial Draft capture after investigation.
Approval: Prior analysis explicitly approved by "great. lets do the change"; topology clarified and confirmed in subsequent user messages specifying Department Head and engineering-team Solution Designer.

| Requirement | Expected behavior | Acceptance criterion | Use case / validation scenario |
|---|---|---|---|
| REQ-001 | One combined Solution Designer coordinates Software Engineering Team | AC-001: exactly one solution_designer in expanded department graph; neither removed role is live | UC-001 / topology |
| REQ-002 | Thin Department Head is department entrypoint, without technical ownership | AC-002: valid direct coordinator with ingress and terminal routes; no requirements/design work assigned | UC-001 / intake-terminal |
| REQ-003 | Preserve evidence-grounded requirements and architecture disciplines with approval boundary | AC-003: standards/templates cover scenarios, stable IDs, evidence, readiness, approval-before-design and material reapproval | UC-002 / approval-recovery |
| REQ-004 | One canonical investigation and cumulative solution revision record | AC-004: requirements/design/reviewer consumers reference solution-revision-record.md (SR-*); evidence lives in investigation notes | UC-002 / artifact-contract |
| REQ-005 | Preserve safe direct implementation and conditional independent review | AC-005: disjoint direct, low-risk designed and Large/High designed routes; uncertainty never silently direct | UC-003 / route-matrix |
| REQ-006 | Product remains independent and exchanges directly with Solution Designer | AC-006: cross-team Product edges bypass Department Head; explicit user intent and Product ownership preserved | UC-004 / product-loop |
| REQ-007 | Preserve recovery, informational notices and truthful terminal delivery | AC-007: upstream findings return to solution owner, local/failure-origin routes preserved; delivery evidence before terminal | UC-005 / recovery-terminal |
| REQ-008 | Coherent packages and preserve existing improvements | AC-008: JSON, metadata, skill links, symlinks, old-role cleanup and documentation checks pass; baseline safeguards retained | UC-001–005 / package-validation |

## Non-goals and assumptions
No edits to related repositories, no runtime tool changes, no independent reviewer removal, no Product mode or repository takeover, no broad unrelated skill optimization. Department Head defaults all software-department intake to Solution Designer and does not become a stage relay. Existing per-specialist downstream revision logs remain separate; only requirements/design logs consolidate. No publication or finalization in this turn without explicit user verification.

## Open risks
Natural-language routing and actual model compliance cannot be proven by static checks alone; report the real-team-run limitation explicitly.
