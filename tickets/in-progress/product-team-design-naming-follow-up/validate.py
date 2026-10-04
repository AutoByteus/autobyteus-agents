#!/usr/bin/env python3
"""Validate the Product Team design-naming follow-up.

Run from anywhere: python3 tickets/in-progress/product-team-design-naming-follow-up/validate.py
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
TEAM = ROOT / "agent-teams" / "product-team"
ORGS = [ROOT / "agent-orgs" / "autobyteus-org", ROOT / "agent-orgs" / "software-development-department"]
SOLUTION_DESIGNER = ROOT / "agent-teams" / "software-engineering-team" / "agents" / "solution-designer"

failures = []


def check(ok, message):
    print(("PASS: " if ok else "FAIL: ") + message)
    if not ok:
        failures.append(message)


def load(path):
    return json.loads(path.read_text())


def frontmatter_name(path):
    match = re.search(r"^---\n.*?^name:\s*(.+?)\s*$.*?^---", path.read_text(), re.S | re.M)
    return match.group(1) if match else None


def text_files(*roots):
    for root in roots:
        paths = [root] if root.is_file() else root.rglob("*")
        for path in paths:
            if path.is_file() and path.suffix in {".md", ".json"} and "visualizer-project" not in path.parts:
                yield path


# 1. JSON parses
json_paths = [TEAM / "team-config.json", *(org / "org-config.json" for org in ORGS), *TEAM.glob("agents/*/agent-config.json")]
for path in json_paths:
    try:
        load(path)
        check(True, f"JSON parses: {path.relative_to(ROOT)}")
    except Exception as error:  # noqa: BLE001
        check(False, f"JSON parses: {path.relative_to(ROOT)} ({error})")

# 2. Team members, coordinator, routes
team = load(TEAM / "team-config.json")
members = {m["memberName"]: m for m in team["members"]}
check(team["coordinatorMemberName"] in members, "coordinator is a team member")
for name, member in members.items():
    agent_dir = TEAM / "agents" / member["ref"]
    check((agent_dir / "agent.md").is_file() and (agent_dir / "agent-config.json").is_file(), f"member {name} resolves to {agent_dir.relative_to(ROOT)}")
    config = load(agent_dir / "agent-config.json")
    for skill in config.get("skillNames", []):
        skill_md = agent_dir / "skills" / skill / "SKILL.md"
        check(skill_md.is_file() and frontmatter_name(skill_md) == skill, f"{name} skill {skill} resolves and frontmatter matches")
for route in team["handoffs"]:
    for end in (route["from"], route["to"]):
        check(end.lstrip("/") in members, f"team route address {end} resolves")

# 3. Org routes into the Product Team resolve
for org in ORGS:
    for route in load(org / "org-config.json")["handoffs"]:
        for end in (route["from"], route["to"]):
            if end.startswith("/product_team/"):
                check(end.split("/")[2] in members, f"{org.name} route address {end} resolves")

# 4. Shared principles symlinks
for link in TEAM.glob("agents/*/skills/*/product-design-principles.md"):
    check(link.is_symlink() and link.resolve() == (TEAM / "shared" / "product-design-principles.md").resolve(), f"principles link resolves: {link.relative_to(TEAM)}")

# 5. Relative markdown links resolve
for path in text_files(TEAM):
    if path.suffix != ".md":
        continue
    for target in re.findall(r"\]\(([^)#\s]+)(?:#[^)]*)?\)", path.read_text()):
        if re.match(r"[a-z]+:", target):
            continue
        check((path.parent / target).exists(), f"link {target} in {path.relative_to(ROOT)}")

# 6. No legacy or competing terms
legacy = [
    r"prototyper", r"Prototype Completed", r"interactive UI (?:model|project|reference|baseline)",
    r"design (?:sandbox|model|project)", r"interactive reference", r"bootstrap report",
    r"production-ready", r"prototype",
]
allowed = [
    "Do not call it a prototype, sandbox, or UI",  # the terminology rule itself
    "`prototypes/`",  # prohibited generic directory name
]
scan_roots = [TEAM, *(org for org in ORGS), SOLUTION_DESIGNER, ROOT / "README.md"]
hits = []
for path in text_files(*scan_roots):
    for number, line in enumerate(path.read_text().splitlines(), 1):
        if any(token in line for token in allowed):
            continue
        for pattern in legacy:
            if re.search(pattern, line, re.I):
                hits.append(f"{path.relative_to(ROOT)}:{number}: {line.strip()[:120]}")
                break
check(not hits, "no legacy or competing Product Team terms" + ("" if not hits else ":\n  " + "\n  ".join(hits)))

# 7. Org outcome names are produced by the Product skills
skill_text = "\n".join(p.read_text() for p in TEAM.glob("agents/*/skills/*/SKILL.md"))
for org in ORGS:
    for route in load(org / "org-config.json")["handoffs"]:
        if not route["from"].startswith("/product_team/"):
            continue
        for rule in route["rules"]:
            match = re.search(r"classifies the outcome as (.+?) because", rule)
            if match:
                check(match.group(1) in skill_text, f"{org.name} outcome '{match.group(1)}' is produced by a Product skill")

# 8. UI/UX spec template records product values instead of defaults
spec = (TEAM / "agents" / "product-ui-ux-designer" / "skills" / "product-experience-design" / "templates" / "ui-ux-spec-template.md").read_text()
check("Existing product language to preserve" in spec, "spec template asks for existing product language")
check("Unchanged — follows baseline" in spec, "spec template allows proportional sections")
defaults = [r"\d+px", r"z-\d+", r"cubic-bezier", r"\d+ms", r"4\.5:1"]
found = [d for d in defaults if re.search(d, spec)]
check(not found, "spec template has no hard-coded design defaults" + (f" (found {found})" if found else ""))

print()
print("ALL CHECKS PASSED." if not failures else f"{len(failures)} CHECK(S) FAILED.")
sys.exit(1 if failures else 0)
