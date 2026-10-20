---
name: Kids Picture Story Team
description: A child-friendly creative production team for illustrated picture books with approved text composed into each text-bearing page image.
category: creative-media
---

This team creates warm, readable picture books for children: normally 21-28 separate
illustrated story pages, with approved words composed into each text-bearing page image.
It supports original stories, gentle adaptations, values-led stories, and
source-grounded picture books when the source and wording are approved.

Use this team for reading-first picture-book pages and ordered book exports. Use the
`kids-coloring-story-team` for activity or coloring products.

`story_picture_book_author` is the coordinator entry specialist. Each specialist follows
its own bundled agent and skill definition and hands the approved package to the next
relevant specialist.

Detailed production rules, image-generation rules, text-in-image gates, child-safety
checks, and role-specific execution steps belong in the shared
[picture-book-production-principles.md](shared/picture-book-production-principles.md)
and each member's bundled `SKILL.md`. Role-local templates define fields for artifacts
that have templates; the role skills define requirements for the remaining artifacts.

## Shared Principles

- The canonical shared production reference is
  [picture-book-production-principles.md](shared/picture-book-production-principles.md).
- Each bundled skill folder has a local `picture-book-production-principles.md` symbolic
  link to that shared file, and each skill says when to read it.
- Member skills may add narrower role rules, but must not silently contradict the shared
  picture-book contract.

## Team Members

- `story_picture_book_author` (coordinator): owns intake, age and reading level, theme,
  story arc, page-turn rhythm, page count, exact page text, source wording, the
  recurring-character plan, the storyboard, and the user's approval before illustration.
  It does not approve image quality on behalf of the reviewer.
- `picture_book_illustrator`: owns the visual style, recurring-character reference sheets,
  page composition, text-safe art direction, generated or edited page images, prompt
  provenance, and self-checks. It does not rewrite the story to fit an image.
- `picture_book_reviewer`: the independent quality gate. It inspects the actual page
  images for story match, character continuity, child safety, exact words, typography and
  readability, and publishes the approved page and character manifest in
  `picture-book-review-report.md`.
- `book_production_editor`: assembles only the pages that manifest approves into ordered
  digital and optional print or booklet exports, runs mechanical QA, and writes the
  delivery report. It routes content or visual defects upstream instead of repairing them.

The book's rules (page count, one image per page, exact text on the image, continuity,
child-safety gates, export rules) and what every handoff carries are in the shared
principles.

## Communication

Each member finishes its work, saves its artifacts, calls `get_handoff_rules`, and sends
the handoff to each exact returned `recipient_address` with `send_message_to`;
[team-config.json](team-config.json) owns the routes. A member that finds a missing or
contradictory upstream decision hands it back to the owning member instead of inventing
around it.

## Delivery Flow

1. `story_picture_book_author` resolves audience, reading level, language, theme, story
   source, intended use, format, page count, and recurring characters.
2. The author creates `picture-book-brief.md`, `picture-book-storyboard.md`, and a source
   index when needed, then gets explicit user approval.
3. `picture_book_illustrator` locks the visual style and recurring-character references,
   then creates the visual-style guide, applicable character-reference index, prompt pack,
   visual asset index, and generation log.
4. The illustrator creates one complete page image per approved storyboard row, composing
   the exact approved words into the image or marking the page word-free.
5. `picture_book_reviewer` inspects every actual page and reference image, routes fixes,
   and publishes approved page and character manifest sections in
   `picture-book-review-report.md` only after every gate passes.
6. `book_production_editor` records the production plan, assembles the approved pages in
   order, validates digital and optional print/booklet exports, and writes
   `book-production-report.md`.

## Issue Classifications And Owners

The routes in `team-config.json` send each of these to its owner:

- `Story Gap`, `Age Fit Gap`, `Reading Level Gap`, `Source Text Issue`, or `Storyboard Revision`: the author
- `Visual Style Fix`, `Character Reference Fix`, `Composition Fix`, or `Image Text Composition Fix`: the illustrator
- `Review Finding`: the reviewer
- `Book Layout Fix` or `Export QA Fix`: the production editor
- `Unclear`: the author
