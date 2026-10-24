# Validation — animated mathematics team

Date: 2026-10-24. All observations below are package/engineering checks or
**synthetic rehearsals**, not human learning outcomes. Private demonstration
content and raw run records remain in Fun Learning, not this public repository.

## Static and loaded-package checks

- `python3 tickets/in-progress/refactor-animated-math-team/validate.py`: passes
  three-member wiring, coordinator, five unique rooted route pairs, frontmatter,
  explicit skill attachment, symbolic links, four retained exact math keys,
  divide-first alternative, model boundary, three false-claim counterexamples,
  1,331 distributive samples (not proof), and both reference SVG structures.
- Standard `skill-creator/scripts/quick_validate.py`: all three skills pass.
- Creator `scripts/check-links.py agent-teams/middle-school-mathematics-team`:
  zero broken links, zero unnamed links. `git diff --check`: passes.
- `runtime-load.json`: isolated app import resolves all three definitions and
  their configured tools; no load issues. No external agent-package dependency.
- `package-manifest.json`: 16 regular-file hashes and three symbolic-link targets
  match the exact package loaded for the accepted run. No runtime instructions
  changed afterward. `wording-comparison.txt` plus the analysis's preservation
  audit cover reworded requirements and deliberately strengthened output gates.

## Actual model/runtime behavior

AutoByteus server 0.1.1; Node 22.23.3; all members selected
`codex_app_server` / `gpt-6.1-sol`. Run:
`middle_school_mathematics_team_a646ccdf51b7459d92a6651bfdf5d21d`.

The Guide authored a complete brief, received an independently Checked plan,
requested implementation, then verified the experience-stage review and source
fingerprint before delivery. Builder authored the runnable app, tests, lockfile
and launch instructions. Reviewer wrote and ran a separate interactive browser
probe in addition to rerunning the maintained harness. Seven team messages,
zero delegations, no observed duplicate handoff/polling loop. The final app did
not require the observer to answer a lesson to finish authoring.

One **Creator-detected implementation correction** was needed: the initial
Playwright launcher omitted `chromiumSandbox:true` (the installed API defaults
to false). Guide routed the defect, Builder fixed its own harness, and both
Builder and Reviewer repeated their browser observations with the sandbox
explicitly enabled under a test-owned unprivileged HOME. Earlier sandbox claims
are explicitly invalid/superseded, not reused as acceptance evidence. Creator
also ran a separate explicit-sandbox browser check. This was a supervised real
team run, not a claim of flawless autonomous behavior. No app code was authored
or fixed by Creator. An earlier stopped import preflight is not acceptance data.

## Demonstrated frontend behavior

Private root:
`/home/autobyteus/workspace/fun-learning/math-experiences/2026-10-24-orbit-area-lab/`.

The team chose native JavaScript/HTML/CSS with inspectable animation and a local
Node server rather than adding React/Motion for this bounded interaction. This
is an allowed small-stack choice, not a static SVG fallback: five stages per
problem, learner-controlled state, linked equations, feedback, separate numeric
and reasoning checks, optional ungraded reflection and a fresh transfer. SVG is
an animated scene component. No runtime package downloads, AI service, backend
account, remote content or telemetry are needed after source setup.

| Check | Actual observation |
| --- | --- |
| Install/test/build | `npm ci`, one exact model test over both problems, static production build pass. No third-party runtime dependency. |
| Mathematics | Reviewer independently derived both keys/alternatives and substitutions; units, positive domain, nonzero height, common-height distribution and model limits checked. |
| Purposeful motion | Creator observed split transform 0 → 13 → 65 SVG units; intact strip remained 100×145. Removal 0 → −7 → −35 with unchanged dimensions, tracked ghost and explicitly labelled endpoint equations. These are real browser/DOM observations, not screenshot-only inference. |
| Reasoning | Wrong expressions/operations/widths receive differentiated feedback; a correct number with wrong reason cannot advance; original-relation and coverage checks required unless requested worked help. |
| Help/transfer | Prompted history survives replay; fresh transfer starts separately. Worked explanation on request; open reflection is never semantically graded. |
| Recovery/access | Actual replay/rejoin, repeated clicks, reset during active motion, slider interruption, keyboard radio/Tab/Enter and range controls, 375px full journey, reduced-motion split/removal operated. No horizontal overflow in tested states. |
| Runtime/privacy | No browser errors or external content requests observed; no persistent web storage; tutor-file requests return 404. |
| Visual inspection | Creator and Reviewer opened screenshots after operating the app; dominant labelled geometry, readable hierarchy and reachable mobile vertical flow inspected. Screenshots supplement, not replace, interaction checks. |

Exact identities:
- Local demo commit: `4fbd4fff5a98c2c68be8c21efa7eaf50634c7fae` (main, no remote).
- Ordered runtime manifest SHA256:
  `2be38523d371b0edad8cd41bf56b6975320c465ae660507ec45214094c2d3b3c`.
- Delivered manifest including corrected browser harness SHA256:
  `321840027e34265a8c729588ffd70be97d588a59eb62b9470548e7668c025a2e`.

Private evidence owners: `result.md`; `build-report.md`;
`reviews/review-experience-r1-32184002.md`; `validation/sandbox-correction/`;
`validation/reviewer-r1-32184002/`; `validation/creator/`;
`validation/team-run/` (actual request, execution tree, seven messages,
observable tool-backed records without internal reasoning, source manifest,
termination result). These remain local; no private package was copied here.

## Baseline comparison, limits and cleanup

Original `fun-learning/math-sessions/2026-10-24-moon-base-cargo/` remains unchanged:
all nine original file hashes match; the existing task-plan file also matches.
It was a checked static opening, not an accepted experience. The new output
adds observable executable states, meaningful moving geometry, learner choices,
feedback, complete journey and transfer. That demonstrates package capability,
**not greater engagement, understanding or retention**.

One bounded concept family and one model/runtime combination were exercised.
No actual learner, delayed transfer, screen reader, full keyboard-only journey,
physical touch device or cross-browser certification. Native motion is modest;
mobile geometry labels are compact (larger text equivalents are present).
Removal uses a tracked ghost plus symbolic endpoint relations, not a second
animated balance. A premature-Next message may persist until the next interaction;
this is a feedback-polish opportunity, not state corruption. Test harnesses had
recoverable cwd/lifecycle assumptions documented in their private evidence.

The final team run and isolated server stopped successfully. No process with the
isolated runtime/browser HOME remained; no app server remained. The initial
preflight was also terminated. No production activation, hosting, real recording
or existing browser attachment occurred. Temporary mounts/profiles were removed;
source/evidence and foreground reopen instructions remain. Public-repository
integration/preservation evidence is recorded in the delivery PR receipt.
