# LC-FOLD-1: a finished ticket's 14 follow-ups, old vs new Project Task Manager text

AutoByteus 1.5.7-beta.4, two isolated instances; PM claude-opus-5; relay agent claude-sonnet-5 delivers the end message as an agent message; 2026-10-21. Old: origin/main 074dc24. New: branch pm-fold-small-followups.

Test data: the real follow-ups.md of autobyteus-229 (dependency-security-and-unused-cleanup, 14 rows, FU-001 and FU-002 urgent) in a test repository where the ticket is merged, with every evidence file the rows cite. Project with the finished Task (open dispatch on the board) and two open Tasks: "Packaged Electron build: make the build scripts work on every host" (FU-013/014 belong there) and "Type-check the test files" (related area, different concern).

| | Old text | New text |
| --- | --- | --- |
| Finished Task | DONE after verifying the merge | DONE after verifying the merge |
| Follow-up Tasks | Planned 10 new Tasks, none created yet (plan for approval) | 7 new Tasks created, 2 rows added to an open Task |
| FU-013/014 | A new planned Task duplicating the open packaged-build Task | Added to the open packaged-build Task ("instead of creating a duplicate") |
| FU-003/004/009 (web toolchain) | 3 Tasks | 1 Task |
| FU-008/010/011 (timing-dependent tests) | 1 Task | 1 Task |
| FU-001+007 (Fastify, gateway lockfile) | 1 Task, urgent | 1 Task, urgent |
| FU-002 (xlsx) | Own Task, urgent | Own Task, urgent |
| FU-006 (Monaco, the user's decision) | Own Task | Own Task |
| Type-check Task | Untouched | Untouched ("unrelated") |
| Row-to-Task report | Yes | Yes |

## old text, final reply (excerpt)

```text
**`autobyteus-1` is done and closed.** I verified it rather than taking it on report: `8feb522` is an ancestor of `origin/main`, the archived ticket and its evidence are on `main` at `tickets/done/dependency-security-and-unused-cleanup/`, and the ticket branch and worktree are both gone.

## Two urgent follow-ups — live security advisories in shipped code

- **FU-001 — Fastify 4.29.1 is end-of-life, 6 high advisories.** Affects the server *and* the message gateway. One is an authentication bypass via malformed URLs (GHSA-p68q-wchp-6fh7); two more are validation bypasses. Fixes exist only in Fastify 5, so this is a framework-major migration, not a bump. The GraphiQL route is also enabled in `src/api/graphql/index.ts`, which exposes the vulnerable `@fastify/static` 7.
- **FU-002 — `xlsx` 0.18.5 parses user-supplied spreadsheets at run time** in `ExcelViewer.vue`. Prototype pollution and ReDoS, and **there is no fixed release on npm** — SheetJS ships fixes only from its own CDN. So this one can't be solved by any upgrade command; it needs a deliberate choice of tarball-with-integrity or a different library.

The remaining 12 are non-urgent: toolchain majors, a dev-only icon generator, undeclared imports surviving on pnpm's hidden hoist, three flaky tests, a live LM Studio suite that passes without calling anything, and some build/doc drift.

## Plan for approval

I grouped the 14 follow-ups into **10 Tasks** — plan at `task-plans/2026-10-21-dependency-security-follow-ups/task-plan.md`:

| # | Task | Covers |
| --- | --- | --- |
| 1 | Fastify 5 migration (server + gateway) **+ gateway under a lockfile** | FU-001, FU-007 |
| 2 | Replace the spreadsheet parser in the file viewer | FU-002 |
| 3 | Declare the packages our code imports | FU-005 |
| 4 | Upgrade the web build and test toolchain | FU-003 |
| 5 | Lift the DOMPurify pin *(after 4)* | FU-009 |
| 6 | Modernize the icon generator | FU-004 |
| 7 | Decide how the file editor loads Monaco | FU-006 |
| 8 | Make the known flaky tests deterministic | FU-008, FU-010, FU-011 |
| 9 | Make the LM Studio live suite fail instead of passing silently | FU-012 |
| 10 | Fix the packaged Electron harness and its build docs | FU-013, FU-014 |

Only three merges, each for a stated reason: FU-007 rides with FU-001 because the follow-up author asked for it and the gateway's Fastify can't be audited until it has a lockfile; the three flaky tests are one kind of small fix for one team; FU-013/FU-014 are the same build path, and the doc fix has to state the harness fix's outcome. Task 5 waits on Task 4 because the happy-dom bas
```

## new text, final reply (excerpt)

```text
**`autobyteus-1` (dependency security and unused cleanup) is DONE.** I verified the delivery myself before closing: `8feb522` is an ancestor of `origin/main`, the ticket branch is gone, no stray worktrees, and the archived ticket with its evidence is on `main`.

**Two urgent items need your attention now** — both are security advisories in code that ships and runs:

- **`autobyteus-4` — Fastify 5 migration (server + message gateway).** Fastify 4.29.1 is end-of-life with 6 high advisories fixed only in 5.x, including an authentication bypass via malformed URLs, plus `@fastify/static` (GHSA-83w8-p2f5-377r) reachable because GraphiQL is enabled. Includes bringing the message gateway under a lockfile first (its dependencies are invisible to `pnpm audit` today, and its Dockerfile installs a package the workspace doesn't list).
- **`autobyteus-5` — replace the spreadsheet parser in the file viewer.** `xlsx` 0.18.5 parses user spreadsheets in `ExcelViewer.vue`; prototype-pollution and ReDoS advisories have **no fixed npm release**. Choice between the SheetJS tarball and another library (e.g. `exceljs`, read-only).

**All 14 follow-up rows are recorded, none dropped:**

| Task | Rows | What it covers |
| --- | --- | --- |
| `autobyteus-4` (urgent) | FU-001, FU-007 | Fastify 5 / mercurius 16 migration; gateway lockfile + Docker + audit |
| `autobyteus-5` (urgent) | FU-002 | Spreadsheet parser replacement |
| `autobyteus-6` | FU-003, FU-004, FU-009 | Web dev/build toolchain majors (happy-dom 20, vitest, electron-builder 26, codegen), icon generator + sharp, lifting the DOMPurify pin — all one test/build-DOM decision |
| `autobyteus-7` | FU-005 | Declare `@apollo/client`, `graphql`, `jsdom` etc.; drop unregistered `@nuxtjs/apollo` |
| `autobyteus-8` | FU-006 | How Monaco loads (offline vs CDN) — product decision for you |
| `autobyteus-9` | FU-008, FU-010, FU-011 | Three timing-dependent tests made deterministic (incl. checking whether FU-008 hides a real watcher bug) |
| `autobyteus-10` | FU-012 | `LLMFactory` lists 0 LM Studio models while discovery finds 4 — possibly a product defect, not just a silent-pass suite |
| `autobyteus-2` (existing, extended) | FU-013, FU-014 | Packaged Electron harness builds for the host; fix the `npx ts-node` commands in `electron_packaging.md` |

I extended the existing `autobyteus-2` instead of creating a duplicate — it already owned exactly that scope. `autobyteus-3` (type-check test files) is unrelated and still TODO.

Nothing is dispatched yet. **Which do you want first — `autobyteus-4` or `autobyteus-5`?** Both to `/software_e
```
