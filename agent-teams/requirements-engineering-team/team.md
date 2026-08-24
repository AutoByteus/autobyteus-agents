---
name: Requirements Engineering Team
description: A focused team for codebase-informed requirements engineering, conditional product prototyping, explicit user approval, and an architecture-ready requirements result.
category: software-engineering
---

This team turns an initial software request into a precise, explicitly approved, architecture-ready requirements package. `requirements_engineer` is the coordinator and canonical requirements owner.

The shared prototype contract is [shared/product-prototype-principles.md](shared/product-prototype-principles.md). It defines exact observable UI/UX fidelity, lightweight prototype implementation, synthetic state, same-repository sibling-project ownership, and evidence rules shared by both prototype roles.

## Members And Responsibilities

- `requirements_engineer` owns investigation, current and desired behavior, scope, requirements, acceptance criteria, supporting evidence, requirement revisions, explicit user approval, architecture readiness, and the Requirements Engineering Team result.
- `product_prototyper` owns the stable prototype project's ticket lifecycle from request intake. For an existing frontend, it accepts the exact current-experience UI baseline; when no frontend exists, it establishes the initial baseline directly. It then owns focused future-state changes, user prototype review, normal project commits, canonical `ui-ux-spec.md`, normative final visual references, and supporting prototype evidence. Ticket folders are managed in the project root and do not require dedicated worktrees.
- `prototype_bootstrapper` independently establishes, corrects, or explicitly refreshes 100% observable UI/UX parity to the selected pinned frontend using prototype-native state, synthetic fixtures, and simulated runtime contexts. It may initialize or update the canonical prototype project and return a bootstrap report, but it does not implement future-state design or replace Product Prototyper's acceptance and project commit.

Requirements Engineering defines intended behavior and measurable constraints. Target software architecture belongs to downstream engineering.

UI authority is explicit: the pinned source frontend—not the Bootstrapper—is
authoritative for the current baseline; Product Prototyper authors the focused
future-state proposal but only the user approves it. Requirements Engineer then
integrates the approved `ui-ux-spec.md` and normative final references into the
canonical requirements package.

The project boundary is explicit: the prototype has its own stable project
root inside the parent/source repository and never writes inside the production
frontend directory. Keep it as a sibling project directory of the selected
frontend at the same parent level. If the frontend is a direct child of the
repository root, the prototype is also a direct child; if the frontend is
nested, place it beside the frontend; when no frontend exists, make the
prototype a direct child of the parent/source repository. Name it
`<prototype-subject>-prototype` and do not add a generic `prototypes/` container.
Product Prototyper owns acceptance, normal project commits, and the durable
UI/UX evidence.

Requirements Engineer's task workspace or worktree is for requirements
artifacts only. It is not the prototype project root and must not contain the
Product Prototyper's ticket folders.

## Collaboration Flow

1. `requirements_engineer` investigates the request and maintains the canonical requirements, evidence, and revision artifacts.
2. When runnable evidence would materially resolve a product, UI, interaction, state, or journey decision, it sends a focused prototype request to `product_prototyper`. Otherwise it completes the evidence and approval path directly.
3. When a selected existing frontend supplies the current experience:
   - `product_prototyper` checks only for an applicable accepted baseline.
   - If the baseline is absent, Product Prototyper opens or reopens its ticket
     folder, then sends the fixed minimal Initial Bootstrap trigger defined in
     its skill after resolving the stable prototype project root; it does not
     pre-inventory the UI or assemble a requirements packet.
   - `prototype_bootstrapper` independently resolves the source pin, canonical
     prototype project root, UI inventory, implementation, and validation, then
     returns a runnable baseline, bootstrap report, and exact comparison
     evidence. Product Prototyper runs acceptance checks and creates the
     accepted-baseline project commit. Correction and refresh requests add
     only their mode-specific fields.
   - After reviewing and accepting the returned baseline, Product Prototyper
     continues work in the same stable project and its ticket folder, conducts
     the user-facing review, and returns an approved UI/UX package, a
     requirement-impact finding, a not-recommended finding, or a precise
     blocker.
   - With no existing frontend, Product Prototyper builds the focused experience
     directly before conducting the same review flow.
4. `requirements_engineer` integrates the returned evidence, obtains explicit user approval for intended behavior, and hands off the architecture-ready package or blocker under the applicable team or department rules.

Only the user approves intended behavior. A handoff records stage readiness; it does not replace that approval.

## Team Communication

- At every completed or blocked outcome, call `get_handoff_rules` and use the returned conditional rules as the routing authority.
- Apply every matching rule and call `send_message_to` with the exact returned `recipient_address`; do not choose a recipient from memory.
- Do not use Codex-native collaboration tools for this team's internal workflow.
- Every handoff preserves any stable package identifier supplied by the caller and carries its status, next expected action, and cumulative still-relevant package through absolute artifact paths. The fixed Initial Bootstrap trigger is the exception: Product Prototyper retains its ticket context locally, while Bootstrapper receives only the minimal source, project-root, constraint, and mode-specific context defined by the Product Prototyper skill.
- For an Initial Bootstrap handoff, the selected frontend locator, canonical
  prototype project root, and any explicit source constraint are relevant to
  Bootstrapper; the ticket and future-state requirements package remain with
  Product Prototyper.
- If no returned rule applies, return the outcome to the user or calling workflow. After all required messages succeed, end the stage and do not poll.

Detailed role workflow, artifacts, validation, recovery, and result rules belong to each member's bundled skill.
