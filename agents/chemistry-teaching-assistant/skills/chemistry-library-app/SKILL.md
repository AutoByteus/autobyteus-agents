---
name: chemistry-library-app
description: Build, update and check a teacher's offline chemistry library app. Knowledge points and slides are YAML data, rendered by shared slide components. The app offers a three-column knowledge view, a gallery, saved lessons, a presenter mode with a separate audience window, and exports (student HTML, teacher HTML, PowerPoint with notes, PDF). A browser test activates every control before delivery.
---

# Chemistry Library App

The teacher's library is one folder that opens with a double click and runs offline:
no account, no hosting, no installation. Content is data in `inhalt/`; this skill's
prebuilt app turns it into `index.html` and `app/`. Building needs Node 22 or newer and
nothing else. The check also needs Chrome or Chromium.

## What she gets

- **Wissen:** three columns (knowledge tree | curriculum and teacher preparation | slides).
  The left and middle columns close, so the slide cards grow large.
- **Alle Folien:** every slide as a live thumbnail, with filters.
- **Meine Stunde:** compose, reorder, time, save several lessons, resume where she
  stopped, take the rest as a new lesson, and download.
- **Präsentieren:** a presenter window with notes, next slide, timer, slide strip, jump to
  basics and back. The audience window shows only slides and never loads teacher data.
- **Downloads:** student HTML (one file, no notes), teacher HTML (presenter view
  included), PowerPoint (slides as pictures, notes as speaker notes), PDF with or without
  notes.
- **Suche:** terms, knowledge points, slides, tasks, and her older HTML slide decks.

## Build

Write or change content as described in [data-format.md](references/data-format.md);
the components are listed in [bausteine.md](references/bausteine.md), and
[beispiel/](beispiel/inhalt/bibliothek.yaml) is a small complete library. Then run:

```bash
node <this skill>/dist/bibliothek.mjs bauen <library folder>
```

The build reports errors and hints with file and place: missing fields, unknown IDs,
unbalanced equations, missing picture sources, too many words. It writes nothing while
there are errors. It writes `index.html` and `app/`. A start page the app did not write
is kept once as `index-vorher-<date>.html` and never overwritten again. Her other files
stay where they are.

On first use in a folder that has no `inhalt/` yet, write `inhalt/bibliothek.yaml` from
her curriculum, then her first chapter.

## Check before every delivery

```bash
node <this skill>/dist/bibliothek.mjs pruefen <library folder>
```

`pruefen` builds, then works through the library in Chrome:

- it clicks every control in every view, in the presenter window and on every slide;
- it measures every slide at 1920×1080: visible words, smallest font, content past the edge;
- it checks that no teacher text reaches the audience window, the student HTML or the student PDF;
- it produces every export and opens it.

It writes `pruefung/bericht.md` and `pruefung/uebersicht.html`, which has a picture of
every slide, step and solution state. Deliver only when the report says "bestanden".
Then open the overview page and look at every picture as a pupil in the last row would:
legible, not crowded, the pictures and animations clear and correct. `--folie <id>`
checks one slide while you work on it.

## When the app lacks something

The app and its components are this skill's: `app/` is the source, `dist/` the
build. Do not edit `app/` inside a library; the next build replaces it. If slides need
a component the app does not have, use the closest existing one. Record the need in
your delivery note, so the package can add the component.
