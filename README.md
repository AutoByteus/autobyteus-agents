# AutoByteus Agents

This repository contains reusable AutoByteus agent, agent-team, and agent-org definitions.

## Designing And Updating Agents

Each agent owns its work, its skill defines how to do that work, and team
configuration owns conditional routing. Start with:

- [Agent Team Design Principles](agents/agent-team-architect/skills/agent-team-architecture/references/agent-team-design-principles.md): ownership, topology, and design checks.
- [Agent Package Authoring](docs/agent-package-authoring.md): file responsibilities, packaging, coordinator roles, handoff conventions, examples, and validation.
- [Agent Team Architecture skill](agents/agent-team-architect/skills/agent-team-architecture/SKILL.md): the create/update workflow used by Agent Team Architect.

## Standalone Agents

### Codex

The Codex wrapper agent is a lightweight standalone agent that mirrors the Codex-style general assistant shown in the app: it keeps the runtime prompt intentionally thin, attaches the global `software-engineering-workflow-skill`, and exposes browser, media, image, speech, and device-emulation tools without adding repository shell/file tools.

### Pitch Practice Investor

The pitch practice investor simulates a startup investor for spoken pitch rehearsal. It studies user-provided startup materials from the conversation, then runs a realistic mock investor pitch round with focused questions, constructive pressure, and optional feedback. It is intentionally lightweight and uses only the `speak` tool during live pitch practice.

### Resume Designer

The resume designer creates resume packages from user input or supplied resume sources, selects or authors an audience-appropriate pure-text style brief, dynamically generates a browser-rendered frontend resume app from that brief, starts a preview when possible, reviews it in the embedded in-app browser when available, verifies the render, and exports a print-ready PDF. It treats the frontend source as the editable resume system and the PDF as the default hiring-workflow handoff artifact.

### Research Engineer

The research engineer is a standalone agent for dynamic research tasks: broad source discovery, internet and website research when allowed, paper or PDF retrieval when allowed, continuous research notes, research planning, literature search, paper understanding, implementation when needed, local setup when needed, empirical validation when needed, benchmarking, result analysis, illustrative HTML explanation, self-review, and iterative research decisions. It is meant for work where the right execution path depends on the topic, such as reproducing a paper, implementing attention from scratch, setting up a research model locally, debugging a training run, comparing algorithms, or evaluating whether a research idea actually improves a metric.

### Paper Research Assistant

The paper research assistant is a standalone agent for the common paper-reading workflow: search for relevant papers from a user question or topic, retrieve a supplied paper from a link, identifier, PDF, or local file, extract paper metadata and detailed content, and answer user questions grounded in the paper. It is intentionally narrower than the research engineer: it focuses on discovery, paper ingestion, paper dossiers, concise comparison, and evidence-aware paper QA rather than implementation, reproduction, training, or benchmarking.

### Skill Optimizer

The skill optimizer is a lightweight standalone agent that uses the shared `skill-optimizer` skill to review and improve existing skills for structure, grounding, clarity, consistency, and economy while preserving their intended behavior and quality gates.

### Agent Team Architect

The [Agent Team Architect](agents/agent-team-architect/agent.md) creates new agent-team packages and updates existing packages while preserving clear ownership, durable artifacts, cross-file consistency, and result-based handoffs. Its bundled [`agent-team-architecture`](agents/agent-team-architect/skills/agent-team-architecture/SKILL.md) skill exposes two modes only: `create` and `update`; optimization, repair, and consistency correction are update intents rather than separate agents or modes.

## Software Development Department

The [Software Development Department](agent-orgs/software-development-department/org.md)
is a coordinator-free Agent Org containing the two shared teams below. Each
Team keeps its own coordinator; cross-team routing lives in the department
[org-config.json](agent-orgs/software-development-department/org-config.json).

```text
Software Development Department — Agent Org (no coordinator)
├── Software Engineering Team — Solution Designer
│   ├── Architecture Reviewer
│   ├── Implementation Engineer
│   ├── Code Reviewer
│   ├── API/E2E Engineer
│   └── Delivery Engineer
└── Product Design & Prototyping Team — Product Prototyper
    └── Prototype Bootstrapper
```

## Solution Designer

[Solution Designer](agent-teams/software-engineering-team/agents/solution-designer/agent.md)
is the Software Engineering Team coordinator and owns the complete
investigation–requirements–architecture loop. It establishes supported product
or system scenarios, current/desired/preserved behavior, scope and acceptance
criteria, obtains explicit user approval, then performs additional architecture
investigation and a proportionate design for every solution. Design conversations can revise evidence
and requirements through the same owner; changed intended behavior requires
renewed approval before affected design or implementation proceeds.

The [solution-designer skill](agent-teams/software-engineering-team/agents/solution-designer/skills/solution-designer/SKILL.md)
keeps requirements and design as separate phases with linked detailed standards.
One canonical `investigation-notes.md` holds evidence from both phases;
`requirements-doc.md` owns approved intent; `design-spec.md` owns technical
structure after requirements approval. One cumulative `solution-revision-record.md` (`SR-*`)
indexes requirements, investigation and design rounds, starting with the first
coherent requirements baseline and remaining required on the direct route.
This combined role replaces the split requirements/design ownership without
reverting the improved scenario, evidence, approval or architecture practices.

Solution Designer exchanges user-requested Product assistance and returned
UI/UX evidence directly with Product Prototyper. Product Prototyper selects its
own mode and owns its separate repository, tickets, commits and artifacts.

## Product Design & Prototyping Team

The product design and prototyping team independently maintains the prototype repository for each product surface or independent concept package. `product_prototyper` owns prototype intake, tickets, per-ticket branches/worktrees, commits, integration, and two explicit modes: `exploratory-requirements-visualizer` for abstract or product-independent clarification, and `product-experience-prototyper` for incremental product-experience evolution or a new product-facing experience. Its repository-management skill handles isolation and lifecycle; the selected mode skill handles the experience work. `prototype_bootstrapper` owns only current-experience baseline discovery, parity implementation, and bootstrap evidence in the Product-assigned worktree. The team uses dynamic handoff rules plus `send_message_to` for baseline routing and cross-team results.

## Software Engineering Team

The [Software Engineering Team](agent-teams/software-engineering-team/team.md)
can accept raw requests through its `solution_designer` coordinator, either
standalone or within the department. After requirements approval, Solution
Designer completes architecture investigation and a proportionate design spec,
then classifies the finished solution before using the handoff rules. Small
tasks receive a lightweight design; they do not skip design entirely.

Completed designs carry `task_size` (Small, Medium or Large) and
`architectural_risk` (Low or High). Large or High-risk work uses independent
Architecture Reviewer and Code Reviewer gates; Small/Medium Low-risk work can
proceed through implementation and API/E2E validation without those reviews.
The design spec is required on both routes; only independent reviews are skipped.

Downstream requirement/design findings return to Solution Designer. After user
verification and all applicable finalization gates, Delivery Engineer returns
`Delivery Completed` to Solution Designer, which verifies the receipt and returns
`Terminal` to the user or caller when no handoff rule matches. Conditional rules
in each team's `team-config.json` and
`get_handoff_rules` determine the actual recipients, including direct Product
exchanges and informational review-pass notifications.

## Research Engineering Team

The research engineering team is organized as a lean two-role loop for research-heavy engineering tasks: a `research_scientist` owns adaptive source discovery, immediate source-by-source research notes, prior-art and state-of-work assessment, paper and repository investigation, source-code reading when needed, research framing, lightweight exploratory probes, metrics, expected outcomes, and the `implementation-plan.md` handoff contract; an `implementation_engineer` owns minimal implementation, run execution, training or benchmark monitoring, validation evidence, requested output artifacts, and detailed feedback. It is meant for work where the right path emerges through repeated research, implementation/probing, validation, analysis, and revised implementation plans.

## STORM Team

The STORM team is a Stanford STORM-inspired research-writing workflow for knowledge curation. It takes a topic through `topic_research_coordinator`, `perspective_miner`, `expert_interviewer`, `outline_architect`, `cited_article_writer`, and `article_polisher_verifier`, mirroring STORM's pre-writing focus on multi-perspective retrieval-grounded question asking, outline synthesis, cited article generation, and article polishing.

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

## Kids Coloring Story Team

The kids coloring story team is organized as a child-friendly printable production workflow for short multi-page A4 coloring stories, coloring bookmarks, coloring sheets, mini coloring books, and activity pages. It takes a theme, Bible verse, value, rough story, or visual idea through age-aware story/activity planning, user-approved page sequence, cute black-and-white line-art asset production, independent child-experience review, and print-ready PDF/PNG packaging. By default, each story image gets its own A4 page; combined contact sheets are preview-only unless explicitly requested.

## Kids Picture Story Team

The kids picture story team is organized as a reading-first illustrated picture-book workflow. It takes an original story, gentle adaptation, source-grounded theme, or rough idea through age- and reading-level-aware story editing, a normally 21-28-page storyboard with rationale for deviations, cohesive full-color page illustration with exact approved words on text-bearing pages or explicit word-free pages, independent picture-book review, and ordered digital or optional print/booklet exports. It is the reading-first counterpart to the kids coloring story team and produces book pages and exports rather than coloring or activity packages.

## Bible Learning Team

The Bible learning team is organized as a context-first teaching workflow that takes a passage, topic, or question from deep background research through teaching preparation, critical review, and default slide-deck production unless the user explicitly wants a teaching-only result.

## Article Writing Team

The article writing team is organized as a two-specialist research-to-article and style-aware writing workflow. The `article_writer` owns the understanding stage as well as drafting: supplied-source reading, workspace and source-code discovery, online research when useful and allowed, documentation or paper reading, source indexing, claim/evidence mapping, style-profile selection through a team-local bundled author-style skill, outline creation, full draft production, bilingual adaptation, and revision. The `article_reviewer` owns the publication-readiness gate for understanding sufficiency, evidence support, outline quality, article structure, style fit, platform fit, bilingual fidelity, and final revision routing.
