# Agent Package Creation Result

- Status: `Completed`
- Operation: `update` (update intent: `optimize` — one home per rule)
- Package type: `team` (`agent-teams/software-engineering-team`, its shared design guide)
- Request/reference: Task autobyteus-agents-40 (the PM; proposed by the Creator at the end of autobyteus-agents-36). The user, 2026-10-20: evaluate with the updated skill, make the change, merge directly and close.
- Order with autobyteus-agents-39 (proportionality): this goes first. It gives each rule one home, so the proportionality pass can trim from a structure without copies.

## What changed

`shared/design-principles.md` stated one rule through many lenses: Core Principles, Derived Checks, Practical Application Guide, Structural Triggers, Common Local Patterns, Short Example Shapes, Required Design Questions, Design Smells. The authoritative-boundary rule alone appeared about 10 times.

Each rule now has one home, a numbered principle that holds:
- its statement;
- how to apply it;
- its **Signals** (the old triggers and smells);
- its **Check** (the old design questions).

Principles 1–7 keep their numbers and anchors. Principles 8–14 give the rules that only lived in the lens sections a home:

| # | Principle |
| --- | --- |
| 8 | Clean-cut replacement and removal |
| 9 | Dependency direction |
| 10 | Interfaces follow ownership |
| 11 | Reusable owned structures stay tight |
| 12 | File responsibility and placement |
| 13 | One owner for coordination policy, no empty layers |
| 14 | A spine-first, concrete design document |

How the other sections changed:
- **Kept at their anchors, now short and pointing to the principles** (templates and skills link them): Practical Application Guide (an ordered sequence) and Structural Triggers (a table: trigger, when it fires, principle).
- **Kept as they are:** Task Design Health Assessment (its root causes now name their principles), Task Size, and Common Local Patterns (its bypass "avoid" lines became one pointer to Principle 3).
- **Dissolved into their rules' homes:** Derived Checks, Short Example Shapes, Required Design Questions, and Design Smells.

`design-examples.md`: its owner's instruction is to preserve the examples, so they are unchanged. Only "How To Use These Examples", which restated the principles as a list, now points to them. Its per-example lessons illustrate in context and stay.

Consumers: the design-spec template's link to the removed Derived Checks section now points to Principle 8. Every other anchor in use was kept.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Old → new map | Complete | [old-to-new-map.md](old-to-new-map.md): all 393 content lines of the old file with their new home. 87 were merged or reworded, each keeping 83–100% of its words; the lowest were checked by hand. None was deleted without a home; only the file's introduction was rewritten. |
| Links | Pass | `check-links.py` on the team: 0 broken, 0 unnamed; no reference to a removed section remains |
| Same issues found (LC-DP-01) | Pass | `evidence/LC-DP-01-*`: a sample ticket with five planted flaws (boundary bypass, dual-read compatibility, a catch-all record type, an ambiguous `getById`, dead code in a touched module). The architecture reviewer and the code reviewer, on the old and on the new text, each found all five. On the new text they cited one numbered principle per finding, and the design review also found two more (no change inventory or sequence, P14; "finished" undefined in the requirements, P1). |
| Final review | Pass | Every principle has Signals and/or a Check where the old file had smells or questions for it. The triggers table covers all 12 old triggers. The patterns keep their content. |

Size: 516 → 485 lines. The aim was one home per rule, not a shorter file; trimming belongs to autobyteus-agents-39.

## Line-by-line verification (after merge, at the user's request)

The user asked for every merged or reworded line to be compared for lost information: two statements that look alike may cover different aspects. All 87 lines not carried over verbatim were read beside the new text that carries them.

- **Lost:** none. No rule, check, design question (all 23), design smell (all 21), trigger (all 12), or example shape was merged away. Statements that looked alike said the same thing; where they differed in detail, the new text keeps the union (for example, capability reuse keeps both the general check and the trigger's list of categories).
- **Softened, 4 places, restored in a follow-up PR:** "file placement **must** follow ownership" and "interfaces … **must** follow ownership" had become plain "follows"; "build a **small** spine inventory early" had lost "small"; "the **operational** benefit justifies the risk" had lost "operational".
