# Investigation Notes

- Ticket: `se-workflow-agent-team`
- Last Updated: `2026-03-07`
- Scope Triage: `Small`

## Sources Consulted

- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-skills/software-engineering-workflow-skill/SKILL.md`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-skills/software-engineering-workflow-skill/agents/openai.yaml`
- `/home/ryan-ai/.autobyteus/server-data/agents/*`
- `/home/ryan-ai/.autobyteus/server-data/agent-teams/*`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo/autobyteus-server-ts/src/agent-definition/providers/file-agent-definition-provider.ts`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo/autobyteus-server-ts/src/agent-team-definition/providers/file-agent-team-definition-provider.ts`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo/autobyteus-server-ts/src/agent-definition/utils/agent-md-parser.ts`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo/autobyteus-server-ts/src/agent-team-definition/utils/team-md-parser.ts`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo/autobyteus-server-ts/src/agent-team-execution/services/agent-team-run-manager.ts`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo/autobyteus-server-ts/src/skills/services/skill-service.ts`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo/autobyteus-ts/src/task-management/tools/task-tools/create-tasks.ts`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo/autobyteus-ts/src/task-management/tools/task-tools/get-task-plan-status.ts`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo/autobyteus-ts/src/task-management/tools/task-tools/update-task-status.ts`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo/autobyteus-ts/src/agent/message/send-message-to.ts`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo/autobyteus-ts/src/tools/file/read-file.ts`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo/autobyteus-ts/src/tools/file/write-file.ts`
- `/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-workspace-superrepo/autobyteus-ts/src/tools/terminal/tools/run-bash.ts`

## Key Findings

- The user intent is not to move the skill. The skill remains in `autobyteus-skills`; this task is to derive persisted agent and team definitions from it and store them in `autobyteus-agents`.
- `autobyteus-agents` currently has no commits and no existing content. It is effectively a blank target repository.
- The server’s canonical file contract is:
  - agent: `agents/<agent-id>/agent.md` + `agents/<agent-id>/agent-config.json`
  - team: `agent-teams/<team-id>/team.md` + `agent-teams/<team-id>/team-config.json`
- `agent.md` frontmatter supports `name`, `description`, optional `category`, optional `role`, then freeform instructions body.
- `team.md` frontmatter supports `name`, `description`, optional `category`, then freeform instructions body.
- `team-config.json` supports:
  - `coordinatorMemberName`
  - optional `avatarUrl`
  - `members[]` with `memberName`, `ref`, `refType`
- Team members can reference only `agent` or `agent_team`. There is no per-member prompt override in the team file. Each role therefore needs its own agent definition if the role behavior differs.
- Agent runtime uses the `agent.md` instructions body as the system prompt. This makes persisted agent definitions the right place to encode each role’s workflow responsibilities.
- Skill loading is separate from agent/team definition loading:
  - skills come from the skills repo/path
  - agents and teams come from definition source roots
- Tool names must match the current tool registry names, which are lower snake case, for example:
  - `create_tasks`
  - `get_task_plan_status`
  - `update_task_status`
  - `send_message_to`
  - `read_file`
  - `write_file`
  - `run_bash`
- Some live server-data software-development agents use outdated or inconsistent tool names and prompts. Those live definitions are useful only as loose behavioral references, not as a copy source.

## Module / File Placement Observations

- Canonical owner for the new persisted definitions is this repository:
  - `autobyteus-agents/agents/...`
  - `autobyteus-agents/agent-teams/...`
- Canonical owner for the source workflow blueprint remains:
  - `autobyteus-skills/software-engineering-workflow-skill/...`
- Canonical owner for runtime loader behavior remains:
  - `autobyteus-workspace-superrepo/autobyteus-server-ts/...`

## Constraints

- Because `autobyteus-agents` is empty, this change likely needs a minimal repository README or equivalent explanation in addition to the definitions themselves.
- Because team definitions reference agents by ID, agent IDs must be designed first and then used consistently in the team config.
- Because there is no per-member prompt override, any meaningful stage split requires distinct role agents instead of one generic agent reused under different member names.
- User clarified that runtime configuration is not the focus of this task. Agent configs can stay minimal placeholders because users will customize them after import.

## Proposed Role Split Direction

- Coordinator / workflow lead
  - Owns stage sequencing and delegation.
- Requirements analyst
  - Owns investigation and requirements refinement stages.
- Architect / runtime reviewer
  - Owns design basis, future-state runtime modeling, and early review gates.
- Implementation engineer
  - Owns source implementation and unit/integration validation.
- API / E2E tester
  - Owns acceptance testing and execution evidence.
- Code reviewer / docs synchronizer
  - Owns formal review gate and docs-impact closure.

## Scope Triage Rationale

- Classified as `Small`.
- Expected change type is new persisted definition files plus lightweight repo documentation.
- No server runtime code changes are currently indicated by investigation.
- The work is conceptually important, but operationally localized to one definitions repository.

## Open Unknowns

- Whether docs sync should be a separate specialist or folded into the reviewer role.
- Whether to preload the original workflow skill onto one or more derived agents, or keep the conversion purely prompt-based.

## Implications For Requirements / Design

- The design should create a small set of clearly named role agents plus one team definition rather than reproducing all ten stages as ten members.
- The prompts should be written from the workflow skill, not copied from stale live runtime agents.
- The team should be deliberately stage-oriented, with coordinator instructions that enforce the intended sequence and handoffs.
- Agent configs should be placeholder-first, with effort concentrated on the `agent.md` and `team.md` content.
