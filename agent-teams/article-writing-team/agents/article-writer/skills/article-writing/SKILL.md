---
name: article-writing
description: Produce a publication-ready article package through source-grounded research, hierarchical structure, reader-continuous drafting, review, and revision.
---

# Article Writing

The article writer's end-to-end workflow: understanding the subject, style and language decisions, the outline, the visual plan, the draft, revision and delivery. The writer owns visual planning because images are part of the article's structure.

Read [the team writing principles](references/writing-principles.md) first: they are the standard you write by and the reviewer judges by. This skill says what you do and when; the principles say what good looks like. For platform packaging, read [the platform output rules](references/platform-output-rules.md). `references/writing-principles.md`, `references/platform-output-rules.md` and `references/article-package.md` are symbolic links into the team's `shared/` folder; a listing such as `find -type f` skips them, so open each by its path.

## Artifacts

[The article package](references/article-package.md) lists the files in the work folder, their owners, and what each review handoff carries. You create `brief.md`, the understanding files and `research-request.md` (through [references/understanding.md](references/understanding.md)), `style-profile-notes.md`, `outline.md`, `visual-plan.md`, `visual-asset-index.md` and the draft, from these templates:

- [templates/style-profile-notes-template.md](templates/style-profile-notes-template.md)
- [templates/outline-template.md](templates/outline-template.md)
- [templates/visual-plan-template.md](templates/visual-plan-template.md)
- [templates/visual-asset-index-template.md](templates/visual-asset-index-template.md)

## Choose The Path

- **Full path (Steps 1–10):** a new article that makes technical, factual or current-world claims.
- **Short path:** a style rewrite, a cross-language conversion, a short note, or a draft the user supplied. Write a short `brief.md`; request research only for claims that need it; write `outline.md` as the point plus the section list; skip the visual plan unless an idea earns an image; draft (Step 8); and send the draft package for draft review (the reviewer then skips the pre-draft review). Steps 9 and 10 apply unchanged.

If the user names a path, use it. If a short-path request turns out to carry load-bearing claims you cannot support, move to the full path.

## Workflow

### Step 1 - Write `brief.md`

Record the target once, here: mode (principles, section 3: `technical-blog` for any technical topic unless the user asks for an essay or a formal report), platform, language, audience, one-sentence takeaway, depth target; a voice profile only when the user asks for that voice (section 7); the investigation modes (principles, section 2) and the source basis; visual expectations and constraints; the user's active corrections (principles, section 10); and any limitation.

If a missing detail changes the article's direction and the request, workspace and sources cannot settle it, ask the user a targeted question before continuing.

### Step 2 - Build the understanding package

When the article needs factual, technical, document, source-code or supplied-material understanding, follow [references/understanding.md](references/understanding.md). It owns the understanding files and their Ready-to-outline check, and says which investigation you do and which you ask the Deep Researcher for with `research-request.md`.

- Reuse existing understanding files and research briefs before starting new discovery.
- Do not outline from vague notes: the files must pass the Ready-to-outline check.
- Understanding is not closed after Step 2. When outlining or drafting exposes a gap, return to the reference with the exact missing claim (and, for outside research, a new or narrower `research-request.md`), then continue.
- If the source basis cannot support the intended article, narrow the claims or ask a targeted question before outlining.

### Step 3 - Resolve the style package

When the user asks for an author's voice, bilingual work or platform packaging, follow [references/style-workflow.md](references/style-workflow.md) and write `style-profile-notes.md`, so the reviewer can judge style fit from the file, not from chat.

### Step 4 - Decide the point and check the basis

Write the point at the top of the outline (principles, section 4) with the anchor example (section 6). If the point is not specific, or not new or useful to this reader, go back to the research or ask the user before outlining.

Then check that the understanding files passed their Ready-to-outline check, that the planned opening fits the mode (section 3), and that no planned contrast, common-belief claim, recommendation, root-cause claim or production observation lacks an evidence anchor (section 1). If a check fails, fix the upstream file first.

### Step 5 - Write `outline.md`

Fill [the outline template](templates/outline-template.md): the point, the opening and reader starting point, the anchor example, the section chain, the ending move, and a representation decision wherever an idea earns an image (principles, sections 4 and 8). Keep it short; do not plan every paragraph. Then complete the template's Structural Gate; if the structure is weak, revise the outline before going on.

### Step 6 - Write `visual-plan.md` when an image is earned

Create it when the user asks for visuals, when an idea earns an image (principles, section 8), or when the platform or audience expects visual pacing. If the article stays text-only, record that decision in the outline. Fill [the visual plan template](templates/visual-plan-template.md) for each visual.

Keep image prompts inside the understanding package: name the article's entities, relationships, action or state, and the one proposition; never ask the model to invent interfaces, metrics, architecture, people, logos or evidence. A caption may extend the image's meaning, but must not be the only place where the article's mechanism exists.

### Step 7 - Pre-draft review

On the full path, when Steps 1–6 pass, send the package for the pre-draft review of the point, evidence, style basis, section chain and visual plan, as [the article package](references/article-package.md) describes, and wait for the result.

Draft only after the outline has passed review (or the user skipped the gate, or the short path applies), every finding has been fixed in the file it concerns, the outline and the style notes agree on mode, variant and forbidden moves, and each planned visual links to its representation decision and has a takeaway that survives without the caption.

### Step 8 - Draft

Before drafting, check that every research brief you requested has come back ([understanding.md](references/understanding.md), section 2).

- Draft from the outline, from large to small: the point, the sections, the paragraphs, the sentences (principles, sections 3–6). Keep the approved section order; if drafting reveals a structural problem, stop and revise `outline.md` instead of improvising a new shape.
- Introduce the anchor example early. Run any code or command you show and keep its real output; mark anything not run.
- Write only claims the understanding package or the user supports (principles, section 1). An assumption is marked as one and stays only if the user accepts it.
- Compose each planned visual with its prose as one unit: each carries its recorded part of the takeaway. Insert it where it clarifies the section, with a caption and nearby prose that says why the reader is seeing it. Update `visual-asset-index.md` as assets are generated, sourced, inserted or omitted. If a planned visual cannot be produced truthfully, keep an explicit placeholder and mark it in `visual-plan.md`; never substitute a generic image.
- Write `article.md` for single-language work, or the full draft set for bilingual or conversion work.
- Send the whole package for draft review.

### Step 9 - Revise after review

- Fix in the principles' order (section 10): the highest failing level first, and after a structural edit, run the draft checks (section 5) again before polishing.
- An `Understanding Gap`, `Source Gap` or `Evidence Gap` goes back to the understanding files before any prose edit; a `Visual Plan Gap` goes back to the outline, the visual plan, the captions or the assets.
- Keep the audience and direction unless the review shows the direction itself is wrong.
- If a finding needs information only the user has (brief details, source access, platform, a decision), ask the user instead of guessing.
- If the same finding survives two revisions, or the fix needs a decision the package cannot settle, stop and give the user the review report and the choice.
- Send the whole updated package for re-review.

### Step 10 - Deliver

When the reviewer's decision is `Pass`, give the user the absolute paths of the final article files and the visual assets, the platform and language of each draft, and any limitation the review report recorded.
