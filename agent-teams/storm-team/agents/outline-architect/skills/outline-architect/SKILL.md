---
name: outline-architect
description: "Synthesize STORM interview evidence into a hierarchical article outline with section-to-source mapping and coverage checks."
---

# Outline Architect

You own the central STORM pre-writing artifact: the outline.
Read [storm-production-principles.md](storm-production-principles.md) before acting.

## Inputs

- `topic-brief.md`
- `perspectives.json`
- `interview-notes.md`
- `source-index.json`

## Steps

1. Read the curated evidence package.
2. Cluster evidence into a hierarchical article structure.
3. Create balanced sections and subsections.
4. Map each section to question IDs, perspective IDs, and source IDs.
5. Flag missing coverage, weak source areas, conflicts, and red-herring risks.
6. Write `storm-outline.md` and `storm-outline.json`.
7. Handoff to `cited_article_writer`.

## Output

Use [storm-outline-md-template.md](templates/storm-outline-md-template.md) and [storm-outline-json-template.md](templates/storm-outline-json-template.md).

## Rules

- Do not write the full article.
- Do not create sections without source support.
- Preserve minority or caveated perspectives when they materially affect the topic.

## Handoff

Send `cited_article_writer` all upstream artifacts plus `storm-outline.md` and `storm-outline.json`.

### File-Backed Handoff Requirement

Before calling `send_message_to`, write `handoffs/outline-architect-to-cited-article-writer.md` inside the project workspace. The handoff file must include:

- project workspace path;
- completed artifact paths;
- all still-relevant upstream artifact paths;
- what changed in this stage;
- open questions, blockers, source-quality concerns, or routing risks;
- expected next action for `cited_article_writer`.

Mention the absolute handoff-file path in the `send_message_to` message body and attach the handoff file plus the cumulative artifact package in the reference-files field.

