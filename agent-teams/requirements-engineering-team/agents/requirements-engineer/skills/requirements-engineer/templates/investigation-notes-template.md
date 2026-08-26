# Requirements Investigation Notes

Write this artifact to `investigation-notes.md` in the assigned task workspace.
Keep evidence, sources, observations, and unknowns here rather than overloading the requirements document.

## Investigation Meta

- Request / ticket:
- Workspace root:
- Repository mode: `Git` / `Non-Git`
- Task worktree / branch:
- Base or reference revision:
- Bootstrap result:
- Bootstrap blocker:
- Current requirements revision ID: `RER-*` / `N/A`
- Investigation status:

## Initial Request And Clarifications

- Original request:
- Clarifications received:
- User-supplied facts and constraints:
- Initial ambiguity:

## Product And Domain Understanding

- Product area:
- Affected actors or systems:
- Existing user or operational purpose:
- Relevant terminology:

## Source Log

| Date | Source Type (`Code`/`Doc`/`Runtime`/`Data`/`Contract`/`Web`/`User`/`Command`/`Other`) | Exact Source / Command / Query | Why Consulted | Relevant Finding | Follow-Up |
| --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD |  |  |  |  |  |

## Relevant Existing Behavior And Production Paths

Use stable behavior IDs and supported product or contract evidence. A behavior may be user, system, operational, or contract driven.

| Behavior ID | Kind | Supported Trigger Or Governing Contract | Current Production Path / Lifecycle | Current Outcome / Invariants | Evidence | Confidence / Unknown |
| --- | --- | --- | --- | --- | --- | --- |
| BEH-001 |  |  |  |  |  |  |

Record `No current supported behavior` for genuinely new behavior. Do not treat synthetic tests, direct internal calls, manual file manipulation, or corruption as a supported product path unless an explicit operational or governing contract makes them relevant.

## Relevant Codebase And Technical Facts

| Path / Component / Contract | Current Responsibility Or Behavior | Requirement Implication | Architecture Question Deferred Downstream |
| --- | --- | --- | --- |
|  |  |  |  |

## Structural And Payload Surface Inventory

Use this inventory to support the later Architecture Design Routing
Assessment. Keep the evidence factual; do not design the target architecture.

### Payload Or Content Surfaces

- Files, records, documents, catalogs, fixtures, or generated payloads:
- Existing readers, writers, or contracts that consume them:
- Evidence paths:

### Structural Surfaces

- Runtime modules, shared interfaces, routes, APIs, persistence boundaries,
  security/concurrency controls, deployment configuration, or ownership
  boundaries:
- Existing structural surfaces that can support the approved behavior:
- Evidence paths:

### Potential Architecture-Design Triggers

- API or external-contract change:
- Persistence schema or invariant change:
- Security or privacy boundary change:
- Concurrency or lifecycle change:
- Deployment, migration, ownership-boundary, architectural-pattern, or
  structural-refactoring change:
- Confirmed absent, present, or unknown:

## Runtime, Probe, Or Reproduction Findings

| Method / Command | Scenario | Observation | Requirement Implication | Artifact / Evidence Path |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Stakeholder And User Evidence

| Source / Actor | Need, Problem, Or Constraint | Evidence Strength | Requirement Implication | Open Question |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## External Contracts, Standards, And Dependencies

| Contract / Dependency | Version / Authority | Relevant Behavior Or Constraint | Evidence | Unknown / Risk |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Persisted Data And State Facts

- Affected stored or external subject:
- Location and representative shape:
- Approximate volume:
- Current readers and writers:
- Current unknown/extra-field behavior:
- Required semantics or data that must be preserved:
- Acceptable loss, reset, rebuild, or regeneration:
- Privacy, retention, compliance, downtime, or operational constraints:
- Remaining evidence gap:

## Product Prototype Decision

- Prototype needed: `Yes` / `No` / `Undetermined`
- Decision rationale:
- Requirement / behavior IDs involved:
- Product decisions or uncertainties to resolve:
- Critical journey and states:
- Known constraints and non-goals:
- Alternative evidence path / next action when no prototype is used:
- Prototype request artifact / message reference:
- Established separate prototype repository/root and ticket reference, when applicable:

## Prototype Findings

- Prototype package path (external Product Design & Prototyping repository):
- Approved UI/UX specification path:
- Review URL:
- Explicit user-confirmation reference:
- Journeys and scenarios validated:
- Final visual-reference paths:
- Product decisions supported by evidence:
- Alternatives rejected or still open:
- Mocked boundaries and production gaps:
- Requirements sections affected:

## Supplemental Artifact Inventory

| Artifact Path | Owner | Purpose | Scope | Related Requirement / AC IDs | Status | Approval Applicability / State |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## Assumptions, Unknowns, And Risks

| ID | Type (`Assumption`/`Unknown`/`Risk`) | Description | Why It Matters | Resolution / Owner | Status |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Requirement Implications

Summarize the evidence that materially shaped current behavior, desired behavior, scope, acceptance criteria, quality constraints, data-continuity requirements, or open decisions.

## Notes For Downstream Architecture Design Or Direct Implementation

Record verified constraints, relevant current implementation facts, and
technical questions that the downstream route should address. Direct
implementation may use this evidence without inventing target architecture;
Architecture Designer uses it for architecture-owned decisions. Do not
prescribe the target structure here.
