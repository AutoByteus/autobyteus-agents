# Audio Generation Log

## Logging Rule

- Record one entry for every material speech-generation call.
- Speech-generation calls must be serial-only: one call, result, inspection/logging, `sleep 60`, then the next call.
- Keep the exact spoken text, speech tool, voice, and model identifier returned by the tool when available.

## Entry Template

### Clip: [clip-id]

- Script section:
- Exact spoken text:
- Performance directions:
- Speech tool used:
- Model identifier returned by tool, if available:
- Voice:
- Language:
- Speech settings used:
- Output path:
- Approval status:
- Sequential call number:
- `sleep 60` completed before next speech-tool call or retry:
- Notes:
