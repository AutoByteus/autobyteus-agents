# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `team` (`agent-teams/software-engineering-team`)
- Request/reference: Task autobyteus-agents-33 (feedback from the MCP-work Solution Designer at the user's request: "if simply by investigating the code does not reveal the problem … you have to try to reproduce and even add logs").

## Change

| File | Change |
| --- | --- |
| `shared/finding-the-cause.md` (new, 40 lines) | When reading does not prove a cause, investigate as an experienced developer would; any tool may be used. Temporary diagnostics: only in the isolated worktree or instance, recorded, removed, never committed, never the fix. What the team needs: run cheap premise checks; say how each finding was established (`Read`/`Reproduced`/`Measured`); hand the reproduction over for implementation to start from red. Examples: autobyteus-179, -181, -189, -194. |
| Symlinks in four roles' `references/` | Solution Designer, code reviewer, API/E2E engineer, implementation engineer |
| Solution Designer `SKILL.md` steps 1 and 3.2, `architecture-design.md` | Point to the guide; premises are confirmed by running where cheap |
| Code reviewer (failure-origin review), API/E2E (uncertain bug claim) | One pointer each |
| Implementation engineer | Start from a handed-over reproduction: confirm it fails, then make it pass |
| Investigation-notes template | An `Established` column; lines for temporary diagnostics and the reproduction |
| Design-spec template, Guidance For Implementation | "Reproduction to start from" |

Not included, after evaluation: the step-by-step ladder (one sentence now) and "a surprising result gets a second check". Capable agents already did both.

## Validation

- Links: 0 broken, 0 unnamed.
- `compare-wording.py`: no requirement weakened ("confirm a suspicion with a cheap probe" became the pointer to the guide).
- Evaluation: `evidence/LC-CAUSE-1-old-vs-new.md`.
  - **Old text vs the first draft:** both reproduced the race. Only the new text recorded how each finding was established, ran a premise check, kept its probes in the ticket and handed the reproduction to implementation; the old text discarded its probes.
  - **Second-check point:** two further fixtures were sidestepped by careful agents, so the point was dropped.
  - **Final 40-line text, one run:** `Measured`/`Reproduced` per finding, temporary diagnostics `None`, the reproduction named in the design's guidance, and a prototype of the fix shape run before designing.

The Task's "user approves the wording" was a suggestion in the feedback file. Under the user's later instruction (merge after a passed evaluation without asking), this was merged directly.
