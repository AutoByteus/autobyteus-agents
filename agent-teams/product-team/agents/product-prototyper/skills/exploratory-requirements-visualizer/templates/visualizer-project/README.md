# Exploratory Requirements Visualizer Project Template

This is a deliberately small React/Vite/TypeScript starter for one focused,
product-independent requirements visualizer. Before replacing the example,
read the source skill's
`references/visualization-principles.md`. It includes optional capability
packages for:

- `motion`: purposeful transitions and state animation;
- `three`, `@react-three/fiber`, and `@react-three/drei`: spatial or 3D
  explanations when spatial relationships are part of the decision.

The presence of a package does not mean the visualizer should use it. Start
with the simplest representation that answers the decision question. The
starter example demonstrates two existing people communicating versus one
person creating a new delegated worker instance. It uses a finite,
user-triggered sequence with visible departure, travel, arrival, consequence
dwell, pause, replay, slow, skip, reset, and reduced-motion behavior. Replace
the example model and copy only the relevant interaction pattern into the
ticket-scoped project; do not retain controls or motion that the new question
does not need.

This scaffold is not a replacement for an existing product route, component,
or visual surface. If the requirement changes an existing product experience,
use the `product-experience-prototyper` skill and evolve its accepted baseline
instead.

## Use

1. Copy this directory into the active Product ticket worktree, normally under
   `visualizers/<ticket-id>/`. The repository-management skill establishes that
   worktree before this template is used.
2. Replace the example question, model, labels, and states with the focused
   requirements question.
3. Rework the design plan before changing the visual model or motion. Keep
   decision-relevant animation finite, teaching-paced, and understandable
   without motion.
4. Remove unused imports and keep the visible experience within the
   visualizer's simplicity budget.
5. Run `npm install`, `npm run dev`, and `npm run build`.

Do not add production APIs, authentication, persistence, customer data, or
production source paths to this temporary project.
