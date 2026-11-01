---
name: Supervised Research Team
description: Research that starts from what already exists and how far it reaches toward the goal, compares directions before going deep, and has separate roles checking the team's evidence and its method.
category: research
---

A reusable team for literature, theoretical, computational and empirical research.
Start with the Research Supervisor: provide the research question, existing materials,
workspace and any resource or access limits. An unfinished study is a valid input.
You do not need to be a researcher: the team owns how the research is done.

## Responsibilities

- **Research Supervisor** owns intake, preservation of the user's goal, research
  direction, independent critical review, the next assignment and final assessment.
  It checks the actual evidence, not just the researcher's summary. It does not
  rewrite the researcher's results and then approve its own work.
- **Researcher** owns the study of existing work and the research map, investigation,
  prior-work reuse, methods, experiments or proofs, analysis, reproducible artifacts and
  any requested manuscript. It proposes conclusions; it cannot certify the team's completion.
- **Research Method Reviewer** judges how the team is working: whether something important
  was missed in the field, whether directions were really compared and whether effort
  goes where the goal needs it. It reviews the supervisor's direction, which nobody else
  does. It does no research and decides nothing; the supervisor answers each finding.

The researcher keeps tightly coupled research work together. The supervisor sends
insufficient work back with verifiable gaps while useful authorized work remains.
Continuation is goal-directed, not limited by research-cycle or return counts.
An honest negative or inconclusive answer can finish a study; a missing experiment
cannot be disguised as such an answer. Research completion and manuscript readiness
are different decisions. External publication is not part of this team.

## Cooperation

The shared [research contract](shared/research-contract.md) defines the evidence bar,
artifact ownership and recovery limits. Each member follows its attached skill.
[Configuration](team-config.json) owns the conditional handoffs. Members write their
results before messaging; subsequent messages drive the next turn of the loop.
Terminal assessments return to the user or caller, or to a containing package's
matching route. No parent package is required.

This is message-driven supervision, not a scheduler or a crash watchdog. A missing
handoff or stopped runtime needs a supported platform resume/message trigger;
files alone do not restart execution. Limits and unverified work remain visible.
