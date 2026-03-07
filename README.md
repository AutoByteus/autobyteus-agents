# AutoByteus Agents

This repository contains reusable AutoByteus agent and agent-team definitions.

## Software Engineering Workflow Team

The definitions in this repository include a software-engineering workflow team derived from the `software-engineering-workflow-skill` in the sibling `autobyteus-skills` repository.

Each role-agent folder is packaged as a small specialist bundle:

- `agent.md`: distilled runtime prompt
- `SKILL.md`: fuller specialist workflow and collaboration guidance
- `templates/`: lightweight role-specific artifacts and output templates

The team is intentionally modeled as direct specialist cooperation instead of a separate coordinator agent. The transition logic from the original single-agent workflow is expressed through `team.md` and each specialist's routing rules.

The runtime configuration is intentionally lightweight. After importing these definitions into AutoByteus, users are expected to customize tools, processors, models, and other config details to match their own environment.
