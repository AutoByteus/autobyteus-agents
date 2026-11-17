# Research To Deck Production Principles

The rules all three roles apply. Each role's skill owns its own work.

## The deck is a web project

A deck is a small static web project: HTML/CSS slides with real text, diagrams in HTML/CSS with line icons, exported to a PDF and one PNG per slide. No slide is a generated image, so any word can be changed and re-exported in seconds. A photo or illustration appears only when the user supplies or approves it, and a conceptual one is labelled as such.

## Research before slides

- The research package (`article.md`, `research_notes.md`, `claim_evidence_ledger.md`, `research-resource-index.md`) is the source of truth for every claim on a slide.
- Never invent a claim, statistic, quote, date or implication to make a slide stronger. A qualifier is part of the claim: "first", "only", "fastest" or "leading" needs a source as a number does. A claim the research cannot support is a `Research Gap` for the researcher, not a wording problem for the designer.
- A change to an existing deck that adds no claim (wording, order, layout, style) needs no new research.

## The user's decisions

- **The slide plan:** the user approves `deck_storyboard.md` before the deck is built. Do not ask the user to review the research support files unless a high-risk research decision needs them.
- **The live review:** the user looks at the live deck and asks for edits. Record what changed and why.
- **Approvals:** the team delivers a reviewed deck for the user's use. Sending, uploading or publishing it is the user's act, not the team's.

## Claims on slides

Every claim on a slide has a row in the deck's `CLAIMS.md`: the exact wording, the claim/evidence ledger ID or source, the date checked, the type and the caveat shown. Numbers carry their date and caveat on the slide; a figure that counts something other than what it seems to (downloads are not active users) says so.

## Review gate

The deck reviewer reviews the exported pages of every version the team delivers. A version with blocking findings, or one changed after review, is not delivered as reviewed.

## Outcomes

Each role ends its work with one outcome and calls `get_handoff_rules`; the team configuration routes it:
- `Research Ready`: the research package is ready for deck planning.
- `Research Gap`: a slide needs a claim the research does not support.
- `Deck Change`: a change to an existing deck that needs no new research.
- `Review Requested`: a deck version is exported and self-checked.
- `Deck Fix`: the review found issues in the deck.
- `Review Passed`: the version can be delivered.
