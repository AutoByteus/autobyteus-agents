#!/usr/bin/env python3
"""Validate the name-only change against its immutable pre-rename baseline."""
from pathlib import Path
import json
import os
import re
import subprocess

ROOT = Path(__file__).resolve().parents[3]
os.chdir(ROOT)
BASELINE = '22c24a5'
OLD = 'product-design-prototyping-team'
NEW = 'product-team'
STALE = re.compile(r'product-design-prototyping-team|product_design_prototyping_team|'
                   r'product\s+design\s*(?:&|and)\s*prototyping', re.I)


def renamed(text):
    text = text.replace(OLD, NEW).replace('product_design_prototyping_team', 'product_team')
    text = re.sub(r'Product Design\s*&\s*Prototyping\s+Team', 'Product Team', text)
    text = re.sub(r'Product Design\s*&\s*Prototyping', 'Product Team', text)
    return text.replace('product design and prototyping team', 'product team')


def in_scope(name):
    p = Path(name)
    return (p.parts[0] in ('agent-teams', 'agent-orgs', 'agents', 'docs')
            or name == 'README.md' or p.suffix in ('.py', '.js', '.mjs', '.sh'))


entries = subprocess.check_output(['git', 'ls-tree', '-rz', BASELINE]).split(b'\0')
changed = []
count = 0
for entry in filter(None, entries):
    meta, name = entry.decode().split('\t', 1)
    mode, _, oid = meta.split()
    destination = name.replace('agent-teams/' + OLD + '/', 'agent-teams/' + NEW + '/')
    p = Path(destination)
    assert p.exists(), destination
    original = subprocess.check_output(['git', 'cat-file', 'blob', oid])
    if mode == '120000':
        assert p.is_symlink() and os.readlink(p).encode() == original, destination
        assert p.resolve().exists(), destination
        continue
    expected = original
    if in_scope(name):
        try:
            expected = renamed(original.decode()).encode()
        except UnicodeDecodeError:
            pass
    assert p.read_bytes() == expected, f'Non-rename change: {destination}'
    if original != expected or name != destination:
        changed.append(p)
    count += 1
print(f'PASS: {count} baseline regular files preserved or changed only by the rename; symlinks preserved.')
assert not Path('agent-teams', OLD).exists()
assert Path('agent-teams', NEW, 'team.md').read_text().splitlines()[1] == 'name: Product Team'

live = [Path('README.md')]
for name in ('agents', 'agent-teams', 'agent-orgs', 'docs'):
    live.extend(p for p in Path(name).rglob('*') if p.is_file())
for p in live:
    assert OLD not in str(p), p
    try:
        assert not STALE.search(p.read_text()), p
    except UnicodeDecodeError:
        pass
    if p.suffix == '.json':
        json.loads(p.read_text())
for entry in filter(None, entries):
    name = entry.decode().split('\t', 1)[1]
    if Path(name).suffix in ('.py', '.js', '.mjs', '.sh'):
        assert not STALE.search(Path(name).read_text()), name
print('PASS: no stale team names in active paths, content, or existing executable scripts; active JSON parses.')


def expand(folder, prefix='', org=False):
    cfg = json.loads((folder / ('org-config.json' if org else 'team-config.json')).read_text())
    names = [m['memberName'] for m in cfg['members']]
    assert len(names) == len(set(names)), folder
    if not org:
        assert cfg['coordinatorMemberName'] in names, folder
    agents, routes = set(), []
    external = set()
    for m in cfg['members']:
        local = m['refScope'] == 'team_local'
        base = folder if local else ROOT
        address = prefix + '/' + m['memberName']
        if m['refType'] == 'agent':
            agent = base / 'agents' / m['ref']
            assert (agent / 'agent.md').exists(), agent
            ac = json.loads((agent / 'agent-config.json').read_text())
            for skill in ac.get('skillNames', []):
                guide = agent / 'skills' / skill / 'SKILL.md'
                assert guide.exists(), guide
                assert re.search(r'^name: ' + re.escape(skill) + r'$', guide.read_text(), re.M), guide
            agents.add(address)
        else:
            assert m['refType'] == 'agent_team', m
            child = base / 'agent-teams' / m['ref']
            if not child.exists():
                # Documented private/runtime-catalog dependency, unchanged by this rename.
                assert folder == Path('agent-orgs/autobyteus-org'), folder
                assert m == {'memberName': 'marketing_team', 'ref': 'marketing-team',
                             'refType': 'agent_team', 'refScope': 'shared'}, m
                external.add('/marketing_team/marketing_coordinator')
                print('LIMITATION: Marketing Team is supplied externally; its internal roster cannot be resolved locally.')
                continue
            child_agents, child_routes = expand(child, address)
            agents.update(child_agents)
            routes.extend(child_routes)
    routes.extend((prefix + h['from'], prefix + h['to']) for h in cfg.get('handoffs', []))
    assert len(routes) == len(set(routes)), folder
    for source, target in routes:
        assert source in agents | external and target in agents | external and source != target, (source, target)
    return agents, routes


for folder, org in [(Path('agent-teams/product-team'), False),
                    (Path('agent-orgs/software-development-department'), True),
                    (Path('agent-orgs/autobyteus-org'), True)]:
    agents, routes = expand(folder, org=org)
    print(f'PASS: {folder}: {len(agents)} agents, {len(routes)} checked handoffs and local bundled skills.')

links = 0
for p in changed:
    if p.suffix != '.md':
        continue
    body = re.sub(r'```.*?```', '', p.read_text(), flags=re.S)
    body = re.sub(r'`[^`\n]*\]\([^`\n]*`', '', body)
    for target in re.findall(r'\]\(([^)]+)\)', body):
        target = target.split('#')[0]
        if not target or re.match(r'\w+://', target) or '<' in target:
            continue
        assert (p.parent / target).exists(), (p, target)
        links += 1
print(f'PASS: {links} local Markdown file links in moved/changed documents resolve.')
print('LIMITATION: static definition checks only; no live app import, stored-run migration, or model execution.')
