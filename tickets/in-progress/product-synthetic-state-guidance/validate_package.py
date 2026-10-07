"""Structural checks for this guidance-only change; not a behavioral/UI test."""
from pathlib import Path
import json
import re
import subprocess
import sys
import yaml

root = Path(__file__).resolve().parents[3]
team = root / 'agent-teams/product-team'
creator = root / 'agents/agent-package-creator/skills/agent-package-creation'
validator = Path('/Users/normy/.codex/skills/.system/skill-creator/scripts/quick_validate.py')

def frontmatter(path):
    text = path.read_text()
    match = re.match(r'^---\n(.*?)\n---', text, re.S)
    assert match, path
    return yaml.safe_load(match[1])

skills = sorted(team.glob('agents/*/skills/*/SKILL.md')) + [creator / 'SKILL.md']
for skill in skills:
    meta = frontmatter(skill)
    assert meta['name'] == skill.parent.name, skill
    assert meta['description'].strip(), skill
    subprocess.run([sys.executable, str(validator), str(skill.parent)], check=True)
    print('PASS skill:', skill.relative_to(root), flush=True)

config = json.loads((team / 'team-config.json').read_text())
members = {m['memberName']: m for m in config['members']}
assert config['coordinatorMemberName'] in members
for name, member in members.items():
    assert member['refType'] == 'agent' and member['refScope'] == 'team_local'
    owner = team / 'agents' / member['ref']
    assert all(frontmatter(owner / 'agent.md').get(k) for k in ('name','description','role','category'))
    agent = json.loads((owner / 'agent-config.json').read_text())
    for skill_name in agent['skillNames']:
        skill = owner / 'skills' / skill_name / 'SKILL.md'
        assert frontmatter(skill)['name'] == skill_name, skill
    assert {'get_handoff_rules', 'send_message_to'} <= set(agent['toolNames'])
    print('PASS local member and explicit attachments:', name)
for handoff in config['handoffs']:
    assert handoff['from'] in {'/' + n for n in members}
    assert handoff['to'] in {'/' + n for n in members}
    assert handoff['rules']
print('PASS coordinator and 2 internal rooted routes')

symlinks = [p for p in team.rglob('*') if p.is_symlink()]
for p in symlinks:
    assert p.resolve(strict=True) == team / 'shared/product-design-principles.md', p
print('PASS shared authority symlinks:', len(symlinks))

def slugs(text):
    result = set()
    for heading in re.findall(r'^#{1,6}\s+(.+)$', text, re.M):
        heading = re.sub(r'[^\w\- ]', '', heading.lower()).replace(' ', '-')
        result.add(heading)
    return result

files = [p for p in team.rglob('*.md') if not p.is_symlink()]
files += [creator / 'references/package-anti-patterns.md']
link_count = 0
for path in files:
    for target in re.findall(r'\[[^\]]*\]\(([^)]+)\)', path.read_text()):
        if re.match(r'^[a-z][a-z0-9+.-]*:', target):
            continue
        location, _, anchor = target.partition('#')
        resolved = (path.parent / location) if location else path
        assert resolved.exists(), (path, target)
        if anchor and resolved.suffix == '.md':
            assert anchor in slugs(resolved.read_text()), (path, target)
        link_count += 1
print('PASS local Markdown links and heading anchors:', link_count, 'in', len(files), 'files')
subprocess.run(['git','diff','--check'], cwd=root, check=True)
print('PASS diff whitespace')
print('LIMIT: structural checks only; semantic scenarios reviewed separately; no runtime import or UI validation.')
