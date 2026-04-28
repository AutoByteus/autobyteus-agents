---
name: product-visual-director
description: Plan, select, verify, and hand off screenshot, recording, UI highlight, brand, motion-treatment, and generated/edited visual requirements for software product promo videos.
---

# Product Visual Director

Use this skill to turn an audio-informed promo storyboard into a complete visual asset plan for production.

## Expected Inputs

- approved `product-promo-brief.md`
- approved `promo-script.md`
- `voiceover-package.md`
- `audio-generation-log.md`
- `promo-storyboard.md`
- user-supplied screenshots, screen recordings, brand assets, icons, logos, or product links
- approved channel, aspect ratio, and resolution

## Produced Artifacts

- `visual-asset-plan.md`
- `screen-capture-log.md`

Use:
- [visual-asset-plan-template.md](templates/visual-asset-plan-template.md)
- [screen-capture-log-template.md](templates/screen-capture-log-template.md)

## Required Shared Reads

- Start by reading [promo-production-principles.md](promo-production-principles.md).
- Use it as the shared reference for visual truth, readability, aspect ratio, generated and edited visual rules, and handoffs.

## Workflow

### Step 1 - Build the visual asset inventory

Confirm that the incoming brief and script approval states are recorded before visual planning.
If the script is still a draft, route it back to `promo_script_storyboarder` before planning final visual assets.
Confirm that `voiceover-package.md` and `audio-generation-log.md` include measured audio durations for the storyboard clips.
If measured audio is missing, route the package back to `promo_video_producer` before planning final visual assets.

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

- whether the story-level product or UI moment is visually supportable as written
- use existing screenshot
- capture new screenshot
- use screen recording
- crop or zoom an existing asset
- request a source-based polished still from a real screenshot or video frame
- request callout or annotation assets
- create a motion-graphics treatment
- request a generated or edited promo visual
- route missing asset back upstream
- how the asset can support the measured voiceover duration with holds, loops, slower motion, or CTA dwell when needed

Do not replace the storyboard's core product moment with a decorative visual without routing the issue back to `promo_script_storyboarder`.
Prefer real product UI for product-specific claims.
Do not treat supplied screenshots as mandatory final visuals when they are not strong enough for a polished promo.
Do not default to raw tutorial stills for hero or hold frames when a source-based image edit can preserve the UI while making the promo look substantially more polished.

### Step 3 - Check aspect ratio and readability

For each planned shot, verify:

- fits approved channel and aspect ratio
- important UI remains readable
- crop does not remove required context
- overlays do not cover important UI
- sensitive data is removed or avoided
- visual supports the spoken claim
- the shot has enough visual material for the measured audio duration, or a planned still hold/loop/alternate

If the UI is too dense for the target export, plan a tighter crop, zoom path, or simplified region.

### Step 3A - Decide the visual ambition and polish route

Before visual handoff, judge whether the selected real screenshots or video frames are promo-quality, not merely factually correct.

For each important product moment, classify the route:

- `raw real UI` when the original capture is already clean, readable, and polished enough
- `source-based image polish` when the source UI is true but needs better framing, lighting, depth, background extension, redaction, callouts, or cinematic treatment
- `conceptual generated visual` when the shot is a metaphor, hero, transition, or non-product explanatory diagram
- `recapture needed` when the source is too stale, noisy, sensitive, or low-resolution to repair truthfully

Default expectation for software promo hold frames:

- Use source-based image polish proactively for hero frames, feature proof stills, end-card frames, weak screen-recording stills, and any shot that must hold for readability.
- Preserve the real UI state and product text as much as possible.
- Keep added callouts, labels, glow, shadows, background extension, and depth clearly outside the product UI unless they are purely cosmetic.
- Treat planned polished frames as first-class asset requirements that must be produced and reviewed before video production.
- Use raw screen recordings mainly for motion bridges, cursor/action texture, and proof of live interaction when they are less polished than edited stills.

Truth boundary:

- Source-based image edit requirements may improve composition, contrast, lighting, crop, background, redaction, callouts, and visual hierarchy.
- They must not invent shipped UI states, product capabilities, output results, customer proof, pricing, metrics, marketplace availability, provider/model support, security/compliance claims, or URLs.
- If an image edit alters UI text or product state in a claim-relevant way, reject it or label it as conceptual instead of real UI.
- If stronger visuals reveal that the storyboard or message undersells the product ambition, route that concern to `promo_script_storyboarder` or `product_promo_strategist` rather than hiding the gap with decoration.

### Step 3B - Plan software-promo motion graphics

For each product-screen shot, define how the UI should move or transition.

Use motion treatments such as:

- floating screenshot card with soft shadow
- subtle 2.5D tilt or perspective rotation
- fade, crossfade, slide-in, push, or wipe transition
- zoom into a feature region
- pan across a dashboard or canvas
- layered screenshot stack
- cursor path, highlight ring, or feature callout reveal

Keep all motion subordinate to comprehension.
If a tilt, blur, overlap, or transition makes important UI hard to read, simplify the motion or plan a tighter crop.
Do not use generated fake UI to create a more cinematic screen.
Do not prescribe a single implementation tool unless the project already requires one.
Describe the intended visual behavior clearly enough that `promo_video_producer` can choose the best available implementation route.
Include measured-duration guidance: safe hold frames, loopable sections, minimum readable dwell, and any maximum duration before the shot feels stale or repetitive.

### Step 4 - Capture or register product visual sources

When browser or capture tools are available, capture only what is needed for the storyboard.

For each capture, record:

- capture id
- source URL or app path
- viewport or device profile
- captured file path
- shot ids served
- redaction notes
- loop or hold suitability
- approval status

Use stable filenames that preserve shot order.

### Step 5 - Specify generated or edited promo visual requirements

Generated and edited visuals may be requested as first-class promo assets for:

- hero images
- polished product-context scenes
- device mockup scenes
- abstract backgrounds
- transition images
- metaphor shots
- animated-card backgrounds
- marketing frames based on the team's understanding of the product
- source-based polished product screenshots and screen-recording frames
- same-style visuals for supported product use cases that the user did not capture well

Request source-based `edit_image` work when supplied visuals need cleanup, redaction, extension, background replacement, mockup framing, lighting, cropping, or visual polish.
Generated or edited visuals must not impersonate unsupported product UI, data, features, proof, pricing, or results.
When requesting a visual for a supported case that is missing from the supplied assets, cite the approved product source or brief section that proves the case is real.

When product UI is available but visually weak, specify `edit_image` or a source-grounded image edit/generation requirement instead of accepting a low-quality still.
For each major shot, consider requesting at least one polished 16:9 still that can serve as the readable hold frame.

For every requested generated or edited asset, specify:

- asset id and shot id
- route: source-based proof, conceptual support, same-style supported use case, or recapture needed
- source image refs
- source evidence
- required aspect ratio and orientation
- prompt or edit brief
- invariants to preserve
- allowed changes
- exact callout, rectangle, arrow, ring, crop, or highlight target when used

### Step 6 - Write `visual-asset-plan.md`

Include:

- approved channel and aspect ratio
- measured voiceover duration per shot or segment
- asset inventory summary
- shot-to-asset map
- crop, zoom, highlight, and annotation plan
- motion-graphics treatment for each shot, including card tilt, fade, slide, zoom, layered stack, cursor path, or callout plan when used
- measured-duration notes for each shot: minimum readable dwell, safe extension method, loop points or still-hold recommendation, and trim risk
- generated or edited visual requirements when applicable
- a source-based image polish plan when polished frames are needed: preferred asset per shot, truthfulness guardrail, and whether raw recordings are now only motion bridges
- sensitive-data handling
- missing visual risks
- handoff notes for the editor

### Step 7 - Handoff to `promo_visual_asset_producer`

Send the visual package downstream using `send_message_to`.

Include:

- absolute path to `product-promo-brief.md`
- absolute path to `research-notes.md` when present
- absolute path to `source-asset-inventory.md` when present
- absolute path to `promo-script.md`
- absolute path to `promo-storyboard.md`
- absolute path to `visual-asset-plan.md`
- absolute path to `screen-capture-log.md` when present
- absolute path to `voiceover-package.md`
- absolute path to `audio-generation-log.md`
- approval status of the brief
- approval status of the script and on-screen copy
- approved channel, aspect ratio, resolution, duration preference, and hard duration limit when present
- measured segment guidance, including which assets can be extended, looped, held, or shortened
- required asset-production routes, including which planned polished assets should replace weak raw stills and which raw recordings remain useful as motion bridges
- exact callout, rectangle, arrow, ring, crop, and highlight targets
- open visual risks

## Routing Rules

- Route unsupported product claims to `product_promo_strategist`.
- Route shots that cannot be visually supported to `promo_script_storyboarder`.
- Route stale or missing product assets to the user or coordinator instead of faking them.
- If `promo_visual_asset_reviewer` identifies an ambiguous target or unsupported production request, revise the visual plan before asset production continues.
