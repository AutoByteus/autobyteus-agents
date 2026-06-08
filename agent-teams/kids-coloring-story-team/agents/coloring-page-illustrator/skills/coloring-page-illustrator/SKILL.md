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
- recurring character identity locks, including face shape, hair or head covering, clothing style, body proportions, and key accessories
- motif library
- border style
- text treatment
- white-space rules
- age-specific difficulty
- style boundaries

Default style: cute black-and-white printable coloring page in the same simplified family as children's coloring bookmarks and Bible verse sheets: rounded doodle outlines, friendly calm expressions, simple decorative motifs, large closed colorable shapes, clean open interiors, and generous white space.
Keep the visual language peaceful, doodle-like, and easy for children to color.

### Step 3 - Create `prompt-pack.md`

For each A4 page, write a generation or edit prompt that includes:

- page id
- story beat
- exact approved in-image text to include, or `word-free picture page`
- text placement and style when text is included, such as large simple child-readable caption in a bottom caption band inside the page border
- one full-page scene for one story beat
- required characters and motifs
- age range
- A4 print format
- black-and-white line-art requirements
- margin and border requirements for A4 output
- style boundary: peaceful child-safe Bible-story coloring sheet with clean rounded line art, large colorable spaces, and simple friendly expressions

Keep prompt ids stable across retries.

Use prompt language that describes the desired finished page. Good examples:

- `Create one A4 landscape black-and-white printable coloring page for page003. Show David smiling beside a sheep on a peaceful hillside, rounded doodle outlines, large closed colorable shapes, simple clouds and flowers, generous white space, and a rounded page border. Include the exact bottom caption "David cared for the sheep." inside a simple caption band within the border.`
- `Create one A4 landscape word-free black-and-white printable coloring page for page004. Show David choosing smooth stones by a small stream, with the same young David design from the reference page, simple rounded stones, gentle hills, clean open interiors, and a rounded page border.`

### Step 4 - Create or update `visual-asset-index.md`

Record:

- planned asset ids
- page ids
- output paths
- source/reference paths
- recurring character ids and which pages they appear on
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

Fix outputs through `edit_image` or regeneration when the finished page image needs stronger line clarity, cleaner text, better character consistency, simpler detail, gentler child-safe staging, clearer story match, or a separate A4 image for the current page.

### Step 6 - Self-check before review

Before handoff, verify:

- every candidate image was inspected
- each candidate matches its storyboard page id
- every candidate is one full A4 page image for one story beat, unless the storyboard records an explicit user-requested multi-panel exception
- line art is printable and colorable
- required text appears inside the page image, is legible, and matches source text exactly
- word-free pages remain word-free
- content feels safe, gentle, encouraging, and age-appropriate
- style matches the simplified cute coloring-bookmark examples instead of becoming realistic, dramatic, or overly detailed
- page density fits the target age
- borders and margins fit the requested print format
- candidate package includes only inspected images that passed illustrator self-check

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
- confirmation that required text is generated inside each page image, not added later
- open risks

## Routing Rules

- Route story, source text, age range, or format ambiguity to `story_activity_designer`.
- If `child_experience_reviewer` sends a character-consistency fix with a base/reference asset, prefer `edit_image` using that base/reference image when the target page's composition is otherwise correct.
- Regenerate with the locked character identity only when the target page is too far from the storyboard or the character drift cannot be repaired cleanly with `edit_image`.
- After any reviewer-requested fix, update `visual-asset-index.md` and `image-generation-log.md`, then resend the full cumulative package.
