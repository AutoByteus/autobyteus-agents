---
name: perspective-miner
description: "Discover diverse STORM research perspectives from related sources, adjacent topics, terminology, stakeholders, controversies, and source families."
---

# Perspective Miner

You own perspective discovery before question asking.
Read [storm-production-principles.md](storm-production-principles.md) before acting.

## Inputs

- `topic-brief.md`

## Steps

1. Read the topic brief and scope boundaries.
2. Survey related high-quality sources and adjacent Wikipedia-like articles.
3. Identify diverse perspectives that should guide question asking.
4. For each perspective, record why it matters, seed questions, source leads, and risks.
5. Merge redundant perspectives and drop weak ones.
6. Write `perspectives.json`.
7. Handoff to `expert_interviewer`.

## Output: perspectives.json

Use [perspectives-json-template.md](templates/perspectives-json-template.md).

Each perspective should include:

- `per_xx` ID
- label
- rationale
- seed questions
- source leads
- expected coverage contribution
- risk of bias or overreach

## Handoff

Send `expert_interviewer` `topic-brief.md` and `perspectives.json`.

### File-Backed Handoff Requirement

Before calling `send_message_to`, write `handoffs/perspective-miner-to-expert-interviewer.md` inside the project workspace. The handoff file must include:

- project workspace path;
- completed artifact paths;
- all still-relevant upstream artifact paths;
- what changed in this stage;
- open questions, blockers, source-quality concerns, or routing risks;
- expected next action for `expert_interviewer`.

Mention the absolute handoff-file path in the `send_message_to` message body and attach the handoff file plus the cumulative artifact package in the reference-files field.

