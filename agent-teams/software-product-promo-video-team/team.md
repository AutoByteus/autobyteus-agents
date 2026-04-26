---
name: Software Product Promo Video Team
description: A product-marketing video team for software products, mobile apps, websites, SaaS tools, and digital services.
category: creative-media
---

This team creates English-language software product promotional videos from user-provided product context, screenshots, screen recordings, links, brand assets, rough notes, or existing marketing material.

In English, the natural term for this deliverable is usually `promotional video`, `product promo video`, `product marketing video`, or `software product explainer`, depending on the context.

This team definition is intentionally lightweight.
`product_promo_strategist` is the coordinator entry specialist for this team.
There is no separate standalone orchestrator beyond the listed specialists.
Each specialist does its own work, follows its own bundled agent and skill definition, and hands work to the next relevant specialist when ready.

Detailed production rules, artifact schemas, media-generation rules, QA gates, and role-specific execution steps belong in `shared/promo-production-principles.md` and each member's bundled `SKILL.md`, not in this team file.

## Shared Principles

- The canonical shared production reference is `shared/promo-production-principles.md`.
- Each member folder has a local `promo-production-principles.md` symlink to that shared file, so specialists can read it as a nearby agent-local reference.
- Member skills may add narrower role-specific rules, but they should not silently contradict the shared promo production principles.

## Team Members

- `product_promo_strategist`: owns intake, product/audience research, positioning, claims discipline, project scope, and final message alignment.
- `promo_script_storyboarder`: owns narrative structure, promotional script, storyboard, shot timing, motion intent, and CTA flow.
- `product_visual_director`: owns screenshot and screen-recording inventory, visual asset planning, UI readability, brand treatment, annotations, motion-graphics treatment design, generated supporting visuals, and visual handoff.
- `promo_video_producer`: owns voiceover, audio generation, subtitles, music or sound treatment, motion-graphics implementation, edit assembly, export QA, and delivery package.

## Communication

- Use `send_message_to` for specialist handoffs.
- Every handoff should include the current decision state, open risks, next expected action, and absolute filesystem paths for all still-relevant artifacts.
- Handoffs should be cumulative enough that the receiving specialist can continue without relying on hidden model context.
- If a downstream specialist finds a missing or contradictory upstream decision, route the issue back to the owning specialist instead of silently inventing around it.

## Delivery Flow

1. `product_promo_strategist` starts the run, studies the supplied product context, researches only when useful and appropriate, prepares the product promo brief, and sends it to `promo_script_storyboarder`.
2. `promo_script_storyboarder` turns the approved brief into a promotional script and storyboard with shot-level motion intent, then sends the package to `product_visual_director`.
3. `product_visual_director` prepares the visual asset plan, screenshot or recording requirements, motion-graphics treatment design, generated supporting visual prompts when needed, and sends the visual package to `promo_video_producer`.
4. `promo_video_producer` produces the voiceover, subtitles, motion graphics, edit package, final video, and delivery QA report.
5. `product_promo_strategist` can review the final package for message accuracy and claim discipline before external publication.

## Issue Routing

- `Positioning Gap` -> `product_promo_strategist`
- `Unsupported Claim` -> `product_promo_strategist`
- `Script Or Storyboard Revision` -> `promo_script_storyboarder`
- `Missing Or Weak Visual Asset` -> `product_visual_director`
- `Audio Or Edit Fix` -> `promo_video_producer`
- `Unclear` -> `product_promo_strategist`

## Ownership Boundaries

- Do not let downstream specialists invent product capabilities, customer proof, pricing, integrations, awards, security claims, or metrics. Route those questions to `product_promo_strategist`.
- Do not ask `product_visual_director` to hide a weak story with decorative visuals. Route narrative gaps to `promo_script_storyboarder`.
- Do not ask `promo_video_producer` to fix inaccurate positioning with louder music, faster cuts, or filler narration.
- Keep fixes with the specialist who owns the failing artifact unless the issue exposes an upstream decision gap.
