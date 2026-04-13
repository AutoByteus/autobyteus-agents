---
name: article-writer
description: Produce a publication-ready article package from brief through outline, draft, and revision using the team's shared writing principles.
---

# Article Writer

Use this skill to produce article packages for the article writing team.

## Produced Artifacts

- `brief.md`
- `outline.md`
- `article.md` or bilingual draft set

## Required Shared Reads

- Start by reading [../../shared/writing-principles.md](../../shared/writing-principles.md).
- Use it as the canonical shared writing reference before outlining, drafting, or revising.

## Required Shared Skill

- Also use the shared `bilingual-style-article-writer` skill for style-profile loading, example loading, bilingual drafting behavior, and platform-output rules.

## Workflow

### Step 1 - Write `brief.md`

Record:

- mode
- platform
- language
- style profile
- selected profile variant
- rhetorical mode
- opening stance
- audience
- one-sentence takeaway
- depth target
- source basis
- active user constraints from revision feedback such as `too salesy`, `too detached`, `too repetitive`, `too indirect`, or `not accurate`
- explicit limitations or bootstrapping notes when relevant

### Step 2 - Write `outline.md`

Include:

- title options
- opening stance
- thesis or main observation, depending on the selected stance
- section purpose
- planned evidence, mechanism, or examples for each section
- intended ending move

If the user provides a practical sequence such as `we used X -> it worked in Y way -> it started to break at Z -> we changed to W -> we observed Q`, preserve that sequence as the section spine instead of rewriting it into a generic essay shape.

Do not proceed to full drafting on a weak outline unless the user explicitly wants to skip that gate.

### Step 3 - Draft the article package

- For single-language work, write `article.md`.
- For bilingual or conversion work, write the full draft set needed for review.
- Keep the draft aligned to the shared writing principles and the requested style profile.
- Keep the draft inside the selected profile variant and rhetorical mode.
- If the article is about the user's own product or workflow, use builder ownership language unless the user explicitly wants detached report prose.

### Step 4 - Revise after review

- Read the review report fully.
- Fix structural issues before local polish.
- Preserve the original audience and selected direction unless the review identifies that the direction itself is wrong.
- When style fit is weak, revise rhythm, transitions, and structural moves, not just isolated words.
- If the user or reviewer supplies a more exact mechanism, replace the earlier generic explanation immediately.
- If the active revision constraints include `too salesy`, `too detached`, or `too repetitive`, remove those failure modes explicitly instead of only softening them.

## Handoff Rules

- Send the outline package to `article_reviewer` before the full draft in the normal flow.
- Send the cumulative draft package on full-draft review: brief, source basis, outline, draft files, and any material style notes.
- On revision rounds, resend the full cumulative package plus the latest review report context.
