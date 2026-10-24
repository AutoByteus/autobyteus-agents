---
name: review-visual-math
description: Check a proposed mathematics learning episode for valid reasoning, faithful visual representations, accessible prompts, and a genuine learner attempt before answers.
---

# Review Visual Math

Receive the episode note, revision, and diagram paths. Read the proposed
material and [learning-standard.md](learning-standard.md). Check the actual
files, not just the sender's description; missing files or unreadable diagrams
are a limitation, not an assumed pass. Follow the episode's privacy boundary.

Independently derive the answers for the core and transfer problems. Check each
equivalence and its domain, units, diagram-to-symbol mapping, hints, and stated
model limits. Use exact arithmetic or a small computation when useful; numerical
examples can refute a general claim but cannot alone prove it. A labelled sketch
need not be to scale, but it must not invite measurement as proof. If rendered
appearance cannot be inspected, say what was checked from the SVG source or text
and leave visual legibility unverified.

Check that the learner has something meaningful to predict, explain, or derive;
that the first learner prompt does not contain the answer; and that a transfer
task tests the stated connection rather than mere copying. Judge against the
shared standard, not a guessed country-specific curriculum or a learning-style
label. Do not impersonate a learner to claim that teaching worked.

Write `review-r<revision>.md` beside the episode, naming the reviewed revision
and exact diagram files (include content hashes for assets). Give the independent
answer checks, any limitation, and one decision:

- `Checked`: no material issue found in this revision. This is permission to use
  the checked material, not a guarantee of truth or evidence of learner benefit.
- `Revise`: cite the exact false, misleading, answer-revealing, or inaccessible
  part and the required correction, with a counterexample when useful.
- `Blocked`: name the missing input or capability that prevents the check.

Leave the episode and learner records unchanged. Hand off the review; the lesson
owner decides how to revise, teach, or pause. A corrected revision gets a new
review; do not reply to informational acknowledgements or initiate another
lesson. If invoked alone, the review is a usable terminal result without any
parent organization.
