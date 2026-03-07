# API / E2E Testing

- Ticket: `se-workflow-agent-team`
- Last Updated: `2026-03-07`
- Gate Result: `Pass`

## Scope Note

This ticket produces persisted agent and team definition files only. There is no runnable server or frontend change inside this repository, so the Stage 7 gate is satisfied by structural validation of the imported-definition contract rather than a traditional API or browser E2E suite.

## Validation Performed

### AV-001 / AC-001

- Validated the repository structure against the known file contract:
  - `agents/<id>/agent.md`
  - `agents/<id>/agent-config.json`
  - `agent-teams/<id>/team.md`
  - `agent-teams/<id>/team-config.json`

### AV-002 / AC-002

- Confirmed six new role agents exist:
  - `workflow-lead`
  - `requirements-analyst`
  - `system-architect`
  - `implementation-engineer`
  - `api-e2e-tester`
  - `code-reviewer`

### AV-003 / AC-003

- Confirmed each role agent includes a placeholder `agent-config.json`.

### AV-004 / AC-004

- Parsed `agent-teams/software-engineering-workflow-team/team-config.json`.
- Verified all member refs point to local agent IDs.
- Verified `coordinatorMemberName` is present in the members list.

### AV-005 / AC-005

- Reviewed `team.md` and confirmed it describes the intended collaboration order and role responsibilities.

### AV-006 / AC-006

- Ran a local Node.js structural validation script that:
  - parsed `team-config.json`
  - checked member references
  - checked presence of each `agent.md`
  - checked presence and JSON parseability of each `agent-config.json`
  - checked frontmatter start in each `agent.md` and in `team.md`

## Command Evidence

```bash
node <<'EOF'
const fs = require('fs');
const path = require('path');
const root = '/home/ryan-ai/SSD/autobyteus_org_workspace/autobyteus-agents';
const teamConfigPath = path.join(root, 'agent-teams/software-engineering-workflow-team/team-config.json');
const teamMdPath = path.join(root, 'agent-teams/software-engineering-workflow-team/team.md');
const teamConfig = JSON.parse(fs.readFileSync(teamConfigPath, 'utf8'));
const members = Array.isArray(teamConfig.members) ? teamConfig.members : [];
const memberNames = new Set(members.map((m) => m.memberName));
if (!memberNames.has(teamConfig.coordinatorMemberName)) {
  throw new Error('Coordinator member missing from team members');
}
for (const member of members) {
  if (member.refType !== 'agent') throw new Error(`Unexpected refType for ${member.memberName}: ${member.refType}`);
  const agentMd = path.join(root, 'agents', member.ref, 'agent.md');
  const agentCfg = path.join(root, 'agents', member.ref, 'agent-config.json');
  if (!fs.existsSync(agentMd)) throw new Error(`Missing agent.md for ${member.ref}`);
  if (!fs.existsSync(agentCfg)) throw new Error(`Missing agent-config.json for ${member.ref}`);
  const md = fs.readFileSync(agentMd, 'utf8');
  if (!md.startsWith('---\\n')) throw new Error(`Bad frontmatter start in ${agentMd}`);
  JSON.parse(fs.readFileSync(agentCfg, 'utf8'));
}
const teamMd = fs.readFileSync(teamMdPath, 'utf8');
if (!teamMd.startsWith('---\\n')) throw new Error('Bad team.md frontmatter');
console.log(`Validated ${members.length} team members and referenced agent files.`);
EOF
```

## Result

- All executable acceptance checks for this definitions-only scope passed.

