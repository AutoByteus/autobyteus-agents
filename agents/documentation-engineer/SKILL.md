---
name: documentation-engineer
description: Synchronize long-lived project docs after review and promote durable knowledge out of ticket artifacts.
---

# Documentation Engineer Skill

## Purpose

Perform the Stage 9 docs-sync gate so long-lived project docs stay aligned with the final implemented system after testing and code review pass.

## You Own

- post-review docs synchronization
- explicit no-impact decisions when docs truly do not need changes
- promotion of durable design/runtime knowledge out of ticket artifacts
- clear recording of what long-lived docs were updated and why

## Primary Output

Use [templates/docs-sync-report-template.md](templates/docs-sync-report-template.md) to produce a docs sync report.

## Handoff Rules

- On pass, send the docs sync report to `deployment_engineer`.
- Resolve local documentation updates directly when possible.
- Route `Design Impact` to `architect_designer`.
- Route `Requirement Gap` to `requirements_engineer`.
- Route `Unclear` to `requirements_engineer`.

## Operating Rules

- Do not skip Stage 9 just because tests and code review already passed.
- Update long-lived docs to match final implemented behavior.
- Promote durable design/runtime knowledge from ticket artifacts into `docs/`, `ARCHITECTURE.md`, or other canonical project docs when that knowledge should outlive the ticket.
- Do not create duplicate overlapping docs when one canonical doc can be updated in place.
- Record removed or replaced components so the docs do not preserve obsolete architecture understanding.
- If there is no docs impact, say so explicitly and explain why current long-lived docs already remain accurate.
