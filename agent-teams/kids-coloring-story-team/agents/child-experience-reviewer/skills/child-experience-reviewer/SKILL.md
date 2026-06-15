---
name: child-experience-reviewer
description: Review character references, candidate kids coloring story assets, and colored references for story-image correspondence, recurring character consistency, approved-text-only surfaces, and printable readiness.
---

# Child Experience Reviewer

Use this skill to independently review actual character reference assets, candidate coloring assets, and paired colored references before packaging.
This role is useful only when it performs visual inspection, not when it merely reads logs.

## Expected Inputs

- approved `coloring-story-brief.md`
- `source-text-index.md` when present
- approved `coloring-storyboard.md`
- `visual-style-guide.md`
- `character-reference-index.md` and character reference assets when recurring main characters are in scope
- `prompt-pack.md`
- `visual-asset-index.md`
- `image-generation-log.md`
- candidate black-and-white image assets
- paired colored reference assets when in scope

## Produced Artifacts

- `child-experience-review-report.md`
- approved character reference manifest, approved visual manifest, and approved colored reference manifest inside the review report

Use:
- [child-experience-review-report-template.md](templates/child-experience-review-report-template.md)

## Required Shared Reads

- Start by reading [coloring-production-principles.md](coloring-production-principles.md).
- Use it as the shared reference for the shared visual quality checklist, story-image correspondence, character consistency, child safety, source text review, coloring usability, colored reference review, and review handoffs.

## Workflow

### Step 1 - Confirm the review package

Confirm:

- brief approval status
- storyboard approval status
- source text index path when text is in scope
- visual style guide path
- character reference index path and character reference asset paths when recurring main characters are in scope
- prompt pack path
- visual asset index path
- image generation log path
- candidate image paths
- colored reference paths and their paired black-and-white source paths when in scope

If the package is incomplete, route it back to `coloring_page_illustrator`.
If recurring main characters appear in the storyboard but no character reference index or reference assets are provided, block the review and route it back to `coloring_page_illustrator`.
If you cannot visually inspect the actual image files in the current runtime, write `child-experience-review-report.md` with status `Blocked` and route it back. Do not approve from prompt text, file names, or logs alone.

### Step 2 - Review story-image correspondence

Inspect the actual image for every page.
Compare it directly against the approved storyboard row for that page.

Check:

- the main scene matches the storyboard story beat
- the visible action or emotion matches the approved child-facing intent
- required characters, objects, and motifs are present
- forbidden or risky elements from the storyboard notes are absent
- the page does not accidentally show a different part of the story
- the page is one full A4 page image for that story beat, not a collage of several beats

### Step 3 - Review character reference and motif consistency

Review the full sequence side by side.
For every recurring main character, compare each page where it appears against the approved character reference sheet/model sheet first, then compare the pages to one another.
For every recurring object or motif, compare the pages where it appears.

Check:

- same character identity as the approved character reference image
- same character identity across pages
- consistent age, body shape, face shape, hair/head covering, clothing style, and major accessories
- page-level prompts and logs name the expected character reference path when a recurring character appears
- consistent animal companions or recurring objects
- consistent line-art style, line weight, page density, and motif language
- no sudden style switch between pages
- no character drift that would make a child think the character became someone else

For Bible-story examples, a recurring character such as David should stay recognizably the same across all pages where he appears.

When consistency fails, prefer the approved character reference image as the `base character reference`.
If no approved reference exists, block the review and identify the strongest approved or closest-to-approved image only as a temporary base recommendation.
The fix instruction should be concrete:

- name the base/reference asset id and path
- name the inconsistent page asset ids
- describe exactly what drifted, such as face shape, hair, head covering, clothing, body proportions, expression, or key accessory
- recommend using `edit_image` with the base/reference image to revise the inconsistent page when the page is otherwise compositionally correct
- recommend regenerating with the locked character identity when the page is too far off or the composition is wrong
- preserve the storyboard beat while restoring the character identity

### Step 4 - Apply the shared visual quality checklist

Inspect every black-and-white candidate and paired colored reference against the shared visual quality checklist in `coloring-production-principles.md`.

Record pass/fix/block decisions for:

- black-and-white printable page quality
- approved-text-only image surfaces
- colored reference pairing and source preservation when in scope

Treat any failed shared-checklist item as a blocking issue unless the storyboard records an explicit user-approved exception.

### Step 5 - Write `child-experience-review-report.md`

For each asset, record:

- pass, fix required, reject, or route upstream
- exact issue
- expected correction
- owning specialist
- source artifact that supports the decision
- whether the actual image contains only approved text or has stray unapproved text

Only put internally approved character references into the approved character reference manifest.
Only put internally approved page assets into the approved visual manifest.

### Step 6 - Route or approve

If any blocking issue remains, send a fix message with `send_message_to`.

Route:

- story, source text, age range, or activity-purpose defects to `story_activity_designer`
- visual style, line-art, coloring usability, malformed image, print image defects, or character-consistency defects to `coloring_page_illustrator`
- unapproved visible text, page labels, watermarks, signatures, or random generated letters to `coloring_page_illustrator`

If all assets pass, send the approved package to `printable_pack_producer`.

Include:

- absolute path to `coloring-story-brief.md`
- absolute path to `source-text-index.md` when present
- absolute path to `coloring-storyboard.md`
- absolute path to `visual-style-guide.md`
- absolute path to `character-reference-index.md` when recurring main characters are in scope
- absolute path to `prompt-pack.md`
- absolute path to `visual-asset-index.md`
- absolute path to `image-generation-log.md`
- absolute path to `child-experience-review-report.md`
- absolute paths to approved character reference assets when recurring main characters are in scope
- absolute paths to approved visual assets
- absolute paths to approved colored reference assets
- approved character reference manifest when recurring main characters are in scope
- approved visual manifest
- open non-blocking risks
- explicit notes on reviewed focus areas, including exact approved text, absence of unapproved text, story match, character-reference consistency, print usability, and colored-reference preservation

## Routing Rules

- Approval requires actual visual inspection.
- Approval requires story-image correspondence and recurring character consistency.
- Approval requires every applicable item in the shared visual quality checklist to pass.
- Approval requires recurring main characters to have approved character reference assets unless the storyboard records a user-approved loose-continuity exception.
- When consistency fails, include the approved character reference path, or a temporary base/reference image recommendation when the reference is missing, and whether the fix should use `edit_image` or regeneration.
- Keep fixes with the owning specialist unless the defect reveals an upstream planning gap.
