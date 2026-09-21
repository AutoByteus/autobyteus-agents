import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
const root = process.cwd();
const backend = process.argv[2];
assert(backend, 'Pass feature backend dist directory');
const load = rel => import(pathToFileURL(path.join(backend, rel)).href);
const { parseAgentOrgDefinitionConfig } = await load('agent-org-definition/providers/agent-org-definition-config.js');
const { readAgentTeamDefinitionConfig } = await load('agent-team-definition/providers/agent-team-definition-config.js');
const { parseOrgMd } = await load('agent-org-definition/utils/org-md-parser.js');
const { AgentOrgDefinitionResolver } = await load('agent-org-definition/services/agent-org-definition-resolver.js');
const { buildTeamLocalAgentDefinitionId } = await load('agent-team-definition/utils/team-local-definition-id.js');
const json = async file => JSON.parse(await fs.readFile(file, 'utf8'));
const orgDir = path.join(root, 'agent-orgs/software-development-department');
const config = parseAgentOrgDefinitionConfig(await json(path.join(orgDir, 'org-config.json')));
const fields = parseOrgMd(await fs.readFile(path.join(orgDir, 'org.md'), 'utf8'));
assert.equal(fields.name, 'Software Development Department');
assert.equal(config.members.length, 2);
assert.equal(config.defaultLaunchConfig, null);
const baseline = JSON.parse(execFileSync('git', ['show', 'HEAD:agent-teams/software-development-department/team-config.json'], {encoding:'utf8'}));
assert.deepEqual(config.handoffs, baseline.handoffs);
assert.deepEqual(config.members, baseline.members.filter(m => m.memberName !== 'department_head'));
const agents = new Map(), teams = new Map();
const addresses = new Set();
for (const mount of config.members) {
  assert.equal(mount.refType, 'agent_team');
  assert.equal(mount.refScope, 'shared');
  const teamDir = path.join(root, 'agent-teams', mount.ref);
  const teamConfig = readAgentTeamDefinitionConfig(await json(path.join(teamDir, 'team-config.json')));
  await fs.access(path.join(teamDir, 'team.md'));
  for (const member of teamConfig.members) {
    assert.equal(member.refScope, 'team_local');
    const dir = path.join(teamDir, 'agents', member.ref);
    const shell = await fs.readFile(path.join(dir, 'agent.md'), 'utf8');
    assert.match(shell, /^---\nname:/);
    const cfg = await json(path.join(dir, 'agent-config.json'));
    for (const skill of cfg.skillNames ?? []) {
      const local = path.join(dir, 'skills', skill, 'SKILL.md');
      const text = await fs.readFile(local, 'utf8');
      assert.match(text, new RegExp(`^name: ${skill}$`, 'm'));
    }
    agents.set(buildTeamLocalAgentDefinitionId(mount.ref, member.ref), {dir, cfg});
    addresses.add(`/${mount.memberName}/${member.memberName}`);
  }
  teams.set(mount.ref, {id: mount.ref, name: mount.ref, nodes: teamConfig.members, ...teamConfig});
  for (const handoff of teamConfig.handoffs) {
    assert(addresses.has(`/${mount.memberName}${handoff.from}`));
    assert(addresses.has(`/${mount.memberName}${handoff.to}`));
  }
}
const resolved = await new AgentOrgDefinitionResolver().resolve({
  definition: {id: 'software-development-department', ...fields, ...config},
  lookup: {getAgentById: id => agents.get(id) ?? null, getTeamById: id => teams.get(id) ?? null},
});
assert.equal(resolved.members.length, 2);
for (const handoff of config.handoffs) {
  assert(addresses.has(handoff.from), handoff.from);
  assert(addresses.has(handoff.to), handoff.to);
}
assert.equal(agents.size, 8);
await assert.rejects(fs.access(path.join(root, 'agent-teams/software-development-department')));
for (const rel of ['README.md','docs/agent-package-authoring.md','agent-orgs/software-development-department/org.md']) {
  const text = await fs.readFile(path.join(root, rel), 'utf8');
  for (const match of text.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '').matchAll(/\]\(([^)#]+)(?:#[^)]*)?\)/g)) {
    if (/^(?:https?:|mailto:)/.test(match[1])) continue;
    await fs.access(path.resolve(root, path.dirname(rel), match[1]));
  }
}
const untouched = execFileSync('git', ['diff', '--name-only', '--', 'agent-teams/software-engineering-team', 'agent-teams/product-design-prototyping-team'], {encoding:'utf8'});
assert.equal(untouched, '');
console.log('PASS: strict Org config and Markdown parsing; two actual shared Team configs; eight filesystem-backed scoped Agents; attached bundled skills; exact original Org rules and placements; all Team/Org handoff endpoints; production topology resolver; child packages unchanged; old container removed; local Markdown links.');
console.log('Read-only package validation using feature backend compiled modules: '+backend);
console.log('No server, provider, live import, UI or history migration exercised.');
