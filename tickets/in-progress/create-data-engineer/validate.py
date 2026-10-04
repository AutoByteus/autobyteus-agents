#!/usr/bin/env python3
"""Validation script for Data Engineer package creation."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[3]
AGENT_DIR = ROOT / "agents" / "data-engineer"
SKILL_DIR = AGENT_DIR / "skills" / "data-engineering"

def test_json():
    cfg_file = AGENT_DIR / "agent-config.json"
    assert cfg_file.is_file(), f"Missing {cfg_file}"
    cfg = json.loads(cfg_file.read_text(encoding="utf-8"))
    assert isinstance(cfg, dict), f"Config is not a dict: {cfg}"
    assert "toolNames" in cfg and isinstance(cfg["toolNames"], list)
    assert "skillNames" in cfg and isinstance(cfg["skillNames"], list)
    assert cfg["skillNames"] == ["data-engineering"], f"Unexpected skillNames: {cfg['skillNames']}"
    print("PASS: agent-config.json parsed successfully and schema valid.")

def test_agent_frontmatter():
    agent_md = (AGENT_DIR / "agent.md").read_text(encoding="utf-8")
    assert re.search(r"^name:\s*Data Engineer", agent_md, re.MULTILINE), "agent.md missing name"
    assert re.search(r"^role:\s*data engineer", agent_md, re.MULTILINE), "agent.md missing role"
    assert re.search(r"^category:\s*data-engineering", agent_md, re.MULTILINE), "agent.md missing category"
    print("PASS: agent.md frontmatter matches name and role.")

def test_skill():
    skill_md = (SKILL_DIR / "SKILL.md").read_text(encoding="utf-8")
    assert re.search(r"^name:\s*data-engineering", skill_md, re.MULTILINE), "SKILL.md missing name"
    assert re.search(r"^description:\s*", skill_md, re.MULTILINE), "SKILL.md missing description"
    print("PASS: SKILL.md frontmatter and naming valid.")

def test_links_and_references():
    # Check SKILL.md references
    quality_ref = SKILL_DIR / "references" / "data-quality-principles.md"
    report_tmpl = SKILL_DIR / "templates" / "data-preparation-report-template.md"
    assert quality_ref.is_file(), f"Missing {quality_ref}"
    assert report_tmpl.is_file(), f"Missing {report_tmpl}"
    
    # Check README links
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    assert "agents/data-engineer/agent.md" in readme
    assert "agents/data-engineer/skills/data-engineering/SKILL.md" in readme
    print("PASS: All markdown links and references resolve.")

if __name__ == "__main__":
    test_json()
    test_agent_frontmatter()
    test_skill()
    test_links_and_references()
    print("ALL CHECKS PASSED.")
