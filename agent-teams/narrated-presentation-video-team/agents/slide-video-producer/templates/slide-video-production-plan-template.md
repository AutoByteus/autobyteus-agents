# Slide Video Production Plan

## Plan Status

Before any media-generation or assembly call, create this file and the rest of the live package skeleton: `media-resource-index.md`, `image-generation-log.md`, `voiceover-package.md`, `audio-generation-log.md`, `slide-video-production-log.md`, `video-assembly-package.md`, and `final-delivery-report.md`.

## Visual Style Summary

## Slide Plan

| Slide ID | Linked Segment ID(s) | Visual Type | Main Message | Required Embedded Slide Content | Exact On-Image Wording / Labels If Any | Visual Mood / Style Target | Visual Standard / Engagement Intent | Final Image Route (`generate_image`/`edit_image`) | Layout Notes | Source / Asset Need | Readability Risk | Visual Fit / Mapping Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SL-001 | SEG-001 |  |  |  |  |  |  |  |  |  |  |  |

## Audio Plan

| Clip ID | Segment ID | Slide ID(s) / Approved Slide Sequence | Narration Source (`Generated`/`User-Supplied`) | Selected Narrator Identity | Audio Persona / Performance Target | Prompt-Level Cue Plan | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| VO-001 | SEG-001 | SL-001 |  |  |  |  |  |

## Disallowed Route Check

- `speak` planned for generated narration: no
- Python/PIL-only, HTML/SVG-only, presentation-tool-only, or script-only final slide visuals planned: no
- Any slide without a required embedded content plan: no
- Any slide without a visual standard / engagement intent: no
- Any post-generation text, label, diagram, callout, or explanatory slide-content overlay planned to compensate for incomplete slide images: no
- Image calls planned serially with `sleep 60` after every `generate_image` / `edit_image` result, failure, or timeout: yes
- `image-generation-log.md` planned as live log updated immediately after each image result, failure, timeout, rejection, regeneration, or edit decision before cooldown: yes
- `audio-generation-log.md` planned as live log updated immediately after each speech result, failure, timeout, rejection, or regeneration decision: yes
- Full image prompts/configs planned for `image-generation-log.md`: yes
- Full approved narration text, speech prompt text, prompt-level cues, selected narrator identity, voice-consistency checks, and configs planned for `audio-generation-log.md`: yes
- Same narrator identity planned for all generated clips unless explicitly approved otherwise: yes
- All generated/used resources planned for `media-resource-index.md`: yes
- Visual/audio mood contract reviewed for dark/serious drift risk: yes

## Assembly Plan

- Segment creation route (`create_video_from_image_and_audio` by default):
- Segment concatenation route (`concatenate_videos` by default):
- Raw ffmpeg stream-copy concat planned? (`No` by default; if `Yes`, explain why and how boundary audio validation will be done):
- Continuous concatenated audio route planned? (`No`; only change after a documented segment-concat validation failure):
- Subtitle mode:
- Transition mode (`Cuts`/`Light Fades`):
- Aspect ratio:
- Resolution:
- Frame rate:

## Risks / Open Questions
