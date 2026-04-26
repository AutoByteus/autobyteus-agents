---
name: product-visual-director
description: Plan, select, verify, and hand off product screenshots, screen recordings, UI highlights, brand visuals, and generated supporting visuals for software product promo videos.
---

# Product Visual Director

Use this skill to turn a promo storyboard into a complete visual asset package.

## Expected Inputs

- `product-promo-brief.md`
- `promo-script.md`
- `promo-storyboard.md`
- user-supplied screenshots, screen recordings, brand assets, icons, logos, or product links
- target channel, aspect ratio, and resolution

## Produced Artifacts

- `visual-asset-plan.md`
- `screen-capture-log.md`
- `generated-visual-log.md` when generated supporting visuals are used
- organized assets under `assets/`

Use:
- [visual-asset-plan-template.md](templates/visual-asset-plan-template.md)
- [screen-capture-log-template.md](templates/screen-capture-log-template.md)
- [generated-visual-log-template.md](templates/generated-visual-log-template.md)

## Required Shared Reads

- Start by reading [promo-production-principles.md](promo-production-principles.md).
- Use it as the shared reference for visual truth, readability, aspect ratio, generated visual limits, and handoffs.

## Workflow

### Step 1 - Build the visual asset inventory

Inventory all supplied and reachable visual sources:

- screenshots
- screen recordings
- website pages
- app store images
- brand assets
- logo files
- icons
- product mockups
- existing marketing visuals

Record source paths, URLs, dimensions, freshness, sensitive-data risk, and likely shot usage.

### Step 2 - Map storyboard shots to assets

For every storyboard shot, decide:

- use existing screenshot
- capture new screenshot
- use screen recording
- crop or zoom an existing asset
- create callout or annotation
- use generated supporting visual
- route missing asset back upstream

Prefer real product UI for product-specific claims.
Do not generate fake product UI and present it as the real product.

### Step 3 - Check aspect ratio and readability

For each planned shot, verify:

- fits locked channel and aspect ratio
- important UI remains readable
- crop does not remove required context
- overlays do not cover important UI
- sensitive data is removed or avoided
- visual supports the spoken claim

If the UI is too dense for the target export, plan a tighter crop, zoom path, or simplified region.

### Step 4 - Capture or prepare product visuals

When browser or capture tools are available, capture only what is needed for the storyboard.

For each capture, record:

- capture id
- source URL or app path
- viewport or device profile
- captured file path
- shot ids served
- redaction notes
- approval status

Use stable filenames that preserve shot order.

### Step 5 - Use generated visuals only as support

Generated visuals may support:

- abstract background
- transition image
- metaphor shot
- hero atmosphere
- non-product concept

Generated visuals must not impersonate the actual product UI.

When using `generate_image`:

- omit `generation_config`
- do not pass a model identifier
- include the aspect ratio and orientation inside the prompt
- make the prompt self-contained
- call exactly one image tool request at a time
- inspect and log the result
- run `sleep 60` before any next image tool call

### Step 6 - Write `visual-asset-plan.md`

Include:

- locked channel and aspect ratio
- asset inventory summary
- shot-to-asset map
- crop, zoom, highlight, and annotation plan
- generated visual prompts and outputs when applicable
- sensitive-data handling
- missing visual risks
- handoff notes for the editor

### Step 7 - Handoff to `promo_video_producer`

Send the visual package downstream using `send_message_to`.

Include:

- absolute path to `visual-asset-plan.md`
- absolute path to `screen-capture-log.md`
- absolute path to `generated-visual-log.md` when present
- absolute paths to all approved visual assets
- storyboard path
- locked channel, aspect ratio, resolution, and duration
- open visual risks

## Routing Rules

- Route unsupported product claims to `product_promo_strategist`.
- Route shots that cannot be visually supported to `promo_script_storyboarder`.
- Route stale or missing product assets to the user or coordinator instead of faking them.
- If a generated visual drifts toward fake UI, reject it and revise the visual plan.
