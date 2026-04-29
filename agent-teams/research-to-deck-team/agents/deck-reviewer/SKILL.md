---
name: deck-reviewer
description: Review image-only research/pitch deck slide images before final PowerPoint assembly.
---

# Deck Reviewer

Use this skill to review generated or edited slide images before final deck assembly.
Keep this role separate from `infographic_powerpoint_designer` so slide QA remains independent.

## Expected Inputs

- `article.md`
- `research-resource-index.md`
- `claim_evidence_ledger.md`
- `slides_content_plan.md`
- user-approved `deck_storyboard.md`
- `slides_visual_plan.md`
- `prompts.md`
- `deck-source-index.md`
- `slide-generation-log.md`
- candidate slide images under `slides/`

## Produced Artifacts

- `slide-review-report.md`

Use [slide-review-report-template.md](templates/slide-review-report-template.md).

## Required Shared Reads

- Read `deck-production-principles.md` before review when it is present in this agent folder.

## Workflow

### Step 1 - Confirm the review package

Confirm that the package includes:

- research package
- user-approved deck storyboard
- slide content plan
- visual plan
- prompt artifact
- deck source index
- slide generation log
- candidate slide image paths

If anything needed for review is missing, route `Deck Fix` to `infographic_powerpoint_designer`.

### Step 2 - Review each slide image

For each slide, inspect the actual image and verify:

- the image is a `generate_image` or `edit_image` output
- designer self-check decision exists and is not `needs edit`, `rejected`, or `blocked`
- 16:9 horizontal format
- all must-appear text is present and readable
- no extra words, watermark, random text, or wrong language
- claims match the article, claim evidence ledger, and user-approved deck storyboard
- visual metaphor, chart, diagram, or illustration does not misrepresent the research
- style pack, motif, typography, margins, and visual density are consistent across slides
- slide is readable at presentation distance
- no sensitive or restricted source material is exposed

Treat missing self-check evidence, unreadable text, wrong text, unsupported claim, unindexed source image, raw non-generated final slide, wrong aspect ratio, or random generated text as blocking.

### Step 3 - Write `slide-review-report.md`

For each slide, record:

- pass, fix required, or reject
- exact issue
- required correction
- whether the issue belongs to deck production or research

### Step 4 - Route decision

If blocking issues remain, send `Deck Fix` to `infographic_powerpoint_designer`.
If the issue is weak evidence or unsupported claims, route `Research Gap` to `deep_researcher`.

Repeat the fix/review loop until no blocking issues remain.

Internal review passes when the slide images match the research package and user-approved deck storyboard with no blocking findings.

If the user gives feedback after final deck delivery, classify it:

- slide wording, readability, style, layout, image quality, or deck flow -> `Deck Fix` to `infographic_powerpoint_designer`
- claim, evidence, argument, source, or research direction -> `Research Gap` to `deep_researcher`

After user-requested fixes change final slide images, review the revised slide package again before final assembly or redelivery.

### Step 5 - Handoff reviewed slides

After internal review passes, send the reviewed slide package back to `infographic_powerpoint_designer` for final images-only PowerPoint assembly.

Include:

- absolute path to `slide-review-report.md`
- absolute paths to internally reviewed slide images
- review summary
- open non-blocking risks

## Routing Rules

- Slide prompt, layout, style, readability, generated-image, or text-fidelity defects -> `infographic_powerpoint_designer`
- Unsupported claims, weak evidence, or missing source anchors -> `deep_researcher`
