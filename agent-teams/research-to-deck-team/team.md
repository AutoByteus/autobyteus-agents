---
name: Research To Deck Team
description: A deck team whose designer researches the subject with the shared `deep-research` skill, gets the user's approval of a slide plan, builds the deck as a small web project (HTML/CSS slides with real text) with a live review in a browser tab, independently reviews the exported PDF and PNGs, and delivers them.
category: content-and-presentations
---

This team takes a topic, supplied materials or an existing deck through research to a reviewed deck. The deck is a web project with real, editable text, exported to a PDF and one PNG per slide; no slide is a generated image. The rules the deck members apply are in [deck-production-principles.md](shared/deck-production-principles.md).

## Roles

- `deck_designer` (entry and coordinator): takes the request, researches the subject with the shared `deep-research` skill, plans the slides with the user, builds the web deck and its claim map, reviews it live with the user, exports it, and reports each reviewed deck to whoever asked for it.
- `deck_reviewer`: an independent review of each version's exported pages before the team delivers it.

## Flow

1. The designer researches the subject and writes the research brief.
2. The designer writes `deck_storyboard.md` from the brief, and the user approves it.
3. The designer builds the deck, shows it live in a browser tab, and applies the user's edits.
4. The designer exports and checks every page (`Review Requested`).
5. The reviewer passes the version (`Review Passed`, and the designer reports it), sends findings back (`Deck Fix`), or names a claim the research does not support (`Research Gap`, and the designer researches the claim or takes it off).

A change to an existing deck that adds no claim needs no research: the designer applies it. The user can talk to any member. The [team configuration](team-config.json) owns the routes.
