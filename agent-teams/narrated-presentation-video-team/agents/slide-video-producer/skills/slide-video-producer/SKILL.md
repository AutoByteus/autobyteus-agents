---
name: slide-video-producer
description: Produce still-slide visuals, generate or ingest narration audio, assemble simple narrated presentation videos, validate exports, and package final delivery.
---

# Slide Video Producer

Use this skill to produce the final narrated presentation video after the narration script and slide storyboard pass full review.

This role intentionally merges slide visual design and final video assembly because the format is simple: approved slide images plus approved narration audio. It should not become a motion-graphics production role by default.

## Expected Inputs

- approved `presentation-brief.md`
- `research-notes.md` when present
- `source-material-inventory.md` when present
- passed `narration-review-report.md`
- reviewer-passed `narration-script.md`
- reviewer-passed `slide-storyboard.md`
- user-provided images, screenshots, charts, logos, or source visuals when available
- user-supplied narration audio when provided
- language, voice, subtitle, aspect ratio, resolution, and export constraints
- approved visual mood/style contract
- approved audio persona/performance contract
- approved narrator identity and voice-consistency contract
- approved prompt-level cue style for generated speech

## Produced Artifacts

- `media-resource-index.md`
- `slide-video-production-plan.md`
- final slide images under `slides/`
- `slide-video-production-log.md`
- `voiceover-package.md`
- `audio-generation-log.md` when generated speech or imported audio processing is used
- `image-generation-log.md` when generated or edited slide images are used
- voiceover clips under `audio/`
- `subtitles.srt` when requested or useful
- `video-assembly-package.md`
- final exports under `exports/`
- `final-delivery-report.md`

Use:
- [media-resource-index-template.md](templates/media-resource-index-template.md)
- [slide-video-production-plan-template.md](templates/slide-video-production-plan-template.md)
- [slide-video-production-log-template.md](templates/slide-video-production-log-template.md)
- [voiceover-package-template.md](templates/voiceover-package-template.md)
- [audio-generation-log-template.md](templates/audio-generation-log-template.md)
- [image-generation-log-template.md](templates/image-generation-log-template.md)
- [video-assembly-package-template.md](templates/video-assembly-package-template.md)
- [final-delivery-report-template.md](templates/final-delivery-report-template.md)

## Required Shared Reads

- Start by reading [narrated-presentation-principles.md](narrated-presentation-principles.md).
- Use it as the shared reference for slide simplicity, source discipline, narration-slide mapping, required `generate_image` / `edit_image` slide creation, embedded slide content, `generate_speech`-only narration generation, audio-led assembly, optional subtitles, and final validation.
- The only tools allowed for final slide image creation are `generate_image` and `edit_image`.
- Image generation and image editing calls require a 60-second cooldown between calls.
- The only generated narration tool allowed is `generate_speech` after checking `list_audio_models`.
- Prefer `create_video_from_image_and_audio` and `concatenate_videos` for still-slide video assembly.
- Treat `speak`, Python/PIL-only final slide creation, HTML/SVG-only final slide creation, and script-only final slide creation as disallowed routes.

## Workflow

### Step 1 - Confirm the approved package

Before production, confirm:

- narration review decision is `Pass`
- final narration script exists
- slide storyboard exists
- narration-to-slide mapping is explicit
- required embedded slide content is specified for each slide, including exact on-image wording or labels when needed
- language, aspect ratio, resolution, and subtitle requirements are clear
- approved visual mood/style contract is clear
- approved audio persona/performance contract is clear
- approved narrator identity and voice-consistency contract is clear
- approved prompt-level cue style is clear

If the script has not passed full review, route the package back to `narration_script_reviewer` or `presentation_director`.
If the mapping is unclear, route the package back to `presentation_director`.

### Step 2 - Create the production package skeleton

Before any `generate_image`, `edit_image`, `generate_speech`, subtitle, segment-video, or final assembly call, create the package files from templates or minimal placeholders:

- `media-resource-index.md`
- `slide-video-production-plan.md`
- `image-generation-log.md`
- `voiceover-package.md`
- `audio-generation-log.md`
- `slide-video-production-log.md`
- `video-assembly-package.md`
- `final-delivery-report.md`

This is a hard gate. Do not begin media generation with these files missing. Keep them as live records; do not reconstruct them only at the end.

In `media-resource-index.md`, inventory sources, generated resources, logs, and final outputs:

- user-provided images, screenshots, charts, diagrams, logos, and documents
- source images extracted from supplied material
- generated or edited illustration assets
- final generated or edited slide images
- generated or imported audio clips
- subtitles when present
- `audio-generation-log.md`
- `image-generation-log.md`
- production logs, assembly package, delivery report, and final exports

For each entry, record resource id, type, tool or method, path or URL, origin, related slide id, related clip id, what it contains, derivation lineage, rights or sensitivity notes when known, status, and final-use status.

### Step 3 - Write `slide-video-production-plan.md`

For each slide, plan:

- linked narration segment ids
- visual type: text slide, process infographic, illustrated presentation slide, pictorial storyboard slide, diagram, chart, image-led slide, screenshot-led slide, comparison, timeline, or summary
- title or short headline
- main message
- required embedded slide content: exact on-image wording when needed, labels, diagram content, chart content, source visuals, and visual structure the final slide image must contain
- visual mood/style target for the slide, normally light, friendly, relaxed, clear, and audience-approachable
- visual standard / engagement intent, normally polished, high-quality, content-bearing, and visually engaging without becoming busy
- image-only or low-text rationale when no written wording is planned
- layout notes
- visual asset or diagram needs
- source basis
- readability risks
- visual fit for the linked narration audio

For audio and assembly, plan:

- narration source: generated speech or user-supplied audio
- selected narrator identity for the whole video
- audio persona/performance target, normally warm, relaxed, conversational, and engaging
- prompt-level cue plan for natural generated delivery
- one clip per narration segment by default
- slide-to-clip mapping
- subtitle mode
- transition mode: cuts by default, light fades only when useful

Do not add new explanatory claims to slides.
If a slide needs new information to work, route that issue to `presentation_director`.
If the approved mapping would make a slide visually stale, overloaded, or too thin for the narration, route a storyboard issue upstream instead of silently changing the script.
If a storyboard slide lacks required embedded slide content, route the package upstream before production.

### Step 4 - Produce still slides

Create one final slide image per storyboard slide unless the approved storyboard explicitly calls for a different split.

Required production route:

- Final slide images must be created with `generate_image` or `edit_image`.
- Use `generate_image` for new presentation/infographic slides, concept visuals, explanatory diagrams, timelines, process slides, comparison slides, summary slides, or slide compositions created from approved content.
- Use `edit_image` when starting from user-provided screenshots, charts, source images, prior generated slides, or existing visual drafts.
- Do not use Python/PIL-only, HTML/SVG-only, presentation-tool-only, or script-only rendering as the route for final slide visuals.
- Local scripts may prepare source assets, measure dimensions, convert formats, inspect files, post-process already generated/edited outputs, assemble video, or create validation evidence, but they must not replace `generate_image` or `edit_image` for final slide image creation.
- The generated or edited output must already be the finished content-bearing slide image. Do not generate a decorative background and add the real slide content later with scripts, PIL, HTML/SVG, presentation tools, ffmpeg overlays, or other post-generation overlay mechanisms.
- Optional narration subtitles are allowed when requested or useful for accessibility, but they must not be used to compensate for missing embedded slide content.

Generated image and edit rules:

- Run image generation and editing serially.
- Call exactly one `generate_image` or `edit_image` request at a time.
- Wait for the result, failure, or timeout, run the minimum visual acceptance check when an image is present, and immediately update `image-generation-log.md` with that attempt and decision.
- Immediately run `sleep 60` before any further `generate_image` or `edit_image` call.
- Do not dispatch image calls concurrently, in the background, or as a parallel batch.
- Record every image attempt in `image-generation-log.md` with full prompt text, full generation/edit config JSON, and 60-second cooldown evidence. Update this file after each accepted, rejected, failed, timed-out, regenerated, or edited result before the cooldown and before the next image call; do not reconstruct it only at the end.
- Record generated or edited asset lineage in `media-resource-index.md`.
- Do not represent generated illustrative visuals as source evidence.
- Reject and regenerate or edit any output that omits required embedded slide content, corrupts planned wording or labels, invents unsupported wording, or loses the slide's intended explanation.
- Reject and regenerate or edit any output that violates the approved visual mood/style contract, including outputs that are too dark, solemn, ominous, poster-like, heavy, or unfriendly when the approved style is relaxed and light.
- Reject and regenerate any output that has an obvious visual failure: low-quality, static, generic, draft-like, poorly composed, unreadable, or clearly not engaging enough for the approved viewer experience.
- If the base candidate is globally weak, do not try to polish it with `edit_image`. Regenerate from scratch with `generate_image` using the approved storyboard and a stronger visual storytelling prompt.
- For every retry, name the specific defect being fixed and preserve what already worked. Do not change the slide's visual type, composition model, or level of illustration unless that was the actual defect.
- If a pictorial panel slide is close but has one unwanted visual element, prefer `edit_image` or a targeted regeneration prompt that preserves the pictorial panel structure. Do not rewrite it as a minimal icon/card slide unless the approved storyboard calls for an icon-based process infographic.
- Avoid vague retry instructions like "clean infographic" by themselves; they can collapse a rich illustrated slide into flat icons. Specify the intended type, for example `illustrated presentation slide with three pictorial cards` or `process infographic with simple icons`.
- A retry prompt should include a preservation clause, for example: `Preserve the previous attempt's light watercolor style, three pictorial cards, human scene illustrations, title hierarchy, and friendly mood. Only remove the unwanted oil press object and keep all required text accurate.`
- If repeated generation/editing cannot produce the required embedded content correctly, block and route upstream instead of silently delivering an incomplete slide image.
- Do not run a separate detailed visual-critique loop by default. If the user visually approves the generated slides and no required-content or obvious visual failure is present, record that approval in `image-generation-log.md` / `slide-video-production-log.md` and proceed. A user may waive detailed visual critique, but that never waives live logs, resource indexing, or final package records unless explicitly stated.

Slide rules:

- one primary message per slide
- readable at target resolution
- high-quality, polished, and engaging enough to hold viewer attention while the narration explains the point
- no dense paragraphs
- no unnecessary decorative complexity
- visual mood should match the approved style contract; default to light, relaxed, friendly, clear, and audience-approachable
- avoid dark cinematic, solemn, ominous, black/gold poster-like, or heavy visual styles unless explicitly approved
- every final slide image is a complete content-bearing presentation or infographic image, not a plain background awaiting later overlays
- no accepted slide should have an obvious low-quality, draft-like, static-placeholder, or generic first-pass failure
- where text, labels, or diagram wording are planned, they should be readable and faithful to the approved storyboard
- embedded slide content should support the narration, not duplicate it line for line
- charts, diagrams, and screenshots must be accurate to the source basis
- the slide must work for all linked narration segment ids without becoming stale or overloaded

### Step 5 - Create `voiceover-package.md`

Record:

- narration source: generated speech or user-supplied audio
- voice choice or imported audio path
- selected narrator identity for the whole video
- approved audio persona and performance target
- approved narration text per clip
- full speech prompt text planned for `generate_speech`
- prompt-level audible performance cues, when used
- subtitle text without non-spoken cues
- linked segment and slide id or approved slide sequence
- performance directions
- approval state

Do not change approved narration wording.
When `generate_speech` is used, the speech prompt should normally include concise non-spoken bracketed performance cues around the approved narration, such as `[warm, conversational]`, `[short pause]`, `[gentle emphasis]`, or `[slightly brighter]`, to make the delivery more natural and less stiff.
Use only cues that can affect audible delivery.
Do not add visual directions, new claims, new explanation content, or cue text that should appear in subtitles.
Use one consistent narrator voice/persona for all generated clips unless the approved brief explicitly requires multiple voices.
Changing local tone should be done through prompt-level cues, not by changing voice identity clip by clip.
If a line is too long, awkward, or cannot be generated naturally from the approved script, route it to `presentation_director` and expect another full narration review before continuing.
Do not create new mid-clip slide changes that were not approved in the storyboard.

### Step 6 - Generate or process narration

If generated narration is needed, first call `list_audio_models`, select a suitable model or voice, build a full generation config from the live model schema, and generate one speech clip per approved segment with `generate_speech` only, unless the user supplied approved audio.
Do not use `speak`.
Do not rely only on broad config fields such as voice, accent, tone, or style.
Select one narrator identity for the whole video before generating the first clip, then keep that same voice/speaker identity, model route, language/accent target, and broad generation config for every generated clip unless the approved brief explicitly says otherwise.
Build the actual prompt sent to `generate_speech` from the approved narration plus concise audible bracketed performance cues for warmth, emphasis, or pauses unless cues are unsupported by the selected model or explicitly inappropriate for the approved style.
Keep config and prompt responsibilities separate:

- `generation_config` / `style_instructions`: broad narrator identity, voice, language/accent, tone, and overall style.
- speech prompt text: approved narration plus local audible cue tags.
- audio log: records both the full config and the full speech prompt.

Good `style_instructions` example:

```text
Warm, relaxed Mandarin explainer narration. Conversational, clear, approachable, not sermon-like or dramatic.
```

Bad `style_instructions` example:

```text
Read the Chinese transcript completely. Bracketed cue tags such as [warm, conversational], [short pause], and [gentle emphasis] are delivery directions, not words to speak.
```

Why the bad example is wrong:

- it puts cue-parsing instructions into config instead of the speech prompt
- it duplicates prompt mechanics instead of defining the broad voice
- it encourages future clips to mix prompt text and config responsibilities

Example single-speaker prompt for a relaxed narrated presentation:

```text
[warm, conversational] 今天我们先看一个很简单的问题：这段经文为什么从“警醒”开始？ [short pause] 因为接下来发生的事，会让门徒的软弱变得非常清楚。
```

Matching subtitle text:

```text
今天我们先看一个很简单的问题：这段经文为什么从“警醒”开始？因为接下来发生的事，会让门徒的软弱变得非常清楚。
```

Cue usage examples:

- Opening a topic: `[warm, conversational] 今天我们先从一个简单问题开始。`
- Creating a natural pause: `这个细节很小， [short pause] 但它解释了后面的转折。`
- Softening a serious point: `[gentle, reassuring] 这里不是为了责备门徒，而是让我们看见人的有限。`
- Guiding a transition: `[slightly brighter] 明白这个背景之后，我们再看耶稣接下来的提醒。`
- Emphasizing a takeaway: `所以重点不是他们多失败， [gentle emphasis] 而是耶稣仍然主动预备他们。`

Cue misuse examples:

- Do not use visual-only cues: `[camera zooms in]`, `[slide changes]`, `[show olive trees]`.
- Do not overload every sentence with cues; one to three audible cues per clip is normally enough.
- Do not use cues to add new meaning that is absent from the approved narration.
- Do not use different voices for different slides just to make the audio feel varied. Keep one narrator and use cues for local delivery changes.
- Do not put cue examples or cue-handling explanations into `style_instructions`; keep those in the speech prompt and logs.

Speech generation is serial-only:

- call exactly one `generate_speech` request at a time
- wait for the result, failure, or timeout
- inspect the output when present and immediately update `audio-generation-log.md`, including approved narration text, full speech prompt text sent to the tool, prompt-level performance cues, selected narrator identity, full generation config JSON, model/tool id, output path, voice-consistency check, inspection result, and any rejection/regeneration notes
- update `audio-generation-log.md` after each accepted, rejected, failed, timed-out, or regenerated result before the next speech call; do not reconstruct it only at the end
- do not dispatch speech calls concurrently, in the background, or as a parallel batch
- reject and regenerate any clip that uses a different narrator voice, speaker identity, language/accent target, or noticeably different persona from the approved voice package
- reject and regenerate audio that sounds too serious, stiff, old-fashioned, stern, sermon-like, monotonous, or boring when the approved audio persona is relaxed and conversational

If a model truncates or mishandles a long approved segment, split that segment into shorter subclips without changing the approved wording. Generate the subclips serially with the same narrator identity and config, log every subclip attempt in `audio-generation-log.md`, concatenate the subclips into the approved segment clip, inspect the combined clip for completeness and boundary smoothness, and record the subclip lineage in `voiceover-package.md` and `media-resource-index.md`.

If using user-supplied audio, split or map the audio to segment ids only when the mapping is clear.

### Step 7 - Create optional subtitles

Create `subtitles.srt` only when requested, useful for accessibility, or required by the delivery context.

Subtitles should:

- match the approved narration
- remain readable
- avoid covering important slide content
- default to a conservative bottom-safe style for 1080p exports: small enough to support listening without dominating the slide, normally `font_size` about `18`-`20`, bottom-center `alignment=2`, low `margin_v` about `10`-`16`, thin outline, and a modest semi-transparent background only if it improves readability
- not be placed high on the slide by default; keep them near the lower safe area unless the slide itself has essential lower-third content, in which case choose the least intrusive position and document it
- avoid large multi-line blocks that cover central slide titles, diagrams, faces, or prayer/template text; prefer shorter SRT cue chunks when a sentence would create a wide or tall subtitle block
- be checked on at least one early-frame sample after the first subtitle export; if the subtitle covers main slide content or feels visually dominant, immediately create a corrected smaller/lower subtitle version before delivery and make that corrected version the final export

### Step 8 - Assemble the still-slide video

Use the video/audio tool route by default.

Default assembly:

- create one video segment for each approved slide/audio pair with `create_video_from_image_and_audio`
- concatenate accepted segment videos in approved slide/storyboard order with `concatenate_videos`
- use cuts by default
- use light fades only when useful and safe
- preserve target aspect ratio and resolution

Do not use raw ffmpeg stream-copy concat of independently encoded segments as the default final route because it can create small audio discontinuities at segment boundaries.
If the video/audio tools are unavailable and ffmpeg is necessary, avoid a final `-c copy` concat unless the exported file passes boundary audio validation; otherwise re-encode the final concat or choose another documented route.
Do not create a separate continuous concatenated audio track as a routine workaround.
Only use a continuous-audio mux route when segment-video concatenation fails validation and the reason is documented in `video-assembly-package.md` and `final-delivery-report.md`.

Do not add pan, zoom, animated text, motion graphics, music beds, or sound effects unless explicitly approved.

### Step 9 - Validate and package

Write `slide-video-production-log.md`, `video-assembly-package.md`, and `final-delivery-report.md`.

Validate:

- final file opens successfully
- correct aspect ratio and resolution
- no black frames or missing slides
- on-image wording, labels, diagrams, charts, and source images are readable at export resolution
- every final slide image contains the required embedded slide content from the reviewer-passed storyboard
- every final slide image passes the minimum visual acceptance check or has explicit user visual approval recorded; no accepted slide has an obvious low-quality, draft-like, generic, or visually dull failure
- no post-generation text, label, diagram, callout, or explanatory slide-content overlay was used to compensate for an incomplete generated/edited slide image
- final slide images are `generate_image` or `edit_image` outputs, with lineage recorded in `media-resource-index.md`
- image-generation log includes full prompts, full configs, inspection decisions, and cooldown evidence for every image attempt, recorded immediately after each result rather than reconstructed only at the end
- audio-generation log includes approved narration text, full speech prompt text, prompt-level performance cues, selected narrator identity, voice-consistency checks, inspection decisions, and full configs for every generated speech attempt, recorded immediately after each result rather than reconstructed only at the end
- visual mood/style matches the approved contract and is not too dark, solemn, or heavy unless explicitly approved
- generated narration keeps one approved narrator voice/persona across clips, matches the approved audio persona, and is not too serious, stern, sermon-like, or boring unless explicitly approved
- slide visuals remain source-supported or clearly marked as generated/representative
- audio is audible and complete
- no audio drops, skipped syllables, or silence glitches occur at segment boundaries
- each slide matches the narration
- segment videos were created from the correct slide/audio pairs
- subtitles align and are readable when present
- no unapproved narration or slide content appears
- final export path and validation status are recorded

Before final handoff, run a package-completeness check. If any required production package artifact is missing or empty, write or repair it before delivery:

- `media-resource-index.md`
- `slide-video-production-plan.md`
- `image-generation-log.md`
- `voiceover-package.md`
- `audio-generation-log.md`
- `slide-video-production-log.md`
- `video-assembly-package.md`
- `final-delivery-report.md`

Send the final package back to `presentation_director` or the user with absolute paths and known limitations.

## Routing Rules

- `Script Wording Or Natural Speech Issue` -> `presentation_director`
- `Storyboard Mapping Issue` -> `presentation_director`
- `Missing Source Visual` -> `presentation_director`
- `Slide Visual Fix` -> `slide_video_producer`
- `Audio Or Assembly Fix` -> `slide_video_producer`
- `Unclear` -> `presentation_director`
