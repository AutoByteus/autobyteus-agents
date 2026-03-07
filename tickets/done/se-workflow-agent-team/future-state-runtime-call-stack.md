# Future-State Runtime Call Stack

- Ticket: `se-workflow-agent-team`
- Scope: `Small`
- Last Updated: `2026-03-07`

## Use Case `UC-001`: External Definition Source Exposes Workflow Agents

1. User adds or imports `autobyteus-agents` as a definition source in AutoByteus.
2. Server resolves the external root path and includes it in definition-source reads.
3. Agent definition provider scans `<source-root>/agents`.
4. Provider finds:
   - `workflow-lead`
   - `requirements-analyst`
   - `system-architect`
   - `implementation-engineer`
   - `api-e2e-tester`
   - `code-reviewer`
5. For each agent directory:
   - read `agent.md`
   - parse frontmatter (`name`, `description`, optional `category`, optional `role`)
   - treat body as the agent system prompt
   - read `agent-config.json`
   - fall back safely to minimal defaults if config is empty/minimal
6. Server exposes each parsed agent definition to the application as an importable agent.

## Use Case `UC-002`: External Definition Source Exposes Workflow Team

1. Agent team definition provider scans `<source-root>/agent-teams`.
2. Provider finds `software-engineering-workflow-team`.
3. Provider reads `team.md`.
4. Provider parses team frontmatter and instructions body.
5. Provider reads `team-config.json`.
6. Provider validates:
   - `coordinatorMemberName = workflow_lead`
   - each `members[]` entry contains `memberName`, `ref`, `refType`
   - every referenced agent ID matches one of the new local agent definitions
7. Server exposes the parsed team definition to the application as an importable team.

## Use Case `UC-003`: Team Run Materializes Imported Role Prompts

1. User imports the new team definition into the software.
2. User customizes any desired runtime config after import.
3. User starts a team run from `software-engineering-workflow-team`.
4. Team run manager loads the team definition.
5. Team run manager resolves each referenced agent definition by ID.
6. Prompt loader reads each role’s `agent.md` instructions body.
7. Runtime creates member agent configs from:
   - role metadata from frontmatter
   - system prompt from `agent.md` body
   - user-customized config values from the imported definitions
8. Team run starts with the workflow lead as coordinator and the remaining members available for staged collaboration.

## Runtime Modeling Notes

- No server code change is required for this future state.
- The correctness of this change depends on file shape, role prompt quality, and valid team member references.
- Minimal placeholder config is acceptable because the user explicitly intends to customize configuration after import.
