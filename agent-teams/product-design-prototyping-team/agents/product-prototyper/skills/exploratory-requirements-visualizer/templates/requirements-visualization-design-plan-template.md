# Requirements Visualization Design Plan

Use this short plan before creating or substantially revising frontend code.
It records how the concept will be demonstrated, not a final UI/UX
specification or requirements approval. The brief owns why and scope; repeat
only the concise decision anchor here and focus on how it will be demonstrated.

- Package / ticket ID:
- Revision:
- Decision question:
- One-sentence user takeaway:
- Chosen visual form: state transition / actor relationship / comparison / spatial model / Other
- Why this is the smallest suitable representation:
- Alternatives considered and rejected:
- Implementation technology selected after the design gate:

## Visible Model

- Initial view:
- Actors or objects to show:
- States to show:
- Relationship or causal distinction:
- Details intentionally hidden or deferred:

## Motion Design

- Motion purpose, or why motion is not needed:
- Motion phases and order:
- Teaching pace and consequence dwell:
- Pause, replay, reset, step-through, slow, or skip controls:
- Reduced-motion and stable-state equivalent:
- Which changes must not happen instantaneously:

## Interaction Storyboard

1. **Show:**
2. **User action:**
3. **Visible consequence:**
4. **Simplified boundary:**

## Cognitive Foundation Check

- How does the first view avoid unnecessary cognitive load?
- What is the simplicity budget for this visualizer?
- What is progressively disclosed, and when?
- What text is necessary to name the model without repeating it?
- How can the user pause, replay, reset, or understand the result without
  motion?
- Can a first-time observer follow the full motion sequence at the chosen
  teaching pace?
- What will demonstrate that the user understood the intended relationship?

## Truthful Boundaries

- Mocked data or behavior:
- Intentionally omitted behavior:
- Why the omissions are safe for this question:
- What the visualizer must not imply about the product:

## Design Gate

- [ ] The first view presents one decision question and one focused journey.
- [ ] The visible model fits the simplicity budget and excludes unnecessary
      dashboard, navigation, identifier, and implementation surface.
- [ ] The user can identify the action and consequence without a long
      explanation or hidden prior state.
- [ ] Secondary detail is deferred behind intentional progressive disclosure.
- [ ] Decision-relevant motion is slow enough to follow, holds the consequence,
      and avoids unrelated simultaneous movement.
- [ ] The same decision-relevant meaning is available without motion or 3D.
- Status: Ready to Build / Rework Needed
- Remaining design concern:
- Evidence for the decision:
