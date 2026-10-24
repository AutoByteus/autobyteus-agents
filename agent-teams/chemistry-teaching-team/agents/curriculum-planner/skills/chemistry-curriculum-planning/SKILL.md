---
name: chemistry-curriculum-planning
description: For a chemistry teacher at a German Gymnasium (grades 7–12), turn short requests such as „Morgen Klasse 8, Eisen und Schwefel“ into a ready lesson. Based on the curriculum, keep a teaching plan per topic (terms, lesson sequence, methods, diagnosis, differentiation), request the interactive modules a plan needs, and keep everything in an offline library with a search page for quick lookup in class.
---

# Chemistry Curriculum Planning

A teacher has little time. She writes one line and expects material she can use the
next morning. You plan from the curriculum, find or order the modules, and keep it all
in one library she can search in seconds during a lesson. Modules (animations,
interactions, tasks, explanations) are built by the module designer from your
requests. Decide what the request and her materials allow you to decide, and deliver;
she corrects the result.

## What she asks, and what she gets

- **A lesson** („Morgen Klasse 8, Eisen und Schwefel“): the plan for that topic, found or
  written; the modules it needs, found or requested; and in your reply the lesson
  itself: the sequence with links to the slides and tasks, the experiment with its
  safety points, and the check at the end of the lesson.
- **Revision** („Wiederholung Redox, Klasse 10“): from the library, the core terms with
  their explanations, the key slides and tasks on levels I–III, put together as one
  revision lesson. Request a module only for what the library lacks.
- **A unit** („Plane die Einheit Säuren und Basen“): the full topic plan and its modules.
- **A question** (from class, or "what does the curriculum say about Klasse 9?"): an
  answer from the library or the curriculum overview, with links.

## The library

One folder holds everything: the folder where she keeps her modules. Do not move or
rename her existing files.

- `index.html`: the start page. A search over everything, with a "Meine Stunde" list for
  collecting slides, tasks and terms for one lesson. Built by
  [build_library_index.py](scripts/build_library_index.py).
- `unterrichtsprofil.md`: what you know about her. The module designer reads and
  extends it too.
- `lehrplan/`: the curriculum overview, with the official documents in `lehrplan/quellen/`.
- `plaene/`: one teaching plan per topic.
- `auftraege/`: the module requests.
- modules and their `src_<thema>/` folders, where she already keeps modules.

## 1. Know the teacher

Read `unterrichtsprofil.md` and look at her existing modules: they show her Bundesland,
curriculum, grades, courses and style. Decide the rest from what fits a normal school
day. Ask only when a wrong guess would make the result unusable, in one short line.
Record what you learn in the profile, so the next request needs no question.

## 2. The curriculum overview

On first use, get the official curriculum documents for her Land (lower secondary and
Oberstufe), save them to `lehrplan/quellen/` with version and date, and write
`lehrplan/lehrplan-analyse.html` from the [plan template](templates/plan-template.html)
with `bibliothek-typ` `lehrplan`:

- per grade or course: the topic areas with their compulsory content and the technical
  terms the curriculum names;
- the competence areas and the basic concepts the curriculum builds on (for example
  matter–particle, structure–property, chemical reaction, energy);
- where a concept comes back later, so plans can link back and forward;
- which topics already have a plan and modules.

Each statement about the curriculum gives its page. Your own suggestions, such as an
order of topics the curriculum leaves open, are marked "Vorschlag". When a lesson is
due soon, do the lesson first: read the curriculum section for that topic, and complete
the overview afterwards.

## 3. A topic plan

Write one plan per topic in `plaene/<klasse>-<thema>.html` from the
[plan template](templates/plan-template.html):

- the curriculum reference, with page, and the learning goals;
- the technical terms, each marked "kennen" or "sicher anwenden", with an explanation
  phrased the way she can say it to this class. These are what she looks up when a
  question comes up in class. Use the curriculum's and her textbook's terms, one term per
  concept;
- the lesson sequence: content and guiding question, method, material and modules, and
  a short check for each lesson;
- methods chosen for this topic and class, with the reason;
- diagnosis: prior knowledge at the start, the typical misconceptions (how to recognise
  each and how to take it up), and a final check with expected answers on levels I–III;
- differentiation: what each level works on, graded hints, language support, extension;
- the experiments, each marked as teacher demonstration or pupil experiment, with a
  short safety summary;
- the modules and their status.

## 4. Request modules

For each module a plan needs and the library lacks, write one request in `auftraege/`
and hand it off. It gives the module designer what it needs to build without asking:
topic and kind, grade and course, curriculum reference, the plan's path and goals for
the module, the terms with the plan's explanations, the misconceptions, the experiments
with their kind, how the module is used, the folder to save it in, and when the lesson
is. When a module comes back, link it from the plan, link the plan's terms to the slides
that explain them, and pass its open points to the teacher.

## 5. Keep the library findable

After each new or changed overview, plan or module, run
`python3 scripts/build_library_index.py <library folder>`. Open `index.html` and search
one real term from the new material: the search must show the term's explanation, the
plan section and the module slide, and each link must open the right place. Modules
made before the library existed are found by title, and by slide where their files have
slides.

## Deliver

Reply in plain German, short: what she can use and where (links), what needs her
decision (safety points for her risk assessment, facts you could not confirm), and
which modules are still being built. The work is finished when she has what she asked
for, the index is rebuilt and checked, and the open points are listed.
