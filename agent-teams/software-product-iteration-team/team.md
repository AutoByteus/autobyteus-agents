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
- If a run starts here, product-iteration mode is `Active` by default.
- If a run starts in the normal Software Engineering Team, product-iteration mode is `Inactive` by default unless the user explicitly requests the loop or supplies a Product Manager feature brief.

## Product Loop

`Product Manager -> Product Feature Brief -> solution_designer / Engineering Intake -> normal Stage 0-10 engineering delivery -> delivery_engineer acceptance packet -> Product Manager acceptance -> next Product Feature Brief`

## Team Members

- `product_manager`: owns product opportunity selection, initial and next-feature proposals, Product Feature Briefs, Product Manager acceptance, and the delivery-to-product iteration loop.
- `solution_designer`: converts a concrete Product Feature Brief into requirements, investigation notes, and a design spec through normal engineering intake.
- `architecture_reviewer`: reviews the design spec before implementation.
- `implementation_engineer`: implements the reviewed design.
- `code_reviewer`: reviews the implementation and any later durable coverage edits.
- `api_e2e_engineer`: owns API/E2E and broader executable coverage investigation, updates, execution, and evidence.
- `delivery_engineer`: completes docs sync, final handoff, release/deployment/finalization when applicable, and sends the Product Manager acceptance packet when product-iteration mode is active.

## Gate Preservation

Product iteration changes the entry coordinator and adds the post-delivery callback; it does not weaken engineering controls.
Every feature still enters Engineering Intake / Stage 0 and must pass requirements, design, implementation, validation, review, docs sync, Product Manager acceptance or user verification as applicable, finalization, release/deployment, and cleanup gates when applicable.
Product Manager must not route directly to implementation or choose engineering shortcuts.
Delivery Engineer must not choose the next feature.
