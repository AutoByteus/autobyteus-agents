# Audio Generation Log

## Log Status

Generated narration must use `list_audio_models` and `generate_speech` only. Do not use `speak`.
Generate speech serially and log each result. Update this file immediately after every `generate_speech` result, failure, timeout, rejection, or regeneration decision, before `sleep 30` and before the next speech call.
Run `sleep 30` after every `generate_speech` result, failure, or timeout before the next speech call.
Record approved narration text, full speech prompt text sent to the tool, prompt-level performance cues, selected narrator identity, voice-consistency check, and full generation config JSON for every accepted, rejected, failed, timed-out, or regenerated attempt.
Config fields such as `style_instructions` should describe broad voice/style only. Do not put cue examples or cue-handling instructions in config; cue tags belong in the full speech prompt text.

| Date | Attempt ID | Clip ID | Segment ID | Tool / Model | Selected Narrator Identity | Output Path | Full Generation Config JSON | Config / Prompt Separation Check | Prompt-Level Performance Cues Used? | Voice Consistency Check | Inspection Result | Persona / Performance Check | `sleep 30` Completed Before Next Speech Call? | Follow-Up |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | AUD-VO001-A1 | VO-001 | SEG-001 | generate_speech |  |  |  |  |  |  |  |  |  |  |

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
