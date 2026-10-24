# Data Format of the Library

The content of a library lives in `inhalt/` as YAML files: one file per knowledge point,
holding its teacher part (nine fields) and its slides. The build validates everything
and reports each error with file and place. A complete small example is in
[../beispiel/](../beispiel/inhalt/K7/K7-01/K7-01.1.yaml). The slide components and
their fields are listed in [bausteine.md](bausteine.md).

## Folder

```text
<library>/
  index.html                 start page (written by the build)
  app/                       app and data (written by the build; do not edit)
  inhalt/
    bibliothek.yaml          title, Land, curriculum, grades and Lernbereiche
    K8/K8-01/kapitel.yaml    one chapter (the teacher's unit)
    K8/K8-01/K8-01.1.yaml    one knowledge point with its slides
    medien/                  photos and drawings; medien/quellen.yaml lists their sources
  pruefung/                  report and pictures of the last check (written by pruefen)
```

## IDs

IDs never change and are never reused. A new item takes the next free number.

| Level | ID | Example |
| --- | --- | --- |
| Grade | `K<n>` | `K8` |
| Lernbereich / Wahlbereich | `K<n>-LB<m>` / `K<n>-WB<m>` (number as in the curriculum) | `K8-LB5` |
| Chapter (the teacher's unit) | `K<n>-<nn>` | `K8-01` |
| Knowledge point | `<chapter>.<n>` | `K8-01.5` |
| Learning goal | `Z<n>` within its knowledge point | `Z2` |
| Slide | `<knowledge point>-<type><n>` or `<chapter>-<type><n>` | `K8-01.5-UE1` |

Slide types: `EI` Einstieg, `EN` Entdecken, `ER` Erklärung, `UE` Üben, `DI` Diagnose,
`VT` Vertiefung, `AK` weitere Aktivität (experiment, discussion, model building, summary).

## bibliothek.yaml

`titel`, `land`, `lehrplan` (`titel`, `fassung`, `quelle`), and `klassen`: each with `id`,
`titel` and `lernbereiche`. Each Lernbereich has `id`, `titel`, `ustd` (reference hours),
`seite`, `text` (the curriculum wording, verbatim), and `wahl: true` for an elective.

## kapitel.yaml

- `id` equals the folder name;
- `titel`, `lernbereich` (an ID from bibliothek.yaml), `kurz` (one sentence);
- `einheit`: the teacher's own text, verbatim;
- `stunde`: a suggested lesson, with `titel`, `folien` (slide IDs in order) and `text`;
- `versuche`: experiments and safety;
- `quellen`: sources;
- optionally `folien` for slides that belong to the whole chapter (summary, exit ticket).

## Knowledge point (`<ID>.yaml`)

- `id`, `titel`, `kurz` (one sentence);
- `begriffe`: each with `begriff`, `stufe` (`K` kennen or `A` anwenden) and `erklaerung` (in pupils' language);
- the nine fields below;
- `folien`.

All nine fields are required. `entwurf: true` turns missing fields into warnings while
a point is being written.

| Field | Content |
| --- | --- |
| `lehrplan` | `zitat` (curriculum text, verbatim), `seite`, `ebene` (Einblick gewinnen, Kennen, Übertragen, Anwenden, Beherrschen, Sich positionieren, Beurteilen, Gestalten), `art` (`experiment`, `modell`, `rechnen`, `erkenntnisgewinnung`, `anwendung`: true/false), `eigen` (own planning, kept apart from the curriculum) |
| `lernziele` | list of `id`, `afb` (I/II/III), `text` ("Die Schülerinnen und Schüler können …", checkable, one verb) |
| `erfolgskriterien` | list of `ziel`, `text`: how the teacher sees the goal reached |
| `sachanalyse` | the chemistry for the teacher, as deep as needed |
| `didaktik` | introduction, everyday link, experiment, picture/model/animation, interaction, and what to do if pupils do not understand |
| `lehrerskript` | what the teacher says, in German: opening, questions, prompts to observe, explanation, transition, summary |
| `fehlvorstellungen` | list of `vorstellung`, `warum` (why it is wrong), `diagnose` (a question that reveals it), `korrektur` (with `folie`: the slide that corrects it), `verstanden` (how to see it is resolved) |
| `aufgaben` | list of `afb`, `aufgabe`, `loesung` (with explanation) |
| `verknuepfungen` | list of `rel` (`vorwissen`, `gleichzeitig`, `spaeter`, `oberstufe`), `ref` (an ID), `text` |

## Slide

Each entry in `folien` has these fields:

- `id`;
- `titel` and `zweck`: short, for the card in the library;
- `ziele`: the goal IDs it serves; chapter slides use full IDs such as `K8-01.5-Z1`;
- `einsatz`: `neu` (first learning), `wdh` (short revision) or `pruef` (exam preparation);
- `niveau`: I, II or III;
- `min`: minutes in class;
- `frage`: the one core question, shown as the heading;
- `bausteine`: one to three components;
- `merke`: optional; one short key statement;
- `layout`: optional; `auto`, `voll` or `bild-rechts`;
- `notizen`: the speaker notes.

Each slide stands alone: it does not depend on another slide.

**What pupils see:**
- the question, the components, and the key statement;
- at most about 40 visible words;
- text at least 28 px on the 1920×1080 stage (the components set the sizes; do not add small text);
- pictures, models and interaction first;
- definitions only in short form.

Everything for the teacher (explanations, expected answers, misconceptions, sources,
safety detail) goes into `notizen` or the knowledge point's fields, never onto the slide.

## Privacy

The build writes the student part and the teacher part of each chapter into separate files.

- **Student part:** the slides and the terms. The audience window and the student exports load only this part.
- **Teacher part:** notes, the nine fields, and the chapter's `einheit`, `stunde.text`, `versuche` and `quellen`. It is shown only in the library, in the presenter window, and in the teacher exports.

The check fails if teacher text reaches a student output.

## Text notation

Text fields are Markdown. Formulas and equations are written in double braces:
`{{H2SO4}}`, `{{SO4^2-}}`, `{{2 H2 + O2 -> 2 H2O}}`. The same notation goes into the
`formel` field of a `gleichung` component.

| Element | How to write it |
| --- | --- |
| Coefficients | `2 H2O`, `1/2 O2` |
| Charges | `Cu^2+`, `SO4^2-`, `H3O^+`, `OH^-` |
| Electrons | `e^-` |
| Groups and hydrates | `Ca(OH)2`, `[Cu(H2O)4]^2+`, `CuSO4*5H2O` |
| States | `(s) (l) (g) (aq)` at the end of a species |
| Arrows | `->`, or `<=>` for an equilibrium |
| Bonds | `-` and `=` inside a formula are ignored for the check |
| Polymers | repeat unit with n = 1 |
| Organic groups | `R` counts like an atom |

Every equation is checked for atoms and charge. Words such as "Energie" stay outside the braces.

## Media

- Files go in `inhalt/medien/`.
- Every photo or other raster image needs an entry in `medien/quellen.yaml`: `datei`, `titel`, `urheber`, `lizenz`, `url`. The credit then shows under the picture.
- Keep photos at most 1600 px wide and 400 KB.
- SVG drawings need no entry when they are your own.
- The build scopes each SVG's styles and animation names to that drawing, so class names cannot clash. Animate with CSS inside the SVG; the app stops motion in thumbnails and for reduced motion.
- SVG must not contain scripts or `on…` attributes.
