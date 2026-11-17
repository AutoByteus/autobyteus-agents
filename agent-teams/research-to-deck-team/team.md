---
name: Research To Deck Team
description: A three-specialist team that researches a topic, gets the user's approval of a slide plan, builds the deck as a small web project (HTML/CSS slides with real text) with a live review in a browser tab, independently reviews the exported PDF and PNGs, and delivers them.
category: content-and-presentations
---

This team takes a topic, supplied materials or an existing deck through research to a reviewed deck. The deck is a web project with real, editable text, exported to a PDF and one PNG per slide; no slide is a generated image. The rules all members apply are in [deck-production-principles.md](shared/deck-production-principles.md).

## Roles

- `deep_researcher` (entry member): the research package; routes a change request on an existing deck; reports each reviewed deck to the user.
- `deck_designer`: the slide plan for the user's approval, the web deck and its claim map, the live review with the user, the exports.
- `deck_reviewer`: an independent review of each version's exported pages before the team delivers it.

## Flow

1. The researcher builds the research package (`Research Ready`).
2. The designer writes `deck_storyboard.md`, and the user approves it.
3. The designer builds the deck, shows it live in a browser tab, and applies the user's edits.
4. The designer exports and checks every page (`Review Requested`).
5. The reviewer passes the version (`Review Passed`, and the researcher reports it to the user), sends findings to the designer (`Deck Fix`), or sends an unsupported claim to the researcher (`Research Gap`).

A change to an existing deck that adds no claim goes straight to the designer (`Deck Change`). The user can talk to any member: plan and deck feedback to the designer, research questions to the researcher. The [team configuration](team-config.json) owns the routes.
