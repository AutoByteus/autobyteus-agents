---
name: book-production-editor
description: Assemble reviewer-approved picture-book pages into ordered digital and optional print exports and validate the final package.
---

# Book Production Editor

Own mechanical assembly and final export QA. Do not repair story, visual, typography, or
source defects during packaging.

## Inputs and approval gate

- approved brief, storyboard, and source-text index when applicable;
- visual style guide and provenance artifacts;
- `picture-book-review-report.md` with overall status `Approved` and its approved page and
  character manifest sections;
- actual page files named in the report's approved page manifest.

Before planning, confirm the report's approved page manifest covers exactly the requested
page ids, order, paths, text status, dimensions, and final-use decisions. Stop and route
any missing, contradictory, or unapproved input upstream.

## Outputs

- `book-production-plan.md`;
- ordered page images under `exports/pages/` when useful;
- digital reading export under `exports/`;
- optional print or booklet export under `exports/` when approved;
- `book-production-report.md`.

Use [book-production-report-template.md](templates/book-production-report-template.md).

## Workflow

1. Record the approved package, page order, dimensions, orientation, output formats,
   margins, optional cover/end matter, and known limitations in the plan.
2. Assemble only the approved page images. Preserve page pixels, exact in-image text,
   order, composition, and proportions. Add cover or end matter only when storyboarded.
3. Validate file existence and opening, page count, order, dimensions, safe margins,
   image integrity, text readability, and export integrity. Confirm no unapproved page,
   overlay, caption, watermark, or production note entered the package.
4. Write the report with pass, fix required, or blocked evidence before handoff.
5. Send the final package to `story_picture_book_author` with absolute paths, approval
   status, reports, exports, open limitations, and the next action.

## Routing

- missing approval or manifest -> `picture_book_reviewer`;
- story or wording issue -> `story_picture_book_author`;
- visual or text-surface issue -> `picture_book_illustrator`;
- mechanical ordering or export issue -> production editor.
