# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `team` (Software Engineering Team: shared design principles, design-spec template, design-review template, architecture reviewer skill)
- Request/reference: Task autobyteus-agents-53; the architecture reviewer's analysis `design-principles-gap-analysis.md` (20 cases from autobyteus-191, 245, 247, 261, 278), made at the user's request, 2026-10-23.

## Patterns to rules (one home each)

| Pattern | Cases | Escaped review? | Rule and home | Would have caught |
| --- | --- | --- | --- | --- |
| A: several kinds or entry forms; parallel paths | #1, #3, #15, #17, #18 | Caught in round 1, after design | Principle 1: trace each kind and form; compare gates of parallel paths | All five at design time |
| F: unverified claims about code | #1, #9, #13, #15, #18 | #9 found by implementation | Principle 1: cite file and line; compare "mirrors" rule by rule; count call sites | All five, #9 before implementation |
| C: one sequence, two owners | #4, #5 | Both found only when the user asked | Principle 2 (call order, one owner per node) and Principle 13 (the owner calls each mechanism itself; no passed-in function reaching another collaborator; branching by side means two roles) | #4: shown live below; #5 by the side-branching sentence |
| B: consumers of derived data | #10, #11 | Both escaped design and review | Principle 11: list readers of the structure and of everything derived from it | Both at design time |
| E: behavior by absence | #6, #20 | #6 found only when the user asked | Principle 13: a named behavior is an explicit rule, not a missing lookup or event | Both |
| D: one fact derived twice | #13, #16, #19 | All caught in review | Shrunk to one sentence and a signal in Principle 11 | Same cases, earlier |
| G, H: review lapses | #7, #8, #14 | — | No new rule (the Task's instruction); "the same shape in each root" added as a signal phrase to Principle 13 | — |

Structural Triggers: four rows (several kinds or forms, split sequence, derived data, behavior by absence).
- **Design-spec template:** cite evidence for claims; spines in call order with one owner per node that calls each mechanism itself; one row per kind; a "Derived consumers" line in Change Scope.
- **Review template:** the spine "Ownership" column becomes "One Owner Per Node, In Call Order?" with a fail note; a claims line in the basis confirmation; a derived-consumers line.
- **Reviewer skill:** a finding that constrains a boundary names who drives the sequence and in what order; later rounds redraw affected spines in call order.

## Line counts

| File | Before | After |
| --- | --- | --- |
| `shared/design-principles.md` | 485 | 498 |
| `design-spec-template.md` | 384 | 385 |
| `design-review-report-template.md` | 252 | 257 |
| `architecture-reviewer/SKILL.md` | 91 | 92 |

Net +20 lines. Every new rule but two is conditional on its trigger. The two that always apply, citing a line and writing the spine in call order, cost a small ticket nothing.

## Evaluation (isolated instances, claude-opus-5)

**Replay of the real miss.** Clones of the AutoByteus repository at `910f024ec5` (SR-013), the round-2 package that ARCH-REV-002 passed with the callback zig-zag. The architecture reviewer got the same round-2 handoff message.

| Run | Text | Zig-zag (DS-002/DS-003) | Decision |
| --- | --- | --- | --- |
| 1 | old (main) | Not mentioned | Fail, on another issue |
| 2 | new, first wording ("callbacks are not for a peer to finish the owner's sequence") | Checked and passed: "`transmit` is a mechanism the engine calls" | Fail, on another issue |
| 3 | new, final wording (the owner calls each mechanism itself; no passed-in function reaching another collaborator) | **Caught:** AR-002 "The remote send sequence is split between the engine and `RemoteRunLinks`", citing the rule and the compound owner. Its fix option 2 is the shape the real round 4 adopted (`prepareRemoteSend` → transmit → `commitSentToRemote`) | Fail |

**Small ticket.** "greet('') returns 'Hello, !'", given to the Solution Designer on old and new text. Both specs have 45 sections; the new rules added about two lines (a "Derived consumers: N/A" line and one trigger note). The rest of the 286 → 378 line difference is run variance (a longer examples section, +65).

One run per side; a model can reason differently on another run.
