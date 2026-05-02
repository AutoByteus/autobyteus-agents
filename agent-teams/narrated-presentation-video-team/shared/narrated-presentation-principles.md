# Narrated Presentation Principles

This is the shared production reference for the narrated presentation video team.

The target output is a slide-based explainer video: still presentation pages plus narration, assembled with simple cuts or light fades. The main quality bar is clear, accurate explanation supported by high-quality, engaging, content-bearing presentation visuals, not motion spectacle.

## Core Principles

### 1. Explanation First

- The narration must carry a logical explanation that a listener can follow.
- The narration must guide the viewer through a coherent explanatory path. Each segment should naturally follow from the previous one, introduce only the necessary next idea, and prepare the viewer for what comes after.
- The viewer should not feel sudden topic jumps, missing bridges, or unexplained "why are we here now?" transitions.
- Each slide should support the spoken point; slides should not be expected to rescue unclear narration.
- Terms should be introduced before they are used in deeper reasoning.
- The script should move from context to claim, mechanism, evidence, implication, and takeaway in an order appropriate to the topic.
- Every sentence should either introduce, explain, support, transition, or conclude. Remove filler.

### 2. Explanatory Flow Standard

The script should take the viewer along step by step.
This is one of the highest-priority quality gates for the team.

Review the flow at two levels:

- `Whole-video flow`: the full arc should have a clear beginning, middle, and end, with each section earning its place.
- `Segment-to-segment flow`: each narration segment should answer why it follows the previous segment and why the next segment belongs after it.

Strong explanatory flow usually does the following:

- starts with the viewer's context, question, or problem
- states the central idea before details accumulate
- defines terms before relying on them
- introduces one conceptual layer at a time
- uses transitions to connect ideas, not just to announce the next topic
- turns evidence into meaning instead of listing facts
- periodically ties details back to the main point
- ends with a clear synthesis or takeaway

Flow defects are blocking review issues:

- abrupt topic jump
- missing bridge between ideas
- unexplained term or entity
- conclusion that appears before the needed reasoning
- source fact dropped into the narration without explaining why it matters
- repeated point that stalls momentum
- slide sequence that feels like a list of pages rather than a guided explanation
- transition that only says "next" without explaining the relationship between ideas

### 3. Source Discipline

- User-provided materials are authoritative unless online research or user clarification supersedes them.
- Online research is allowed when useful and available, but the source basis must be recorded in `research-notes.md`.
- Do not present uncertain claims as settled.
- Do not invent statistics, quotes, organization positions, product capabilities, dates, legal claims, scientific claims, or historical facts.
- If a claim is useful but unsupported, mark it as a question or remove it from the narration.

### 4. No Redundancy

- Avoid repeating the same idea in consecutive sentences unless the repetition is intentional reinforcement and adds a new angle.
- Do not restate a slide title as narration unless it helps the listener.
- Do not repeat a source fact in multiple segments without a clear reason.
- If two sentences make the same point, keep the clearer one or merge them.

### 5. Content-Led Explanation

- The goal is to explain the story or subject clearly, deeply, naturally, and engagingly.
- Final length emerges from the approved content; it is not a brief-stage requirement.
- Do not plan around artificial size constraints or slide-count targets.
- Do not shorten the explanation in a way that damages logic, transitions, depth, or viewer engagement.
- Do not pad the explanation. Remove filler and redundancy, but keep necessary context, reasoning, bridges, examples, and takeaways.
- Media handling belongs to production after the narration script and storyboard have passed full review.

### 6. Full Review Every Round

- Script review is always full review.
- After any revision, the reviewer re-reads the entire narration script and slide storyboard.
- The reviewer should update prior findings, but the new review is not limited to prior findings or changed lines.
- A pass means the full current package passes, not merely that prior obvious issues were fixed.
- User approval is not a substitute for reviewer approval. Users may approve the direction, topic, or tone, but the reviewer must still independently judge logic, support, redundancy, spoken clarity, and slide fit.
- Full review should include separate passes for explanation structure, claim support, redundancy, spoken delivery, narration-slide mapping, embedded slide content, viewer experience, narrator consistency, prompt-level cue readiness, and content-led completeness.

### 7. Narration-Slide Mapping

- Default to one reviewed narration segment per primary slide image. This keeps speech generation, review, and assembly manageable.
- The default is a production convenience, not a substitute for design judgment.
- One slide may support multiple short narration segments when the same visual context remains useful and the slide will not feel stale.
- If one narration segment needs multiple visual states, split the narration into multiple reviewed segments before production instead of asking the producer to improvise mid-clip slide changes.
- If one slide would require a long or dense explanation, split the slide, split the narration, or both.
- The approved `slide-storyboard.md` must make the mapping explicit enough that `slide_video_producer` does not need to infer it.
- The approved storyboard must name the required embedded slide content for each slide: exact on-image wording when needed, labels, diagram content, chart content, source visuals, and the visual structure that should carry the explanation.
- Slides with little or no written wording still need an explicit image-only content plan. They are acceptable only when the image itself carries the explanation and the reviewer agrees that extra wording would reduce clarity.

### 8. Slide Design, Not Mechanical Image Creation

- Slide visuals should be designed pages with hierarchy, layout, and explanatory purpose.
- Slide visuals should be high-quality and engaging by default. They should look like finished designed presentation pages, not low-quality drafts, static placeholders, generic backgrounds, or weak first-pass sketches.
- The slide designer should not mechanically create one decorative image for each audio clip.
- Each slide should decide what the viewer needs to see while hearing that narration: title, diagram, chart, screenshot, comparison, process, source image, key phrase, labeled visual, concise takeaway, or other approved content.
- Use the right visual type for the explanation. A `process infographic` may use cards, arrows, and simple icons; an `illustrated presentation slide` may use pictorial panels with embedded labels; a `pictorial storyboard slide` may show scene moments inside cards. Do not collapse every slide into flat line icons just because it is called an infographic.
- A slide may be mostly textual when that is the clearest choice, but it should still be visually composed for video viewing.
- The normal output is a complete presentation or infographic image whose approved content is already built into the generated/edited image. Do not produce a decorative background and rely on later overlays to add the real slide content.
- If the approved storyboard does not provide enough visual direction, route the issue upstream instead of inventing a new explanation.

### 9. Slide Simplicity

- Slides should be clean presentation pages, not motion-graphics scenes.
- Simplicity does not mean low visual quality. A simple slide can still use polished composition, thoughtful illustration, visual storytelling, and refined typography.
- Use readable typography, clear hierarchy, and only the amount of text the viewer can absorb while listening.
- Prefer one main idea per slide.
- Do not overload a slide with dense paragraphs.
- Visuals may include diagrams, screenshots, charts, generated illustrations, or source images when they make the explanation clearer.
- Avoid decorative complexity that competes with narration.

### 10. Viewer Mood And Style Defaults

- The default viewer experience is relaxed, light, friendly, clear, and approachable.
- Do not default to dark cinematic, solemn, heavy, sermon-like, or intimidating visual styles unless the user explicitly requests that mood or the approved brief requires it.
- Religious, historical, or reflective topics still need audience-friendly visual treatment by default. Night scenes, deep shadows, black backgrounds, gold-on-black palettes, and dramatic poster styling should be used only when they directly serve the explanation and do not make the video feel heavy or severe.
- Visual mood should be specified in `presentation-brief.md`, reflected in `slide-storyboard.md`, checked in `narration-review-report.md`, and enforced during image generation.
- Narration should sound relaxed, warm, conversational, and engaging for the target audience. Avoid old-fashioned, stern, formal, lecturer-like, or monotonous teacher delivery unless the user explicitly asks for it.
- Audio persona and performance direction should be specified in `presentation-brief.md`, carried into `voiceover-package.md`, and expressed through both the full `generate_speech` generation config and the speech prompt when the model supports expressive prompting.
- Generated narration should normally use short audible bracketed performance cues, such as `[warm, conversational]`, `[short pause]`, `[gentle emphasis]`, or `[slightly brighter]`, to avoid flat or overly serious delivery. Use them as prompt-level directions, not as words the narrator is meant to say.
- Keep approved narration text, speech prompt text, subtitle text, and non-spoken performance cues separate in the package. Subtitle text should exclude bracketed cues unless the narrator literally says those words aloud.
- Use one consistent narrator voice/persona across all generated narration clips by default. Keep the same selected voice, speaker identity, model route, language/accent target, and broad generation config unless the user explicitly approves a multi-voice format.
- Use local prompt cues to create natural warmth, emphasis, or pauses. Do not change voices between clips just to create variety.
- If generated audio sounds too serious, stiff, elderly, sermon-like, or boring for the approved audience, reject it and regenerate with a corrected voice/config.

### 11. Required Media Generation Routes

- `slide_video_producer` must create every final slide image with `generate_image` or `edit_image`.
- Use `generate_image` for new presentation/infographic slides, concept visuals, explanatory diagrams, timelines, process slides, comparison slides, summary slides, or slide compositions created from approved content.
- Use `edit_image` when starting from user-provided screenshots, charts, source images, prior generated slides, or existing visual drafts.
- Do not create final slide visuals with Python/PIL-only, HTML/SVG-only, presentation-tool-only, or script-only rendering.
- Scripts may prepare source material, inspect outputs, convert formats, post-process already generated/edited outputs, assemble video, or create validation evidence, but they must not replace `generate_image` or `edit_image` for final slide image creation.
- The final generated/edited image must already contain the required embedded slide content. Do not add titles, labels, diagrams, callouts, or explanatory slide content later with scripts, PIL, HTML/SVG, presentation tools, ffmpeg overlays, or other post-generation overlay mechanisms.
- Optional narration subtitles are allowed when requested or useful for accessibility, but they must not be used to compensate for missing slide content.
- If generation omits required content, corrupts planned wording or labels, invents unsupported wording, or produces a decorative image instead of a finished slide, reject that output and regenerate or edit it. If repeated attempts fail, block and route upstream instead of delivering an incomplete slide image.
- Inspect generated slides only for the minimum acceptance checks needed for delivery: file validity, required embedded content, readable on-image text, approved mood/style, and obvious visual failure. Do not run a separate detailed visual-critique loop by default; if the user visually approves the generated slides and no required-content or obvious failure is visible, record that approval and proceed.
- If a generated slide has an obvious failure (missing/corrupt required content, unreadable text, wrong mood, low-quality/draft-like output, or a globally weak visual concept), reject it before delivery. When the whole visual concept is weak, regenerate from scratch with `generate_image` using a stronger prompt instead of polishing a poor draft.
- When regenerating a mostly successful slide, preserve what already works: visual type, composition, information hierarchy, mood, and useful illustrations. The next attempt should fix the named defect only.
- Do not make a retry more abstract, more minimal, or more icon-only unless the defect is that the prior slide was too visually busy or the approved storyboard asks for an icon-based slide.
- Prefer `edit_image` for a local correction when the previous attempt is close. If using `generate_image` again, the retry prompt must explicitly preserve the successful prior design qualities and the image-generation log must record what should be preserved.
- `generate_image` and `edit_image` calls are serial-only. Call exactly one image tool, wait for the result, failure, or timeout, run the minimum visual acceptance check when an image is present, update `image-generation-log.md` with that attempt and decision, then immediately run `sleep 60` before making any further image-generation or image-editing call.
- The 60-second cooldown applies after candidate, rejected, timed-out, failed, and approved `generate_image` and `edit_image` calls.
- Do not dispatch multiple image calls at the same time, in the background, through a background process, or as a parallel batch.
- Generated narration must use `list_audio_models` followed by `generate_speech`.
- Do not use `speak` for this team.
- Use the live schema from `list_audio_models` when building `generate_speech` configs. Do not rely on vague style text alone when supported generation-config fields can express voice, tone, or speaking style.
- Do not rely on config alone either. Build the actual `generate_speech` prompt intentionally, with concise audible bracketed cues for local warmth, emphasis, or pause control unless cues are unsupported by the selected model or explicitly inappropriate for the approved style.
- Keep config and prompt responsibilities separate. `style_instructions` or equivalent config fields should describe the broad narrator persona only; they should not explain bracketed cue tags, list cue examples, or say that cue tags are not spoken. Cue tags belong in the actual speech prompt text.
- Good `style_instructions` example: `Warm, relaxed Mandarin explainer narration. Conversational, clear, approachable, not sermon-like or dramatic.`
- Bad `style_instructions` example: `Read the Chinese transcript completely. Bracketed cue tags such as [warm, conversational] and [short pause] are delivery directions, not words to speak.`
- All generated clips must preserve the approved narrator identity. If any regenerated clip uses a different voice, speaker identity, or noticeably different persona, reject it or regenerate it before final assembly.
- `generate_speech` calls are serial-only. Call exactly one speech tool request, wait for the result, failure, or timeout, inspect the output when present, and update `audio-generation-log.md` with that attempt and decision before making any further `generate_speech` call.
- If a speech model truncates or mishandles a long approved segment, split only that segment into shorter subclips without changing approved wording. Generate subclips serially with the same narrator identity/config, log each subclip attempt, concatenate them into the approved segment clip, inspect the combined clip for completeness and boundary smoothness, and record the lineage in `voiceover-package.md` and `media-resource-index.md`.
- Keep separate generation logs:
  - `audio-generation-log.md` for every `generate_speech` call, including approved narration text, full speech prompt text sent to the tool, prompt-level performance cues, selected narrator identity, full generation config JSON, model/tool id, output path, voice-consistency check, inspection result, and rejected/regenerated attempts.
  - `image-generation-log.md` for every `generate_image` / `edit_image` call, including full prompt text, full generation/edit config JSON, model/tool id, output path, mood/style check, embedded-content check, 60-second cooldown evidence, inspection result, and rejected/regenerated attempts.
- Treat both generation logs as live production records. Update the relevant log immediately after each accepted, rejected, failed, timed-out, regenerated, or edited tool result. For images, update before cooldown and before any next image call. For speech, update before any next speech call. Do not wait until the end of production to reconstruct the logs.
- Do not replace full prompts or full configs with summaries in generation logs.

### 12. Production Package And Logging Gates

- Before the first image, edit, speech, or assembly call, create the production package skeletons from templates or minimal placeholders: `media-resource-index.md`, `slide-video-production-plan.md`, `image-generation-log.md`, `voiceover-package.md`, `audio-generation-log.md`, `slide-video-production-log.md`, `video-assembly-package.md`, and `final-delivery-report.md`.
- Do not make the next media-generation call until the relevant live log has been updated for the previous result, failure, timeout, rejection, regeneration, edit, or subclip attempt.
- User approval can replace a separate detailed visual-critique/retry pass, but it does not waive live generation logs, resource indexing, production logs, assembly records, or the final delivery report unless the user explicitly waives the delivery package itself.
- After any interruption, route change, or user shortcut request, run a package-completeness check before final handoff and repair missing logs or package files.

### 13. Audio-Led Assembly

- Assembly follows the approved natural script and approved slide/audio pairs. It should not drive the script.
- The default route is direct segment creation: pass each approved slide image and matching audio to `create_video_from_image_and_audio`.
- Use simple cuts by default. Use light fades only when they improve readability or flow.
- Default assembly should be one still-image video segment per approved slide/audio pair, then concatenate those video segments in storyboard order.
- Prefer the video/audio tool route for the simple narrated-presentation format: `create_video_from_image_and_audio` for each segment, then `concatenate_videos` for the final export, with `add_subtitles` only when subtitles are requested or useful.
- Do not use raw stream-copy concat of independently encoded segments as the default final route. It can create tiny audio timestamp or edit-list discontinuities even when the source WAV clips are clean.
- Do not create a separate continuous concatenated audio track as a routine workaround. Use it only when segment-video concatenation fails validation and the reason is documented.

## Required Artifact Flow

- `presentation-brief.md`: approved explanation contract.
- `research-notes.md`: source and evidence basis when research or source review was used.
- `source-material-inventory.md`: supplied materials and links when there are multiple inputs.
- `narration-script.md`: spoken narration with evidence references and slide mapping.
- `slide-storyboard.md`: slide-by-slide plan.
- `narration-review-report.md`: full script review result.
- `media-resource-index.md`: source visuals, generated or edited slides, generated audio clips, subtitle files, logs, assembly packages, final exports, lineage, and final-use status.
- `slide-video-production-plan.md`: slide design, audio pairing, and assembly plan.
- `slide-video-production-log.md`: slide production, voiceover generation/import, assembly, and self-check log.
- `voiceover-package.md`: final narration audio plan.
- `audio-generation-log.md`: speech generation or imported audio log when applicable.
- `image-generation-log.md`: image generation and editing prompts, configs, outputs, minimum visual acceptance decisions, and rejected/regenerated attempts.
- `video-assembly-package.md`: final segment assembly map.
- `final-delivery-report.md`: export validation and delivery notes.

## Review Criteria For Narration Scripts

The narration script should pass all of these before visual production begins:

- The explanation has a clear beginning, middle, and end.
- The core question or purpose is explicit.
- The viewer is guided step by step through a coherent explanatory path.
- Each segment naturally follows from the previous one and prepares the next one.
- Abrupt jumps, missing bridges, and unexplained transitions are absent.
- Claims are supported by supplied materials, recorded research, or user-approved assumptions.
- The argument does not jump over missing reasoning steps.
- Terms and entities are introduced before dependent claims.
- There is no avoidable redundancy.
- Segment boundaries are sensible for narration, slide design, and audio generation.
- Each slide segment has one clear job.
- Slide sequence and narration sequence match.
- Spoken language sounds natural when read aloud.
- The expected audience can understand the explanation without hidden context.
- Each slide has required embedded slide content, or explicitly defines why an image-only content plan is the clearest choice.
- Visual mood and audio persona match the approved target audience and do not drift into heavy, dark, stern, or overly formal delivery unless explicitly approved.
- Narrator identity and voice-consistency expectations are clear enough to keep one consistent generated voice across clips unless multi-voice narration is explicitly approved.
- Prompt-level cue style is clear enough to make generated speech natural without changing approved narration wording.
- The script is judged by completeness, depth, clarity, engagement, natural flow, and lack of filler.
- User-facing approval is not being used as a substitute for independent explanation review.

## Visual Criteria For Slides

- Each slide has one primary message.
- Each slide has a high-quality, engaging visual treatment appropriate to the audience and topic.
- When on-image wording or labels are used, they are concise and readable.
- Each final slide image is a complete content-bearing presentation or infographic image, not a plain background awaiting later overlays.
- Required embedded slide content is actually present in the generated or edited slide output, not only promised in the plan.
- The slide supports the exact narration segment assigned to it.
- The narration-slide mapping is suitable: not too many words on one slide, not too many slides for one simple idea.
- Charts, diagrams, screenshots, or generated visuals are accurate to the source basis.
- Any generated visual is labeled in `media-resource-index.md` as generated or representative when needed.
- Important on-image wording, labels, diagrams, and images remain legible at the target video resolution.
- The slide has enough visual substance for the assigned narration without becoming cluttered.
- The slide does not look like a low-quality draft, generic static placeholder, or minimally polished diagram when the storyboard calls for an illustrated or visually engaging presentation slide.
- The slide package records enough minimum acceptance evidence in `image-generation-log.md` and `media-resource-index.md`; no separate detailed visual-review artifact is required by default.
- Final slide images are outputs from `generate_image` or `edit_image`, with lineage recorded in `media-resource-index.md`.
- Final slide images match the approved visual mood/style contract. Reject outputs that are too dark, heavy, ominous, solemn, or poster-like when the approved style is light, relaxed, and friendly.

## Assembly Criteria

- Use only approved narration text and approved slide images.
- Pair each audio clip with the correct slide or slide sequence.
- Keep one approved narrator voice/persona across generated clips unless the approved brief explicitly allows multiple voices.
- Keep cuts simple and predictable.
- Captions or subtitles are optional and should be created only when requested or useful for accessibility. They are narration aids, not a replacement for embedded slide content.
- Subtitle styling should be conservative and slide-safe by default. For 1080p narrated presentation videos, start with small bottom-center subtitles, typically around `font_size` `18`-`20`, `alignment=2`, and `margin_v` about `10`-`16`, with only a thin outline or modest semi-transparent background. Do not start with large, high subtitles that cover slide titles, diagrams, faces, or important lower-third content.
- Split subtitle cues into readable short chunks rather than large multi-line blocks. A subtitle block should support listening, not become the dominant visual element.
- Prefer `create_video_from_image_and_audio` per slide/audio pair and `concatenate_videos` for final assembly. Avoid raw stream-copy concat as the default because it can introduce audio discontinuities at segment boundaries.
- Validate the exported file: opens successfully, correct resolution/aspect ratio, no missing images, no black frames, audio is audible without dropouts or skipped syllables at segment boundaries, slide/audio alignment is correct, and optional subtitles are readable without covering important slide content. Check at least one early subtitle frame; if subtitles are too large, too high, or visually dominant, create a corrected smaller/lower version and treat that corrected version as final.
