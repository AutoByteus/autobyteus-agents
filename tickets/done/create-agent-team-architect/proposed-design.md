# Proposed Design Document

## Design Version

`v1`

## Revision History

| Version | Date | Change | Reason |
| --- | --- | --- | --- |
| v1 | 2026-08-31 | Initial design for a standalone Agent Team Architect with `create` and `update` modes. | User-selected two-mode architecture grounded in repository package and optimization practices. |

## Artifact Basis

- Requirements: [requirements.md](requirements.md) (`Design-ready`)
- Investigation: [investigation-notes.md](investigation-notes.md)
- Repository contract: [README.md](../../../README.md)
- Shared design doctrine: [design-principles.md](../../../.codex/skills/software-engineering-workflow-skill/shared/design-principles.md)
- Optimization doctrine: [optimization-rubric.md](../../../.codex/skills/skill-optimizer/references/optimization-rubric.md)

## Terminology

- **Agent Team Architect:** the standalone agent that designs new agent-team packages and updates existing packages.
- **Create mode:** the operation used when no existing target package is being evolved.
- **Update mode:** the operation used for any change to an existing package. Optimization, repair, consistency correction, extension, and simplification are update intents, not modes.
- **Package contract:** the repository's coordinated set of `agent.md`, `agent-config.json`, `team.md`, `team-config.json`, skills, references/templates, and README documentation as applicable.
- **Result envelope:** the durable outcome artifact created before routing, containing status, operation, update intent when relevant, changed paths, evidence, risks, and next action.

## Design Reading Order

1. Summary and goal.
2. Data-flow spines and ownership map.
3. Package topology and mode workflow.
4. Validation, recovery, and handoff boundaries.
5. Change inventory and file mapping.

## Reading Rule

The skill is the runtime work contract. The agent shell supplies identity and the post-work transition. The references provide detailed design principles and the result schema. README only describes the agent for human readers. No file should become a second complete workflow.

## Summary

Add a standalone `Agent Team Architect` under `agents/agent-team-architect/`. Attach one bundled skill, `agent-team-architecture`, and expose two user-facing operation modes: `create` and `update`. The skill owns package inspection, ownership design, minimal coherent edits, artifact production, validation, recovery, and result-based handoff. `team-config.json` is not added because this is a standalone agent rather than a team package.

## Goal / Intended Change

Provide one reusable package architect for agent-team creation and evolution. The agent must be capable of creating a new team definition or updating an existing definition without conflating package architecture with the work performed by the target team's domain specialists.

## Legacy Removal Policy (Mandatory)

No existing runtime behavior is being replaced. Do not add compatibility wrappers, duplicate skills, or a second optimizer/repair/audit agent for this scope. The new package is a clean addition. Any future update of an existing target package should remove obsolete or duplicate paths when the approved update makes them unnecessary.

## Requirements And Use Cases

- `UC-001`: create a new agent-team package.
- `UC-002`: update an existing agent-team package.
- Requirements `FR-1` through `FR-10` and acceptance criteria `AC-1` through `AC-7` are defined in [requirements.md](requirements.md).

## Current-State Read

The repository already contains two relevant patterns:

- `agents/skill-optimizer/` is a standalone skill-focused agent with a thin shell and explicit skill wiring.
- `agent-teams/evidence-driven-delivery-team/agents/planner/` is a team-local specialist with a bundled skill, explicit result-based handoff tools, and a thin shell.

README's package contract assigns identity to `agent.md`, runtime wiring to `agent-config.json`, detailed behavior to `SKILL.md`, reusable guidance to references/templates, and conditional recipient selection to `team-config.json` when a team exists.

## Current State (As-Is)

There is no standalone agent responsible for designing or evolving agent-team packages. The existing Skill Optimizer addresses skill-level optimization, not the package-level topology, role boundaries, team routing, and cross-file consistency of an agent-team definition.

## Data-Flow Spine Inventory

| spine_id | scope | start | end | owner | why the spine matters |
| --- | --- | --- | --- | --- | --- |
| DS-001 | Primary End-to-End | User request for a new team | Validated create result and handoff | Agent Team Architect / `agent-team-architecture` | Covers the complete creation operation from intent through durable package output. |
| DS-002 | Primary End-to-End | User request to change an existing team | Validated update result and handoff | Agent Team Architect / `agent-team-architecture` | Covers the complete update operation while preserving existing behavior and ownership. |
| RS-001 | Return-Event | Validation or approval finding | Revised package or explicit blocked/clarification result | Agent Team Architect | Makes recovery and user-authority decisions visible instead of silently continuing. |
| LS-001 | Bounded Local | Selected operation and target scope | Result envelope ready for validation | Agent Team Architect / skill | Shows the local inspect -> design -> edit -> reconcile cycle shared by both modes. |

## Primary Execution / Data-Flow Spine(s)

- **DS-001:** `user request -> Agent Team Architect -> repository convention and target-scope read -> ownership/topology design -> new agent/team/skill artifacts -> structural validation -> result envelope -> conditional handoff or caller return`
- **DS-002:** `user request + existing package -> Agent Team Architect -> current package and impact read -> update intent and smallest coherent delta -> canonical file edits -> cross-file reconciliation -> structural validation -> result envelope -> conditional handoff or caller return`

## Spine Actors / Main-Line Nodes

- **User or calling workflow:** supplies the requested team outcome, constraints, existing package reference, and approval decisions.
- **Agent Team Architect shell:** establishes the package-architect identity and attaches the skill; it does not own detailed workflow logic.
- **`agent-team-architecture` skill:** owns operation selection, package inspection, design, changes, artifacts, validation, recovery, and handoff procedure.
- **Repository package topology:** provides authoritative existing patterns and target files; it is read and updated only within the approved scope.
- **Result envelope:** records the completed operation and evidence used by routing and the caller.
- **Handoff tools / caller:** consume the result; conditional routing is external to the standalone skill unless the runtime provides team rules.

## Spine Narratives (Mandatory)

### Create spine

The Architect first determines that no existing package is the target of evolution, reads the applicable package contract and comparable definitions, designs ownership and routing, creates only the files needed for the approved package, validates names/links/configuration and cross-file consistency, then writes the result envelope before resolving handoff rules.

### Update spine

The Architect reads the complete target topology before editing, records the requested update intent, identifies the canonical owner of each affected rule, applies the smallest coherent change, removes obsolete or duplicate paths when the approved design requires it, validates the full affected topology, and writes a cumulative result envelope. The update path does not implement domain work owned by the target team's specialists.

## Ownership Map

| Concern | Canonical owner | Responsibility | Boundary |
| --- | --- | --- | --- |
| Agent identity and runtime stance | `agent.md` | Name, role, attached skill, thin post-work transition | No detailed workflow or routing matrix. |
| Runtime wiring | `agent-config.json` | `skillNames` plus file and handoff tools | No behavior prose or routing conditions. |
| Architect workflow | `skills/agent-team-architecture/SKILL.md` | Two modes, inputs, decisions, artifacts, validation, recovery, result classification, handoff procedure | No hard-coded recipient addresses or duplicate README contract. |
| Detailed design doctrine | `references/agent-team-design-principles.md` | Package ownership, topology, scope, and cross-file design checks | No competing operation flow. |
| Result and handoff schema | `references/result-and-handoff-contract.md` and result template | Required result fields and handoff payload | No recipient selection or team-specific routing. |
| Human-facing description | `README.md` | Concise discoverability and purpose | No full runtime procedure. |
| Conditional recipients | Containing runtime/team `team-config.json` | Actual handoff rules and canonical recipient addresses when applicable | Not owned by the standalone package. |

## Return / Event Spine(s) (If Applicable)

`validation finding or unresolved approval -> classify as update-needed, requirement/approval gap, or blocked -> persist finding and required next action -> revise the affected canonical package files when authorized, or return the unresolved decision to the caller -> revalidate before final result.`

## Bounded Local / Internal Spines (If Applicable)

Both modes use the same local cycle:

`read inputs and target topology -> select operation and update_intent -> map ownership and impacted files -> design/create/update -> reconcile references and configuration -> run structural checks -> write result envelope`.

If validation finds a correctable in-scope defect, the cycle repeats only for the affected package boundary. If the defect changes user-visible behavior or requires an ambiguous scope decision, the cycle stops with a requirement/approval gap rather than guessing.

## Off-Spine Concerns Around The Spine

- **Repository convention reader:** reads README, AGENTS.md, comparable packages, and applicable skills; it provides evidence but does not become a shipped helper.
- **Ownership ledger:** records which file owns each rule and detects duplicated or competing guidance; it remains part of the skill's artifact process.
- **Validation checks:** parse JSON, inspect frontmatter/names, resolve local references, and compare cross-file contracts; they prove readiness but do not select recipients.
- **User approval boundary:** blocks material scope, behavior, destructive removal, or unresolved ownership changes; it is an authority rule, not a second mode.

No new runtime subsystem or helper layer is needed. These are workflow concerns owned by the Architect skill.

## Existing Capability / Subsystem Reuse Check

- Reuse the repository README package contract and existing agent/team examples rather than inventing a parallel package format.
- Reuse the existing `Skill Optimizer` as a reference for optimization quality; do not attach or duplicate it as a second runtime skill for the Architect.
- Reuse the repository's `get_handoff_rules` and `send_message_to` convention when the runtime supports result-based team handoff.
- No new scripts are required for the first version; deterministic checks can use the agent's existing file and shell tools.

## Subsystem / Capability-Area Allocation

- **Standalone agent package:** identity and runtime wiring.
- **Bundled skill:** architecture workflow and artifact contracts.
- **Bundled references/templates:** stable principles and result shape.
- **Repository README:** discoverability.
- **Runtime team configuration:** conditional recipient selection when an external team embeds or invokes the agent.

## Ownership-Driven Dependency Rules

- README may point to package guidance; the skill may point to references; references must not redefine the main operation flow.
- The agent shell depends on the bundled skill; it does not bypass the skill by embedding its detailed workflow.
- Result routing depends on the completed result and `get_handoff_rules`; the skill does not depend on hard-coded recipient names.
- Target team specialists remain authoritative for their own domain work; the Architect may edit their package definitions only within the approved package-architecture scope.
- A target package's `team.md` and member skills must not be collapsed into one Architect-owned runtime prompt.

## Architecture Direction Decision (Mandatory)

Use one standalone agent with one bundled skill and two user-facing operation modes. Keep create/update as modes because they share the same package-architecture spine and differ mainly in whether an existing topology must be preserved and reconciled. Keep optimization, repair, audit, verification, extension, and simplification as update intents or internal checks because splitting them would duplicate the same inspection, ownership, artifact, and validation workflow.

Do not create a separate `AgentTeamOptimizer`, `AgentTeamImprovementsAgent`, or `AgentTeamCreationOptimizerAgent` in this change.

## Common Design Practices Applied (If Any)

- Thin agent shell; skill-owned behavior.
- One canonical owner per rule.
- File-backed result before handoff.
- Outcome-based conditional handoff rather than hard-coded linear recipients.
- Macro structure and ownership before wording-level optimization.
- Positive operating contracts with only boundary-protecting negative rules.
- Clean-cut package additions without compatibility wrappers or duplicate modes.

## Ownership And Structure Checks (Mandatory)

- The agent shell, config, skill, references, template, and README each have distinct responsibilities.
- The target package remains a standalone agent package; no empty team wrapper or pass-through coordinator is introduced.
- The skill's two modes share one coherent workflow and do not create parallel skill packages.
- Result routing is kept outside the skill's recipient selection boundary.

## Optional Alternatives (Use For Non-Trivial Or Uncertain Changes)

- **Separate Create and Update agents:** rejected because they would duplicate package inspection, ownership mapping, validation, and artifact/handoff behavior; the user selected one agent.
- **Separate creation and optimization skills:** rejected for v1 because the two workflows share the same package contract and only differ in target existence/update intent.
- **Shared standalone skill source:** rejected because this skill is initially owned by one agent and does not need to be attached elsewhere.
- **Dedicated audit/verification mode:** rejected because these are validation steps inside both operations, not user goals.

## Change Inventory (Delta)

### Add

- `agents/agent-team-architect/agent.md`
- `agents/agent-team-architect/agent-config.json`
- `agents/agent-team-architect/skills/agent-team-architecture/SKILL.md`
- `agents/agent-team-architect/skills/agent-team-architecture/references/agent-team-design-principles.md`
- `agents/agent-team-architect/skills/agent-team-architecture/references/result-and-handoff-contract.md`
- `agents/agent-team-architect/skills/agent-team-architecture/templates/agent-team-result-template.md`
- A concise standalone-agent entry in `README.md`.

### Modify

- Ticket artifacts only: requirements, design, runtime model, review, and handoff records.

### Rename/Move

- None.

### Remove

- None from the existing repository.

## Removal / Decommission Plan (Mandatory)

No existing files are removed. The design explicitly decommissions the idea of separate create/optimizer/audit/repair agents for this scope by representing those needs as one update mode plus internal checks. If a future package update introduces duplicate or stale guidance, the Architect's update workflow must remove the obsolete owner rather than retain parallel paths.

## Draft File Responsibility Mapping

| File | Draft responsibility |
| --- | --- |
| `agent.md` | Thin identity, skill authority, result-based handoff reminder. |
| `agent-config.json` | Explicit skill and runtime tools. |
| `SKILL.md` | Primary create/update work contract. |
| `agent-team-design-principles.md` | Detailed package architecture and ownership checks. |
| `result-and-handoff-contract.md` | Result envelope and handoff field requirements. |
| `agent-team-result-template.md` | Durable result artifact skeleton. |
| `README.md` | Human-facing summary and package discoverability. |

## Reusable Owned Structures Check (If Needed)

The result envelope is reused by both create and update. Give it one template/reference owner instead of defining separate result schemas per mode. The update intent is a field in that shared envelope, not a new artifact type.

## Shared Structure / Data Model Tightness Check

The result contract should use a small set of singular fields: operation, update intent when applicable, status, target scope, changed paths, artifacts, validation, approval state, risks/questions, and next action. Avoid a generic bag of optional mode-specific fields that makes the result ambiguous.

## Final File Responsibility Mapping

The draft mapping is retained. The skill will link directly to both references and the template, and the README will describe the agent without restating the workflow.

## Derived Implementation Mapping (Secondary)

- Create the package directory and files under `agents/agent-team-architect/`.
- Use frontmatter names `Agent Team Architect` for `agent.md` and `agent-team-architecture` for `SKILL.md`.
- Configure `skillNames: ["agent-team-architecture"]` and include file, shell, and result-handoff tools.
- Insert the README entry after `Skill Optimizer` in `## Standalone Agents`.

## File Placement And Ownership Check (Mandatory)

The package stays under `agents/` because it is standalone. The skill is under the agent's `skills/` folder because only this agent owns it. References and the result template sit beneath the skill because they are reusable within this package and should not become repository-wide sources without a second consumer.

## Concrete Examples / Shape Guidance (Mandatory When Needed)

Good mode shape:

```text
user request -> select create/update -> inspect package -> design/update canonical owners -> validate -> persist result -> route by handoff rules
```

Bad mode shape:

```text
create agent -> optimizer agent -> audit agent -> verifier agent -> hard-coded recipient
```

The bad shape duplicates ownership and turns quality checks into separate coordinators without independent responsibilities.

## Backward-Compatibility Rejection Log (Mandatory)

- No compatibility wrapper between old and new agents is required.
- No duplicate create/optimizer/repair path is retained.
- No alternate package format is introduced.

## Derived Interface Boundary Mapping

| Boundary | Input | Output | Owner |
| --- | --- | --- | --- |
| User/caller -> Architect | Goal, operation context, target package, constraints, approvals | Ready request context or clarification need | User/calling workflow |
| Architect -> Repository package | Read target and convention files; apply approved delta | Updated package files | Agent Team Architect skill |
| Architect -> Validation | Changed package and contract | Evidence and pass/fail/block classification | Agent Team Architect skill |
| Architect -> Handoff runtime | Result envelope and artifact paths | Conditional recipients or caller return | Runtime `get_handoff_rules` / `send_message_to` |

## Scope-Appropriate Separation Of Concerns Check

The package has no application runtime code. The architectural separation is between identity, wiring, workflow, reusable guidance, result schema, and documentation. This is sufficient; adding a coordinator layer or validator script would over-split the package.

## Interface Boundary Check (Mandatory)

- Operation selection is explicit: `create` or `update`.
- Update intent is explicit but subordinate to the update mode.
- Result fields are explicit and route-relevant.
- Recipient addresses are supplied by runtime handoff rules, not by the skill.

## Naming Decisions (Natural And Implementation-Friendly)

- Display name: `Agent Team Architect`.
- Agent ID: `agent-team-architect`.
- Skill name: `agent-team-architecture`.
- Result template: `agent-team-result-template.md`.
- Result field: `update_intent`.

These names describe the subject and responsibility without redundant `Agent` suffixes or an overloaded optimizer label.

## Naming Drift Check (Mandatory)

The display name, folder ID, and skill name are deliberately distinct but mechanically aligned: display name describes the role, folder ID is kebab-case, and configured skill name matches the skill folder/frontmatter exactly.

## Existing-Structure Bias Check (Mandatory)

The design uses existing standalone-agent and bundled-skill structures, existing tool names, existing README placement, and existing result-based handoff vocabulary. It introduces no new package format, helper layer, or routing mechanism.

## Anti-Hack Check (Mandatory)

The package will not claim that text-only definitions provide executable team behavior beyond the configured runtime. It will require observed validation evidence and will preserve unresolved decisions instead of declaring success because files merely exist.

## Dependency Flow And Cross-Reference Risk

Primary dependency direction:

`agent.md -> SKILL.md -> references/templates`

Documentation direction:

`README.md -> package overview (and optional direct package links)`

Runtime routing direction:

`result envelope -> get_handoff_rules -> each exact returned recipient -> send_message_to`

No reference points back to an agent-specific recipient or a containing team route table. No cyclic package guidance is required.

## Decommission / Cleanup Plan

Before final handoff, remove any temporary analysis-only or generated placeholder files from the new runtime package. Keep ticket artifacts because they are required evidence; they are not runtime package dependencies.

## Data Models (If Needed)

The result envelope is defined in `references/result-and-handoff-contract.md` and its template. It has the following top-level fields:

- operation (`create`/`update`)
- update_intent (`new-package` for create, or an explicit update reason)
- status
- target scope
- request/requirements reference
- changed paths
- artifacts and evidence
- ownership/design decisions
- validation result
- approval state
- risks/open questions
- next expected action
- handoff state

## Error Handling And Edge Cases

- Existing package not found for an update: return `Blocked` or `Clarification Needed`; do not silently create a duplicate.
- New package request conflicts with an existing package: switch to an update decision or ask the caller to choose; do not fork duplicate ownership.
- Material behavior/scope change lacks approval: persist a requirement/approval gap and stop before that change.
- Cross-file inconsistency is found during validation: classify an in-scope update, reconcile canonical owners, and rerun affected validation.
- A referenced path or tool is unavailable: record the evidence gap and return a truthful blocked/limited result.
- No handoff rule matches: return the completed result to the caller and stop.

## Use-Case Coverage Matrix (Design Gate)

| use_case_id | primary spine | requirements | design artifacts | validation |
| --- | --- | --- | --- | --- |
| UC-001 | DS-001, LS-001 | FR-1, FR-2, FR-3, FR-5, FR-6, FR-7, FR-8, FR-9, FR-10 | Agent package, bundled skill, references/template, README | JSON/frontmatter/link checks; create-flow review; result/handoff contract review |
| UC-002 | DS-002, RS-001, LS-001 | FR-1, FR-2, FR-4, FR-5, FR-6, FR-7, FR-8, FR-10 | Update procedure, ownership ledger, result envelope | Update-flow review; cross-file reconciliation; result/handoff contract review |

## Migration / Rollout (If Needed)

No migration or rollout is required. The package is additive and can be discovered through the standalone-agent registry/repository definitions after the user-approved repository finalization path.

## Change Traceability To Implementation

| Change ID | Implementation task | Verification |
| --- | --- | --- |
| C-001 | Add standalone agent shell and runtime config. | Parse JSON; inspect frontmatter; verify `skillNames` and tool names. |
| C-002 | Add bundled two-mode architecture skill. | Read-order review; mode and artifact contract checks. |
| C-003 | Add design, result/handoff, and template references. | Link/path resolution; ownership/duplication review. |
| C-004 | Document the agent in README. | README section/style and link review. |

## Design Feedback Loop Notes (From Review/Implementation)

| Date | Trigger | Classification | Design smell | Requirements updated? | Design update applied | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-08-31 | Initial design review preparation | N/A | No known design smell; two modes share one package-architecture spine. | No | Initial v1 design recorded. | Open for Stage 5 review |

## Open Questions

- No blocking design questions. The user selected one agent, one skill, and two modes.
- Runtime availability of handoff tools is environment-dependent; the package will expose the tools and define truthful zero-match behavior.
