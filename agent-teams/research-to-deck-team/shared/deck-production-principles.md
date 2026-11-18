# Research To Deck Production Principles

## The deck is a web project

A deck is a small static web project: HTML/CSS slides with real text, diagrams in HTML/CSS with line icons, exported to a PDF and one PNG per slide. No slide is a generated image, so any word can be changed and re-exported in seconds. A photo or illustration appears only when the user supplies or approves it, and a conceptual one is labelled as such.

## Research before slides

- The Deep Researcher's brief for the deck is the source of truth for every claim on a slide: its findings, its claims check (`supported`, `not supported`, `needs confirmation`) and its "checked and ruled out" list, with `evidence.md` behind them. A slide carries only `supported` claims; a `needs confirmation` claim goes on a slide only after the user confirms it, recorded in `CLAIMS.md`.
- Never invent a claim, statistic, quote, date or implication to make a slide stronger. A qualifier is part of the claim: "first", "only", "fastest" or "leading" needs a source as a number does. A claim the brief does not support needs research or comes off the slide; it is not a wording problem.
- A change to an existing deck that adds no claim (wording, order, layout, style) needs no new research.

## The user's decisions

- **The slide plan:** the user approves `deck_storyboard.md` before the deck is built. Do not ask the user to review the research files unless a high-risk research decision needs them.
- **The live review:** the user looks at the live deck and asks for edits. Record what changed and why.
- **Approvals:** the team delivers a reviewed deck for the user's use. Sending, uploading or publishing it is the user's act, not the team's.

## Claims on slides

Every claim on a slide has a row in the deck's `CLAIMS.md`: the exact wording, its source (the brief's finding or claims-check row, with the source it cites), the date checked, the type and the caveat shown. Numbers carry their date and caveat on the slide; a figure that counts something other than what it seems to (downloads are not active users) says so.

## Temporary files

Scratch work (unpacked packages, page renders, text dumps) goes in a folder of your own made with `mktemp -d`, never loose in `/tmp` or the work folder. Remove that folder before you hand off or report, in any outcome, and only that folder: other folders in `/tmp` belong to other work. If you must leave something, say what and why in your result.

## Review gate

The deck reviewer reviews the exported pages of every version the team delivers. A version with blocking findings, or one changed after review, is not delivered as reviewed.

## Outcomes

Each deck member ends its work with one outcome and calls `get_handoff_rules`; the team configuration routes it:
- `Review Requested`: a deck version is exported and self-checked.
- `Deck Fix`: the review found issues in the deck.
- `Research Gap`: the review found a claim the brief does not support.
- `Review Passed`: the version can be delivered.
