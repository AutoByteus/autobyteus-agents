---
name: german-flashcard-deck-builder
description: Produce the images, audio, and HTML flashcard page for one German verb word family in an illustrated flashcard-deck project, following that project's own established character style, per-prefix visual-focus convention, and file/naming conventions.
---

# German Flashcard Deck Builder

## Trigger And Purpose

Use this skill when the user names a German verb word family (a root verb and
its prefix variants, e.g. `mieten` → `anmieten`, `vermieten`, ...) and a
target flashcard-deck project, and wants that family's cards produced the
same way an already-finished family in that project looks and sounds.

This skill does not invent a visual style, a prefix-meaning convention, or a
file layout. It discovers them from the target project's own files, the same
way a new contributor would, and reuses them.

## Inputs

- `project_root`: the flashcard-deck project's folder.
- `family`: the root verb name.
- Optional explicit word list (word, German example sentence, Chinese
  word-level meaning, type — root or prefix verb, level) when the family is
  not yet in the project's own word data. Required in that case; this skill
  does not invent German vocabulary or example sentences.

## Required Reads Before Any Generation

1. **An already-finished family** in the project (its images, its audio
   files, and how the viewer renders it) as the ground-truth example every
   new family must match.
2. **The project's image-planning document(s)**, if any (commonly a
   human-reviewable Markdown or Word file produced by the project's own
   planning script) — the source of the shared character-style text and the
   per-word image concept. [read_family_plan.py](scripts/read_family_plan.py)
   parses this.
3. **The project's raw word-list spreadsheet**, if the planning document
   does not cover this family or does not exist —
   [read_xlsx_rows.py](scripts/read_xlsx_rows.py) `read` reads it generically
   by column letter; look at the project's own planning script (if present)
   for which column letters it already maps to word/meaning/sentence/type/
   root/level, and reuse that mapping instead of guessing.
4. **The project's existing `images/<family>/` and `audio/<family>/` folders**
   for the live naming and numbering convention, and for the word's stable id
   code (audio filenames already carry it). See
   [word-id-scheme.md](references/word-id-scheme.md).
5. **The project's current viewer** (`index.html`, its script, its
   stylesheet) to learn the per-card data shape it renders and whether it
   already supports more than one family. See
   [viewer-data-architecture.md](references/viewer-data-architecture.md).

If the project shows none of this (a genuinely first-ever family, no planning
document, no prior viewer), stop and ask the user for the character style,
the file-naming convention, and one approved example card before generating
anything. Do not invent a new format silently.

## Step 1 — Resolve The Family's Word Rows

- Run [read_family_plan.py](scripts/read_family_plan.py) against the
  project's planning document with `--family <family>`. If it returns rows,
  those rows (plus their already-computed per-word image concept and the
  shared style bullets) are authoritative — do not recompute a focus or
  concept the document already gives you.
- If it returns no rows (new family, or no planning document), use the word
  list the user supplied, or `read_xlsx_rows.py read` if the family exists in
  the raw spreadsheet but not yet in the planning document. If the project
  has its own planning script, prefer re-running it after adding the new
  rows to its data source over writing the per-word image concept yourself,
  so the project's own per-prefix focus rules produce it. Only hand-write a
  concept per word when neither path is available, following the same shape
  as the existing rows (one literal scene from the example sentence, the
  prefix's visible effect, the concrete nouns involved, no text in the
  image).
- Keep the family's row order; it is also the image numbering order (see
  Step 3).

## Step 2 — Resolve Each Word's Id Code

- Prefer discovering codes directly from existing filenames: list
  `audio/<family>/*.mp3` in the project; the part before `_word.mp3` /
  `_sentence.mp3` is the code.
- If the family has no audio yet (new family), compute new codes with
  `read_xlsx_rows.py next-codes`, per
  [word-id-scheme.md](references/word-id-scheme.md). Record the assigned
  codes in the production log so a later run or a later spreadsheet update
  stays consistent with them.
- Appending new rows to the project's master spreadsheet is a decision for
  the user, since it is their hand-maintained source file: offer it, do not
  do it silently. Proceed with the viewer and assets either way; the
  assigned codes work as filenames with or without that spreadsheet update.

## Step 3 — Generate And Inspect Images

For each word, in family row order (the root verb is `01`, then each prefix
verb in the order the data gives them):

1. Build the prompt: the project's shared style bullets (character
   appearance, square format, no text in the image, ...) followed by the
   word's image concept from Step 1.
2. Call the image-generation tool with that prompt for a square image. Save
   the result to `images/<family>/<NN>_<word>.png` (zero-padded two-digit
   `NN`).
3. Open the saved file and inspect it: the character matches the project's
   established appearance, the prefix's visible effect from the concept is
   actually shown, the format is square, and there is no stray text, letter,
   watermark, or caption baked into the image. If a check fails, regenerate
   that word's image with an adjusted prompt before moving on; do not batch
   ahead on an unconfirmed image.
4. Check `check_family_assets.py` first if re-running on a family that may
   already have some images (e.g. resuming after a partial run); skip a word
   whose image already exists unless the user asked to redo it.

## Step 4 — Fill Audio Gaps

- Run `check_family_assets.py` for the family's codes to see which
  `_word.mp3` / `_sentence.mp3` files are already present. Generate only the
  missing ones; this project already has audio for every family it had
  before this skill existed, so most calls to this skill will find nothing
  to do here.
- If the project has no recorded voice choice yet for this skill (no prior
  production log naming one), check the available voices for the speech tool
  and pick one German-capable voice; record that choice in the production
  log so later families stay consistent with it. If a prior log already
  names a voice, reuse it without re-deciding.
- Generate the word audio (the single word, spoken) and the sentence audio
  (the full example sentence, spoken) for each missing file.
- Speech generation is serial-only: one call, wait for the result, inspect
  and log it, then `sleep 60` before the next speech-tool call — including
  after a retry or a failure. Never issue two speech-tool calls concurrently
  or in the background.

## Step 5 — Produce The Viewer For This Family

Follow [viewer-data-architecture.md](references/viewer-data-architecture.md):

- If the viewer has not yet been generalized to a shared, family-driven
  shape (`data/families.json` does not exist), do that migration once,
  extracting whatever family the viewer currently hardcodes into its own
  `data/<family>.json` first, and re-check that the viewer still renders
  that original family unchanged before continuing. This is a one-time,
  shared step, not something you redo per family.
- Write `data/<family>.json` for this family, one entry per word, in the
  same shape the viewer already renders (word, meaning, sentence,
  translation, image path, audio code, alt text). Translate each example
  sentence into natural Chinese for the `translation` field yourself — the
  word-list spreadsheet only has the word-level meaning, not a sentence
  translation, matching the register of translations already shown for a
  finished family.
- Add this family's entry to `data/families.json`.

## Step 6 — Validate With A Local Preview

- Start a local static file server in the project root in the background.
- Request the viewer with this family selected, and request this family's
  data file, each new image, and each new/changed audio file, and confirm
  they load. Confirm each new image is square and each new audio file is a
  valid, non-empty MP3.
- Stop the background server when done, and report the URL (with the
  family's selector/parameter) for the user to open themselves.

## Step 7 — Record And Hand Off

- Write the family's production log using
  [family-production-log-template.md](templates/family-production-log-template.md)
  (word rows and codes used, every image generation call and its inspection
  result, every audio generation call and the `sleep 60` compliance, the
  viewer changes made, and the validation result).
- Call `get_handoff_rules`, apply every matching rule, and send the result
  (production log path, and the local preview URL) to each exact returned
  `recipient_address`. If no rule matches, return the result to the user or
  calling workflow.

## Recovery

- A failed or rejected image/audio generation call: log it, retry with an
  adjusted prompt, and keep the family's row order; do not skip a word
  silently.
- An ambiguous or missing convention (no planning document, no prior family,
  no viewer): stop and ask, per "Required Reads" above, rather than guessing.
- A partially-produced family from an earlier run: use
  `check_family_assets.py` to resume from what is actually missing instead of
  regenerating finished work.
