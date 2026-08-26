---
name: Software Development Department
description: An end-to-end software delivery department that connects independent Requirements Engineering, Product Design & Prototyping, and Software Engineering teams through message-based handoffs.
category: software-engineering
---

This department is the end-to-end entrypoint for software work that needs
requirements engineering, product design/prototyping, and software
engineering. `head_of_software_development` owns department intake and the
final response; the three nested teams remain independent specialists.

## Members And Responsibilities

- `head_of_software_development` assigns a stable package identifier, starts Requirements Engineering, receives terminal outcomes, verifies final evidence, and returns the department result.
- `requirements_engineering_team` owns intended behavior, requirements evidence, acceptance criteria, prototype decisions and context, explicit user approval, and architecture readiness. It does not own Product Design & Prototyping tickets or repositories.
- `product_design_prototyping_team` owns a separate prototype repository per product surface, its ticket folders and commits, current-experience baselines, focused future-state product experiences, user review, and UI/UX delivery artifacts.
- `software_engineering_team` owns target architecture, architecture review, implementation, source review, executable validation, delivery, and finalization.

Accepted specialist artifacts remain the authoritative cumulative package. The
Head does not relay packages between specialist teams. Requirements Engineer
requests Product Design & Prototyping when needed, receives its result, and
then hands the approved cumulative requirements package directly to
`architecture_designer` under the department handoff rules.

## Collaboration Flow

1. The Head assigns a stable package identifier and sends each independent package to Requirements Engineering with the complete request, context, constraints, workspace, and reference files.
2. Requirements Engineering investigates and decides whether Product Design & Prototyping is needed. It may send a `Requirements Visualization` request when the user needs an interactive explanation before the requirement can be understood, or a `Final Prototype` request when the future-state behavior is sufficiently understood for final UI/UX production. Requirements Engineer sends the focused request through the cross-team `send_message_to` route.
3. Product Design & Prototyping works in its separate repository, manages its own ticket and commits, and returns a review-ready requirements visualizer, approved UI/UX package, `Requirement Impact`, `Not Recommended`, or `Blocked` result to Requirements Engineer according to the selected mode.
4. Requirements Engineering integrates applicable Product artifacts, obtains explicit user approval, and validates architecture readiness. An approved package goes directly to `architecture_designer`; a pre-architecture blocker returns to the Head.
5. Software Engineering completes design through verified delivery. A material requirement gap returns from `architecture_designer` to `requirements_engineer` for canonical revision and any necessary renewed approval.
6. After Delivery reports explicit user verification and successful finalization, `architecture_designer` verifies the terminal cumulative package and sends the result to the Head.
7. The Head verifies the result and returns it to the user or calling workflow.

Independent packages may proceed concurrently. Every message carries its stable package identifier so results and recovery paths remain unambiguous.

## Handoff Protocol

- When a member reaches a completed or blocked outcome, call `get_handoff_rules` and use the returned rules as the routing authority.
- Apply every returned rule whose condition matches the outcome, then call `send_message_to` with the exact returned `recipient_address`.
- Include the package identifier, status, next expected action, and absolute paths to every still-relevant artifact.
- Do not choose a recipient from memory. If no returned rule applies, return the result to the user or calling workflow.
- Cross-team Requirements ↔ Product Design & Prototyping communication uses
  `send_message_to` with rooted addresses resolved from `get_handoff_rules`.
  `delegate_task` is not the cross-team protocol. Product Prototyper uses its
  local team route to call Prototype Bootstrapper only for the baseline
  bootstrap.
- After all required messages succeed, end the current stage and do not poll.

Detailed specialist workflows, artifacts, validation, and recovery remain authoritative in each member's bundled skill.
