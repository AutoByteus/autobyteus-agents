# Audio Generation Log

## Logging Rule

- Record one entry for every material speech-generation call.
- Speech-generation calls are serial-only. Complete one call, inspect and log it, then run `sleep 60` before the next call.
- Keep the exact spoken text, speech tool, voice, and model identifier returned by the tool when available.

## Entry Template

### Clip: [clip-id]

- Beat id:
- Exact spoken text:
- Performance directions:
- Speech tool used:
- Model identifier returned by tool, if available:
- Voice:
- Language:
- Speech settings used:
- Output path:
- Measured seconds:
- Approval status:
- Cooldown completed after call:
- Notes:
