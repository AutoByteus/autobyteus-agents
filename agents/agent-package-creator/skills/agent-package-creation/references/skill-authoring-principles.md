# Skill Authoring Principles

Use this reference for standalone and Agent-bundled skills. The [package design principles](package-design-principles.md) cover package boundaries and writing standards; this file covers skill instructions.

## Choose ownership and location

A Skill defines repeatable **how-to work**: its trigger, inputs, decisions, actions, outputs, checks, recovery, and stopping point. It has no role identity, tool grants, member roster, or recipient matrix. Those belong to its owning Agent or containing Team/Org configuration.

- **Standalone skill:** The Skill is independently requested or intentionally shared. Place a folder containing `SKILL.md` at a confirmed skill-source root, such as `<skill-source-root>/<skill-name>/` or `<skill-source-root>/skills/<skill-name>/` when that repository uses a `skills/` grouping. Do not assume the current repository's `.codex/skills/` symlinks are the writable source of an unrelated project.
- **Agent-bundled skill:** One Agent owns it. Place it at `<agent-root>/skills/<skill-name>/SKILL.md` and attach `<skill-name>` explicitly through `agent-config.json` `skillNames`. Team-local and org-local Agents follow the same rule beneath their own roots.

Choose a lowercase hyphenated name that describes the work. Keep the folder, `SKILL.md` frontmatter `name`, and configured skill name aligned. If the target runtime requires additional metadata, use that runtime's observed format; do not invent a metadata file merely for completeness.

## Write the operating contract

For a new skill, establish the intended trigger, users, behavior, outputs, constraints, and stopping point from the request and confirmed repository conventions. For an update, read the existing skill and linked resources first; distinguish the requested change from its accepted trigger, outputs, approvals, recovery, and stopping condition. Preserve those commitments unless the user approves a change or evidence reveals a contradiction.

The frontmatter `description` should make selection accurate: state the task and a meaningful boundary, not a broad personality or exhaustive list of tools. In the body, give the shortest coherent path:

`trigger and purpose → inputs/prerequisites → core decisions and work → outputs → validation/recovery → handoff or stop`

Specify what a finished artifact contains and what evidence proves it ready. Put approval or safety gates next to the action they control. Allow judgment where multiple approaches can satisfy the request; prescribe exact steps or scripts where the operation is fragile or deterministic.

A skill used by a Team member may classify the result needed by handoff rules, but the Team/Org config owns conditional recipients. An Agent shell may remind the role to use its skill; it should not repeat the skill's full procedure. A standalone skill should not imply an Agent attachment or runtime tool access it does not have.

## Ground and prioritize instructions

Resolve structure and flow before local wording. For each material instruction, identify its condition, action, result, owner, and evidence. Distinguish actions, constraints, exceptions, and validation gates from explanation that changes no decision, output, or safeguard. Ground claims about files, tools, defaults, guarantees, and runtime effects in the request, approvals, repository contract, observed capability, or trusted sources; label assumptions and surface behavior-changing gaps.

For a prohibition, identify the positive route, a plausible normal-path mistake, and the distinct boundary it protects; otherwise remove it or move package context to docs. Use domain terms by default. Name a platform, product, company, or project only when it changes the trigger, file format, tool integration, or behavior.

## Use supporting resources deliberately

- Keep common routing and the primary workflow in `SKILL.md`.
- Put substantial conditional standards, worked examples, and schemas in directly linked `references/` or `templates/`, with one authoritative owner per rule.
- Use `scripts/` when a repeatable deterministic operation materially improves reliability; run focused checks on changed scripts.
- Use `assets/` for files copied or adapted into outputs, not as hidden instructions.

An ordinary small skill may need only `SKILL.md`. Add a resource when it owns distinct instructions or output material; check for unfinished scaffold placeholders during validation.

## Minimal examples

**Standalone Skill.** The user requests a reusable source-dossier procedure, not a new research Agent. The confirmed skill source contains:

```text
<skill-source-root>/source-dossier/
  SKILL.md
```

Its `SKILL.md` could begin:

```markdown
---
name: source-dossier
description: Build a source-grounded dossier from a topic or supplied materials when the user needs reusable research evidence rather than an article draft.
---

# Source Dossier

Identify the question and supplied sources. Gather relevant evidence, record
claim-to-source links and unresolved uncertainty, then deliver a concise dossier
with a source index. Check that each substantive claim has support before handoff.
```

This is a Skill package, not an Agent: no `agent.md` or `agent-config.json` is created for it. A later Agent may attach the skill if its role actually uses this procedure.

**Bundled Skill.** The user requests a `source-researcher` Agent whose specialist procedure is source-dossier work. The Agent package can contain:

```text
agents/source-researcher/
  agent.md
  agent-config.json       # includes "skillNames": ["source-dossier"]
  skills/source-dossier/
    SKILL.md
```

Here `agent.md` owns the researcher's identity and runtime stance; `agent-config.json` owns tool and skill wiring; `SKILL.md` owns the dossier procedure. If several Agents should share the same skill independently, move that procedure to a confirmed standalone skill source and configure each consumer rather than maintaining divergent copies.

## Validate the skill as loaded

Check the standard validator when available, frontmatter and name alignment, discriminating description, local links and directly discoverable references, intended versus actual outputs, and any script syntax or focused behavior. Confirm that frontmatter, body, references, and configured attachment describe one effective trigger and behavior rather than conflicting variants. For a bundled skill, check `skillNames` resolves to the folder/frontmatter. For an update, compare the previous trigger, required outputs, approvals, recovery, and stopping condition with the revised package. Report unavailable runtime-selection or tool checks as limitations rather than claiming observed behavior from prose alone.
