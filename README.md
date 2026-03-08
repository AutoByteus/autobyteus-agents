# AutoByteus Agents

This repository contains reusable AutoByteus agent and agent-team definitions.

## Software Engineering Workflow Team

The software engineering workflow team is organized as a practical delivery group that can take work from investigation and requirements engineering through API and E2E validation, review, release, and deployment.

## Research To Deck Team

The research-to-deck team is organized as a two-specialist workflow that takes a topic from deep research and reasoning through infographic-style PowerPoint deck production.

Each role-agent folder is packaged as a small specialist bundle:

- `agent.md`: distilled runtime prompt
- `SKILL.md`: fuller specialist workflow and collaboration guidance
- `agent-config.json`: runtime wiring such as `skillNames`, tools, and processors
- `templates/`: role-specific artifacts and output templates

Some bundles also include richer local support files such as `references/` and `scripts/` when the underlying workflow depends on them.

## Supported Layouts

AutoByteus currently supports two skill packaging patterns.

### 1. Agent-bundled skill

Use this when a skill belongs to one specific agent bundle.

```text
<definition-root>/
  agents/
    <agent-id>/
      agent.md
      agent-config.json
      SKILL.md
      templates/
      references/
      scripts/
```

Rules:

- `SKILL.md` in the agent folder is enough for the folder to be treated as a bundled skill.
- `agent-config.json` should explicitly declare:
  - `"skillNames": ["<agent-id>"]`
- The skill name, agent folder name, and configured `skillNames` entry should match.
- `SKILL.md` being present does not auto-attach that skill to the agent at runtime. Runtime attachment is explicit through `skillNames`.

This repository uses that pattern.

### 2. Standalone shared skill source

Use this when a skill should exist independently from any one agent.

```text
<skill-source-root>/
  skills/
    <skill-name>/
      SKILL.md
      templates/
      references/
      scripts/
```

or equivalently:

```text
<skill-source-root>/
  <skill-name>/
    SKILL.md
    ...
```

Rules:

- A skill folder is recognized by the presence of `SKILL.md` at that folder's top level.
- A directory literally named `skills/` is optional.
- `skills/` is only needed when you want to organize multiple standalone skills under one root.

## Recommended Practice For Agent Packages

- If a skill is owned by a single agent, keep it bundled in that agent folder.
- If a skill is shared across multiple agents, move it to a standalone shared skill source.
- Even when a bundled `SKILL.md` exists, keep `agent-config.json.skillNames` explicit so the package is self-describing and runtime wiring is deterministic.

The team is intentionally modeled as direct specialist cooperation instead of a separate coordinator agent. Handoffs and rework paths are expressed through `team.md` and each specialist's routing rules.
The software-engineering workflow team also includes a deployment specialist so release preparation, versioning, tagging, rollout, and deploy verification can be owned explicitly instead of being left implicit at the end.

The runtime configuration is intentionally lightweight. After importing these definitions into AutoByteus, users are expected to customize tools, processors, models, and other config details to match their own environment.
