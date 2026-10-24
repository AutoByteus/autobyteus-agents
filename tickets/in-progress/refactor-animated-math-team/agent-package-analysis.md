# Animated Mathematics Team — Analysis

- Status: `Completed` (analysis; implementation and acceptance follow).
- Operation: `update`; package type: `team`; update intent: `extend and repair the experience contract`.
- Target: `/home/autobyteus/workspace/autobyteus-agents/agent-teams/middle-school-mathematics-team/`.
- Request: `autobyteus-agents-4`, 2026-10-24; user rejected the static Fun Learning opening and explicitly authorized a reusable team refactor plus a local animated frontend demonstration.
- Base: `origin/main` at `3ceaae5`. The local checkout was four unrelated PM commits behind; work uses a fresh worktree from the fetched base. The mathematics package is unchanged since PR #117.
- Scope: the mathematics package, its discovery row and this task's evidence; a new demo directory in Fun Learning. Excludes old demo edits, a platform/curriculum, other subjects, deployment, real learner recording, private packages and installed skills.

## Baseline and complete read

Every regular file below was read in full; both symlinks were resolved to the shared standard. The original diagram render in Fun Learning was also viewed.

| Files under the mathematics package | Existing owner/function |
| --- | --- |
| `team.md`, `team-config.json`, `README.md` | Two-role chat episode purpose, roster/routing, activation |
| `agents/learning-guide/agent.md`, `agent-config.json` | Guide identity, tools and attachment |
| `agents/learning-guide/skills/guide-visual-math-learning/SKILL.md` | Prepare/review a small episode, then ask and wait |
| That skill's `references/starter-episodes.md` | Equation/area examples, hints, keys, limits, old cooperation example |
| That skill's `assets/equal-groups.svg`, `assets/split-rectangle.svg` | Static mathematical reference sketches |
| That skill's `learning-standard.md` symlink | Shared standard attachment |
| `agents/mathematical-reviewer/agent.md`, `agent-config.json` | Reviewer identity, tools and attachment |
| `agents/mathematical-reviewer/skills/review-visual-math/SKILL.md` | Mathematical/representation review of proposed material |
| That skill's `learning-standard.md` symlink | Same shared standard attachment |
| `shared/learning-standard.md` | Correctness, learner participation, privacy, evidence attribution |

External baseline read, not copied to the public package:
`/home/autobyteus/workspace/fun-learning/math-sessions/2026-10-24-moon-base-cargo/`
contains `result.md`, `episode.md`, `review-r1.md`, `learner/opening.md`,
`learner/cargo.svg`, `validation/inspection-r1.md`, `validation/check.py`,
`validation/check-r1.json`, and the viewed `validation/cargo-r1.png`.
There is no frontend project, animation, learner-driven executable state, or
browser interaction test in that delivered folder. Its reviewer explicitly
limited the pass to an opening and noted a numerical coincidence in the transfer.
It is historical evidence, not an accepted experience or human trial.

## Findings and ownership

| # | Evidence and consequence | Canonical owner and change |
| --- | --- | --- |
| 1 | Guide skill “Prepare one episode” permits a text sketch/SVG; team outputs stop at notes and prompts. No one owns implementation. A correct static opening therefore satisfies the old contract but not the new request. | Add one Experience Builder; update team boundary and Guide's primary output to a complete runnable experience. Three roles are warranted, not an organization. |
| 2 | Guide's “Awaiting learner” is also used as the delivery boundary. The baseline asks the observing user to inspect an opening rather than providing the full interaction. | Separate building an experience from using it: build every stage and branch; the app waits for learner actions. Delivery must not wait for fabricated learner replies. Retain explicit chat-only tutoring as a separate short path. |
| 3 | Shared standard has no motion/state meaning or executable interaction bar; Reviewer can leave rendering unverified. Static arithmetic, SVG counts and a screenshot all passed the rejected output. | Extend the shared bar to purposeful animated transformations, synchronized mathematics, learner choices/feedback and transfer. Require actual browser interaction and intermediate-state inspection for an experience pass. Build success/screenshots alone are insufficient. |
| 4 | No tool/procedure owns dependencies, lockfile, localhost preview, input/state recovery or process cleanup. | Builder owns project source, launch instructions and browser tests; Reviewer uses shell/browser automation and image reading for independent rendered checks. No external runtime service or hosting is required. |
| 5 | Baseline transfer's solution repeats a supplied quantity; a correct bare number can be copied. | Guide designs a non-coincidental transfer and an explanation opportunity. Shared standard keeps numerical correctness separate from understanding, and forbids claiming semantic grading of free text from its mere presence. |

This is a reusable package gap, not a failure to follow a Fun Learning testing
document: the old package explicitly allowed the rejected output. Changing only
the SVG, adding an animation dependency, or manually authoring a showcase would
leave that ownership/acceptance gap intact.

## Proposed ownership and flow

1. **Learning Guide** owns the learning brief: concept, assumptions, representation,
   purposeful state transitions, prompts, alternatives, worked keys and transfer.
   It coordinates revisions and returns the final experience, not implementation.
2. **Mathematical Reviewer** first checks the brief, then independently checks
   the built experience against the same standard in a real browser. A plan pass
   is not an experience pass. It reports defects rather than editing the app.
3. **Experience Builder** owns executable frontend source, animation/state logic,
   launch documentation and implementation/browser evidence. It cannot self-approve
   mathematical or learning-experience readiness.

Normal path: Guide → Reviewer (plan) → Guide → Builder → Reviewer (experience)
→ Guide (delivery). Reviewer returns `Revise`/`Blocked` to Guide; Guide routes
content revisions back for plan review or code corrections to Builder. Builder
returns blockers to Guide. One handoff entry per directed pair; no normal
delegation or parent organization is needed. Review requests are themselves
completed file-backed results: retrieve rules before sending once, then stop.

Artifacts remain small and owned: Guide's `experience-brief.md` and final
`result.md`; Builder's `app/`, launch README and `build-report.md`; Reviewer’s
stage/revision-specific reviews; check evidence under `validation/`, cited rather
than recopied. The application holds answers/hints in memory unless recording is
separately agreed; it must not claim durable learner progress from synthetic checks.

Default for a new project: React + Vite, with Motion for state-linked movement;
an existing suitable stack takes precedence. These are implementation defaults,
not a new service dependency or a requirement to use a library where browser
animation suffices. Vite supports a local dev/build workflow ([Vite guide](https://vite.dev/guide/));
Motion supports React animation and reduced-motion adaptation ([animation](https://motion.dev/docs/react-animation),
[reduced motion](https://motion.dev/docs/react-use-reduced-motion)). Browser checks
can use [Playwright](https://playwright.dev/docs/intro). Exact versions belong in
each generated project's lockfile, not this reusable package.

## Preserved behavior and old-to-new map

- Guide intake, language/prerequisite assumptions, privacy, consent, no invented
  learner answers, hint restraint/history, accepted alternative reasoning and
  explicit stop all remain. Primary authoring goes into the brief; interactive
  waiting moves into the app. Explicit chat mode retains the old dialogue path.
- Worked keys, equation/geometry examples, nonzero division, domains, units,
  representation limits and text alternatives remain in the shared standard and
  starter reference. Static SVGs remain **reference components**, not deliverables.
- Reviewer independent derivation, revision/asset identity, Checked/Revise/Blocked,
  no edits to producer artifacts and standalone fallback remain; review gains a
  stage and source fingerprint so the old plan-only pass cannot certify an app.
- The current shared standard remains its single owner; the new Builder receives
  an explicit symlink/attachment. No reference exists merely to repair another link.
- Existing Guide/Reviewer IDs and skills remain; add Builder files. Update the
  cooperation example, README/discovery and config together; remove no old checks.
- The original Fun Learning files and original creation-ticket evidence remain
  unchanged. New runtime artifacts live in a distinct authorized demo directory.

## Analysis checks and decisions

- Observed: old package validator passes, including two-member wiring and four
  arithmetic keys; link checker reports zero broken/unnamed links. This exposes
  the acceptance gap, not an arithmetic failure.
- Isolated server preflight: current tool catalog supplies file/shell, background
  process, image-reading and routing tools. Native browser automation works in
  a test-owned sandboxed Chromium process as an unprivileged user; no existing
  browser/profile was used. Node 22.23.3 and npm 10.9.9 are available.
- Browser/real-run comparison will use the preserved actual old output, not rerun
  the rejected team. The revised team must author the actual new app; Creator
  owns final verification and routes observed defects back rather than replacing
  that run with a hand-written app.
- No material user decision is missing. The user approved roles/stack discretion,
  local demo output and public package changes. Framework/layout choices do not
  require manager design approval. Learner trials and public deployment remain
  unapproved and out of scope.

## Next action

Apply the refactor, validate it, run the three members on a fresh local demo,
inspect the actual browser journey and animation, fix observed defects through
their canonical owners, and deliver on public `main` with a durable local app.
Handoff is recorded in the update result after execution.

## Post-edit preservation and authoring audit

The pre-edit analysis above remains the design record. The full candidate text
was reviewed again, including all three agent/skill bindings, the starter
reference, shared standard, roster, routes and human navigation. No old file was
removed or moved. The two static reference assets are byte-identical to baseline.

`wording-comparison.txt` records the requirement-word comparison. Its four
nearest-sentence warnings were checked in context, not dismissed by counts:

- The old “no website required” output is deliberately superseded by the user's
  frontend request; no AI/image service, backend or special learning hardware is
  required. Text-equivalent access remains in the shared standard.
- “Only necessary” learner records survives in the Guide's explicit-chat path;
  immutable reviewed plans and chronological observations remain separate.
- “Never fill in missing responses” survives as “never fill in absent responses”
  and the primary authoring path explicitly forbids observer role-play.
- The old unviewed-render disclaimer survives in the Reviewer; an experience
  now has the deliberately stronger requirement of actual browser operation.

The other reworded statements retain privacy, optional prior examples,
prerequisite diagnosis through a small task, separate tutor keys, process-only
progress, requested explanation, alternative representations/valid methods,
nonzero division, model limits, revision-specific review, independent/prompted
history and honest trial claims. Appearance/measurement is not proof (shared
standard); ordinary encouragement/clarification needs no new review (Guide).
No requirement was intentionally weakened outside the requested output change.

Applicable anti-pattern checks: outcomes all have containing routes or terminal
fallbacks; no role forbids user-directed collaboration; recipient addresses live
only in config; shared acceptance has one canonical file and three deliberate
attachments; skills contain no project-specific absolute path; no extra link
exists solely to repair another link; every configured tool supports the role's
work. Direct links resolve even when symbolic; the actual run opens those paths.
The brief, implementation evidence, independent verdict and final readiness each
have one owner. The result cites rather than republishes them. No new general
failure mode requires editing the installed Creator skill: existing ownership
and actual-coverage anti-patterns (#24/#27) already cover the old acceptance gap.
