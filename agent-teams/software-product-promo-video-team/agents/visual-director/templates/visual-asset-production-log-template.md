# Visual Asset Production Log

## Logging Rule

- Record one entry for every material generated, edited, polished, rejected, or revised visual asset.
- The production log is evidence; only assets that pass review should be treated as approved final visual assets.

## Entry Template

### Asset: [asset-id]

- Shot id:
- Voiceover clip id:
- Clip visual order:
- Visual dwell / relative placement:
- Visual source index entry id:
- Source / seed visual source index ids:
- Asset purpose:
- Route: source UI seed / source-based edit / generated conceptual support / same-style supported use case / rejected
- Source refs:
- Source evidence:
- Same-style supported use-case basis:
- Product UI base/reference image used:
- Prompt-only exception reason, if no UI base/reference was used:
- Tool used:
- Tool used: `generate_image` / `edit_image`
- Final still asset is `generate_image` / `edit_image` output: yes / no / not final still
- Raw user screenshot used directly as final still: no
- Python/PIL/script-only final visual: no
- Model identifier returned by tool, if available:
- Aspect ratio and orientation phrase included in prompt:
- Exact prompt or edit instruction:
- Input image refs:
- Source invariants preserved:
- Allowed changes requested:
- `generation_config` status, should be `omitted` for prompt-only `generate_image` routes:
- Callout / highlight target:
- Output path:
- Visual self-check decision: candidate passed self-check / needs edit / rejected / blocked
- Defects found during visual self-check:
- Follow-up action: none / edit_image correction / regenerate / request source / route upstream
- Truthfulness check:
- UI/text drift check:
- Readability check:
- Generation artifact check:
- Sensitive-data check:
- Candidate status:
- Reviewer status:
- Reason for retry or rejection:
- Cooldown completed after call:
- Notes:
