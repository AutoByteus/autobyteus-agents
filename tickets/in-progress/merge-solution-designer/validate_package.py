#!/usr/bin/env python3
"""Definition-level validation; does not execute agents or interpret prose rules."""
from pathlib import Path
import argparse
import copy
import json
import re
import unittest
import yaml

ROOT = Path(__file__).resolve().parents[3]
TEAMS = ROOT / 'agent-teams'
SCOPES = [TEAMS / name for name in (
    'software-development-department', 'software-engineering-team',
    'product-design-prototyping-team')]
OLD = re.compile(r'\b(?:requirements[_ -]engineer|architecture[_ -]designer)\b|'
                 r'\b(?:requirements-revision-record|architecture-design-revision-record)\b|'
                 r'\b(?:RER|AD-REV)-', re.I)


def read_config(folder):
    return json.loads((folder / 'team-config.json').read_text())


def expand(folder, prefix='', ancestors=()):
    """Resolve team-local/shared members and mount child edges like the runtime."""
    assert folder not in ancestors, f'Circular team reference: {folder}'
    cfg = read_config(folder)
    members = cfg['members']
    names = [m['memberName'].casefold() for m in members]
    assert len(names) == len(set(names)), 'Duplicate sibling member name'
    coordinators = [m for m in members if m['memberName'] == cfg['coordinatorMemberName']
                    and m['refType'] == 'agent']
    assert len(coordinators) == 1, 'Coordinator must be one direct agent'
    agents, edges = {}, []
    for m in members:
        address = prefix + '/' + m['memberName']
        local = m['refScope'] == 'team_local'
        if m['refType'] == 'agent':
            target = (folder / 'agents' if local else ROOT / 'agents') / m['ref']
            assert (target / 'agent.md').is_file(), target
            assert (target / 'agent-config.json').is_file(), target
            agents[address] = target
        else:
            assert m['refType'] == 'agent_team', m
            target = (folder / 'agent-teams' if local else TEAMS) / m['ref']
            children, child_edges = expand(target, address, ancestors + (folder,))
            assert not agents.keys() & children.keys(), 'Duplicate agent address'
            agents.update(children)
            edges.extend(child_edges)
    for h in cfg.get('handoffs', []):
        assert h['from'].startswith('/') and h['to'].startswith('/'), h
        assert h['rules'] and all(isinstance(r, str) and r.strip() for r in h['rules']), h
        edges.append((prefix + h['from'], prefix + h['to'], h['rules']))
    validate_edges(agents, edges)
    return agents, edges


def validate_edges(agents, edges):
    seen = set()
    for source, target, _ in edges:
        assert source in agents, f'Unknown sender: {source}'
        assert target in agents, f'Unknown recipient: {target}'
        assert source != target, f'Self-handoff: {source}'
        assert (source, target) not in seen, f'Duplicate edge: {source} -> {target}'
        seen.add((source, target))


def frontmatter(path):
    text = path.read_text()
    assert text.startswith('---\n'), path
    return yaml.safe_load(text.split('---', 2)[1])


class PackageValidation(unittest.TestCase):
    def setUp(self):
        self.agents, self.edges = expand(SCOPES[0])
        self.routes = {(a, b) for a, b, _ in self.edges}
        self.sd = '/software_engineering_team/solution_designer'

    def test_expanded_roster_and_single_owner(self):
        self.assertEqual(len(self.agents), 9)
        self.assertEqual([a for a in self.agents if a.endswith('/solution_designer')], [self.sd])
        self.assertEqual(read_config(SCOPES[0])['coordinatorMemberName'], 'department_head')
        self.assertEqual(read_config(SCOPES[1])['coordinatorMemberName'], 'solution_designer')
        for folder in SCOPES:
            expand(folder)  # Standalone child teams resolve as well.

    def test_forward_and_recovery_paths(self):
        base = '/software_engineering_team/'
        expected = set()
        for name in ('architecture_reviewer', 'implementation_engineer', 'delivery_engineer'):
            expected.add((self.sd, base + name))
        for name in ('architecture_reviewer', 'implementation_engineer', 'code_reviewer',
                     'api_e2e_engineer', 'delivery_engineer'):
            expected.add((base + name, self.sd))
        expected.update({(base+'api_e2e_engineer', base+'code_reviewer'),
                         (base+'architecture_reviewer', base+'implementation_engineer'),
                         (base+'implementation_engineer', base+'api_e2e_engineer')})
        self.assertTrue(expected <= self.routes, expected - self.routes)

    def test_product_and_department_boundaries(self):
        product = '/product_design_prototyping_team/product_prototyper'
        self.assertIn((self.sd, product), self.routes)
        self.assertIn((product, self.sd), self.routes)
        head_edges = {(a, b) for a, b in self.routes if '/department_head' in (a, b)}
        self.assertEqual(head_edges, set())
        head = json.loads((self.agents['/department_head'] / 'agent-config.json').read_text())
        self.assertEqual(head['toolNames'], [])
        self.assertEqual(head['skillNames'], [])

    def test_metadata_wiring_and_json(self):
        for folder in SCOPES:
            for p in folder.rglob('*.json'):
                json.loads(p.read_text())
        for address, agent in self.agents.items():
            for key in ('name', 'description', 'category', 'role'):
                self.assertTrue(frontmatter(agent / 'agent.md')[key])
            cfg = json.loads((agent / 'agent-config.json').read_text())
            if any(address in (source, target) for source, target in self.routes):
                self.assertTrue({'get_handoff_rules', 'send_message_to'} <= set(cfg['toolNames']))
            for skill in cfg['skillNames']:
                path = agent / 'skills' / skill / 'SKILL.md'
                self.assertTrue(path.exists(), path)
                self.assertEqual(frontmatter(path)['name'], skill)

    def test_links_symlinks_and_obsolete_artifacts(self):
        for folder in SCOPES:
            for p in folder.rglob('*'):
                self.assertIsNone(OLD.search(p.name), p)
                if p.is_symlink():
                    self.assertTrue(p.exists(), p)
                    continue
                if not p.is_file() or p.suffix not in ('.md', '.json'):
                    continue
                raw = p.read_text()
                self.assertIsNone(OLD.search(raw), p)
                text = re.sub(r'```.*?```', '', raw, flags=re.S)
                if p.suffix == '.md':
                    for link in re.findall(r'\]\(([^)]+)\)', text):
                        link = link.split('#')[0]
                        if link and not re.match(r'\w+://', link) and '<' not in link:
                            self.assertTrue((p.parent / link).exists(), f'{p}: {link}')

    def test_revision_schema_is_not_duplicated(self):
        for p in SCOPES[1].rglob('*template.md'):
            for section in p.read_text().split('\n## '):
                fields = re.findall(r'^- (?:Upstream )?Solution [Rr]evision [Rr]ecord\b.*', section, re.M)
                self.assertLessEqual(len(fields), 1, p)
                for field in fields:
                    self.assertNotIn('for the direct route', field, p)

    def test_validator_rejects_invalid_routes(self):
        for target in ('/missing', '/department_head'):
            bad = copy.deepcopy(self.edges)
            bad.append(('/department_head', target, ['Invalid fixture']))
            with self.assertRaises(AssertionError):
                validate_edges(self.agents, bad)

    def test_post_design_classification_contract(self):
        skill = self.agents[self.sd] / 'skills/solution-designer'
        guide = (skill / 'SKILL.md').read_text()
        self.assertLess(guide.index('### 2. Obtain Explicit Requirements Approval'),
                        guide.index('### 3. Investigate Architecture And Produce Design'))
        self.assertLess(guide.index('### 3. Investigate Architecture And Produce Design'),
                        guide.index('### 4. Classify The Completed Solution'))
        self.assertIn('required for every implementation-ready package', guide)
        requirements = (skill / 'templates/requirements-doc-template.md').read_text()
        self.assertNotIn('Preliminary task size', requirements)
        for folder in SCOPES:
            for p in folder.rglob('*'):
                if p.is_file() and not p.is_symlink() and p.suffix in ('.md', '.json'):
                    for obsolete in ('Approved Direct-Implementation',
                                     'Direct Requirements-to-Implementation',
                                     'Architecture Design Assessment',
                                     'requirements routing assessment'):
                        self.assertNotIn(obsolete, p.read_text(), p)

    def test_post_design_review_policy_stays_in_config(self):
        cfg = read_config(SCOPES[1])
        rules = {h['to']: h['rules'] for h in cfg['handoffs']
                 if h['from'] == '/solution_designer'}
        self.assertEqual(len(rules['/implementation_engineer']), 1)
        self.assertIn('Architecture Design Complete', rules['/implementation_engineer'][0])
        self.assertIn('task_size=Small or Medium and architectural_risk=Low',
                      rules['/implementation_engineer'][0])
        self.assertIn('task_size=Large or architectural_risk=High',
                      rules['/architecture_reviewer'][0])
        skill = self.agents[self.sd] / 'skills/solution-designer'
        for name in ('SKILL.md', 'references/architecture-design.md'):
            text = (skill / name).read_text()
            self.assertNotIn('selects independent architecture review', text)
            self.assertNotIn('may go directly to Implementation Engineer', text)
        self.assertNotIn('Selected route',
                         (skill / 'templates/design-spec-template.md').read_text())

    def test_solution_local_and_resolved_reference_links(self):
        skill = self.agents[self.sd] / 'skills/solution-designer'
        self.assertTrue((skill / 'design-examples.md').is_symlink())
        self.assertFalse((skill / 'references/design-examples.md').exists())
        for p in skill.rglob('*.md'):
            for link in re.findall(r'\]\(([^)]+)\)', p.read_text()):
                relative = link.split('#')[0]
                if relative and not re.match(r'\w+://', relative):
                    for parent in {p.parent, p.resolve().parent}:
                        self.assertTrue((parent / relative).exists(), f'{p}: {link}')

    def test_solution_handoff_recovery_and_template_fields(self):
        agent = self.agents[self.sd]
        skill = agent / 'skills/solution-designer'
        shell = (agent / 'agent.md').read_text()
        guide = (skill / 'SKILL.md').read_text()
        self.assertIn('attach the same file in the reference files field', shell)
        self.assertIn('Read the referenced handoff file before acting', shell)
        for text in ('Result Correction', 'Delivery Receipt Evidence Gap',
                     'active reporting', 'finalized artifacts read-only'):
            self.assertIn(text, guide)
        notes = (skill / 'templates/investigation-notes-template.md').read_text()
        for field in ('Package identifier', 'Resolved base remote', 'Finalization target'):
            self.assertIn(field, notes)
        requirements = (skill / 'templates/requirements-doc-template.md').read_text()
        for field in ('Content Ready For Approval', 'Approved Basis Ready For Design',
                      'Use-Case IDs', 'Quality ID | Related Requirement / AC IDs'):
            self.assertIn(field, requirements)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--include-docs', action='store_true')
    args, rest = parser.parse_known_args()
    if args.include_docs:
        assert not OLD.search((ROOT / 'README.md').read_text()), 'Stale README role reference'
    print('Scope: configuration/schema/link checks, not live model execution.', flush=True)
    unittest.main(argv=[__file__] + rest)
