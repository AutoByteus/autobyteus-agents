# Middle School Mathematics Team — Experiment Record

Date: 2026-10-24. All learner replies used during package testing are synthetic.
No human learner trial, prior personal material, or private teaching package was
used. This record concerns a first package, not an established teaching method.

## Design hypotheses and scope

Two roles are the smallest useful separation for this experiment: one owns the
learning conversation and adaptation, the other owns an independent mathematical
check. A single agent would be smaller but would not test that separation; a
visual specialist or simulated learner adds no necessary first-version boundary.
The learner remains a person and the guide is the sole teaching voice.

The initial audience knows basic whole-number operations but may be new to
variables and distribution. This is an assumption to probe, not an assigned
grade/country/curriculum. English examples follow the request's language; the
runtime guide follows the learner's language. Exact text sketches and SVG were
chosen over generated pictures because labels and mathematical structure can be
inspected without an external image service.

Hypotheses to investigate, not established findings:

1. Equal groups may help a learner justify doing the same operation to both sides.
2. Splitting a rectangle may help connect a product over a sum to two areas.
3. Separating teaching from checking may catch invalid transformations before
   presentation while avoiding a review loop on every learner turn.

## Reproducible package checks

Run `python3 tickets/in-progress/create-middle-school-mathematics-team/validate.py`
from the repository. It requires Python 3 and PyYAML. It checks package structure,
four exact example keys, an alternative valid solution order, signed-model limits,
three faulty-claim counterexamples, 1,331 arithmetic samples of distribution, and
SVG structure. Samples are not a general mathematical proof.

The creation skill's link checker and the standard skill validator are run
separately; the command log records observed results. Mathematical prose and
ownership/routing are also read manually. Live inference is a distinct evidence
layer, not simulated by the Python checker.

## Live scenarios

The isolated AutoByteus server uses its own database, memory, home, port, and
throwaway workspace. It imports the package text under test and uses the
`codex_app_server` runtime. No test is sent to the user's running application,
and no outside-team collaborator or real learner is contacted.

### Pilot and instruction refinement

Pilot run `middle_school_mathematics_team_e5e15fbc392d43579e6657adab6f9c44`
used `gpt-5.6-luna` for both members. The Reviewer rejected the generated hint
that said the six counters “must first be removed”: division first is valid.
The Guide corrected the episode and obtained `Checked` on revision 2. This
was useful review behavior, not a learner outcome.

The Guide nevertheless exposed `3x = 12` and `x + 2 = 6` in a progress reply
while review was pending. That is a failed answer-restraint check. The Guide
skill was refined to require process-only progress replies and a checked
opening as the first mathematical reply. No roles or stages were added.
See [pilot messages](evidence/pilot-messages.jsonl) and
[pilot observations](evidence/pilot-observations.json); model reasoning traces
are excluded from persisted evidence.

### Second pilot: answer restraint and help history

A fresh workspace and run
`middle_school_mathematics_team_88480071840c48018f1b97ee9fc49db4` used the revised
package and the same two model/runtime selections. The Guide and Reviewer
opened their attached skills and shared standard. A reviewer-requested vocabulary
correction produced a revised episode; both review progress replies were
process-only. The checked opening asked for a mapping and prediction and then
waited, without revealing the solution. A synthetic incorrect divide-first
response got a focused question about sharing the six counters, not the answer;
no new review was requested for that already-checked hint.

The corrected response was then labelled “Independent success” in the note,
even though it followed a hint on that same problem. This failed the evidence
attribution check. See [second-pilot episode](evidence/second-pilot-episode.md).
The shared standard now explicitly carries hint history forward for the same
problem and distinguishes a new unassisted transfer problem. No synthetic
response is evidence of a person's learning.

### Model-dependent routing probe

Run `middle_school_mathematics_team_16e32c9a819c4fc4a6878e2986991f96` used the
final package text with `gpt-5.6-luna`. The Guide sent three review requests,
including an unsolicited follow-up, before stopping. This did not follow the
shell's retrieve-rules/send/stop contract. The run was terminated, not counted
as a workflow pass. See [routing-pilot messages](evidence/routing-pilot-messages.jsonl).
The written contract already requires stopping; rather than adding more
procedural machinery for this one model, the next check uses another available
model on unchanged text. One run is not a general model ranking.

### Final-text acceptance run

Run `middle_school_mathematics_team_cfa4ca6473c544d188f1849729f9740a` uses a new
workspace, the unchanged final package, and `gpt-6.1-sol` for both members on
`codex_app_server`. It imports the actual package through the isolated app's
GraphQL API and exercises real team tool calls. This is server/runtime evidence,
not an Electron UI journey or activation in the user's app. Results below are
judged from messages and files, not inferred from the earlier pilots.

## Real learner trial proposal — not executed

Invite a willing learner and agree the recording scope first. Use one of the
episodes, not a whole course. Ask for an explanation before help, record the
minimum necessary reasoning and hints privately, then offer the new transfer
problem without hints. If they agree, return later to a new problem to probe
retention. Do not report a one-person before/after difference as a causal gain.

Questions for iteration: Did the learner map each visual feature to a symbol?
Could they explain equality or distribution rather than only get the answer?
Which hint unlocked a step, and which gave too much away? Did text or a diagram
work better for this task? Did review delay disrupt the conversation? What do
the user's earlier experiments suggest once voluntarily supplied?

## Static visual inspection

Both authored SVGs were rendered with CairoSVG in a temporary environment and
inspected at their native sizes (780×230 and 680×320). Labels were readable,
six counters were visible, the rectangle parts shared a height without overlap,
and neither image revealed the unknown answer. Text alternatives are provided.
This is source-and-render inspection, not testing on learner devices or assistive
technology. The initial missing Rsvg Python binding was a rendering-environment
issue; using the isolated CairoSVG environment resolved it without changing the
package or installing dependencies into the user's repositories.
