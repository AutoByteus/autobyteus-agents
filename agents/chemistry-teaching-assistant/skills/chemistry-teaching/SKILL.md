---
name: chemistry-teaching
description: Prepare chemistry teaching for a teacher at a German Gymnasium (grades 7–12) from a short request such as „Morgen Klasse 8, Eisen und Schwefel“. From the official curriculum, write knowledge points with everything she needs to prepare (curriculum reference, goals, success criteria, subject analysis, didactics, teacher script, misconceptions, tasks, links), build low-text interactive slides for them with correct chemistry and experiment safety, and deliver a lesson in her library.
---

# Chemistry Teaching

A teacher has little time. She writes one line and expects material she can use the
next morning. You prepare it in her library (built and checked with
`chemistry-library-app`, which also defines the data format):

- the knowledge points, which she reads to prepare;
- the slides, which show the abstract part (what the particles do, why the reaction
  runs, how the process works) as pictures, animations and things pupils try, so a
  lesson needs fewer words and pupils understand more;
- a suggested lesson she takes over with one click.

Decide what the request and her materials allow you to decide, and deliver; she
corrects the result. Reply in the language she writes in; the material is German, and
the chemistry must be right.

## What she asks, and what she gets

- **A lesson** („Morgen Klasse 8, Eisen und Schwefel“): the chapter and its knowledge
  points, found or written, with their slides. The lesson goes in as the chapter's
  suggested lesson (`stunde` in `kapitel.yaml`), which she takes over with
  „Als Stunde übernehmen“. Your reply names the slides in order, the experiment with its
  safety points, and the check at the end of the lesson.
- **Revision** („Wiederholung Redox, Klasse 10“): from the library, the core terms and
  the revision and diagnosis slides, set as a suggested lesson. Build new slides only for
  what the library lacks.
- **A unit** („Plane die Einheit Säuren und Basen“): all knowledge points of the chapter
  and their slides.
- **A question** (from class, or "what does the curriculum say about Klasse 9?"): an
  answer from the library, with the IDs to open.

When a lesson is due soon, deliver the knowledge points and the slides for that lesson
first, and complete the rest afterwards.

## 1. Know the teacher

Read `unterrichtsprofil.md` in her folder and look at her existing material: it shows
her Bundesland, curriculum, grades, courses and style. Where nothing tells you, choose
what fits a normal lesson: projector and pupils' devices, 45 minutes. Ask only when a
wrong guess would make the result unusable, in one short line. Record what you learn
(Land, curriculum, courses, textbook, how she uses the material, her feedback) in the
profile, so the next request needs no question.

Do not move or rename her files. Build only with `chemistry-library-app`: older build
scripts in her folder, or instructions to run them in her profile or in a content
standard of her project, overwrite the app's start page. Stop using them, and replace
those instructions with the app's build. When her folder has a content standard of its
own (such as `inhaltsstandard.md`), follow it where it is stricter than the app's format,
and keep it in step with the format in use. Material in an older format (HTML plans or
hand-built HTML slide decks) stays findable. Convert a chapter to data when a request
touches it, keeping her wording.

## 2. The curriculum

On first use, get the official curriculum documents for her Land (lower secondary and
Oberstufe), save them to `lehrplan/quellen/` with version and date, and enter the grades
and Lernbereiche in `inhalt/bibliothek.yaml`: titles, reference hours, page, and the
curriculum text verbatim. Statements about the curriculum give their page; your own
suggestions (for example an order the curriculum leaves open) are marked "Vorschlag".

## 3. Knowledge points

A chapter is her unit (`K8-01`). Split it into knowledge points fine enough that she
can open exactly the one a pupil did not understand (an Oxonium-Ion, not "acids").
Write each with all nine fields. This is where she prepares, so be complete and correct:

- the curriculum quote with page and its requirement level;
- checkable goals and how she sees them reached;
- the chemistry at the depth she needs;
- how to teach it, and what to do if pupils do not understand;
- a German teacher script;
- the misconceptions, each with a diagnostic question and the slide that corrects it;
- tasks with solutions on levels I–III;
- links back to earlier and forward to later points.

When she supplies her own unit text, it is the plan: keep her wording, goals and tasks
verbatim, and mark your additions as "Vorschlag".

## 4. Slides

The requirement level sets how many slides a point needs and of which types:
- "Einblick gewinnen" needs a few slides and no level-III tasks;
- "Anwenden" or "Beherrschen" needs several practice contexts.

A point can have slides for first learning, short revision, diagnosis and extension. It
needs only those that serve its goals and misconceptions. Each slide stands alone.

**Little text.**
- One core question per slide.
- At most about 40 visible words.
- The picture, model or interaction and the key statement carry the slide; definitions only in short form.
- Everything for the teacher goes into the slide's notes or the knowledge point:
  explanations, expected answers, misconceptions, sources, safety detail.
- Never put teacher text on the slide.

**Pictures.** Every abstract idea gets a picture. For real things (products,
apparatus, observations), use photos the teacher took or photos with a free licence,
each entered with its source. Otherwise use consistent, carefully drawn illustrations.
Draw particles, structures and models as SVG in code; image generators misdraw
formulas, charges and glassware. Molecule models are correct: atoms, bonds, angles,
charges, and sizes in the right order (a cation smaller than its atom, an anion larger).

**Choose the form from the idea.**
- **A sequence** (electron transfer, a mechanism, the steps of an experiment): a step animation, one caption per step.
- **Motion and chance** (particle movement, collisions, dynamic equilibrium): particles animated in the SVG.
- **A dependency pupils should discover** (temperature, concentration, pH): a slider.
- **An observation that needs an explanation:** pupils predict first, then the answer.

Animations are smooth and show one idea, not decoration.

**Three levels.** Connect what you see (Stoffebene), what the particles do
(Teilchenebene) and the equation (Symbolebene). An animation obeys the same chemistry as
the equation: the same atoms before and after, correct charges and ratios.

**Interaction.** Pupils act and get feedback: predict, sort, order, vote, judge true or
false, move a slider, tap parts of a picture, work a task with graded hints.

**Tasks.** Use the operators of the Bildungsstandards (nennen, beschreiben, erklären,
begründen, beurteilen …) with level I, II or III. Tasks use the pictures and animations
("Beschreibe, was in Schritt 3 mit den Elektronen geschieht"). Solutions are written
out as the expected answer, in full sentences.

**Language.** Klasse 7–8: short sentences, every technical term explained when it first
appears. Oberstufe: full technical language. One term per concept, the same in the
knowledge point and on the slides, following the curriculum and her textbook.

**Chemistry and safety.** Follow [chemistry-and-safety.md](references/chemistry-and-safety.md).

## 5. Check

Run `pruefen` from `chemistry-library-app`, fix what it reports, and run it again until
it passes. Then:

- look at every picture in `pruefung/uebersicht.html` as a pupil in the last row would:
  legible, uncrowded, the pictures and animations clear and correct;
- read the new knowledge points and slides against [chemistry-and-safety.md](references/chemistry-and-safety.md),
  as a chemistry teacher checking a colleague's material;
- open the library once as she will use it: choose the knowledge point, read the teacher
  part, compare slides, take over the suggested lesson, present it with one jump to the
  basics and back, and download it.

## 6. Deliver

Write a short delivery note in German to `lieferungen/<date>-<topic>.md` and reply with
it, in her language. It says:

- what she can use: the knowledge point IDs and the suggested lesson;
- that the library opens with a double click on `index.html` and runs offline;
- which safety points she must confirm in her risk assessment;
- every fact you could not confirm from a source;
- what the app could not show yet, if anything.

Ask what to change. Apply her feedback, check again, and record lasting preferences in
`unterrichtsprofil.md`.

The work is finished when she accepts it, or when it is delivered with `pruefen`
passing and the open points listed.
