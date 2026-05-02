# Image Generation Log

## Log Status

Final slide images must be `generate_image` or `edit_image` outputs.
Log every accepted, rejected, failed, timed-out, regenerated, or edited image attempt.
Update this file immediately after every `generate_image` or `edit_image` result, failure, timeout, rejection, regeneration, or edit decision, before `sleep 60` and before the next image call.
Record full prompts and full generation/edit configs, not summaries.

## Image Generation Calls

| Date | Attempt ID | Slide ID | Tool / Model | Output Path | Full Generation Or Edit Config JSON | Intended Visual Type | Quality / Engagement Target | Defect Being Fixed If Retry | Preserve From Prior Attempt | Inspection Result (`Pass`/`Needs Edit`/`Reject`/`Blocked`) | Visual Quality / Engagement Check | Mood / Style Check | Embedded Content Check | `sleep 60` Completed Before Next Image Call? | Follow-Up |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | IMG-SL001-A1 | SL-001 | generate_image |  |  |  |  |  |  |  |  |  |  |  |  |

## Full Image Prompts

| Attempt ID | Full Prompt Text |
| --- | --- |
| IMG-SL001-A1 |  |

## Rejected Or Regenerated Images

| Attempt ID | Slide ID | Reason | Replacement Attempt ID | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
