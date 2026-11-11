---
name: Supervised Research Team
description: Research that starts from what already exists and how far it gets toward the goal, compares directions before going deep, is steered by a supervisor who checks the evidence and its own direction, and tests methods meant for agents on clean agents rather than by hand.
category: research
---

A reusable team for literature, theoretical, computational and empirical research. Start
with the Research Supervisor: give it the question, your materials and the workspace. An
unfinished study is a valid input. You do not need to be a researcher; the team owns the
method.

## Responsibilities

- **Research Supervisor** steers: intake, the user's goal, the direction, the method
  review including its own direction, checks of the evidence, each assignment and the
  final assessment.
- **Researcher** does the research: existing work, methods, experiments or proofs,
  analysis, reproducible artifacts and any requested manuscript. It proposes conclusions;
  only the supervisor completes the study.
- **Agent Package Creator** is the test bench when a study tests a method that agents
  should use: it builds the agents with the method and as a control, runs them in isolated
  instances, and returns the evidence and, for a new version, the comparison with the old.
  It acts only on the researcher's test requests.

## Cooperation

The supervisor assigns, the researcher reports, and the supervisor reviews and decides,
until the study is complete or needs the user. Both keep the research map current: the
study's one living document. The [research contract](shared/research-contract.md) holds
the shared rules and records, each member follows its skill, and the
[configuration](team-config.json) owns the handoffs. A final assessment returns to the
user or caller.
