---
name: build-animated-math-experience
description: Turn a checked mathematics learning brief into a runnable local frontend with meaningful animation, learner-controlled state and observed browser evidence; not a static illustration or hosted platform.
---

# Build Animated Math Experience

Receive the learning brief, its current plan-stage Checked review, approved
output folder and any correction request. Read
[learning-standard.md](learning-standard.md). Own the app and implementation
checks; preserve the brief and let its owner decide changes to mathematical intent.

## Build the actual learning interaction

Use an existing suitable project stack when present. For a new small project,
React + Vite with Motion is a reasonable default; native browser animation or
another suitable stack is acceptable when it better fits the interaction.
Check current official docs when using unfamiliar APIs, resolve compatible
versions and commit the dependency choices to a lockfile. Do not require an AI
API, account, backend, image service or external content/CDN for ordinary use.

Create a self-contained `app/` with editable source, package scripts, lockfile,
focused tests and a README with install, test, build, local launch/open and stop
instructions. Do not deploy it or modify unrelated workspace material. Keep
tutor notes/reviews outside the served frontend; the client bundle is not secure
answer hiding, so make no assessment-security claim.

Implement the whole journey, not just the first screen: prediction/choice,
mathematically meaningful manipulation and motion, linked symbolic reasoning,
feedback/help, reflection and a fresh transfer opportunity. Give the main visual
space and hierarchy appropriate to learning; avoid a tiny animated sticker beside
a wall of instructions. SVG may be an interactive scene component, not the whole
product. Track mathematical state explicitly so visuals, equations and feedback
cannot diverge. Keep input, transition-in-progress and settled states coherent;
repeated clicks and reset/replay must not corrupt or prematurely advance them.

Apply the shared standard's meaning, access, learner-agency and privacy bar.
Do not grade arbitrary written reasoning as correct merely because it is nonempty
or contains keywords. Use checkable structured choices with explanations where
useful, and label open reflection as ungraded. Preserve help history for the same
problem; a new transfer attempt has its own history. No telemetry, remote learner
submission or persistent personal records are needed for this first product.

## Operate, check, and hand off

Run focused mathematical/state tests and the production build. Launch a test-owned
localhost server on a verified free port, open the app in an isolated browser
with browser automation, and actually use it. Inspect initial, intermediate and
settled animation states, not just screenshots of the end. Check the real paths
in the shared standard, including a wrong attempt, assistance, replay/reset,
transfer, keyboard, a narrow viewport and reduced motion. Observe console errors,
visible feedback and DOM/geometry/state evidence. Read screenshots for visual
quality where image tooling is available; screenshots alone cannot pass behavior.

Record reproducible commands, dependency/browser versions, source fingerprint,
observations and limitations under `validation/`. Keep runnable browser checks
with the project so they can be repeated. Make the source fingerprint cover
runtime source, configuration and lockfile, excluding generated output, logs and
mutable learner records. Identify each preview process you start; stop your own
server/browser in a finally/cleanup path, never kill unrelated processes or use
the user's browser profile. Leave durable source/evidence and a reopen command,
not an orphan server or an unexplained local URL.

Write `build-report.md` with the brief revision and checked plan path, app path,
fingerprint, commands/evidence paths, deviations, cleanup and next action.
Classify `Experience review requested` only when the app is runnable and the
observed implementation checks pass. A build, an imported animation library or
a screenshot is not proof of purposeful animation or learning readiness.

Fix implementation defects within the checked design and rerun affected checks.
If mathematics must change, or safe browser/build capability cannot be obtained,
report `Design impact` or `Blocked` with concrete evidence. Do not claim unrun
checks or replace the required frontend with a static artifact. Hand off the
report and only the files the next owner needs; normal review uses configured
routing, not a new delegated copy. Do not approve your own learning experience.
