# AutoByteus Agents

This repository contains reusable AutoByteus agent and agent-team definitions.

## Software Engineering Team

The software engineering team is organized as a practical delivery group that can take work from upstream solution design through implementation, API and E2E validation, review, docs sync, final handoff, release, and deployment.

## Research To Deck Team

The research-to-deck team is organized as a two-specialist workflow that takes a topic from deep research and reasoning through infographic-style PowerPoint deck production.

## Bible Learning Team

The Bible learning team is organized as a context-first teaching workflow that takes a passage, topic, or question from deep background research through teaching preparation, critical review, and default slide-deck production unless the user explicitly wants a teaching-only result.

## Article Writing Team

The article writing team is organized as a style-aware two-specialist workflow that takes an article request from brief and outline through full draft, critical review, and revision until the article is publication-ready.

Each role-agent folder always includes:

- `agent.md`: distilled runtime prompt
- `agent-config.json`: runtime wiring such as `skillNames`, tools, and processors

When a role owns a local bundled skill, the folder also includes:

- `SKILL.md`: fuller specialist workflow and collaboration guidance
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

This repository uses both patterns: most specialist roles use agent-bundled skills, and some roles intentionally attach shared standalone skills directly from `agent-config.json`.

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
- If an agent intentionally reuses a shared standalone skill instead of a bundled local one, keep the specialization in `agent.md` and point `agent-config.json.skillNames` at the shared skill.
- Keep `agent.md` short. Move detailed workflow steps, artifact schemas, and output section structure into `SKILL.md` and local `templates/` so the same skill format works cleanly for bundled agent skills and custom skills.

## Authoring Best Practices

When a role has a reusable skill, treat `SKILL.md` as the main operating contract and keep `agent.md` intentionally thin.

### Put In `agent.md`

- role identity and short purpose
- short reminder of which bundled or shared skills are authoritative
- runtime-only specialization that should stay with the agent prompt
- tone or review stance when that matters at runtime

### Put In `SKILL.md`

- reusable workflow steps and stage order
- artifact order, artifact expectations, and handoff rules
- routing rules, blocking rules, and send-back behavior
- checklists, operating heuristics, and collaboration guidance
- reusable policy or quality bars that should still apply if the skill is attached somewhere else later

### Put In `templates/`

- output structure
- report skeletons
- required sections or tables for durable artifacts

### Avoid

- copying the same workflow rules into both `agent.md` and `SKILL.md`
- keeping artifact schemas or long checklists in `agent.md`
- creating a second mini-skill inside `agent.md` after a proper `SKILL.md` already exists
- splitting one reusable rule across multiple files unless the split has a clear ownership reason

### Update Rule

- When workflow behavior changes, update `SKILL.md` first.
- Update `agent.md` only when the agent's identity, authoritative skill references, runtime-only specialization, or tone need to change too.
- If the same guidance would still matter when the skill is reused without the current bundled `agent.md`, it belongs in `SKILL.md`, not `agent.md`.

The team is intentionally modeled as direct specialist cooperation instead of a separate coordinator agent. Handoffs and rework paths are expressed through `team.md` and each specialist's routing rules.
The software engineering team also includes a deployment specialist so release preparation, versioning, tagging, rollout, and deploy verification can be owned explicitly instead of being left implicit at the end.

The runtime configuration is intentionally lightweight. After importing these definitions into AutoByteus, users are expected to customize tools, processors, models, and other config details to match their own environment.
