---
name: child-experience-reviewer
description: Review candidate kids coloring story assets for child fit, safety, source text accuracy, coloring usability, and printable readiness.
---

# Child Experience Reviewer

Use this skill to independently review candidate coloring assets before printable packaging.

## Expected Inputs

- approved `coloring-story-brief.md`
- `source-text-index.md` when present
- approved `coloring-storyboard.md`
- `visual-style-guide.md`
- `prompt-pack.md`
- `visual-asset-index.md`
- `image-generation-log.md`
- candidate image assets

## Produced Artifacts

- `child-experience-review-report.md`
- approved visual manifest inside the review report

Use:
- [child-experience-review-report-template.md](templates/child-experience-review-report-template.md)

## Required Shared Reads

- Start by reading [coloring-production-principles.md](coloring-production-principles.md).
- Use it as the shared reference for child safety, age fit, source text review, coloring usability, and review handoffs.

## Workflow

### Step 1 - Confirm the review package

Confirm:

- brief approval status
- storyboard approval status
- source text index path when text is in scope
- visual style guide path
- prompt pack path
- visual asset index path
- image generation log path
- candidate image paths

If the package is incomplete, route it back to `coloring_page_illustrator`.

### Step 2 - Review each candidate image

Inspect the actual image.

Check:

- age fit
- warm and safe emotional tone
- child-friendly character design
- style match to simplified cute coloring bookmarks and Bible verse coloring sheets
- story beat match
- one full A4 page image per story beat, unless an explicit user-requested exception is recorded
- imagination or activity value
- black-and-white coloring suitability
- closed shapes and clear outlines
- detail density
- print margins and borders
- text legibility
- exact source text match when Bible verses, quotations, or required wording appear
- no unwanted color fill
- no scary, unsafe, shaming, exclusionary, or copyrighted-character-like content
- no realistic, dramatic, manga, comic-battle, adult-detail, or frightening style drift
- no collage, grid, contact sheet, comic strip, or multiple small story scenes in one final coloring page unless explicitly approved
- no malformed faces, hands, animals, letters, or objects that distract from the activity

### Step 3 - Write `child-experience-review-report.md`

For each asset, record:

- pass, fix required, reject, or route upstream
- exact issue
- expected correction
- owning specialist
- source artifact that supports the decision

Only put internally approved assets into the approved visual manifest.

### Step 4 - Route or approve

If any blocking issue remains, send a fix message with `send_message_to`.

Route:

- story, source text, age range, or activity-purpose defects to `story_activity_designer`
- visual style, line-art, coloring usability, malformed image, or print image defects to `coloring_page_illustrator`

If all assets pass, send the approved package to `printable_pack_producer`.

Include:

- absolute path to `coloring-story-brief.md`
- absolute path to `source-text-index.md` when present
- absolute path to `coloring-storyboard.md`
- absolute path to `visual-style-guide.md`
- absolute path to `prompt-pack.md`
- absolute path to `visual-asset-index.md`
- absolute path to `image-generation-log.md`
- absolute path to `child-experience-review-report.md`
- absolute paths to approved visual assets
- approved visual manifest
- open non-blocking risks

## Routing Rules

- Do not approve uninspected assets.
- Do not approve assets that fail text accuracy, child safety, or coloring usability.
- Keep fixes with the owning specialist unless the defect reveals an upstream planning gap.
