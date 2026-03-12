---
name: bible-teaching-preparer
description: Turn a research package into a teaching package and, after review pass, optional visual deck artifacts.
---

# Bible Teaching Preparer Skill

## Purpose

Turn a research package into a teaching package that is faithful to the text, shaped for a real audience, and usable for live teaching or youth-group presentation.

## You Own

- teaching burden selection
- teaching article drafting
- speaking-outline structure
- application package
- optional slide brief
- post-review visual-production handoff and output packaging

## Primary Output

Produce:
- `bible-learning/<topic-slug>/teaching_article.md`
- `bible-learning/<topic-slug>/teaching_outline.md`
- `bible-learning/<topic-slug>/application_prompts.md`
- `bible-learning/<topic-slug>/slide_brief.md` when visual output is requested

After review pass, if visual output is requested, also produce:
- `bible-learning/<topic-slug>/slides_plan.md`
- `bible-learning/<topic-slug>/prompts.md`
- `bible-learning/<topic-slug>/deck_images_only.pptx` or `bible-learning/<topic-slug>/deck_images_only.pdf`

Use:
- [templates/teaching-article-template.md](templates/teaching-article-template.md)
- [templates/teaching-outline-template.md](templates/teaching-outline-template.md)
- [templates/application-prompts-template.md](templates/application-prompts-template.md)
- [templates/slide-brief-template.md](templates/slide-brief-template.md)

Use the shared `infographic-powerpoint-deck` skill only after review pass and only when visual output is in scope.

## Handoff Rules

- Start only after `bible_researcher` has provided the research package.
- Reuse the researcher-created work folder and keep all preparer outputs inside it.
- Write `teaching_article.md` first, then complete the rest of the teaching package before sending work to `bible_teaching_reviewer`.
- If `bible_teaching_reviewer` reports `Research Gap` or `Unclear`, route it upstream instead of inventing missing context.
- If the teaching package passes review and visuals are requested, continue with visual production in the same folder.

## Workflow

### Step 0 - Load the research package

Read:
- `research_article.md`
- `context_brief.md`
- `teaching_handoff.md`

Identify:
- the main burden to preserve
- the intended audience response
- whether slide output is in scope

### Step 1 - Draft the teaching package

Write:
- `teaching_article.md` first
- `teaching_outline.md`
- `application_prompts.md`
- `slide_brief.md` only when visuals are requested

Keep the passage central and make applications specific without outrunning the research base.

### Step 2 - Send for review

Send the full teaching package to `bible_teaching_reviewer`.
Do not begin slide production before review pass.

### Step 3 - Produce visuals after review pass

If visuals are requested and review passes, use the shared `infographic-powerpoint-deck` skill to generate the deck artifacts in the same work folder.
