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

### Acceptance observations

Runtime instructions and shared standard correspond to package commit
`3024e1e6a1e8e5b2f8464afd0617da33b9e37b31`; its later human-facing activation note
names the tested configuration. No runtime instruction changed during acceptance.
The [package manifest](evidence/package-manifest.json) pins the delivered files.

| Probe | Observed behavior | Evidence |
| --- | --- | --- |
| Import/tool wiring | Team loaded with zero load issues; all configured tools resolved. | [Runtime load](evidence/runtime-load.json), [environment](evidence/runtime-environment.json) |
| Skills actually used | Both members read their attached skills and shared standard. | [Read calls](evidence/acceptance-skill-reads.json) |
| Equation opening | Guide persisted a plan, retrieved rules, sent one request; Reviewer persisted `Checked`, retrieved rules, returned once; Guide presented only the opening and waited. | [Messages](evidence/acceptance-messages.jsonl), [observable trace](evidence/acceptance-observations.json) |
| Incorrect division | Synthetic `x+6=6` elicited a question about sharing six counters, not the solution. Review was reused, with no extra reviewer handoff. | Same trace; [equation note](evidence/acceptance-sessions/synthetic-equal-groups/episode.md) |
| Help attribution and transfer | Corrected answer remained **prompted** for the original problem; the new transfer response was distinguished as unassisted synthetic work. The Guide stopped on request and made no human-learning claim. | Equation note and trace |
| Geometry connection | Fresh reviewed episode mapped full/split rectangle areas, gave a text diagram and verbal description, and waited. Synthetic explanation connected `3(x+2)` to `3x+6`; Guide accepted the justification and respected an explicit stop without forcing another question. | [Area note](evidence/acceptance-sessions/synthetic-split-rectangle/episode.md), [area review](evidence/acceptance-sessions/synthetic-split-rectangle/review-r1.md), trace |

The acceptance team exchanged four internal messages for two episodes, with no
unsolicited follow-up loop. Both members retrieved handoff rules before each
send. The archived notes are chronological snapshots: early “pending” state is
superseded by the appended reviewed/conversation state, not a claim of a pending
final review. Only trailing Markdown whitespace is normalized in archived notes.
Raw model reasoning and runtime credentials are not included.

### Targeted reviewer probes

A standalone copy of the same final Reviewer skill, run
`mathematical_reviewer_9d50ad6f77de4a799ff7c60171a0e0d7` on `gpt-6.1-sol`, was given
an independently prepared area episode without an expected verdict in the
request. It returned `Revise`, identified the false `3(x+2)=3x+2`, recomputed
`x=5`, and showed that the proposed `19/3` gives original area 25 rather than 21.
It left the proposed episode unchanged and did not invent a parent handoff.
See [faulty proposal](evidence/reviewer-probes/bad-area/episode.md) and
[Revise review](evidence/reviewer-probes/bad-area/review-r1.md).
A second request named a nonexistent episode in an existing writable folder.
The Reviewer returned [Blocked](evidence/reviewer-probes/missing-input/review-r1.md),
named the missing file, and invented neither a lesson nor a pass. The standalone
[observable trace](evidence/reviewer-probes/observations.json) shows terminal
returns with no external agent contacted.

### Coverage limits and final review

Observed final behavior covers initial review, checked openings, learner wait,
hint reuse, cumulative help attribution, synthetic near transfer, a new area
review, learner-requested stopping, invalid-math detection, and missing-input
handling. Earlier pilots also exercised review/revision return paths. The final
team did not need rework, so a final-team `Revise` return loop is not separately
claimed; the final standalone reviewer exercised `Revise` and `Blocked`.
Unexercised: repeated-failure stop limit, a stale review/changed-asset attack,
multilingual use, assistive technology, runtimes/models beyond those recorded, public-workspace
privacy refusal, real learner consent, delayed retention, and human outcomes.

The final author review found no remaining package-structure, mathematics,
link, ownership, or tool-wiring defect. It checked the smallest request, normal
and exceptional outcomes, one route per pair, shared standards, no recipients
hard-coded in skills, user-directed collaboration, and one owner per record.
The startup status leak and per-turn hint-attribution defect were corrected
before acceptance; the remaining model-dependent duplicate-message risk is
explicit in activation guidance. No new general authoring anti-pattern was
needed; existing routing/ownership and observed-behavior checks identified the
issues without modifying the protected `.codex/skills/` installation.

All test runs and their isolated server were stopped. The test port closed and
temporary runtime/workspace/config/credential-link/rendering directories were
removed. See [cleanup receipt](evidence/cleanup.json). Earlier synthetic notes
remain only in the deliberately archived evidence. Six unrelated working-tree
paths changed while this task ran; they were outside the isolated worktree and
outside every commit here. They were not reverted or copied into this package.
The post-merge PR receipt verifies the local checkout and final Git cleanup.

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
