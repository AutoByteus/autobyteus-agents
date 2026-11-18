---
name: article-writing
description: Produce a publication-ready article package through source-grounded research, hierarchical structure, reader-continuous drafting, review, and revision.
---

# Article Writing

The writer owns visual planning because images are part of the article's structure.

Read [the team writing principles](references/writing-principles.md) first, with [explanatory writing](references/explanatory-writing.md) for every style but a narrative, [figures and the page](references/figures-and-page.md), and [the article's style](references/styles/index.md); for the formats, [the formats](references/formats.md); for Medium, WeChat and bilingual delivery, [the platform output rules](references/platform-output-rules.md). `references/writing-principles.md`, `references/explanatory-writing.md`, `references/figures-and-page.md`, `references/formats.md`, `references/platform-output-rules.md`, `references/article-package.md`, the folder `references/styles/` and the scripts `scripts/publish-folder.py` and `scripts/html-article.py` are symbolic links into the team's `shared/` folder; a listing such as `find -type f` skips them, so open or run each by its path.

## Artifacts

[The article package](references/article-package.md) lists the files in the work folder, their owners, and what each review handoff carries. You create `brief.md` and the understanding files (through [references/understanding.md](references/understanding.md)), `style-profile-notes.md`, `outline.md`, `visual-plan.md`, `visual-asset-index.md`, and the draft (a web project, or Markdown with its publish folder), from these templates:

- [templates/style-profile-notes-template.md](templates/style-profile-notes-template.md)
- [templates/outline-template.md](templates/outline-template.md)
- [templates/visual-plan-template.md](templates/visual-plan-template.md)
- [templates/visual-asset-index-template.md](templates/visual-asset-index-template.md)

## Choose The Path

- **Full path (Steps 1–11):** a new article that makes technical, factual or current-world claims.
- **Short path:** a style rewrite, a cross-language conversion, a short note, or a draft the user supplied. Write a short `brief.md`; research only the claims that need it; write `outline.md` as the point plus the section list; show the author the one-page plan and wait for the answer (Step 7); skip the visual plan unless an idea earns an image; draft and check it (Steps 8 and 9); and send the draft package for draft review (the reviewer then skips the pre-draft review). Steps 10 and 11 apply unchanged.

If the user names a path, use it. If a short-path request turns out to carry load-bearing claims you cannot support, move to the full path.

## Workflow

### Step 1 - Write `brief.md`

Record the target once, here: the style ([the styles](references/styles/index.md): the one the user names, otherwise by the kind of article and the reader), the format (a web project, the website's default, or Markdown: [the formats](references/formats.md)), platform, language, audience and the concepts it already has (principles, the foundation), one-sentence takeaway, depth target; a voice profile only when the user asks for that voice (section 4); the investigation modes (principles, section 2) and the source basis; visual expectations and constraints; the user's active corrections (principles, section 6); and any limitation.

If a missing detail changes the article's direction and the request, workspace and sources cannot settle it, ask the user a targeted question before continuing.

### Step 2 - Build the understanding package

When the article needs factual, technical, document, source-code or supplied-material understanding (for fiction, only the facts it uses about the real world), follow [references/understanding.md](references/understanding.md). It owns the understanding files, how you investigate (outside sources with `deep-research`), and the Ready-to-outline check.

- Reuse existing understanding files and research briefs before starting new discovery.
- Do not outline from vague notes: the files must pass the Ready-to-outline check.
- Understanding is not closed after Step 2. When outlining or drafting exposes a gap, return to the reference with the exact missing claim (and, for outside research, `deep-research` on the narrower question), then continue.
- If the source basis cannot support the intended article, narrow the claims or ask a targeted question before outlining.

### Step 3 - Resolve the voice and language

When the user asks for an author's voice, bilingual work or platform packaging, follow [references/voice-and-language.md](references/voice-and-language.md) and write `style-profile-notes.md`, so the reviewer can judge style fit from the file, not from chat.

### Step 4 - Decide the point and check the basis

Write the point at the top of the outline, decided from the problem analysis in your understanding notes ([explanatory writing](references/explanatory-writing.md), section 2), with the anchor example (section 4). If the point is not specific, or not new or useful to this reader, go back to the research or ask the user before outlining.

Then check that the understanding files passed their Ready-to-outline check, that the planned opening fits the style (its style file, and explanatory writing, section 1), and that no planned contrast, common-belief claim, recommendation, root-cause claim or production observation lacks an evidence anchor (principles, section 1). If a check fails, fix the upstream file first.

### Step 5 - Write `outline.md`

Fill [the outline template](templates/outline-template.md): the point, the opening, the concepts in order, the anchor example, the section chain, the ending move, and a representation decision wherever an idea earns an image (explanatory writing, section 2; [figures and the page](references/figures-and-page.md)). Keep it short; do not plan every paragraph. Then complete the template's Structural Gate; if the structure is weak, revise the outline before going on.

### Step 6 - Write `visual-plan.md` when an image is earned

Create it when the user asks for visuals, when an idea earns an image (figures and the page), or when the platform or audience expects visual pacing. If the article stays text-only, record that decision in the outline. Fill [the visual plan template](templates/visual-plan-template.md) for each visual.

Keep image prompts inside the understanding package: name the article's entities, relationships, action or state, and the one proposition; never ask the model to invent interfaces, metrics, architecture, people, logos or evidence. A caption may extend the image's meaning, but must not be the only place where the article's mechanism exists.

### Step 7 - Show the author, then the pre-draft review

On either path, when the outline is written (on the full path, when Steps 1–6 pass), show the person the article is for one page: the style, the reader and what they already hold, the point, the section chain with the planned figures, and the opening paragraph. Show it in this conversation, or through the requester when that is how the author is reached, and wait for the answer: nothing goes to the reviewer before it. Record the answer in `brief.md` and change the files it affects. When the author cannot be reached, go on and record that. When the author says they will read before the reviewer, send the reviewer nothing until they release it.

Then, on the full path, send the package for the pre-draft review of the point, evidence, style basis, section chain and visual plan, as [the article package](references/article-package.md) describes, and wait for the result.

Draft only after the outline has passed review (or the user skipped the gate, or the short path applies), every finding has been fixed in the file it concerns, the outline and the style notes agree on style, variant and forbidden moves, and each planned visual links to its representation decision and has a takeaway that survives without the caption.

### Step 8 - Draft

- Draft from the outline, from large to small: the point, the sections, the paragraphs, the sentences (explanatory writing and the style). Keep the approved section order; if drafting reveals a structural problem, stop and revise `outline.md` instead of improvising a new shape.
- Introduce the anchor example early. Run any code or command you show and keep its real output; mark anything not run.
- Write only claims the understanding package or the user supports (principles, section 1). An assumption is marked as one and stays only if the user accepts it.
- Compose each planned visual with its prose as one unit: each carries its recorded part of the takeaway. Insert it where it clarifies the section, with a caption and nearby prose that says why the reader is seeing it. Update `visual-asset-index.md` as assets are generated, sourced, inserted or omitted. If a planned visual cannot be produced truthfully, keep an explicit placeholder and mark it in `visual-plan.md`; never substitute a generic image.
- Write the draft in the brief's format, one per language for bilingual or conversion work:
  - **Web project:** `site/` in the work folder (the formats, "Web Project"), checked with `python3 <this skill's folder>/scripts/html-article.py check <site>` until it reports nothing to fix. Keep sources and build tools outside `site/`.
  - **Markdown:** `article.md` (or `article-<lang>.md`), and its publish folder (the formats, "Markdown Folder"): `python3 <this skill's folder>/scripts/publish-folder.py build <draft> <work folder>/publish/<name> --slug <slug> [--cover <image>]`, adding `--author` or `--date` only when the user gave them. Fix every problem it reports in the draft, not in the copy, and build again until it reports none.
  - When both are asked, build both from one text source, so they never differ.

### Step 9 - Check before anyone reads it

Before any version goes to the reviewer or the author, including each version the author reads directly:

- Run the draft checks on the text (explanatory writing, section 3: reverse outline, first-time reader, information check; for a web project, read it with `html-article.py text`).
- Open the page in the browser (`open_tab` on its file path) and look at all of it with screenshots, at desktop width and at phone width (`set_device_emulation`); scroll so each figure appears, and watch each animation from start to end. For Markdown, view each figure at phone width (figures and the page, section 4).
- Fix what you find and look again. Say exactly what you looked at, and close the tabs you opened.

Then send the whole package for draft review.

### Step 10 - Revise after review

- Fix in the principles' order (principles, section 6): the highest failing level first, and after a structural edit, run the draft checks (explanatory writing, section 3) again before polishing.
- An `Understanding Gap`, `Source Gap` or `Evidence Gap` goes back to the understanding files before any prose edit; a `Visual Plan Gap` goes back to the outline, the visual plan, the captions or the assets.
- Keep the audience and direction unless the review shows the direction itself is wrong.
- If a finding needs information only the user has (brief details, source access, platform, a decision), ask the user instead of guessing.
- If the same finding survives two revisions, or the fix needs a decision the package cannot settle, stop and give the user the review report and the choice.
- Check the revised draft again as in Step 9 (the script, the draft checks, the page), then send the whole updated package for re-review.

### Step 11 - Deliver

When the reviewer's decision is `Pass`, run the check once more for each language: for a web project, `scripts/html-article.py zip <site> <work folder>/<name>.zip`, which checks and packs it; for Markdown, `scripts/publish-folder.py check <publish folder> --draft <draft>`. Then give the user first what to drop on the website's Articles page (the `.zip`, or the publish folder) by absolute path, with the title, address and excerpt the check printed; then the absolute paths of the final drafts, the visual assets and the work folder, the platform and language of each draft, and any limitation the review report recorded.
