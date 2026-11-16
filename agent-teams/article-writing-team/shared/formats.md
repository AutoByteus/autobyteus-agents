# Formats

The format the AutoByteus website takes, and the script that builds and checks it. Where the files sit in the work folder is in [the article package](article-package.md).

## Markdown Folder

Every article ends with a publish folder in the format the AutoByteus website's article import takes: the user drops the folder on the website's Articles page. Where it sits and when it is built are in [the article package](article-package.md). It is a copy of the reviewed draft made by `scripts/publish-folder.py` (in each role's skill): only the image links and the settings differ from the draft. `build` makes it, `check` reports what would block publishing or show wrongly, and both print the title, address and excerpt as the website will show them.

- **What it holds:** `article.md` and `images/` with the images the article shows. Nothing else from the work folder.
- **The title and excerpt:** the first line is `# ` and the title. The website shows the first paragraph after it as the excerpt (up to 240 characters), so that paragraph is the opening or a subtitle, never an image or a note.
- **Settings at the top of the copy** (`build` writes them):
  - `slug:` always: a short address from the title's key words, lowercase letters or digits joined by `-`. Without one, the website cuts a long title's address mid-word at 80 characters.
  - `cover:` the image that best represents the article, usually its first; the website uses it as the share image, not on the page. None when the article has no image.
  - `author:` and `date:` (YYYY-MM-DD) only when the user gives them; otherwise the website uses its default author and the publishing day.
- **Images:** PNG, JPEG, WebP or GIF (judged by content, not by name), at most 10 MiB each, linked by a path inside the folder (`images/…`). An image from another website, a missing file, or an SVG blocks publishing.
- **What the website shows differently:** raw HTML is shown as text; only `https:`, `mailto:`, `/` and `#` links stay links (`http:` and file links become plain text); formulas are shown as written, not rendered, so put a formula the reader needs in a code block or an image. Tables, code blocks and lists render normally. Fix these in the draft, never only in the copy.
