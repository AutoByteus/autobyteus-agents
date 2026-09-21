import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
const [root, id, backend] = process.argv.slice(2);
assert(root && id && backend, 'Usage: node validate.mjs PROJECT ORG_ID BACKEND_DIST');
const load = rel => import(pathToFileURL(path.join(backend, rel)).href);
const json = async p => JSON.parse(await fs.readFile(p, 'utf8'));
const hash = async p => createHash('sha256').update(await fs.readFile(p)).digest('hex');
const artifact = path.join(root, '.codex/artifacts', `${id}-agent-org`);
const before = await json(path.join(artifact, 'before-team-config.json'));
const beforeManifest = await json(path.join(artifact, 'before-manifest.json'));
const updatedMarkdown = await json(path.join(artifact, 'updated-descendant-markdown.json'));
const orgPath = path.join(root, 'agent-orgs', id);
const { parseAgentOrgDefinitionConfig } = await load('agent-org-definition/providers/agent-org-definition-config.js');
const { buildAgentOrgOwnedDefinitionId } = await load('agent-org-definition/utils/agent-org-owned-definition-id.js');
const { listAgentOrgOwnedDefinitionSources } = await load('agent-org-definition/providers/agent-org-owned-definition-source-index.js');
const { FileAgentOrgDefinitionProvider } = await load('agent-org-definition/providers/file-agent-org-definition-provider.js');
const { FileAgentTeamDefinitionProvider } = await load('agent-team-definition/providers/file-agent-team-definition-provider.js');
const { FileAgentDefinitionProvider } = await load('agent-definition/providers/file-agent-definition-provider.js');
const { DefinitionSourceRegistry } = await load('collaboration-definition-admission/providers/definition-source-registry.js');
const { DefinitionAdmissionService } = await load('collaboration-definition-admission/services/definition-admission-service.js');
const { AgentOrgDefinitionResolver } = await load('agent-org-definition/services/agent-org-definition-resolver.js');
const { CollaborationHandoffCompiler } = await load('agent-collaboration/definition/collaboration-handoff-compiler.js');
const { buildTeamLocalAgentDefinitionId } = await load('agent-team-definition/utils/team-local-definition-id.js');
const config = parseAgentOrgDefinitionConfig(await json(path.join(orgPath, 'org-config.json')));
assert.deepEqual(config.handoffs, before.handoffs);
assert.equal(config.avatarUrl, before.avatarUrl ?? null);
assert.deepEqual(config.defaultLaunchConfig, before.defaultLaunchConfig ?? null);
assert.deepEqual(config.members, before.members.map(m => ({ ...m, refScope: 'org_local', ref: buildAgentOrgOwnedDefinitionId(m.refType, id, m.ref) })));
assert(!Object.hasOwn(config, 'coordinatorMemberName'));
await assert.rejects(fs.access(path.join(root, 'agent-teams', id)));
const appConfig = {
  getAgentsDir: () => path.join(root, 'agents'), getAgentTeamsDir: () => path.join(root, 'agent-teams'),
  getAgentOrgsDir: () => path.join(root, 'agent-orgs'), getAdditionalAgentPackageRoots: () => [],
};
const applicationBundleService = { getApplicationOwnedAgentSourceById: async () => null, getApplicationOwnedTeamSourceById: async () => null };
const agents = new FileAgentDefinitionProvider({ appConfig, applicationBundleService });
const teams = new FileAgentTeamDefinitionProvider({ appConfig, applicationBundleService });
const orgs = new FileAgentOrgDefinitionProvider(appConfig);
const readAgents = new Set();
const getAgentById = async ref => { const agent = await agents.getById(ref); assert(agent, `Missing Agent ${ref}`); readAgents.add(ref); return agent; };
const org = await orgs.getById(id); assert(org);
for (const kind of ['agent', 'agent_team']) {
  const entries = (await listAgentOrgOwnedDefinitionSources({ subject: kind, orgRoots: [appConfig.getAgentOrgsDir()] })).filter(s => s.orgDefinitionId === id);
  assert.equal(entries.length, config.members.filter(m => m.refType === kind).length);
  for (const e of entries) assert.equal(e.definitionId, buildAgentOrgOwnedDefinitionId(kind, id, e.localDefinitionId));
}
let localRuleCount = 0;
for (const mount of config.members.filter(m => m.refType === 'agent_team')) {
  const team = await teams.getById(mount.ref); assert(team); assert.equal(team.ownershipScope, 'agent_org_owned'); assert.equal(team.ownerOrgId, id);
  localRuleCount += team.handoffs.length;
  for (const member of team.nodes) await getAgentById(member.refScope === 'team_local' ? buildTeamLocalAgentDefinitionId(team.id, member.ref) : member.ref);
}
const topology = await new AgentOrgDefinitionResolver().resolve({ definition: org, lookup: { getAgentById, getTeamById: ref => teams.getById(ref) } });
const rules = new CollaborationHandoffCompiler().compileOrg(topology);
assert.equal(rules.length, before.handoffs.length + localRuleCount);
const registry = new DefinitionSourceRegistry({ appConfig });
const registered = await registry.scan();
const ids = new Set([id, ...config.members.filter(m => m.refType === 'agent_team').map(m => m.ref)]);
assert(!registered.some(s => s.subjectKind === 'agent_team' && s.definitionId === id));
const admission = new DefinitionAdmissionService({ registry: { scan: async () => registered.filter(s => ids.has(s.definitionId)) },
  agents: { getFreshAgentDefinitionById: getAgentById }, teams: { getFreshDefinitionById: ref => teams.getById(ref) }, orgs: { getDefinitionById: ref => orgs.getById(ref) } });
const results = await admission.scan();
assert.equal(results.length, ids.size);
assert(results.every(r => r.status === 'available'), JSON.stringify(results.filter(r => r.status !== 'available')));
let preservedFiles = 0, unaffectedFiles = 0;
for (const [rel, expected] of Object.entries(beforeManifest)) {
  const prefix = `agent-teams/${id}/`;
  if (rel.startsWith(prefix)) {
    const tail = rel.slice(prefix.length);
    if (['team-config.json', 'team.md'].includes(tail) || updatedMarkdown.includes(tail)) continue;
    assert.equal(await hash(path.join(orgPath, tail)), expected, `Changed descendant ${tail}`); preservedFiles++;
  } else { assert.equal(await hash(path.join(root, rel)), expected, `Changed unrelated file ${rel}`); unaffectedFiles++; }
}
const report = { status: 'PASS', orgId: id, directAgents: config.members.filter(m => m.refType === 'agent').length,
  mountedTeams: config.members.filter(m => m.refType === 'agent_team').length, resolvedAgents: readAgents.size,
  unchangedRootHandoffs: before.handoffs.length, compiledTotalHandoffs: rules.length, admittedDefinitions: results.length,
  byteIdenticalMovedDescendantFiles: preservedFiles, unchangedUnrelatedFiles: unaffectedFiles,
  validation: 'Current strict Org codec; real owned source index; file Agent/Team/Org readers; topology resolver; handoff compiler; target-scoped real admission; original rule and unrelated-byte preservation.',
  limits: 'Read-only offline checks, not live server import/UI execution. No runtime providers, history rewrite, restart or Git finalization.' };
console.log(JSON.stringify(report, null, 2));
await fs.writeFile(path.join(artifact, 'validation-result.json'), JSON.stringify(report, null, 2)+'\n');
