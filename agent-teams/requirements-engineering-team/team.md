---
name: Requirements Engineering Team
description: A focused team for codebase-informed requirements engineering, conditional product prototyping, explicit user approval, and an architecture-ready requirements result.
category: software-engineering
---

This team turns an initial software request into a precise, explicitly approved, architecture-ready requirements package. `requirements_engineer` is the coordinator and canonical requirements owner.

The shared prototype contract is [shared/product-prototype-principles.md](shared/product-prototype-principles.md). It defines existing-frontend parity, technology, mocked-boundary, workspace-isolation, and evidence rules shared by both prototype roles.

## Members And Responsibilities

- `requirements_engineer` owns investigation, current and desired behavior, scope, requirements, acceptance criteria, supporting evidence, requirement revisions, explicit user approval, architecture readiness, and the Requirements Engineering Team result.
- `product_prototyper` conditionally accepts the current-state parity baseline, applies focused future-state changes, conducts user prototype review, and owns the canonical `ui-ux-spec.md`, final reference screenshots, and supporting prototype evidence.
- `prototype_bootstrapper` owns initial bootstrap, parity completion, or explicit refresh of the selected frontend's complete current UI/UX and client-behavior baseline, deterministic mock boundaries, and reviewable parity evidence.

Requirements Engineering defines intended behavior and measurable constraints. Target software architecture belongs to downstream engineering.

## Collaboration Flow

1. `requirements_engineer` investigates the request and maintains the canonical requirements, evidence, and revision artifacts.
2. When runnable evidence would materially resolve a product, UI, interaction, state, or journey decision, it sends a focused prototype request to `product_prototyper`. Otherwise it completes the evidence and approval path directly.
3. `product_prototyper` uses `prototype_bootstrapper` for initial current-state parity, parity completion, or explicit refresh when required; after accepting that baseline, it conducts the focused user-facing prototype review and returns an approved UI/UX package, a requirement-impact finding, a not-recommended finding, or a precise blocker.
4. `requirements_engineer` integrates the returned evidence, obtains explicit user approval for intended behavior, and hands off the architecture-ready package or blocker under the applicable team or department rules.

Only the user approves intended behavior. A handoff records stage readiness; it does not replace that approval.

## Team Communication

- At every completed or blocked outcome, call `get_handoff_rules` and use the returned conditional rules as the routing authority.
- Apply every matching rule and call `send_message_to` with the exact returned `recipient_address`; do not choose a recipient from memory.
- Do not use Codex-native collaboration tools for this team's internal workflow.
- Every handoff preserves any stable package identifier supplied by the caller and carries its status, next expected action, and cumulative still-relevant package through absolute artifact paths.
- If no returned rule applies, return the outcome to the user or calling workflow. After all required messages succeed, end the stage and do not poll.

Detailed role workflow, artifacts, validation, recovery, and result rules belong to each member's bundled skill.
