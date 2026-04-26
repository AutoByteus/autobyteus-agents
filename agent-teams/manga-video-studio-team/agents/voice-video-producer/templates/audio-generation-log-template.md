# Audio Generation Log

## Logging Rule

- Record one entry for every material speech-generation call.
- Keep the exact spoken text, speech tool, and model identifier returned by the tool when available so future chapters can reuse voice and phrasing patterns without guessing.
- Speech-generation calls may run in parallel or batches when the active runtime supports high-throughput generation.

## Entry Template

### Clip: [clip-id]

- Source storyboard audio beat ids:
- Source scene and render-unit ids (frame ids for `video-frame`; page/panel ids only for explicit non-default contracts):
- Generation mode:
- Distinct speakers in call:
- Exact spoken text:
- Performance directions or stage cues:
- Speech tool used:
- Model identifier returned by tool, if available:
- Voice:
- Language:
- Speech settings used:
- Prompt-level performance directions:
- Output path:
- Approval status:
- Batch id or parallel group:
- Completion order:
- Notes for reuse in future chapters:
