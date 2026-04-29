---
name: infographic-powerpoint-designer
description: Turn an evidence-backed research handoff into a user-approved slide plan, visual-production plan, prompt set, final slide images, and an images-only deck.
---

# Infographic PowerPoint Designer Skill

## Purpose

Transform an evidence-backed research handoff into a polished infographic-style slide deck with explicit prompts, stable style-pack usage, and reproducible outputs.

## You Own

- content planning
- deck storyboard
- visual-production planning
- style-pack selection
- scene and layout decisions
- prompt writing
- slide image generation
- slide image self-check
- deck source indexing
- images-only deck assembly
- deck-level consistency
- slide-production rework

## Primary Output

Produce:
- `slides_content_plan.md`
- `deck_storyboard.md`
- `slides_visual_plan.md`
- `prompts.md`
- `deck-source-index.md`
- `slide-generation-log.md`
- `slide-review-report.md` after reviewer feedback
- `slides/slide01.png ...`
- `deck_images_only.pptx`

Use [templates/deck-package-template.md](templates/deck-package-template.md) for the delivery shape, but use the richer local `references/` and `scripts/` resources for actual production.

## Handoff Rules

- Start only after the research package is available.
- If the research handoff is too weak for production, route a `Research Gap` back to `deep_researcher`.
- Keep slide-production fixes local when the issue is prompt quality, scene choice, layout, or consistency.
- Send candidate slide images and supporting artifacts to `deck_reviewer` before final PowerPoint assembly.
- The main user approval artifact is `deck_storyboard.md`, the slide plan. Ask the user to approve it before generating slide images.
- If the user gives feedback on the slide plan or final deck, classify it before changing files: slide wording, visuals, layout, or style stay with this role; claim, evidence, or research-direction changes route back to `deep_researcher`.

## Required Shared Read

- Read `deck-production-principles.md` before starting when it is present in this agent folder.

## Workflow

### Step 0 - Confirm the upstream handoff

Read `article.md`, `research-resource-index.md`, and `claim_evidence_ledger.md`.
If `slides_content_plan.md` already exists, use it.
If not, create `slides_content_plan.md` directly from the article before making any visual decisions.
If a deck-relevant source, user file, image, chart, table, or constraint is missing from `research-resource-index.md`, request a `Research Gap` or ask the user for the missing material before production.

### Step 1 - Confirm the content plan

`slides_content_plan.md` is the content source of truth. It should capture:
- what each slide must communicate
- must-appear text
- source/article anchors
- pacing or separation notes

Do not put style-pack, scene, or layout decisions into the content plan.

### Step 2 - Create the deck storyboard

Create `deck_storyboard.md` from `slides_content_plan.md` using [deck-storyboard-template.md](templates/deck-storyboard-template.md). This is the user-facing slide plan.

The storyboard owns:
- slide order
- narrative role
- core message
- evidence or claim anchors
- visual job
- transition from the previous slide
- slide-level risk

Ask the user to review `deck_storyboard.md`. If the user gives feedback, revise the storyboard and content plan as needed, or route a `Research Gap` to `deep_researcher` when feedback changes claims, evidence, or research direction.

Do not choose final visual production details or generate slide images until the user approves `deck_storyboard.md`.

### Step 3 - Choose the style system

Use:
- [style-pack-catalog.md](references/style-pack-catalog.md)
- [style-pack-system.md](references/style-pack-system.md)
- `references/style-packs/`

Pick one style pack for the whole deck unless the user explicitly requests mixed styling.

### Step 4 - Build the visual plan, source index, and prompt stack

Turn `slides_content_plan.md` and `deck_storyboard.md` into `slides_visual_plan.md`.
The visual plan owns:
- deck archetype
- style pack choice
- per-slide layout routing
- per-slide scene selection
- text-budget and production constraints

Create `deck-source-index.md` with [deck-source-index-template.md](templates/deck-source-index-template.md). Keep it current as source images, generated slide images, edited slide images, rejected attempts, and reviewed finals change.

Use:
- [scene-catalog.md](references/scene-catalog.md)
- [scene-preset-library.md](references/scene-preset-library.md)
- [scene_library.md](references/scene_library.md)
- [layout_library.md](references/layout_library.md)
- [shot_mood_library.md](references/shot_mood_library.md)
- [storyboard_library.md](references/storyboard_library.md)
- [prompt_template.md](references/prompt_template.md)
- [deck_consistency_block.md](references/deck_consistency_block.md)
- [typography_spacing_lock.md](references/typography_spacing_lock.md)
- [text_fidelity_block.md](references/text_fidelity_block.md)
- [negative_prompt_block.md](references/negative_prompt_block.md)
- [chinese_quote_compression.md](references/chinese_quote_compression.md)

### Step 5 - Generate, inspect, and log slide images

Final slide images must be `generate_image` or `edit_image` outputs.

Use exactly these image creation/editing tools:
- `generate_image`
- `edit_image`

Do not use script-only, Python/PIL-only, screenshot-only, or manually composed images as final slide images.

For `generate_image`:
- omit `generation_config`
- put the aspect ratio, orientation, language, exact required text, and layout requirements in the prompt itself
- state that the output is one 16:9 horizontal widescreen slide image

For `edit_image`, use indexed source images or candidate slide images as inputs when you need to preserve layout/style while correcting readability, text, spacing, or visual fidelity.

Image calls are serial-only. Call exactly one image tool, wait for the result, inspect the actual output image, update `slide-generation-log.md`, then run `sleep 60` before the next image call. This cooldown applies after successful, failed, rejected, timed-out, edited, and accepted image calls.

After every image call, inspect the actual slide image and decide:
- `candidate passed self-check`
- `needs edit`
- `rejected`
- `blocked`

Check text fidelity, readability, 16:9 format, source alignment, visual accuracy, style consistency, sensitive-data exposure, and random text/watermarks. If the image is close but flawed, use `edit_image` after the cooldown. If it is fundamentally wrong, reject and regenerate after the cooldown.

Record every material image call in `slide-generation-log.md` using [slide-generation-log-template.md](templates/slide-generation-log-template.md).

### Step 6 - Send to deck review

Before final PowerPoint assembly, send `deck_reviewer`:
- research package paths
- user-approved `deck_storyboard.md`
- `slides_content_plan.md`
- `slides_visual_plan.md`
- `prompts.md`
- `deck-source-index.md`
- `slide-generation-log.md`
- candidate slide image paths

Fix all blocking `Deck Fix` findings and reroute research problems as `Research Gap`.

### Step 7 - Assemble the deck

Use the local scripts when needed:
- [compose_style_pack_blocks.py](scripts/compose_style_pack_blocks.py)
- [create_style_pack.py](scripts/create_style_pack.py)
- [build_images_only_pptx.py](scripts/build_images_only_pptx.py)

Only assemble `deck_images_only.pptx` after internal review passes. The assembled deck must follow the user-approved `deck_storyboard.md`.

After final delivery, classify any user feedback and route it to the responsible owner. If final slide images change, send the revised slide package back through `deck_reviewer`.

### Step 8 - Route production issues correctly

If the problem is weak research, unsupported claims, or unusable upstream wording, route it back to `deep_researcher`.
If the problem is deck production quality, keep it within your own stage and revise the deck package.
