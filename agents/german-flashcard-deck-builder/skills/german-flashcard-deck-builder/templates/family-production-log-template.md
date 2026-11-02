# Production Log — `<family>`

- Date:
- Project root:
- Source of word rows: (project's image-planning document / project's word-list spreadsheet / word list supplied by the user for a brand-new family)
- Words in family, in order: (NN — word — id code)

## Image generation

| NN | Word | Prompt used (style + concept) | Tool call | Saved path | Inspection result |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

Inspection result notes what was checked: square format, the Anna character
present and consistent, the per-prefix focus action visible, no stray text,
letters, or watermarks.

## Audio generation

| Id code | Word | `_word.mp3` | `_sentence.mp3` | Voice/model used | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  | already present / generated | already present / generated |  |  |

Record every actual speech-tool call serially, with the `sleep 60` done
before the next one, even for a retry.

## Viewer

- Migration to the shared family-picker architecture: already done by an earlier run / done in this run (describe what changed).
- `data/<family>.json` written: yes/no, path.
- `data/families.json` entry added: yes/no.

## Validation

- Local preview server: command, port, how it was stopped.
- Checks performed (page loads, family data loads, each image loads, each audio file loads) and their results.
- Local preview URL for the user to open.

## Open issues / follow-ups for the user
