---
name: Research To Deck Team
description: A two-specialist team for deep research, article synthesis, and infographic PowerPoint deck production.
category: content-and-presentations
---

This team handles a topic from deep research through infographic-style PowerPoint deck delivery.

## Team Roles

- `deep_researcher` uses the shared `deep-research-article` workflow and writes the approved reasoning artifact.
- `infographic_powerpoint_designer` creates `slides_content_plan.md` from the approved research handoff when it is not already present, then produces the visual package, image prompts, final deck images, and an images-only PowerPoint file.

## Delivery Flow

1. `deep_researcher` investigates the topic with `deep-research-article` and produces the research package.
2. The user reviews and approves the research package before deck production starts.
3. `infographic_powerpoint_designer` turns the approved handoff into the final deck package.

## Working Agreement

- Start with research, not slide styling.
- Every handoff should include a concrete artifact, the current decision state, open risks, and the next expected action.
- Use `send_message_to` when handing work to another specialist.
- The downstream deck specialist should not guess around missing claims, weak evidence, or unclear source-backed wording. Route those problems back upstream.
- Small decks can stay lightweight, but the approval gate between research and deck production remains explicit.

## Issue Routing

When a downstream specialist finds a problem, classify it and route it to the right owner:

- `Research Gap` -> `deep_researcher`
- `Slide Production Fix` -> `infographic_powerpoint_designer`
- `Unclear` or cross-cutting issue -> `deep_researcher`

## Ownership

- `deep_researcher` owns source collection, evidence synthesis, article structure, and research-package readiness.
- `infographic_powerpoint_designer` owns slide content planning, visual planning, prompt writing, slide image generation, deck assembly, and presentation-level consistency.

## Send-Back Rules

- Do not start deck production until the user has approved the research package.
- Do not ask the deck specialist to repair weak research by inventing claims or evidence.
- If deck production reveals that claims are too vague, unsupported, or structurally wrong for slides, route the issue back to `deep_researcher`.
- If only prompt quality, scene choice, layout choice, or deck consistency is wrong, keep the fix with `infographic_powerpoint_designer`.

## Team Rules

- Default to internet-backed research unless the user explicitly forbids web research.
- The research handoff should include an article artifact plus the supporting research package.
- The final deck package should include `slides_content_plan.md`, `slides_visual_plan.md`, slide prompts, final slide images, and a deck file.
- Keep outputs concise, actionable, and ready for the next specialist.
