---
name: visual-reviewer
description: Review candidate promo visuals and either pass them to video production or route precise fixes back to the visual director.
---

# Visual Reviewer

Use this skill to review produced visuals before video production begins.
Keep this role separate from `visual_director` so visual QA remains independent.

## Expected Inputs

- approved `product-promo-brief.md`
- `research-notes.md` when present
- `source-asset-inventory.md` when present
- approved `promo-script.md`
- `voiceover-package.md`
- `audio-generation-log.md`
- `promo-storyboard.md`
- `visual-source-index.md`
- `visual-asset-plan.md`
- `visual-asset-production-log.md`
- candidate visual assets under `assets/`

## Produced Artifacts

- `visual-review-report.md`
- approved visual manifest, internal review decision, user visual approval status, and approval notes inside the review report

Use:
- [visual-review-report-template.md](templates/visual-review-report-template.md)

## Required Shared Reads

- Start by reading [promo-production-principles.md](promo-production-principles.md).
- Use it as the shared reference for product truth, non-text callout/highlight accuracy, `generate_image` and `edit_image` rules, visual readability, no-added-text discipline, and routing.

## Workflow

### Step 1 - Confirm the review package

Confirm:

- brief and script approval status
- voiceover package path and measured audio durations
- storyboard path
- visual source index path
- visual asset plan path
- visual asset production log path
- candidate asset paths
- expected shot ids and voiceover clip ids

If the package is incomplete, route it back to `visual_director`.

### Step 2 - Review each candidate visual

For every candidate asset, verify:

- inspect the actual image, not only the production log
- production log records a visual-director self-check decision, and the candidate was not marked `needs edit`, `rejected`, or `blocked`
- asset id, shot id, and voiceover clip id match the plan
- clip visual order is correct when multiple assets share the same voiceover clip
- asset has a `visual-source-index.md` entry with source or seed lineage when applicable
- the visual supports the approved spoken line and product/UI moment
- content consistency: the approved voiceover line, storyboard row, visual asset plan, and actual image all communicate the same idea without relying on added explanatory text
- final still/hold/hero/UI-card/UI-composite assets are outputs from `generate_image` or `edit_image`, not raw user screenshots used directly
- product UI text, labels, menus, workflow names, cards, data, and buttons remain readable when relevant
- no added explanatory or marketing text overlay is present unless explicitly user-required or legally/distribution-required
- any unavoidable added text does not repeat the voiceover or compete with already-clear product UI
- rectangles, arrows, rings, non-text callouts, and highlight boxes point to the correct UI region
- crop and zoom preserve enough context
- real UI text, layout, data, and claim-relevant state did not drift
- generated conceptual visuals are not presented as real product UI
- same-style supported use-case visuals are supported by the approved brief, source evidence, or user confirmation
- same-style supported use-case visuals use real product UI sources as input/base/reference material when available and are not presented as exact user-provided screenshots or recording frames unless they are exact source images
- prompt-only generation was not used for product UI or same-style supported use-case visuals when a relevant product UI source was available
- any prompt-only representative UI-style visual has a logged reason showing no suitable UI source existed or the user explicitly approved the route
- raw user screenshots are not used directly as approved final still assets unless the user explicitly waived the `generate_image` / `edit_image` output rule
- no final promo visual is a Python/PIL-only or script-only composite standing in for a proper generated or edited visual
- sensitive data is absent or redacted
- aspect ratio and resolution fit the approved export
- important UI remains readable
- caption-safe space exists when captions are required

Treat a voiceover-to-visual mismatch, misplaced highlight, wrong rectangle, wrong arrow, unreadable target, unsupported UI change, raw screenshot used directly as a final still asset without user waiver, prompt-only product UI generation despite an available source UI, Python/PIL-only final promo composite, or added explanatory text overlay as a blocking defect.

### Step 3 - Write `visual-review-report.md`

For each asset, record:

- pass, fix required, or reject
- whether the visual content matches the approved spoken line and storyboard intent
- exact defect
- expected correction
- source reference or storyboard row that proves the correction
- whether the fix belongs to visual production, visual planning, or promo direction

When several assets share one voiceover clip, review them as a sequence, not only one-by-one.
Verify the first, middle, and final visual emphasis match the spoken line's logic and that the motion handoff between assets is understandable.

If an asset passes internal review, add it to the approved still / hold frame manifest only after user visual approval is also received.
Do not put unreviewed or internally passed-but-not-user-approved assets in the approved manifest.

### Step 4 - Route internal review decision

If any blocking issue remains, send `Visual Fix` to `visual_director` using `send_message_to`.

Include:

- absolute path to `visual-review-report.md`
- absolute path to `visual-source-index.md`
- absolute path to `visual-asset-production-log.md`
- asset ids needing correction
- exact correction instructions
- whether `promo_director` must be involved

Repeat this internal fix/review loop as many times as needed.
Do not ask the user to review the visuals while any blocking internal review finding remains.

If all required visuals pass internal review with no remaining blocking findings, present the reviewed visual package to the user before video production.

Show enough context for useful user review:

- absolute path to `visual-review-report.md`
- absolute path to `visual-source-index.md`
- absolute path to `visual-asset-production-log.md`
- absolute paths to reviewed visuals
- a concise list of what each visual is supposed to prove or show
- the proposed approved still / hold frame manifest with shot id, voiceover clip id, clip visual order, matched spoken intent, intended dwell/placement, and planned motion use
- open non-blocking risks

Ask the user to approve the visual package or identify changes.
Record the user decision and feedback in `visual-review-report.md`.

If the user requests visual changes, route the feedback to the owning specialist:

- production defects, polish changes, wrong non-text callout, wrong crop, or added explanatory text overlay -> `visual_director`
- story or line-to-visual mismatch -> `promo_director`
- unsupported product claim or state -> `promo_director`

### Step 5 - Handoff user-approved visual package to `promo_video_producer`

Only after internal review passes and the user approves the visual package, send the approved visual package to `promo_video_producer`.

Include:

- absolute path to `product-promo-brief.md`
- absolute path to `research-notes.md` when present
- absolute path to `source-asset-inventory.md` when present
- absolute path to `visual-source-index.md`
- absolute path to `promo-script.md`
- absolute path to `voiceover-package.md`
- absolute path to `audio-generation-log.md`
- absolute path to `promo-storyboard.md`
- absolute path to `visual-asset-plan.md`
- absolute path to `visual-asset-production-log.md`
- absolute path to `visual-review-report.md`
- absolute paths to all approved visual assets
- approved still / hold frame manifest from `visual-review-report.md`
- user visual approval status and summary
- open non-blocking risks

## Routing Rules

- Route visual production, crop, polish, non-text callout, and added-text defects to `visual_director`.
- Route unsupported product claims, unsupported product states, or story mismatches to `promo_director`.
- Do not send unreviewed, failed, or user-unapproved visuals to `promo_video_producer`.
