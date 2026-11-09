# Platform Output Rules

Packaging for each platform, and the publish folder every article ends with. The writer applies these rules before delivery; the reviewer uses them to judge platform fit. The mode, opening and structure rules are in [writing-principles.md](writing-principles.md); a platform shapes packaging, never the argument.

## WeChat (Chinese)

- A concise title (what a title must say is in the writing principles, section 4).
- Clear section headings and visible structure; short paragraphs for mobile reading.
- Bullet lists for process steps and key claims; tables when they clarify stages, roles or mechanism differences.
- Precise technical terms, with the English term in parentheses where it helps.
- Formulas as readable LaTeX blocks, with symbols explained in nearby text.
- End with a compact takeaway section (a "最后的想法" style is acceptable).

## Medium (English)

- Section headers with conceptual or technical labels that match the section's content.
- Explanation progression explicit and skimmable; bullets for criteria, principles and outcomes when they help inspection, without forcing lists into explanatory prose.
- No Markdown tables: Medium does not render them. Use a list, or an image of the table when a comparison needs columns.
- Compact equations followed by a plain-language interpretation.
- A concise conclusion that states the result and its implication; in `technical-blog` and `paper-report`, a bounded implication, not a slogan.

## Website Publish Folder

Every article ends with a publish folder in the format the AutoByteus website's article import takes: the user drops the folder on the website's Articles page. Where it sits and when it is built are in [the article package](article-package.md). It is a copy of the reviewed draft made by `scripts/publish-folder.py` (in each role's skill): only the image links and the settings differ from the draft. `build` makes it, `check` reports what would block publishing or show wrongly, and both print the title, address and excerpt as the website will show them.

- **What it holds:** `article.md` and `images/` with the images the article shows. Nothing else from the work folder.
- **The title and excerpt:** the first line is `# ` and the title. The website shows the first paragraph after it as the excerpt (up to 240 characters), so that paragraph is the opening or a subtitle, never an image or a note.
- **Settings at the top of the copy** (`build` writes them):
  - `slug:` always: a short address from the title's key words, lowercase letters or digits joined by `-`. Without one, the website cuts a long title's address mid-word at 80 characters.
  - `cover:` the image that best represents the article, usually its first; the website uses it as the share image, not on the page. None when the article has no image.
  - `author:` and `date:` (YYYY-MM-DD) only when the user gives them; otherwise the website uses its default author and the publishing day.
- **Images:** PNG, JPEG, WebP or GIF (judged by content, not by name), at most 10 MiB each, linked by a path inside the folder (`images/…`). An image from another website, a missing file, or an SVG blocks publishing.
- **What the website shows differently:** raw HTML is shown as text; only `https:`, `mailto:`, `/` and `#` links stay links (`http:` and file links become plain text); formulas are shown as written, not rendered, so put a formula the reader needs in a code block or an image. Tables, code blocks and lists render normally. Fix these in the draft, never only in the copy.

## Visuals On Every Platform

Every platform is read mostly on phones. Treat text-bearing diagrams and comparison graphics as mobile content: a large source PNG does not stay readable merely because the platform scales it down.

- Before delivery, view each text-bearing visual at a narrow mobile article width, such as 360–390px (resize a copy with `run_bash`, then view it). Titles, card text, row labels, arrows, lifecycle annotations, and every accept/revision or success/failure path must be readable without zoom or horizontal scrolling.
- If the check fails, reduce the text, split wide matrices into separate portrait cards, and stack wide workflows into portrait panels. Keep the reading order explicit and provide nearby prose that carries the same essential meaning.

## Bilingual Delivery

When the user asks for both languages, deliver in this order:

1. The WeChat Chinese draft.
2. The Medium English draft.
3. Optional alignment notes (3–6 bullets) on the logic preserved.

Each language gets its own publish folder.

The conversion steps are in the writer's style workflow; the fidelity rules are in the principles, section 9.
