# Slide Video Production Plan

## Plan Status

## Visual Style Summary

## Slide Plan

| Slide ID | Linked Segment ID(s) | Visual Type | Main Message | Required Embedded Slide Content | Exact On-Image Wording / Labels If Any | Visual Mood / Style Target | Visual Quality / Engagement Target | Final Image Route (`generate_image`/`edit_image`) | Layout Notes | Source / Asset Need | Readability Risk | Visual Fit / Mapping Notes |
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
- Any slide without a visual quality / engagement target: no
- Any post-generation text, label, diagram, callout, or explanatory slide-content overlay planned to compensate for incomplete slide images: no
- Image calls planned serially with `sleep 60` after every `generate_image` / `edit_image` result, failure, or timeout: yes
- Speech calls planned serially with `sleep 30` after every `generate_speech` result, failure, or timeout: yes
- `image-generation-log.md` planned as live log updated immediately after each image result, failure, timeout, rejection, regeneration, or edit decision before cooldown: yes
- `audio-generation-log.md` planned as live log updated immediately after each speech result, failure, timeout, rejection, or regeneration decision before cooldown: yes
- Full image prompts/configs planned for `image-generation-log.md`: yes
- Full approved narration text, speech prompt text, prompt-level cues, selected narrator identity, voice-consistency checks, 30-second speech cooldown evidence, and configs planned for `audio-generation-log.md`: yes
- Same narrator identity planned for all generated clips unless explicitly approved otherwise: yes
- All generated/used resources planned for `media-resource-index.md`: yes
- Visual/audio mood contract reviewed for dark/serious drift risk: yes

## Assembly Plan

- Segment creation route (`create_video_from_image_and_audio` by default):
- Segment concatenation route (`concatenate_videos` by default):
- Raw ffmpeg stream-copy concat planned? (`No` by default; if `Yes`, explain why and how boundary audio QA will be done):
- Continuous concatenated audio route planned? (`No`; only change after a documented segment-concat validation failure):
- Subtitle mode:
- Transition mode (`Cuts`/`Light Fades`):
- Aspect ratio:
- Resolution:
- Frame rate:

## Risks / Open Questions
