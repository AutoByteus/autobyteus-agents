# Research To Deck Production Principles

Use this file as the shared operating contract for the research-to-deck team.

## 1. Research Before Slide Planning

- The research package is the internal source of truth for deck claims.
- The user is not expected to review every research support file by default.
- The primary user-facing approval artifact is the slide plan / deck storyboard, not the full research package.
- Do not start slide image generation until the user has approved the slide plan / deck storyboard.
- Do not invent claims, evidence, statistics, quotes, dates, diagrams, or implications to make a slide feel stronger.
- If a claim is too weak, too vague, or unsupported for slide use, route a `Research Gap` back to `deep_researcher`.

## 2. Durable Research Package

The research package should include:

- `article.md`
- `research_notes.md`
- `claim_evidence_ledger.md`
- `research-resource-index.md`

`research-resource-index.md` is the single combined source/resource index. It records what was read or supplied, what each source contains, credibility or limitation notes when useful, and what the deck team can use from it. It helps downstream deck work avoid relying on hidden chat memory.
`research_notes.md` contains working notes, source reading notes, important evidence extracts, quotes, figures, definitions, examples, constraints, and reasoning that should not clutter the article or resource index.

## 3. Deck Storyboard And Plans

The deck package should include:

- `deck_storyboard.md`
- `slides_visual_plan.md`
- `prompts.md`
- `deck-source-index.md`
- `slide-generation-log.md`
- `slide-review-report.md`
- `deck_images_only.pptx`
- `slides/slide01.png ...`

`deck_storyboard.md` is the main user-facing slide plan. It owns what each slide must communicate, must-appear text, slide-by-slide narrative flow, core message, evidence anchors, visual job, pacing, sequence, and input resource candidates.
`slides_visual_plan.md` owns style pack, layout, scene, visual hierarchy, text budget, per-slide production choices, factual prompt-grounding inputs, and concrete image-tool input strategy for each slide.

Ask the user to review `deck_storyboard.md` before generating slide images. Do not ask the user to review `research-resource-index.md`, `research_notes.md`, or `claim_evidence_ledger.md` unless a high-risk research decision needs explicit confirmation or the user asks to inspect the evidence.

## 3a. Slide Resource Grounding

- Every slide must connect back to `research-resource-index.md`, `claim_evidence_ledger.md`, or both.
- Slide inputs can be text passages, notes, PDFs, URLs, local files, screenshots, charts, diagrams, photos, brand assets, or source images.
- `deck_storyboard.md` should identify candidate resource IDs for each slide.
- `slides_visual_plan.md` must split those resources into factual prompt-grounding inputs and image-tool inputs.
- Factual prompt-grounding inputs are text/file/URL/source content the designer must read before prompt writing.
- Image-tool inputs are image paths to pass into `generate_image` when supported or `edit_image`.
- If relevant user-provided product/source assets exist, identify the exact resource IDs and explain how they will be used.
- If a slide uses no image input even though relevant source images exist, record the reason in `slides_visual_plan.md` and `deck-source-index.md`.
- The final prompt or edit instruction must be grounded in the selected resource IDs. The designer should read relevant text/file resources before prompt writing so prompts are factual and do not come from nowhere.
- Do not create slide visuals that feel unrelated to the user's product, source material, or approved deck story.

## 4. Image-Only Slide Rule

- Final PowerPoint decks are image-only by default: each slide in the deck is a full-slide image placed into a blank PowerPoint slide.
- Every slide-image creation or modification operation must use `generate_image` or `edit_image`.
- This includes composition, text placement, labels, callouts, overlays, highlights, arrows, crop/pad/resize, cleanup, redaction, polish, chart/image adaptation, and final slide rendering.
- Do not use Python/PIL, scripts, presentation tools, screenshots, HTML/canvas rendering, or manual image composition to create or modify slide images.
- Deterministic scripts may assemble internally reviewed slide images into a `.pptx`, inspect files, render previews, or perform non-image validation, but they must not create, modify, crop, resize, overlay, annotate, or repair slide images.
- Raw screenshots, charts, or source images must be passed through `generate_image` or `edit_image` before they become slide images.

## 5. Image Tool Use

- The deck designer has exactly two image creation/editing tools: `generate_image` and `edit_image`.
- Use `generate_image` for new full-slide images from a self-contained slide prompt.
- Use `edit_image` to correct a generated slide image, preserve a style while fixing text/readability/layout, polish a supplied source image, or adapt an indexed image into a stronger slide.
- Use `edit_image` for any image operation that would otherwise be done by script, including adding text, arrows, highlights, masks, rectangles, overlays, redactions, zoomed crops, or layout corrections.
- For `generate_image`, omit `generation_config`; put aspect ratio, orientation, language, required text, and layout requirements in the prompt itself.
- Do not pass a model identifier just to choose a model or aspect ratio.
- Every final slide prompt must state that the output is one 16:9 horizontal widescreen slide image.

## 6. Serial Image Calls And Logging

- `generate_image` and `edit_image` calls are serial-only. Call exactly one, wait for the result, inspect the actual output image, log the decision, then run `sleep 60` before the next image call.
- Do not dispatch multiple slide image calls in the background or as a parallel batch.
- The 60-second cooldown applies after candidate, rejected, timed-out, failed, and accepted image calls.
- Record every material image call in `slide-generation-log.md`, including prompt/edit instruction, tool used, input images, output path, self-check decision, defects, retry reason, and cooldown status.
- `deck-source-index.md` must stay current with the latest candidate and reviewed image path for each slide, plus the prompt-grounding resource IDs and image-input resource IDs used to create it.

## 7. Slide Self-Check

After every `generate_image` or `edit_image` call, `infographic_powerpoint_designer` must inspect the actual slide image before deciding the next action.

Check:

- 16:9 horizontal format
- readable title and body text
- exact required text fidelity
- no extra words, watermark, random characters, or wrong language
- claim and source alignment with the research package and user-approved deck storyboard
- visual hierarchy and spacing
- style consistency across the deck
- no misleading chart, diagram, icon, or visual metaphor
- no sensitive or user-private information

Each output must be marked as `candidate passed self-check`, `needs edit`, `rejected`, or `blocked`.
If the output is close but flawed, queue a follow-up `edit_image` call after the required cooldown. If it is fundamentally wrong, reject it and regenerate with a corrected prompt after the cooldown.

## 8. Review Gate

- `deck_reviewer` must review slide images before final deck assembly or user delivery.
- Missing designer self-check evidence is a blocking process defect.
- Internally failed, rejected, or unreviewed slide images must not be assembled into `deck_images_only.pptx`.
- User feedback after final delivery is routed by issue type: slide/image issues to `infographic_powerpoint_designer`, research/claim issues to `deep_researcher`.

## 9. Assembly And QA

- `infographic_powerpoint_designer` assembles the final `.pptx` only from internally reviewed slide images that follow the user-approved deck storyboard.
- The final deck QA must verify slide count, image order, 16:9 sizing, full-slide image placement, readability, source-backed claims, and absence of placeholders.
