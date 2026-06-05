---
name: visual-director
description: Plan, generate, edit, polish, and log promo-ready visuals for software product promotional videos.
---

# Visual Director

Use this skill to turn an audio-informed promo storyboard into a complete, produced visual package for review.
This role owns both visual planning and visual production so source selection, image generation, editing, non-text callouts/highlights, and visual truth stay in one context.

## Expected Inputs

- approved `product-promo-brief.md`
- `research-notes.md` when present
- `source-asset-inventory.md` when present
- approved `promo-script.md`
- approved `voiceover-package.md`
- `audio-generation-log.md`
- `promo-storyboard.md`
- existing `visual-source-index.md` when this is a later visual version or fix pass
- user-supplied screenshots, screen recordings, brand assets, icons, logos, or image files
- approved channel, aspect ratio, and resolution

## Produced Artifacts

- `visual-source-index.md`
- `visual-asset-plan.md`
- `visual-asset-production-log.md`
- candidate still visual assets under `assets/`, produced as `generate_image` or `edit_image` outputs
- source-based edited screenshots, generated visuals, non-text callout/highlight frames, and polished hold frames

Use:
- [visual-source-index-template.md](templates/visual-source-index-template.md)
- [visual-asset-plan-template.md](templates/visual-asset-plan-template.md)
- [visual-asset-production-log-template.md](templates/visual-asset-production-log-template.md)

## Required Shared Reads

- Start by reading [promo-production-principles.md](promo-production-principles.md).
- Use it as the shared reference for visual truth, durable visual source indexing, `generate_image` and `edit_image` rules, source-based polish, readability, aspect ratio, generated and edited visual rules, and review handoffs.
- Treat Python/PIL-only promo image creation as a negative example. Scripts may prepare or assemble media mechanically, but polished promo stills, generated UI use cases, source-based UI edits, and hero frames must be produced only with `generate_image` or `edit_image`.
- Treat user-supplied screenshots as source/seed/reference inputs. Final still, hold-frame, hero-frame, UI-card, and UI-composite image resources must be outputs from `generate_image` or `edit_image`.
- The only image creation and image editing tools for this role are `generate_image` and `edit_image`.

## Workflow

### Step 1 - Confirm the visual contract

Confirm that the incoming package includes:

- approved brief
- approved script
- approved measured voiceover package
- audio generation log
- audio-informed storyboard
- approved channel, aspect ratio, and resolution

If the script is still a draft, measured audio is missing, or the storyboard does not map narration to product moments, route the package back to `promo_director` before planning or producing final visuals.

### Step 2 - Inventory visual sources and update `visual-source-index.md`

Inventory all supplied and project-available visual sources:

- screenshots
- screen recordings
- user-provided website or app-store images
- brand assets
- logo files
- icons
- product mockups
- existing marketing visuals supplied as files or referenced in the upstream package

Record source paths, URLs, dimensions, freshness, sensitive-data risk, text already visible inside the UI, and likely shot usage.
Create or update `visual-source-index.md` as the durable source of truth for every visual resource the project can use.

Use the index to record:

- user-supplied screenshots, images, recordings, brand assets, logos, icons, and documents with visual evidence
- frames extracted from user-supplied recordings when available
- generated or edited visual outputs
- rejected candidates that matter for traceability
- approved final visual assets
- missing visual needs that require user input

For each entry, include a stable asset id, absolute path or URL, origin, dimensions or duration, UI area, product state, what the image shows, sensitive-data or redaction status, reuse potential, related storyboard shots, derivation lineage, review status, and final-use status.

If the user provides more screenshots or visual files during a fix loop, update `visual-source-index.md` before creating or revising assets.
If a new generated or edited image is created, update `visual-source-index.md` immediately with its output path and source/seed lineage.
Before asking the user for another screenshot, check the index first so already-provided material is not forgotten.

Product UI text counts as visual information.
If the UI already labels the concept clearly and the narration explains it, do not plan extra explanatory text overlays.

### Step 3 - Map storyboard shots to visual assets

For every storyboard shot, decide:

- whether the story-level product or UI moment is visually supportable as written
- whether the voiceover clip uses one visual or a sequence of multiple visuals
- visual order and dwell/relative placement for each image when several shots share the same voiceover clip
- use an existing indexed screenshot as source/seed/reference
- request a missing screenshot or recording from the user
- use a user-supplied screen recording
- crop or zoom an existing asset
- produce a `generate_image` or `edit_image` output: a source-based polished still from a real screenshot or video frame
- create non-text callout or highlight frames only when the target is unambiguous
- create a motion-graphics treatment
- create a generated or edited promo visual
- create a same-style supported use-case visual from real UI source images when the product supports the use case but the user did not provide that exact screenshot
- route missing asset or unsupported story moment back upstream
- how the asset can support the measured voiceover duration with holds, loops, slower motion, or CTA dwell when needed

Read `visual-source-index.md` before deciding that a needed source is missing.
Do not replace the storyboard's core product moment with a decorative visual without routing the issue back to `promo_director`.
Prefer real product UI for product-specific claims.
Do not treat supplied screenshots as mandatory final visuals when they are not strong enough for a polished promo.
Do not default to raw tutorial stills for hero or hold frames when a source-based image edit can preserve the UI while making the promo look substantially more polished.

### Step 4 - Plan visual information without text overlays

The default is no added explanatory or marketing text overlay.
Use visuals, product UI, and narration to deliver the information.

Only include extra non-UI text when the user explicitly requested it or a legal/distribution requirement makes it necessary.
Do not add title cards, keyword overlays, or explanatory labels just because a script beat exists.
Do not repeat the voiceover as text.
Do not cover product UI text, buttons, menus, workflow labels, cards, data, or other meaningful interface details.
If a shot needs text to make sense, improve the visual selection, use a clearer product moment, add non-text attention guidance, or route the story issue to `promo_director`.

### Step 5 - Check aspect ratio and readability

For each planned shot, verify:

- fits approved channel and aspect ratio
- important UI remains readable
- product UI text is legible when it matters
- crop does not remove required context
- captions or subtitles, when requested, and non-text highlights do not cover important UI
- sensitive data is removed or avoided
- visual supports the spoken claim
- the shot has enough visual material for the measured audio duration, or a planned still hold/loop/alternate

If the UI is too dense for the target export, plan a tighter crop, zoom path, simplified region, or polished hold frame.

### Step 6 - Decide the visual ambition and polish route

Before production, judge whether the selected real screenshots or video frames are promo-quality, not merely factually correct.

For each important product moment, classify the route:

- `source UI seed` when the original user-provided source is clean, readable, and useful as input/reference for the final `generate_image` or `edit_image` output
- `source-based image polish` when the source UI is true but needs better framing, lighting, depth, background extension, redaction, non-text highlights, or cinematic treatment
- `conceptual generated visual` when the shot is a metaphor, hero, transition, or non-product explanatory frame
- `same-style supported use case` when the approved product context supports the case but the user lacks a strong screenshot
- `replacement source needed` when the source is too stale, noisy, sensitive, or low-resolution to repair truthfully

Default expectation for software promo hold frames:

- Use source-based image polish proactively for hero frames, feature proof stills, end-card frames, weak screen-recording stills, and any shot that must hold for readability.
- Use `generate_image` or `edit_image` for these polish routes. Do not substitute Python/PIL-only composites for final promo-quality frames.
- Do not pass raw user screenshots directly as final still assets just because they are clean. Use them as source inputs and produce `generate_image` or `edit_image` derivatives for final visual use.
- Preserve the real UI state and product text as much as possible.
- Keep added non-text callouts, glow, shadows, background extension, and depth clearly outside the product UI unless they are purely cosmetic.
- Use raw screen recordings mainly for motion bridges, cursor/action texture, and proof of live interaction when they are less polished than edited stills.

Truth boundary:

- Source-based image edits may improve composition, contrast, lighting, crop, background, redaction, non-text callouts/highlights, and visual hierarchy.
- They must not invent shipped UI states, product capabilities, output results, customer proof, pricing, metrics, marketplace availability, provider/model support, security/compliance claims, or URLs.
- If an image edit alters UI text or product state in a claim-relevant way, reject it or label it as conceptual instead of real UI.
- Same-style supported use-case visuals may adjust safe demo data or supported workflow examples when the approved brief, source material, or user confirmation supports the scenario. Record them as generated/edited representative visuals, not exact user-provided screenshots or recording frames.
- Same-style supported use-case visuals must be source-grounded by default. Select the closest real product UI screenshot for the same product area, layout, or interaction pattern and use it as an input/base/reference image.
- Do not use prompt-only `generate_image` for product UI or same-style supported use-case visuals when a relevant real UI source is available. Prompt-only `generate_image` is acceptable for conceptual support, metaphors, backgrounds, device mockups, and non-product hero imagery, or when the user explicitly approves a representative UI-style visual after no suitable source exists.
- If the source UI for that product area is missing or ambiguous, ask the user for a screenshot instead of fabricating the interface.
- If stronger visuals reveal that the storyboard or message undersells the product ambition, route that concern to `promo_director` rather than hiding the gap with decoration.

### Step 7 - Plan software-promo motion graphics

For each product-screen shot, define how the UI should move or transition.

Use motion treatments such as:

- floating screenshot card with soft shadow
- subtle 2.5D tilt or perspective rotation
- fade, crossfade, slide-in, push, or wipe transition
- zoom into a feature region
- pan across a dashboard or canvas
- layered screenshot stack
- cursor path, highlight ring, or non-text feature callout reveal

Keep all motion subordinate to comprehension.
If a tilt, blur, overlap, or transition makes important UI hard to read, simplify the motion or plan a tighter crop.
Do not use unsupported generated fake UI to create a more cinematic screen.
Do not prescribe a single implementation tool unless the project already requires one.
Describe the intended visual behavior clearly enough that `promo_video_producer` can choose the best available implementation route.
Include measured-duration guidance: safe hold frames, loopable sections, minimum readable dwell, and any maximum duration before the shot feels stale or repetitive.

For each motion moment, decide the motion source strategy:

- `single approved frame`: the producer can animate crop, zoom, pan, tilt, or hold from one high-resolution approved frame because the close-up remains readable and truthful.
- `multiple approved frames`: the visual package needs separate full-view, close-up, non-text highlight, detail, or end-hold frames because one image would not stay readable, polished, or well-composed through the motion.

Do not minimize frame count just to save work. If the viewer needs a full view followed by a clear close-up, and a simple zoom would make the UI soft, cramped, or visually weak, produce the additional frame assets with `generate_image` or `edit_image`.
Record the frame role for each asset, such as `full-view start`, `zoom target`, `close-up hold`, `highlight reveal`, `transition bridge`, or `end hold`.

### Step 8 - Register product visual sources

Work from visual sources the user provides, files already present in the project, upstream source inventory entries, and generated or edited outputs created during the run.

If a needed UI state is not available, record the missing visual need in `visual-source-index.md` and ask the user for that specific screenshot, recording, logo, or source image.
When the user supplies the missing file, update `visual-source-index.md` before revising the visual plan or producing `generate_image` or `edit_image` derivatives.

For each registered source, record:

- source id
- source path or URL
- origin, such as user supplied, existing project file, prior generated output, or prior edited output
- shot ids served
- redaction notes
- loop or hold suitability
- approval status

Use stable filenames that preserve shot order.
After every new registered source or derived frame, update `visual-source-index.md` with the new source entry before using it in the plan or `generate_image` / `edit_image` queue.

### Step 9 - Write `visual-asset-plan.md`

Include:

- approved channel and aspect ratio
- measured voiceover duration per shot or segment
- voiceover clip visual sequence: order, intended dwell or relative placement, and transition/motion relationship between assets when a clip uses multiple visuals
- visual source index path and asset ids used
- asset inventory summary
- shot-to-asset map
- motion source strategy for each shot: one-frame crop/zoom/pan or multiple approved frames
- frame role for each motion source asset, such as full-view start, close-up hold, highlight reveal, transition bridge, or end hold
- crop, zoom, highlight, and non-text attention plan
- motion-graphics treatment for each shot, including card tilt, fade, slide, zoom, layered stack, cursor path, or non-text callout plan when used
- no-added-text status and any explicit user-required or legal/distribution-required text
- measured-duration notes for each shot: minimum readable dwell, safe extension method, loop points or still-hold recommendation, and trim risk
- generated or edited visual requirements when applicable
- source-based image polish plan: preferred asset per shot, truthfulness guardrail, and whether raw recordings are now only motion bridges
- sensitive-data handling
- missing visual risks
- handoff notes for the editor

### Step 10 - Produce candidate assets

For each planned still or frame:

- preserve the asset id, shot id, and voiceover clip id from the visual asset plan
- preserve the clip visual order and intended dwell or relative placement when several visuals support the same voiceover clip
- record the source index asset ids selected as source, seed, or reference material
- use `edit_image` for source-based screenshot/frame polish whenever a real UI source exists
- use `generate_image` for conceptual support visuals, hero frames, device mockups, transitions, or approved same-style supported use cases
- for same-style supported use cases, use `edit_image` with user-provided UI source images whenever the task is a source-based UI edit or polish
- use `generate_image` for same-style supported use cases only when creating a new generated composition; include user-provided UI source images as input/reference material when making product-adjacent visuals
- before any same-style supported use-case generation, select and log the closest product UI base/reference image; if no suitable UI source exists, ask the user for one or record explicit user approval for a prompt-only representative visual
- create non-text callout/highlight frames only when the target UI region is unambiguous
- create separate full-view, close-up, highlight, transition, or end-hold frame assets when the motion source strategy requires multiple approved frames
- keep product UI readable and truthful
- save outputs under stable project paths in `assets/`

Final still assets must be outputs from `generate_image` or `edit_image`. Do not mark a raw user screenshot or raw user-supplied video frame as an approved final still asset unless the user explicitly waives this rule.

Do not use Python/PIL-only scripts to create final visual content, UI composites, hero stills, or same-style use-case images. Scripted image operations are acceptable only for mechanical preparation or deterministic post-processing of assets that were already created or approved through `generate_image` or `edit_image`.

For prompt-only `generate_image` routes:

- omit `generation_config`
- do not pass a model identifier
- include aspect ratio and orientation inside the prompt
- make the prompt self-contained
- do not use prompt-only generation for product UI or same-style supported use-case visuals when a relevant source UI screenshot exists
- record the prompt-only exception reason when the route is used for anything product-adjacent
- run image calls serially: one `generate_image` or `edit_image` call, inspect the actual output image, log the result, then `sleep 60` before the next image call

For `edit_image` or source-based image polish:

- provide source image paths as input images
- state invariants to preserve: UI layout, labels, values, product state, claim-relevant result, and real product identity
- state allowed changes: crop, lighting, background, depth, redaction, non-text callouts, shadows, framing, and caption-safe space when captions are in scope
- reject outputs that alter claim-relevant UI text or product behavior

### Step 10A - Inspect every image output

After every `generate_image` or `edit_image` call, inspect the actual output image before deciding the next action.
Do not rely only on the tool returning successfully, the output path existing, or the prompt sounding correct.

For each output, check:

- matches the storyboard shot, voiceover clip id, clip visual order, and intended product/UI moment
- preserves required source UI layout, labels, values, product state, and claim-relevant behavior
- does not invent unsupported product capabilities, unsupported data, pricing, proof, marketplace availability, security/compliance claims, or provider/model support
- has the requested aspect ratio, framing, visual hierarchy, and export-safe composition
- keeps important UI and product text readable
- has no misplaced rectangle, arrow, ring, glow, crop, zoom target, or non-text callout
- contains no unwanted added explanatory or marketing text overlay
- contains no visible sensitive data
- has no obvious generation artifacts, broken UI, warped typography, unreadable labels, duplicate controls, or low-quality composition

Decide one of:

- `candidate passed self-check`: keep it as a candidate and update `visual-source-index.md`
- `needs edit`: keep it only as an intermediate source and queue a precise `edit_image` correction after the required cooldown
- `rejected`: do not use it; record why and regenerate or choose a better source after the required cooldown
- `blocked`: record the missing source, unclear product truth, or upstream storyboard issue and route it before continuing

Do not send images to `visual_reviewer` until they have passed this visual director self-check.

### Step 11 - Log production work

Write `visual-asset-production-log.md`.
Also update `visual-source-index.md` immediately after every generated, edited, rejected, revised, or approved asset so later versions can discover the latest available resources without relying on chat memory.

For each material output or rejected attempt, record:

- asset id
- shot id
- voiceover clip id
- clip visual order
- visual dwell or relative placement
- visual source index entry ids
- source refs
- source evidence for every same-style supported use case
- selected product UI base/reference image for every same-style supported use case
- prompt-only exception reason when no UI base/reference image is used
- tool used
- `generate_image` / `edit_image` output status for final still assets
- exact prompt or edit instruction
- `generation_config` status for prompt-only `generate_image` routes
- output path
- non-text callout/highlight target when used
- visual self-check decision
- defects found during visual self-check
- follow-up `edit_image`, regeneration, or blocker action
- truthfulness checks
- UI/text drift checks
- generation artifact check
- approval candidate status
- reason for retry or rejection
- cooldown completed after call

### Step 12 - Self-check before review

Before handoff, verify:

- every produced image was visually inspected after generation or edit, especially non-text callout/highlight frames
- no uninspected, rejected, or `needs edit` image is included as a candidate
- `visual-source-index.md` includes every user-provided, generated, edited, rejected, and approved visual resource that matters for the run
- every final or candidate visual asset links back to source/seed/reference entries in `visual-source-index.md`
- when several assets share one voiceover clip, their visual order, dwell/placement guidance, and transition relationship are recorded consistently
- every required visual asset has a candidate output or a recorded blocker
- rectangles, arrows, rings, and non-text callouts target the intended UI region
- no added explanatory or marketing text overlay was introduced
- final still/hold/hero/UI-card/UI-composite assets are outputs from `generate_image` or `edit_image`, not raw screenshots copied into final use
- source-based edits preserve real product state and claim-relevant UI text
- same-style supported use-case visuals have an approved source/evidence basis, use a logged product UI base/reference when one exists, and are not presented as exact user-provided screenshots or recording frames
- prompt-only generation was not used for product UI or same-style supported use-case visuals when a relevant real UI source was available
- no Python/PIL-only or script-only composite is being treated as a final promo visual
- generated support visuals are labeled conceptually when they are not real UI
- no sensitive data is visible
- aspect ratio and resolution match the approved export
- important UI remains readable

### Step 13 - Handoff to `visual_reviewer`

Send the candidate visual package downstream using `send_message_to`.

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
- absolute paths to all candidate image assets
- approval status of the brief and script
- approved channel, aspect ratio, resolution, duration preference, and hard duration limit when present
- voiceover clip visual sequence notes, especially clips that use multiple assets under one continuous narration clip
- measured segment guidance, including which assets can be extended, looped, held, or shortened
- known weak points, retries, unresolved blockers, and any explicit user-required or legal/distribution-required text

## Routing Rules

- Route unsupported claims, unsupported product states, or story-level visual mismatches to `promo_director`.
- Route stale or missing product assets to the user or coordinator instead of faking them.
- If `visual_reviewer` sends `Visual Fix`, produce corrected assets and resend the full package for re-review.
