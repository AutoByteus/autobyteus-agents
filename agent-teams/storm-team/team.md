---
name: STORM Team
description: A Stanford STORM-inspired knowledge curation team for researching a topic, mining perspectives, asking retrieval-grounded questions, synthesizing an outline, and writing a cited article.
category: research-writing
---

This team adapts Stanford OVAL's STORM idea into real AutoByteus team-local agents.
STORM means **Synthesis of Topic Outlines through Retrieval and Multi-perspective Question Asking**: the system researches a topic from multiple perspectives, uses retrieval-grounded question asking to collect information, synthesizes a hierarchical outline, then writes and polishes a cited long-form article.

`topic_research_coordinator` is the coordinator entry specialist.
There is no separate standalone orchestrator beyond the listed specialists.
Each specialist follows its bundled skill, writes durable artifacts, and hands the cumulative package to the next specialist through `send_message_to`.

Detailed source-grounding rules, artifact contracts, citation quality bars, and research basis live in [shared/storm-production-principles.md](shared/storm-production-principles.md), [shared/storm-source-notes.md](shared/storm-source-notes.md), and each member's bundled `SKILL.md`.

## STORM Basis

The team is modeled on these STORM concepts:

- pre-writing before article generation: collect references and generate an outline before writing;
- perspective-guided question asking: discover diverse perspectives and use them to ask better questions;
- simulated conversation: ask follow-up questions to a retrieval-grounded topic expert;
- four-stage engine shape: knowledge curation, outline generation, article generation, and article polishing;
- final output: a long-form, Wikipedia-like article with citations, useful for pre-writing but still needing human review for publication.

## Team Members

- `topic_research_coordinator`: owns topic intake, user goal, audience, scope boundaries, workspace creation, initial source constraints, final deliverable definition, and routing when downstream work exposes a scope or goal gap.
- `perspective_miner`: owns discovery of diverse research perspectives, adjacent topics, likely article sections, source families, terminology, and `perspectives.json`.
- `expert_interviewer`: owns STORM-style perspective-guided question asking, retrieval-grounded simulated expert answers, follow-up questions, reference capture, and `interview-notes.md` plus `source-index.json`.
- `outline_architect`: owns synthesis of curated knowledge into a hierarchical outline, section-level evidence mapping, balance checks, missing-coverage questions, and `storm-outline.md` plus `storm-outline.json`.
- `cited_article_writer`: owns article drafting from the outline and curated references, citation placement, neutral explanatory prose, and `article.md` plus `article-sources.json`.
- `article_polisher_verifier`: owns deduplication, readability, summary/lead polishing, citation coverage audit, red-herring/source-bias checks, final `polished-article.md`, and `verification-report.md`.

## Delivery Flow

1. `topic_research_coordinator` starts the run, creates a project folder, writes `topic-brief.md`, and hands it to `perspective_miner`.
2. `perspective_miner` surveys related high-quality sources and adjacent articles, writes `perspectives.json`, and hands to `expert_interviewer`.
3. `expert_interviewer` runs one interview thread per perspective: asks initial and follow-up questions, grounds every answer in retrievable sources, writes `interview-notes.md` and `source-index.json`, and hands to `outline_architect`.
4. `outline_architect` curates the collected knowledge into `storm-outline.md` and `storm-outline.json`, preserving section-to-source mapping and flagging missing coverage before writing begins.
5. `cited_article_writer` drafts `article.md` from the outline and sources, using citations for factual claims and avoiding unsupported synthesis.
6. `article_polisher_verifier` polishes the article, removes duplicate or weakly connected material, verifies citations, writes final artifacts, and returns the package.

## Artifact Visibility Rule

- Model `send_message_to` handoffs as email with attachments.
- Before every handoff, the sending specialist must write a handoff file under the project workspace, preferably `handoffs/<sender>-to-<receiver>.md`.
- The handoff file is the source of truth for the transfer: it must include the user goal, project directory, completed artifacts, absolute paths to all still-relevant upstream artifacts, current status, source-quality concerns, blockers, open questions, and the exact expected next action.
- The `send_message_to` message body should be short: identify the handoff file path, summarize what changed, and route the next action.
- The same handoff file and all still-relevant upstream artifacts must be included in the reference-files attachment field, not only mentioned in prose.
- The receiving specialist must read the referenced handoff file and attached artifacts before acting. A reusable structure is available at [shared/handoff-template.md](shared/handoff-template.md).
- When reporting back after a review or blocked state, write a result/status file first, then send a short message that mentions and attaches that file.

Default cumulative package:

- `perspective_miner`: `topic-brief.md`.
- `expert_interviewer`: `topic-brief.md`, `perspectives.json`.
- `outline_architect`: `topic-brief.md`, `perspectives.json`, `interview-notes.md`, `source-index.json`.
- `cited_article_writer`: full upstream package plus `storm-outline.md`, `storm-outline.json`.
- `article_polisher_verifier`: full upstream package plus `article.md`, `article-sources.json`.

## Issue Routing

- `Topic Scope Gap` or `Audience/Goal Ambiguity` -> `topic_research_coordinator`.
- `Perspective Coverage Gap` -> `perspective_miner`.
- `Insufficient Source Evidence`, `Weak Retrieval`, or `Missing Follow-up Question` -> `expert_interviewer`.
- `Outline Imbalance`, `Missing Section`, or `Bad Section Hierarchy` -> `outline_architect`.
- `Draft Unsupported Claim`, `Citation Placement Gap`, or `Style/Neutrality Issue` -> `cited_article_writer`.
- `Duplicate Content`, `Red Herring`, `Source Bias Transfer`, or `Citation Verification Failure` -> `article_polisher_verifier` for diagnosis, then route to the artifact owner if upstream repair is needed.
- `Unclear` -> `topic_research_coordinator` to coordinate diagnosis and rerouting.

## Ownership Boundaries

- Do not draft the article before perspectives, interviews, and outline artifacts exist.
- Do not treat search snippets as enough evidence for article claims; use retrievable sources and record URLs/titles.
- Do not use perspectives as a fixed checklist; add, merge, or retire perspectives when source evidence warrants it.
- Do not hide uncertainty: source conflicts, sparse evidence, and speculative links must be surfaced or excluded.
- Do not call the final article publication-ready. STORM-style output is a grounded pre-writing artifact that still benefits from human editorial review.
