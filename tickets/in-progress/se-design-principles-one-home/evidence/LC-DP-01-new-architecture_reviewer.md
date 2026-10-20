# LC-DP-01 (new text): architecture_reviewer on the sample ticket 'archive-runs' with five planted design flaws
# AutoByteus 1.5.7-beta.4 isolated instance, claude_agent_sdk, claude-opus-5, 2026-10-20; package: this change
## Request
From /solution_designer: Architecture Design Complete for ticket "archive-runs" (task_size Medium, architectural_risk High), ready for independent architecture review.

Repository: /tmp/dp-live/new/runs-app (main). Package: /tmp/dp-live/new/runs-app/tickets/in-progress/archive-runs/requirements-doc.md and /tmp/dp-live/new/runs-app/tickets/in-progress/archive-runs/design-spec.md. Investigation notes, solution revision record and supplements: N/A for this small sample ticket.

Write your design review report in the ticket folder, then reply with your decision and the list of findings (one line each, with the principle or rule each one breaks).
## Reply
The address isn't reachable and no sender run id was provided with this task, so I'm reporting the result here.

## Decision: `Fail` — `Design Impact` (with two `Requirement Gap` items). Not routed to implementation.

- **Revision:** `ARCH-REV-001` (round 1); applicable `SR-*`: `N/A`
- **Classification preserved:** `Medium` / `High`. The gate is correctly selected, but the recorded rationale ("changes the stored run shape") is not evidence-backed — `RunRepository` is a process-local `Map`. `High` holds on shared-contract and ownership-boundary grounds instead.
- **Behavior basis:** `Contradicted`. **Material-premise gate:** `Fail` (`MP-001` is `Not Reachable`).

**Artifacts written**
- `/private/tmp/dp-live/new/runs-app/tickets/in-progress/archive-runs/design-review-report.md`
- `/private/tmp/dp-live/new/runs-app/tickets/in-progress/archive-runs/architecture-review-revision-record.md`

**Findings**

- `AR-001` Design Impact, High — `RunController.isArchived` reads `RunRepository` while also depending on `RunService`, which owns it → Principle 3, Authoritative Boundary Rule (no boundary bypass / mixed-level dependency); `REQ-002`/`AC-002`.
- `AR-002` Design Impact, High — legacy `finished` dual-read kept in current business logic for the unreachable premise `MP-001`, widening the `AC-001` finished test → Principle 8, Clean-Cut Replacement (with Principles 5 and 6); `REQ-001`/`AC-001`.
- `AR-003` Design Impact, High — `archived?` fires the persisted-data trigger but no transition decision and no reader/semantic/volume evidence is recorded → Principle 5. No migration wanted; evidence points to `Not Affected`.
- `AR-004` Design Impact, High — one `RunRecord`, eight of nine fields optional, serving agent runs, team runs and team members, extended rather than tightened → Principle 11, shared-base overreach; `REQ-001`/`AC-001`.
- `AR-005` Design Impact, Medium — `getById` serves two subjects and guesses from an id prefix (and the code does no such inference) → Principle 10, Interfaces Follow Ownership; `REQ-002`/`AC-002`.
- `AR-006` Design Impact, High — one arrow line for two use cases, no spine inventory, no behavior/production-path map, no spine for the read path, ends at the repository → Principle 2, Spine Inventory incl. Span Sufficiency (with 1 and 14).
- `AR-007` Design Impact, High — no change posture, root-cause classification or refactor decision → Task Design Health Assessment rule.
- `AR-008` Design Impact, Medium — "Removal plan: none" although `src/runs/legacy-run-export.ts` is unreferenced dead code in the in-scope module → Principle 7, No Dead Code (and Principle 8's removal rule).
- `AR-009` Design Impact, Low — no change inventory and no change sequence → Principle 14.
- `AR-010` Requirement Gap, High — "finished" is undefined in `REQ-001`/`AC-001`; the design resolves it as `status === "done"` on its own authority → Principle 1 (return ambiguity, don't redefine). No answer prescribed.
- `AR-011` Requirement Gap, Medium — requirements doc has no Scope Guardrail, so nothing authorizes the preserved behavior `AR-002` claims to serve → Principle 1 and the ticket-scope rule.

Two notes for rework sequencing: the design is already in `src/` verbatim with `implementation-handoff.md` recording no checks run, so the correction touches code too; and if a durable run store exists outside this repository, that evidence moves `MP-001` to `Unclear` and `AR-002`/`AR-003` get re-answered under Principle 5 with an isolated migration owner — not a branch in `RunService`.

If you give me the Solution Designer's run id or a reachable address, I'll deliver the result and attachments through the handoff route.
