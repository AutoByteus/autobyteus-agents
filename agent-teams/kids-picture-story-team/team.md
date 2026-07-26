---
name: Kids Picture Story Team
description: A child-friendly creative production team for illustrated picture books with story text composed directly into each page image.
category: creative-media
---

This team creates warm, readable picture books for children: normally more than 20
separate illustrated story pages, with the approved words designed into the artwork
itself. It supports original stories, gentle adaptations, values-led stories, and
source-grounded picture books when the source and wording are approved.

The team is a sibling to `kids-coloring-story-team`, not a replacement for it. Its
deliverables are reading-first picture-book pages and ordered book exports rather than
activity or coloring products.

`story_picture_book_author` is the coordinator entry specialist. There is no separate
standalone orchestrator beyond the listed specialists. Each specialist follows its own
bundled agent and skill definition and hands the approved package to the next relevant
specialist.

Detailed production rules, artifact schemas, image-generation rules, text-in-image gates,
child-safety checks, and role-specific execution steps belong in
`shared/picture-book-production-principles.md` and each member's bundled `SKILL.md`.

## Shared Principles

- The canonical shared production reference is `shared/picture-book-production-principles.md`.
- Each member folder has a local `picture-book-production-principles.md` symlink to that
  shared file.
- Member skills may add narrower role rules, but must not silently contradict the shared
  picture-book contract.

## Team Members

- `story_picture_book_author`: owns intake, age and reading level, theme, story arc,
  page-turn rhythm, page count, exact page text, source wording, recurring-character
  plan, storyboard, and user approval before illustration.
- `picture_book_illustrator`: owns full-color visual style, recurring-character reference
  sheets, page composition, in-image text-safe art direction, generated or edited page
  assets, prompt provenance, and illustrator self-checks.
- `picture_book_reviewer`: independently reviews actual page images for story-image match,
  character continuity, child safety, text fidelity, typography, readability, and
  approval-manifest readiness.
- `book_production_editor`: assembles only reviewer-approved pages into ordered digital
  and optional print/booklet exports, runs mechanical QA, and writes the delivery report.

## Communication

- Use `send_message_to` for specialist handoffs.
- Every handoff includes the current decision state, open risks, next expected action, and
  absolute paths for all still-relevant artifacts.
- Handoffs are cumulative enough that the receiving specialist can continue without hidden
  model context.
- If a downstream specialist finds a missing or contradictory upstream decision, route it
  back to the owning specialist instead of inventing around it.
- Review requests name the exact focus: story-image match, recurring-character continuity,
  exact approved words, in-image text readability, absence of stray text, child safety,
  and export readiness.

## Artifact Visibility And Approval

- `story_picture_book_author` must present `picture-book-brief.md` and
  `picture-book-storyboard.md` for user approval before illustration. Include
  `source-text-index.md` when sourced or protected wording is in scope.
- The normal story target is 21-28 illustrated pages. The approved brief may choose a
  shorter or longer count when it records the story or audience rationale.
- Each story page is one complete image in the approved book format. Text is part of the
  image surface; layout must not silently add, rewrite, or relocate it.
- The illustrator inspects every generated or edited page before reviewer handoff.
- The reviewer must inspect actual page images and approve the page and character manifests
  before production.
- The production editor packages only manifest-approved pages and does not repair story,
  illustration, or wording defects during export.

## Delivery Flow

1. `story_picture_book_author` resolves audience, reading level, language, theme, story
   source, intended use, format, page count, and recurring characters.
2. The author creates `picture-book-brief.md`, `picture-book-storyboard.md`, and a source
   index when needed, then gets explicit user approval.
3. `picture_book_illustrator` locks the visual style and recurring-character references,
   then creates a prompt pack, visual asset index, and generation log.
4. The illustrator creates one complete page image per approved storyboard row, composing
   the exact approved words into the image or marking the page word-free.
5. `picture_book_reviewer` inspects every actual page and reference image, routes fixes,
   and publishes approved page and character manifests only after every gate passes.
6. `book_production_editor` assembles the approved pages in order, validates digital and
   optional print/booklet exports, and writes `book-production-report.md`.

## Issue Routing

- `Story Gap`, `Age Fit Gap`, `Reading Level Gap`, `Source Text Issue`, or `Storyboard Revision` -> `story_picture_book_author`
- `Visual Style Fix`, `Character Reference Fix`, `Composition Fix`, or `Image Text Composition Fix` -> `picture_book_illustrator`
- `Review Finding` -> `picture_book_reviewer`
- `Book Layout Fix` or `Export QA Fix` -> `book_production_editor`
- `Unclear` -> `story_picture_book_author`

## Ownership Boundaries

- The author owns story meaning, age fit, source wording, page order, exact text, and
  approval. The author does not approve image quality on behalf of the reviewer.
- The illustrator owns visual execution and text-safe composition from approved story
  decisions. The illustrator does not rewrite the story to fit a generated image.
- The reviewer owns the independent quality gate and manifests. A prompt, filename, or
  generation log cannot substitute for actual image inspection.
- The production editor owns mechanical ordering, sizing, export, and QA only. It must
  route content or visual defects upstream.
