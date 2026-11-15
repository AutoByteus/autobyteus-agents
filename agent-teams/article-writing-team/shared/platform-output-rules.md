# Platform Output Rules

Packaging for each platform, and the two formats the AutoByteus website takes. The writer applies these rules before delivery; the reviewer uses them to judge platform fit. The style, opening and structure rules are in [writing-principles.md](writing-principles.md); a platform shapes packaging, never the argument.

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
- A concise conclusion that states the result and its implication; outside `essay` and `narrative`, a bounded implication, not a slogan.

## Website: Web Project (The Default)

A web article is a small static website the website shows in a frame below its own title: the user drops it on the Articles page as a `.zip`, and it must be ready as it is, with nothing to change at upload. It is the default format for the website. `scripts/html-article.py` (in each role's skill) checks it (`check`), prints its visible text (`text`) and makes the `.zip` (`zip`).

- **What it holds:** a `site/` folder with `index.html` and `article.json` at its top and every file the page uses (styles, scripts, images, fonts), linked by relative paths. Nothing loads from another website: no outside fonts, scripts, styles or images. Sources and build tools stay outside `site/`. The website keeps only `.html .htm .css .js .mjs .json .txt .svg .png .jpg .jpeg .gif .webp .avif .ico .woff .woff2 .ttf .otf`: no audio or video.
- **`article.json`:** `title` (up to 300 characters; the same title updates the same article), `excerpt` (up to 240 characters, the list's summary: the opening or a subtitle), `slug` (a short address from the title's key words, lowercase letters or digits joined by `-`), `cover` (a PNG, JPEG, WebP or GIF inside `site/`, at most 10 MiB: the share image), and `author` and `date` (YYYY-MM-DD) only when the user gives them. No other field.
- **The page:** no title, byline or date of its own (the website shows them above the frame) and no empty space above the first line. Laid out for a content width of about 1024 px on a desktop and the screen width on a phone. It posts its height to the website whenever the height changes, and sizes nothing with `vh`:

  ```js
  const send = () => parent.postMessage({ type: 'article-height', height: document.documentElement.scrollHeight }, '*')
  new ResizeObserver(send).observe(document.body)
  addEventListener('load', send)
  send()
  ```
- **Links** to other websites carry `target="_blank" rel="noopener"`.
- **Limits:** the `.zip` at most 10 MiB and 500 files, each file at most 10 MiB; no symbolic links and no two paths that differ only in letter case.

## Website: Markdown Folder

When the user asks for Markdown, or the article also goes to a platform that takes Markdown, the article ends with a publish folder in the format the website's Markdown import takes: the user drops the folder on the website's Articles page. Where it sits and when it is built are in [the article package](article-package.md). It is a copy of the reviewed draft made by `scripts/publish-folder.py` (in each role's skill): only the image links and the settings differ from the draft. `build` makes it, `check` reports what would block publishing or show wrongly, and both print the title, address and excerpt as the website will show them.

- **What it holds:** `article.md` and `images/` with the images the article shows. Nothing else from the work folder.
- **The title and excerpt:** the first line is `# ` and the title. The website shows the first paragraph after it as the excerpt (up to 240 characters), so that paragraph is the opening or a subtitle, never an image or a note.
- **Settings at the top of the copy** (`build` writes them):
  - `slug:` always: a short address from the title's key words, lowercase letters or digits joined by `-`. Without one, the website cuts a long title's address mid-word at 80 characters.
  - `cover:` the image that best represents the article, usually its first; the website uses it as the share image, not on the page. None when the article has no image.
  - `author:` and `date:` (YYYY-MM-DD) only when the user gives them; otherwise the website uses its default author and the publishing day.
- **Images:** PNG, JPEG, WebP or GIF (judged by content, not by name), at most 10 MiB each, linked by a path inside the folder (`images/…`). An image from another website, a missing file, or an SVG blocks publishing, so render each diagram to a PNG.
- **What the website shows differently:** raw HTML is shown as text; only `https:`, `mailto:`, `/` and `#` links stay links (`http:` and file links become plain text); formulas are shown as written, not rendered, so put a formula the reader needs in a code block or an image. Tables, code blocks and lists render normally. Fix these in the draft, never only in the copy.

## Visuals On Every Platform

Every platform is read mostly on phones. Treat text-bearing diagrams and comparison graphics as mobile content: a large source PNG does not stay readable merely because the platform scales it down.

- Before delivery, view each text-bearing visual at a narrow mobile article width, such as 360–390px: a web project's page in the browser at phone width, a raster by resizing a copy with `run_bash` and viewing it. Titles, card text, row labels, arrows, lifecycle annotations, and every accept/revision or success/failure path must be readable without zoom or horizontal scrolling.
- If the check fails, reduce the text, split wide matrices into separate portrait cards, and stack wide workflows into portrait panels, keeping every relation the figure shows (arrows back as well as forward). Keep the reading order explicit and provide nearby prose that carries the same essential meaning.

## Bilingual Delivery

When the user asks for both languages, deliver in this order:

1. The WeChat Chinese draft.
2. The Medium English draft.
3. Optional alignment notes (3–6 bullets) on the logic preserved.

Each language gets its own web project or publish folder.

The conversion steps are in the writer's style workflow; the fidelity rules are in the principles, section 9.
