#!/usr/bin/env python3
"""Focused package and arithmetic checks; does not simulate an LLM or learner.

Run from any directory with Python 3 and PyYAML (also used by the skill validator).
"""
import json
from fractions import Fraction
from pathlib import Path
import xml.etree.ElementTree as ET

import yaml

ROOT = Path(__file__).resolve().parents[3]
TEAM = ROOT / "agent-teams/middle-school-mathematics-team"


def frontmatter(path):
    text = path.read_text()
    assert text.startswith("---\n"), path
    return yaml.safe_load(text.split("---", 2)[1])


def main():
    config = json.loads((TEAM / "team-config.json").read_text())
    meta = frontmatter(TEAM / "team.md")
    assert meta["name"] == "Middle School Mathematics Team"
    assert meta["description"] and meta["category"]
    members = config["members"]
    assert len(members) == 3
    names = {m["memberName"] for m in members}
    assert len(names) == 3 and config["coordinatorMemberName"] in names
    pairs = set()
    for route in config["handoffs"]:
        pair = (route["from"], route["to"])
        assert pair not in pairs
        pairs.add(pair)
        assert all(a.startswith("/") and a[1:] in names for a in pair)
        assert route["rules"] and all(isinstance(r, str) and r.strip() for r in route["rules"])
    assert pairs == {("/learning_guide", "/mathematical_reviewer"),
                     ("/mathematical_reviewer", "/learning_guide"),
                     ("/learning_guide", "/experience_builder"),
                     ("/experience_builder", "/mathematical_reviewer"),
                     ("/experience_builder", "/learning_guide")}
    for member in members:
        assert member["refType"] == "agent" and member["refScope"] == "team_local"
        folder = TEAM / "agents" / member["ref"]
        fm = frontmatter(folder / "agent.md")
        assert all(fm[k] for k in ("name", "description", "category", "role"))
        assert fm["role"] == folder.name
        wiring = json.loads((folder / "agent-config.json").read_text())
        assert {"get_handoff_rules", "send_message_to", "read_file", "write_file", "run_bash"} <= set(wiring["toolNames"])
        assert len(wiring["toolNames"]) == len(set(wiring["toolNames"]))
        assert len(wiring["skillNames"]) == 1
        for name in wiring["skillNames"]:
            skill = folder / "skills" / name
            assert frontmatter(skill / "SKILL.md")["name"] == name
            for link in skill.rglob("*"):
                if link.is_symlink():
                    assert link.exists(), link
                    assert link.resolve().is_relative_to(TEAM)
    print("PASS: JSON, frontmatter, three members, attached skills, links, coordinator, unique rooted routes")

    # Independent exact arithmetic for the four published example/transfer keys.
    for a, b, total, answer in [(3, 6, 18, 4), (2, 4, 14, 5)]:
        x = Fraction(total - b, a)
        assert x == answer and a*x + b == total
        assert Fraction(total, a) - Fraction(b, a) == x  # divide-first route
    for height, extra, area, answer in [(3, 2, 21, 5), (4, 1, 28, 6)]:
        width = Fraction(area, height) - extra
        assert width == answer and height*(width + extra) == area
        assert height*width + height*extra == area
    assert Fraction(3 - 5) == -2  # signed extension, not a negative bag/length
    assert 3*(5 + 2) != 3*5 + 2  # injected distribution fault must fail
    assert 2*(3 + 7) != 3*7  # area/perimeter are different quantities here
    assert (2 + 3)**2 != 2**2 + 3**2  # another misleading visual generalization
    cases = 0
    for a in range(-5, 6):
        for b in range(-5, 6):
            for c in range(-5, 6):
                assert a*(b+c) == a*b + a*c
                cases += 1
    print(f"PASS: four exact example keys, divide-first alternative, negative-model boundary, three fault counterexamples, {cases} distribution samples (not a proof)")

    assets = TEAM / "agents/learning-guide/skills/guide-visual-math-learning/assets"
    ns = {"s": "http://www.w3.org/2000/svg"}
    for svg in assets.glob("*.svg"):
        tree = ET.parse(svg)
        root = tree.getroot()
        assert root.attrib["role"] == "img"
        assert root.find("s:title", ns).text and root.find("s:desc", ns).text
        assert "not to scale" in root.find("s:desc", ns).text
        assert root.find(".//s:script", ns) is None
    bags = ET.parse(assets / "equal-groups.svg")
    assert len(bags.findall(".//s:circle", ns)) == 6
    areas = ET.parse(assets / "split-rectangle.svg")
    rects = areas.findall("s:rect", ns)[1:]  # first rectangle is the background
    assert len(rects) == 2
    left, right = [r.attrib for r in rects]
    assert left["y"] == right["y"] and left["height"] == right["height"]
    assert int(left["x"]) + int(left["width"]) == int(right["x"])
    print("PASS: accessible SVG structure, six counters, aligned nonoverlapping equal-height rectangle parts")
    print("LIMIT: arithmetic/structure checks do not validate all prose, model behavior, rendering, or learning outcomes")


if __name__ == "__main__":
    main()
