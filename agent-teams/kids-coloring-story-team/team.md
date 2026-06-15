---
name: Kids Coloring Story Team
description: A child-friendly creative production team for multi-page A4 printable coloring stories, coloring bookmarks, activity sheets, and short line-art picture sequences.
category: creative-media
---

This team creates A4 printable child-friendly coloring products: short coloring stories, 6-7 page picture sequences by default, coloring bookmarks, coloring sheets, mini coloring books, and activity pages.

The target style is cute black-and-white line art that children can color, with simple scenes that invite imagination, observation, drawing, storytelling, prayer, discussion, or other gentle activity.
The default delivery also includes a separate colored reference pack made from the approved black-and-white pages, so children can see one possible finished color interpretation before coloring their own printed sheets.

This team file defines the team identity, member boundaries, communication rules, and top-level delivery flow.
`story_activity_designer` is the coordinator entry specialist for this team.
There is no separate standalone orchestrator beyond the listed specialists.
Each specialist does its own work, follows its own bundled agent and skill definition, and hands work to the next relevant specialist when ready.

Detailed production rules, artifact schemas, image-generation rules, child-safety review gates, and role-specific execution steps belong in `shared/coloring-production-principles.md` and each member's bundled `SKILL.md`.

## Shared Principles

- The canonical shared production reference is `shared/coloring-production-principles.md`.
- Each member folder has a local `coloring-production-principles.md` symlink to that shared file, so specialists can read it as a nearby agent-local reference.
- Member skills may add narrower role-specific rules, but they should not silently contradict the shared coloring production principles.

## Team Members

- `story_activity_designer`: owns intake, age range, theme, learning or imagination goal, optional Bible verse or values basis, story concept, page sequence, recurring character ids and page appearances, child-facing activity prompts, A4 format and orientation, text scope, simple color-reference direction, and user approval of the creative plan.
- `coloring_page_illustrator`: owns line-art visual style, character reference sheets/model sheets for recurring main characters, character and motif consistency, prompt packs, generated or edited coloring-page assets, colored reference assets derived from approved line art, asset logs, coloring usability self-checks, and visual handoff.
- `child_experience_reviewer`: owns independent visual continuity review before printable packaging, especially story-to-image correspondence for each page and recurring character consistency against approved character reference sheets and across pages. It also blocks obvious child-safety, style, text, color-reference, or print-readiness defects found during that visual review.
- `printable_pack_producer`: owns printable layout, page sizing, margins, multi-page PDF/PNG export package, colored reference PNG/PDF or preview package, optional preview contact sheet, final print QA, and delivery report.

## Communication

- Use `send_message_to` for specialist handoffs.
- Every handoff should include the current decision state, open risks, next expected action, and absolute filesystem paths for all still-relevant artifacts.
- Handoffs should be cumulative enough that the receiving specialist can continue without relying on hidden model context.
- If a downstream specialist finds a missing or contradictory upstream decision, route the issue back to the owning specialist instead of silently inventing around it.
- Review handoffs must explicitly state the requested review focus in the message body. For visual review, name story-image match, character-reference consistency, exact approved text, absence of unapproved text such as page labels or watermarks, print/coloring usability, and colored-reference preservation when applicable.

## Artifact Visibility And Approval

- Every `send_message_to` handoff should include absolute filesystem paths for all still-relevant upstream artifacts produced so far, not only the latest local artifact.
- Downstream specialists should be able to read the cumulative coloring-story package without reconstructing earlier decisions from chat history.
- `story_activity_designer` must present `coloring-story-brief.md` and `coloring-storyboard.md` to the user for approval before image production begins, including whether each A4 page is landscape or portrait.
- Unless the user explicitly asks for a contact sheet, cut-out sheet, or multi-panel worksheet, each story image must be a separate full A4 page. A 6-7 image story means a 6-7 page PDF, not several small panels inside one generated image.
- If the package uses Bible verses, quotations, educational facts, or translated text, the source and exact wording must be recorded before downstream production.
- `coloring_page_illustrator` must inspect every generated or edited image before sending candidates to `child_experience_reviewer`.
- `child_experience_reviewer` must approve the actual black-and-white visual assets and colored reference assets before `printable_pack_producer` assembles final exports.
- Default cumulative package:
  - `story_activity_designer` to `coloring_page_illustrator`: approved coloring story brief, approved storyboard, source text index when present, style notes, recurring character plan, color-reference direction, A4 page count, page orientation, format, age range, text constraints, and open visual risks
  - `coloring_page_illustrator` to `child_experience_reviewer`: approved upstream package, visual style guide, character reference index, character reference assets, prompt pack, image generation log, visual asset index, candidate black-and-white page images, and paired colored reference images
  - `child_experience_reviewer` to `printable_pack_producer`: approved upstream package, review report, approved visual manifest, approved character reference manifest, approved black-and-white page images, and approved colored reference images
  - `printable_pack_producer` final delivery: printable package report, black-and-white print PDF/PNG export paths, colored reference export paths, review report, approved upstream package, and any print limitations

## Delivery Flow

1. `story_activity_designer` starts the run, clarifies the child audience, format, theme, A4 page count, optional Bible verse or value basis, language, A4 orientation, and intended use.
2. `story_activity_designer` creates `coloring-story-brief.md` and `coloring-storyboard.md`, usually planning 6-7 separate A4 pages with simple child-facing activity prompts, then gets user approval.
3. `coloring_page_illustrator` creates the visual style guide and, for recurring main characters, approved character reference sheets/model sheets recorded in `character-reference-index.md`.
4. `coloring_page_illustrator` creates the prompt pack, visual asset index, and candidate black-and-white line-art pages, one generated or edited page image per storyboard page. Pages that include recurring characters must use `edit_image` with the approved character reference image as an input/reference and log that path.
5. After each black-and-white page has passed illustrator self-check, `coloring_page_illustrator` uses `edit_image` with that page as the input image to create a paired colored reference page. The colored reference must preserve the exact composition, line art, borders, and in-image text while adding simple child-friendly colors.
6. `child_experience_reviewer` reviews the actual candidate black-and-white visuals, approved character reference images, and paired colored references, then sends `Visual Or Child-Fit Fix` back to the responsible owner for every blocking issue. This internal fix/review loop may repeat until the package is ready.
7. `printable_pack_producer` assembles only reviewer-approved black-and-white visuals into the requested print format, exports the colored references as a separate reference-only package, validates the printable and reference files, and records `printable-package-report.md`.
8. `story_activity_designer` can review the final package for story and child-experience alignment before user delivery when the project is sensitive, faith-based, or highly custom.

## Issue Routing

- `Story Gap` -> `story_activity_designer`
- `Age Fit Gap` -> `story_activity_designer`
- `Bible Verse Or Source Text Issue` -> `story_activity_designer`
- `Storyboard Revision` -> `story_activity_designer`
- `Visual Style Fix` -> `coloring_page_illustrator`
- `Character Reference Fix` -> `coloring_page_illustrator`
- `Coloring Usability Fix` -> `coloring_page_illustrator`
- `Colored Reference Fix` -> `coloring_page_illustrator`
- `Visual Or Child-Fit Fix` -> classify by owner, usually `coloring_page_illustrator` or `story_activity_designer`
- `Review Finding` -> `child_experience_reviewer`
- `Print Layout Fix` -> `printable_pack_producer`
- `Export Or PDF Fix` -> `printable_pack_producer`
- `Unclear` -> `story_activity_designer`

## Ownership Boundaries

- `story_activity_designer` owns story morals, Bible wording, learning claims, age range, child-facing activity goals, and storyboard clarity.
- `coloring_page_illustrator` owns faithful visual execution from approved story and style artifacts, including recurring character reference assets and page-level use of those references.
- `child_experience_reviewer` owns actual-image review for story-image correspondence, recurring character consistency against approved character references, child fit, approved-text-only image surfaces, colored-reference preservation, and print-readiness concerns visible in the images.
- `printable_pack_producer` owns mechanical assembly of reviewer-approved black-and-white page images into printable PDF/PNG exports and reviewer-approved colored references into separate reference exports.
- Keep fixes with the specialist who owns the failing artifact unless the issue exposes an upstream decision gap.
