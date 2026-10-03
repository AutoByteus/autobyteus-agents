#!/usr/bin/env python3
"""Validation script for Product Design Team package changes."""
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
    assert cfg['coordinatorMemberName'] == 'product_prototyper'
    for m in cfg['members']:
        local = m['refScope'] == 'team_local'
        agent_dir = PRODUCT_TEAM / 'agents' / m['ref'] if local else ROOT / 'agents' / m['ref']
        assert (agent_dir / 'agent.md').is_file(), f"Missing agent.md: {agent_dir}"
        assert (agent_dir / 'agent-config.json').is_file(), f"Missing agent-config.json: {agent_dir}"
    print("PASS: team-config.json members and coordinator resolve.")

def test_symlinks():
    count = 0
    for root, dirs, files in os.walk(PRODUCT_TEAM):
        for f in files:
            p = Path(root) / f
            if p.is_symlink():
                target = p.resolve()
                assert target.exists(), f"Broken symlink: {p} -> {target}"
                count += 1
    print(f"PASS: {count} symlinks resolved successfully.")

def test_team_frontmatter():
    team_md = (PRODUCT_TEAM / 'team.md').read_text()
    assert 'name: Product Team' in team_md
    print("PASS: team.md frontmatter has 'Product Team'.")

if __name__ == '__main__':
    test_json()
    test_team_config()
    test_symlinks()
    test_team_frontmatter()
    print("ALL CHECKS PASSED.")
