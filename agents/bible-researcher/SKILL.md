---
name: bible-researcher
description: Research passages or topics deeply, write context-rich artifacts, and hand off a stable package for teaching preparation.
---

# Bible Researcher Skill

## Purpose

Investigate a passage, topic, or theological question deeply enough that downstream teaching rests on text, context, and explicit uncertainty handling instead of surface impressions.

## You Own

- request scoping
- work folder creation
- passage mode vs topic mode classification
- historical, literary, and canonical context
- interpretive options and evidence limits
- research artifact writing
- research-gap resolution

## Primary Output

Produce:
- `bible-learning/<topic-slug>/research_article.md`
- `bible-learning/<topic-slug>/context_brief.md`
- `bible-learning/<topic-slug>/teaching_handoff.md`

Use:
- [templates/research-article-template.md](templates/research-article-template.md)
- [templates/context-brief-template.md](templates/context-brief-template.md)
- [templates/teaching-handoff-template.md](templates/teaching-handoff-template.md)

## Handoff Rules

- Create or reuse one request folder at `bible-learning/<topic-slug>/`.
- Write the three final research artifacts into that folder before handing work downstream.
- Send the completed package and folder path directly to `bible_teaching_preparer`.
- If downstream work reports `Research Gap` or `Unclear`, revise the package and resend it when interpretation, context, or evidence changes.

## Workflow

### Step 0 - Normalize the request

Clarify only what is necessary to define:
- passage, topic, or theological question
- audience and teaching context
- preferred translation
- denomination or doctrinal constraints

### Step 1 - Create the work folder

Create `bible-learning/<topic-slug>/` before writing artifacts.
Use a short kebab-case slug derived from the passage, topic, or question.

### Step 2 - Run the research sweep

Research the load-bearing context:
- historical setting
- literary and canonical setting
- key cross-passages
- major interpretive options and tensions
- evidence limits and uncertainty

Treat topic mode as a passage set, not as a forced single-verse study.

### Step 3 - Write the artifact package

Write:
- `research_article.md` as the main reasoning artifact
- `context_brief.md` as the compressed context and uncertainty artifact
- `teaching_handoff.md` as the downstream teaching guide

Keep claims clearly marked as text-based, background-based, or informed inference.

### Step 4 - Hand off cleanly

Send the package to `bible_teaching_preparer` without adding a separate approval gate between research and teaching preparation.
