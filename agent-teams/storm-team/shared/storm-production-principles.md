# STORM Production Principles

This shared reference defines the contract for the STORM Team.


## Source Basis

The team design is based on the public Stanford STORM project, GitHub repository, and STORM paper. See [storm-source-notes.md](storm-source-notes.md) for the summarized source basis and mapping from STORM concepts to AutoByteus roles.

## Core Idea

This team follows the Stanford STORM pattern:

1. research before writing;
2. discover multiple perspectives on a topic;
3. ask perspective-guided questions;
4. answer using retrieval-grounded sources;
5. synthesize a hierarchical outline;
6. write a cited long-form article;
7. polish and verify coverage, citations, and weak associations.

## Project Workspace

- Use one workspace per topic, usually `agent-teams/storm-team/projects/<topic-slug>/` unless the user provides another path.
- Keep all role artifacts in that workspace.
- Suggested folders: `sources/`, `notes/`, `drafts/`, and `logs/` when useful.
- Do not store secrets or API keys in artifacts.

## Standard Artifacts

- `topic-brief.md`
- `perspectives.json`
- `interview-notes.md`
- `source-index.json`
- `storm-outline.md`
- `storm-outline.json`
- `article.md`
- `article-sources.json`
- `polished-article.md`
- `verification-report.md`

## Source-Grounding Rules

- Every factual claim in the final article should be traceable to at least one source in `source-index.json` or `article-sources.json`.
- Prefer primary, official, academic, or otherwise authoritative sources.
- Use secondary sources for context and framing, but mark their role clearly.
- Avoid over-association: do not connect unrelated facts simply because they appear under the same broad topic.
- Track source conflicts and uncertainty explicitly.
- Do not rely on opaque search snippets for final claims.

## Perspective Rules

- Perspectives should change what questions are asked, not merely rename sections.
- Good perspectives often come from adjacent Wikipedia-like articles, scholarly fields, stakeholder groups, historical eras, controversies, technical subsystems, geographic contexts, or application domains.
- Keep perspectives diverse but bounded; merge redundant ones.
- Every perspective should produce at least one concrete question thread or be dropped.

## Interview Rules

- Each interview thread should include initial questions, answers, follow-up questions, source references, and unresolved questions.
- Answers must be grounded in sources that can be opened again.
- Ask follow-ups when a source answer changes the understanding of the topic.
- Record enough provenance that the outline architect can decide what belongs in the article.

## Outline Rules

- The outline is the central pre-writing artifact.
- It should be hierarchical and broad enough to avoid a narrow essay, but not so broad that it becomes a source dump.
- Each section must map to source IDs and interview question IDs.
- Missing sections or weak evidence should be flagged before article drafting.

## Article Rules

- Write in a neutral, explanatory, Wikipedia-like style unless the user asks otherwise.
- Cite factual claims close to where they appear.
- Do not introduce new factual claims that were not in the curated evidence package unless you also update the source artifacts.
- Keep citations stable by using source IDs, URLs, and titles.

## Verification Rules

- Check citation coverage, source relevance, duplicate content, unsupported synthesis, source bias transfer, and red-herring associations.
- If a claim cannot be traced, either remove it, soften it, or route back to the responsible upstream specialist for evidence.
- Final delivery should include both the polished article and a verification report.

## Handoff Rules

- Write the role artifact before sending a handoff.
- Create or update `handoffs/` in the project workspace.
- Before calling `send_message_to`, write a dedicated handoff file such as `handoffs/<sender>-to-<receiver>.md`.
- The handoff file must preserve complete transfer context: user goal, workspace path, completed artifacts, absolute paths to all still-relevant upstream artifacts, constraints, source-quality concerns, approval state when any, current status, blockers, open questions, and expected next output.
- The `send_message_to` message body should mention the absolute handoff-file path and briefly route the next action.
- Attach the handoff file and all relevant upstream artifacts in the reference-files field.
- The receiving specialist must read the handoff file before acting; the short message is routing context only.
- When reporting back after review, blocked state, or reroute, write a result/status file first, then send a short message that mentions and attaches that file.
- Route structural or evidence gaps back to the owning specialist rather than silently inventing around them.
