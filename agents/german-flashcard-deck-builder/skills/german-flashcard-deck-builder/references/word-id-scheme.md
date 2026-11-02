# Word Id Scheme

How this family of projects names the stable id each word carries into its
audio filenames (`<CODE>_word.mp3`, `<CODE>_sentence.mp3`). Confirm the
pattern still holds in the current project before relying on it: read a
handful of existing ids from its id-code sheet or its `audio/<family>/`
folder names.

- The family's root verb gets `ROOT-NNN`, a zero-padded number unique across
  the whole project (not per family) — e.g. `ROOT-045` for `arbeiten`,
  `ROOT-138` for `mieten`. The numbers observed in one project were not
  assigned alphabetically or by row order; treat the existing maximum as the
  only fact that matters and assign the next integer above it.
- Every prefix verb in the same family gets `<ROOT4>-NN`: the root verb's
  first four letters, upper-cased, then a sequential two-digit number
  starting at `01` within that family — e.g. `arbeiten` → `ARBE-01` …
  `ARBE-08`; `mieten` → `MIET-01` … `MIET-06`.
- Two different roots can land on the same four-letter code (observed:
  `fühlen` and `führen` both produced `FUEH-*`). That is accepted precedent
  in this scheme, not a bug to fix — do not invent a disambiguating suffix
  unless the user asks for one.
- `read_xlsx_rows.py next-codes` (in this skill's `scripts/`) computes the
  next `ROOT-NNN` and the next `<ROOT4>-NN` run from whatever ids you can
  already see (an id-code sheet, or the codes already present as
  `audio/<family>/*.mp3` filenames across the project).

This id is the audio filename convention. It has no required connection to
the image filename convention, which this family of projects numbers by the
word's position within the family instead (`01_<root>.png`,
`02_<first prefix verb>.png`, ...).
