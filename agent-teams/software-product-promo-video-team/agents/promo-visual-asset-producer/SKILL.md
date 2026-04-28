---
name: promo-visual-asset-producer
description: Produce promo-ready still visual assets, edited screenshots, source-based image polish, generated support visuals, and production logs from an approved visual asset plan.
---

# Promo Visual Asset Producer

Use this skill to turn an approved visual asset plan into a complete candidate visual asset package for review.

## Expected Inputs

- approved `product-promo-brief.md`
- `research-notes.md` when present
- `source-asset-inventory.md` when present
- approved `promo-script.md`
- `voiceover-package.md`
- `audio-generation-log.md`
- `promo-storyboard.md`
- `visual-asset-plan.md`
- `screen-capture-log.md` when screenshots or recordings were selected or created
- source images, screenshots, screen-recording frames, brand assets, or generated-image instructions

## Produced Artifacts

- `visual-asset-production-log.md`
- candidate still assets under `assets/`
- source-based edited screenshots, generated visuals, callout/highlight frames, and polished hold frames

Use:
- [visual-asset-production-log-template.md](templates/visual-asset-production-log-template.md)

## Required Shared Reads

- Start by reading [promo-production-principles.md](promo-production-principles.md).
- Use it as the shared reference for image tool rules, visual truth, source-based polish, callout accuracy, and review routing.

## Workflow

### Step 1 - Confirm the production package

Read the approved visual package before producing images.

Confirm:

- brief approval status
- script approval status
- voiceover package and measured audio durations
- storyboard path
- visual asset plan path
- approved channel, aspect ratio, and resolution
- source image paths and shot ids
- required callouts, arrows, rectangles, crop regions, and highlight targets
- source evidence for any same-style generated product use case

If a required visual target is ambiguous, route it back to `product_visual_director` before creating assets.

### Step 2 - Produce candidate assets

For each planned still or frame:

- preserve the asset id, shot id, and voiceover clip id from the visual asset plan
- use `edit_image` for source-based screenshot/frame polish whenever a real UI source exists
- use `generate_image` for conceptual support visuals, hero frames, device mockups, transitions, or approved same-style supported use cases
- create callout/highlight frames only when the target UI region is unambiguous
- keep product UI readable and truthful
- save outputs under stable project paths in `assets/`

For prompt-only `generate_image` routes:

- omit `generation_config`
- do not pass a model identifier
- include aspect ratio and orientation inside the prompt
- make the prompt self-contained
- run image-tool calls serially: one `generate_image` or `edit_image` call, inspect and log the result, then `sleep 60` before the next image-tool call

For `edit_image` or source-based image polish:

- provide source image paths as input images
- state invariants to preserve: UI layout, labels, values, product state, claim-relevant result, and real product identity
- state allowed changes: crop, lighting, background, depth, redaction, callouts, shadows, framing, and subtitle-safe space
- reject outputs that alter claim-relevant UI text or product behavior

### Step 3 - Log production work

Write `visual-asset-production-log.md`.

For each material output or rejected attempt, record:

- asset id
- shot id
- voiceover clip id
- source refs
- tool used
- exact prompt or edit instruction
- `generation_config` status for prompt-only `generate_image` routes
- output path
- callout/highlight target when used
- truthfulness checks
- UI/text drift checks
- approval candidate status
- reason for retry or rejection
- cooldown completed after call

### Step 4 - Self-check before review

Before handoff, verify:

- inspect produced images visually when possible, especially callout/highlight frames
- every required visual asset has a candidate output or a recorded blocker
- rectangles, arrows, rings, and callouts target the intended UI region
- source-based edits preserve real product state
- generated support visuals are labeled conceptually when they are not real UI
- no sensitive data is visible
- aspect ratio and resolution match the approved export
- important UI remains readable

### Step 5 - Handoff to `promo_visual_asset_reviewer`

Send the candidate visual package downstream using `send_message_to`.

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
- absolute paths to all candidate image assets
- known weak points, retries, and unresolved blockers

## Routing Rules

- Route unclear visual targets to `product_visual_director`.
- Route unsupported claims or product states to `product_promo_strategist`.
- Route script-level mismatches to `promo_script_storyboarder`.
- If the reviewer sends `Visual Asset Fix`, produce corrected assets and resend the full package for re-review.
