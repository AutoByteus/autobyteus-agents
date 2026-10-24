---
name: chemistry-teaching-module
description: Build an interactive German-language teaching module for one chemistry concept, reaction, process or experiment at Gymnasium grades 7–12, as one offline HTML file with animated particle and apparatus pictures, pupil interactions, graded tasks with hidden solutions, teacher notes, and checked chemistry and experiment safety.
---

# Chemistry Teaching Module

A chemistry teacher names a topic. You deliver one module she can project in class
and pupils can work through on their own devices. Its purpose is to show the
abstract part (what the particles do, why the reaction runs, how the process works)
as moving pictures and things pupils try, so that a lesson needs fewer words and
pupils understand more. The module content is German; the chemistry must be right.

## 1. Know the class and the teacher

A teacher's request is short, such as „Morgen Klasse 8, Eisen und Schwefel“. Work out
the rest yourself:

- the topic and what kind it is: a concept (Begriff), a reaction, a process, or an experiment;
- the grade and course (Klasse 7–10, or Oberstufe Grundkurs or Leistungskurs), the
  Bundesland and the curriculum section (Rahmenlehrplan or Kernlehrplan), and what the
  class already knows;
- how the module is used: projector in front of the class, pupils' own devices, or both;
  which lesson phase (introduction, working phase, practice, revision) and how much time.

Take these from the request, from `unterrichtsprofil.md` in her module folder, and from
her existing modules, which show her Land, level and style; open one before building.
Where nothing tells you, choose what fits a normal lesson: projector and pupils'
devices, about 90 minutes. Ask only when a wrong guess would make the module unusable,
in one short line. Record what you learn about her (Land, curriculum, courses,
textbook, how she uses modules, her feedback) in `unterrichtsprofil.md`, so the next
request needs no question.

## 2. Plan the module

Write a short plan in German (`src_<thema>/plan.md`):

- title, grade and course, curriculum reference, time;
- learning goals as things pupils can do afterwards;
- the sequence of slides, each with its guiding question (Leitfrage);
- for each core idea: the picture, animation or interaction you will use and what it
  makes visible that words do not;
- tasks by requirement level (Anforderungsbereich I, II, III);
- the misconceptions the module takes up;
- each experiment, marked as teacher demonstration or pupil experiment.

Scale the module to the request: one concept for one lesson is roughly 8–15 slides; a
whole topic area can be 50–70. Then build straight away; the teacher corrects the
finished module, not the plan.

## 3. Build

Keep the sources in `src_<thema>/` as numbered parts and build one self-contained file
`<thema>.html` in her module folder. Fill the title, the description and the `klasse`
meta tag in the head; a library search reads them. When her module folder already has
modules with sources, copy the head and tail parts of the newest one, so the new module
looks and works like hers. Otherwise
start from [assets/module-shell/](assets/module-shell/): `00_head.html` (styles),
`99_tail.html` (navigation and behaviour), `build.py`, and `10_bausteine.html`, which
shows each building block once; replace it with your own parts. The file must run
offline from a double click: no network requests; fonts and pictures are embedded.

**Slides.** Each slide answers one guiding question. Use the boxes for what they mean:
definition, Merke, observation (Stoffebene), interpretation (Teilchenebene), task with
its level, hidden solution, warning, everyday link. Each slide's `aside.notes` holds the
teacher notes: lesson goal, prior knowledge, opening question, expected answer, teacher
explanation, typical mistake, transfer question, the model's limits where a model is
shown, and sources.

**Pictures and animation.** Every abstract idea gets a picture. Draw particles,
structures and apparatus as SVG in code; image generators misdraw formulas, charges
and glassware. Choose the form from the idea:

- a sequence (electron transfer, a mechanism, the steps of an experiment): a step
  animation the teacher advances with → or Space, one caption per step;
- motion and chance (particle movement, collisions, dynamic equilibrium): a running
  particle model;
- a dependency pupils should discover (temperature, concentration, pH): a model with a
  slider;
- an observation that needs an explanation: let pupils predict first, then show.

Connect what you see (Stoffebene), what the particles do (Teilchenebene) and the
equation (Symbolebene), ideally side by side. An animation obeys the same chemistry as
the equation: the same atoms before and after, correct charges and ratios, sizes in
the right order (a cation smaller than its atom, an anion larger).

**Building blocks in the shell.** Step animation: `.anim[data-steps]` with
`data-show`, `data-hide`, `data-at` (adds class `at` for CSS movement) and `data-cap`.
Prediction: `.predict` with `button[data-correct]` and `.reveal`. Sorting: `.sort`
with `.item[data-bin]` and `.bin[data-bin]`, tap the item, then the field. Own model:
`data-widget="name"` plus `WIDGETS.name = function(el){…}`. Solution: `.sol`. Self-check:
`.check`. Every reaction equation gets its machine-readable form in `data-eq` (notation
in [check_equations.py](scripts/check_equations.py)). Unfinished text is written `‹…›`.

**Interaction.** Pupils act and get feedback: predict before the reveal, sort or assign,
change a slider, step through a virtual experiment, tick a self-check. Everything works
with a mouse, by touch and with the keyboard; use tapping instead of dragging. Respect
reduced motion.

**Tasks.** Use the operators of the Bildungsstandards (nennen, beschreiben, erklären,
begründen, beurteilen …) and mark the level I, II or III. Tasks use the animations
("Beschreibe, was in Schritt 3 mit den Elektronen geschieht"). Solutions are written
out as the expected answer, in full sentences.

**Language.** Klasse 7–8: short sentences, every technical term explained when it first
appears. Oberstufe: full technical language. Use one term for one concept throughout.

**Chemistry and safety.** Follow [chemistry-and-safety.md](references/chemistry-and-safety.md).

## 4. Check

Fix what each check finds and run it again.

- `python3 scripts/check_equations.py <thema>.html`: every equation balanced in atoms
  and charge.
- `python3 scripts/check_module.py <thema>.html`: overflow past the slide edge, script
  errors, network resources, unfinished `‹…›` text; it saves a screenshot of every slide
  and of every animation step.
- Look at every screenshot as the class would see it on a projector: legible from the
  back row, nothing cut off or overlapping, the animation steps tell the story in order.
- Open the module in the browser and use each interaction once: a right and a wrong
  prediction, sorting with a mistake, the slider at both ends, solutions, teacher notes
  (N), printing (P).
- Read the whole module once more against [chemistry-and-safety.md](references/chemistry-and-safety.md),
  as a chemistry teacher checking a colleague's material.

## 5. Deliver and revise

Write a delivery note in German to `src_<thema>/uebergabe.md` and give it to the
teacher or the requester. It says where the file is and that it opens with a double click and
runs offline; the keys (→ step, N teacher notes, L solutions, P print); what the module
contains; which safety points she must confirm in her risk assessment; and every fact you
could not confirm from a source. Ask the teacher what to change. Apply her feedback, run the checks
again, and record lasting preferences in `unterrichtsprofil.md`.

The module is finished when the teacher accepts it, or when it is delivered with every
check passing and the open points listed.
