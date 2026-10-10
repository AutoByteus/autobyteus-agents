# AutoByteus Agents

This repository contains reusable AutoByteus agent, agent-team, and agent-org definitions. This README is an index of what lives here; each definition owns its details in its own `agent.md`, `team.md`, or `org.md`.

## Repository Layout

| Path | Contents |
| --- | --- |
| [`agents/`](agents) | Standalone Agents, each with `agent.md`, `agent-config.json`, and bundled `skills/`. |
| [`agent-teams/`](agent-teams) | Shared Agent Teams (`team.md`, `team-config.json`, member `agents/`). |
| [`agent-orgs/`](agent-orgs) | Agent Orgs (`org.md`, `org-config.json`) that mount Teams and Agents and own cross-team routing. |
| [`docs/`](docs) | Authoring documentation. |

## Designing And Updating Agent Packages

A Skill owns reusable task procedure; an Agent owns a role and its attachments;
Team and Org configuration own their respective routing boundaries. Start with:

- [Agent Package Design Principles](agents/agent-package-creator/skills/agent-package-creation/references/package-design-principles.md): Skill, Agent, Team, and Org boundaries, role ownership, and handoff examples.
- [Skill Authoring Principles](agents/agent-package-creator/skills/agent-package-creation/references/skill-authoring-principles.md): standalone and bundled skill design and validation.
- [Agent Package Authoring](docs/agent-package-authoring.md): file responsibilities, packaging, coordinator roles, handoff conventions, examples, and validation.
- [Agent Package Creation skill](agents/agent-package-creator/skills/agent-package-creation/SKILL.md): the create, analyze, and update workflow used by Agent Package Creator.

## Standalone Agents

| Agent | Purpose |
| --- | --- |
| [Agent Package Creator](agents/agent-package-creator/agent.md) | Creates, analyzes, and updates skills, Agents, Agent Teams, and Agent Orgs via the bundled `agent-package-creation` skill. |
| [Computer Use Operator](agents/computer-use-operator/agent.md) | Completes tasks on the computer: operates websites through the visible browser UI and uses command-line tools, software, and media files. Keeps per-site and per-tool workspace knowledge. Shared by the Marketing and Event Scouting teams. |
| [Data Engineer](agents/data-engineer/agent.md) | Ingests, cleans, normalizes, validates, and prepares datasets and JSON content collections. |
| [Deep Researcher](agents/deep-researcher/agent.md) | In-depth, primary-source research delivering a sourced brief and a claims check. Shared by the Marketing Team. |
| [Project Task Manager](agents/project-task-manager/agent.md) | Breaks a Project request into dependency-ordered Project Tasks, dispatches them with user approval, and tracks them. |
| [Research Engineer](agents/research-engineer/agent.md) | Adaptive research work: source discovery, notes, implementation, validation, benchmarking, and analysis. |
| [Resume Designer](agents/resume-designer/agent.md) | Builds frontend-rendered resume packages and exports print-ready PDFs. |
| [Software Tutorial Video Maker](agents/software-tutorial-video-maker/agent.md) | Turns software screenshots and teaching notes into a narrated tutorial video using TTS and `ffmpeg`. |

## Agent Teams

Coordinator is the entry member; routing lives in each team's `team-config.json`.

| Team | Coordinator | Members | Purpose |
| --- | --- | --- | --- |
| [Software Engineering Team](agent-teams/software-engineering-team/team.md) | `solution_designer` | Architecture Reviewer, Implementation Engineer, Code Reviewer, API/E2E Engineer, Delivery Engineer | Requirements, design, implementation, validation, review, and delivery. Large or High-risk work gets independent architecture and code reviews. |
| [Product Team](agent-teams/product-team/team.md) | `product_ui_ux_designer` | UI Baseline Bootstrapper | Code-first Product UI/UX design in runnable references, producing approved `ui-ux-spec.md`. |
| [Marketing Team](agent-teams/marketing-team/team.md) | `marketing_content_creator` | Marketing Performance Analyst (+ shared Computer Use Operator, Deep Researcher) | Draft–approve–publish content loop and build-measure-learn performance strategy. |
| [Event Scouting Team](agent-teams/event-scouting-team/team.md) | `event_scout` | (+ shared Computer Use Operator) | Finds, assesses, shortlists, and registers for worthwhile events (e.g. on Luma) after user approval. |
| [Evidence-Driven Delivery Team](agent-teams/evidence-driven-delivery-team/team.md) | `planner` | Investigator, Implementer, Validator | Canonical example of incremental investigation, planning, micro-task execution, and validation. |
| [Article Writing Team](agent-teams/article-writing-team/team.md) | `article_writer` | Article Reviewer | Research-to-article and style-aware writing with a publication-readiness gate. |
| [STORM Team](agent-teams/storm-team/team.md) | `topic_research_coordinator` | Perspective Miner, Expert Interviewer, Outline Architect, Cited Article Writer, Article Polisher Verifier | Stanford STORM-inspired knowledge curation and cited article writing. |
| [Research To Deck Team](agent-teams/research-to-deck-team/team.md) | `deep_researcher` | Infographic PowerPoint Designer, Deck Reviewer | Deep research, user-approved slide plan, image-only slide production, and independent deck review. |
| [Narrated Presentation Video Team](agent-teams/narrated-presentation-video-team/team.md) | `presentation_director` | Narration Script Reviewer, Slide Video Producer | Slide-based explainer videos with reviewed narration and voiceover. |
| [Software Product Promo Video Team](agent-teams/software-product-promo-video-team/team.md) | `promo_director` | Visual Director, Visual Reviewer, Promo Video Producer | Promo videos for software products, apps, and SaaS tools. |
| [Manga Video Studio Team](agent-teams/manga-video-studio-team/team.md) | `manga_showrunner` | Storyboard Director, Manga Illustrator, Voice Video Producer | Story-first manga ideas to narrated motion-comic videos. |
| [Kids Coloring Story Team](agent-teams/kids-coloring-story-team/team.md) | `story_activity_designer` | Coloring Page Illustrator, Child Experience Reviewer, Printable Pack Producer | Printable coloring stories, sheets, and activity pages. |
| [Kids Picture Story Team](agent-teams/kids-picture-story-team/team.md) | `story_picture_book_author` | Book Production Editor, Picture Book Illustrator, Picture Book Reviewer | Reading-first illustrated picture books with digital and print exports. |
| English Bridge Team (`agent-teams/english-bridge-team`) | `english_translator` | Worker | Translates user requests into English and sends them unchanged to a worker. |
| [Classroom Simulation Team](agent-teams/classroom-simulation-team/team.md) | `professor` | Student | Two-role teacher–student demo of agent-to-agent file-based communication. |

## Agent Orgs

| Org | Contents |
| --- | --- |
| [Software Development Department](agent-orgs/software-development-department/org.md) | Coordinator-free Org mounting the Software Engineering Team and Product Team; cross-team routing in its [org-config.json](agent-orgs/software-development-department/org-config.json). |
| [AutoByteus Org](agent-orgs/autobyteus-org/org.md) | Mounts the shared Product, Software Engineering, and Marketing Teams; owns cross-team routes in its [org-config.json](agent-orgs/autobyteus-org/org-config.json). |
| [Northstar Operating Company](agent-orgs/northstar-operating-company/org.md) | Fictional B2B SaaS simulation: executive team (CEO, Chief of Staff, CTO, CPO, CMO, CRO, COO, CFO, Chief People Officer) plus Org-mounted Engineering, Product, Marketing, Revenue, Operations, and Finance & People teams. |

```text
Software Development Department — Agent Org (no coordinator)
├── Software Engineering Team — Solution Designer
└── Product Team — Product UI/UX Designer
```
