# Requirements Visualization Principles

This reference defines how to make an exploratory requirements visualizer
understandable. It is a design-principles document, not an execution workflow.
The `interactive-requirements-visualizer/SKILL.md` owns activation, inputs,
implementation steps, artifacts, validation, results, and handoff.

## Cognitive Foundations

These principles are grounded in human cognition and cognitive accessibility,
not in one person's philosophy alone. Novel information places a high demand
on limited working memory, especially when it must be learned from multiple
media at once. The visualizer should therefore reserve the user's attention
for the relationship under review and keep unrelated interface detail out of
the first view. See the [cognitive-load implications for multimedia
learning](https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/implications-of-cognitive-load-theory-for-multimedia-learning/F5F9582CB12C6781FA9C61F6B459D7FC).

This is also an accessibility concern. W3C guidance recommends simplified
presentations, hiding nonessential options, and progressive disclosure when
complexity makes it difficult to focus. See [Support
Simplification](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o8p03-complexity/)
and the [Cognitive Accessibility User
Research](https://www.w3.org/TR/coga-user-research/).

Translate those findings into design decisions:

| Cognitive risk | Visualizer response |
| --- | --- |
| Too many unfamiliar elements compete for attention | Show one decision question and a small set of relevant states or objects. |
| Decorative chrome and secondary options distract from the relationship | Remove nonessential panels and use progressive disclosure for detail. |
| The user must remember a prior state or mentally simulate causality | Keep the actors, state labels, action, and visible consequence together. |
| Motion, depth, or sensory differences make animation hard to follow | Make motion pauseable, replayable, and resettable; provide the same meaning through readable non-motion state. |
| Text repeats every visual detail and increases clutter | Use short text to name the model and its boundary; let the visual interaction carry the concrete example. |

### Motion For Understanding

For a requirements visualizer, animation is a temporary diagram in time. It
should help a first-time observer perceive the causal sequence, not merely
make the interface feel alive. Use a **teaching pace**, which is normally
slower than production-interface feedback when the user must learn a new
relationship:

```text
initial state -> initiating action -> visible movement or transition
-> arrival or changed state -> consequence held long enough to inspect
```

Do not use an instantaneous state swap when the departure, path, arrival, or
consequence is the thing the user must understand. Show one causal event at a
time, avoid unrelated background motion, and hold the result before resetting
or starting another event. A simple path taking roughly **1.5–3 seconds** is a
useful starting heuristic for an exploratory visualizer, not a universal law;
increase or decrease it after checking whether a first-time observer can
follow the sequence.

Make the pace controllable. Provide pause, replay, and reset; add step-through,
slow mode, or a speed choice when the sequence is difficult to follow. A
reduced-motion mode must preserve the meaning with stable states and labels,
not merely delete the transition. These controls also follow the accessibility
concern behind [W3C Pause, Stop,
Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) and
[Animation from
Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html).
Apple's [Motion guidance](https://developer.apple.com/design/human-interface-guidelines/motion)
likewise treats motion as purposeful feedback and instruction, not decoration.

#### Motion examples

- **`send_message_to`:** Keep Planner and Reviewer visible. After the user
  activates Send, show the packet at Planner, move it visibly along the route
  over the teaching interval, highlight Reviewer on arrival, and hold the
  received state. Do not replace the scene with an instant “sent” label.
- **`delegate_task`:** Show the parent action first, then the task packet
  leaving, the new worker appearing, the packet arriving, and the new worker's
  active state. The new worker should not already be present, and the entire
  sequence should not happen in one frame.
- **Form validation:** Keep the form stable while Submit is activated, then
  reveal the invalid field with a deliberate transition and hold the error
  state until the user can inspect it. The message should name the rule, but
  the timing and location of the change should demonstrate it.

These are grounding principles, not a license to simplify away meaning. Keep
the decision-relevant state, distinction, and consequence intact; simplify
only the representation and unrelated system surface. The later simplicity,
causality, truthful-simplification, technology, and comprehension sections
turn these foundations into concrete checks.

## 1. Make The Concept Learnable By Doing

Alan Kay's interface work is a useful design anchor: represent an idea as a
concrete, manipulable model so the user can learn through an action and its
visible consequence instead of mentally simulating a hidden system. See his
[User Interface: A Personal View](https://worrydream.com/refs/Kay_1984_-_Computer_Software.pdf)
for the source context. This is inspiration, not a verbatim quotation or a
requirement to copy a historical interface.

Use this four-step pattern:

```text
show one concrete model -> let the user perform one action
-> show the causal consequence -> name the simplified boundary
```

Examples:

- **Orchestration:** show two person icons, let the user send a message, and
  animate the message moving between existing actors. For delegation, show a
  new worker appearing only after the task is delegated.
- **Validation:** show one incomplete form, let the user submit it, and visibly
  highlight the one missing field. Do not start with the complete form system.
- **Permission:** show one document and two actors, let the user switch actor,
  and show approval for one and a concise blocked state for the other.

The model should be concrete enough to teach the relationship, but its labels
must say what is simulated or omitted. Learning by doing does not justify
inventing behavior or hiding a decision-relevant state.

## 2. Start With One Truth To Understand

Every visualizer begins with one explicit decision question:

> After using this visualizer, what should the user be able to explain or
> decide that was difficult to understand from text alone?

Choose one primary journey, comparison, or state transition. If two questions
need different visual metaphors or different journeys, create two focused
visualizers or two progressive review steps rather than one crowded screen.

The visualizer is exploratory evidence. It may simplify implementation and
data, but it must not simplify away a state or distinction that changes the
decision being reviewed.

## 3. Use A Simplicity Budget

Start with this default budget:

- one decision question;
- one main screen or canvas;
- one primary journey or comparison;
- three to five visible objects or states at a time;
- one or two meaningful controls;
- one short explanation of the result;
- optional details hidden behind explicit progressive disclosure.

Treat every extra panel, label, icon, state, animation, and data field as a
cost. Add it only when removing it would prevent the user from answering the
question. Do not add a dashboard shell, navigation rail, analytics, dense
inspector, system ledger, or production-like dataset just because the
technology makes it easy.

### Complexity reduction test

When a visualizer feels difficult, remove elements in this order:

1. unrelated journeys and scenarios;
2. decorative chrome and branding;
3. internal identifiers and implementation terminology;
4. secondary states that do not affect the decision;
5. long explanatory text;
6. only then, interaction detail that is genuinely necessary.

The goal is not to make the product itself simple. The goal is to make the
decision-relevant model simple enough to see.

## 4. Show Causality, Not Decoration

Use direct manipulation and visible transitions to show what causes what:

- an object appears only when it is created;
- a message visibly travels from sender to receiver;
- a state changes after the user performs the relevant action;
- an error or recovery state appears at the point where it matters.

Animation must be purposeful, pauseable, replayable, and resettable. Provide a
readable non-motion path: the same meaning must be available through stable
labels, state changes, and controls. Use 3D only when depth, spatial
relationship, movement, or physical structure is part of the question.

## 5. Example: Communication Versus Delegation

Suppose the user needs to understand the difference between an ordinary
message and a delegated task. Do not begin with the entire team topology,
runtime JSON, task ledger, or every possible failure case.

### `send_message_to`: communicate with an existing execution

Show two existing person icons:

```text
Planner  ── animated message ──>  Reviewer
```

The animation should make the message move between the two existing people.
The short explanation can say: “The receiver already exists; this sends
information or work context to that execution.” The first view needs only the
two actors, the message, and the resulting acknowledged state.

### `delegate_task`: create separately tracked work

Show the parent person and a new worker appearing after the action:

```text
Planner  ── delegate task ──>  New worker instance
```

The new worker should visibly appear only after delegation. The short
explanation can say: “This creates a separate task execution with its own
identity and result lifecycle.” Do not show every child tool or internal
runtime record unless those details are themselves the decision question.

### What the example must not do

- do not show nine scenarios before the user understands the first one;
- do not expose JSON identifiers as the primary explanation;
- do not use a dashboard to explain a two-actor relationship;
- do not animate unrelated nodes or background activity;
- do not imply that a visual metaphor is the complete runtime implementation.

## 6. Example: A State Transition

For a requirement such as “when the user submits an incomplete form, they can
understand what must be corrected,” show only:

```text
form ready -> user submits -> missing field highlighted -> corrected state
```

Use one representative form, one invalid field, and one correction path. Do
not add account settings, navigation, analytics, or every validation rule
unless the requirement specifically concerns them.

## 7. Example: A Permission Decision

For a requirement such as “a reviewer can approve, but an observer cannot,”
show one document and two clearly labeled actors. Let the user switch the
actor, attempt the action, and see either approval or a concise blocked state:

```text
Reviewer  -> Approve -> Approved
Observer  -> Approve -> Not permitted
```

The visualizer should make the permission distinction visible without exposing
the full authorization architecture, policy files, or backend protocol.

## 8. Additional Example Catalog

Use the same `show -> act -> consequence -> boundary` pattern for ordinary
product requirements, not only orchestration concepts.

### Long-running operation

**Question:** Does the user understand that a report is still running and what
they can do while waiting?

**Smallest model:** one `Run report` action, one job card, and the meaningful
`queued -> running -> complete` states. Add `failed -> retry` only if recovery
is part of the requirement.

**Omit:** background logs, worker metrics, queue topology, and unrelated jobs.

### Search and filtering

**Question:** Does changing the filter make the result set understandable?

**Smallest model:** three representative records, one search or filter control,
one changed result, and one empty state if it matters.

**Omit:** pagination, saved searches, administration, analytics, and a full
data-management dashboard.

### Approval decision

**Question:** Who approves the request and what visible result follows?

**Smallest model:** one request, one reviewer actor, one `Approve` or `Reject`
action, and the resulting status.

**Omit:** the entire organization chart, every approval tier, and policy
implementation unless those are the decision under review.

### Retry and recovery

**Question:** Can the user understand how to recover from a failed operation?

**Smallest model:** one action, one concise failure explanation, one `Retry`
control, and the successful or still-blocked result.

**Omit:** telemetry, stack traces, unrelated failure classes, and hidden
technical retries that do not change the user experience.

### Cross-agent handoff

**Question:** Does one specialist's result become usable context for the next
specialist?

**Smallest model:** one producer, one durable artifact envelope, one receiver,
and a visible transition from `result ready` to `received`.

**Omit:** the complete team topology, runtime task engine, every tool call, and
recipient branches that are not part of the question.

### Responsive behavior

**Question:** Can the user understand how the critical interaction survives a
smaller viewport?

**Smallest model:** one primary journey shown at one desktop and one mobile
width, with the critical control and resulting state visible in both.

**Omit:** a full responsive audit of unrelated pages and every device size.

## 9. Truthful Simplification

Simplify representation, not meaning:

- use synthetic data, but preserve decision-relevant labels and values;
- simulate backend work, but show visible loading, success, failure, or
  recovery states when they matter;
- use a simple node or person icon, but do not claim it represents every
  runtime component;
- omit unrelated states, but record the omission and non-goals in the brief;
- keep implementation lightweight, but make the visible interaction real.

Every visualizer should state what is mocked, what is intentionally omitted,
and what conclusion the user may or may not draw from it.

## 10. Technology And Capability Discipline

The template project may provide React, animation, and 3D capabilities so the
agent can move quickly. Capability availability does not determine design:

- use plain layout and CSS transitions when they are sufficient;
- use `motion` when a state or causal transition benefits from controlled
  animation;
- use `three` and React Three Fiber only when spatial reasoning is required;
- do not use 3D, particle effects, sound, or complex camera motion as decoration;
- use the product frontend technology only when the requirement depends on its
  existing UI language or behavior.

## 11. Comprehension Gate

Before handing the visualizer to the user, verify:

1. The decision question is visible or immediately understandable.
2. The primary interaction can be completed without reading a long manual.
3. The user can explain the observed causal relationship afterward.
4. The visualizer does not require the user to learn internal terminology first.
5. Motion can be paused or bypassed without losing meaning.
6. Mock boundaries, non-goals, and unresolved questions are recorded.

If the answer to the third check is no, simplify the visualizer before adding
more explanation or more features.
