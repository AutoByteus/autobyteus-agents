# Requirements Engineering Standards

Read during discovery, requirements refinement and requirement-impact recovery. The main skill owns phase transitions, approval and the handoff procedure; this reference owns evidence, requirements and Product integration quality.

## Investigation Rules

- Investigate enough of the real product and codebase to define accurate requirements; do not rely only on the visible UI or the initial request wording.
- Use the closest applicable repository instructions, current documentation, source paths, configuration, tests, runtime traces, logs, representative data, external contracts, and public sources as appropriate.
- Record exact sources, commands, observations, and unresolved questions in the investigation notes.
- Distinguish supported user actions, system events, operational actions, and governing contracts from synthetic calls, manual corruption, internal-file manipulation, or mechanical possibility.
- Do not turn a code branch, mocked test, or technically callable method into a requirement without an independently supported product or contract basis.
- For every relevant behavior, establish the supported product-scenario basis before interpreting technical evidence as a requirement. Record the product-level trigger and behavior sequence separately from the technical caller or component path.
- Mark an unusual scenario as `Supported Explicit Edge Scenario` only when an explicit product, security, operational, or governing contract supports it. If the scenario is merely callable or the evidence is missing, record `Technically Possible but Unsupported/Contrived` or `Unclear` rather than approving it.
- For genuinely new behavior, record that no current supported behavior exists and identify the proposed target trigger, recording its approval reference once approved.
- Treat feasibility findings as evidence. Do not silently weaken an intended outcome because the current code makes it inconvenient.
- When persisted data may be affected, identify what must be preserved, what loss is acceptable, relevant volume and constraints, and current reader/writer behavior. Do not prescribe migration merely because a schema changes; the architecture phase owns the transition mechanism.

## Requirements Rules

- State the problem and desired outcome precisely before listing detailed requirements.
- For every relevant behavior, describe current behavior, desired behavior, and intentionally preserved behavior.
- A behavior may be user-initiated, system-initiated, operational, or contract-driven; do not invent a UI journey for backend or infrastructure work.
- Use the canonical `Relevant Scenarios And Journeys` records to define the supported product-level trigger, goal/event, steps, outcome, alternate/error behavior, validity, and evidence for each relevant behavior. Do not add internal component or call-graph design to this requirements-owned record.
- Use the mandatory scope guardrail as the canonical change boundary. Keep in-scope use cases, out-of-scope concerns, non-goals, preserved behavior, and review authority explicit without duplicating the full behavior table or acceptance criteria.
- Require every blocking downstream `Design Impact` or implementation-correction finding to trace to an approved requirement, acceptance criterion, or preserved-behavior ID. A proposed new product behavior, policy, threat model, migration obligation, compatibility promise, or operational contract is a `Requirement Gap`, not an automatic design correction.
- Do not incorporate a scope-changing downstream proposal into the approved requirements basis without explicit user approval. Until approved, retain it only as a non-authoritative question, risk, recommendation, or separate-ticket candidate and keep downstream work blocked when the unresolved decision is material.
- Give each requirement a stable `REQ-*` ID and each acceptance criterion a stable `AC-*` ID.
- Write acceptance criteria as observable, verifiable outcomes. Include important alternate, error, empty, permission, lifecycle, and recovery behavior only when it is supported and relevant.
- Separate scope, non-goals, assumptions, constraints, and unresolved decisions.
- Record technical requirements as behavior or measurable constraints, not as an unapproved target architecture.
- Link every acceptance criterion to at least one requirement and relevant behavior or scenario.
- Ensure every relevant behavior and requirement maps to at least one supported scenario or explicitly documented contract; if the scenario basis is unclear, keep the package `Draft`, `Ready for Approval`, or `Blocked` as appropriate.
- Link every behavior-defining supplement from the requirements doc and include it in the approval basis.
- When prototype visuals help define the intended UI, link the prototyper-owned approved UI/UX specification and its final references from the requirements doc.
- When an exploratory requirements visualizer is used, link its brief,
  revision/review record, source or review URL, and clarification decisions as
  supporting evidence. Do not treat the exploratory visualizer itself as the
  final normative UI/UX specification.
- Keep evidence in investigation notes instead of bloating the requirements doc with raw research.
- Never mark the package `Approved` without explicit user approval.
- After readiness and explicit approval, continue architecture investigation and design in the main skill. Task-size/risk classification follows the completed design spec.

## Product Design Context

Product Design & Prototyping is a separate team. Solution Designer records
the user's explicit or clarified request and supplies the requirements context;
it does not decide whether Product Prototyper uses a visualizer or a product
prototype workflow, and it does not prescribe Product repository or
Bootstrapper work.

When Product Design & Prototyping support is requested, include:

- the user's requested outcome in the user's own terms, without translating it
  into a Product Prototyper mode
- the requirements, behavior, and acceptance-criteria IDs in question
- the exact product decision, uncertainty, or experience the user wants to
  understand or evolve
- the critical journey, states, constraints, and non-goals that are already
  established
- existing product or frontend context when it is part of the request or
  supported by requirements investigation; do not turn it into a bootstrap
  payload or prescribe how Product Prototyper should inspect it
- the canonical requirements and investigation artifact paths

Record the handoff outcome as `Product Design Requested` only to indicate that
the user's Product Design request or a correction to its returned result is
ready to forward. For `Result Correction`, include the original user-request
reference, returned package and precise gap; stay within that requested scope.
This label does not select a Product Prototyper mode.

If the user has not requested Product Design & Prototyping support, do not
invent a visualization or prototype handoff. Record unresolved experience
questions and ask the user for direction when that decision is necessary.
Product Prototyper receives the request, reasons about its relationship to the
product surface, selects its own mode, and owns its repository, ticket, and
experience workflow.

For returned Product Design results, treat a review-ready visualization or
prototype package as evidence for the user's review, not as approval by
itself. Solution Designer records the user's decisions and integrates only
approved behavior into the canonical requirements package. For a returned
product-prototype package, verify that it includes explicit user confirmation:

- verify that `ui-ux-spec.md` links the runnable prototype and final reference screenshots
- verify that the UI/UX specification and any prototype report identify the
  same separate prototype repository/root, ticket, accepted revision, source pin, and
  durable artifact paths
- reconcile its approved behavior with `requirements-doc.md` and affected acceptance criteria
- treat every visible detail in the approved final references as a normative UI
  requirement unless `ui-ux-spec.md` explicitly identifies fixture content or
  permitted variation as illustrative
- record mocked boundaries, rejected alternatives, and unresolved questions truthfully
- If the package claims approval without an approval reference or its artifacts disagree, classify `Product Design Requested` with purpose `Result Correction` and use the main skill's handoff procedure. Do not integrate the disputed result as approved.
- when prototype review reveals a material scope or requirement change, update the canonical requirements and revision record before forwarding any new user-approved request to the prototyper
- preserve the approved UI/UX package in the cumulative downstream handoff

## Supplemental Artifact Rules

- Keep a canonical supplement inventory in the investigation notes.
- Record each supplement's purpose, scope, status, related requirement IDs, and whether user approval applies.
- A supplement may complement but never replace the requirements doc or investigation notes.
- Do not promote scratch files or disposable probes unless they remain useful downstream.
- Preserve every still-relevant supplement in the cumulative package.

## Readiness Gate

Before presenting the package as ready for approval or a downstream route, confirm:

- the problem and desired outcome are unambiguous
- relevant current behavior is evidence-backed
- desired and preserved behavior are explicit
- scope and non-goals are clear
- requirements and acceptance criteria are stable, linked, and testable
- applicable user, system, operational, and contract scenarios are covered
- prototype evidence and behavior-defining supplements are reflected consistently when applicable
- when a product-prototype result is returned, the prototyper-owned UI/UX
  specification and production-quality final visual references have explicit user confirmation,
  agree with the runnable prototype, and identify every permitted illustrative
  detail or variation explicitly
- when only an exploratory visualization result is returned, its brief, review record,
  visual evidence, and the user's clarified decision are linked as supporting
  evidence; no final UI/UX specification is required yet
- quality and operational constraints are measurable when relevant
- data-preservation and acceptable-loss requirements are explicit when relevant
- every relevant behavior and requirement has a supported scenario or governing-contract basis, with validity and evidence recorded
- assumptions and unresolved decisions are visible
- no target architecture has been invented to fill a requirements gap

If a material product decision remains open, keep the package `Draft` or `Ready for Approval`; do not present it as approved.
