# LC-DP-01 (new text): code_reviewer on the sample ticket 'archive-runs' with five planted design flaws
# AutoByteus 1.5.7-beta.4 isolated instance, claude_agent_sdk, claude-opus-5, 2026-10-20; package: this change
## Request
From /implementation_engineer: implementation of ticket "archive-runs" is ready for implementation source review (task_size Medium, architectural_risk High).

Repository: /tmp/dp-live/new/runs-app (main, last commit). Package: /tmp/dp-live/new/runs-app/tickets/in-progress/archive-runs/requirements-doc.md, design-spec.md, implementation-handoff.md. Architecture review artifacts: N/A for this sample.

Write your code review report in the ticket folder, then reply with your decision and the list of findings (one line each, with the principle or rule each one breaks).
## Reply
Review complete. Report and revision record are written; the handoff message could not be delivered (`/implementation_engineer` was refused with `COLLABORATION_TARGET_NOT_FOUND`, `get_handoff_rules` returned an empty rule set, and the incoming task carried no sender run id), so I'm reporting here.

## Decision: **Fail** — 4.1/10 (41/100)

**Classification:** `Design Impact`, owner **Solution Designer** (F-001–F-005), plus `Local Fix` owned by implementation (F-006, F-007). The ticket does not advance to API/E2E.

**Artifacts**
- `/tmp/dp-live/new/runs-app/tickets/in-progress/archive-runs/code-review-report.md`
- `/tmp/dp-live/new/runs-app/tickets/in-progress/archive-runs/code-review-revision-record.md` (`CRR-001` baseline)

## Findings

- **F-001** — `RunController` is injected with both `RunService` and `RunRepository` and reads run state directly (`run-controller.ts:4,7`) — **Core Principle 3, Authoritative Boundary Rule** (no boundary bypass / mixed-level dependency); also **Principle 9**. The spec's justification "the service has no read method for it" is contradicted by `RunService.getById` in the same change.
- **F-002** — `run-service.ts:9` falls back to an undeclared legacy `finished` field via `(r as any)` on the normal archive path, with no recorded transition decision — **Principle 8** (no compatibility fallback branches) and **Principle 5** (current-schema runtime; version-specific dual reads prohibited; evidence-backed decision required).
- **F-003** — `record.ts:2-7` is one `RunRecord` for agent runs, team runs and team members with six optional fields, plus unconstrained `status?: string` carrying the `"done"` rule — **Principle 11** (shared-base overreach; singular, explicit field meaning).
- **F-004** — `src/shared/record.ts` holds a run-domain type imported only by `src/runs/*` — **Principle 11** (shared folder only for truly cross-cutting code) and **Principle 12** (placement follows ownership).
- **F-005** — `RunService.getById` is one generic read for two subjects, its comment claims id-prefix inference its body never performs, and nothing calls it — **Principle 10** (one boundary, one subject, explicit identity) and **Principle 7** (uncalled function in a touched file).
- **F-006** — `src/runs/legacy-run-export.ts` (`exportCsv`) has no importers, inside the Change Scope under "Removal plan: none" — **Principle 7, No Dead Code** and **Principle 8** (explicit removal).
- **F-007** — No behavior trace in the handoff and no `implementation-revision-record.md` — the team's **handoff/artifact rule**; lowest severity, did not drive the decision.

Follow-ups added: **None** — all seven are inside the ticket boundary.

## What I deliberately did not fail it for

Both acceptance criteria are functionally satisfied, including `AC-001`'s exact `run not finished` message; no correctness defect was found for any promoted scenario; no migration machinery or speculative defensive code was added (`Runtime Correctness` scored highest at 7.0). Four candidates were rejected and kept out of the score and routing: archive/read of a nonexistent run (no delete or expiry surface exists), concurrent/racing archives (two supported actions don't make a supported concurrent workflow), re-archiving an already archived run (no material consequence), and the absence of automated tests (no runner, `No project testing guideline found`).

Five of seven findings are shapes `design-spec.md:11-15` prescribes, so the correction starts upstream — which is why this routes to the Solution Designer rather than back to you as local fixes. One caveat for whoever routes it: premise `CRP-001` (stored runs carrying `finished: true`) is recorded **`Unclear`** — the package offers no evidence for it and `RunRepository` is an in-memory `Map`, so neither keeping nor deleting that branch is provably safe until the designer records one of the five named persisted-data decisions with evidence.
