---
name: promo-video-producer
description: Produce the early measured voiceover pass, subtitles, audio-led segment assembly, export QA, and final delivery reports for software product promotional videos.
---

# Promo Video Producer

Use this skill first to generate and measure approved voiceover audio, then later to assemble the final software product promotional video from the approved brief, script, measured audio, storyboard, and visual asset package.

## Expected Inputs

Early voiceover timing pass:

- approved `product-promo-brief.md`
- `research-notes.md` when present
- `source-asset-inventory.md` when present
- approved `promo-script.md`

Final assembly pass:

- approved `product-promo-brief.md`
- `research-notes.md` when present
- `source-asset-inventory.md` when present
- approved `promo-script.md`
- approved `voiceover-package.md`
- `audio-generation-log.md`
- `promo-storyboard.md`
- `visual-asset-plan.md`
- `screen-capture-log.md` when present
- `visual-asset-production-log.md`
- user-approved `visual-asset-review-report.md`
- approved visual assets under `assets/`
- brand assets, music, or sound references when supplied

## Produced Artifacts

- `voiceover-package.md` when voiceover is in scope
- `audio-generation-log.md` when generated speech is used
- generated audio clips under `audio/`
- `subtitles.srt` when subtitles are in scope
- `video-edit-package.md`
- final exports under `exports/`
- `final-delivery-report.md`

Use:
- [voiceover-package-template.md](templates/voiceover-package-template.md)
- [audio-generation-log-template.md](templates/audio-generation-log-template.md)
- [video-edit-package-template.md](templates/video-edit-package-template.md)
- [final-delivery-report-template.md](templates/final-delivery-report-template.md)

## Required Shared Reads

- Start by reading [promo-production-principles.md](promo-production-principles.md).
- Use it as the shared reference for speech generation, visual truth, edit clarity, subtitles, and final QA.

## Workflow

### Step 1 - Confirm the production phase

This role is used twice:

- early voiceover timing pass, after `promo-script.md` is approved and before visual production
- final assembly pass, after `promo-storyboard.md`, `visual-asset-plan.md`, user-approved `visual-asset-review-report.md`, and approved visual assets are ready

Before generating audio or assembling video, confirm:

- final channel
- aspect ratio
- resolution
- duration preference and hard duration limit when present
- script version
- storyboard version when present
- visual asset package version when present
- internal visual asset review status and user visual approval status when present, and both are required for final assembly
- brief approval status
- script approval status
- voiceover package approval status when present
- visual asset approval status when present
- CTA
- voiceover language
- subtitle requirement
- music or sound requirement

If any of these conflict across artifacts, route the issue upstream.
If the brief or script approval status is missing or not approved, route the package back before generating final voiceover or assembling the edit.

### Step 2 - Create `voiceover-package.md`

Default to one clear narrator voice for product promos.

Record:

- narration style
- voice choice
- speech tool
- clip segmentation
- script per clip
- subtitle text per clip
- performance directions
- approval state per clip

Keep spoken lines concise and natural.
Do not add new product claims while adapting the script for speech.

### Step 3 - Generate speech clips

Generate one speech clip per approved voiceover segment with the selected speech tool, such as `generate_speech` or `speak`.

Speech generation is serial-only:

- treat the clip list as a queue, not a batch
- call exactly one `generate_speech` or selected `speak` call
- wait for that call to return
- inspect and log the result in `audio-generation-log.md`
- approve or reject the result before it enters the final voiceover package
- immediately run `sleep 60` before making any further speech-tool call
- do not dispatch multiple speech-tool calls at the same time, in the background, through a background process, or as a parallel batch

For every speech-generation call, log:

- clip id
- exact spoken text
- performance directions
- speech tool used
- model identifier returned by the tool, if available
- voice
- language
- speech settings used, when applicable
- output path
- measured duration after generation
- approval status
- cooldown completed after call

### Step 4 - Measure voiceover and return the audio package

Generated or recorded narration should normally play at natural speed.
Do not assume any visual timing exists before speech generation.

After speech clips are approved:

- measure the actual duration of every voiceover clip
- add initial intentional breath-gap recommendations between clips or sections
- compare measured narration against the duration preference and hard duration limit when present
- record whether each clip is usable as spoken, too long, too rushed, awkward, or unclear
- send the measured voiceover package back to `promo_script_storyboarder` before visual production

If a clip is not usable as spoken, route it back to `promo_script_storyboarder` for script revision and user reapproval before regenerating that clip.
If the measured narration is acceptable, stop the early pass after handing off `voiceover-package.md` and `audio-generation-log.md`; final assembly resumes only after the audio-informed storyboard and visual package return.

The early audio handoff should include:

- absolute path to `voiceover-package.md`
- absolute path to `audio-generation-log.md`
- absolute path to `promo-script.md`
- measured duration for every approved clip
- total measured narration duration
- timing verdict against the duration preference and hard duration limit when present
- clips that need script revision, if any

### Step 5 - Build subtitles during final assembly

Create `subtitles.srt` from final spoken text and actual audio durations.

Keep subtitles:

- faithful to spoken words
- readable at the target aspect ratio
- away from important UI
- short enough for the viewer to read

If subtitle placement would cover important UI, adjust the edit, crop, or subtitle layout instead of hiding the UI.

### Step 6 - Assemble the edit

Use the approved visual asset plan, user-approved visual asset review report, and storyboard as the edit map, then apply the measured audio durations from the approved voiceover package.
Do not use candidate visual assets that failed review, were not included in the approved visual asset package, or have not passed user visual approval.

Create the final audio-led segment plan in `video-edit-package.md`:

- Build the final segment plan from measured audio durations, deliberate pauses, and the audio-informed storyboard.
- If a measured clip needs more visual support, extend the matching visual segment with still holds, slower product-screen motion, looping screen-recording sections, or extended end cards before considering speech speed changes.
- If a measured clip is short, keep the matching visual segment concise unless extra hold is needed for UI readability, CTA dwell time, or a deliberate dramatic pause.
- Keep the total export aligned with the approved duration preference. If a hard limit exists and the measured audio-led edit cannot fit, route the issue upstream for script revision.
- Avoid time-stretching voiceover. If an explicit hard duration limit requires it, keep speech speed changes minimal, pitch-corrected, and logged.
- Video retiming is acceptable when it preserves comprehension: extend/hold/loop visuals for measured narration, or trim/compress visual-only motion between narrated segments. Do not speed dense UI so much that it becomes unreadable.

Typical assembly may include:

- one rendered video segment per approved voiceover clip or storyboard segment
- image or screen-recording sequence
- animated UI mockup transitions
- floating screenshot cards with subtle 2.5D tilt or perspective rotation
- fades, crossfades, slide-ins, push transitions, and gentle wipes
- crop, pan, and zoom motion
- layered screenshot stacks
- cursor paths, highlight rings, and callout reveals
- voiceover
- music or sound bed when approved
- subtitle burn-in or sidecar file
- final export normalization

Render segments in approved script order and concatenate them with `concatenate_videos` or an equivalent ffmpeg concat workflow when that is the cleanest assembly route.
Choose the best available implementation route for the motion graphics.
Valid routes include `ffmpeg` filters, scripted frame generation, HTML/CSS/canvas rendering captured to video, Remotion-style composition, available local video tools, or generated intermediate clips.
Prefer the simplest route that gives enough timing control, visual polish, and repeatability for the requested export.
Use motion graphics to guide attention across real product screens.
Adjust visual segment durations to the measured narration, not the other way around, unless an explicit hard duration limit requires fixed timing.
Do not distort product screens to fit the target aspect ratio.
Do not tilt, blur, scale, or overlap screenshots so aggressively that important UI becomes unreadable.
Do not hide missing visual support with generic stock-like footage.

### Step 7 - Validate the exported file

Do not stop at a successful export command.

Validate the final video file itself:

- file opens successfully
- correct aspect ratio and resolution
- duration respects the approved preference or hard limit
- final duration reflects measured voiceover plus planned pauses and approved segment holds
- no black frames or missing assets
- screenshots are legible
- voiceover and visible shots align
- subtitles align and do not cover critical UI
- CTA is present
- no unsupported claim appears in voiceover, captions, or on-screen text
- no sensitive information is visible

Record results in `final-delivery-report.md`.

### Step 8 - Handoff final delivery

Send the final package back to `product_promo_strategist` or the user.

Include:

- absolute path to final export
- absolute path to `final-delivery-report.md`
- absolute path to `video-edit-package.md`
- absolute path to `product-promo-brief.md`
- absolute path to `research-notes.md` when present
- absolute path to `source-asset-inventory.md` when present
- absolute path to `promo-script.md`
- absolute path to `voiceover-package.md`
- absolute path to `promo-storyboard.md`
- absolute path to `visual-asset-review-report.md`
- subtitle path when present
- open risks or known limitations
- recommended next variants when useful

## Routing Rules

- Route claim conflicts to `product_promo_strategist`.
- Route script timing or storyboard gaps to `promo_script_storyboarder`.
- Route missing, illegible, mismatched, sensitive, or failed approved visual assets to `promo_visual_asset_reviewer` first. The reviewer can decide whether the fix belongs to `promo_visual_asset_producer`, `product_visual_director`, `promo_script_storyboarder`, or `product_promo_strategist`.
- If speech generation fails repeatedly, log attempts and ask whether to retry, change voice route, or proceed with a silent/subtitled cut.
