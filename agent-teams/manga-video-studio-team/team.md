---
name: Manga Video Studio Team
description: A story-first creative production team for original manga canon design, consistent image generation, and narrated motion-comic video delivery.
category: creative-media
---

This team handles an original manga project from concept and character canon through storyboard, manga-style image generation, and final narrated motion-comic video delivery.

This team definition is intentionally lightweight.
`manga_showrunner` is the coordinator entry specialist for this team.
There is no separate standalone orchestrator beyond the listed specialists.
Each specialist does its own work, follows its own bundled agent and skill definition, and hands work to the next relevant specialist when ready.

## Shared Principles Rule

- `manga_showrunner`, `storyboard_director`, `manga_illustrator`, and `voice_video_producer` should all read `shared/production-principles.md` before doing substantive work.
- That file is the team's shared canon for pilot scoping, character consistency, continuity handling, visual mode, and video-delivery realism.
- Agent-specific skills may add narrower production rules, but they should not silently contradict the shared production principles.

## Artifact Layout Rule

- The team should work inside the user-selected workspace root for the run, not inside the team-definition repository itself.
- If the workspace holds multiple manga projects, keep each series in its own durable subfolder under that workspace.
- `manga_showrunner` is responsible for deciding whether to reuse an existing matching series root or bootstrap a new one for the requested series.
- Use one durable series root instead of a disposable one-run folder.
- The series root should keep the cross-chapter canon and reusable assets:
  - `series-bible.md`
  - `character-bible.md`
  - `character-registry.md`
  - `series-state.md`
  - `chapter-registry.md`
  - `shared-assets/character-sheets/`
  - `shared-assets/location-references/` when relevant
  - `shared-assets/style-references/` when relevant
- Each chapter should have its own folder, for example `chapters/ch01/`, `chapters/ch02/`, and so on.
- Chapter folders should keep the chapter-local production trail:
  - `chapter-plan.md`
  - `storyboard.md`
  - `continuity-ledger.md`
  - `visual-style-guide.md`
  - `prompt-pack.md`
  - `image-generation-log.md`
  - `visual-production-package.md`
  - `voice-package.md`
  - `audio-generation-log.md`
  - `subtitles.srt`
  - `video-package.md`
  - `chapter-carry-forward.md`
  - `final/`

## Artifact Visibility Rule

- Every `send_message_to` handoff should include absolute filesystem paths for all still-relevant upstream artifacts, not only the newest local file.
- Default cumulative package:
  - `storyboard_director`: `series-bible.md`, `character-bible.md`, `character-registry.md`, `series-state.md`, `chapter-registry.md`, current chapter `chapter-plan.md`
  - `manga_illustrator`: root canon files plus current chapter `chapter-plan.md`, `storyboard.md`, `continuity-ledger.md`
  - `voice_video_producer`: root canon files plus current chapter `chapter-plan.md`, `storyboard.md`, `continuity-ledger.md`, `visual-style-guide.md`, `prompt-pack.md`, `image-generation-log.md`, `visual-production-package.md`, reusable character sheets, generated page or panel assets
  - `manga_showrunner` on final canon sync: the full current package plus `chapter-carry-forward.md`
- Downstream specialists should be able to continue the series later without rediscovering prompts, edits, approved assets, or canon deltas from memory.

## Team Roles

- `manga_showrunner`: owns the original concept, story engine, world rules, character canon, the living character registry, scope control, chapter planning, and final cross-chapter canon sync. This role is the reset point when downstream work exposes a canon gap or a major story-direction problem.
- `storyboard_director`: turns the approved story package into a production-ready storyboard and continuity ledger for manga pages and motion-comic pacing.
- `manga_illustrator`: locks the visual style, creates reusable character reference sheets, writes prompt packs, logs image-generation and image-edit operations, generates the manga page or panel assets, and manages visual-consistency rework.
- `voice_video_producer`: adapts the visual package into speech assets, logs speech generation settings and exact spoken text, assembles subtitles, builds the motion-comic style final video, and records the carry-forward package for the next chapter.

## Delivery Flow

1. `manga_showrunner` creates the durable series root and writes the upstream canon package: `series-bible.md`, `character-bible.md`, `character-registry.md`, `series-state.md`, `chapter-registry.md`, and the current chapter folder with `chapter-plan.md`.
2. By default, the team should prefer a strong pilot package over a sprawling multi-volume promise. Unless the user explicitly requests otherwise, the first production unit is one pilot chapter or one short episode-ready arc.
3. If the user wants an explicit creative approval gate, stop after the showrunner package before heavy illustration and video production.
4. `storyboard_director` turns the approved canon into chapter-local `storyboard.md` and `continuity-ledger.md`.
5. `manga_illustrator` produces the reusable visual package: chapter-local `visual-style-guide.md`, `prompt-pack.md`, `image-generation-log.md`, reusable reference sheets in `shared-assets/`, page or panel images, and `visual-production-package.md`.
6. `voice_video_producer` produces chapter-local `voice-package.md`, `audio-generation-log.md`, audio clips, subtitles, `video-package.md`, `chapter-carry-forward.md`, and the final motion-comic video.
7. `manga_showrunner` refreshes `character-registry.md`, `series-state.md`, and `chapter-registry.md` from the completed chapter package so later chapters inherit approved canon, cast changes, reusable assets, and open hooks.

## Working Agreement

- Start with canon, not rendering.
- After the series canon exists, storyboard comes first for each chapter. Do not start image production or audio production from a loose chapter summary alone.
- Before image generation starts, the team must declare the chapter render-unit contract in the storyboard package:
  - `page-composed`
  - `panel-first`
  - `key-asset preview`
- `key-asset preview` is preview-only work and must never be treated as a completed chapter unless the user explicitly asked for preview-only output.
- Default delivery is a narrated motion-comic style video assembled from generated manga images. Do not imply full frame-by-frame animation unless the user explicitly asks for it and the environment supports it.
- Keep story direction, character identity, continuity, visual locking, and final edit scope explicit in the artifacts rather than leaving them implicit.
- Treat prompts, tool settings, edit inputs, approved outputs, and speech text as durable production data. Do not leave them only in the model context.
- Before final video export, `voice_video_producer` must build an explicit render timing map that assigns every page or panel asset its planned start and end time plus the linked subtitle or audio beat coverage.
- A chapter video is not complete until the exported file itself has been checked against the intended render timing map. Planned timings alone are not sufficient.
- Use `send_message_to` when handing work to another specialist.
- A downstream role should not silently patch over weak canon by inventing missing motives, missing designs, or contradictory scene logic.

## Issue Routing

- `Story Direction Gap` -> `manga_showrunner`
- `Canon Gap` -> `manga_showrunner`
- `Storyboard Revision` -> `storyboard_director`
- `Visual Consistency Fix` -> `manga_illustrator`
- `Audio Or Edit Fix` -> `voice_video_producer`
- `Unclear` -> `manga_showrunner`

## Ownership

- `manga_showrunner` owns premise quality, world logic, character identity, scale discipline, chapter-level narrative architecture, and the carry-forward canon after each completed chapter.
- `manga_showrunner` must keep the series ready for late character introductions, returning characters, and inactive characters across long chapter runs.
- `storyboard_director` owns scene order, page and panel planning, pacing, shot logic, and continuity bookkeeping.
- `manga_illustrator` owns style selection, character-sheet quality, prompt quality, image-generation logging, page or panel rendering, and asset-level consistency.
- `voice_video_producer` owns narration or dialogue packaging, speech-generation logging, voice continuity, subtitle fidelity, motion-comic timing, final assembly, and the chapter carry-forward report.

## Send-Back Rules

- Do not let downstream specialists mutate canon casually. If the plot, motive, character design, or world rule is wrong, route it back to `manga_showrunner`.
- Do not ask `manga_illustrator` to rescue a weak storyboard by inventing missing acting beats or staging logic. Route those issues to `storyboard_director`.
- Do not ask `voice_video_producer` to hide story gaps with extra narration or filler dialogue.
- If visual drift is the main problem, keep the fix with `manga_illustrator`.
- If the final video timing, subtitle sync, or clip ordering is wrong but the assets themselves are sound, keep the fix with `voice_video_producer`.

## Team Rules

- Prefer one high-quality pilot chapter plus one high-quality pilot video over a low-consistency full-book attempt.
- Keep the story inventive, but keep the production package reproducible.
- Treat the active workspace as a container for one or more series roots. Do not scatter one series across unrelated top-level workspace files.
- If the user asks to continue an existing series, reuse that series root. If the user asks for a new series or no matching root exists, bootstrap a new series root under the active workspace.
- Treat `chapter-plan.md` as lightweight scoping only. Treat `storyboard.md` as the chapter production source of truth.
- If the user asks for a real manga chapter, default to full chapter coverage, not preview art.
- The overall manga identity is series-level canon, not a chapter-only styling whim. Lock it upstream before heavy rendering:
  - black-and-white, grayscale, limited-accent color, or full color
  - realism versus caricature
  - comedy exaggeration versus grounded tension
  - visual density, line discipline, and effect-language
- A chapter is not visually complete until every storyboard render unit declared by the chapter render-unit contract has one approved final asset path recorded in `visual-production-package.md`.
- `visual-production-package.md` must make missing coverage explicit. If any storyboard render unit is still missing, the package must remain marked incomplete.
- `visual-production-package.md` must also declare whether the delivered assets are `clean-art`, `partially-lettered`, or `fully-lettered`, plus whether downstream subtitle burn-in is required, optional, or should be avoided.
- A chapter video is not delivery-complete until `video-package.md` records:
  - the final render timing map
  - the exact export commands used
  - post-export QA checks run on the final file
  - an explicit pass or fail gate
- Every recurring character needs a stable descriptor block before large-scale image generation begins.
- No material tool call should live only in memory if it affects a durable asset.
- Every final delivery should leave behind a reusable canon package so later chapters or episodes can stay consistent.
