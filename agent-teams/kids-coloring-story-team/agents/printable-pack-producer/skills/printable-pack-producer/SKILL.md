---
name: printable-pack-producer
description: Assemble approved coloring story assets into print-ready black-and-white exports and separate colored reference exports, then validate the final files.
---

# Printable Pack Producer

Use this skill to assemble the final printable black-and-white coloring package and separate colored reference package from reviewed and approved assets.

## Expected Inputs

- approved `coloring-story-brief.md`
- `source-text-index.md` when present
- approved `coloring-storyboard.md`
- `visual-style-guide.md`
- `visual-asset-index.md`
- `image-generation-log.md`
- approved `child-experience-review-report.md`
- approved character reference manifest when recurring main characters are in scope
- approved black-and-white visual assets
- approved colored reference assets when in scope

## Produced Artifacts

- `printable-package-plan.md`
- black-and-white printable PDF under `exports/`
- black-and-white PNG or image exports under `exports/` when useful
- colored reference PNG/PDF or contact-sheet exports under `exports/` when in scope
- `printable-package-report.md`

Use:
- [printable-package-plan-template.md](templates/printable-package-plan-template.md)
- [printable-package-report-template.md](templates/printable-package-report-template.md)

## Required Shared Reads

- Start by reading [coloring-production-principles.md](coloring-production-principles.md).
- Use it as the shared reference for print format, approved-asset discipline, and final QA.

## Workflow

### Step 1 - Confirm the final assembly package

Confirm:

- approved brief
- approved storyboard
- approved visual manifest
- approved character reference manifest when in scope
- approved image paths
- approved colored reference manifest and paths when in scope
- A4 paper size
- orientation
- product format
- page order
- one approved image per A4 output page, unless the user explicitly requested a cut-out/contact-sheet layout
- export expectations
- colored reference export expectations

If any approved visual is missing or any required text conflicts, route the issue upstream before assembly.
If a required caption, title, verse, or label is missing from the approved page image, route the issue upstream for a corrected approved image.
If a colored reference is missing, changed from its source page, or not reviewer-approved, route it upstream before including it in the colored reference package.

### Step 2 - Write `printable-package-plan.md`

Record:

- page order
- A4 paper size
- orientation
- margins
- whether exports are full-page A4 sheets, bookmark-style full pages, half-pages, cards, booklet pages, or explicit user-requested cut-out/contact sheets
- source image path per page
- colored reference source path per page when in scope
- output paths
- known limitations

### Step 3 - Assemble exports

Create the requested printable outputs.
Default package:

- one print-ready black-and-white multi-page PDF with one approved coloring image per A4 page
- individual black-and-white PNG exports when useful
- one separate colored reference package, usually individual PNGs and optionally a colored reference PDF or contact sheet for viewing
- optional contact sheet or preview when useful, clearly marked as preview-only and not a replacement for the full-page coloring assets

Use the simplest reliable local route available, such as PDF tooling or image-to-PDF assembly through `run_bash`.
Treat approved page images as finished child-facing artwork. During layout, apply only mechanical scaling, centering, margin-safe placement, ordering, and export.
Treat colored references as finished reference-only artwork. Do not place colored references into the black-and-white print PDF.

### Step 4 - Validate the exported files

Check:

- files exist and open
- page count is correct
- page order is correct
- each story image has its own A4 output page unless an explicit user-requested exception is recorded
- paper size and orientation match the plan
- margins are not clipped
- artwork is not distorted
- text remains readable
- required text is part of the approved page images
- black-and-white line art remains clean
- no unapproved asset entered the final export
- colored reference exports exist when in scope
- colored reference exports are separate from the black-and-white printable package
- colored reference page order matches the black-and-white page order

Record results in `printable-package-report.md`.

### Step 5 - Final handoff

Send the final package to `story_activity_designer` or the user.

Include:

- absolute path to final black-and-white printable PDF
- absolute paths to PNG exports when present
- absolute paths to colored reference exports when present
- absolute path to `printable-package-plan.md`
- absolute path to `printable-package-report.md`
- absolute path to `child-experience-review-report.md`
- absolute path to the approved upstream artifacts
- open risks or print limitations

## Routing Rules

- Route content, source text, age-fit, or story issues to `story_activity_designer`.
- Route visual image quality or coloring usability defects to `child_experience_reviewer` first.
- Resolve layout-only and export-only defects directly.
