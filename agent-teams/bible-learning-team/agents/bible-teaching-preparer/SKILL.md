---
name: bible-teaching-preparer
description: Turn a research package into a teaching package and, after review pass, continue by default into visual deck artifacts unless the user explicitly wants teaching-only output.
---

# Bible Teaching Preparer Skill

## Purpose

Turn a long-form Bible research article into a teaching package that is faithful to the text, shaped for a real audience, and usable for live teaching or youth-group presentation.

## You Own

- teaching burden selection
- teaching article drafting
- speaking-outline structure
- application package
- slide content planning before deck generation
- post-review visual-production handoff and output packaging
- visual revision rework

## Primary Output

Produce:
- `bible-learning/<topic-slug>/teaching_article.md`
- `bible-learning/<topic-slug>/teaching_outline.md`
- `bible-learning/<topic-slug>/application_prompts.md`

After teaching review pass, continue by default into:
- `bible-learning/<topic-slug>/slides_content_plan.md`

After slide-content review pass, continue by default into:
- `bible-learning/<topic-slug>/slides_visual_plan.md`
- `bible-learning/<topic-slug>/prompts.md`
- the final deck artifact produced by `infographic-powerpoint-deck`

Use:
- [templates/teaching-article-template.md](templates/teaching-article-template.md)
- [templates/teaching-outline-template.md](templates/teaching-outline-template.md)
- [templates/application-prompts-template.md](templates/application-prompts-template.md)
- [templates/slides-content-plan-template.md](templates/slides-content-plan-template.md)

Use the shared `infographic-powerpoint-deck` skill after teaching review pass as the default continuation of the workflow. Only skip deck production when the user explicitly asks for teaching-only or text-only output.

## Handoff Rules

- Start only after `bible_researcher` has provided `article.md` and the supporting research package.
- Reuse the researcher-created work folder and keep all preparer outputs inside it.
- Write `teaching_article.md` first, then complete the rest of the teaching package before sending work to `bible_teaching_reviewer`.
- If `bible_teaching_reviewer` reports `Research Gap` or `Unclear`, route it upstream instead of inventing missing context.
- After the teaching package passes review, continue by default into `slides_content_plan.md` and send it to `bible_teaching_reviewer` for slide-content review. Only skip this if the user explicitly asked for teaching-only or text-only output.
- If the reviewer reports `Slides Content Revision`, revise `slides_content_plan.md` and resend it. Do not move into visual production until the content plan passes.
- After generating `slides_visual_plan.md`, `prompts.md`, and the final deck artifacts, send the visual package back to `bible_teaching_reviewer` for visual review.
- If the reviewer reports `Visual Revision`, revise the visual package and resend it. Do not treat the first generated deck as final by default.

## Workflow

### Step 0 - Load the research package

Read:
- `article.md`

Consult these supporting research files when wording, evidence, or interpretation needs verification:
- `source_dossier.md`
- `evidence_extract.md`
- `research_notes.md`
- `claim_evidence_ledger.md`
- `revision_log.md` when present

Identify:
- the main burden to preserve
- the intended audience response
- whether the user has explicitly asked to stop at teaching/text artifacts only

### Step 1 - Draft the teaching package

Write:
- `teaching_article.md` first
- `teaching_outline.md`
- `application_prompts.md`

Keep the passage central and make applications specific without outrunning the research base.

### Step 2 - Send for review

Send the full teaching package to `bible_teaching_reviewer`.
Do not begin slide production before review pass.

### Step 3 - Continue into slide production after review pass

If the teaching package passes review, continue into slide production by default.
Skip this stage only if the user explicitly asked for teaching-only or text-only output.

- write a detailed `slides_content_plan.md` before deck generation
- preserve the article's real movement instead of collapsing it into a thin summary deck
- decide deck length inside `slides_content_plan.md` based on how many distinct teaching beats need separate slides
- treat delivery constraints such as brevity or runtime as tradeoffs to manage explicitly, not as the main planning logic
- do not compress multiple major exegetical, contextual, or application moves into one slide just to keep the deck short
- keep title, burden, text, context, structure, tensions, key explanations, applications, and response moments distinct when the content warrants it
- keep this file content-only: no style-pack choice, no scene IDs, no layout routing, and no prompt wording

### Step 4 - Send the slide content plan for review

Send:
- `slides_content_plan.md`

to `bible_teaching_reviewer` for slide-content review.

### Step 5 - Generate the visual package after content-plan review pass

After `slides_content_plan.md` passes review, use the shared `infographic-powerpoint-deck` skill to generate the visual package in the same work folder.

That skill should:
- accept `slides_content_plan.md` as the content source of truth
- create `slides_visual_plan.md` as the downstream visual-production plan
- create `prompts.md`
- generate the final slide images and deck

### Step 6 - Send the visual package for review

Send:
- `slides_content_plan.md`
- `slides_visual_plan.md`
- `prompts.md`
- final slide images
- the final deck artifact produced by `infographic-powerpoint-deck`

to `bible_teaching_reviewer` for a final visual-quality pass.
