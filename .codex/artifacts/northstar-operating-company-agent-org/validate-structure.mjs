import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const [root,id,dist]=process.argv.slice(2);
const load=p=>import(pathToFileURL(path.join(dist,p)).href);
const read=p=>fs.readFile(p,'utf8');const json=async p=>JSON.parse(await read(p));
const {parseAgentOrgDefinitionConfig}=await load('agent-org-definition/providers/agent-org-definition-config.js');
const {readAgentTeamDefinitionConfig}=await load('agent-team-definition/providers/agent-team-definition-config.js');
const {parseOrgMd}=await load('agent-org-definition/utils/org-md-parser.js');
const {parseTeamMd}=await load('agent-team-definition/utils/team-md-parser.js');
const {parseAgentMd}=await load('agent-definition/utils/agent-md-parser.js');
const {buildAgentOrgOwnedDefinitionId}=await load('agent-org-definition/utils/agent-org-owned-definition-id.js');
const {buildTeamLocalAgentDefinitionId}=await load('agent-team-definition/utils/team-local-definition-id.js');
const {AgentOrgDefinitionResolver}=await load('agent-org-definition/services/agent-org-definition-resolver.js');
const {CollaborationHandoffCompiler}=await load('agent-collaboration/definition/collaboration-handoff-compiler.js');
const {listAgentOrgOwnedDefinitionSources}=await load('agent-org-definition/providers/agent-org-owned-definition-source-index.js');
const orgDir=path.join(root,'agent-orgs',id),artifact=path.join(root,'.codex/artifacts',id+'-agent-org');
const config=parseAgentOrgDefinitionConfig(await json(path.join(orgDir,'org-config.json')));
const org={id,...parseOrgMd(await read(path.join(orgDir,'org.md'))),...config};
const before=await json(path.join(artifact,'before-team-config.json'));
assert.deepEqual(config.handoffs,before.handoffs);
assert.deepEqual(config.members,before.members.map(m=>({...m,refScope:'org_local',ref:buildAgentOrgOwnedDefinitionId(m.refType,id,m.ref)})));
const agents=new Map(),teams=new Map();let localHandoffs=0;
const readAgent=async (dir,ref)=>{const md=parseAgentMd(await read(path.join(dir,'agent.md')));await json(path.join(dir,'agent-config.json'));agents.set(ref,{id:ref,...md});};
for(const kind of ['agent','agent_team']) {
 const sources=(await listAgentOrgOwnedDefinitionSources({subject:kind,orgRoots:[path.join(root,'agent-orgs')]})).filter(s=>s.orgDefinitionId===id);
 assert.equal(sources.length,config.members.filter(m=>m.refType===kind).length);
 for(const s of sources) {
  if(kind==='agent'){await readAgent(s.definitionDir,s.definitionId);continue;}
  const c=readAgentTeamDefinitionConfig(await json(s.configPath));
  const team={id:s.definitionId,...parseTeamMd(await read(s.mdPath)),...c,nodes:c.members,ownershipScope:'agent_org_owned',ownerOrgId:id};
  teams.set(team.id,team);localHandoffs+=team.handoffs.length;
  for(const m of team.nodes){assert.equal(m.refScope,'team_local');await readAgent(path.join(s.definitionDir,'agents',m.ref),buildTeamLocalAgentDefinitionId(team.id,m.ref));}
 }
}
const topology=await new AgentOrgDefinitionResolver().resolve({definition:org,lookup:{getAgentById:ref=>agents.get(ref)??null,getTeamById:ref=>teams.get(ref)??null}});
const rules=new CollaborationHandoffCompiler().compileOrg(topology);
assert.equal(rules.length,before.handoffs.length+localHandoffs);
await assert.rejects(fs.access(path.join(root,'agent-teams',id)));
const result={packageStructure:'PASS',rootMembers:config.members.length,agents:agents.size,ownedTeams:teams.size,rootHandoffsUnchanged:before.handoffs.length,totalCompiledHandoffs:rules.length,oldTopLevelTeamAbsent:true,sharedPackagesCreated:false,limits:'Filesystem-backed lookup used for topology/compiled-rule validation. Existing real file-provider limitation resolving local Agents inside Org-owned Teams remains; this is not live admission/runtime validation.'};
console.log(JSON.stringify(result,null,2));await fs.writeFile(path.join(artifact,'structure-validation.json'),JSON.stringify(result,null,2)+'\n');
