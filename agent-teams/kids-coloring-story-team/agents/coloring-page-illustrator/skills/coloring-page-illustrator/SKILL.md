---
name: coloring-page-illustrator
description: Create prompt packs, visual style guides, recurring character references, generated or edited line-art assets, paired colored reference assets, and image logs for printable kids coloring products.
---

# Coloring Page Illustrator

Use this skill when an approved coloring-story package is ready for visual production. The illustrator owns the visual style guide, recurring-character references, prompt pack, image generation and editing, visual indexes and logs, self-checks, and handoff to `child_experience_reviewer`.

Use the shared production reference for cross-team child-safety, print, image-operation, quality-checklist, approval, and handoff requirements. This skill adds the illustrator-specific sequence and artifacts; it does not override that shared contract.

## Inputs

- approved `coloring-story-brief.md`
- approved `coloring-storyboard.md`
- `source-text-index.md` when source text, translated text, quotations, educational facts, user-supplied protected wording, or other externally grounded wording or claims are in scope
- target age range, product format, page or item count, A4 size, and orientation
- recurring-character ids and page appearances, with any intentional loose-continuity exception explicitly user-approved in the storyboard, or an explicit statement that no recurring main characters are in scope
- approved color direction and colored-reference-pack scope
- user-supplied references, style examples, or owned brand, church, or school assets when present

## Outputs

- `visual-style-guide.md`
- `character-reference-index.md` and reference images under `assets/characters/` when recurring main characters are in scope and no approved loose-continuity exception applies
- `prompt-pack.md`
- `visual-asset-index.md`
- `image-generation-log.md`
- candidate black-and-white page images under `assets/`
- paired colored reference images under `assets/colored/` by default; omit them only when the approved package records an explicit not-in-scope decision

Use the linked templates for artifact structure:

- [visual-style-guide-template.md](templates/visual-style-guide-template.md)
- [character-reference-index-template.md](templates/character-reference-index-template.md)
- [prompt-pack-template.md](templates/prompt-pack-template.md)
- [visual-asset-index-template.md](templates/visual-asset-index-template.md)
- [image-generation-log-template.md](templates/image-generation-log-template.md)

## Required Reads

Start with [coloring-production-principles.md](coloring-production-principles.md). It is the shared source of truth for age fit, child safety, line-art rules, character references, one-image-per-page behavior, image-call cooldowns, the visual quality checklist, and review gates.

## Workflow

### 1. Verify the visual contract

Read the approved brief and storyboard before creating prompts or images. Confirm:

- upstream approval is present;
- the target age, product format, page or item count, A4 size, orientation, and one-image-per-page rule agree across the package;
- the storyboard identifies each page or item, its story beat or activity function, visible text or word-free status, required characters and motifs, recurring-character appearances, and any user-approved loose-continuity exception;
- `source-text-index.md` is present with the relevant approved or explicitly user-supplied wording when source text, translated text, quotations, educational facts, user-supplied protected wording, or other externally grounded wording or claims are in scope;
- the colored-reference pack status and approved color direction are clear;
- supplied references and rights or ownership notes are available when they are part of the request.

If approval, source wording, age, format, page or item count, page separation, or color direction is missing or contradictory, stop and route the decision to `story_activity_designer`. When grounded text or claims are out of scope, do not require a source-text index. Do not fill an upstream gap with visual invention.

### 2. Lock style and recurring characters

Create `visual-style-guide.md` from the approved package and the shared principles. Record the target age, page format, line-art family, line thickness, density, character and motif language, border, text treatment, white-space rules, age-specific difficulty, style boundaries, and colored-reference palette and continuity.

For every recurring main character, unless the storyboard records an explicit user-approved one-off loose-continuity exception:

1. Create and approve a character reference sheet for page generation, or use an already approved sheet, before generating story pages.
2. Store or record the stable reference under `assets/characters/`.
3. Inspect the actual reference image and record its identity locks, color locks, affected page ids, source path, and approval status in `character-reference-index.md`.
4. Do not generate a page with that character until the reference is approved for page generation.

When a reference is in scope, it is the character's visual source of truth. If it changes, recheck affected black-and-white pages and paired colored references before handoff. A recurring character that requires a reference must not be kept consistent only through repeated text descriptions.

When an approved loose-continuity exception applies, record its scope in the visual style guide and prompt pack, then make the exception visible in the reviewer handoff.

### 3. Build the prompt pack

Create one stable prompt id per page or item and a paired stable prompt id for each colored reference. Each black-and-white prompt must state:

- page or item id and exactly one approved storyboard row;
- exact approved in-image wording and placement, or `word-free picture page`;
- the required characters, motifs, age range, A4 orientation, border, and safe margins;
- recurring-character ids and the approved reference paths used on that page, or the recorded loose-continuity exception;
- `edit_image` with the approved character reference as an input/reference whenever a recurring main character appears without that exception;
- the approved visual style and shared safety constraints;
- that no page labels, ids, prompt ids, asset ids, signatures, watermarks, random letters, or other unapproved text may appear.

Each colored-reference instruction must name its matching passed black-and-white source, page or item id, approved color notes, and output path under `assets/colored/`. It must require color fills only while preserving the source composition, outlines, border, visible text, character identity, and story beat or activity function. Do not rewrite or add page content.

Use the [prompt-pack-template.md](templates/prompt-pack-template.md) and keep prompt ids stable across retries.

### 4. Register and produce assets

Create or update `visual-asset-index.md` and `image-generation-log.md` before production so every planned page and reference has a row. Record asset and page ids, route/tool, prompt id, output path, source and character-reference paths, self-check decision, follow-up, review status, and final-use status.

For each asset, follow the shared serial image workflow exactly: make one `generate_image` or `edit_image` call, wait for the result, inspect the actual output, record the result in both artifacts, choose `passed`, `needs edit`, `rejected`, or `blocked`, then use `run_bash` to run `sleep 60` before the next image call.

For black-and-white pages:

- use `edit_image` with the approved character reference as input/reference for every page containing a recurring main character without an approved loose-continuity exception;
- generate or edit one complete A4-safe page image for one approved storyboard page or activity item. Use a multi-panel or contact-sheet layout only when the approved product format explicitly permits it;
- put required visible text into the image itself; do not defer it to layout;
- reject or fix missing, malformed, or stray text, character drift, unsafe staging, compressed multi-page scenes, dense detail, or unwanted color before handoff.

For colored references when in scope:

- start only from the matching black-and-white page that passed the illustrator self-check;
- use `edit_image` with that page as the input image;
- preserve its composition, line art, border, text, character identity, page order, and story beat or activity function while adding only the approved color fills;
- reject and retry from the corrected black-and-white source if any of those elements change.

Log every attempt, including fixes and retries. Do not reuse a failed colored reference as the source for another edit.

### 5. Self-check and prepare review

Inspect every character reference, black-and-white page, and colored reference against the shared visual quality checklist. For recurring characters, compare against the approved reference sheet and `character-reference-index.md` when references are in scope; when an approved loose-continuity exception applies, confirm it is recorded. Check page-to-page continuity, exact visible text or word-free status, absence of stray text, source pairing, and the approved one-page or multi-panel composition.

Record the result, defects, and next action in `image-generation-log.md` and `visual-asset-index.md`. Only black-and-white pages and colored references marked `passed` may be sent to review. Character references must already be approved before page generation when they are required; include them with their recorded status, or include the approved loose-continuity exception. Keep `needs edit`, `rejected`, and `blocked` page or colored-reference assets out of the reviewer package and record why they are withheld. If a required asset is blocked, route the blocker to its owner instead of presenting the package as ready.

### 6. Handoff to `child_experience_reviewer`

Send the complete cumulative handoff with `send_message_to`. State the current decision state, approval and self-check status, open risks or blockers, next expected action, and review focus in the message. Include absolute paths to all still-relevant upstream artifacts and current outputs; do not rely on hidden chat context.

Include the absolute paths to:

- `coloring-story-brief.md`;
- `source-text-index.md` when present;
- `coloring-storyboard.md`;
- `visual-style-guide.md`;
- `character-reference-index.md` and character reference images when recurring main characters are in scope and references are required by the approved storyboard; otherwise include the recorded loose-continuity exception;
- `prompt-pack.md`;
- `visual-asset-index.md`;
- `image-generation-log.md`;
- every passed black-and-white candidate image;
- every passed paired colored reference when in scope.

State that each candidate follows the approved page or item layout, recurring characters used their approved reference inputs or the approved loose-continuity exception, required text is embedded in the page image, stray unapproved text was checked, and colored references were made with `edit_image` from their paired black-and-white sources. Ask the reviewer to verify story or activity match, character consistency, exact text, absence of unapproved text, coloring usability, and colored-reference source preservation. State open risks and do not claim reviewer approval before it occurs.

## Routing and fixes

- Route story, source text, age, format, or color-direction decisions to `story_activity_designer`.
- For a reviewer character-consistency fix, use `edit_image` with the approved character reference when the page composition is otherwise correct. If no approved reference exists and no approved loose-continuity exception applies, keep the package blocked and route the missing-reference decision upstream; a temporary base recommendation is not an approval.
- Regenerate with the locked identity when the page is too far from the storyboard or cannot be repaired cleanly by editing.
- After every reviewer-requested fix, update the asset index and image log, send a cumulative fix handoff with absolute paths, status, open risks, and next expected action, and resend the package only after the repaired assets pass self-check.
