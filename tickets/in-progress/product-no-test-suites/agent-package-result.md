# Agent Package Creation Result

- Status: `Completed` (evaluation stopped early at the user's request)
- Operation: `update`
- Package type: `team` (`agent-teams/product-team`)
- Request/reference:
  - Task autobyteus-agents-45.
  - The user, 2026-10-21: "They don't need to do tests, because the whole purpose is to develop a UI to do UI design"; "they are doing real software engineering … but they forget their purpose"; "we cannot sacrifice on the UI UX file … all those screenshots, navigation should be there".
- Owner check: the skills decide what the designer runs, so the package owns that. The design repository's README, scripts and documents belong to the repository: see [design-repository-proposal.md](design-repository-proposal.md).

## Why it ran so long (evidence)

- **Per-ticket check scripts, rerun at every step.** `search-model-settings`: a 245-line `final-validation.mjs` with 87 checks, run before review, after approval and again after integration, plus typecheck, lint and 17 unit tests.
- **Baseline refreshes rerun old designs.** WEB-BASELINE-REFRESH-010 took about 3 hours with no user wait. It ran typecheck, lint, 17 tests and 13 boundary checks, 44 flow checks, a parity matrix of 108 rows and 39 preview checks. It then reran three finished designs' scripts (14 + 13 + 7) and recaptured one design's screenshots.
- **The wording pushed it there.** "Run the available build, typecheck, lint, unit, or browser checks"; "Record exact commands, results"; revalidation at every stage; a "UI behavior test matrix" template; "read the project's README before choosing commands", where the repository README requires typecheck, lint, test and ten `validate:*` scripts.
- **No identity.** The designer's agent text explained mode selection only; the team's purpose sat on line 26 of the principles.

## Change

| File | Change |
| --- | --- |
| `agents/product-ui-ux-designer/agent.md` | Identity: a designer who uses code as a drawing tool. The approved screenshots and spec are what engineering builds from. Not building the product: no production code, no test suites, no engineering process around the reference. |
| `agents/ui-baseline-bootstrapper/agent.md` | Identity: builds a copy of the current UI for the designer to design on; no test suites or engineering process. |
| `shared/product-design-principles.md` §1, §6 (the one home) | Design work done in code, not software engineering. Check like a designer: in the browser, with no test suites, no per-ticket check scripts, and no `validate:*`/`capture:*` scripts in the repository; a repository's own testing instructions are not part of design work. A disposable script only for a stated specific risk. Check what the work changed; finished designs are a record, not rechecked or recaptured. |
| `product-experience-design` SKILL | Checking (was Validation): the README is for how to start the reference. The build/typecheck/lint/unit line and "record exact commands" are removed. Checks happen while building, before review, once after approval, and a quick open after merging. Step 9 screenshots: every changed page and state, the page around each change, and the journey steps leading to it; narrow viewport where its layout changes. The test-matrix artifact is removed. |
| `product-design-repository-management` SKILL | Final check confirmed rather than rerun; base advancement: look again at affected screens; after integration, open it once (it must be reachable from the default branch). |
| `ui-baseline-bootstrapper` SKILL and report template | Compare in the browser without test suites; record the start command, URL, scenario method and limitations. |
| Templates | Deleted `ui-behavior-test-matrix-template.md`; removed test fields from the runbook, product ticket, report and baseline report; the spec's "Final validation date" is now "Final check date". The spec template is otherwise unchanged. |

Kept:
- the UI/UX spec template and its journey, screen and visual-reference sections;
- the final screenshots;
- UI parity between baseline and source;
- the visual design review;
- "must be reachable from the default branch" after integration.

## Validation

- Links: 0 broken. compare-wording: the only weakened sentences are the removed test rules; the post-integration "must" was restored.
- Evaluation (`evidence/LC-NOTEST-1-old-vs-new.md`), stopped early at the user's request:
  - **Old text:** ran `vitest`; within 90 seconds of approval it wrote and ran a Playwright `final-validation.mjs`.
  - **New text:** no test commands; spent its time looking at the design in the browser at two widths.
  - **The designs:** of the same quality.
  - **Not compared:** the finishing phase. The strengthened step-9 screenshot wording was not run live.
