# Agent Package Analysis: reuse the implementation engineer's checks instead of repeating them

- Status: `Completed`
- Operation: `update` (update intent: `extend`: record implementation checks so later roles can reuse them)
- Package type: `team` (Software Engineering Team: implementation engineer, API/E2E engineer, code reviewer, delivery engineer)
- Target package: `agent-teams/software-engineering-team/` (worktree `/tmp/sri`, branch `se-reuse-impl-checks`, from `origin/main` at `864d35a`)
- Files read in full: the API/E2E package after PR #60, the delivery skill and report template, `shared/handoff-references.md`, and the implementation-engineer skill and handoff template. The code-reviewer skill was read in this conversation; since then only a one-line symbolic-link note changed (`547dd3f`).
- Request/reference: Task `autobyteus-agents-26` (user direction, 2026-10-18).
- Related: Task `autobyteus-agents-10` (9c96bc42, "validation proportional to the change", TODO). It is kept separate (see Decisions).

## Evidence from a real ticket (`workspace-skill-collision-fix`, autobyteus-142)

- **The implementation handoff's "Local Implementation Checks Run" lists:**
  - `pnpm typecheck`;
  - `pnpm test:unit` (5,830 tests);
  - `pnpm test:integration` (396 tests);
  - the regression test;
  - two e2e files (6/6 and 29/29).

  It is free text with no commit, environment or saved output.
- **The API/E2E report then ran the same things:**
  - API-01: `pnpm typecheck`;
  - API-02: `pnpm test:unit`, `pnpm test:integration`;
  - API-04: the same two e2e files, 35/35.

  Nothing let it judge whether the earlier results still held (which commit, what output), and its skill never says to read the implementation checks.

## Baseline

| File | Today |
| --- | --- |
| `implementation-handoff-template.md`, Local Implementation Checks Run | Free text: "Record only implementation-scoped checks… Do not report API, E2E, or broader executable checks as passed". No commit, environment, evidence, or what each check covers. |
| Implementation `SKILL.md`:78 | "keep them implementation-scoped and report them as local implementation checks, not as downstream API/E2E sign-off." |
| API/E2E `SKILL.md` | Reads the implementation handoff for compatibility and data checks only; evidence-writing rules live in its Outputs. |
| Code reviewer `SKILL.md` | No rule on rerunning implementation checks during source review. |
| Delivery `SKILL.md` | Follows criterion → cases → files → quoted line in the API/E2E report. |

## Findings

| # | Priority area | Evidence | Owner | Change |
| --- | --- | --- | --- | --- |
| F1 | Structure and ownership | The evidence-writing rules (folder, header, excerpt, observed checks as files, exact quote, commit before handoff) live only in the API/E2E skill, but now two roles write evidence | New `shared/evidence-files.md`, linked from both writers | Move the rules there (one owner); the API/E2E skill keeps a pointer. |
| F2 | Grounding | The implementation checks have no commit, environment or output | Implementation handoff template and skill | One **Checks Run** table: check ID, command or steps, commit tested, environment, code it exercises, criteria or behavior, result, evidence files, the line to look for; plus checks not run, and why. |
| F3 | Content flow | API/E2E never reads the implementation checks | API/E2E skill and investigation template | Read them first. Reuse a result when it ran on the commit being validated, or the files changed since do not touch the code it exercises, and its evidence is enough to judge from. Otherwise rerun. Record the reuse in Planned Cases (Kind `Reused`) and in Cases, by the check's ID, not copied. |
| F4 | Content flow | The reviewer may rerun recorded checks | Code reviewer skill | Read the checks first; rerun only what changed since or what is unclear. |
| F5 | Consistency | Delivery follows cases | Delivery skill | A reused case points to its implementation check; follow it the same way. |

## Preserved behavior

- API/E2E's independent confidence gates (95% overall, no category below 90%).
- Direct proof of every critical criterion; a mocked test does not prove the boundary it bypasses.
- Realistic-system validation where needed; the user as the last resort.
- Implementation checks stay implementation-scoped: they are not API/E2E sign-off.

## Decisions

- **Keep Task 9c96bc42 separate.** This Task removes repeats of checks already run; 9c96bc42 decides how much to test for a change's risk. It needs its own investigation of why full runs happen, including the project's `TESTING.md`. The reuse rule and the "Reused" kind in Planned Cases give it a place to build on.
- **No new duplicate table.** The implementation handoff's existing section becomes the table; API/E2E refers to it by check ID.

## Planned changes

- Add `shared/evidence-files.md`, with symbolic links from the implementation-engineer and API/E2E skills' `references/`.
- `implementation-handoff-template.md`: the Checks Run table; the frontend check names check IDs.
- Implementation `SKILL.md`: record each check in that table with evidence per `evidence-files.md`; rerun affected checks after a later code change and update the rows.
- API/E2E `SKILL.md`: the evidence pointer; a "Reuse the implementation checks" rule; how a reused case is recorded.
- Coverage investigation template: Planned Cases Kind `Reused`, with why it still holds.
- Execution report template: how a reused case appears in Cases.
- Code reviewer `SKILL.md`: one rule in Implementation Review Rules.
- Delivery `SKILL.md`: reused cases in "Verify From Evidence".
