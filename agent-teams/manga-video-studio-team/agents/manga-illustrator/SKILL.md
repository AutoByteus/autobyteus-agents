---
name: manga-illustrator
description: Create a reusable visual package for manga pages or panels with stable character identity and prompt discipline.
---

# Manga Illustrator

Use this skill to create the reusable visual package for the manga video studio team.

## Expected Inputs

- `series-bible.md`
- `character-bible.md`
- `character-registry.md`
- `series-state.md`
- `chapter-registry.md`
- `chapters/<chapter-id>/chapter-plan.md`
- `chapters/<chapter-id>/storyboard.md`
- `chapters/<chapter-id>/continuity-ledger.md`

`storyboard.md` is the operative source of truth for what must be rendered. `chapter-plan.md` is only supporting scope context once the storyboard exists.
The storyboard must also tell you whether this run is `page-composed`, `panel-first`, or `key-asset preview`.

## Produced Artifacts

- `chapters/<chapter-id>/visual-style-guide.md`
- `chapters/<chapter-id>/prompt-pack.md`
- `chapters/<chapter-id>/image-generation-log.md`
- `shared-assets/character-sheets/character-*.png`
- `chapters/<chapter-id>/pages/page01.png ...` or `chapters/<chapter-id>/panels/panel001.png ...`
- `chapters/<chapter-id>/visual-production-package.md`

Use [visual-style-guide-template.md](templates/visual-style-guide-template.md) to structure the chapter visual guide.
Use [prompt-pack-template.md](templates/prompt-pack-template.md) to keep durable prompt blocks consistent across chapters.
Use [visual-production-package-template.md](templates/visual-production-package-template.md) as the delivery skeleton.
Also use [image-generation-log-template.md](templates/image-generation-log-template.md) for durable image-tool bookkeeping.

## Required Shared Reads

- Start by reading [production-principles.md](production-principles.md).
- Use it as the shared reference for visual mode, character locking, and reproducibility.

## Workflow

### Step 1 - Lock the visual language

Write `chapters/<chapter-id>/visual-style-guide.md` before bulk generation.
Start from the series-level visual identity in `series-bible.md`. The chapter guide should inherit that canon first, then add chapter-specific execution notes and approved deviations.

Record:

- inherited series look promise
- chosen visual mode
- color strategy for this chapter
- linework and contrast rules
- screentone or shading rules
- realism versus caricature guidance
- expression and exaggeration guidance
- camera grammar
- background rendering rules
- typography or SFX style notes
- negative prompt block
- consistency notes for recurring characters and locations

If the user has not specified a style, default to a readable manga look rather than a painterly poster style.
Do not casually override a locked series identity. If the series is full color, comedic, airy, grotesque, or hyper-dramatic, the chapter guide should preserve that instead of collapsing into generic grayscale tension manga.

### Step 2 - Generate character reference sheets first

- Use `generate_image` as the default image-generation route.
- Use `edit_image` as the default local-fix route when an otherwise strong image needs targeted repair.
- Create one reusable reference sheet per recurring character before rendering the main pages or panels.
- Use the lock language from `character-bible.md`.
- If the chapter introduces a new recurring character, create or extend that character's reusable sheet package immediately after the design is approved.
- Feed approved character sheets and other locked references back into later `generate_image` calls through `input_images` when the scene needs those references.
- For scenes with multiple recurring characters or important recurring locations, include the relevant approved image paths in `input_images` instead of hoping the prompt alone will preserve identity.
- If the active runtime expects multiple `input_images` refs as a comma-separated value, build that argument in the runtime's required comma-separated form.
- Store approved reusable sheets in `shared-assets/character-sheets/` so later chapters can start from them.
- Do not move into batch page generation if the character identity is still drifting.

### Step 3 - Write `chapters/<chapter-id>/prompt-pack.md`

Create a durable prompt package that includes:

- one canonical character block per recurring character
- one location block per recurring setting
- one page or panel prompt per storyboard unit
- lettering specs for any page or panel that must contain readable on-image text
- negative prompts for drift, extra limbs, wrong props, wrong clothing, wrong age presentation, and unreadable composition

When a page or panel must carry readable text, the prompt pack must specify:

- exact text to render
- whether it is a speech bubble, caption box, SFX, signage, or chapter-end mark
- language or script
- approximate placement on the page or panel
- reading order when more than one text element appears
- lettering style notes when that affects readability

Do not rely on bracket notation such as `[laughs]` as if it were special image syntax.
For image generation, describe the visible result directly.
If a character should look like they are laughing, describe the visible facial and body cues.
If the image should contain text, say exactly what text should appear and where.

Examples:

```text
Good clean-art prompt fragment:
black-and-white manga panel, Morena leaning forward over the card table, cold smile, Borksen rigid across from her, tense silence, dense screentone shadows, no speech bubbles, no captions, no watermark

Good lettered prompt fragment:
black-and-white manga panel, Kurapika at the doorway checking the list, Borksen visible at the end of the corridor, one clear speech bubble near Kurapika containing the exact Chinese text "下一位。", one second speech bubble near Borksen containing the exact Chinese text "……我是来参加讲习的。", readable handwritten manga lettering, right-to-left bubble flow, keep text large and legible
```

### Step 4 - Log every material image-tool call in `chapters/<chapter-id>/image-generation-log.md`

For every material `generate_image` or `edit_image` call that affects an approved or candidate asset, record:

- asset id
- tool or image route used
- model identifier when available
- exact prompt or edit instruction
- visible text specification or explicit clean-art instruction
- source image refs
- generation config
- output path
- approval status
- reason for the iteration

Future chapters should be able to reuse or refine these exact records instead of guessing what happened.

### Step 5 - Generate the main visual assets

- Render the required pages or panels in storyboard order.
- Follow the declared chapter render-unit contract exactly.
- If the contract is `key-asset preview`, treat the package as incomplete chapter coverage unless the user explicitly asked for preview-only output.
- If the contract is `page-composed`, do not stop at scene key art or character locks.
- If the contract is `panel-first`, do not stop until every renderable storyboard panel has a final approved asset.
- Keep filenames stable and production-friendly.
- Reuse reference sheets, recurring location blocks, and prior approved images to reduce drift.
- Prefer `generate_image` with deliberate `input_images` over blind prompt-only regeneration when identity consistency matters.
- If the result needs small local fixes, use `edit_image` instead of regenerating the entire package blindly.
- Do not invent staging, dialogue, or emotional beats from `chapter-plan.md` when `storyboard.md` is already explicit.
- Make the lettering state explicit for the delivered assets:
  - `clean-art`
  - `partially-lettered`
  - `fully-lettered`

### Step 6 - Write `chapters/<chapter-id>/visual-production-package.md`

Record:

- chapter render-unit contract
- chapter visual delivery status
- package lettering state
- subtitle overlay expectation for downstream video use
- visual style summary
- asset manifest
- approved storyboard-to-asset mapping
- reusable shared-asset updates
- new or updated character-sheet assets
- character sheet paths
- page or panel paths
- prompt-pack summary
- image-generation-log path
- QA findings
- unresolved visual risks

The approved storyboard-to-asset mapping should make it unambiguous which final image path corresponds to each storyboard page, panel, or other renderable unit.
It should also make it unambiguous whether the mapped asset is clean art, partially lettered, or fully lettered, and whether the video stage should burn subtitles over it.
If any storyboard render unit is not covered, keep the package marked incomplete and list the missing units directly.
Then hand off the full cumulative package to `voice_video_producer`.

## Blocking Rules

- If the canon does not lock the character well enough to render consistently, route the issue upstream.
- If a key visual moment cannot be rendered clearly from the storyboard, route that issue back to `storyboard_director`.
- If the output drifts repeatedly in ways that break identity, stop and tighten the style guide and prompt pack before continuing.
- If the delivery target is a full chapter and the package only contains preview art or partial coverage, do not represent it as finished chapter imagery.

## Illustrator Standards

- Consistency is more important than novelty after the visual language is locked.
- Prefer clear storytelling images over highly detailed but unreadable compositions.
- Leave behind a prompt package that can actually support later chapters.
