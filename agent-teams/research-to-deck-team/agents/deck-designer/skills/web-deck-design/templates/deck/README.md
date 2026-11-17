# <Deck name> (v1, YYYY-MM-DD)

**Status: draft for review. Not approved, not sent or uploaded.**

A slide deck built as a small web project: plain HTML and CSS with real, editable text on every slide, and no dependencies. Every claim's source is in [CLAIMS.md](CLAIMS.md).

| File | What it is |
| --- | --- |
| `index.html` | Every slide. Edit the text here. |
| `styles.css` | The 1280×720 stage and the visual style (colours at the top). |
| `deck.js` | Present mode, keyboard navigation, icons. |
| `assets/` | Vendored icons (and font, if any) with their licences, so the deck works offline. |
| `scripts/serve.mjs` | Local server for presenting and live review. |
| `scripts/export.mjs` | PDF plus one PNG per slide, with headless Chromium. |
| `exports/` | Dated PDFs and `slides/` screenshots. |

- **Present:** `node scripts/serve.mjs`, then open http://127.0.0.1:4173/. Arrow keys, Space or a click move between slides; `?overview` shows them all.
- **Export:** `node scripts/export.mjs --name <Deck-name-YYYY-MM-DD>`. It needs Chromium; set `CHROME=/path/to/chrome` if it is not found.
- **Change it:** change copy only against `CLAIMS.md`, and record the change there. A changed deck is a new version: export it under a new dated name and get it reviewed again before it is attached anywhere.
