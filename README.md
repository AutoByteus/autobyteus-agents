# AutoByteus Agents

This repository contains reusable AutoByteus agent and agent-team definitions.

## Software Engineering Workflow Team

The software engineering workflow team is organized as a practical delivery group that can take work from investigation and requirements engineering through API and E2E validation, review, release, and deployment.

## Research To Deck Team

The research-to-deck team is organized as a two-specialist workflow that takes a topic from deep research and reasoning through infographic-style PowerPoint deck production.

Each role-agent folder is packaged as a small specialist bundle:

- `agent.md`: distilled runtime prompt
- `SKILL.md`: fuller specialist workflow and collaboration guidance
- `templates/`: role-specific artifacts and output templates

Some bundles also include richer local support files such as `references/` and `scripts/` when the underlying workflow depends on them.

The team is intentionally modeled as direct specialist cooperation instead of a separate coordinator agent. Handoffs and rework paths are expressed through `team.md` and each specialist's routing rules.
The software-engineering workflow team also includes a deployment specialist so release preparation, versioning, tagging, rollout, and deploy verification can be owned explicitly instead of being left implicit at the end.

The runtime configuration is intentionally lightweight. After importing these definitions into AutoByteus, users are expected to customize tools, processors, models, and other config details to match their own environment.
