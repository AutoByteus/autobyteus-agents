# Create Agent Team Architect

Status: `Design-ready`
Scope classification: `Medium`

## Goal / problem statement

Create a standalone `Agent Team Architect` agent that can create new agent-team packages and update existing packages while following this repository's package, ownership, artifact, validation, and handoff practices.

## In-scope use cases

### UC-001 — Create a new agent-team package

Given a user request for a new team, the agent inspects applicable repository conventions, defines the team topology and ownership boundaries, creates the required package files, validates cross-file consistency, persists the result, and performs the configured result-based handoff.

### UC-002 — Update an existing agent-team package

Given an existing team and a requested change, the agent inspects the current package, identifies the smallest coherent update, changes the canonical files, reconciles affected references and configuration, validates the package, persists the result, and performs the configured result-based handoff. Optimization, repair, consistency correction, extension, and simplification are update intents, not separate modes.

## Functional requirements

- **FR-1:** The agent is named `Agent Team Architect` and is wired as a standalone agent with a parseable `agent-config.json`.
- **FR-2:** The agent uses one bundled skill whose only user-facing operation modes are `create` and `update`.
- **FR-3:** `create` creates a new agent-team package after inspecting applicable repository conventions, requirements, ownership boundaries, team topology, agent contracts, skills, and handoffs.
- **FR-4:** `update` modifies an existing agent-team package with the smallest coherent edit set; optimization, repair, consistency correction, extension, and simplification are update intents.
- **FR-5:** Audit, verification, and structural validation are internal quality steps within both modes and are not user-facing modes.
- **FR-6:** The skill treats `team.md` as the team coordination contract, `team-config.json` as the routing topology, member `agent.md` as the thin role prompt, and member `SKILL.md` as the role-specific execution contract.
- **FR-7:** The skill requires outcome artifacts that identify the operation, scope, changed files, ownership decisions, artifacts produced, validation evidence, residual risks, and unresolved questions.
- **FR-8:** Handoff follows the repository convention: after producing the result, call `get_handoff_rules`, send the result and artifact references to every exact returned `recipient_address` using `send_message_to`, and stop.
- **FR-9:** The README entry is concise and links readers to the canonical package guidance instead of becoming a duplicate runtime instruction set.
- **FR-10:** The package avoids unsupported runtime capability claims and preserves the domain boundary of any target team it changes.

## Acceptance criteria

- **AC-1:** `agents/agent-team-architect/agent.md`, `agent-config.json`, and `skills/agent-team-architecture/SKILL.md` exist with matching names and valid frontmatter/configuration.
- **AC-2:** The skill clearly defines `create` and `update` as the only modes and maps optimization, repair, audit, and verification to update intents or internal workflow steps.
- **AC-3:** The skill defines package topology, ownership boundaries, the two-mode workflow, artifact contract, validation, recovery, and result-based handoff without contradicting repository guidance.
- **AC-4:** The skill contains or links to focused references for team-package design principles and the outcome/handoff contract, with no unnecessary duplicated source of truth.
- **AC-5:** `README.md` documents the standalone agent and its purpose using the repository's existing style and link conventions.
- **AC-6:** All changed JSON files parse; skill frontmatter and local Markdown links/paths are valid; configured skill names match the bundled skill folder and frontmatter.
- **AC-7:** The final diff is limited to the new agent package, README documentation, and ticket artifacts for this task; no unrelated existing changes are overwritten.

## Constraints / dependencies

- The current repository is the source of truth; do not synchronize changes to `autobyteus-skills` or another repository.
- The implementation uses a dedicated ticket worktree from refreshed `origin/main`; unrelated changes in the original checkout must remain untouched.
- The agent is a package architect, not a substitute for the domain specialists inside the target team.
- A single skill is preferred initially; separate creation/optimization skills may be considered only if future evidence shows that their workflows materially diverge.
- Detailed operational guidance belongs in the bundled skill and its references; README remains human-facing overview documentation.
- No commit, push, merge, or deployment is requested.

## Assumptions

- The existing repository README and agent/team package contract are the governing local best-practice references.
- `get_handoff_rules` and `send_message_to` are available when the agent is run as a result-based team participant; no recipient is hard-coded in the standalone package.
- The default outcome artifact can be named `agent-team-result.md` and written under the runtime workspace or the task's established artifact directory.
- The agent should ask for clarification or return a blocked result when a material ownership, scope, or user-approval decision is unresolved rather than inventing it.

## Open questions / risks

- No blocking questions. The user selected the two-mode design and requested implementation using the design and optimization practices.
- Risk: if the skill duplicates repository README rules too extensively, future updates can drift. Mitigation: keep detailed rules in the bundled skill/references and keep README concise.
- Risk: a generic `update` mode could obscure the reason for change. Mitigation: require an `update_intent` field in the result artifact while keeping the user-facing mode count at two.

## Requirement-to-use-case coverage

| requirement_id | UC-001 | UC-002 | Coverage note |
| --- | --- | --- | --- |
| FR-1 | Yes | Yes | Package identity and runtime wiring apply to both operations. |
| FR-2 | Yes | Yes | Both operations are exposed by the same skill. |
| FR-3 | Yes | No | New-package creation behavior. |
| FR-4 | No | Yes | Existing-package update and update intents. |
| FR-5 | Yes | Yes | Internal checks are part of both workflows. |
| FR-6 | Yes | Yes | Package ownership contract applies to created and updated packages. |
| FR-7 | Yes | Yes | Both operations produce a durable result. |
| FR-8 | Yes | Yes | Both operations end at result-based handoff. |
| FR-9 | Yes | No | README addition documents the new package. |
| FR-10 | Yes | Yes | Scope and grounding boundary applies to both. |

## Acceptance-criteria-to-scenario intent

| acceptance_criteria_id | Scenario intent | Expected result |
| --- | --- | --- |
| AC-1 | Package topology and metadata inspection | All required files exist; names and frontmatter/configuration agree. |
| AC-2 | Two-mode routing inspection | Only `create` and `update` are user-facing; other labels are mapped internally. |
| AC-3 | Workflow contract review | The skill gives a complete, non-contradictory create/update path. |
| AC-4 | Reference-topology review | References are linked, focused, and each rule has one authoritative owner. |
| AC-5 | README documentation review | README has one concise standalone-agent entry with appropriate references. |
| AC-6 | Automated structural validation | JSON parses, links/paths resolve, and skill names match. |
| AC-7 | Scope/diff review | Only intended package, README, and ticket artifacts are changed. |

## Validation expectations

- Parse every changed JSON file.
- Validate skill frontmatter, matching names, local links, and referenced paths.
- Check that the two-mode routing and handoff contract are internally consistent.
- Review the full diff for ownership clarity, unnecessary duplication, unsupported claims, and scope containment.
