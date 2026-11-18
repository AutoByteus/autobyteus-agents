---
name: web-deck-design
description: Take a deck request, research its subject, and turn the research into a user-approved slide plan and a deck built as a small web project - HTML/CSS slides with real text, shown live in a browser tab for the user's review and edits, exported to a PDF and one PNG per slide, with a claim/source map. Also applies change requests to an existing deck, and reports each reviewed deck to whoever asked for it.
---

# Web Deck Design

Read [deck-production-principles.md](deck-production-principles.md) first. It is a symbolic link; open it by path.

## The project

```text
<work folder>/deck/
  index.html            every slide, one <section class="slide">; the text lives here
  styles.css            the 1280x720 stage, the visual style (colours at the top), print rules
  deck.js               present mode (arrows), ?overview (all slides), ?export#N (one slide, no chrome)
  assets/               vendored font and icons with their licences, so the deck works offline
  scripts/serve.mjs     local server for the live review
  scripts/export.mjs    PDF (one page per slide) and one PNG per slide, with headless Chromium
  CLAIMS.md             the claim and source map
  README.md             version, status, how to present, export and edit
  exports/              <name>.pdf and <name>/slide-NN.png, one pair per version
```

- **A new deck:** copy [the scaffold](templates/deck/) into `deck/` in the work folder, or into the folder the request names.
- **An existing deck:** work in its folder and keep its style. A changed deck is a new version: export it under a new name (`<Deck-name>-YYYY-MM-DD`, with `-v2` for a second version the same day), and keep the earlier exports.
- **No dependencies:** no package install is needed to view or export. Nothing loads from the network: vendor the font and icons into `assets/` with their licences. Fetch them with `npm pack lucide-static` and `npm pack @fontsource/inter` in your temporary folder (`scripts/vendor-icons.mjs` copies the icons the slides use); do not search the disk for them.

## 0. Take the request

The requester is the user, or the agent that delegated the deck to you; answer an agent by its run ID. Plan approval, the live review and the final report go to the requester.

- **Work out the deck:** topic, audience, what the deck is for, language, slide count, the supplied files, the deck folder, and whether web research is allowed (yes, unless the requester rules it out). Ask the requester once when a missing detail would change the deck; otherwise state your assumption in the storyboard.
- **A new deck, or a change that adds or alters a claim:** research it with `deep-research`, from the supplied files and, unless the requester rules it out, the web. Its claims check covers the claims the deck is likely to make, with their qualifiers, and the numbers and quotes the slides may show; for a change, the claim it adds or alters. If the research is blocked and needs a decision, put the question to the requester.
- **A change that adds no claim** (wording, order, layout, style): apply it from step 2 or 3, record it in `CLAIMS.md` › Changes, and export and request review as for any version. If it changes the story, revise the storyboard and ask again first.

## 1. Plan the slides with the requester

1. **Plan from the brief:** its answer, findings, claims check, "checked and ruled out" list and open gaps, with `evidence.md` behind them. A claim a slide needs that the brief does not support is researched further or stays off the slides.
2. **Write `deck_storyboard.md`** from [the storyboard template](templates/deck-storyboard-template.md): each slide's role, core message, must-appear text and claims.
3. **Ask the requester to approve it.** Revise it on their feedback. A change that alters a claim or the argument is researched first. Build nothing before the approval.

## 2. Build

- **Copy and claims:** build the approved slides with real text. Every claim gets its row in `CLAIMS.md`.
- **Border:** keep the thin page border on every slide, so pages stay distinct in any PDF viewer.
- **Line breaks:** use a non-breaking hyphen (`&#8209;`) in compound words that must not break across lines.

## 3. Review it live with the requester

- **Serve the deck:** start `node scripts/serve.mjs` in the background. It takes a free port, so it never collides with another project's server, and prints the deck's URL (also saved in `.server.json`). Open that URL with `open_tab`; the tab tool refuses `file://` URLs.
- **Look through the tab or the export:** use the tab's `screenshot`, or run the export, which uses a throwaway browser profile. Never start a browser yourself: it may use the user's own profile or screen.
- **Tell the requester:** give them the URL and say that the tab is open.
- **Each edit:** change `index.html` or `styles.css`, update the claim's row when a claim changed, and reload the tab with `navigate_to` on the same URL.
- **The tab and the server are yours:** when the review ends, close the tab and stop the server with `node scripts/serve.mjs stop`, which stops this deck's server and no other. Never stop servers by name: another deck's server runs the same script. If you leave them for a review still going on, say so.

## 4. Export and look at every page

- **Export:** run `node scripts/export.mjs --name <Deck-name-YYYY-MM-DD>`. It writes the PDF and one PNG per slide, and fails when the PDF's page count differs from the slide count.
- **Look at every PNG and the PDF:**
  - text clipped, overflowing or wrapped badly;
  - a missing icon or font;
  - a word broken at a hyphen;
  - the border on every page;
  - the slide order.
- **Fix and export again** until nothing is found.

## 5. Hand off for review

- **For review:** save the deck's `README.md` (version, export paths, what changed, what you checked, open claims), with the outcome `Review Requested`.
- **After a `Deck Fix`:** fix, export again under a new name, and request review again.
- **After a `Research Gap`:** research the claims the review names. A claim the research does not support comes off the slide or is reworded to what it supports; then export and request review again.

## 6. Report the reviewed deck

On `Review Passed`, report to the requester: the deck folder, the reviewed PDF and slide PNGs, what changed in this version and since the live review, any open claim or non-blocking finding, and that the deck is ready for their use. Sending, uploading or publishing it stays with the user.
