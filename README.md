# AutoByteus Agents

This repository contains reusable AutoByteus agent and agent-team definitions.

## Standalone Agents

### Pitch Practice Investor

The pitch practice investor simulates a startup investor for spoken pitch rehearsal. It studies user-provided startup materials from the conversation, then runs a realistic mock investor pitch round with focused questions, constructive pressure, and optional feedback. It is intentionally lightweight and uses only the `speak` tool during live pitch practice.

### Resume Designer

The resume designer creates resume packages from user input or supplied resume sources, selects or authors an audience-appropriate pure-text style brief, dynamically generates a browser-rendered frontend resume app from that brief, starts a preview when possible, reviews it in the embedded in-app browser when available, verifies the render, and exports a print-ready PDF. It treats the frontend source as the editable resume system and the PDF as the default hiring-workflow handoff artifact.

### Research Engineer

The research engineer is a standalone agent for dynamic research tasks: broad source discovery, internet and website research when allowed, paper or PDF retrieval when allowed, continuous research notes, research planning, literature search, paper understanding, implementation when needed, local setup when needed, empirical validation when needed, benchmarking, result analysis, illustrative HTML explanation, self-review, and iterative research decisions. It is meant for work where the right execution path depends on the topic, such as reproducing a paper, implementing attention from scratch, setting up a research model locally, debugging a training run, comparing algorithms, or evaluating whether a research idea actually improves a metric.

### Paper Research Assistant

The paper research assistant is a standalone agent for the common paper-reading workflow: search for relevant papers from a user question or topic, retrieve a supplied paper from a link, identifier, PDF, or local file, extract paper metadata and detailed content, and answer user questions grounded in the paper. It is intentionally narrower than the research engineer: it focuses on discovery, paper ingestion, paper dossiers, concise comparison, and evidence-aware paper QA rather than implementation, reproduction, training, or benchmarking.

## Software Engineering Team

The software engineering team is organized as a practical delivery group that can take work from upstream solution design through implementation, API and E2E validation, review, docs sync, final handoff, release, and deployment.

## Research Engineering Team

The research engineering team is organized as a lean two-role loop for research-heavy engineering tasks: a `research_scientist` owns adaptive source discovery, immediate source-by-source research notes, prior-art and state-of-work assessment, paper and repository investigation, source-code reading when needed, research framing, lightweight exploratory probes, metrics, expected outcomes, and the `implementation-plan.md` handoff contract; an `implementation_engineer` owns minimal implementation, run execution, training or benchmark monitoring, validation evidence, requested output artifacts, and detailed feedback. It is meant for work where the right path emerges through repeated research, implementation/probing, validation, analysis, and revised implementation plans.

## Software Product Promo Video Team

The software product promo video team is organized as a product-marketing video workflow for software products, mobile apps, websites, and SaaS tools. It takes supplied screenshots, recordings, product links, brand material, or rough notes through a single promo director for positioning, approved script, voiceover generation, measured timing, and audio-informed storyboard, then continues through a merged visual director for visual planning and production, an independent visual reviewer for visual QA and user approval, optional captions when requested, edit assembly, and final promotional video QA. The visual director maintains `visual-source-index.md` as the durable source of truth for supplied images, generated or edited variants, lineage, missing visual needs, and final-use status. The team defaults to visuals plus narration instead of added explanatory text overlays.

## Narrated Presentation Video Team

The narrated presentation video team is organized as a slide-based explainer and teaching-style presentation workflow. It takes user-provided materials, links, rough notes, documents, or topics through a presentation director for research, explanation framing, narration script writing, and slide storyboard planning, then requires full narration-script review before slide/video production, voiceover generation, and simple still-slide video assembly. The producer maintains `media-resource-index.md` as the durable registry for source media, generated slide images, audio clips, logs, and final exports.

## Classroom Simulation Team

The classroom simulation team is organized as a two-role teacher-student demo for agent-to-agent communication. Both agents start classroom file work with `pwd` and write classroom files under the current workspace returned by `pwd`. The `professor` writes assignments or feedback to files with `run_bash`, then sends them to `student` through `send_message_to` with the file paths as references. The `student` reads the referenced file, writes the answer file under the same workspace, and replies to `professor` through `send_message_to`.

## Research To Deck Team

The research-to-deck team is organized as a two-specialist workflow that takes a topic from deep research and reasoning through infographic-style PowerPoint deck production.

## Manga Video Studio Team

The manga video studio team is organized as a story-first creative workflow that takes a manga idea from canon and character design through storyboard, consistent image generation, and narrated motion-comic video assembly.

## Bible Learning Team

The Bible learning team is organized as a context-first teaching workflow that takes a passage, topic, or question from deep background research through teaching preparation, critical review, and default slide-deck production unless the user explicitly wants a teaching-only result.

## Article Writing Team

The article writing team is organized as a style-aware two-specialist workflow that takes an article request from brief and outline through full draft, critical review, and revision until the article is publication-ready.

Each role-agent folder always includes:

- `agent.md`: distilled runtime prompt
- `agent-config.json`: runtime wiring such as `skillNames`, tools, and processors

When a role owns a local bundled skill, the agent folder also includes a `skills/` subtree:

- `skills/<skill-name>/SKILL.md`: fuller specialist workflow and collaboration guidance
- `skills/<skill-name>/templates/`: role-specific artifacts and output templates

Some bundles also include richer local support files such as `skills/<skill-name>/references/` and `skills/<skill-name>/scripts/` when the underlying workflow depends on them.

## Markdown File Reference Style

When documentation or skills refer to a concrete repo-local source file, template, reference document, or script, use a Markdown link instead of a bare path.

Good examples:

- `[design-principles.md](design-principles.md)`
- `[product-promo-brief-template.md](templates/product-promo-brief-template.md)`
- `[shared/narrated-presentation-principles.md](shared/narrated-presentation-principles.md)`

Use backticks for generated runtime artifacts, commands, JSON keys, identifiers, placeholder layout paths, and file names that are examples rather than links to one concrete file. For example, `presentation-brief.md`, `skillNames`, and `<team-root>/agents/<agent-id>/skills/<skill-name>/SKILL.md` are not source links.

This keeps skills easy to navigate while preserving clear monospace formatting for generated artifacts and code-like identifiers.

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

## Recommended Practice For Team Packages

Treat `team.md` as the team's coordination contract, not as a second copy of each specialist's skill.

### Put In `team.md`

- short team purpose and entry specialist
- member list and ownership boundaries
- high-level delivery flow between members
- handoff expectations, including `send_message_to` usage and required artifact visibility
- issue routing between members
- links or pointers to shared team references

### Put In Team-Shared References

- cross-member operating principles
- shared quality bars and policy rules
- shared artifact conventions that more than one member must respect
- decisions that must stay synchronized across specialists

### Put In Member `SKILL.md`

- role-specific execution steps
- role-specific artifact schemas and templates
- tool-use rules owned by that role
- detailed QA gates owned by that role
- blocking, retry, and send-back behavior for that specialist

### Avoid

- copying role-specific workflow steps from member `SKILL.md` into `team.md`
- listing detailed artifact schemas in `team.md` when a template or skill owns them
- putting tool invocation details, media-generation settings, prompt rules, or validation procedures in `team.md`
- duplicating the same operating rule in both `team.md` and a shared reference file

If a rule applies to all team members, put it in a team-shared reference and point members to it.
If a rule applies to one specialist, put it in that specialist's `SKILL.md`.
Keep `team.md` focused on how the specialists work together.

## Multi-Agent Communication Best Practice

Model inter-agent communication as email with attachments.

The `send_message_to` message body is the email text: it should route the work, name the expected next action, and summarize the handoff briefly. The reference files field is the attachment list: it should carry the durable files that contain the full handoff context.

For reliable agent-team handoffs, use file-backed handoffs by default:

1. Before handing work to another agent, the sending agent must write the full handoff to a local file.
2. The handoff file should preserve the complete context: user request, goals, source material, relevant links, artifact paths, constraints, approval state, current status, blockers, and expected output.
3. The sending agent then calls `send_message_to`.
4. The `send_message_to` message must mention the absolute path of the handoff file.
5. The same handoff file must also be added to the `send_message_to` reference files field, like an email attachment.
6. The receiving agent must read the referenced file before acting. The file is the source of truth; the short message is only routing context.
7. When reporting back, write a result/status file first, then send a short message that mentions and attaches that file.

This pattern is intentionally more explicit than putting all details in the message body. It pushes each specialist to materialize its handoff, gives the receiver a stable artifact to read, reduces context loss, and makes multi-step team workflows easier to audit and resume.

## Recommended Practice For Agent Packages

- If a skill is owned by a single agent, keep it bundled under that agent's `skills/<skill-name>/` folder.
- If a skill is shared across multiple agents, move it to a standalone shared skill source.
- Even when a bundled `skills/<skill-name>/SKILL.md` exists, keep `agent-config.json.skillNames` explicit so the package is self-describing and runtime wiring is deterministic.
- If an agent intentionally reuses a shared standalone skill instead of a bundled local one, keep the specialization in `agent.md` and point `agent-config.json.skillNames` at the shared skill.
- Keep `agent.md` short. Move detailed workflow steps, artifact schemas, and output section structure into `skills/<skill-name>/SKILL.md` and `skills/<skill-name>/templates/` so the same skill format works cleanly for bundled agent skills and custom skills.

## Core Files

### `agent.md`

This is the distilled runtime prompt for the agent.

Keep it short.

It should usually contain only:

- role identity
- short purpose
- which bundled or shared skill is authoritative
- runtime-only specialization that truly belongs in the agent prompt
- tone or review stance if needed
- team communication section when the agent is team-local

### `SKILL.md`

This is the main operating contract when a role has reusable workflow.

Put the real behavior here:

- workflow stages and ordering
- artifact schemas and output expectations
- handoff rules
- validation rules
- blocking rules
- quality bars
- routing rules
- reusable heuristics

### `agent-config.json`

This is the runtime wiring.

Typical contents include:

- `toolNames`
- `skillNames`
- processors
- lifecycle/runtime configuration

Keep `skillNames` explicit even when a bundled local `skills/<skill-name>/SKILL.md` exists. Runtime attachment should stay deterministic and self-describing.

### `team.md`

Short team description and identity.

### `team-config.json`

Team member wiring.

Typical contents include:

- `coordinatorMemberName`
- `members[].memberName`
- `members[].ref`
- `members[].refType`
- `members[].refScope`

## Authoring Best Practices

When a role has a reusable skill, treat `skills/<skill-name>/SKILL.md` as the main operating contract and keep `agent.md` intentionally thin.

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

## Very Important Authoring Rule

When a role has a bundled or attached skill, put as much reusable behavior as possible into `SKILL.md`, not `agent.md`.

This is important because at runtime the final system prompt is effectively composed from:

- the agent prompt in `agent.md`
- the attached skill prompt content from `SKILL.md`

If the same workflow rules are copied into both places, the runtime prompt becomes larger, noisier, and easier to drift out of sync.

### Practical Rule

If the guidance would still matter when the skill is reused elsewhere, it belongs in `SKILL.md`.

If the guidance only exists because this exact agent has a special runtime identity or tone, it may belong in `agent.md`.

## Bundled Skill Convention

When a skill belongs to one specific agent bundle, keep it under that agent folder's `skills/` directory.

Example:

```text
agents/<agent-id>/skills/<skill-name>/SKILL.md
```

or for a team-local role:

```text
agent-teams/<team-id>/agents/<agent-id>/skills/<skill-name>/SKILL.md
```

Rules:

- the skill folder name should match `agent-config.json.skillNames` and `SKILL.md` frontmatter `name`
- `agent-config.json.skillNames` should explicitly include that skill name
- the presence of `SKILL.md` alone should not be treated as enough runtime wiring

## Team Modeling Convention

Teams are intentionally modeled as direct specialist cooperation.

In practice:

- `team.md` gives the team identity
- `team-config.json` defines the member list and references
- each specialist owns its own workflow in `SKILL.md`
- handoffs should be expressed by the specialist packages, not hidden in a large team-level prompt

Keep the team description simple and let the real operating detail live with the roles that own it.

## Sanity Check Before Merging Agent Changes

Before considering an agent package update complete, verify:

- `agent.md` is thin
- `SKILL.md` owns the workflow
- `agent-config.json.skillNames` is explicit
- tools in `agent-config.json` match what the workflow actually requires
- team-local handoff names match `team-config.json`
- reusable schemas and checklists are not duplicated across prompt files

If an `agent.md` starts reading like a second `SKILL.md`, the split is wrong and should be corrected.

The team is intentionally modeled as direct specialist cooperation instead of a separate coordinator agent. Handoffs and rework paths are expressed through `team.md` and each specialist's routing rules.
The software engineering team also includes a deployment specialist so release preparation, versioning, tagging, rollout, and deploy verification can be owned explicitly instead of being left implicit at the end.

The runtime configuration is intentionally lightweight. After importing these definitions into AutoByteus, users are expected to customize tools, processors, models, and other config details to match their own environment.
