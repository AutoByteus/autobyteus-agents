---
name: coloring-page-illustrator
description: Create prompt packs, visual style guides, recurring character references, generated or edited line-art assets, paired colored reference assets, and image logs for printable kids coloring stories.
---

# Coloring Page Illustrator

Use this skill to turn an approved coloring story package into character reference assets, candidate printable line-art assets, and paired colored reference assets.

## Expected Inputs

- approved `coloring-story-brief.md`
- `source-text-index.md` when present
- approved `coloring-storyboard.md`
- target age range
- product format
- A4 paper size and orientation
- recurring character plan and page appearances when recurring characters are in scope
- approved colored reference direction
- user-supplied references, style examples, or brand/church/school assets when present

## Produced Artifacts

- `visual-style-guide.md`
- `character-reference-index.md` when recurring main characters are in scope
- `prompt-pack.md`
- `visual-asset-index.md`
- `image-generation-log.md`
- character reference images under `assets/characters/` when recurring main characters are in scope
- candidate A4 page or bookmark-style page images under `assets/`
- paired colored reference images under `assets/colored/`

Use:
- [visual-style-guide-template.md](templates/visual-style-guide-template.md)
- [character-reference-index-template.md](templates/character-reference-index-template.md)
- [prompt-pack-template.md](templates/prompt-pack-template.md)
- [visual-asset-index-template.md](templates/visual-asset-index-template.md)
- [image-generation-log-template.md](templates/image-generation-log-template.md)

## Required Shared Reads

- Start by reading [coloring-production-principles.md](coloring-production-principles.md).
- Use it as the shared reference for line-art style, age fit, image generation, the shared visual quality checklist, image inspection, and review handoffs.

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
- recurring character plan and page appearances
- colored reference pack status and color direction

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
- colored reference treatment, including palette, recurring character colors, motif colors, and how much color guidance to show
- white-space rules
- age-specific difficulty
- style boundaries

Default style: cute black-and-white printable coloring page in the same simplified family as children's coloring bookmarks and Bible verse sheets: rounded doodle outlines, friendly calm expressions, simple decorative motifs, large closed colorable shapes, clean open interiors, and generous white space.
Keep the visual language peaceful, doodle-like, and easy for children to color.

### Step 3 - Create character references when needed

If the storyboard has a recurring main character, create or approve a character reference sheet/model sheet before generating story pages.

For each recurring main character:

- assign or reuse the character id from the storyboard
- create a clear reference image under `assets/characters/`
- keep the reference in the same simplified cute coloring-page style as the final pages
- show enough visual information to lock face shape, hair or head covering, clothing, age/body proportions, expression range, and key accessories
- record stable colors for colored references when color is in scope
- inspect the actual reference image
- record the reference path, approval status, identity locks, color locks, and affected page ids in `character-reference-index.md`
- run `sleep 60` before the next image call when an image tool was used

A recurring main character should not be generated only from repeated text descriptions across multiple pages.

### Step 4 - Create `prompt-pack.md`

For each A4 page, write a generation or edit prompt that includes:

- page id
- story beat
- exact approved in-image text to include, or `word-free picture page`
- text placement and style when text is included, such as large simple child-readable caption in a bottom caption band inside the page border
- explicit instruction that no page labels, page ids, prompt ids, asset ids, signatures, watermarks, random letters, or other unapproved text may appear in the artwork
- one full-page scene for one story beat
- required characters and motifs
- character ids present on the page
- approved character reference image paths for recurring characters on the page
- instruction to preserve the character identity from the approved reference image while changing pose, expression, or scene only as needed for the storyboard beat
- age range
- A4 print format
- black-and-white line-art requirements
- margin and border requirements for A4 output
- style boundary: peaceful child-safe Bible-story coloring sheet with clean rounded line art, large colorable spaces, and simple friendly expressions

For each paired colored reference, write an `edit_image` instruction that includes:

- source black-and-white page path
- page id
- approved color notes from the brief and storyboard
- stable colors for recurring characters, clothing, and motifs
- instruction to preserve the exact composition, black outlines, border, page text, character identity, and page order
- instruction to add simple cheerful color fills only, with no new objects, no text changes, and no layout changes
- output path under `assets/colored/`

Keep prompt ids stable across retries.

Use prompt language that describes the desired finished page. Good examples:

- `Create one A4 landscape black-and-white printable coloring page for page003. Show David smiling beside a sheep on a peaceful hillside, rounded doodle outlines, large closed colorable shapes, simple clouds and flowers, generous white space, and a rounded page border. Include the exact bottom caption "David cared for the sheep." inside a simple caption band within the border.`
- `Using the approved character reference assets/characters/character-david-reference.png as input/reference, create one A4 landscape word-free black-and-white printable coloring page for page004. Show the same young David choosing smooth stones by a small stream, simple rounded stones, gentle hills, clean open interiors, and a rounded page border.`

### Step 5 - Create or update `visual-asset-index.md`

Record:

- planned asset ids
- page ids
- whether the row is `black-and-white printable` or `colored reference`
- output paths
- source/reference paths
- recurring character ids and which pages they appear on
- character reference paths used for page generation
- generation status
- self-check status
- review status
- final-use status

### Step 6 - Generate or edit images serially

Use `generate_image` or `edit_image` for candidate assets.

For each black-and-white printable image:

- if the page includes a recurring character, use `edit_image` with the approved character reference image as an input/reference and log its path
- call exactly one image tool
- inspect the actual output image
- record the result in `image-generation-log.md`
- update `visual-asset-index.md`
- decide `candidate passed self-check`, `needs edit`, `rejected`, or `blocked`
- run `sleep 60` before the next image call

Fix outputs through `edit_image` or regeneration when the finished page image needs stronger line clarity, cleaner text, better character-reference consistency, simpler detail, gentler child-safe staging, clearer story match, or a separate A4 image for the current page.

For each paired colored reference image:

- start only from the matching black-and-white page that passed illustrator self-check
- use `edit_image` with the black-and-white page as the input image
- preserve the exact line art, border, visible text, page layout, and story beat
- add simple child-friendly colors according to the approved color direction
- inspect the actual colored output
- record the source black-and-white asset and colored output path in `image-generation-log.md`
- update `visual-asset-index.md`
- if the colored reference changed composition, text, line art, or character identity, reject it and retry from the corrected black-and-white source
- run `sleep 60` before the next image call

### Step 7 - Self-check before review

Before handoff, inspect every black-and-white candidate and paired colored reference against the shared visual quality checklist in `coloring-production-principles.md`.
For recurring characters, also compare each page against the approved character reference image and `character-reference-index.md`.

Record the self-check result in `image-generation-log.md` and `visual-asset-index.md`.
Do not send any asset to review unless it passed the illustrator self-check or is explicitly marked as blocked with a clear reason.

### Step 8 - Handoff to `child_experience_reviewer`

Send the candidate visual package downstream using `send_message_to`.

Include:

- absolute path to `coloring-story-brief.md`
- absolute path to `source-text-index.md` when present
- absolute path to `coloring-storyboard.md`
- absolute path to `visual-style-guide.md`
- absolute path to `character-reference-index.md` when recurring main characters are in scope
- absolute paths to character reference images when recurring main characters are in scope
- absolute path to `prompt-pack.md`
- absolute path to `visual-asset-index.md`
- absolute path to `image-generation-log.md`
- absolute paths to candidate image assets
- absolute paths to paired colored reference assets
- approval status
- confirmation that each candidate is a separate A4 page image
- confirmation that every recurring main character page used the approved character reference image as an input/reference
- confirmation that required text is generated inside each page image, not added later
- confirmation that every page was checked for stray unapproved text such as page ids, labels, watermarks, signatures, and random letters
- confirmation that each colored reference was created by `edit_image` from its paired black-and-white page
- explicit reviewer focus request: verify story match, character-reference consistency, exact required text, absence of unapproved text, black-and-white coloring usability, and colored-reference source preservation
- open risks

## Routing Rules

- Route story, source text, age range, or format ambiguity to `story_activity_designer`.
- If `child_experience_reviewer` sends a character-consistency fix with an approved character reference or base/reference asset, prefer `edit_image` using that reference image when the target page's composition is otherwise correct.
- Regenerate with the locked character identity only when the target page is too far from the storyboard or the character drift cannot be repaired cleanly with `edit_image`.
- After any reviewer-requested fix, update `visual-asset-index.md` and `image-generation-log.md`, then resend the full cumulative package.
