---
name: Manga Video Studio Team
description: A story-first creative production team for original manga canon design, consistent image generation, and optional narrated motion-comic video delivery.
category: creative-media
---

This team handles an original manga project from concept and character canon through storyboard, manga-style image generation, and, when requested, narrated motion-comic video delivery.

This team definition is intentionally lightweight.
`manga_showrunner` is the coordinator entry specialist for this team.
There is no separate standalone orchestrator beyond the listed specialists.
Each specialist does its own work, follows its own bundled agent and skill definition, and hands work to the next relevant specialist when ready.

Detailed production rules, artifact schemas, media-generation rules, QA gates, and role-specific execution steps belong in `shared/production-principles.md` and each member's bundled `SKILL.md`, not in this team file.

## Shared Principles

- The canonical shared production reference is `shared/production-principles.md`.
- Each member folder has a local `production-principles.md` symlink to that shared file, so specialists can read it as a nearby agent-local reference.
- Member skills may add narrower role-specific rules, but they should not silently contradict the shared production principles.

## Team Members

- `manga_showrunner`: owns concept, story engine, world rules, character canon, chapter planning, and final canon sync.
- `storyboard_director`: owns the production storyboard, render-unit planning, pacing, and continuity handoff.
- `manga_illustrator`: owns visual style locking, reusable character references, prompt packages, image generation/editing, visual QA, and visual handoff.
- `voice_video_producer`: owns narration or dialogue packaging, speech generation, subtitles, video assembly, export QA, and chapter carry-forward notes.

## Communication

- Use `send_message_to` for specialist handoffs.
- Every handoff should include the current decision state, open risks, next expected action, and absolute filesystem paths for all still-relevant artifacts.
- Handoffs should be cumulative enough that the receiving specialist can continue without relying on hidden model context.
- If a downstream specialist finds a missing or contradictory upstream decision, route the issue back to the owning specialist instead of silently inventing around it.

## Delivery Flow

1. `manga_showrunner` starts the run, prepares or refreshes the series and chapter planning package, and sends the approved story package to `storyboard_director`.
2. `storyboard_director` turns the approved story package into a renderable storyboard and continuity package, then sends it to `manga_illustrator`.
3. `manga_illustrator` produces the visual package and sends the cumulative package to `voice_video_producer` when voiced or video delivery is in scope.
4. `voice_video_producer` produces the voice, subtitle, video, and carry-forward package when applicable.
5. `manga_showrunner` syncs final canon and chapter state after the chapter package is complete.

## Issue Routing

- `Story Direction Gap` -> `manga_showrunner`
- `Canon Gap` -> `manga_showrunner`
- `Storyboard Revision` -> `storyboard_director`
- `Visual Consistency Fix` -> `manga_illustrator`
- `Audio Or Edit Fix` -> `voice_video_producer`
- `Unclear` -> `manga_showrunner`

## Ownership Boundaries

- Do not let downstream specialists casually mutate story canon, character identity, or world rules. Route those changes to `manga_showrunner`.
- Do not ask `manga_illustrator` to repair an unclear storyboard by inventing missing story beats. Route storyboard gaps to `storyboard_director`.
- Do not ask `voice_video_producer` to hide story or visual gaps with extra narration, timing tricks, or filler dialogue.
- Keep fixes with the specialist who owns the failing artifact unless the issue exposes an upstream decision gap.
