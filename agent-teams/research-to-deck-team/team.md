---
name: Research To Deck Team
description: A three-specialist team for deep research, user-approved slide planning, image-only slide production, and independent deck review.
category: content-and-presentations
---

This team handles a topic from research through an image-based PowerPoint deck. It follows the same team-local skill pattern as other agent teams: each specialist owns its own bundled workflow, while shared production rules live in the team `shared/` folder and are linked into the agents that need them.

## Team Roles

- `deep_researcher` owns research, evidence synthesis, `article.md`, `research-resource-index.md`, and the internal research package.
- `infographic_powerpoint_designer` owns the user-facing slide plan / deck storyboard, slide content planning, visual planning, prompts, generated or edited slide images, slide self-checks, and final images-only PowerPoint assembly.
- `deck_reviewer` owns independent review of generated or edited slide images before final deck assembly and user delivery.

## Delivery Flow

1. `deep_researcher` investigates the topic and produces the research package.
2. `infographic_powerpoint_designer` creates `slides_content_plan.md` and the user-facing `deck_storyboard.md`.
3. The user reviews `deck_storyboard.md`. If the user gives feedback, route it to the responsible owner and ask for slide-plan approval again.
4. After slide-plan approval, `infographic_powerpoint_designer` creates `slides_visual_plan.md`, `prompts.md`, `deck-source-index.md`, `slide-generation-log.md`, and candidate slide images.
5. `deck_reviewer` reviews the actual slide images and supporting artifacts.
6. The designer and reviewer loop until there are no blocking deck findings.
7. `infographic_powerpoint_designer` assembles `deck_images_only.pptx` from internally reviewed slide images that follow the user-approved deck storyboard.
8. The final deck is delivered to the user. If the user gives feedback, route it to the responsible owner and repeat the relevant stage.

## Working Agreement

- Start with research, not slide styling.
- Every handoff must include a concrete artifact, decision state, open risks, and next expected action.
- Use `send_message_to` for specialist handoffs.
- Do not ask a downstream specialist to repair weak research by inventing claims, evidence, or source-backed wording.
- Treat user feedback as a first-class decision event. Record what changed, which artifacts were updated, and whether slide-plan approval is still pending.
- Do not ask the user to review every research support artifact by default. The default user approval artifact is `deck_storyboard.md`.
- Do not generate slide images until the user approves `deck_storyboard.md`.

## Issue Routing

When a downstream specialist finds a problem, classify it and route it to the right owner:

- `Research Gap` -> `deep_researcher`
- `Deck Fix` -> `infographic_powerpoint_designer`
- `User Slide-Plan Feedback` -> `infographic_powerpoint_designer`, unless it changes claims or evidence
- `User Research Feedback` -> `deep_researcher` when the feedback changes claims, sources, argument, or research direction
- `User Final Deck Feedback` -> classify as `Deck Fix` or `Research Gap`
- `Review Finding` -> `deck_reviewer` records it, then routes to the responsible owner
- `Unclear` or cross-cutting issue -> `deep_researcher` as coordinator

## Ownership

- `deep_researcher` owns source collection, evidence extraction, article structure, claim/evidence mapping, resource indexing, and research-package readiness.
- `infographic_powerpoint_designer` owns slide narrative planning, visual planning, prompt writing, slide image generation/editing, slide self-checks, source indexing for deck assets, and deck assembly.
- `deck_reviewer` owns independent review for text fidelity, readability, source alignment, image-tool provenance, style consistency, and assembly readiness.

## Team Rules

- Default to internet-backed research unless the user explicitly forbids web research.
- The research handoff must include `article.md`, `research-resource-index.md`, and supporting research artifacts.
- The main user review artifact is `deck_storyboard.md`, which should make the story, slide sequence, core messages, and evidence anchors easy to approve or revise.
- Final slide images must be outputs from `generate_image` or `edit_image`.
- The designer must inspect each generated or edited slide image and record the result before moving on.
- `generate_image` and `edit_image` are serial-only with a 60-second cooldown after every candidate, failed, rejected, timed-out, edited, or accepted image call.
- Keep outputs concise, actionable, and ready for the next specialist.
