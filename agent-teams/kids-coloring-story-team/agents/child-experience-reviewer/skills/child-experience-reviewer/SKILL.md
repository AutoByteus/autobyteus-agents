---
name: child-experience-reviewer
description: Review candidate kids coloring story assets for story-image correspondence, recurring character consistency, and printable readiness.
---

# Child Experience Reviewer

Use this skill to independently review actual candidate coloring assets before printable packaging.
This role is useful only when it performs visual inspection, not when it merely reads logs.

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
- Use it as the shared reference for story-image correspondence, character consistency, child safety, source text review, coloring usability, and review handoffs.

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

### Step 3 - Review character and motif consistency

Review the full sequence side by side.
For every recurring character, object, or motif, compare the pages where it appears.

Check:

- same character identity across pages
- consistent age, body shape, face shape, hair/head covering, clothing style, and major accessories
- consistent animal companions or recurring objects
- consistent line-art style, line weight, page density, and motif language
- no sudden style switch between pages
- no character drift that would make a child think the character became someone else

For Bible-story examples, a recurring character such as David should stay recognizably the same across all pages where he appears.

When consistency fails, identify the strongest approved or closest-to-approved image as the `base character reference`.
The fix instruction should be concrete:

- name the base/reference asset id and path
- name the inconsistent page asset ids
- describe exactly what drifted, such as face shape, hair, head covering, clothing, body proportions, expression, or key accessory
- recommend using `edit_image` with the base/reference image to revise the inconsistent page when the page is otherwise compositionally correct
- recommend regenerating with the locked character identity when the page is too far off or the composition is wrong
- preserve the storyboard beat while restoring the character identity

### Step 4 - Review baseline child and print fit

After the two primary visual-continuity checks, inspect for baseline defects:

- age fit
- warm and safe emotional tone
- child-friendly character design
- style match to simplified cute coloring bookmarks and Bible verse coloring sheets
- one full A4 page image per story beat, unless an explicit user-requested exception is recorded
- imagination or activity value
- black-and-white coloring suitability
- closed shapes and clear outlines
- detail density
- print margins and borders
- text legibility
- exact source text match when Bible verses, quotations, or required wording appear
- required words are visibly part of the generated or edited image itself
- black-and-white line-art purity for coloring pages
- gentle, safe, inclusive, original child-facing content
- simplified cute coloring-sheet style rather than realistic, dramatic, or overly detailed styling
- one complete story page image per final coloring page unless explicitly approved
- well-formed faces, hands, animals, letters, objects, and page borders

### Step 5 - Write `child-experience-review-report.md`

For each asset, record:

- pass, fix required, reject, or route upstream
- exact issue
- expected correction
- owning specialist
- source artifact that supports the decision

Only put internally approved assets into the approved visual manifest.

### Step 6 - Route or approve

If any blocking issue remains, send a fix message with `send_message_to`.

Route:

- story, source text, age range, or activity-purpose defects to `story_activity_designer`
- visual style, line-art, coloring usability, malformed image, print image defects, or character-consistency defects to `coloring_page_illustrator`

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

- Approval requires actual visual inspection.
- Approval requires story-image correspondence and recurring character consistency.
- Approval requires text accuracy, required text inside the generated page image, child safety, style match, and coloring usability.
- When consistency fails, include a base/reference image recommendation and whether the fix should use `edit_image` or regeneration.
- Keep fixes with the owning specialist unless the defect reveals an upstream planning gap.
