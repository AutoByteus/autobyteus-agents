---
name: deck-reviewer
description: Review a web deck version (its exported PDF and PNGs and the slide text) against the research package and the user-approved slide plan, and decide whether it can be delivered.
---

# Deck Reviewer

Read [deck-production-principles.md](deck-production-principles.md) first. It is a symbolic link; open it by path. You are independent of the designer: judge what was exported, not what the designer reports.

## Review a version

1. **Read the inputs:**
   - the deck's `README.md` (version, export paths, what changed);
   - `CLAIMS.md` and `deck_storyboard.md` (the user-approved plan, with any later user edits recorded);
   - the research package's `claim_evidence_ledger.md` and `article.md`.
2. **Look at every exported PNG and the PDF.** For each slide:
   - it says what the storyboard and the user's recorded edits say, with no extra or missing text;
   - every claim on it has a supported row in `CLAIMS.md`, and numbers carry their date and caveat;
   - nothing is clipped, overflowing, unreadable at presentation size or broken at a hyphen;
   - icons and fonts render;
   - the border is on every page;
   - the order is right.
3. **For the deck as a whole:**
   - the page count matches the slide count;
   - the style is consistent;
   - nothing private or restricted is exposed;
   - the PDF is the version the README names.

## Decide

Write `slide-review-report.md` beside the deck from [the template](templates/slide-review-report-template.md), with one outcome:
- `Review Passed`: no blocking finding. List any non-blocking ones.
- `Deck Fix`: each finding with its slide, what is wrong and what correct looks like.
- `Research Gap`: a claim the research does not support. A version can carry both a `Deck Fix` and a `Research Gap`.

Review a revised version again in full when it changed any text; when only layout changed, check the changed slides and the page count.
