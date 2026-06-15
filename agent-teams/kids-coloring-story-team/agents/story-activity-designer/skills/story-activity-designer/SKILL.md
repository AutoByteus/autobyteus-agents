---
name: story-activity-designer
description: Design the child-facing concept, brief, source text index, and approved storyboard for printable coloring stories.
---

# Story Activity Designer

Use this skill to lead the upstream creative plan for a child-friendly printable coloring product.
This role exists to keep age fit, story purpose, activity value, source text, and user approval together before visual production begins.

## Expected Inputs

- target child age or grade, when known
- desired format: coloring pages, bookmarks, mini coloring book, activity sheet, story pages, or cards
- theme, Bible passage, value, lesson, season, holiday, character idea, or rough story
- desired language
- page count, commonly 6-7 separate A4 pages
- paper size and orientation, defaulting to separate A4 landscape pages when not otherwise specified
- text amount and whether Bible verses, captions, questions, or prompts are wanted
- color-reference needs, defaulting to a paired colored reference pack for viewing and inspiration

## Produced Artifacts

- `coloring-story-brief.md`
- `source-text-index.md` when verses, quotations, facts, translations, or supplied text are used
- `coloring-storyboard.md`

Use:
- [coloring-story-brief-template.md](templates/coloring-story-brief-template.md)
- [source-text-index-template.md](templates/source-text-index-template.md)
- [coloring-storyboard-template.md](templates/coloring-storyboard-template.md)

## Required Shared Reads

- Start by reading [coloring-production-principles.md](coloring-production-principles.md).
- Use it as the shared reference for child fit, imagination/activity goals, source text discipline, print format, and handoffs.

## Workflow

### Step 1 - Establish the project folder

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
- the planning, review, and delivery artifacts named in the shared principles

### Step 2 - Clarify the product format

Identify:

- product type: coloring story, coloring bookmarks, coloring sheets, activity pages, mini booklet, or mixed pack
- target age range
- language
- A4 page count
- A4 paper size and orientation
- text density
- colored reference direction: default paired colored reference pack / user declined / explicit custom requirement
- recurring character reference needs: recurring character ids, page appearances, and whether model sheets are required
- whether Scripture, prayer, value teaching, or purely imaginative story is in scope
- intended use: home, Sunday school, classroom, church handout, gift, Etsy-style printable, or personal activity

If age is missing, default to ages 5-8 and record that assumption.
If paper size or orientation is missing, default to separate A4 landscape pages and record that assumption.
If the user asks for several pictures or a short picture sequence, treat each picture as its own A4 page unless the user explicitly requests multiple small panels on one sheet.
If the user is unsure of the professional term, choose the closest product term and explain it in the brief.

### Step 3 - Build source text discipline

When Bible verses, quotations, facts, or translated text are used, create `source-text-index.md`.

Record:

- exact text
- citation or source
- translation or language
- whether it is direct quotation, paraphrase, theme, or child-facing prompt
- approval status
- any text that must appear exactly in the final printable

Do not invent Bible verse wording.
If wording is uncertain and tools are available, verify it from an allowed source or ask the user for the exact text.

### Step 4 - Write `coloring-story-brief.md`

The brief is the creative contract for the run.

Include:

- product format
- target age range
- story or theme
- emotional tone
- imagination and activity goal
- A4 page count and output format
- approved visible text and protected source wording
- source text summary
- visual style direction
- recurring character plan, including character ids, pages where each appears, and required reference-sheet/model-sheet needs
- color reference direction, including simple palette, recurring character colors, and motif color cues
- child-safety target
- print requirements
- open risks

### Step 5 - Write `coloring-storyboard.md`

Plan a small sequence, usually 6-7 separate A4 page images.

For each A4 page, include:

- page id
- story beat
- exact in-image caption, Bible verse, title, or prompt, if any
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

The story should have a simple child-readable arc.
For faith-based work, keep the message gentle and source-grounded.
For imagination-led work, leave room for the child to add details.

### Step 6 - Get user approval

Present `coloring-story-brief.md` and `coloring-storyboard.md` to the user before image production.
If the user gives feedback, update the affected artifacts and request approval again.
Do not hand work to `coloring_page_illustrator` until the brief and storyboard are approved.

### Step 7 - Handoff to `coloring_page_illustrator`

Send the approved package downstream using `send_message_to`.

Include:

- absolute path to `coloring-story-brief.md`
- absolute path to `source-text-index.md` when present
- absolute path to `coloring-storyboard.md`
- approval status
- age range
- language
- page count
- A4 paper size, orientation, and format
- one-image-per-A4-page status
- visual style notes
- recurring character plan and page appearances
- color-reference direction and per-page color notes
- approved visible text and text placement notes
- open visual risks

## Routing Rules

- If the user changes the theme, age range, page count, Bible text, story order, activity goal, or format, update the owned planning artifacts before downstream work continues.
- If another specialist reports source text uncertainty, revise `source-text-index.md` or ask the user for approved wording.
- If a visual cannot support a storyboard beat in an age-appropriate way, revise the storyboard before visual production continues.
