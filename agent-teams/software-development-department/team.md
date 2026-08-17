---
name: Software Development Department
description: An end-to-end software delivery department that coordinates the Requirements Engineering and Software Engineering teams through tracked task lifecycles.
category: software-engineering
---

This department is the end-to-end entrypoint for software work that needs both requirements engineering and software engineering. `head_of_software_development` is the coordinator and cross-team task owner.

## Members And Responsibilities

- `head_of_software_development` owns cross-team task decomposition, delegation, result review, recovery, and the department's final response or delegated-task submission.
- `requirements_engineering_team` owns intended behavior, requirements evidence, acceptance criteria, conditional product prototyping, and explicit user approval.
- `software_engineering_team` owns target architecture, architecture review, implementation, source review, executable validation, delivery, and finalization.

The coordinator routes specialist decisions and gaps to the team that owns them. Accepted specialist artifacts remain the authoritative cumulative package.

## Collaboration Flow

1. The coordinator delegates each independent package to Requirements Engineering with the complete request, context, constraints, workspace, and reference files.
2. It reviews the returned requirements result and proceeds only with an explicitly approved, architecture-ready package.
3. It delegates the accepted cumulative package to Software Engineering.
4. It reviews the returned software result against the approved requirements, validation evidence, explicit user verification, and applicable finalization.
5. It returns the accepted end-to-end result to the standalone caller or submits it through the department's bound delegated-task lifecycle.

Use separate task lifecycles for independent packages. Within one package, the accepted Requirements Engineering result is the prerequisite for Software Engineering.

The Head of Software Development's bundled skill is the authoritative workflow for task contracts, task identity, recovery, review, and final result handling.
