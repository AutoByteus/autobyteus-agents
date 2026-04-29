# Slide Generation Log

## Logging Rule

- Record one entry for every material `generate_image` or `edit_image` call.
- Slide image calls are serial-only. Complete one call, inspect the actual output image, log the decision, then run `sleep 60` before the next image call.
- Final slide images must be `generate_image` or `edit_image` outputs.

## Entry Template

### Slide: [slide-id]

- Attempt:
- Tool used: generate_image / edit_image
- Prompt or edit instruction:
- Input image refs:
- Aspect ratio and orientation phrase in prompt:
- `generation_config` status for `generate_image`: omitted
- Output path:
- Source / evidence anchors:
- Required text:
- Text fidelity check:
- Readability check:
- 16:9 format check:
- Style consistency check:
- Claim/source alignment check:
- Sensitive-data check:
- Visual self-check decision: candidate passed self-check / needs edit / rejected / blocked
- Defects found:
- Follow-up action: none / edit_image correction / regenerate / route research gap / ask user
- Cooldown completed after call:
- Notes:
