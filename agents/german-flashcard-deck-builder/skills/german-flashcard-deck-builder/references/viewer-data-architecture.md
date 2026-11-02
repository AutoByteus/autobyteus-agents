# Viewer Data Architecture

Target shape for generalizing a single hardcoded flashcard viewer into one
that can show any produced family, without changing its look or breaking the
family it already shows by default. Adapt file names to what the project
actually has; this describes the structure, not a fixed file to copy in.

## Why generalize instead of generating one page per family

One shared `index.html` / `app.js` / `styles.css` stays the single owner of
the card layout, navigation, and audio behavior. A family picker then only
changes which data file is loaded. Generating a separate static page per
family would duplicate that markup and script for every family and let them
drift.

## Target shape

```
data/
  families.json       # [{ "id": "arbeiten", "label": "arbeiten" }, { "id": "mieten", "label": "mieten" }, ...]
  arbeiten.json        # [ { word, meaning, sentence, translation, image, audio, alt }, ... ]
  mieten.json
```

- `data/<family>.json`: the same per-card fields the viewer already renders
  (word, meaning, sentence, translation, image path, audio code, alt text),
  in family row order. This is exactly what was hardcoded into the script
  before generalizing; after generalizing, writing a new family only means
  adding one more file here plus one entry in `families.json`.
- `data/families.json`: the list the family picker renders. Append one entry
  per family the first time its data file is produced; never remove an
  existing entry as a side effect of adding another.

## Script changes

- Read the family id from the page URL (e.g. a `family` query parameter),
  defaulting to whichever family the viewer showed before generalizing, so a
  link with no parameter still renders exactly as before.
- Fetch `data/<family>.json` instead of a literal in-script array, and
  render it with the existing card logic unchanged.
- Populate the family picker from `data/families.json`; selecting an entry
  updates the page URL and reloads that family's data at the first card.
- Update the page title from the loaded family so each family's tab/header
  still identifies the word family shown, matching the original per-family
  title.

## Markup changes

- Add one small picker control (e.g. a `<select>`) near the existing family
  label, styled with the page's existing tokens. Do not change the card
  layout, navigation, or audio controls.

## One-time migration, then incremental

Do this migration once, the first time this skill runs against a viewer that
still has the family hardcoded directly in its script. Detect it by checking
whether `data/families.json` already exists:

- **Missing:** migrate. Extract the hardcoded family's cards into
  `data/<that-family>.json`, create `data/families.json` with that one
  entry, then apply the script and markup changes above. Reload the
  viewer with no `family` parameter and confirm it still renders that
  family's first card, text, image, and both audio buttons exactly as
  before the migration.
- **Present:** already migrated by an earlier run. Skip straight to adding
  the new family's `data/<family>.json` and its `families.json` entry.
