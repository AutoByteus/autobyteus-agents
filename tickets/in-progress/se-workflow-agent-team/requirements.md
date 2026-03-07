# Requirements

- Status: `Design-ready`
- Ticket: `se-workflow-agent-team`
- Last Updated: `2026-03-07`

## Goal / Problem Statement

Use the existing `software-engineering-workflow-skill` as the blueprint for a new persisted AutoByteus agent team, with multiple role-specific agents and one team definition stored in the `autobyteus-agents` repository.

## In-Scope Use Cases

- `UC-001`: The parent agents repository contains reusable `agent.md` definitions for the software-engineering workflow roles.
- `UC-002`: The repository contains a team definition that assembles those role agents into one software-engineering workflow team.
- `UC-003`: The resulting files match the current AutoByteus agent/team persistence contract used by the server.
- `UC-004`: The skill remains in the skills repository; only the derived agents/team are created here.
- `UC-005`: Users can import these definitions and customize runtime configuration themselves after import.

## Out of Scope

- Moving or renaming the original skill.
- Backend schema changes unless investigation proves the current persisted definition format is insufficient.
- Unrelated cleanup of existing runtime agents or teams.

## Initial Requirements

- `R-001`: Add file-based agent definitions under `agents/<id>/agent.md` for the new workflow roles.
- `R-002`: Keep agent configuration lightweight. `agent-config.json` files may be minimal placeholders because users will customize configuration after import.
- `R-003`: Add one file-based team definition under `agent-teams/<id>/team.md` and `agent-teams/<id>/team-config.json`.
- `R-004`: The team must decompose the workflow into multiple roles rather than a single agent.
- `R-005`: The role prompts must be derived from the software-engineering workflow skill’s stage-gated behavior, not copied blindly from stale runtime agents.
- `R-006`: The team composition must encode the intended collaboration order through member roles and team instructions.
- `R-007`: The repository should include enough documentation to explain what these definitions are and how they relate to the source skill.

## Selected Role Set

- `workflow-lead`
- `requirements-analyst`
- `system-architect`
- `implementation-engineer`
- `api-e2e-tester`
- `code-reviewer`

## Initial Acceptance Criteria

- `AC-001`: Investigation identifies the exact persisted file contract and the constraint that only minimal config placeholders are needed now.
- `AC-002`: Six new software-engineering workflow role agents are added with authored `agent.md` prompts in the correct repository structure.
- `AC-003`: Placeholder `agent-config.json` files are present or intentionally minimal for those agents.
- `AC-004`: A new software-engineering workflow team is added and references those agents correctly in `team-config.json`.
- `AC-005`: The `team.md` instructions describe the intended collaboration sequence across the role set.
- `AC-006`: Validation confirms the new files conform to the loader’s expected shape, or blockers are recorded explicitly.

## Constraints / Dependencies

- Source skill: `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-skills/software-engineering-workflow-skill`
- Live reference definitions: `/home/ryan-ai/.autobyteus/server-data`
- Loader/persistence reference implementation in `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo`

## Assumptions

- `autobyteus-agents` is the intended repository for versioned agent and agent-team definitions.
- The current team definition model of coordinator plus member refs is sufficient for this conversion.
- Users will supply or adjust runtime tools/processors after import, so only minimal placeholder config is needed in this task.

## Open Questions / Risks

- The workflow has more stages than a minimal developer/reviewer/tester team, so the role split needs to be designed intentionally rather than copied from older demo teams.
- Some existing live software-development-related agents appear stale or inconsistent, so the new definitions should be built from the skill itself and validated against the real loader contract.
- Placeholder config may make the imported agents non-runnable until the user customizes them, but that is accepted scope for this task.

## Requirement Coverage Map (Requirement -> Use Cases)

- `R-001` -> `UC-001`
- `R-002` -> `UC-005`
- `R-003` -> `UC-002`, `UC-003`
- `R-004` -> `UC-001`, `UC-002`
- `R-005` -> `UC-001`, `UC-004`
- `R-006` -> `UC-002`
- `R-007` -> `UC-004`, `UC-005`

## Acceptance Criteria Coverage Map

- `AC-001` -> `AV-001`
- `AC-002` -> `AV-002`
- `AC-003` -> `AV-003`
- `AC-004` -> `AV-004`
- `AC-005` -> `AV-005`
- `AC-006` -> `AV-006`

## Scope Triage

- Confirmed classification: `Small`
- Rationale: localized to a new definitions repository with authored markdown/team metadata and placeholder config only; no runtime code changes are currently required.
