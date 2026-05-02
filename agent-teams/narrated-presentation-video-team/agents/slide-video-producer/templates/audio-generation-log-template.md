# Audio Generation Log

## Log Status

Generated narration must use `list_audio_models` and `generate_speech` only. Do not use `speak`.
Generate speech serially and log each result. Update this file immediately after every `generate_speech` result, failure, timeout, rejection, or regeneration decision, before the next speech call.
Record approved narration text, full speech prompt text sent to the tool, prompt-level performance cues, selected narrator identity, voice-consistency check, and full generation config JSON for every accepted, rejected, failed, timed-out, or regenerated attempt.
Config fields such as `style_instructions` should describe broad voice/style only. Do not put cue examples or cue-handling instructions in config; cue tags belong in the full speech prompt text.
If a segment is split into shorter subclips because the model truncates or mishandles a long line, log every subclip attempt as its own attempt ID, keep the same narrator identity/config, and record the final concatenated clip lineage in `voiceover-package.md` and `media-resource-index.md`.

| Date | Attempt ID | Clip ID | Segment ID | Subclip ID / Range If Any | Tool / Model | Selected Narrator Identity | Output Path | Full Generation Config JSON | Config / Prompt Separation Check | Prompt-Level Performance Cues Used? | Voice Consistency Check | Inspection Result | Persona / Performance Check | Follow-Up |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | AUD-VO001-A1 | VO-001 | SEG-001 |  | generate_speech |  |  |  |  |  |  |  |  |  |

## Approved Narration Text Per Attempt

| Attempt ID | Approved Narration Text |
| --- | --- |
| AUD-VO001-A1 |  |

## Full Speech Prompt Text Sent To Tool

Include bracketed audible cues here when used, for example `[warm, conversational]`, `[short pause]`, or `[gentle emphasis]`.

| Attempt ID | Full Speech Prompt Text |
| --- | --- |
| AUD-VO001-A1 |  |

## Prompt-Level Performance Cues

| Attempt ID | Cues Used | Why They Were Used | Subtitle Text Excludes Cues? (`Yes`/`No`/`N/A`) |
| --- | --- | --- | --- |
| AUD-VO001-A1 |  |  |  |

## Narrator Consistency

| Attempt ID | Voice / Speaker Identity | Model Route | Language / Accent Target | Matches Approved Narrator? (`Yes`/`No`) | Notes |
| --- | --- | --- | --- | --- | --- |
| AUD-VO001-A1 |  |  |  |  |  |

## Rejected Or Regenerated Clips

| Attempt ID | Clip ID | Reason | Replacement Attempt ID | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Concatenated Segment Clips

Use this only when one approved segment was generated as multiple subclips.

| Clip ID | Segment ID | Source Subclip Attempt IDs | Concatenated Audio Path | Concatenation Tool / Method | Boundary Smoothness Check | Completeness Check | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| VO-001 | SEG-001 |  |  |  |  |  |  |
