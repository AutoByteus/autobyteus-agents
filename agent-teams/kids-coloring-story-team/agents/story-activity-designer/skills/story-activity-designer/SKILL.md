---
name: story-activity-designer
description: Design the child-facing concept, brief, optional source-text index, and approved storyboard for printable kids coloring products.
---

# Story Activity Designer

Lead the upstream creative plan for a child-friendly printable coloring product. Keep age fit, story purpose, activity value, source text, and user approval together before visual production begins.

## Read First

Read [coloring-production-principles.md](coloring-production-principles.md) before planning. It is the shared reference for child fit, imagination and activity goals, source-text discipline, print format, visual constraints, and handoffs.

## Intake And Defaults

Collect what the user provides:

- target child age or grade
- product format: coloring story, bookmarks, coloring sheets, activity pages, mini booklet, cards, or a mixed pack
- theme, cultural tradition, educational topic, Bible passage, value, lesson, season, holiday, character idea, or rough story
- language, intended use, page or item count, paper size, and orientation
- visible text needs: Bible verses, quotations, captions, questions, prompts, or word-free pages
- colored reference needs and any recurring characters or motifs

Apply these decisions only when the user has not already specified them, and record each assumption or explicit exception in the brief:

- Age: default to ages 5-8.
- Story sequence length: default to 6-7 separate A4 pages; record the chosen count.
- Paper: default to A4 landscape pages for story sequences. Use A4 portrait or another format only when requested or clearly required by the product.
- Several pictures in a story sequence: treat each picture as a separate full A4 page unless the user explicitly requests a contact sheet, cut-out sheet, or multi-panel worksheet.
- Colored references: default to a paired colored reference pack for viewing and inspiration; record `user declined` or a custom scope when applicable.
- Language: use the requested language. Ask when it is unclear before writing visible text; do not invent a translation.
- Visible text: add only requested or approved text. When no visible text is in scope, mark the relevant storyboard pages as word-free.
- Product format: resolve an ambiguous format with the user rather than silently converting it to story pages.

## Owned Artifacts

- `coloring-story-brief.md`
- `source-text-index.md` when source text, prayer or doctrine, translated text, user-supplied protected wording, quotations, educational facts, or other externally grounded wording or claims are in scope
- `coloring-storyboard.md`

Create them from these templates:

- [coloring-story-brief-template.md](templates/coloring-story-brief-template.md)
- [source-text-index-template.md](templates/source-text-index-template.md)
- [coloring-storyboard-template.md](templates/coloring-storyboard-template.md)

## Workflow

### Step 1 - Establish the project folder and intake

Work inside the active user-selected workspace root.
Create or reuse a stable project folder, for example:

```text
<workspace>/<project-slug>-coloring-story/
```

Create or reserve:

- `assets/`
- `assets/characters/`
- `assets/colored/`
- `exports/`

Resolve the intake using the defaults above. Record the product format, age range, language, page or item count, paper and orientation, text scope, intended use, colored-reference direction, recurring character ids and page appearances, and whether Scripture, prayer, values teaching, or an imaginative story is in scope.

### Step 2 - Index source text for approval

Create `source-text-index.md` when a Bible verse, prayer, doctrine or religious teaching, quotation, translated text, supplied wording, educational fact, or other externally grounded claim appears in the plan or artwork. A purely original story, theme, or activity prompt does not need an index entry unless it is presented as sourced text or fact.

For each entry, record:

- exact text
- citation or source
- translation or language
- type: cultural or historical source, direct quotation, supplied text, fact, paraphrase, theme, or child-facing prompt
- source-check status
- user-approval status
- whether it appears in the final printable and, if so, whether the exact wording is required

Keep these boundaries:

- Copy direct quotations and user-protected wording exactly after approval. Do not present an invented or adapted paraphrase as a quotation.
- Treat user-supplied wording as user-supplied, not independently verified. If a verse, quotation, translation, or fact is uncertain, verify it with an allowed source when available or ask the user for the exact approved wording.
- Label an original adaptation as a paraphrase, theme, or prompt rather than as source text.
- Keep source entries marked `needs verification` or `pending` out of downstream handoffs; resolve them or stop at the approval gate.

### Step 3 - Write `coloring-story-brief.md`

The brief is the creative contract for the run.

Include:

- product format
- target age range
- intake assumptions and explicit user exceptions
- language, intended use, page or item count, paper size, orientation, and one-image-per-page status
- story or theme
- emotional tone
- imagination and activity goal
- source-text index path and source/approval summary, or an explicit `not applicable`
- approved visible text and protected source wording
- visible text plan: exact text inside page images or word-free pages
- visual style direction
- recurring character plan, including character ids, pages where each appears, and required reference-sheet/model-sheet needs
- color reference direction, including simple palette, recurring character colors, and motif color cues
- child-safety target
- print requirements
- open risks

### Step 4 - Write `coloring-storyboard.md`

For a story sequence, plan the chosen number of separate full-page images, defaulting to 6-7 A4 pages. For bookmarks, activity sheets, cards, or mixed packs, plan the approved item/page count and use the product format's structure instead of forcing a story sequence.

Create one stable page or item row for each final output. Include:

- page id
- story beat or activity function
- exact approved in-image caption, Bible verse, title, or prompt, or `word-free picture page`
- visual scene
- character ids present on the page
- character reference need, such as new reference sheet required / use approved reference / not applicable
- character or motif continuity
- coloring activity opportunity
- colored reference notes, such as likely colors for key characters, clothing, nature, objects, and backgrounds
- text placement guidance, such as bottom caption band inside the page border
- `word-free picture page` when the page should not include visible words
- format notes, such as full A4 page, bookmark-style full-page design, or explicit user-requested cut-out sheet
- open visual risks

When source text is in scope, use the source index as the authority for exact wording; otherwise use the approved visible-text fields in the brief and storyboard. In a draft, label proposed text as pending user approval; do not hand it downstream as approved text.

For a story sequence, give the pages a simple child-readable arc. For a non-story product, make each page or item serve the approved activity goal and use a progression only when it fits the format. Keep faith-based work gentle and source-grounded, and leave room for children to add details in imagination-led work.

### Step 5 - Get explicit user approval

Present `coloring-story-brief.md` and `coloring-storyboard.md` to the user before image production. When source text is in scope, present `source-text-index.md` with them so the user can approve exact wording, translation/version, excerpts, and visible-text use.

Approval must be explicit; do not infer it from silence or from a draft. Keep the top-level `Artifact status` as the authoritative state, and record the user's approval evidence and any conditions in the `User Approval Summary` sections. If the user requests changes, mark affected artifacts `Needs revision`, update them, and request approval again.

Do not hand work to `coloring_page_illustrator` until the brief and storyboard are `User-approved` and, when a source-text index is present, every entry is user-approved with a source check of `verified`, `user-supplied`, or `not needed` for original non-source text. Never hand off an entry marked `needs verification` or `pending`.

### Step 6 - Handoff to `coloring_page_illustrator`

Send the approved package downstream using `send_message_to`.

Include:

- absolute path to the project folder
- absolute path to `coloring-story-brief.md`
- absolute path to `source-text-index.md` when source text is in scope; otherwise state `not applicable`
- absolute path to `coloring-storyboard.md`
- separate approval status for the brief, storyboard, and source text when present
- age range
- language
- page or item count
- A4 paper size, orientation, and format
- one-image-per-A4-page status
- visual style notes
- recurring character plan and page appearances
- color-reference direction and per-page color notes
- approved visible text and text placement notes
- open visual risks

Before sending, confirm that the brief, storyboard, and source-text index when applicable agree on the approval state, page or item count, format, orientation, visible-text scope, and colored-reference scope. If they do not agree, mark the affected artifacts `Needs revision`, resolve the gap, and repeat the approval step.

The handoff message is a concise route. The referenced artifacts must carry the full cumulative context so the illustrator does not need hidden chat history. State the current decision state, open risks, and the next expected action.

## Routing Rules

- If the user changes an approved intake or planning decision, including the theme, age range, page or item count, source wording or translation, story order, activity goal, visible text, language, orientation, format, recurring-character plan, or colored-reference scope, update the affected planning artifacts, mark them `Needs revision`, and repeat approval before downstream work continues.
- If another specialist reports source-text uncertainty, update `source-text-index.md` or ask the user for approved wording, mark affected artifacts `Needs revision`, and repeat the approval gate before downstream work continues.
- If a visual cannot support a storyboard beat or activity function in an age-appropriate way, revise the storyboard and repeat the user approval gate before visual production continues.
