# Image Generation Log

## Log Status

Final slide images must be `generate_image` or `edit_image` outputs.
Log every accepted, rejected, failed, timed-out, regenerated, or edited image attempt.
Update this file immediately after every `generate_image` or `edit_image` result, failure, timeout, rejection, regeneration, or edit decision, before `sleep 60` and before the next image call.
Record full prompts and full generation/edit configs, not summaries.
Use a minimum visual acceptance check by default: file validity, required embedded content, readable on-image text, approved mood/style, and obvious visual failure. Do not create a separate detailed visual-critique loop unless the user requests it or an obvious defect appears. User visual approval may be recorded here, but it does not replace this log.

## Image Generation Calls

| Date | Attempt ID | Slide ID | Tool / Model | Output Path | Full Generation Or Edit Config JSON | Intended Visual Type | Visual Standard / Engagement Intent | Defect Being Fixed If Retry | Preserve From Prior Attempt | Inspection Result (`Pass`/`Needs Edit`/`Reject`/`Blocked`) | Minimum Visual Acceptance Check | User Visual Approval / Waiver Notes | Mood / Style Check | Embedded Content Check | `sleep 60` Completed Before Next Image Call? | Follow-Up |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | IMG-SL001-A1 | SL-001 | generate_image |  |  |  |  |  |  |  |  |  |  |  |  |  |

## Full Image Prompts

| Attempt ID | Full Prompt Text |
| --- | --- |
| IMG-SL001-A1 |  |

## Rejected Or Regenerated Images

| Attempt ID | Slide ID | Reason | Replacement Attempt ID | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
