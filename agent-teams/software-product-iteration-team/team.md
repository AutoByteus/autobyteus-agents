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

`Product Manager -> Product Iteration Plan -> one Product Feature Brief -> solution_designer / Engineering Intake -> normal Stage 0-10 engineering delivery -> delivery_engineer Product Manager acceptance packet -> Product Manager Accepted / Needs Rework / Blocked decision -> Product Iteration Plan update -> next Product Feature Brief when accepted`

The outer Product Iteration Loop Status remains separate from per-ticket status. A delivered ticket can be archived/finalized after Product Manager Acceptance Status = `Accepted`, while the product loop remains `Active` until Product Manager records `Paused`, `Blocked`, or `Stopped`.

## Team Members

- `product_manager`: owns product opportunity selection, Product Iteration Plan/backlog/cursor, initial and next-feature Product Feature Briefs, Product Manager acceptance, negative Product Acceptance Findings, and the delivery-to-product iteration loop.
- `solution_designer`: converts a concrete Product Feature Brief into requirements, investigation notes, and a design spec through normal engineering intake.
- `architecture_reviewer`: reviews the design spec before implementation.
- `implementation_engineer`: implements the reviewed design.
- `code_reviewer`: reviews the implementation and any later durable coverage edits.
- `api_e2e_engineer`: owns API/E2E and broader executable coverage investigation, updates, execution, and evidence.
- `delivery_engineer`: completes docs sync, final handoff, release/deployment/finalization when applicable, and sends the Product Manager acceptance packet when product-iteration mode is active.

## Gate Preservation

Product iteration changes the entry coordinator and adds the post-delivery callback; it does not weaken engineering controls.
Every feature still enters Engineering Intake / Stage 0 and must pass requirements, design, implementation, validation, review, docs sync, Product Manager acceptance or user verification as applicable, finalization, release/deployment, and cleanup gates when applicable.
Product Manager must route exactly one concrete Product Feature Brief at a time through `solution_designer` and must not route directly to implementation or choose engineering shortcuts.
Delivery Engineer must not choose the next feature.
