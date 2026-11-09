# Article Package

The files one article request produces, who owns each, and what every handoff carries. The writer and the reviewer use this file; `article-writing`, `article-reviewer`, and the Deep Researcher's `deep-research` own how each file is made or judged.

## Work folder

Create one dedicated work folder per request. Keep every file below in it, and use absolute paths in messages.

## Artifacts

| File | Owner | Present when |
| --- | --- | --- |
| `brief.md` | `article-writing` | Always |
| `understanding-notes.md`, `source-index.md` | `article-writing` (its understanding reference) | The article needs investigation or source grounding |
| `claim-evidence-ledger.md` | `article-writing` (its understanding reference) | Factual, technical, or interpretive claims need explicit support |
| `research-request.md` | `article-writing` | The article needs online or paper research |
| The research brief and its `evidence.md` | The Deep Researcher (`deep-research`), saved where its message says; `source-index.md` records the brief's path | A research request was answered |
| `style-profile-notes.md` | `article-writing` | The user asked for an author's voice |
| `outline.md` | `article-writing` | Always |
| `visual-plan.md` | `article-writing` | Visuals are requested or earned by the visualization-load trigger |
| `visual-asset-index.md` | `article-writing` | Visual assets are sourced, generated, inserted, or intentionally omitted |
| `article.md`, or one `article-<lang>.md` per language for bilingual or conversion work (for example `article-zh.md`, `article-en.md`) | `article-writing` | After the outline passes review |
| `publish/<name>/`, or `publish/<name>-<lang>/` per language: `article.md` and `images/` ([platform output rules](platform-output-rules.md), "Website Publish Folder") | `article-writing`, built from the draft by `scripts/publish-folder.py` | With every draft sent for review, rebuilt after each revision |
| `review-report.md` | `article-reviewer` | After every review |

`<name>` is a short lowercase-hyphen name of the article, kept for all its rounds. The website recognizes a re-import of the same draft by its folder name and title, so two articles never share a folder name.

## What each handoff carries

Send the whole package each time, not only the latest file:

- Every artifact above that exists (a research brief by its path), plus the source material or source article.
- For bilingual or cross-language work, both the source and target drafts.
- With a draft, each publish folder and the writer's last `check` result for it.
- The user's active corrections ([writing principles](writing-principles.md), section 10) until the article passes.
- On a return to the writer, the latest `review-report.md`.

The first handoff to the reviewer has no draft: it asks for the pre-draft review of the point, the evidence, the style basis, the outline, and the visual plan. The second carries the draft. On the short path, only the second is sent.
