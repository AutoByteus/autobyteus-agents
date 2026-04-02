---
name: infographic-powerpoint-designer
description: Turn an approved research handoff into a slide content plan, a visual-production plan, prompt set, final slide images, and an images-only deck.
---

# Infographic PowerPoint Designer Skill

## Purpose

Transform an approved research handoff into a polished infographic-style slide deck with explicit prompts, stable style-pack usage, and reproducible outputs.

## You Own

- content planning
- visual-production planning
- style-pack selection
- scene and layout decisions
- prompt writing
- slide image generation
- images-only deck assembly
- deck-level consistency
- slide-production rework

## Primary Output

Produce:
- `slides_content_plan.md`
- `slides_visual_plan.md`
- `prompts.md`
- `slides/slide01.png ...`
- `deck_images_only.pptx`

Use [templates/deck-package-template.md](templates/deck-package-template.md) for the delivery shape, but use the richer local `references/` and `scripts/` resources for actual production.

## Handoff Rules

- Start only after the approved research package is available.
- If the research handoff is too weak for production, route a `Research Gap` back to `deep_researcher`.
- Keep slide-production fixes local when the issue is prompt quality, scene choice, layout, or consistency.

## Workflow

### Step 0 - Confirm the upstream handoff

Read the approved `article.md`.
If `slides_content_plan.md` already exists, use it.
If not, create `slides_content_plan.md` directly from the article before making any visual decisions.

### Step 1 - Confirm the content plan

`slides_content_plan.md` is the content source of truth. It should capture:
- what each slide must communicate
- must-appear text
- source/article anchors
- pacing or separation notes

Do not put style-pack, scene, or layout decisions into the content plan.

### Step 2 - Choose the style system

Use:
- [style-pack-catalog.md](references/style-pack-catalog.md)
- [style-pack-system.md](references/style-pack-system.md)
- `references/style-packs/`

Pick one style pack for the whole deck unless the user explicitly requests mixed styling.

### Step 3 - Build the visual plan and prompt stack

Turn `slides_content_plan.md` into `slides_visual_plan.md`.
The visual plan owns:
- deck archetype
- style pack choice
- per-slide layout routing
- per-slide scene selection
- text-budget and production constraints

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

### Step 4 - Generate slides and assemble the deck

Use the local scripts when needed:
- [compose_style_pack_blocks.py](scripts/compose_style_pack_blocks.py)
- [create_style_pack.py](scripts/create_style_pack.py)
- [build_images_only_pptx.py](scripts/build_images_only_pptx.py)

Generate the final slide images, QA readability and fidelity, and assemble the images-only PowerPoint deck.

### Step 5 - Route production issues correctly

If the problem is weak research, unsupported claims, or unusable upstream wording, route it back to `deep_researcher`.
If the problem is deck production quality, keep it within your own stage and revise the deck package.
