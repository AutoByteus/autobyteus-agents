# Creator: test data for evaluations (anti-pattern 27)

- Request: the user, 2026-10-20: "when you are doing evaluation sometimes you have to create test data you know"; "i guess you can update your own agent package first".
- Change:
  - `live-checks.md`, Test data: create what each point needs, keep it consistent, and leave the agent its real-use tools and reading.
  - `live-checks.md`, Judge: map each point to where the run exercised it; an unexercised point is untested, not passed; build data for it and rerun.
  - `package-anti-patterns.md`: new entry 27, with three incidents from today.
- Checks: links 0 broken; compare-wording: no requirement weakened.

## Evaluation (old vs new, isolated instances, claude-opus-5)

The same question to both: a live-check summary for a three-point change in which no probe result was surprising.

| | Old text | New text |
| --- | --- | --- |
| Verdict | Inconclusive, no merge; point 3 never exercised | Inconclusive, no merge; per-point table: 1 not attributable, 2 partial, 3 untested |
| Basis | live-checks.md "the trap the rule is about", old vs new comparison | live-checks.md "a point the run did not exercise is untested, not passed", anti-pattern 27 |

Outcome: both reach the right verdict on a tidy summary; the new text maps every point and names the rule. The entry records three real misses made in this conversation while immersed in the work, which a neutral question cannot recreate.
