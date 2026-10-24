---
name: review-visual-math
description: Independently review a mathematics plan, an implemented animated learning frontend, or explicit chat material, with stage-specific correctness and observed interaction checks.
---

# Review Visual Math

Read the actual proposed material and
[learning-standard.md](learning-standard.md). Receive a review stage (`plan`,
`experience`, or explicit `chat`), revision, artifact paths and, for an experience,
the build report. Missing files are a blocker, not an assumed pass. Follow the
workspace privacy boundary; do not edit the brief, app or learner records.

## Plan or chat review

Independently derive core and transfer answers. Check each consequential
transformation, equivalence/domain, units, diagram-to-symbol mapping, hints and
model limits. Use exact arithmetic or a small computation when useful; numerical examples
can refute a universal claim but cannot alone prove it. A schematic illustration must not invite measurement as proof. Do not force
negative quantities into ordinary lengths/counts or assume a curriculum.

Check the learner has a meaningful prediction, choice or explanation before
answers, adequate text alternatives, accepted valid alternatives and a fresh
transfer opportunity. Challenge coincidental answers that can be copied from
given quantities. For an experience plan, check that its proposed state changes
and animation explain mathematics and support the complete journey; a static
opening plus vague promises of motion is not implementation-ready.

## Experience review — operate the real app

Read the checked brief and build report, inspect the source fingerprint and
independently derive the mathematics again where implementation changes it.
Start the documented local app with a test-owned server/browser, or use a
verified managed preview provided for this review. Use browser automation through
shell tools to open and operate the actual page; do not infer usability from
build output, source code, a screenshot or the Builder's assertion alone.

Check the core visual transformation before, during and after motion, including
what objects/regions move, what quantity they represent, and when equations and
explanations change. Verify the mathematical invariant or explicitly labelled
counterexample throughout. Trace a wrong attempt, requested hint/explanation,
correct reasoning, reset/replay and a fresh transfer. Inspect keyboard use,
narrow layout, reduced motion and actual feedback with the shared standard.
A correct answer accepted without the intended reasoning opportunity is a defect;
no browser check demonstrates human understanding. If rendered appearance cannot
be viewed with image tooling, disclose that limitation; if the actual interactive
path cannot be operated, do not return an experience-stage Checked verdict.

Reuse valid build evidence for unchanged mechanical checks; own the independent
mathematical and rendered-interaction observations. Record focused evidence under
`validation/`, name the actions and observed states, and distinguish untested
branches. Stop any server/browser you started and record cleanup. Do not contact
real learners, add telemetry, publish, or keep a hidden preview running.

## Decision and result

Write `review-plan-r<revision>.md` or `review-chat-r<revision>.md` for those stages.
Use `review-experience-r<revision>-<short-source-hash>.md` for an experience; a
changed source fingerprint needs a new report, not overwriting an earlier verdict.
Record exact reviewed paths, revision and source/asset hashes, independent answer
checks, observed browser evidence when required, limitations and one decision:

- `Checked`: no material issue found for this **stage and revision**. A checked
  plan permits implementation, not delivery; only a checked experience supports
  frontend readiness. Neither proves truth or learner benefit.
- `Revise`: cite the false, misleading, broken, inaccessible, answer-revealing or
  missing experience behavior and the required correction, with a counterexample
  or reproduction steps. Mark whether the brief or implementation owns the fix.
- `Blocked`: name missing input/capability and the smallest next action. Unrun
  browser behavior is not a pass and an earlier snapshot cannot certify changed code.

Hand off the review; its recipient owns revision/delivery decisions. Do not
initiate another lesson or reply to informational acknowledgements. When invoked
alone, return the review as a terminal result without inventing a parent route.
