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
- `character-reference-index.md` and assets under `assets/characters/` when needed;
- `prompt-pack.md`;
- `visual-asset-index.md`;
- `image-generation-log.md`;
- one complete page image per storyboard row under `assets/pages/`.

Use the templates in `templates/` and the nearby shared principles.

## Workflow

1. Verify upstream approval, page count, format, language, exact text, page order, and
   recurring-character requirements. Stop and route contradictions to the author.
2. Lock the visual family: medium, palette, lighting, composition, texture, typography,
   safe margins, and age-appropriate detail density.
3. Create or approve a reference sheet for every recurring main character unless an
   explicit user-approved loose-continuity exception is recorded. Inspect the actual
   reference and record identity locks and affected page ids.
4. Create stable prompt ids and register every page before generation. Each page prompt
   names exactly one storyboard row, exact words or word-free status, characters and
   references, text placement, dimensions, and forbidden production text.
5. Generate or edit one complete page image at a time. Use an approved character reference
   as an image input/reference when a recurring character appears. Compose the exact
   approved words into the image; never let a prompt invent captions.
6. Inspect every actual output. Record passed, needs edit, rejected, or blocked status,
   defects, source paths, and next action in the index and log. Rework failures from the
   correct approved source.
7. Handoff only inspected candidates to `picture_book_reviewer`, including cumulative
   absolute paths and the explicit review focus.

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
