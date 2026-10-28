#!/usr/bin/env python3
"""Structural validation for this team's package; behavioral evidence comes from live runs."""
import argparse, hashlib, json, re
from pathlib import Path
import yaml

p=argparse.ArgumentParser();p.add_argument('package',type=Path);p.add_argument('--tool-catalog',type=Path);a=p.parse_args()
r=a.package.resolve()
def fm(path):
    text=path.read_text();assert text.startswith('---\n'),path
    return yaml.safe_load(text.split('---',2)[1])
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
c=json.loads((r/'team-config.json').read_text());assert fm(r/'team.md')['name']=='Supervised Research Team'
member={x['memberName']:x for x in c['members']}
assert len(member)==len(c['members'])==2 and c['coordinatorMemberName'] in member
pairs=[(x['from'],x['to']) for x in c['handoffs']]
assert len(pairs)==len(set(pairs))==2
assert set(pairs)=={('/research_supervisor','/researcher'),('/researcher','/research_supervisor')}
known=set(json.loads(a.tool_catalog.read_text())['availableToolNames']) if a.tool_catalog else None
for name,m in member.items():
    assert m['refType']=='agent' and m['refScope']=='team_local'
    d=r/'agents'/m['ref'];front=fm(d/'agent.md');assert all(front.get(k) for k in ['name','description','category','role'])
    config=json.loads((d/'agent-config.json').read_text());assert config['toolNames'] and len(config['skillNames'])==1
    assert {'send_message_to','get_handoff_rules'}<=set(config['toolNames'])
    if known is not None:assert set(config['toolNames'])<=known,(d,set(config['toolNames'])-known)
    for skill in config['skillNames']:
        s=d/'skills'/skill;f=fm(s/'SKILL.md');assert f['name']==skill and f['description']
        assert re.fullmatch('[a-z0-9-]{1,64}',skill)
        link=s/'research-contract.md';assert link.is_symlink() and link.resolve()==r/'shared/research-contract.md'
    print(f'PASS {name}: frontmatter, local ref, tools and skill attachment')
for route in c['handoffs']:
    assert route['from'][1:] in member and route['to'][1:] in member and route['rules']
manifest={str(f.relative_to(r)):({'symlink':str(f.readlink()),'sha256':sha(f)} if f.is_symlink() else {'sha256':sha(f)}) for f in sorted(r.rglob('*')) if f.is_file()}
assert len(manifest)==11,len(manifest)
for path in r.rglob('*.md'):
    assert not re.search(r'\b(TODO|FIXME|TBD)\b',path.read_text()),path
print('PASS coordinator, unique rooted handoffs, symlinks, no unfinished markers')
print(json.dumps(manifest,indent=2))
