---
name: promo-visual-asset-reviewer
description: Review candidate promo visual assets and either pass them to video production or route precise fixes back to the visual asset producer.
---

# Promo Visual Asset Reviewer

Use this skill to review produced still visual assets before video production begins.

## Expected Inputs

- approved `product-promo-brief.md`
- `research-notes.md` when present
- `source-asset-inventory.md` when present
- approved `promo-script.md`
- `voiceover-package.md`
- `audio-generation-log.md`
- `promo-storyboard.md`
- `visual-asset-plan.md`
- `screen-capture-log.md` when present
- `visual-asset-production-log.md`
- candidate visual assets under `assets/`

## Produced Artifacts

- `visual-asset-review-report.md`
- approved visual asset manifest, internal review decision, user visual approval status, and approval notes inside the review report

Use:
- [visual-asset-review-report-template.md](templates/visual-asset-review-report-template.md)

## Required Shared Reads

- Start by reading [promo-production-principles.md](promo-production-principles.md).
- Use it as the shared reference for product truth, callout accuracy, image tool rules, visual readability, and routing.

## Workflow

### Step 1 - Confirm the review package

Confirm:

- brief and script approval status
- voiceover package path and measured audio durations
- storyboard path
- visual asset plan path
- visual asset production log path
- candidate asset paths
- expected shot ids and voiceover clip ids

If the package is incomplete, route it back to `promo_visual_asset_producer`.

### Step 2 - Review each candidate visual

For every candidate asset, verify:

- inspect the actual image, not only the production log
- asset id, shot id, and voiceover clip id match the plan
- the visual supports the approved spoken line and product/UI moment
- rectangles, arrows, rings, callouts, and highlight boxes point to the correct UI region
- crop and zoom preserve enough context
- real UI text, layout, data, and claim-relevant state did not drift
- generated conceptual visuals are not presented as real product UI
- same-style generated use cases are supported by the approved brief or source evidence
- sensitive data is absent or redacted
- aspect ratio and resolution fit the approved export
- important UI remains readable
- subtitle-safe space exists when required

Treat a misplaced highlight, wrong rectangle, wrong arrow, or unreadable target as a blocking defect.

### Step 3 - Write `visual-asset-review-report.md`

For each asset, record:

- pass, fix required, or reject
- exact defect
- expected correction
- source reference or storyboard row that proves the correction
- whether the fix belongs to asset production, visual direction, script/storyboard, or strategy

### Step 4 - Route internal review decision

If any blocking issue remains, send `Visual Asset Fix` to `promo_visual_asset_producer` using `send_message_to`.

Include:

- absolute path to `visual-asset-review-report.md`
- absolute path to `visual-asset-production-log.md`
- asset ids needing correction
- exact correction instructions
- whether `product_visual_director`, `promo_script_storyboarder`, or `product_promo_strategist` must be involved

Repeat this internal fix/review loop as many times as needed.
Do not ask the user to review the visuals while any blocking internal review finding remains.

If all required assets pass internal review with no remaining blocking findings, present the reviewed visual package to the user before video production.

Show enough context for useful user review:

- absolute path to `visual-asset-review-report.md`
- absolute path to `visual-asset-production-log.md`
- absolute paths to reviewed visual assets
- a concise list of what each asset is supposed to prove or show
- open non-blocking risks

Ask the user to approve the visual package or identify changes.
Record the user decision and feedback in `visual-asset-review-report.md`.

If the user requests visual changes, route the feedback to the owning specialist:

- production defects or polish changes -> `promo_visual_asset_producer`
- ambiguous target, wrong source choice, or missing source decision -> `product_visual_director`
- story or line-to-visual mismatch -> `promo_script_storyboarder`
- unsupported product claim or state -> `product_promo_strategist`

### Step 5 - Handoff user-approved visual package to `promo_video_producer`

Only after internal review passes and the user approves the visual package, send the approved visual package to `promo_video_producer`.

Include:

- absolute path to `product-promo-brief.md`
- absolute path to `research-notes.md` when present
- absolute path to `source-asset-inventory.md` when present
- absolute path to `promo-script.md`
- absolute path to `voiceover-package.md`
- absolute path to `audio-generation-log.md`
- absolute path to `promo-storyboard.md`
- absolute path to `visual-asset-plan.md`
- absolute path to `screen-capture-log.md` when present
- absolute path to `visual-asset-production-log.md`
- absolute path to `visual-asset-review-report.md`
- absolute paths to all approved visual assets
- user visual approval status and summary
- open non-blocking risks

## Routing Rules

- Route asset production defects to `promo_visual_asset_producer`.
- Route ambiguous visual intent or missing visual source decisions to `product_visual_director`.
- Route unsupported product claims or product states to `product_promo_strategist`.
- Route story or script mismatches to `promo_script_storyboarder`.
- Do not send unreviewed, failed, or user-unapproved visual assets to `promo_video_producer`.
