---
name: agent-package-creation
description: Create or update standalone skills, Agents, Agent Teams, and Agent Orgs, including skills their roles need.
---

# Agent Package Creation

Create or update Skill, Agent, Team, and Org definitions. The roles you define perform their own work.

Read [package-design-principles.md](references/package-design-principles.md) for package boundaries and writing principles. For skill work, also read [skill-authoring-principles.md](references/skill-authoring-principles.md).

## Inputs and operation

Identify the requested outcome, repository and path, target kind (`skill`, `agent`, `team`, or `org`), users, constraints, approvals, and artifact workspace. Choose the source root from the user's direction or confirmed repository conventions; if neither resolves it, ask before writing.

Use two operations:

- `create`: establish a new target; record `update_intent: new-package`.
- `update`: change an existing target; record the user's reason as `update_intent` (for example `extend`, `repair`, `optimize`, or `simplify`).

Target kind is separate from operation. If an identity already exists, inspect it and use `update` unless the user confirms a distinct target. Before an update, read the affected topology: definition/config files, attached skills and resources, members, routes, shared dependencies, and affected docs. Preserve accepted behavior outside the approved change.

When material scope, behavior, ownership, or removal is unresolved, surface a requirement or approval gap before making that decision. Follow repository-specific artifact, branch, worktree, approval, and finalization instructions where they apply. Do not commit, push, publish, or deploy without explicit authorization.

## Workflow

### 1. Map the target and ownership spine

Map the target kind and root, each role's responsibility, skill ownership and attachment, coordinator or intake owner where applicable, artifacts, routes and addresses, dependencies, and links. For an update, identify the smallest coherent delta.

For `create`, establish the intended behavior and required outputs from the request and confirmed repository conventions. For `update`, distinguish the approved change from existing behavior that must remain intact.

Describe the path from request to completion and recovery. For a role, specify input, owned work, output, quality gate, and handoff. For a skill, specify trigger, inputs, work, outputs, validation, and stopping condition. Give each rule one owner. Team coordinator registration does not create duties by itself; an Org has no coordinator field.

### 2. Create or update canonical files

For `create`, write the required definition files at the confirmed location, plus only the roles, skills, references, templates, scripts, or assets that own necessary behavior. For `update`, change the canonical owner of each affected rule, remove paths made obsolete by the approved design, and reconcile bindings, member references, routes, and links.

Apply the shared authoring standard while writing.

- **Skill:** Write or update `SKILL.md` and justified local resources. Follow [skill-authoring-principles.md](references/skill-authoring-principles.md) for standalone versus bundled placement, naming, and attachment. If the request targets only an existing skill, leave Agent identity and Team/Org routing unchanged unless the binding or contract actually changes.
- **Agent:** Write `agent.md` and `agent-config.json` with an explicit tool list and `skillNames` (empty when no skill is needed). Put detailed specialist procedure in an attached skill when needed; a simple Agent may keep a compact work contract in `agent.md`.
- **Team:** Write `team.md`, `team-config.json`, and the definitions of team-local members. The summary owns cooperation; the config owns roster, coordinator, and conditional internal routes; members own their specialist work.
- **Org:** Write `org.md`, `org-config.json`, and any org-local members. The Org owns placements and cross-member routes; mounted Teams retain their coordinators and internal routes. Verify shared references against the available catalog rather than copying the shared member.

Design handoffs from completed, classified results, not a fixed stage list. The sending role owns the result; the applicable Team/Org config owns conditional recipients. Carry the original request, current status/decision, constraints, approvals, relevant absolute artifact paths, and next action across boundaries. Keep human documentation navigational rather than a competing runtime procedure.

### 3. Validate and recover

Validate what the selected kind and changed files require, and record observed evidence:

- **Any skill:** check frontmatter/name/description, direct links and referenced paths, unfinished placeholders, and the available standard skill validator. Run focused checks for changed scripts, and confirm the skill's claimed outputs and tool dependencies are supported. For bundled skills, verify explicit `skillNames` attachment.
- **Any changed Agent/config:** parse JSON; check Agent frontmatter, tool/skill wiring, and folder/name alignment.
- **Team/Org:** check member references and rooted addresses; for a Team, confirm its coordinator is a member; for an Org, check shared versus org-local placements and child-Team boundaries. Record catalog availability or its absence truthfully.
- **All kinds:** compare definition, config, skill, references, templates, and human docs for one owner per rule, no stale names or competing routes, and a diff contained to the approved scope.

Correct an in-scope canonical owner and rerun affected checks. Record `Requirement Gap` when intent or approval is missing, `Design Impact` when topology must be reconsidered, or `Blocked` when an external dependency prevents safe work. Do not claim a runtime registration or catalog check that was not observed.

### 4. Persist and route the result

Before handoff, read [result-and-handoff-contract.md](references/result-and-handoff-contract.md) and write one file-backed result using [agent-package-result-template.md](templates/agent-package-result-template.md). Record observed validation and limitations; use absolute artifact paths in handoff messages.

Follow that contract to classify and route the result. If no rule matches or handoff tools are unavailable, return the persisted result to the user or caller with the limitation.

## Complete-result standard

The requested definition is created or updated at its canonical boundary, reconciled with any containing package, and supported by observed validation and a durable result; or that result truthfully records the gap or blocker that prevented completion.
