---
name: Supervised Research Team
description: Evidence-driven research with a separate supervisor who checks the original goal, challenges premature completion, requests further work, and assesses manuscript readiness.
category: research
---

A reusable team for literature, theoretical, computational and empirical research.
Start with the Research Supervisor: provide the research question, existing materials,
workspace and any resource or access limits. An unfinished study is a valid input.

## Responsibilities

- **Research Supervisor** owns intake, preservation of the user's goal, independent
  critical review, the next bounded research assignment, and the final assessment.
  It checks the actual evidence, not just the researcher's summary. It does not
  rewrite the researcher's results and then approve its own work.
- **Researcher** owns investigation, methods, experiments or proofs, analysis,
  reproducible artifacts and any requested manuscript. It proposes conclusions;
  it cannot certify the team's completion.

The researcher keeps tightly coupled research work together. The supervisor sends
insufficient work back with verifiable gaps while useful authorized work remains.
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
