# LC-DP-01 (old text): code_reviewer on the sample ticket 'archive-runs' with five planted design flaws
# AutoByteus 1.5.7-beta.4 isolated instance, claude_agent_sdk, claude-opus-5, 2026-10-20; package: origin/main before this change
## Request
From /implementation_engineer: implementation of ticket "archive-runs" is ready for implementation source review (task_size Medium, architectural_risk High).

Repository: /tmp/dp-live/old/runs-app (main, last commit). Package: /tmp/dp-live/old/runs-app/tickets/in-progress/archive-runs/requirements-doc.md, design-spec.md, implementation-handoff.md. Architecture review artifacts: N/A for this sample.

Write your code review report in the ticket folder, then reply with your decision and the list of findings (one line each, with the principle or rule each one breaks).
## Reply
Review complete. Both artifacts are written to the ticket folder. I could not deliver a handoff message: `get_handoff_rules` returned no rules, and `/implementation_engineer` is not an address I can talk with (no sender run id was supplied), so the result is reported here.

**Artifacts**
- `/tmp/dp-live/old/runs-app/tickets/in-progress/archive-runs/code-review-report.md`
- `/tmp/dp-live/old/runs-app/tickets/in-progress/archive-runs/code-review-revision-record.md` (`CRR-001`)

## Decision: Fail — does not advance to API/E2E. Score 3.6/10 (36/100)

- **Classification:** `Design Impact` (primary) → **Solution Designer**, for CR-001/002/003/004/006; `Local Fix` (secondary) → implementation engineer, for CR-005.
- **Return route is the Solution Designer, not implementation:** four of the five code findings are decisions `design-spec.md` states explicitly (lines 11–15), so re-implementing against the current spec would reproduce them.
- **Behavior basis: Confirmed.** AC-001 and AC-002 both behave as approved (finished run archives, unfinished refused with the exact message `run not finished`, archived state readable). The failure is structural, not behavioral.

## Findings

- **CR-001** — `RunController` is injected with both `RunService` and `RunRepository`, and `isArchived` reads `archived` straight from the repository (`run-controller.ts:2,4,7`) — breaks **Core Principle 3, Authoritative Boundary Rule** (no boundary bypass / no mixed-level dependency); Derived Checks require strengthening the boundary rather than normalizing the bypass.
- **CR-002** — `r.status === "done" || (r as any).finished === true` on the normal archive path (`run-service.ts:8-9`) — breaks **Derived Checks "no backward compatibility or legacy retention"** and **Core Principle 5** (version-specific branching/dual reads in current business logic are prohibited; no evidence-backed transition decision exists).
- **CR-003** — one `RunRecord` for agent runs, team runs and team members with every type-specific field optional, placed in `src/shared/` (`shared/record.ts:2-7`) — breaks **Derived Checks shared-structure tightness** (no one-for-all base of mostly-optional fields), the **Shared-base overreach trigger** and the **Shared-folder trigger**; `record.ts` also names no owner.
- **CR-004** — `RunService.getById(id)` serves both subjects, has no caller, and its comment claims id-prefix inference the body never performs (`run-service.ts:13-14`) — breaks the **Ambiguous-boundary trigger** and the guide's split-reads-by-subject rule (Example 6), plus **Core Principle 7** and naming-to-responsibility alignment.
- **CR-005** — `src/runs/legacy-run-export.ts` `exportCsv()` is unreachable (no importer; the JSON export its comment credits does not exist) — breaks **Core Principle 7, No Dead Code**, scoped by ticket-scope.md to touched files and modules; the design's removal plan says "none".
- **CR-006** — `design-spec.md` has no Task Design Health Assessment, behavior map, spine inventory with owners, evidence-backed transition decision, or removal plan for a Medium/High ticket — breaks the **Task Design Health Assessment requirement** and the recording rules of **Core Principles 2, 5 and 7**.

**Rejected** (no score, no routing): concurrent-archive race (two supported actions don't make a concurrent workflow, Core Principle 6), in-memory store durability (no approved requirement), unspecified not-found error (reviewer preference). **Held for evidence:** the repo has no test harness at all, so two test-readiness checks are `Unclear` — the Fail does not rest on them. **PR-001** (pre-change runs stored with `finished: true`) is `Unclear` — no persistence, loader or writer of `finished` exists and the store is a process-local `Map` — so CR-002 asks only for removal of the fallback, and I prescribed no migration machinery. **Follow-ups: none** — everything found sits inside the Change Scope.
