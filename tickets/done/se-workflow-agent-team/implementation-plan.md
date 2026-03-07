# Implementation Plan

- Ticket: `se-workflow-agent-team`
- Scope: `Small`
- Last Updated: `2026-03-07`

## Small-Scope Design Basis

Create a new set of persisted definitions in `autobyteus-agents` that derives a multi-role software-engineering team from the existing workflow skill without moving or modifying the skill itself.

## Target Repository Structure

- `agents/workflow-lead/agent.md`
- `agents/workflow-lead/agent-config.json`
- `agents/requirements-analyst/agent.md`
- `agents/requirements-analyst/agent-config.json`
- `agents/system-architect/agent.md`
- `agents/system-architect/agent-config.json`
- `agents/implementation-engineer/agent.md`
- `agents/implementation-engineer/agent-config.json`
- `agents/api-e2e-tester/agent.md`
- `agents/api-e2e-tester/agent-config.json`
- `agents/code-reviewer/agent.md`
- `agents/code-reviewer/agent-config.json`
- `agent-teams/software-engineering-workflow-team/team.md`
- `agent-teams/software-engineering-workflow-team/team-config.json`
- `README.md`

## Role Design

- `workflow-lead`
  - Owns overall stage sequencing.
  - Converts the user request into a staged collaboration plan.
  - Delegates work in the intended order and keeps the team aligned with the workflow discipline.
- `requirements-analyst`
  - Owns investigation, clarification, and requirements refinement.
  - Produces or updates requirement artifacts before design begins.
- `system-architect`
  - Owns design basis, runtime thinking, and early review quality.
  - Turns refined requirements into architecture and execution guidance.
- `implementation-engineer`
  - Owns implementation planning and source-change execution.
  - Focuses on concrete delivery against the agreed design.
- `api-e2e-tester`
  - Owns executable validation, test scenarios, and acceptance closure thinking.
- `code-reviewer`
  - Owns review rigor, docs-sync awareness, and final quality gate perspective.

## Prompt Authoring Strategy

- Derive each prompt from the workflow skill’s stage responsibilities.
- Keep prompts role-specific instead of embedding the full end-to-end workflow in every agent.
- Keep prompts implementation-agnostic enough that users can import and customize configs later.
- Avoid hardcoding tool assumptions in the prompt body beyond generic collaboration expectations.

## Config Strategy

- `agent-config.json` files will be placeholder-only for now.
- Use minimal JSON objects because users are expected to customize runtime tools/processors after import.
- `team-config.json` will be fully specified because team membership is intrinsic to the derived team definition.

## Team Composition

- Team ID: `software-engineering-workflow-team`
- Coordinator member name: `workflow_lead`
- Members:
  - `workflow_lead` -> `workflow-lead`
  - `requirements_analyst` -> `requirements-analyst`
  - `system_architect` -> `system-architect`
  - `implementation_engineer` -> `implementation-engineer`
  - `api_e2e_tester` -> `api-e2e-tester`
  - `code_reviewer` -> `code-reviewer`

## Execution Order To Encode In `team.md`

1. Requirements and investigation first.
2. Architecture and runtime reasoning second.
3. Implementation third.
4. API/E2E validation fourth.
5. Code review and docs closure last.

## Planned Validation

- Verify file paths and names match the server loader contract.
- Verify `agent.md` and `team.md` frontmatter shape matches the parser requirements.
- Verify `team-config.json` references valid local agent IDs and the coordinator member exists in the members list.
- Review the final tree to ensure the repo remains focused on definitions and lightweight documentation only.
