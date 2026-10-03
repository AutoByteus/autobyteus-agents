#!/usr/bin/env python3
"""Validation script for Product Team package changes."""
from pathlib import Path
import json
import os
import re

ROOT = Path(__file__).resolve().parents[3]
PRODUCT_TEAM = ROOT / 'agent-teams' / 'product-team'

def test_json():
    for json_file in PRODUCT_TEAM.rglob('*.json'):
        data = json.loads(json_file.read_text())
        assert isinstance(data, dict), f"Failed dict check: {json_file}"
    print("PASS: JSON files parsed successfully.")

def test_team_config():
    cfg = json.loads((PRODUCT_TEAM / 'team-config.json').read_text())
    assert cfg['coordinatorMemberName'] == 'product_ui_ux_designer', f"Unexpected coordinator: {cfg['coordinatorMemberName']}"
    for m in cfg['members']:
        local = m['refScope'] == 'team_local'
        agent_dir = PRODUCT_TEAM / 'agents' / m['ref'] if local else ROOT / 'agents' / m['ref']
        assert (agent_dir / 'agent.md').is_file(), f"Missing agent.md: {agent_dir}"
        assert (agent_dir / 'agent-config.json').is_file(), f"Missing agent-config.json: {agent_dir}"
    print("PASS: team-config.json members and coordinator resolve.")

def test_symlinks():
    shared_principles = PRODUCT_TEAM / 'shared' / 'product-design-principles.md'
    assert shared_principles.is_file(), f"Missing shared principles: {shared_principles}"
    count = 0
    for root, dirs, files in os.walk(PRODUCT_TEAM):
        for f in files:
            p = Path(root) / f
            if p.is_symlink():
                target = p.resolve()
                assert target.exists(), f"Broken symlink: {p} -> {target}"
                assert target == shared_principles, f"Unexpected symlink target: {target}"
                count += 1
    assert count == 3, f"Expected 3 symlinks, got {count}"
    print(f"PASS: {count} symlinks resolved to product-design-principles.md successfully.")

def test_team_frontmatter_and_skills():
    team_md = (PRODUCT_TEAM / 'team.md').read_text()
    assert 'name: Product Team' in team_md
    
    designer_dir = PRODUCT_TEAM / 'agents' / 'product-ui-ux-designer'
    designer_md = (designer_dir / 'agent.md').read_text()
    assert 'name: Product UI/UX Designer' in designer_md
    assert 'role: product UI/UX designer' in designer_md
    
    designer_cfg = json.loads((designer_dir / 'agent-config.json').read_text())
    expected_designer_skills = [
        "product-design-repository-management",
        "product-experience-design",
        "exploratory-requirements-visualizer"
    ]
    assert designer_cfg['skillNames'] == expected_designer_skills, f"Unexpected designer skills: {designer_cfg['skillNames']}"
    
    bootstrapper_dir = PRODUCT_TEAM / 'agents' / 'ui-baseline-bootstrapper'
    bootstrapper_md = (bootstrapper_dir / 'agent.md').read_text()
    assert 'name: UI Baseline Bootstrapper' in bootstrapper_md
    assert 'role: UI baseline bootstrapper' in bootstrapper_md
    
    bootstrapper_cfg = json.loads((bootstrapper_dir / 'agent-config.json').read_text())
    assert bootstrapper_cfg['skillNames'] == ["ui-baseline-bootstrapper"], f"Unexpected bootstrapper skills: {bootstrapper_cfg['skillNames']}"
    print("PASS: agent definitions, configs, and skill names verified.")

def test_templates_exist():
    designer_skills = PRODUCT_TEAM / 'agents' / 'product-ui-ux-designer' / 'skills'
    exp_tpl = designer_skills / 'product-experience-design' / 'templates'
    assert (exp_tpl / 'product-design-report-template.md').is_file()
    assert (exp_tpl / 'design-change-log-template.md').is_file()
    assert (exp_tpl / 'design-assumptions-template.md').is_file()
    assert (exp_tpl / 'ui-reference-runbook-template.md').is_file()
    assert (exp_tpl / 'ui-ux-spec-template.md').is_file()
    
    bootstrapper_tpl = PRODUCT_TEAM / 'agents' / 'ui-baseline-bootstrapper' / 'skills' / 'ui-baseline-bootstrapper' / 'templates'
    assert (bootstrapper_tpl / 'ui-baseline-report-template.md').is_file()
    
    shared_tpl = PRODUCT_TEAM / 'shared' / 'templates'
    assert (shared_tpl / 'product-ticket-template.md').is_file()
    print("PASS: all renamed templates verified in place.")

def test_org_configs():
    for org_dir in (ROOT / 'agent-orgs').iterdir():
        if org_dir.is_dir():
            cfg_path = org_dir / 'org-config.json'
            if cfg_path.exists():
                cfg = json.loads(cfg_path.read_text())
                assert isinstance(cfg, dict)
                # Verify any routes to product-team use the new member ID
                for route in cfg.get('handoffs', []):
                    to_addr = route.get('to', '')
                    assert '/product_team/product_prototyper' not in to_addr, f"Legacy member in route to: {to_addr}"
                    from_addr = route.get('from', '')
                    assert '/product_team/product_prototyper' not in from_addr, f"Legacy member in route from: {from_addr}"
    print("PASS: org configs valid and routes point to product_ui_ux_designer.")

def test_ui_ux_spec_template():
    tpl_path = PRODUCT_TEAM / 'agents' / 'product-ui-ux-designer' / 'skills' / 'product-experience-design' / 'templates' / 'ui-ux-spec-template.md'
    assert tpl_path.is_file(), f"Missing template: {tpl_path}"
    content = tpl_path.read_text()
    required_sections = [
        "## Problem Context & Design Rationale",
        "## Information Architecture & Screen Anatomy",
        "## Production-Quality Design Tokens & Component Manifest",
        "## Content Design & UX Writing Standards",
        "## Form & Input Validation Matrix",
        "## Responsive And Ergonomics Matrix",
        "## Accessibility And Keyboard Behavior",
        "## Motion, Transition, And Spatial Continuity",
        "## Final Visual Reference Inventory"
    ]
    for sec in required_sections:
        assert sec in content, f"Missing required section in template: {sec}"
    print("PASS: ui-ux-spec-template.md contains all professional UI/UX sections.")

if __name__ == '__main__':
    test_json()
    test_team_config()
    test_symlinks()
    test_team_frontmatter_and_skills()
    test_templates_exist()
    test_org_configs()
    test_ui_ux_spec_template()
    print("ALL CHECKS PASSED.")
