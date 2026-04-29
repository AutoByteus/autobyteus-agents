---
name: promo-video-producer
description: Assemble optional captions, audio-led segments, motion graphics, exports, and final delivery reports for software product promotional videos.
---

# Promo Video Producer

Use this skill to assemble the final software product promotional video from the approved brief, script, measured voiceover, storyboard, and approved visual asset package.

The `promo_director` owns voiceover generation and measured audio review.
This role must not generate replacement narration or rewrite spoken lines unless the user explicitly changes the team workflow.

## Expected Inputs

- approved `product-promo-brief.md`
- `research-notes.md` when present
- `source-asset-inventory.md` when present
- approved `promo-script.md`
- approved `voiceover-package.md`
- `audio-generation-log.md`
- voiceover clips under `audio/`
- `promo-storyboard.md`
- `visual-source-index.md`
- `visual-asset-plan.md`
- `visual-asset-production-log.md`
- user-approved `visual-review-report.md`, including the approved still / hold frame manifest
- approved visual assets under `assets/`
- brand assets, music, or sound references when supplied

## Produced Artifacts

- `subtitles.srt` when captions or subtitles are in scope
- `video-edit-package.md`
- final exports under `exports/`
- `final-delivery-report.md`

Use:
- [video-edit-package-template.md](templates/video-edit-package-template.md)
- [final-delivery-report-template.md](templates/final-delivery-report-template.md)

## Required Shared Reads

- Start by reading [promo-production-principles.md](promo-production-principles.md).
- Use it as the shared reference for approved audio usage, visual truth, edit clarity, optional captions, and final QA.

## Workflow

### Step 1 - Confirm the final assembly package

Before assembling video, confirm:

- final channel
- aspect ratio
- resolution
- duration preference and hard duration limit when present
- brief approval status
- script approval status
- voiceover package approval status
- storyboard version
- visual source index version
- visual asset package version
- internal visual asset review status
- user visual approval status
- CTA
- voiceover language
- caption/subtitle requirement
- music or sound requirement

If any of these conflict across artifacts, route the issue upstream.
If the brief, script, voiceover package, storyboard, internal visual review, or user visual approval is missing, route the package back before assembling the edit.

### Step 2 - Build captions only when requested or required

Create `subtitles.srt` from final spoken text and actual audio durations only when captions or subtitles are part of the approved delivery requirement.
If captions are not in scope, record that decision in `video-edit-package.md` and continue without a text-caption layer.

Keep captions or subtitles:

- faithful to spoken words
- readable at the target aspect ratio
- away from important UI
- short enough for the viewer to read

If caption placement would cover important UI, adjust the edit, crop, or caption layout instead of hiding the UI.

### Step 3 - Assemble the edit

Use the approved visual asset plan, user-approved visual review report, and storyboard as the edit map, then apply the measured audio durations from the approved voiceover package.
Do not use candidate visual assets that failed review, were not included in the approved visual asset package, or have not passed user visual approval.
Use the approved still / hold frame manifest in `visual-review-report.md` as the approved-only still image list for final assembly.
If a still, hold frame, hero frame, UI card, UI composite, or non-text highlight frame is not in that manifest, do not use it in the final video.

Create the final audio-led segment plan in `video-edit-package.md`:

- Build the final segment plan from measured audio durations, deliberate pauses, and the audio-informed storyboard.
- A single voiceover clip may drive multiple visual segments. Use the clip visual order and intended dwell/placement from the storyboard, visual asset plan, and approved still / hold frame manifest to lay those segments out under the same continuous voiceover.
- Do not restart, duplicate, or overlap the same voiceover clip just because it has multiple visual assets.
- Follow the visual asset plan's motion source strategy. If it specifies one approved frame, animate crop, zoom, pan, tilt, or hold from that frame. If it specifies multiple approved frames, transition between those approved full-view, close-up, highlight, bridge, or end-hold frames instead of inventing new visual sources.
- If a measured clip needs more visual support, extend the matching visual segment with still holds, slower product-screen motion, looping screen-recording sections, or extended end cards before considering speech speed changes.
- If a measured clip is short, keep the matching visual segment concise unless extra hold is needed for UI readability, CTA dwell time, or a deliberate dramatic pause.
- Keep the total export aligned with the approved duration preference. If a hard limit exists and the measured audio-led edit cannot fit, route the issue to `promo_director` for script or voiceover revision.
- Avoid time-stretching voiceover. If an explicit hard duration limit requires it, keep speech speed changes minimal, pitch-corrected, and logged, and route to `promo_director` first when practical.
- Video retiming is acceptable when it preserves comprehension: extend/hold/loop visuals for measured narration, or trim/compress visual-only motion between narrated segments. Do not speed dense UI so much that it becomes unreadable.

Typical assembly may include:

- one rendered video segment per approved voiceover clip or storyboard segment
- multiple consecutive visual segments under one continuous voiceover clip when the approved manifest calls for it
- image or screen-recording sequence
- animated UI mockup transitions
- floating screenshot cards with subtle 2.5D tilt or perspective rotation
- fades, crossfades, slide-ins, push transitions, and gentle wipes
- crop, pan, and zoom motion
- layered screenshot stacks
- cursor paths, highlight rings, and non-text callout reveals
- voiceover
- music or sound bed when approved
- caption or subtitle burn-in or sidecar file when requested or required
- final export normalization

Render segments in approved script order and concatenate them with `concatenate_videos` or an equivalent ffmpeg concat workflow when that is the cleanest assembly route.
Choose the best available implementation route for the motion graphics.
Valid routes include `ffmpeg` filters, scripted frame generation, HTML/CSS/canvas rendering exported to video, Remotion-style composition, available local video tools, or generated intermediate clips.
Prefer the simplest route that gives enough timing control, visual polish, and repeatability for the requested export.
Use motion graphics to guide attention across real product screens.
Adjust visual segment durations to the measured narration, not the other way around, unless an explicit hard duration limit requires fixed timing.
Do not distort product screens to fit the target aspect ratio.
Do not tilt, blur, scale, or overlap screenshots so aggressively that important UI becomes unreadable.
Do not hide missing visual support with generic stock-like footage.

### Step 4 - Validate the exported file

Do not stop at a successful export command.

Validate the final video file itself:

- file opens successfully
- correct aspect ratio and resolution
- duration respects the approved preference or hard limit
- final duration reflects measured voiceover plus planned pauses and approved segment holds
- no black frames or missing assets
- screenshots are legible
- voiceover and visible shots align
- captions or subtitles align and do not cover critical UI when in scope
- CTA is present
- no unsupported claim appears in voiceover, captions when used, product UI text, or any user/legal-required text
- no sensitive information is visible

Record results in `final-delivery-report.md`.

### Step 5 - Handoff final delivery

Send the final package back to `promo_director` or the user.

Include:

- absolute path to final export
- absolute path to `final-delivery-report.md`
- absolute path to `video-edit-package.md`
- absolute path to `product-promo-brief.md`
- absolute path to `research-notes.md` when present
- absolute path to `source-asset-inventory.md` when present
- absolute path to `promo-script.md`
- absolute path to `voiceover-package.md`
- absolute path to `audio-generation-log.md`
- absolute path to `promo-storyboard.md`
- absolute path to `visual-source-index.md`
- absolute path to `visual-asset-plan.md`
- absolute path to `visual-asset-production-log.md`
- absolute path to `visual-review-report.md`
- caption/subtitle path when present
- open risks or known limitations
- recommended next variants when useful

## Routing Rules

- Route claim conflicts, script timing issues, voiceover replacement needs, or storyboard gaps to `promo_director`.
- Route missing, illegible, mismatched, sensitive, or failed approved visuals to `visual_reviewer` first. The reviewer can decide whether the fix belongs to `visual_director` or `promo_director`.
- If final assembly reveals that approved voiceover cannot work with the approved visual plan, stop and route the issue upstream instead of silently changing the message.
