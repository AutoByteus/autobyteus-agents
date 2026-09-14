# Agent Package Authoring

Practical file formats, packaging conventions, and authoring checks for this
repository. For ownership and topology decisions, start with
[Agent Team Design Principles](../agents/agent-team-architect/skills/agent-team-architecture/references/agent-team-design-principles.md).
The [Agent Team Architecture skill](../agents/agent-team-architect/skills/agent-team-architecture/SKILL.md)
owns the create/update procedure; this guide explains how to express a package
in repository files, not how a specialist performs its domain work.

## Contents

- [File responsibilities](#file-responsibilities)
- [Coordinator registration and responsibilities](#coordinator-registration-and-responsibilities)
- [Supported layouts](#supported-layouts)
- [Shared team reference files](#shared-team-reference-files)
- [Work-to-handoff boundary](#work-to-handoff-boundary)
- [Markdown file reference style](#markdown-file-reference-style)
- [Writing effective instructions](#writing-effective-instructions)
- [Example: Evidence-Driven Delivery](#example-evidence-driven-delivery)
- [Validation checklist](#validation-checklist)

## File Responsibilities

Each role folder contains `agent.md` and `agent-config.json`. Add a bundled
skill, references, templates, or scripts only when the role needs them.

| File | Content |
| --- | --- |
| `agent.md` | Short identity and purpose, authoritative skill reminder, runtime-only specialization or tone, and the standard post-work transition for participating specialists. |
| `agent-config.json` | Explicit `skillNames`, `toolNames`, processors, and lifecycle/runtime settings. |
| `SKILL.md` | The specialist's inputs, work sequence, decisions, artifacts, quality checks, approval boundaries, recovery, result classification, and completion criteria. |
| `team.md` | Team purpose, member boundaries, entry contract, concise cooperation paths, and team-wide communication expectations. |
| `team-config.json` | `coordinatorMemberName`, member names and references (`ref`, `refType`, `refScope`), rooted addresses, and conditional handoff rules. |
| `templates/` | Artifact schemas, required sections, tables, and report skeletons. |
| `references/` or team `shared/` | Detailed principles, examples, and reusable standards linked by their consumers. |
| `README.md` | Human-facing package overview and navigation. |

Keep a specialist's procedure in its skill, not in the agent shell or team
summary. Team configuration owns route conditions and recipient addresses;
skills produce the evidence and result fields those conditions inspect.
A skill can remind its user to retrieve handoff rules without copying them.

A working specialist's agent shell can use this shape:

```text
You are the <role>.

Follow the bundled `<skill-name>` skill as the authoritative workflow for your
responsibility, inputs, outputs, validation, and recovery.

After the skill-defined work is complete, persist the result and artifacts,
call `get_handoff_rules`, apply every matching rule, send the result to each
exact returned `recipient_address` with `send_message_to`, and stop. If no rule
matches, return the result to the user or calling workflow.
```

Include `name`, `description`, `category`, and `role` in `agent.md` frontmatter.
Attach a bundled or shared skill explicitly in `agent-config.json`. Keep any
runtime-only specialization in the shell; reusable behavior belongs in the
skill. A role with no skill-defined work does not need a fabricated skill.

## Coordinator Registration And Responsibilities

`coordinatorMemberName` is team-level wiring. It does not by itself assign
intake, management, approval, forwarding, or final-response duties. Describe
actual responsibilities in the owning role's work contract and summarize the
team relationship in `team.md`; the agent shell and skill need not announce
that the role is the team's coordinator or entrypoint.

A working coordinator can own a real specialist responsibility, as Solution
Designer does. A framework-required placeholder can instead have no workflow
duties, attached skills, or handoff tools. Do not create routes to or from it
merely because it fills the coordinator slot. The
[Software Development Department](../agent-teams/software-development-department/team.md)
uses this placeholder pattern; it is not a requirement for every team.

## Supported Layouts

AutoByteus currently supports two skill packaging patterns.

### 1. Agent-bundled skill

Use this when a skill belongs to one specific agent bundle. For a standalone
agent, `<definition-root>` is the repository root; for a team-local agent it
is `agent-teams/<team-id>/`.

```text
<definition-root>/
  agents/
    <agent-id>/
      agent.md
      agent-config.json
      skills/
        <skill-name>/
          SKILL.md
          templates/
          references/
          scripts/
```

Rules:

- Agent-owned skills must live under the agent's `skills/<skill-name>/` folder, even when the agent has only one skill.
- `agent-config.json` should explicitly declare:
  - `"skillNames": ["<skill-name>"]`
- The skill folder name, configured `skillNames` entry, and `SKILL.md` frontmatter `name:` should match.
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

## Shared Team Reference Files

Some teams also keep a shared reference document under a team-local `shared/` folder, for example:

```text
<team-root>/
  shared/
    design-principles.md
```

When multiple agent-bundled skills in the same team need that shared file, prefer the software-engineering-team pattern:

```text
<team-root>/
  agents/
    <agent-id>/
      skills/
        <skill-name>/
          SKILL.md
          design-principles.md -> ../../../../shared/design-principles.md
```

Rules:

- Keep the canonical shared file in the team's `shared/` folder.
- Create a local symlink inside each consuming skill folder that points to the shared file.
- In the consuming `SKILL.md`, reference the local file name such as `[design-principles.md](design-principles.md)` instead of a brittle relative path like `../../shared/design-principles.md`.
- Use this pattern for shared reference docs, principles, and reusable policy files that belong to one team package but are read by multiple bundled agent skills.
- Do not duplicate the shared file into each skill folder; use one canonical shared file plus symlinks so updates stay synchronized.

## Work-to-Handoff Boundary

Each specialist completes its own work, not another member's private workflow,
repository, ticket lifecycle, branches, worktrees, or commits. The receiving
specialist depends on the delivered result and evidence, not the producer's
implementation details.

```text
receive input -> use own skill -> persist artifacts and result
-> classify outcome -> get_handoff_rules -> apply every matching rule
-> send to each exact returned recipient -> stop
```

Before routing, persist a file-backed result with, as applicable:

- user request, goals, constraints, and approval state;
- source material, relevant links, and still-relevant upstream artifact paths;
- status such as `Completed`, `Blocked`, `Pass`, `Fail`, `Requirement Gap`, or
  `Design Impact`;
- route-relevant classification fields using the team's exact names and values;
- validation evidence, assumptions, risks, blockers, and recovery context;
- expected output or next action.

Treat communication as email with attachments: `send_message_to` carries a
short outcome and next-action summary, while durable files carry the complete
context. Mention the absolute result-file path in the message and attach it,
with relevant supporting files, through the tool's reference-files field.
The receiver reads those files before acting; replies use the same file-backed
pattern.

`team-config.json` supplies conditional recipients through `get_handoff_rules`.
Apply **every** matching rule: a result may require both a primary handoff and
an informational notification. Use each exact returned `recipient_address`,
not an address inferred from memory. When no rule matches, return the result
to the user or caller. Stop after required handoffs succeed rather than polling
or doing the next specialist's work.

Rules should distinguish normal success, recovery, informational notifications,
and terminal outcomes. Make mutually exclusive routes clear so a result does
not accidentally route both forward and backward. Reviews and escalation are
conditional policies, not automatically mandatory stages for every team.

An agent participating in this protocol needs `get_handoff_rules` and
`send_message_to` in its runtime tool configuration. State the universal
transition in the agent/team contract; the skill owns work completion and
result classification, not a duplicate routing matrix. `delegate_task` starts
a separate delegated execution and is not a substitute for this protocol.
If a workflow deliberately uses another mechanism, declare that choice without
conflicting instructions for the same transition.

## Markdown File Reference Style

When documentation or skills refer to a concrete repo-local source file, template, reference document, or script, use a Markdown link instead of a bare path.

Good examples:

- `[design-principles.md](design-principles.md)`
- `[product-promo-brief-template.md](templates/product-promo-brief-template.md)`
- `[shared/narrated-presentation-principles.md](shared/narrated-presentation-principles.md)`

Use backticks for generated runtime artifacts, commands, JSON keys, identifiers, placeholder layout paths, and file names that are examples rather than links to one concrete file. For example, `presentation-brief.md`, `skillNames`, and `<team-root>/agents/<agent-id>/skills/<skill-name>/SKILL.md` are not source links.

This keeps skills easy to navigate while preserving clear monospace formatting for generated artifacts and code-like identifiers.

## Writing Effective Instructions

Put reusable guidance in `SKILL.md` and link detailed schemas or checklists
from templates/references. Copying workflow rules into both the agent shell
and the attached skill makes the composed runtime prompt noisier and allows
conflicting versions to drift apart.

When behavior changes, edit its canonical owner. Change `agent.md` only if
identity, skill binding, runtime-only specialization, tone, or the universal
communication transition also changes. A team summary should describe
cooperation without duplicating specialist procedures or route conditions.

### Prefer Positive Operating Contracts

Write agent and skill instructions around the correct result and the successful workflow that produces it.

Good agent guidance should answer:

- what artifact should exist at the end
- what a correct artifact looks like
- what exact inputs the agent should use
- what sequence of actions usually produces the correct result
- what examples the agent can imitate
- what quality checks prove the artifact is ready

Use constraints only when they directly protect the target artifact. A useful negative instruction names a bad output state that would make the artifact fail. An unhelpful negative instruction focuses on an unrelated implementation workaround instead of teaching the agent what to produce.

Prefer this:

```text
Create one complete A4 landscape coloring-page image for page003.
Use cute black-and-white rounded doodle line art, large closed colorable shapes,
a peaceful hillside scene with David and a sheep, and the exact bottom caption
"David cared for the sheep." inside a simple caption band within the page border.
```

Instead of this:

```text
Do not use Python to add the caption later.
```

Positive examples are especially important for generation agents. If the desired final image, document, deck, video, or code artifact should be self-contained, say so as a finished-output requirement and show the correct prompt or artifact shape. Review and packaging roles should then verify and preserve that approved artifact rather than inventing a separate workaround.

When negative guidance is needed, keep it relevant to the target artifact:

```text
When the storyboard requires a caption, the generated page image must include
that exact caption. A generated page without the caption is not ready.
```

This teaches the agent which output fails and why, while the positive prompt still shows how to create the correct result.

## Example: Evidence-Driven Delivery

For a complete working example, refer to
[`agent-teams/evidence-driven-delivery-team/`](../agent-teams/evidence-driven-delivery-team/).
It models a normal human delivery loop with four independent specialists:

The canonical edges are:

- The runtime entry is `/planner` because `coordinatorMemberName` is
  `planner`; the user or calling workflow sends the request there first.
- `/investigator -> /planner`: initial or task-focused evidence, including
  blocked investigation evidence.
- `/planner -> /implementer`: one ready task or in-scope rework.
- `/planner -> /investigator`: a material unknown prevents defining the next
  task safely.
- `/implementer -> /validator`: implementation and local checks are complete.
- `/implementer -> /planner`: implementation reveals a blocker, invalid
  dependency, or scope mismatch.
- `/validator -> /planner`: validation produces `Pass`, `Fail`, or `Blocked`
  feedback.

Implementer and Validator do not contact Investigator directly. They send
evidence or feedback to Planner, which owns the decision to request focused
investigation or continue implementation.

- **Investigator** establishes evidence for the overall request or the next
  focused task.
- **Planner** is the coordinator and entry specialist. It chooses direct,
  incremental-slice, or discovery-led planning and defines only the next
  smallest valuable task or focused investigation question. Each step has
  explicit scope, expectation, dependencies, and validation conditions.
- **Implementer** executes one ready micro-task and records the actual result.
- **Validator** compares the actual result with the planner's expectation and
  produces evidence-backed `Pass`, `Fail`, or `Blocked` feedback.
- **Planner** consumes the feedback and chooses in-scope rework, the next
  small task, focused investigation, a blocker result, or completion. For a
  large unclear objective, it investigates only enough to make the next step
  safe rather than planning the whole product in advance.

This example demonstrates why the handoff is a separate post-work phase. Each
specialist focuses on its own work and result; after completion, it calls
`get_handoff_rules`, applies every matching rule, sends the required messages,
and stops. Planner coordinates the next step without implementing or
validating, Validator does not fix, and Investigator does not plan. All
handoffs in this example use `send_message_to`; the team config changes the
loop without changing the specialists' core work contracts.

## Validation Checklist

Before considering a package change complete:

- Parse changed JSON and check required frontmatter and name alignment.
- Confirm each configured skill resolves; the bundled folder, `skillNames`
  entry, and `SKILL.md` frontmatter name must agree.
- Check local Markdown links, symlink targets, member references, and rooted
  handoff addresses.
- Verify tools match actual responsibilities, including handoff tools only
  where the role participates in that protocol.
- Confirm each rule has one canonical owner and that the shell is not a
  second skill. Keep schemas and checklists in their owning resources.
- Check that routing can change without rewriting specialist procedures and
  that a specialist can finish without performing the next owner's work.
- Verify all-match and no-match behavior and one declared handoff mechanism
  per workflow.
- Remove stale names, references, and obsolete routes; preserve accepted
  behavior outside the approved change.
- Review the complete diff, record validation evidence and limitations, and
  preserve repository-specific approval and finalization requirements.

Runtime configuration remains customizable after import: users can adapt
tools, processors, models, and other settings to their environment.
