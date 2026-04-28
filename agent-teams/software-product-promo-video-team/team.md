---
name: Software Product Promo Video Team
description: A product-marketing video team for software products, mobile apps, websites, SaaS tools, and digital services.
category: creative-media
---

This team creates English-language software product promotional videos from user-provided product context, screenshots, screen recordings, links, brand assets, rough notes, or existing marketing material.

In English, the natural term for this deliverable is usually `promotional video`, `product promo video`, `product marketing video`, or `software product explainer`, depending on the context.

This team file defines the team identity, member boundaries, communication rules, and top-level delivery flow.
`product_promo_strategist` is the coordinator entry specialist for this team.
There is no separate standalone orchestrator beyond the listed specialists.
Each specialist does its own work, follows its own bundled agent and skill definition, and hands work to the next relevant specialist when ready.

Detailed production rules, artifact schemas, media-generation rules, QA gates, and role-specific execution steps belong in `shared/promo-production-principles.md` and each member's bundled `SKILL.md`.

## Shared Principles

- The canonical shared production reference is `shared/promo-production-principles.md`.
- Each member folder has a local `promo-production-principles.md` symlink to that shared file, so specialists can read it as a nearby agent-local reference.
- Member skills may add narrower role-specific rules, but they should not silently contradict the shared promo production principles.

## Team Members

- `product_promo_strategist`: owns intake, product/audience research, positioning, claims discipline, project scope, and final message alignment.
- `promo_script_storyboarder`: owns narrative structure, promotional script, audio-informed storyboard, which product or UI moment should support each spoken line, motion intent, and CTA flow.
- `product_visual_director`: owns visual direction, screenshot and screen-recording inventory, visual asset planning, UI readability, brand treatment, annotations, motion-graphics treatment design, and precise asset-production requirements.
- `promo_visual_asset_producer`: owns producing polished still assets, source-based edited screenshots, generated support visuals, callout/highlight frames, and the visual asset production log.
- `promo_visual_asset_reviewer`: owns the visual asset QA and user visual approval gate before video production, including callout accuracy, truthfulness, readability, aspect ratio, sensitive-data checks, and user visual feedback routing.
- `promo_video_producer`: owns the early voiceover timing pass, audio generation, measured clip durations, subtitles, music or sound treatment, motion-graphics implementation from approved assets, segment assembly, concatenation, export QA, and delivery package.

## Communication

- Use `send_message_to` for specialist handoffs.
- Every handoff should include the current decision state, open risks, and next expected action.
- Handoffs should be cumulative enough that the receiving specialist can continue without relying on hidden model context.
- If a downstream specialist finds a missing or contradictory upstream decision, route the issue back to the owning specialist instead of silently inventing around it.

## Artifact Visibility And Approval

- Every `send_message_to` handoff should include absolute filesystem paths for all still-relevant upstream artifacts produced so far, not only the latest local artifact.
- Downstream specialists should be able to read the cumulative promo package without reconstructing earlier decisions from chat history.
- `product_promo_strategist` must present `product-promo-brief.md` to the user for approval before treating positioning, promise, allowed claims, CTA, channel, aspect ratio, duration preference, or hard duration limit as approved downstream input.
- `promo_script_storyboarder` must present the spoken script and on-screen copy in `promo-script.md` to the user for approval before any audio or visual production begins.
- `promo_video_producer` must generate and measure the approved voiceover before `promo_script_storyboarder` finalizes `promo-storyboard.md`.
- If measured audio is too long, too rushed, awkward, or outside a real hard duration limit, route it back to `promo_script_storyboarder` for script revision and user reapproval before visual production.
- `promo_visual_asset_reviewer` must present the visual asset package to the user only after internal review has no remaining blocking findings.
- User visual approval must be recorded in `visual-asset-review-report.md`. If the user requests changes, route the feedback through `promo_visual_asset_reviewer` before video production continues.
- Default cumulative package:
  - `promo_script_storyboarder`: approved product promo brief, research notes when present, source asset inventory when present
  - `promo_video_producer` early audio pass: approved product promo brief, approved promo script, research notes when present, source asset inventory when present
  - `promo_script_storyboarder` storyboard pass: approved product promo brief, approved promo script, voiceover package, audio generation log
  - `product_visual_director`: approved product promo brief, research notes when present, source asset inventory when present, approved promo script, voiceover package, audio generation log, promo storyboard
  - `promo_visual_asset_producer`: approved product promo brief, research notes when present, source asset inventory when present, approved promo script, voiceover package, audio generation log, promo storyboard, visual asset plan, screen capture log when present
  - `promo_visual_asset_reviewer`: approved upstream package, research notes when present, source asset inventory when present, visual asset plan, screen capture log when present, visual asset production log, candidate visual assets
  - `promo_video_producer` final assembly: approved product promo brief, research notes when present, source asset inventory when present, approved promo script, voiceover package, audio generation log, promo storyboard, visual asset plan, screen capture log when present, visual asset production log, user-approved visual asset review report, approved visual assets
  - `product_promo_strategist` final review: final delivery report, video edit package, final export path, plus the approved upstream package
- If a downstream specialist finds that an approved brief or script is weak, inaccurate, or too vague, route it back to the owning specialist before continuing production.

## Delivery Flow

1. `product_promo_strategist` starts the run, studies the supplied product context, researches only when useful and appropriate, prepares the product promo brief, gets user approval for the key positioning and claim basis, and sends the approved package to `promo_script_storyboarder`.
2. `promo_script_storyboarder` turns the approved brief into `promo-script.md`, gets user approval for the spoken lines and on-screen copy, and sends the approved script package to `promo_video_producer` for the early voiceover timing pass.
3. `promo_video_producer` generates the approved voiceover clips, measures real clip durations, records `voiceover-package.md` and `audio-generation-log.md`, and routes back to `promo_script_storyboarder` if the spoken result needs script revision and user reapproval.
4. `promo_script_storyboarder` uses the approved measured audio package to create `promo-storyboard.md` with segment-level visual intent and motion intent, then sends the audio-informed storyboard package to `product_visual_director`.
5. `product_visual_director` prepares the visual asset plan, screenshot or recording requirements, motion-graphics treatment design, generated or edited promo visual requirements, and sends the visual package to `promo_visual_asset_producer`.
6. `promo_visual_asset_producer` creates the candidate visual assets and production log, then sends the package to `promo_visual_asset_reviewer`.
7. `promo_visual_asset_reviewer` reviews the assets and sends `Visual Asset Fix` back to `promo_visual_asset_producer` for every blocking issue. This internal fix/review loop may repeat multiple times; only when the reviewer finds no remaining blocking problems does the reviewer present the visual package to the user. If the user requests changes, the reviewer routes the feedback to the owning specialist; if the user approves, the reviewer passes the approved visual package to `promo_video_producer`.
8. `promo_video_producer` builds each audio-led video segment from approved visual assets, concatenates the segments in approved script order, produces subtitles, motion graphics, edit package, final video, and delivery QA report.
9. `product_promo_strategist` can review the final package for message accuracy and claim discipline before external publication.

## Issue Routing

- `Positioning Gap` -> `product_promo_strategist`
- `Unsupported Claim` -> `product_promo_strategist`
- `Script Or Storyboard Revision` -> `promo_script_storyboarder`
- `Missing Or Weak Visual Asset` -> `product_visual_director`
- `Visual Asset Production` -> `promo_visual_asset_producer`
- `Visual Asset Fix` -> `promo_visual_asset_producer`
- `Visual Asset Review` -> `promo_visual_asset_reviewer`
- `User Visual Feedback` -> `promo_visual_asset_reviewer`
- `Audio Or Edit Fix` -> `promo_video_producer`
- `Final Visual Asset Defect` -> `promo_visual_asset_reviewer`
- `Unclear` -> `product_promo_strategist`

## Ownership Boundaries

- Do not let downstream specialists invent product capabilities, customer proof, pricing, integrations, awards, security claims, or metrics. Route those questions to `product_promo_strategist`.
- Do not ask `product_visual_director` to hide a weak story with decorative visuals or decide the core story. Route narrative gaps and missing story-level product moments to `promo_script_storyboarder`.
- Do not ask `promo_video_producer` to repair bad still assets, misplaced callouts, or unreviewed generated visuals. Route those issues through `promo_visual_asset_reviewer` and `promo_visual_asset_producer`.
- Do not ask `promo_video_producer` to fix inaccurate positioning with louder music, faster cuts, or filler narration.
- Keep fixes with the specialist who owns the failing artifact unless the issue exposes an upstream decision gap.
