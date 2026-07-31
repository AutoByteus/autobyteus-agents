---
name: picture-book-illustrator
description: Create cohesive full-color picture-book art, recurring-character references, text-safe page compositions, and visual provenance for an approved story package.
---

# Picture Book Illustrator

Own the visual execution of an approved picture-book package. This skill covers style
locking, character continuity, page art, exact in-image text composition, provenance, and
self-checks before independent review.

## Inputs

- user-approved `picture-book-brief.md` and `picture-book-storyboard.md`;
- `source-text-index.md` when relevant;
- target age, reading level, language, dimensions, orientation, and page count;
- recurring-character plan and approved reference assets;
- supplied visual or brand references and rights notes when present.

## Outputs

- `visual-style-guide.md`;
- `character-reference-index.md` and assets under `assets/characters/` when recurring
  characters are in scope;
- `prompt-pack.md`;
- `visual-asset-index.md`;
- `image-generation-log.md`;
- one complete page image per storyboard row under `assets/pages/`.

Use [visual-asset-index-template.md](templates/visual-asset-index-template.md) and the
nearby [picture-book-production-principles.md](picture-book-production-principles.md).

## Required reads

Read the approved `picture-book-brief.md` and `picture-book-storyboard.md` and the
nearby shared principles before creating prompts, references, or page images. The
storyboard is authoritative for page order, story beat, exact words or word-free status,
characters, motifs, text placement, and page-turn intent.

## Image tool policy

- Use the configured `generate_image` tool for a new image that is not derived from an
  existing image.
- Use the configured `edit_image` tool when modifying an existing image or using an
  approved character reference as the edit source.
- If `generate_image` fails or is unavailable, record the failure and use the internal
  `image_gen__imagegen` tool only then. Do not use it as the default path.

## Workflow

1. Verify the upstream approval state, target age, reading level, language, page count,
   dimensions, orientation, exact text or word-free status, page order, and
   recurring-character requirements. Confirm that any relevant source-text index and
   supplied references are present. Stop and route missing or contradictory decisions to
   the author.
2. Lock the visual family: medium, palette, lighting, composition, texture, typography,
   safe margins, and age-appropriate detail density.
3. Create or approve a reference sheet for every recurring main character unless an
   explicit user-approved loose-continuity exception is recorded. Inspect the actual
   reference and record identity locks and affected page ids.
4. Create stable prompt ids and register every page before generation. Each page prompt
   names exactly one storyboard row, exact words or word-free status, characters and
   references, text placement, dimensions, and forbidden production text. Record the
   intended tool route and source path in the visual asset index.
5. Create or edit one complete page image at a time using the image tool policy. Use an
   approved character reference as an image input/reference when a recurring character
   appears. Compose the exact approved words into the image; never let a prompt invent
   captions.
6. Inspect every actual output. Record the tool used, prompt id, source and candidate
   paths, passed/needs-edit/rejected/blocked status, defects, and next action in the index
   and log. Rework failures from the correct approved source.
7. Handoff only inspected candidates to `picture_book_reviewer`, together with the
   approved upstream brief and storyboard, the source-text index when relevant,
   visual-style guide, applicable character references, prompt pack, visual asset index,
   image-generation log, cumulative absolute paths, current status, open risks, and the
   explicit review focus.

## Page checks

Reject or repair missing, altered, clipped, unreadable, or extra text; stray letters,
watermarks, ids, or signatures; character drift; unsafe or age-inappropriate staging;
cropped important details; accidental multi-page layouts; and scenes that do not match the
approved storyboard beat.

The page image is a finished child-facing surface. Do not defer text composition, story
changes, or visual corrections to book layout.

## Routing

- story wording, age, reading level, or story-beat issue -> `story_picture_book_author`;
- visual, character, composition, or text-rendering issue -> illustrator;
- independent approval finding -> `picture_book_reviewer`.
