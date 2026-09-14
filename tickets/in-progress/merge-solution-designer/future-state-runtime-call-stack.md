# Future-State Instruction Execution v1

## Current Approved Revision — Design Before Classification

The later user clarification supersedes the original requirements-only bypass:
Solution Designer completes investigation and requirements, obtains explicit user
approval, completes a proportionate design spec, then classifies task size/risk and
uses configured handoff rules. Every implementation package carries design;
Small/Medium Low-risk packages may bypass independent reviews, not design.
The current implementation and validation record is
`.codex/artifacts/solution-designer-consistency-audit/optimization-analysis.md` and
its linked `validation.md`. Earlier sections below describe the prior merge round
and are historical where they conflict with this revision.

These are to-be agent/message paths, not observed runtime traces.

## UC-001 — Department intake and completion (DS-001)
User -> /department_head [Work Requested; preserve original request/context]
 -> /software_engineering_team/solution_designer [bootstrap/discovery; owns task artifacts]
 -> selected engineering specialist -> /software_engineering_team/delivery_engineer
 [explicit verification + all applicable finalization gates]
 -> /software_engineering_team/solution_designer [verify same package and completion evidence; Terminal]
 -> /department_head [return existing result; no redispatch]
Standalone Engineering: /solution_designer is direct ingress; no parent rule means return terminal/blocked result to caller.

## UC-002 — Approval/refinement (DS-004, DS-003)
SolutionDesigner.requirements -> investigate supported scenarios -> requirements/AC/readiness
 -> user approval [hold if missing] -> assess structural impact
 -> architecture investigation/design [when selected]
 -> new technical evidence only: update investigation/design + SR entry, approval unchanged
 -> changed intent: mark affected basis unapproved, revise requirement + obtain explicit renewed approval
 -> rebuild affected design/review input, classify, forward cumulative package.

## UC-003 — Routes (DS-001, DS-004)
Approved + Small/Medium + Low + no structural trigger -> Approved Direct-Implementation -> Implementation.
Approved + architecture-needed or uncertain -> internal architecture investigation/design, not message to self.
Design complete + Small/Medium + Low -> Architecture Design Complete -> Implementation.
Design complete + Large or High -> Architecture Reviewer -> Pass -> Implementation; informational pass -> Solution Designer, no duplicate forwarding.
Review Fail/Blocked -> Solution Designer recovery; no implementation.

## UC-004 — Product clarification (DS-002)
Solution Designer [user-requested Product assistance; focused context]
 -> sibling Product Prototyper [owns mode/repo/ticket/baseline and visuals]
 -> Solution Designer [returned Product outcome; user clarification/approval; integrate intended behavior]
 -> resume requirements or affected design. No Department Head relay.

## UC-005 — Downstream recovery / blocks (DS-003)
Implementation, Architecture Reviewer, Code Reviewer, Delivery -> Solution Designer for Requirement Gap/Design Impact/Unclear.
API/E2E upstream uncertainty before execution -> Solution Designer; execution failure -> Code Reviewer for failure-origin classification.
Local fixes retain Implementation/API/Delivery ownership.
Solution Designer unresolved user/external blocker -> Department Head [return blocker, no retry loop].
Delivery failure/awaiting verification -> no Delivery Completed, so no Terminal.
