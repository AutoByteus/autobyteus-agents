---
name: Software Development Department
description: An end-to-end software delivery department that connects the independent Requirements Engineering and Software Engineering teams through message-based handoffs.
category: software-engineering
---

This department is the end-to-end entrypoint for software work that needs both requirements engineering and software engineering. `head_of_software_development` owns department intake and the final response; the two nested teams remain independent specialists.

## Members And Responsibilities

- `head_of_software_development` assigns a stable package identifier, starts Requirements Engineering, receives terminal outcomes, verifies final evidence, and returns the department result.
- `requirements_engineering_team` owns intended behavior, requirements evidence, acceptance criteria, conditional product prototyping, explicit user approval, and architecture readiness.
- `software_engineering_team` owns target architecture, architecture review, implementation, source review, executable validation, delivery, and finalization.

Accepted specialist artifacts remain the authoritative cumulative package. The Head does not relay an approved package between the two teams: `requirements_engineer` hands it directly to `architecture_designer` under the department handoff rules.

## Collaboration Flow

1. The Head assigns a stable package identifier and sends each independent package to Requirements Engineering with the complete request, context, constraints, workspace, and reference files.
2. Requirements Engineering investigates, conditionally prototypes, obtains explicit user approval, and validates architecture readiness.
3. An approved architecture-ready package goes directly from `requirements_engineer` to `architecture_designer`. A pre-architecture blocker returns to the Head.
4. Software Engineering completes design through verified delivery. A material requirement gap returns from `architecture_designer` to `requirements_engineer` for canonical revision and any necessary renewed approval.
5. After Delivery reports explicit user verification and successful finalization, `architecture_designer` verifies the terminal cumulative package and sends the result to the Head.
6. The Head verifies the result and returns it to the user or calling workflow.

Independent packages may proceed concurrently. Every message carries its stable package identifier so results and recovery paths remain unambiguous.

## Handoff Protocol

- When a member reaches a completed or blocked outcome, call `get_handoff_rules` and use the returned rules as the routing authority.
- Apply every returned rule whose condition matches the outcome, then call `send_message_to` with the exact returned `recipient_address`.
- Include the package identifier, status, next expected action, and absolute paths to every still-relevant artifact.
- Do not choose a recipient from memory. If no returned rule applies, return the result to the user or calling workflow.
- After all required messages succeed, end the current stage and do not poll.

Detailed specialist workflows, artifacts, validation, and recovery remain authoritative in each member's bundled skill.
