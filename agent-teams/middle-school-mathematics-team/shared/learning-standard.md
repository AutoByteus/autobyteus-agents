# Mathematics Learning Experience Standard

The target is a connection the learner can explain, not an AI-produced answer.
For experience creation, that connection must be usable in a complete runnable
frontend, not just described in tutor notes or shown as a static opening.
These are design hypotheses to test, not claims of proven learning gains or
fixed visual versus verbal learning styles.

## Mathematical and representational correctness

- Define each symbol, quantity, and unit. State the domain when it affects the
  model or a manipulation. Check a proposed solution in the original relation.
- Map visual features to mathematical objects explicitly: an equal group to an
  unknown quantity, a length to a factor, a tiled area to a product. Say what
  stays invariant when the picture or equation changes.
- Give a reason for each consequential deduction, not just a row of answers.
  Doing the same valid operation to both sides preserves equality; division
  requires a nonzero divisor. Distribution accounts for every subregion.
- Distinguish area from perimeter and lengths from areas. Label schematic
  diagrams as not to scale; appearance or measurement is not a proof.
- State where a model stops working: ordinary lengths and counts are nonnegative;
  negative quantities need a number line, signed counters, or a symbolic argument.
  An area illustration with positive lengths does not alone prove an identity
  for all real numbers. Do not force every algebraic idea into a geometric model.

## Learner participation and access

The learner-facing opening contains a diagram or equivalent verbal model and
a question, not the worked answer. The episode connects a prediction to a
justified step and a new transfer attempt. Keep the worked key and future hints
in tutor material; reveal help according to the learner's response or request.
Do not script the person's answers or advance while awaiting one.

Provide a text description sufficient to reason without seeing the diagram;
labels, not color alone, convey meaning. Use familiar words before terminology,
and offer a verbal or symbolic route when the visual route is not helpful.
Check prerequisites through the task, not assumptions about age or diagnosis.

## Executable experience and purposeful motion

A created experience provides a coherent journey: an approachable challenge,
a prediction/choice, a mathematical transformation the learner can inspect,
linked symbolic reasoning and feedback, an explanation opportunity, and a fresh
transfer attempt. An explicit chat-only request is exempt from frontend output,
not from mathematical correctness or learner agency. In authoring, build the
whole journey; do not wait for the observer to play a learner. During use, do
not auto-advance unanswered prompts or invent responses.

Motion must carry meaning: grouping/sharing quantities, preserving equality,
splitting/recombining area, or another stated mathematical relation. The learner
should be able to say what changed and what did not. Animate the mathematical
objects, not only headings, decorative stars or the fade between two worksheets.
Before, intermediate and settled states must agree with their equations and
labels. If an invalid move is illustrated, identify it as a counterexample;
never present temporarily unequal quantities as a valid equality.

Keep the main visual prominent and legible, with short instructions and clear
controls. Support replay/reset and a way to inspect a transformation without
racing it; longer sequences need pause/step controls. Reset must recover coherent
state, and repeated activation must not skip reasoning or corrupt totals.
Respect reduced-motion preferences with immediate/stepped equivalent states,
not loss of the mathematical explanation. Text, labels and keyboard controls
must carry meaning without reliance on color, dragging, hover or animation alone.
Check a narrow screen as well as desktop; do not hide essential feedback below
an inaccessible/clipped region.

Feedback should distinguish an incorrect quantity from a faulty justification.
A number-only success or clicking Next through a reveal is not sufficient as the
entire learning interaction. Offer structured reason choices with meaningful
distractors when objectively checking reasoning; open written reflection may be
ungraded. Do not certify free-text reasoning from nonempty input/keywords. Allow
requested hints or a worked explanation without forcing a quiz, and mark the
same problem as prompted thereafter. Choose a transfer with changed conditions
and a solution not simply copied from a given value; state what it tests and
what it cannot establish.

Default app state is local and ephemeral, with no telemetry, remote submission
or personal persistence. Synthetic demonstrations and browser test inputs must be labelled; they are
tests, not learner records. Do not impersonate a learner to claim teaching worked.
Tutor files must stay outside the served app. Answers in a client bundle are not
securely hidden; this is an exploratory learning tool, not a secure assessment.

## Frontend acceptance evidence

A plan review and a production build are necessary but not sufficient to pass
an experience. Operate the actual local app and record actions and observations:
initial answer restraint; a wrong attempt and its feedback; a hint/explanation;
the core motion before/during/after; equation/visual agreement; a reasoning path;
transfer; replay/reset/repeated-click recovery; keyboard; narrow viewport; and
reduced motion. Inspect rendered hierarchy and legibility as well as state.
Use DOM/geometry/state/console evidence and screenshots or recordings together;
a screenshot or the presence of an animation dependency alone proves no behavior.
Report every unexercised check rather than marking it passed. Missing interactive
browser evidence blocks an experience-stage Checked verdict.

Tie review to the brief revision and a fingerprint of the delivered runtime
source/configuration/lockfile. Changed mathematics needs a new plan review;
changed implementation needs an impact-based repeat of browser/mathematical
checks on that source. Keep source, install/launch/reopen instructions and tests
usable without the author's live server. Stop test-owned processes and preserve
user work. Browser usability checks remain distinct from actual learner benefit.

## Evidence for iteration

Distinguish the following when recording or reporting results:

- **Package check:** files, mathematical examples, or observed agent behavior.
- **Synthetic rehearsal:** fabricated responses or injected faults; useful for
  debugging the team, never evidence about human learning.
- **Learner observation:** an actual willing participant's response, with help
  received recorded. A prompted answer is not an unassisted success.

Record what the learner explained, not just whether a number matched. Carry
help forward for the same problem: a correct response after a hint is still
prompted, even when that particular turn received no new hint. A fresh transfer
problem can be unassisted; do not reset the original problem's help history. A later
unassisted problem can probe transfer; a delayed check can probe retention.
Neither is presumed completed. Do not infer causation, broad improvement, or
mastery from one episode. Keep personal learning records out of the public
package and agree any real trial and recording scope with the participant.
