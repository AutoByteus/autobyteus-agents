---
name: agent-team-architecture
description: Create new agent-team packages or update existing packages with explicit ownership, durable artifacts, validation, and outcome-based handoff.
---

# Agent Team Architecture

## Purpose

Design and evolve agent-team packages as coherent systems of agents, skills, references, templates, configuration, and documentation. Use this skill when the user wants a new agent team or wants to change an existing agent-team package.

The package architect owns the package design and its consistency. It does not perform the domain work assigned to the specialists inside the target team.

Read [agent-team-design-principles.md](references/agent-team-design-principles.md) for the detailed design checks and [result-and-handoff-contract.md](references/result-and-handoff-contract.md) for the durable result and handoff contract. Use [agent-team-result-template.md](templates/agent-team-result-template.md) when creating the result artifact.

## Operation modes

This skill has exactly two user-facing operation modes:

- **`create`:** create a new agent-team package.
- **`update`:** change an existing agent-team package.

Use `update` for any existing-package change. Record the reason in `update_intent`, such as `optimize`, `repair`, `correct`, `extend`, `simplify`, or another concise description. These are update intents, not additional modes.

Audit, verification, and structural checks are internal workflow steps. They are not user-facing operation modes.

## Inputs and readiness

Start by identifying:

- the requested team outcome and intended users;
- the requested operation, or whether a target package already exists;
- the target repository and package path, if supplied;
- existing agents, teams, skills, references, templates, README guidance, and repository instructions that govern the change;
- constraints, non-goals, approval state, and any requested handoff destination;
- the workspace in which durable artifacts must be written.

If the user asks to create a package whose identity already exists, inspect it and treat the request as an `update` decision unless the user explicitly confirms a distinct package. Do not silently create duplicate ownership.

Before changing an existing package, read its full relevant topology: `agent.md`, `agent-config.json`, `team.md`, `team-config.json`, member agents, attached skills, references, templates, and affected documentation. Do not infer the current contract from one file.

When repository-specific instructions require ticket artifacts, worktrees, approval gates, or finalization holds, follow those instructions. Do not commit, push, merge, publish, or deploy unless the user explicitly authorizes that side effect.

## Ownership contract

Keep each rule in one canonical owner:

- `agent.md` owns agent identity, role, runtime stance, attached-skill reminder, and the universal post-work handoff transition.
- `agent-config.json` owns explicit skill attachment and runtime tool wiring.
- `SKILL.md` owns this specialist's inputs, workflow, decisions, artifacts, validation, recovery, result classification, and handoff procedure.
- `team.md` owns team purpose, member boundaries, entry contract, high-level flow, and team-wide communication expectations.
- `team-config.json` owns the runtime roster, coordinator, canonical rooted addresses, and conditional handoff rules.
- Member `SKILL.md` owns the member's role-specific execution procedure and artifacts.
- References and templates own detailed principles, schemas, and reusable output structure.
- README owns concise human-facing discoverability and package overview.

Do not copy a specialist's detailed procedure into `team.md`, put conditional recipient addresses in a skill, or turn README into a second runtime prompt.

## Workflow

### 1. Normalize the request

Classify the operation as `create` or `update`.

For `create`, set `update_intent` to `new-package` in the result. For `update`, record the user's reason in `update_intent`; preserve that reason in the result even when the final change is a smaller correction.

State the target scope, requested outcome, constraints, non-goals, approval state, and material unknowns. If a material ownership, behavior, scope, or destructive-removal decision is unresolved, record it as a question or approval gap before changing the affected package.

### 2. Read the applicable package topology

Read repository instructions and the relevant package examples before choosing a structure. Inspect the complete existing package for `update`.

Build a compact package map:

- package root and package type;
- agents and their ownership boundaries;
- skills, references, and templates attached to each agent;
- team roster and coordinator, if present;
- conditional handoff rules and canonical recipient addresses, if present;
- README or shared-reference documentation affected by the package;
- stale, duplicated, or conflicting paths.

Use the repository's existing structure unless evidence shows that a different boundary is required. Treat the current package behavior and user-approved requirements as the baseline for `update`.

### 3. Design the ownership and data-flow spine

Before editing, write the package's primary operation spine:

- `create`: request -> package-contract read -> ownership/topology design -> new canonical files -> reconciliation -> validation -> result;
- `update`: request + existing package -> baseline read -> update intent and impact map -> smallest coherent delta -> reconciliation -> validation -> result.

Identify each main-line owner's concrete responsibility and put supporting concerns around that owner. Keep the following decisions explicit:

- which agent owns coordination versus specialist execution;
- which file owns each rule;
- which team boundary owns routing;
- which skills are bundled versus shared;
- which files are added, modified, moved, or removed;
- how the result and artifacts travel to the next owner.

Use a flatter package when it is clearer. Do not add a coordinator, helper, validator, or second skill that owns no distinct policy or boundary.

### 4. Apply the approved package change

For `create`:

1. Create the package directory at the approved location.
2. Add the required `agent.md` and `agent-config.json` for each agent.
3. Add `team.md` and `team-config.json` when the package is a team; keep their responsibilities distinct.
4. Add a bundled skill under the owning agent's `skills/<skill-name>/` directory when one agent owns it.
5. Add references/templates only when they have a concrete owner and are linked from the skill.
6. Add or update human-facing README documentation when the repository package requires discoverability.

For `update`:

1. Identify the canonical owner of every affected rule.
2. Change only the files required by the approved update.
3. Remove stale or duplicate paths when the approved design replaces them; do not retain compatibility wrappers or dual paths for old behavior.
4. Reconcile all impacted references, configured skill names, member references, rooted handoff addresses, and README links.
5. Preserve accepted behavior outside the requested scope.

When a requested change only concerns a skill, update the skill/reference owner and leave agent identity and team routing unchanged unless evidence requires them to change.

### 5. Persist the result artifact

Before handoff, create or update one file-backed result using [agent-team-result-template.md](templates/agent-team-result-template.md). Use a runtime workspace path or the task's established artifact directory.

The result must state:

- `status` and `operation`;
- `update_intent` (`new-package` for create, or the update reason);
- target package and scope;
- request and requirements references;
- summary of the design decision and ownership boundaries;
- changed, added, moved, and removed paths;
- artifacts and evidence paths;
- approval state and assumptions;
- validation checks and observed results;
- residual risks, unresolved questions, and blockers;
- next expected action and handoff state.

Use absolute paths for artifact references when handing off. Preserve failed checks and limitations as evidence instead of claiming success.

### 6. Validate and recover

Validate after the package change and before result classification:

- parse every changed JSON file;
- check frontmatter and name alignment;
- confirm each configured `skillNames` entry matches an available skill folder and `SKILL.md` frontmatter;
- resolve local Markdown links and referenced paths;
- confirm `team.md`, `team-config.json`, agent prompts, skills, references, and templates have non-overlapping owners;
- check team-local member references and canonical rooted handoff addresses when a team is in scope;
- search for stale names, duplicate ownership, unsupported capability claims, or obsolete routes;
- review the complete diff for scope containment.

If a check fails, classify the cause before acting:

- **In-scope package correction:** update the affected canonical owner and rerun the relevant checks.
- **Requirement or approval gap:** persist the unresolved decision and stop before making the material change.
- **Design impact:** persist the affected ownership/topology decision and revise the design before implementation continues.
- **Blocked:** record the missing path, unavailable tool, unsafe workspace, or other external blocker and stop.

These are result classifications, not additional operation modes. Do not declare completion from file existence alone.

### 7. Complete the result-based handoff

After the owned work, required artifacts, and validation evidence are complete:

1. classify the result;
2. call `get_handoff_rules`;
3. apply every matching rule from the runtime/team configuration;
4. send the result and all still-relevant artifact references to each exact returned `recipient_address` using `send_message_to`;
5. if no rule matches or the handoff tools are unavailable, return the persisted result to the user or calling workflow with the limitation recorded;
6. stop after all required handoffs succeed. Do not poll or perform work owned by the next specialist.

Do not infer, hard-code, or choose a recipient from memory. The completed result determines which conditional rule matches, and the runtime configuration supplies the address.

## Complete-result definition

A result is complete when:

- the requested create or approved update has been applied at canonical ownership boundaries, or a truthful blocked/gap result has been persisted;
- the package topology and cross-file contracts are reconciled;
- required validation evidence is recorded;
- changed paths, artifacts, assumptions, risks, and next action are visible;
- the result is ready for the runtime's conditional handoff or caller return.

## Quality rules

- Prefer the smallest coherent package change over broad restructuring.
- Make ownership and data-flow boundaries explicit before polishing wording.
- Keep operation modes few and meaningful; use result fields for context.
- Use positive operating contracts. Retain negative rules only when they protect user authority, safety, a real ambiguity, a required artifact/validation gate, or an obsolete-path cleanup boundary.
- Preserve source-grounded uncertainty. Ask or return a gap instead of inventing a team member, tool, recipient, capability, or approval.
- Keep detailed best practice in this skill and its linked references; keep the agent shell and README concise.
