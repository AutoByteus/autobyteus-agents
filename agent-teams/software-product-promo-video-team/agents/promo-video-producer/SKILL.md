---
name: promo-video-producer
description: Produce voiceover, subtitles, audio, edit assembly, export QA, and final delivery reports for software product promotional videos.
---

# Promo Video Producer

Use this skill to assemble the final software product promotional video from the approved brief, script, storyboard, and visual asset package.

## Expected Inputs

- `product-promo-brief.md`
- `promo-script.md`
- `promo-storyboard.md`
- `visual-asset-plan.md`
- `screen-capture-log.md`
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
- Use it as the shared reference for speech serialization, visual truth, edit clarity, subtitles, and final QA.

## Workflow

### Step 1 - Confirm the edit contract

Before generating audio or assembling video, confirm:

- final channel
- aspect ratio
- resolution
- target duration
- script version
- storyboard version
- visual asset package version
- CTA
- voiceover language
- subtitle requirement
- music or sound requirement

If any of these conflict across artifacts, route the issue upstream.

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
- estimated duration

Keep spoken lines concise and natural.
Do not add new product claims while adapting the script for speech.

### Step 3 - Generate speech clips serially

Generate one speech clip per approved voiceover segment with the selected speech tool, such as `generate_speech` or `speak`.

Speech generation must be serial-only. Treat the clip list as a queue, not a batch:

- call exactly one `generate_speech` or selected `speak` request
- wait for the tool result
- inspect and log the result in `audio-generation-log.md`
- immediately run `sleep 60` before making any further speech-tool call
- do not launch multiple speech-tool calls concurrently, in the background, through a background process, or as a parallel batch
- apply the same 60-second cooldown after retries, rejected candidates, timed-out calls, failed calls, and approved clips

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
- approval status
- sequential call number
- whether `sleep 60` was completed before the next call or retry

### Step 4 - Build subtitles

Create `subtitles.srt` from final spoken text and actual audio durations.

Keep subtitles:

- faithful to spoken words
- readable at the target aspect ratio
- away from important UI
- short enough for the viewer to read

If subtitle placement would cover important UI, adjust the edit, crop, or subtitle layout instead of hiding the UI.

### Step 5 - Assemble the edit

Use the approved visual asset plan and storyboard as the edit map.

Typical assembly may include:

- image or screen-recording sequence
- crop and zoom motion
- cursor or callout highlights
- light transitions
- voiceover
- music or sound bed when approved
- subtitle burn-in or sidecar file
- final export normalization

Use `ffmpeg` or available local video tooling for deterministic assembly.
Do not distort product screens to fit the target aspect ratio.
Do not hide missing visual support with generic stock-like footage.

### Step 6 - Validate the exported file

Do not stop at a successful export command.

Validate the final video file itself:

- file opens successfully
- correct aspect ratio and resolution
- correct duration
- no black frames or missing assets
- screenshots are legible
- voiceover and visible shots align
- subtitles align and do not cover critical UI
- CTA is present
- no unsupported claim appears in voiceover, captions, or on-screen text
- no sensitive information is visible

Record results in `final-delivery-report.md`.

### Step 7 - Handoff final delivery

Send the final package back to `product_promo_strategist` or the user.

Include:

- absolute path to final export
- absolute path to `final-delivery-report.md`
- absolute path to `video-edit-package.md`
- subtitle path when present
- open risks or known limitations
- recommended next variants when useful

## Routing Rules

- Route claim conflicts to `product_promo_strategist`.
- Route script timing or storyboard gaps to `promo_script_storyboarder`.
- Route missing, illegible, mismatched, or sensitive visuals to `product_visual_director`.
- If speech generation fails repeatedly, log attempts and ask whether to retry, change voice route, or proceed with a silent/subtitled cut.
