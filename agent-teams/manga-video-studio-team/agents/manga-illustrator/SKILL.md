---
name: manga-illustrator
description: Create a reusable visual package for manga video frames by default, or pages/panels only when explicitly requested, with stable character identity and prompt discipline.
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
The storyboard must also tell you whether this run is `video-frame`, `page-composed`, `panel-first`, or `key-asset preview`.

## Produced Artifacts

- `chapters/<chapter-id>/visual-style-guide.md`
- `chapters/<chapter-id>/prompt-pack.md`
- `chapters/<chapter-id>/image-generation-log.md`
- `shared-assets/character-sheets/character-*.png`
- `chapters/<chapter-id>/frames/frame001.png ...`, `chapters/<chapter-id>/pages/page01.png ...`, or `chapters/<chapter-id>/panels/panel001.png ...`
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
Start from the series-level visual identity in `series-bible.md`. The chapter guide should inherit that canon first, including the locked series video aspect ratio, then add chapter-specific execution notes. Chapter-local style notes must not redefine the video canvas.

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
- inherited locked series video aspect ratio and target resolution when video delivery is in scope
- negative prompt block
- consistency notes for recurring characters and locations

If the user has not specified a style, default to a readable manga look rather than a painterly poster style.
Do not casually override a locked series identity. If the series is full color, comedic, airy, grotesque, or hyper-dramatic, the chapter guide should preserve that instead of collapsing into generic grayscale tension manga. Never override the locked series video aspect ratio inside a normal chapter.

### Step 2 - Generate character reference sheets first

- Use `generate_image` as the default image-generation route.
- Use `edit_image` as the default local-fix route when an otherwise strong image needs targeted repair.
- For prompt-only `generate_image` routes, omit `generation_config` and do not specify a model identifier. Use the configured default image route. The final prompt must be self-contained.
- Issue image-tool calls strictly sequentially. Call exactly one `generate_image` or `edit_image`, wait for the result, inspect and log it, then immediately run `sleep 60` before any further image-tool call.
- The same cooldown applies after successful, rejected, timed-out, and failed image-tool calls. Do not retry before running `sleep 60`.
- Do not launch multiple `generate_image` or `edit_image` calls concurrently, in the background, or as a parallel batch. This applies to reference sheets, video frames, pages, panels, retries, and local fixes.
- Create one reusable reference sheet per recurring character before rendering the main video frames. Render pages or panels only when the declared non-default contract explicitly requires them.
- Use the lock language from `character-bible.md`.
- If the chapter introduces a new recurring character, create or extend that character's reusable sheet package immediately after the design is approved.
- Feed approved character sheets and other locked references back into later `generate_image` calls through `input_images` when the scene needs those references.
- For scenes with multiple recurring characters or important recurring locations, include the relevant approved image paths in `input_images` instead of hoping the prompt alone will preserve identity.
- If the active runtime expects multiple `input_images` refs as a comma-separated value, build that argument in the runtime's required comma-separated form.
- Store approved reusable sheets in `shared-assets/character-sheets/` so later chapters can start from them.
- Do not move into main frame generation if the character identity is still drifting. The same gate applies to page/panel generation when explicitly requested.

### Step 3 - Write `chapters/<chapter-id>/prompt-pack.md`

Create a durable prompt package that includes:

- one canonical character block per recurring character
- one location block per recurring setting
- one video-frame prompt per storyboard unit for video delivery, or page/panel prompts only when explicitly requested
- lettering specs for any video frame that must contain readable on-image text, or for page/panel text only when those assets were explicitly requested
- negative prompts for drift, extra limbs, wrong props, wrong clothing, wrong age presentation, and unreadable composition

Every final prompt sent to `generate_image` must be self-contained for the selected render-unit contract. It should include:

- asset id or render-unit id
- render-unit contract and art state, such as `video-frame`, `page-composed clean-art base`, `panel-first clean-art`, or `lettered panel`
- aspect ratio and orientation in prompt text, such as `9:16 vertical`, `16:9 horizontal`, or `vertical 2:3 portrait`
- scene and visible action
- character lock details needed for identity
- style and color mode
- text strategy, such as exact readable text, clean empty areas for later text, or `do not render readable text`
- negative constraints such as no watermark, no signature, no unwanted text, no wrong character type, and no contract-breaking layout

When a video frame must carry readable text, the prompt pack must specify the fields below. Apply the same fields to page/panel text only when an explicit non-default contract requires those assets.

- exact text to render
- whether it is a speech bubble, caption box, SFX, signage, or chapter-end mark
- language or script
- approximate placement on the frame, or on the page/panel only when those assets were explicitly requested
- reading order when more than one text element appears
- lettering style notes when that affects readability

For a `video-frame` contract, every render-unit prompt must specify:

- inherited locked series aspect ratio and orientation, such as `9:16 vertical` or `16:9 horizontal`
- target canvas or dimensions in prompt text when known, such as `1080x1920 vertical`
- `single full-bleed motion-comic frame`
- one visible beat or one coherent full-screen composition
- subject-safe and subtitle-safe composition notes
- explicit negative prompt language: `no manga page, no panel grid, no page border, no white paper margin, no collage, no contact sheet, no reference sheet, no watermark`

The `Exact final prompt` entry in `prompt-pack.md` is the actual constructed prompt to send to `generate_image`.
For `video-frame` delivery, that final prompt is invalid unless the prompt text itself contains the locked series aspect ratio and orientation, such as `single full-bleed 9:16 vertical motion-comic manga frame`.
For `page-composed` delivery, that final prompt is invalid unless the prompt text itself contains the approved page aspect ratio and orientation, such as `vertical 2:3 portrait full-color manga page clean-art base`.
For `panel-first` delivery, that final prompt is invalid unless the prompt text itself contains the approved panel shape or framing intent.
Do not rely on metadata fields or `generation_config` to carry the aspect ratio, orientation, or target dimensions.

Do not ask the image model for "two panels", "three panels", "manga page layout", "clean manga borders", or similar page-composition language when the contract is `video-frame`.
If the storyboard beat contains multiple actions, split it into multiple video frames or stage a single coherent full-screen shot. Do not solve it by arranging several small images in rows on a paper-like background.

Do not rely on bracket notation such as `[laughs]` as if it were special image syntax.
For image generation, describe the visible result directly.
If a character should look like they are laughing, describe the visible facial and body cues.
If the image should contain text, say exactly what text should appear and where.

Examples:

```text
Good video-frame prompt fragment:
single full-bleed 9:16 vertical motion-comic manga frame, Ada stepping from the train into amber station light, visibly focused young scholar, red notebook visible, immersive cinematic composition, subtitle-safe lower band with low visual clutter, no manga page, no panel grid, no page border, no white margin, no collage, no watermark

Good page-composed clean-art prompt fragment, only when the contract is `page-composed`:
vertical 2:3 portrait full-color manga page clean-art base for ch002-p01, one lush establishing splash page, midnight-blue and brass fantasy train gliding into a station under high arches, deep burgundy carpets hanging like banners, clerks in felt slippers crossing silently, brass lamps glowing through dust, compact badger scholar in midnight-blue coat with burgundy scarf, round spectacles, red notebook, standing alert in the train doorway, slim white cockatoo with yellow crest and citron waistcoat peering out excitedly, premium full-color animal fantasy manga, crisp ink lines, cinematic station architecture, leave clean empty areas for a station sign, banner, one speech bubble, and tiny SFX, do not render readable text, no grayscale, no human characters, no watermark, no signature

Good panel clean-art prompt fragment, only when the contract is `panel-first`:
black-and-white manga panel, Morena leaning forward over the card table, cold smile, Borksen rigid across from her, tense silence, dense screentone shadows, no speech bubbles, no captions, no watermark

Good panel lettered prompt fragment, only when the contract is `panel-first` or `page-composed`:
black-and-white manga panel, Kurapika at the doorway checking the list, Borksen visible at the end of the corridor, one clear speech bubble near Kurapika containing the exact Chinese text "下一位。", one second speech bubble near Borksen containing the exact Chinese text "……我是来参加讲习的。", readable handwritten manga lettering, right-to-left bubble flow, keep text large and legible
```

### Step 4 - Log every material image-tool call in `chapters/<chapter-id>/image-generation-log.md`

For every material `generate_image` or `edit_image` call that affects an approved or candidate asset, record:

- asset id
- tool or image route used
- model identifier returned by the tool, if available
- exact final prompt or edit instruction sent to the image tool
- applicable aspect ratio and orientation phrase present in the final prompt
- visible text specification or explicit clean-art instruction
- source image refs
- `generation_config` status, which should be `omitted` for prompt-only `generate_image` routes
- actual output dimensions and measured aspect ratio
- output path
- approval status
- sequential-call position and whether `sleep 60` was completed before the next image-tool call
- reason for the iteration

Future chapters should be able to reuse or refine these exact records instead of guessing what happened.

### Step 5 - Generate the main visual assets

- Render the required video frames in storyboard order. Render pages or panels only when the declared non-default contract explicitly requires them.
- Generate assets one at a time in storyboard order. After each `generate_image` or `edit_image` result, timeout, or failure, immediately run `sleep 60` before requesting the next asset, retry, or correction.
- Follow the declared chapter render-unit contract exactly.
- If the contract is `key-asset preview`, treat the package as incomplete chapter coverage unless the user explicitly asked for preview-only output.
- If the contract is `video-frame`, every approved asset must be one full-bleed video still at the inherited locked series aspect ratio, with no page border, panel gutter, paper margin, collage layout, reference-sheet layout, or generated watermark.
- If the contract is `page-composed`, do not stop at scene key art or character locks.
- If the contract is `panel-first`, do not stop until every renderable storyboard panel has a final approved asset.
- Keep filenames stable and production-friendly.
- Reuse reference sheets, recurring location blocks, and prior approved images to reduce drift.
- Prefer `generate_image` with deliberate `input_images` over blind prompt-only regeneration when identity consistency matters.
- If the result needs small local fixes, use `edit_image` instead of regenerating the entire package blindly.
- Do not invent staging, dialogue, or emotional beats from `chapter-plan.md` when `storyboard.md` is already explicit.
- For `video-frame` delivery, inspect each generated frame before approval. Reject and regenerate frames that read as a manga page on paper, a multi-panel sheet, or an image pasted onto a blank background.
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
- video-frame paths for video delivery, plus page/panel paths only when explicitly requested
- inherited locked series aspect ratio and frame-conformance QA for `video-frame` delivery
- prompt-pack summary, including confirmation that final prompts contain the applicable aspect ratio and orientation phrase
- image-generation-log path
- QA findings
- unresolved visual risks

The approved storyboard-to-asset mapping should make it unambiguous which final image path corresponds to each storyboard video frame, page, panel, or other renderable unit.
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
