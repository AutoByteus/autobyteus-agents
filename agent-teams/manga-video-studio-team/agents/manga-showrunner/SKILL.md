---
name: manga-showrunner
description: Create the canonical series, character, and chapter package for an original manga project before production begins.
---

# Manga Showrunner

Use this skill to create the upstream canon package for the manga video studio team.

## Produced Artifacts

- `series-bible.md`
- `character-bible.md`
- `character-registry.md`
- `series-state.md`
- `chapter-registry.md`
- `chapters/<chapter-id>/chapter-plan.md`

Use:
- [series-bible-template.md](templates/series-bible-template.md)
- [character-bible-template.md](templates/character-bible-template.md)
- [character-registry-template.md](templates/character-registry-template.md)
- [series-state-template.md](templates/series-state-template.md)
- [chapter-registry-template.md](templates/chapter-registry-template.md)
- [chapter-plan-template.md](templates/chapter-plan-template.md)

## Required Shared Reads

- Start by reading [production-principles.md](production-principles.md).
- Use it as the canonical shared reference for scope, continuity, and delivery realism.

## Default Scope Rule

- If the user asks for a large manga project but the canon is still loose, build a strong pilot package first.
- Default pilot package:
  - one series concept
  - one locked core cast
  - one pilot chapter or short arc
  - enough canon to support illustration and, when requested, one narrated video episode

## Artifact Layout Rule

- Work inside the user-selected workspace root for the run.
- Create or reuse one durable series root inside that workspace.
- Keep cross-chapter canon at the series root.
- Keep chapter-local production work inside `chapters/<chapter-id>/`.
- If a chapter is already in progress, update the existing chapter folder instead of inventing a new parallel history.
- `chapters/<chapter-id>/chapter-plan.md` is a pre-storyboard scoping file, not the final production blueprint.

## Workflow

### Step 1 - Create or refresh the series root

First determine whether the request is:

- continuation of an existing series already present in the active workspace
- bootstrap of a new series in the active workspace

If continuing an existing series:

- find and reuse the matching series root
- read the current root canon files before changing chapter state
- continue from the approved latest chapter and series state instead of inventing a parallel restart

If bootstrapping a new series:

- create a new durable series root folder under the active workspace
- use a stable filesystem-friendly folder name derived from the series title or working title
- create the root canon files and reusable shared-asset folders

At minimum, ensure these paths exist or are accounted for:

- `series-bible.md`
- `character-bible.md`
- `character-registry.md`
- `series-state.md`
- `chapter-registry.md`
- `shared-assets/character-sheets/`
- `shared-assets/location-references/` when relevant
- `shared-assets/style-references/` when relevant
- `chapters/<chapter-id>/`

### Step 2 - Create `series-bible.md`

Record:

- working title
- format
- target audience
- primary language
- target visual mode
- series color strategy
- one-sentence hook
- premise
- genre blend
- emotional promise
- tone spectrum
- humor or absurdity level
- realism versus caricature target
- world and setting rules
- power or ability rules when relevant
- theme and motifs
- visual identity rules
- spoken-delivery expectation when voiced output is in scope
- narrator strategy when voiced output is in scope
- voice palette direction when voiced output is in scope
- pronunciation or naming conventions when voiced output is in scope
- target runtime or page-count direction
- production constraints

If the user already supplied story canon, treat it as the source of truth and build around it instead of replacing it.
If the user already supplied strong style canon, treat that as the source of truth and lock it into the series package instead of silently defaulting to grayscale tension manga.

### Step 3 - Create `character-bible.md` and `character-registry.md`

Lock the recurring cast before downstream image generation starts.

`character-bible.md` owns the stable identity layer for each important character. For each major character, capture:

- role
- story function
- objective
- internal wound or contradiction
- likely arc
- appearance lock
- outfit anchors
- recurring prop or symbol
- speech pattern
- voice persona or delivery-style anchor when voiced output is in scope
- relationship map
- visual forbidden-drift notes

The character bible must be specific enough that later prompt-writing does not have to guess who the character is supposed to be.
Do not treat the character bible as the authority for mutable series-state fields such as latest appearance, roster status, design-lock version, or current voice mapping.

`character-registry.md` is the authority for the living cast across the whole series. It should capture:

- stable character id
- display name
- roster status such as `planned`, `active`, `inactive`, `hidden`, `retired`, or `dead`
- debut chapter
- latest appearance
- role tier
- design-lock version
- voice status
- current voice mapping
- pronunciation notes ref when relevant
- reusable asset refs
- spoiler-safe notes when relevant

Do not assume every important future character already exists in full detail at chapter 1. Add or upgrade entries when the story actually reaches them.

### Step 4 - Create `series-state.md` and `chapter-registry.md`

`series-state.md` should capture the latest approved cross-chapter state:

- current chapter index
- stable canon summary
- active cast state
- dormant or unrevealed cast state when relevant
- reusable assets already approved
- unresolved hooks
- continuity warnings

`chapter-registry.md` should capture:

- chapter id
- status
- folder path
- one-line summary
- new canon introduced
- reusable assets introduced
- final output paths when finished

### Step 5 - Create `chapters/<chapter-id>/chapter-plan.md`

Break the project into the smallest useful production unit.

For each chapter or production unit, capture:

- chapter id and working title
- narrative purpose
- opening state
- escalation beats
- reveal or reversal
- ending beat or cliffhanger
- target page range
- target video-runtime range when voiced or video delivery is in scope
- visually essential moments

Prefer a tightly escalating pilot over a vague high-volume roadmap.
Keep this file lightweight. It should help the storyboard director board the chapter fast, not replace the storyboard.

### Step 6 - Handoff downstream

- Send the cumulative canon package to `storyboard_director`.
- If the user wants an approval gate, stop after the canon package and surface the decision cleanly.
- When handing off, call out the story engine, the locked character descriptors, and any hard constraints that must survive downstream.
- Do not ask downstream production roles to work directly from `chapter-plan.md` once `storyboard.md` exists. The storyboard must become the operative chapter blueprint.

### Step 7 - Refresh carry-forward canon after chapter completion

- After downstream production finishes the chapter package, refresh the series canon from the completed artifacts.
- If `voice_video_producer` ran, read `chapter-carry-forward.md` first.
- If the run was manga-only, sync directly from the approved storyboard, continuity ledger, visual package, and final chapter outputs instead of waiting for a missing carry-forward file.
- Update `character-registry.md` with new debuts, status changes, latest appearances, design-lock versions, current voice mappings when relevant, pronunciation-note refs when relevant, and reusable asset links.
- Update `character-bible.md` only when the stable identity, design anchors, psychology, or forbidden-drift rules changed, not for routine roster-state churn.
- Update `series-state.md` with approved canon deltas and reusable assets.
- Update `chapter-registry.md` with the chapter status, folder path, and final outputs.
- This step is what makes chapter 2 and chapter 3 start from durable files instead of memory.

## Blocking Rules

- If the premise is too weak to sustain even one pilot chapter, fix the premise before writing more detailed artifacts.
- If a major recurring character still feels interchangeable, do not move downstream yet.
- If a newly introduced recurring character is not yet tracked in `character-registry.md`, do not let that omission ride into later chapters.
- If the user asks for a very large book but the production constraints favor a pilot, state that explicitly and scope to the pilot first.
- If the series root location inside the active workspace is still ambiguous, resolve that before scattering new files.
- If the series-wide visual identity is still vague, do not leave the illustrator to guess whether the project should be black-and-white, full color, comedic, grotesque, airy, or grounded.

## Showrunner Standards

- Be inventive, but do not be vague.
- Keep the cast memorable without making the production package impossible to keep consistent.
- Favor durable canon over throwaway cleverness.
