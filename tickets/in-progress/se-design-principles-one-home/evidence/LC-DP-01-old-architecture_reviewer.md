# LC-DP-01 (old text): architecture_reviewer on the sample ticket 'archive-runs' with five planted design flaws
# AutoByteus 1.5.7-beta.4 isolated instance, claude_agent_sdk, claude-opus-5, 2026-10-20; package: origin/main before this change
## Request
From /solution_designer: Architecture Design Complete for ticket "archive-runs" (task_size Medium, architectural_risk High), ready for independent architecture review.

Repository: /tmp/dp-live/old/runs-app (main). Package: /tmp/dp-live/old/runs-app/tickets/in-progress/archive-runs/requirements-doc.md and /tmp/dp-live/old/runs-app/tickets/in-progress/archive-runs/design-spec.md. Investigation notes, solution revision record and supplements: N/A for this small sample ticket.

Write your design review report in the ticket folder, then reply with your decision and the list of findings (one line each, with the principle or rule each one breaks).
## Reply
The address isn't reachable and no sender run id was supplied with the task, so I'm reporting the result here.

## Decision: **Fail** — `Design Impact` (AR-010 also a `Requirement Gap`)

`ARCH-REV-001`, round 1. Applicable `SR-*`: `N/A`. Classification preserved and accepted: `task_size=Medium`, `architectural_risk=High` — the independent review gate was correctly selected, though the spec's persistence-only risk rationale doesn't hold; High stands on the shared-contract and ownership-boundary grounds instead. Nothing was sent to implementation.

**Artifacts written:**
- `/private/tmp/dp-live/old/runs-app/tickets/in-progress/archive-runs/design-review-report.md`
- `/private/tmp/dp-live/old/runs-app/tickets/in-progress/archive-runs/architecture-review-revision-record.md`

Behavior basis is `Contradicted`: the design's REQ-002 read path (`Run page -> RunController -> RunRepository`) contradicts the spine it declares, and its REQ-001 finished predicate rests on premise `MP-001`, which is `Not Reachable` on current evidence.

**Findings (10), with the principle or rule each breaks:**

- **AR-001** (Design Impact, High, REQ-002/AC-002) — `RunController` takes both `RunService` and its internal `RunRepository`. Breaks Core Principle 3, Authoritative Boundary Rule; the spec normalizes the bypass ("because the service has no read method for it"), which the Derived Check on strengthening the boundary forbids.
- **AR-002** (Design Impact, High, REQ-001/AC-001) — `archive` branches on `status === "done"` OR legacy `finished`. Breaks the "no backward compatibility" Derived Check and Core Principle 5's ban on version-specific branching in current business logic (Example 7 Bad Practice shape).
- **AR-003** (Design Impact, High, REQ-001/AC-001) — that machinery rests on an unsupported premise. Breaks Core Principle 6's Independent Origin Rule: the only witness for "old stored runs" is the branch proposed for them. `MP-001` = `Not Reachable` — `RunRepository` is a process-local `Map`, and `finished` appears nowhere else in the repo.
- **AR-004** (Design Impact, Medium, REQ-001/AC-001) — "No data migration / read both" is not a transition decision. Breaks Core Principle 5's requirement to name one of the five decisions with evidence.
- **AR-005** (Design Impact, Medium, REQ-001) — `RunRecord` serves three subjects with eight optional fields, and this change adds a ninth. Breaks the shared-base overreach and shared-structure tightness triggers, plus the shared-folder trigger.
- **AR-006** (Design Impact, Medium, REQ-001) — `getById` "infers the kind from the id prefix"; no prefix convention exists and the method does no inference. Breaks the ambiguous-boundary trigger and the `getAgent…`/`getTeam…` guide rule.
- **AR-007** (Design Impact, Medium, team rule) — dead `legacy-run-export.ts` in the change scope, with "Removal plan: none". Breaks Core Principle 7, No Dead Code.
- **AR-008** (Design Impact, High, REQ-001+REQ-002) — no change posture, root-cause classification or refactor decision. Breaks Task Design Health Assessment; its absence is why AR-001/002/005 were recorded as the target design.
- **AR-009** (Design Impact, Medium, REQ-002/AC-002, AC-001) — one undocumented chain, no inventory row, no node ownership, no spine for the second use case, no rejection return path. Breaks Core Principle 2.
- **AR-010** (Requirement Gap — User Approval Required, Medium) — no Scope Guardrail, and no requirement approves "old stored runs keep working"; the design adopts that obligation itself. Breaks Core Principle 1. Named as an ambiguity, not prescribed: if the user confirms no durable store is in scope, AR-002/003/004 resolve by deletion.

**Residual risk worth flagging:** `implementation-handoff.md` already exists and `src/runs/*` and `src/shared/record.ts` contain the reviewed design verbatim — the review gate ran after implementation, so these findings need code rework as well as spec rework, and there is no test runner to catch regressions.

**Action needed from you:** the result is owned by the Solution Designer but could not be delivered — `get_handoff_rules` returned no rules, `/solution_designer` is not reachable from here, and the task message carried no sender run id. Please route the two artifacts above to the Solution Designer, or give me a reachable address or run id and I'll send it.
