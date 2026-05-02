# Slide Video Production Log

## Production Status

Record production events as they happen. This log does not replace `image-generation-log.md` or `audio-generation-log.md`; it links to them and summarizes accepted assets, user visual approvals, assembly decisions, and final validation.

## Final Slide Manifest

| Slide ID | Final Image Path | Final Image Tool (`generate_image`/`edit_image`) | Linked Segment ID(s) | Required Embedded Slide Content | Embedded Content Present And Correct? | Minimum Visual Acceptance Check | User Visual Approval / Waiver Notes | Resource IDs Used | Readability Check | Source-Support Check | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SL-001 |  |  | SEG-001 |  |  |  |  |  |  |  |  |

## Image Production Log Summary

Detailed image prompts, full configs, model ids, and rejected attempts belong in `image-generation-log.md`.

| Slide ID | Accepted Image Attempt ID | Output Path | Minimum Visual Acceptance Check | User Visual Approval / Waiver Notes | Mood / Style Check | Required Embedded Content Check | Inspection Result | `sleep 60` Completed Before Next Image Call? | Follow-Up |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SL-001 | IMG-SL001-A1 |  |  |  |  |  |  |  |  |

## Audio Production Log Summary

| Clip ID | Segment ID | Selected Narrator Identity | Audio Path | Prompt-Level Cues Used? | Voice Consistency Check | Inspection Result | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| VO-001 | SEG-001 |  |  |  |  |  |  |

## Disallowed Route Check

- `speak` used for generated narration: no
- Python/PIL-only, HTML/SVG-only, presentation-tool-only, or script-only final slide visuals used: no
- Any required embedded slide content missing or incorrect in final images: no
- Any accepted slide image has an obvious low-quality, draft-like, generic, static, or visually dull failure: no
- Any post-generation text, label, diagram, callout, or explanatory slide-content overlay used to compensate for incomplete slide images: no
- Every `generate_image` / `edit_image` call was serial and followed by `sleep 60` after each result, failure, or timeout before the next image call: yes
- `image-generation-log.md` was updated immediately after every image result, failure, timeout, rejection, regeneration, or edit decision before cooldown and before the next image call: yes
- `audio-generation-log.md` was updated immediately after every speech result, failure, timeout, rejection, or regeneration decision before the next speech call: yes
- Full image prompts/configs are recorded in `image-generation-log.md`: yes
- Full approved narration text, speech prompt text, prompt-level cues, selected narrator identity, voice-consistency checks, and configs are recorded in `audio-generation-log.md`: yes
- Same narrator identity used for all generated clips unless explicitly approved otherwise: yes
- All generated/used resources are indexed in `media-resource-index.md`: yes
- No accepted image is too dark, solemn, heavy, ominous, or poster-like for the approved style contract: yes
- Every accepted image passes the minimum visual acceptance check or has user visual approval recorded, with no obvious visual failure: yes
- Separate detailed visual-critique loop used? (`No` by default; if `Yes`, explain trigger): no
- No accepted generated narration is too serious, stern, sermon-like, or boring for the approved audio persona: yes

## Assembly Summary

- Final export path:
- Subtitle path:
- Segment creation route:
- Segment concatenation route:
- Raw ffmpeg stream-copy concat used? (`No` by default):
- Continuous concatenated audio route used? (`No` by default):
- Boundary audio validation result:
- Assembly command or tool-call reference:

## Known Limitations
