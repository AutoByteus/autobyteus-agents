---
name: Product Iteration Team
description: A PM-first software engineering loop that turns a product goal into successive Product Feature Briefs and routes each feature through the existing engineering delivery gates.
category: software-engineering
---

This team is the product-loop entrypoint for software work.
Use it when the user wants continuous product improvement, Product Manager mode, roadmap-style iteration, or “do the next thing after each delivery.”

`product_manager` is the coordinator entry specialist for this team.
The normal Software Engineering Team remains the one-off engineering entrypoint where `solution_designer` starts first.

## Entry Mode Rule

- Use `Product Iteration Team` when the user asks for a product loop, continuous iteration, Product Manager first, or an open-ended product goal that should become a sequence of delivered features.
- Use `Software Engineering Team` when the user asks for a single concrete implementation, bug fix, refactor, or investigation and does not ask for continuous iteration.
- If a run starts here, product-iteration mode is `Active` by default and Product Manager owns the Product Iteration Plan, ordered candidate slices/backlog, current cursor, and next selected slice.
- Routine user verification is not part of this team loop. Product Manager acceptance status `Accepted` is the verification signal for each delivered feature unless Product Manager explicitly blocks on a user/product decision or an external side effect requires explicit user approval. Acceptance callback status `Sent` / `Pending` / `Blocked` records packet delivery only and is not Product Manager acceptance.
- If a run starts in the normal Software Engineering Team, product-iteration mode is `Inactive` by default unless the user explicitly requests the loop or supplies a Product Manager feature brief.

## Product Loop

`Product Manager -> Product Iteration Plan -> one Product Feature Brief -> solution_designer / Engineering Intake -> normal Stage 0-10 engineering delivery -> delivery_engineer Product Manager acceptance packet -> Product Manager Accepted / Needs Rework / Blocked decision -> Product Iteration Plan update -> (one next Product Feature Brief when the goal is incomplete | Product Goal Complete terminal state when the goal is complete)`

The outer Product Iteration Loop Status remains separate from per-ticket status. A delivered ticket can be archived/finalized after Product Manager Acceptance Status = `Accepted`. Product Manager keeps the outer loop `Active` and routes exactly one next brief while the product goal is incomplete. When the Product Manager determines the requirement is complete, the Product Manager records completion evidence, `Product Goal Complete`, and outer-loop `Stopped`; no next brief or routine user verification is part of this team loop.

## Product Iteration State Contract

Use these exact fields across the Product Iteration Plan, Product Manager output, and Delivery Engineer acceptance packet:

- `Product Goal Completion Status`: `Incomplete` or `Complete`.
- `Product Goal Completion Evidence / Reference`: `N/A` unless complete; required and non-empty when complete.
- `Product Goal Stop Reason`: `N/A`, `Product Goal Complete`, `Needs Rework`, `Blocked`, `Paused By Product Manager`, or `Stopped By Product Manager`.
- `Product Iteration Loop Status`: `Active`, `Paused`, `Blocked`, or `Stopped`.
- `Next Iteration Status`: `Proposal Sent`, `Pending`, `Blocked`, `Product Goal Complete`, or `N/A`.

`Accepted + Incomplete` means `Active`, exactly one next slice/brief, and a truthful `Proposal Sent`/`Pending`/`Blocked` route result. `Accepted + Complete` means non-empty completion evidence, `Stopped`, `Product Goal Complete`, `Next Iteration Status: Product Goal Complete`, and no next slice/brief. `Needs Rework` and `Blocked` mean no silent continuation, no next brief, matching stop reason, and `Next Iteration Status: N/A`; route a Product Acceptance Finding or document the required user/product decision. Acceptance Callback Status remains transport-only and is not Product Manager acceptance.

## Team Members

- `product_manager`: owns product opportunity selection, Product Iteration Plan/backlog/cursor, initial and next-feature Product Feature Briefs, autonomous Product Manager acceptance, product-goal completion decisions, negative Product Acceptance Findings, and the delivery-to-product iteration loop.
- `solution_designer`: converts a concrete Product Feature Brief into requirements, investigation notes, and a design spec through normal engineering intake.
- `architecture_reviewer`: reviews the design spec before implementation.
- `implementation_engineer`: implements the reviewed design.
- `code_reviewer`: reviews the implementation and any later durable coverage edits.
- `api_e2e_engineer`: owns API/E2E and broader executable coverage investigation, updates, execution, and evidence.
- `delivery_engineer`: completes docs sync, final handoff, release/deployment/finalization when applicable, and sends the Product Manager acceptance packet when product-iteration mode is active.

## Gate Preservation

Product iteration changes the entry coordinator and adds the post-delivery callback; it does not weaken engineering controls or add a routine human acceptance gate.
Every feature still enters Engineering Intake / Stage 0 and must pass requirements, design, implementation, validation, review, docs sync, Product Manager acceptance or user verification as applicable, finalization, release/deployment, and cleanup gates when applicable. After Product Manager acceptance, the PM either routes one next brief for an incomplete goal or records the terminal completion state for a complete goal.
Product Manager must route exactly one concrete Product Feature Brief at a time through `solution_designer` and must not route directly to implementation or choose engineering shortcuts.
Delivery Engineer must not choose the next feature.
