---
name: coloring-page-illustrator
description: Create prompt packs, visual style guides, generated or edited line-art assets, and image logs for printable kids coloring stories.
---

# Coloring Page Illustrator

Use this skill to turn an approved coloring story package into candidate printable line-art assets.

## Expected Inputs

- approved `coloring-story-brief.md`
- `source-text-index.md` when present
- approved `coloring-storyboard.md`
- target age range
- product format
- A4 paper size and orientation
- user-supplied references, style examples, or brand/church/school assets when present

## Produced Artifacts

- `visual-style-guide.md`
- `prompt-pack.md`
- `visual-asset-index.md`
- `image-generation-log.md`
- candidate A4 page or bookmark-style page images under `assets/`

Use:
- [visual-style-guide-template.md](templates/visual-style-guide-template.md)
- [prompt-pack-template.md](templates/prompt-pack-template.md)
- [visual-asset-index-template.md](templates/visual-asset-index-template.md)
- [image-generation-log-template.md](templates/image-generation-log-template.md)

## Required Shared Reads

- Start by reading [coloring-production-principles.md](coloring-production-principles.md).
- Use it as the shared reference for line-art style, age fit, image generation, image inspection, and review handoffs.

## Workflow

### Step 1 - Confirm the approved visual contract

Confirm that the incoming package includes:

- approved brief
- approved storyboard
- source text index when text is in scope
- target age range
- product format
- A4 print size and orientation
- one-image-per-A4-page requirement

If the package is not approved or text is uncertain, route it back to `story_activity_designer`.

### Step 2 - Create `visual-style-guide.md`

Define:

- line-art style
- line thickness
- page density
- character style
- motif library
- border style
- text treatment
- white-space rules
- age-specific difficulty
- negative style rules

Default style: cute black-and-white printable coloring page in the same simplified family as children's coloring bookmarks and Bible verse sheets: rounded doodle outlines, friendly calm expressions, simple decorative motifs, large closed colorable shapes, no gray shading, no filled color, no dense hatching, and generous white space.
Do not drift into realistic Bible illustration, dramatic action art, manga, comic-book battle style, fantasy art, adult coloring-book detail, or dense storybook engraving.

### Step 3 - Create `prompt-pack.md`

For each A4 page, write a generation or edit prompt that includes:

- page id
- story beat
- exact text to include, or `no text`
- one full-page scene only, not a collage, grid, contact sheet, comic strip, or multi-panel layout
- required characters and motifs
- age range
- A4 print format
- black-and-white line-art constraints
- margin and border requirements for A4 output
- negative constraints: no color fill, no gray shading, no scary content, no dramatic action, no realistic battle scene, no malformed text, no copyrighted characters, no multi-panel sheet, no small thumbnail grid

Keep prompt ids stable across retries.

### Step 4 - Create or update `visual-asset-index.md`

Record:

- planned asset ids
- page ids
- output paths
- source/reference paths
- generation status
- self-check status
- review status
- final-use status

### Step 5 - Generate or edit images serially

Use `generate_image` or `edit_image` for candidate assets.

For each image:

- call exactly one image tool
- inspect the actual output image
- record the result in `image-generation-log.md`
- update `visual-asset-index.md`
- decide `candidate passed self-check`, `needs edit`, `rejected`, or `blocked`
- run `sleep 60` before the next image call

Reject or fix outputs that have unwanted color fill, broken text, too much detail, scary content, malformed page borders, weak line clarity, story mismatch, or multiple story scenes compressed into one final page.

### Step 6 - Self-check before review

Before handoff, verify:

- every candidate image was inspected
- each candidate matches its storyboard page id
- every candidate is one full A4 page image for one story beat, unless the storyboard records an explicit user-requested multi-panel exception
- line art is printable and colorable
- text, if present, is legible and matches source text
- no unsafe, scary, shaming, or exclusionary content appears
- style matches the simplified cute coloring-bookmark examples instead of becoming realistic, dramatic, or overly detailed
- page density fits the target age
- borders and margins fit the requested print format
- no rejected or `needs edit` image is included as a candidate

### Step 7 - Handoff to `child_experience_reviewer`

Send the candidate visual package downstream using `send_message_to`.

Include:

- absolute path to `coloring-story-brief.md`
- absolute path to `source-text-index.md` when present
- absolute path to `coloring-storyboard.md`
- absolute path to `visual-style-guide.md`
- absolute path to `prompt-pack.md`
- absolute path to `visual-asset-index.md`
- absolute path to `image-generation-log.md`
- absolute paths to candidate image assets
- approval status
- confirmation that each candidate is a separate A4 page image
- open risks

## Routing Rules

- Route story, source text, age range, or format ambiguity to `story_activity_designer`.
- If `child_experience_reviewer` sends a visual fix, update the relevant assets and resend the full cumulative package.
