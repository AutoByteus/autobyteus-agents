---
name: printable-pack-producer
description: Assemble reviewer-approved coloring story assets into the requested printable black-and-white exports and separate colored reference exports, then validate and hand off the final files.
---

# Printable Pack Producer

Use this skill to assemble the final printable black-and-white coloring package and separate colored reference package from reviewer-approved assets. The producer owns mechanical assembly, export QA, and the final handoff; upstream specialists own story, source text, and visual corrections.

## Inputs And Approval Gate

- approved `coloring-story-brief.md`
- `source-text-index.md` when source text or source-grounded visible wording is in scope
- approved `coloring-storyboard.md`
- `visual-style-guide.md`
- `visual-asset-index.md`
- `image-generation-log.md`
- `child-experience-review-report.md` with overall status `Approved`
- approved character reference manifest when recurring main characters are in scope
- approved visual manifest inside the review report and black-and-white assets marked for final use
- approved colored reference manifest inside the review report and paired colored assets when the colored package is in scope

Use the approved manifests inside the review report as the source of truth for which assets enter each export. Before writing the plan, verify that:

- every black-and-white source path appears in the approved visual manifest and is marked for final-package use;
- every colored source path appears in the approved colored reference manifest, is paired to the expected black-and-white asset, and is marked for colored-package use when in scope;
- the selected assets have no fix-required, rejected, or blocked decision; and
- the approved brief and storyboard define the page or item count, order, visible text, orientation, product format, and colored-reference scope, and the review report's overall and page-level decisions cover that same package; the manifests cover exactly the approved page or item ids, paths, and pairings.

If any check fails, stop before assembly and route the gap upstream. Do not substitute an unlisted asset, infer approval from a file name or log, rewrite source text, add packaging text, or repair visual content in layout.

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

### Step 1 - Confirm the approved assembly package

Confirm:

- the approval gate above
- A4 paper size
- orientation
- product format
- page order
- layout density: default to one approved story image per full A4 page; use another density only when the approved product format explicitly defines it
- export expectations
- colored-reference scope and export expectations; include the separate colored package unless the approved plan records `not in scope` or a specific alternate scope

If an approved source is missing, its required text conflicts with the approved source, or a colored reference is missing, changed from its paired page, or not reviewer-approved, stop before assembly and route the issue upstream. Required captions, titles, verses, and labels must already be present in the approved page image; request a corrected approved image instead of adding them during packaging.

### Step 2 - Write `printable-package-plan.md`

Record:

- child-experience review report path and approval status;
- approved visual and colored-reference manifest locations;
- page order
- A4 paper size
- orientation
- margins
- whether exports are full-page A4 sheets, bookmark-style full pages, half-pages, cards, booklet pages, or an explicit user-requested cut-out/contact sheet
- source image path per page
- colored reference source path per page when in scope
- output paths
- cumulative approved upstream artifact paths needed for handoff
- known limitations

Record absolute filesystem paths for the review report, manifests, every source asset, and every planned output.

### Step 3 - Assemble exports

Create the requested printable outputs.
Default package:

- one print-ready black-and-white multi-page PDF using the approved layout density, normally one approved coloring image per full A4 page
- individual black-and-white PNG exports when useful
- one separate colored reference package, usually individual PNGs and optionally a colored reference PDF or contact sheet for viewing
- optional contact sheet or preview when useful, clearly marked as preview-only and not a replacement for the printable assets

Use the simplest reliable local route available, such as PDF tooling or image-to-PDF assembly through `run_bash`.
Treat approved black-and-white page images as finished child-facing artwork. During layout, apply only the mechanical operations required by the approved plan: scaling, centering, margin-safe placement, ordering, and export. Treat colored references as finished reference-only artwork, export them separately, and preserve their pairing with the black-and-white source.
If the requested layout requires changing a page's story, source text, line art, color state, or visible objects, stop and route the issue upstream.

### Step 4 - Validate the exported files

Validate the exported files themselves and record the evidence in `printable-package-report.md`. Check:

- files exist and open
- review report status is `Approved`
- every printable source path is approved and marked for final-package use
- every colored source path is approved, paired, and marked for colored-package use when in scope
- page or item count matches the approved plan
- page order is correct
- each story image follows the approved layout density; a contact sheet is preview-only unless explicitly requested
- paper size and orientation match the plan
- margins are not clipped
- artwork is not distorted
- text remains readable
- required text remains part of the approved page images; no packaging overlay or rewritten source text was added
- black-and-white line art remains clean
- printable outputs contain only the approved black-and-white assets
- colored reference exports exist when in scope
- colored reference outputs contain only the approved colored references and remain separate from printable outputs
- colored reference order matches the printable order for all included pages, unless the approved plan records an explicit smaller subset or custom format
- colored references preserve the approved page text, border, line art, character identity, story beat or activity function, composition, and pairing after export

If any check fails, set the report to `Fix required` or `Blocked`, route the issue to its owner, and do not mark the package `Passed` or hand it off as final. After a correction, repeat the failed check before changing the report status.

### Step 5 - Final handoff

Write the completed report before sending the package. For a team handoff, use `send_message_to` to `story_activity_designer`; for direct delivery, include the same report and paths in the user-facing response.

The handoff message must state the approval status, open risks, and next expected action, and mention the absolute path to the report. Attach the report and the cumulative artifact paths needed to continue; do not rely on hidden chat context.

Include:

- absolute path to final black-and-white printable PDF
- absolute paths to black-and-white PNG exports when present
- absolute paths to colored reference exports when present, or the approved not-in-scope decision
- absolute path to `printable-package-plan.md`
- absolute path to `printable-package-report.md`
- absolute path to `child-experience-review-report.md`
- absolute paths to the cumulative approved upstream package: the brief, source-text index when in scope, storyboard, visual-style guide, character-reference index and reference assets when in scope, prompt pack, visual-asset index, image-generation log, and reviewer-approved source assets listed in the manifests
- open risks or print limitations

## Routing Rules

- Route content, source text, age-fit, or story issues to `story_activity_designer`.
- Route visual image quality, text-surface, coloring-usability, or colored-reference defects to `child_experience_reviewer` first; that reviewer routes the correction to `coloring_page_illustrator` when appropriate.
- Resolve layout-only and export-only defects directly.
- Route missing approval, contradictory manifests, or unclear product-format decisions upstream before assembly.
