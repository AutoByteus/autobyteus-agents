# Product Prototype Principles

This is the canonical shared reference for product-prototype work in the
Requirements Engineering Team. Read it before creating, bootstrapping,
evolving, or reviewing a runnable prototype.

Role-specific workflow belongs in each agent's `SKILL.md`; this document holds
only the principles that must remain consistent across prototype roles.

## 1. Purpose And Boundary

- A product prototype is an evidence and approval instrument for product
  behavior, UI, interaction, state, navigation, visual hierarchy, and journey
  decisions.
- It is not production implementation, production architecture, or proof of
  production readiness.
- Keep production requirements canonical in `requirements-doc.md` and keep the
  prototype-owned UI/UX supplement canonical in `ui-ux-spec.md`.
- Never use prototype convenience as proof of a product requirement without
  recording the decision and its evidence.

## 2. Prototype Modes

Use one explicit mode for each prototype workspace:

- **Existing frontend bootstrap:** create the prototype baseline from the
  relevant existing frontend and use its frontend technology.
- **No-frontend bootstrap:** create the prototype from the team's standard
  frontend template.
- **Existing prototype evolution:** read and preserve the existing prototype
  before applying the approved new request.
- **Explicit refresh/reconciliation:** compare a prototype against a newer
  production frontend revision only when the task specifically requires it;
  never overwrite accepted prototype behavior silently.

Initial bootstrap is normally a one-time delegated task for a prototype
workspace. Later work normally belongs to `product_prototyper`.

## 3. Technology Selection

- When the source product has a frontend, detect and use the same framework,
  language, package manager, build tooling, routing approach, and relevant
  design-system conventions when practical.
- Do not replace an existing frontend technology merely because a different
  prototype stack is more familiar.
- When no frontend exists, use the host workspace's configured standard
  prototype template. If no template is supplied, use Vue 3, Vite, and
  TypeScript as the default fallback and record that selection; this agent
  repository does not itself contain the runnable template.
- Record the detected or selected technology, source revision, and any
  deliberate deviation in the bootstrap evidence.

## 4. Baseline And Scope

- Establish and validate the relevant existing baseline before adding the new
  requirement.
- Reproduce the relevant surfaces and critical journey faithfully; do not
  clone the entire product when unrelated screens do not affect the decision.
- Preserve accepted prototype behavior during later revisions unless the user
  explicitly approves a change or the requirements engineer sends a revised
  requirements basis.
- Keep the prototype proportional to the concrete decision it must resolve.

## 5. Mock Boundaries And Data

- Mock service, persistence, authentication, external integration, and other
  production boundaries explicitly and deterministically.
- Keep interface state, transitions, validation, loading, empty, error,
  permission, recovery, and visible feedback real whenever they affect the
  product decision.
- Use small synthetic fixtures that reflect relevant production data shapes.
  Do not use credentials, personal data, customer data, or production exports.
- Place mocked behavior behind explicit adapters or fixtures instead of
  scattering arbitrary data and service branches through presentation code.
- Record what the prototype proves, what remains mocked, and what production
  behavior is still unresolved.

## 6. Fidelity And Evidence

- Preserve the existing product's visual language when the prototype is based
  on an existing frontend unless the approved request intentionally explores a
  different direction.
- Treat hierarchy, spacing, typography, labels, controls, responsive behavior,
  focus, keyboard behavior, and accessibility intent as evidence when they
  affect the decision.
- Distinguish requirements-defining behavior and visual details from
  illustrative details that implementation may refine later.
- Validate the real prototype entry point and critical journey. Screenshots are
  evidence only when they correspond to the validated runnable state.
- Capture final reference screenshots only after explicit user confirmation.

## 7. Workspace And Isolation

- Keep a long-lived existing-product prototype in a separate, stable prototype
  workspace, commonly as a sibling of the production project, for example:

  ```text
  workspace/
  ├── product/
  └── product-prototype/
  ```

- Record the source project, source commit or revision, prototype root, run
  command, and mock boundary in durable prototype evidence.
- Do not allow prototype runs to write to production services or depend on
  production credentials.

## 8. Responsibility Boundary

- `prototype_bootstrapper` establishes or explicitly refreshes the technical
  prototype baseline and submits evidence to its delegator.
- `product_prototyper` owns prototype scope, requested experience changes,
  user review, final validation, screenshots, and `ui-ux-spec.md`.
- `requirements_engineer` owns canonical requirements, acceptance criteria,
  requirements approval, and integration of the approved UI/UX package.
- No prototype role owns the target production architecture or production
  implementation.
