# Manga Video Production Principles

Use this file as the shared operating contract for the whole manga-video team.

## 1. Canon Before Scale

- Work inside the active user-selected workspace root for the run.
- If that workspace contains more than one manga project, each series should live in its own durable series root folder.
- At the start of a run, `manga_showrunner` should decide whether the request is:
  - continuation of an existing series root
  - bootstrap of a new series root
- Start by locking the canon in a durable series root:
  - `series-bible.md`
  - `character-bible.md`
  - `series-state.md`
  - `chapter-registry.md`
- Keep each chapter in its own folder under `chapters/`.
- Unless the user explicitly wants a larger scope, default to a pilot package first:
  - one stable story concept
  - one core cast
  - one pilot chapter or short arc
  - one narrated pilot video only when voiced or video delivery is in scope
- Do not promise a whole long-form manga book until the canon and visual identity are stable.

## 1A. Bootstrap Or Continue Explicitly

- If the user asks to continue an existing series, inspect the active workspace for a matching series root and reuse it.
- If the user asks for a new series, or no matching root exists, create a new series root under the active workspace instead of writing loose files at the workspace top level.
- A newly bootstrapped series root should create or reserve at minimum:
  - `series-bible.md`
  - `character-bible.md`
  - `character-registry.md`
  - `series-state.md`
  - `chapter-registry.md`
  - `shared-assets/character-sheets/`
  - `shared-assets/location-references/` when relevant
  - `shared-assets/style-references/` when relevant
  - `chapters/<chapter-id>/`
- Use stable, filesystem-friendly series naming for the root folder so the same project can be found again later.

## 2. Character Identity Must Be Reusable

- Every recurring character needs a stable descriptor block before high-volume image generation starts.
- Keep a living `character-registry.md` at the series root, not just a static one-time cast list.
- The registry should let the team answer:
  - who already exists
  - who debuts in which chapter
  - who is active, inactive, hidden, retired, or dead
  - when each character last appeared
  - which design-lock version and voice mapping are current
  - which reusable assets belong to that character
- The descriptor block should cover:
  - role and emotional job in the story
  - age band or vibe
  - silhouette
  - face and hair identifiers
  - outfit anchors
  - recurring prop or symbol
  - speech pattern
  - voice persona or delivery-style anchor when voiced output is in scope
  - forbidden drift
- Downstream prompts should reuse the same lock language unless the upstream canon is intentionally changed.

## 3. Characters Can Enter The Story Late

- Do not assume the full cast is known in chapter 1.
- When a new recurring character becomes real in chapter 10 or later, update:
  - `character-registry.md`
  - `character-bible.md`
  - the current chapter plan and storyboard when relevant
  - reusable character-sheet assets once the design is approved
- Planned-but-not-yet-revealed characters may exist as lightweight placeholders, but they should not get fake detailed production treatment too early.
- Returning characters should reuse their existing ids, sheets, prompt blocks, and voice decisions unless the canon explicitly changes them.

## 4. Story Beats Must Earn Their Runtime

- Every scene should do at least one real job:
  - move the plot
  - deepen the character
  - escalate the pressure
  - reveal a world rule
- If a scene only repeats information or mood without changing anything, compress it or cut it.

## 5. The Storyboard Is The Production Bridge

- `storyboard.md` translates story canon into renderable visual units.
- For chapter production, `storyboard.md` is the main source of truth.
- `chapter-plan.md` exists to scope and align the chapter before boarding; it is not the file that illustrators and video producers should improvise from.
- It should be specific enough that the illustrator and video producer do not have to guess:
  - what is visible
  - whose emotional beat matters
  - what text or dialogue belongs to the image
  - how the scene should pace

## 6. Continuity Ledger Is Mandatory

- Keep a durable continuity ledger for:
  - location
  - time of day
  - outfit state
  - props
  - injuries or physical changes
  - relationship state
  - knowledge state
  - visual effects or power-state rules
- If a downstream role notices a contradiction, stop and route the issue instead of papering over it.

## 7. Material Tool Calls Must Be Logged

- If a tool invocation materially affects a durable asset, record it on disk.
- For image generation and image editing, log:
  - asset id
  - tool or image route used
  - model identifier when available
  - exact prompt
  - input image refs
  - generation or edit settings
  - output path
  - approval status
  - notes about why the iteration changed
- For speech generation, log:
  - clip id
  - exact spoken text
  - performance directions or stage cues when used
  - speech tool used
  - model identifier
  - voice
  - language
  - temperature or other settings when applicable
  - output path
  - approval status
- Prompts and settings should never exist only in the model context if later chapters may need them.

## 8. Default Visual Mode Is Manga Or Motion Comic

- Default art direction is manga-style imagery, usually black-and-white or limited-accent color unless the user requests a different look.
- Use `generate_image` as the default primary manga-image generation route.
- Use `edit_image` as the default targeted correction route for otherwise strong assets.
- Image tool calls are strictly sequential. Call exactly one `generate_image` or `edit_image`, wait for that call to return, inspect and log the result, then immediately run `sleep 60` before making any further image-tool call.
- Do not dispatch multiple image-tool calls at the same time, in the background, or as a parallel batch. This applies even when many frames are planned.
- The 60-second cooldown applies after candidate, rejected, failed, and approved image-tool calls.
- When a scene depends on multiple locked references, prefer passing the approved image paths through `input_images` instead of relying only on text prompts.
- If the active runtime expects multiple `input_images` refs to be supplied as one comma-separated value, serialize them in that runtime-specific form instead of assuming a richer object wrapper.
- Default video mode is motion-comic style:
  - generated full-bleed video-frame stills
  - simple cuts
  - light pans or zooms
  - optional light transitions
- For video delivery, the visual source should look like a video frame first and manga art second: one immersive frame per visible beat, not a scanned or generated paper page inside the video.
- Do not present the output as full animation unless the user explicitly asks for that and the environment actually supports it.
- Manga-only delivery is also valid. If the user does not want voiced or video output, stop after the visual package and keep the chapter package complete on disk without inventing unnecessary audio artifacts.

## 8A. Overall Style Is Series Canon

- The overall manga identity belongs at the series level before chapter-local rendering begins.
- `series-bible.md` should lock the series-wide visual identity strongly enough that later chapters do not reinvent it from scratch.
- At minimum, the upstream canon should state:
  - black-and-white, grayscale, limited-accent color, or full color
  - realism versus caricature
  - comedy exaggeration versus grounded tension
  - emotional intensity and whimsy level
  - linework density and contrast philosophy
  - background density and atmosphere
  - typography or SFX feel when it matters
- `visual-style-guide.md` should inherit from that series-level identity and only add chapter-specific execution notes, not replace the series look casually.

## 8B. Video Aspect Ratio Is Series-Locked

- When voiced or video delivery is in scope, `series-bible.md` must define one locked video canvas before image generation starts, such as `9:16 vertical, 1080x1920` or `16:9 horizontal, 1920x1080`.
- Chapter plans, storyboards, visual style guides, prompt packs, image-generation logs, visual-production packages, and video packages must restate the locked series ratio for traceability. They must not redefine it as a chapter-local preference.
- Every `video-frame` prompt must include the locked ratio and orientation in positive prompt language, and the image-generation config should request matching dimensions whenever the tool supports explicit size fields.
- The locked ratio must appear inside the final constructed image prompt text sent to `generate_image`, not only as adjacent metadata, a note, or a generation config field.
- Every approved `video-frame` asset must be checked against the locked ratio before handoff to video assembly.
- Mixed aspect ratios inside one final video are a blocking error. Do not pad, letterbox, or stretch mismatched source art to hide the problem.
- If the user asks for a different ratio, treat that as a separate export variant requiring an explicit user decision and a regenerated or explicitly cropped full asset set. Do not let one chapter silently override the series video canvas.

## 8C. Render Unit Must Be Explicit

- Every chapter storyboard must declare one render-unit contract before high-volume image generation starts:
  - `video-frame` for full-bleed motion-comic stills at the locked series video aspect ratio
  - `page-composed` for full manga pages
  - `panel-first` for complete storyboard panel coverage
  - `key-asset preview` for early visual exploration only
- If voiced or video delivery is in scope, default to `video-frame` unless the user explicitly asks for printable/readable manga pages or separate panel assets as the primary deliverable.
- `video-frame` assets must be single full-screen compositions. They must not contain multiple manga panels, page gutters, paper margins, page frames, contact-sheet layouts, reference-sheet layouts, large white borders, or a smaller image pasted onto a blank background.
- A `video-frame` can use cinematic foreground/midground/background staging, layered action, or a deliberate full-bleed split-screen effect when truly needed, but it must still feel like one immersive video frame rather than art printed on paper.
- If `page-composed` manga pages are also needed for a video, the video stage must crop/pan individual panels or request separate `video-frame` renders. Whole multi-panel pages are not acceptable as default full-screen video frames.
- If the user asked for a real manga chapter, do not silently downgrade that request to `key-asset preview`.
- If the chapter is being delivered as `panel-first`, make that explicit in the package instead of pretending it is already a full page-composed chapter.

## 8D. Preview Assets Are Not Chapter Completion

- Character locks, key art, and scene-preview images are useful, but they are not a finished chapter.
- A chapter visual package is complete only when every declared storyboard render unit has:
  - a stable asset id
  - an approved final asset path on disk
  - a matching storyboard-to-asset entry in `visual-production-package.md`
- The visual package should also make lettering state explicit so downstream video work knows whether assets are:
  - `clean-art`
  - `partially-lettered`
  - `fully-lettered`
- If the chapter will also produce a motion-comic video, the package should state whether subtitle burn-in is required, optional, or should be avoided for those assets.
- For `video-frame` delivery, the package should also state the inherited locked series aspect ratio, target resolution if known, and a frame-conformance QA result for every approved frame.
- If any render unit is still missing, the package should say so directly and remain incomplete.

## 8E. Video-Frame Asset QA Is Mandatory

- Before a `video-frame` asset is approved, inspect it as a video frame, not only as an attractive illustration.
- Reject or regenerate any `video-frame` candidate with:
  - visible page borders, panel gutters, comic-page layout, contact-sheet layout, or reference-sheet layout
  - large white or blank margins around the art
  - multiple unrelated mini-images inside one generated image
  - wrong aspect ratio for the locked series video canvas
  - generated watermark, app mark, UI badge, signature mark, or stray decorative icon
  - focal action hidden behind the planned subtitle zone
- The prompt pack for `video-frame` assets should include explicit positive language such as `single full-bleed 9:16 motion-comic frame` or `single full-bleed 16:9 motion-comic frame`, and explicit negative language such as `no manga page, no panel grid, no white border, no paper margin, no collage, no reference sheet`.

## 8F. Voice Identity Is Series Canon When Voiced Delivery Exists

- If narrated or voiced delivery is in scope, the series root should also lock a reusable voice identity layer.
- At minimum, the upstream canon should state:
  - whether the series normally uses narrator-led, dialogue-led, or hybrid delivery
  - narrator strategy
  - voice palette direction for the cast
  - per-character voice-casting intent when known
  - pronunciation or naming conventions worth keeping stable
- `character-registry.md` should remain the series-level authority for the current voice mapping of recurring characters.
- `character-bible.md` should hold the stable voice persona or delivery-style anchor for recurring characters when voiced output is in scope.
- `voice_video_producer` should inspect the live supported models and voices before locking a chapter voice map when the runtime exposes multiple choices.
- If a previously preferred voice is no longer available, choose the nearest supported replacement and record that update explicitly for showrunner sync instead of silently drifting.

## 9. Audio Must Follow The Visible Frame

- Narration and dialogue should track what the viewer can actually see.
- Do not use voiceover to smuggle in unsupported actions, off-screen plot repairs, or extra lore that breaks the canon.
- Character voice mapping should stay stable across the whole production unit.
- Default to one visible beat, one speaker, and one generated clip.
- In manga-style motion comics, treat long spoken exchanges on one unchanged image as a pacing problem, not as a normal speech-generation pattern.
- Use multi-speaker generation only as a narrow exception when one visible beat genuinely needs a short two-person exchange to live inside the same audio unit.
- For this team's `generate_speech` workflow, multi-speaker means at most two mapped speakers per call.
- Speech tool calls are strictly sequential. Call exactly one `generate_speech` or selected `speak` call, wait for that call to return, inspect and log the result, then immediately run `sleep 60` before making any further speech-tool call.
- Do not dispatch multiple speech-tool calls at the same time, in the background, or as a parallel batch. The 60-second cooldown applies after candidate, rejected, failed, and approved speech-tool calls.
- If one still image or one tightly bound render unit would need roughly more than 8 to 10 seconds of uninterrupted speech, more than one clear speaker turn, or more than two distinct speakers, split it into additional beats or render units instead of stretching one static hold.
- If a beat would require more than two distinct speakers in one audio unit, split it into separate clips or sequential one-speaker / two-speaker segments instead of sending an oversized speaker-mapping request.
- If one audio beat spans multiple render units, the final package must explicitly map that beat across the visible video frames. Page/panel ids belong in this map only when an explicit non-default contract produced them.
- Do not let a spoken line or subtitle advance to a new idea while the exported video is still holding on an unrelated visual unit.

## 9A. Subtitle Layout Must Respect The Frame

- Subtitle size and placement must be chosen for the locked series output aspect ratio, not copied blindly from a previous export.
- Portrait or vertical video usually needs:
  - smaller subtitle font than landscape
  - a lower subtitle block
  - stricter control of line count
- Landscape or horizontal video can usually tolerate:
  - a slightly larger subtitle font
  - a slightly higher bottom margin
  - longer single-line captions before wrapping
- For Chinese portrait video, aim for a readable two-line maximum in normal cases.
- When a spoken beat is likely to challenge that limit, decide the preferred subtitle-window split and line-break intent upstream instead of leaving all layout choices to the final burn stage.
- If a subtitle would wrap to three lines at the chosen font size:
  - split it into two subtitle windows when timing allows, or
  - reduce font size modestly, or
  - rewrite line breaks more intelligently
- Do not allow the subtitle block to rise so high that it obscures the character face or the main focal zone of the frame.
- The subtitle block should feel anchored near the bottom, not floating in the lower middle of the image.
- Record the subtitle layout settings used for the final export, including at minimum:
  - font name
  - font size
  - outline or background treatment
  - bottom margin
  - any locked-aspect-ratio-specific layout decision

## 9B. Final Video QA Is Mandatory

- Do not treat a render manifest as proof that the final MP4 is correct.
- Build a render timing map before export that records, at minimum:
  - render unit id
  - approved asset path
  - start time
  - end time
  - linked audio beat ids
  - linked subtitle ids or subtitle window
- Prefer deterministic video assembly per render unit:
  - normalize still images before concatenation
  - use per-unit timed clips or an equivalent method that preserves exact order and duration
  - do not rely on a slideshow path that has not been validated for the current assets
- After export, verify the final file itself:
  - for `video-frame` chapters with 30 render units or fewer, sample at least one midpoint timestamp per render unit
  - for `panel-first` chapters with 30 render units or fewer, sample at least one midpoint timestamp per render unit
  - for larger chapters, sample first, middle, and last render units of each scene plus every scene boundary
  - confirm the sampled frame matches the expected render unit from the timing map
  - confirm subtitle progression and visible frame or panel progression stay aligned around beat boundaries
  - confirm subtitle size, line count, and vertical placement remain readable for the locked series aspect ratio
- If the final export fails those checks, the chapter video remains incomplete and must be rebuilt.

## 10. Production Economy Matters

- Reuse background setups, recurring framing patterns, and character reference sheets when that improves consistency.
- Prefer a smaller cast and a tighter location set when the user has not asked for a sprawling ensemble.
- A clean, coherent pilot beats a bloated package with inconsistent art.

## 11. End Each Chapter With Carry-Forward State

- After a chapter is completed, update the series-level carry-forward files.
- At minimum, capture:
  - new canon confirmed in the chapter
  - new or changed character registry entries
  - new reusable assets
  - prompt blocks worth reusing
  - unresolved hooks
  - chapter status and final output paths
- Chapter 2 should be able to start from files on disk, not from memory of chapter 1.

## 12. Stop On Missing Canon

- Stop and route issues when:
  - the premise is still unstable
  - a character design is not locked
  - the storyboard requires a world rule that does not exist
  - image generations drift beyond repair
  - the voice script would have to invent story content not supported by the visuals
