# Post-design classification update — validation

## Scope and observed checks

- 11 definition-level regression tests passed: `package-validation.log`.
- All 10 engineering/Product skill packages passed the standard skill validator: `skill-validation.log`.
- Shared engineering principles and examples are byte-identical to the pre-update snapshot. Product team files are unchanged: `preservation-check.log`.
- Engineering roster and all surviving routing rules are unchanged. Only the requirements-only implementation rule was removed. Parent Product routing now explicitly permits evidence correction within the original user-requested engagement.
- The Solution Designer examples symlink resolves beside the principles symlink. Relative links were checked from both local and canonical-source paths.
- `git diff --check` passed. Changed untracked Solution Designer files were separately checked for trailing whitespace and table widths.

These are static/package checks and a manual contract walkthrough, not a live model run, runtime import or executed `send_message_to` integration test.

## Manual contract walkthrough

| Case | Expected behavior | Reviewed result |
| --- | --- | --- |
| New raw request | Read attached context, isolate authoring, investigate and draft requirements; no approval inferred | Consistent with Inputs/Bootstrap and phase 1 |
| Awaiting approval | Content-ready requirements remain Ready for Approval; no authoritative design or implementation handoff | Separate content and approval groups; phase 2 holds |
| Tiny local task | Approved intent → concise, evidence-backed design → classify completed solution | No requirements-only route remains |
| Completed Small/Medium Low design | Architecture Design Complete result; config selects implementation, with design carried | Surviving config rule and implementation input agree |
| Completed Large or High design | Config selects independent architecture review; reviewed package then reaches implementation | Review thresholds and forward rules preserved |
| Material classification evidence missing | Investigate or precise Blocked result, not Low/forward-ready | Main classification and recovery rules agree |
| Content-heavy change | Classify implementation/structural delta, not record count | Detailed architecture-standard guardrail retained |
| Low-risk implementation | Confirm post-design fields, implementation checks and self-review; configured direct API/E2E path | Implementation/config agree; no validation bypass |
| Low-risk API/E2E failure | Failure-origin review still occurs; carry design, not fabricated prior independent review | API/E2E and Code Reviewer contracts agree |
| New structural impact during implementation | Return Design Impact; designer investigates, revises design and reclassifies before dependent work | Implementation and Solution Designer recovery agree |
| Evidence-only clarification | Update owned evidence/rationale; unchanged intent does not require reapproval | Recovery table retained |
| Requirement Gap | Revise requirements, invalidate affected design, obtain approval, rebuild design and classify | No review finding silently becomes new approved scope |
| Requested Product output inconsistent | Product Design Requested / Result Correction with original request and precise gap | Explicit parent condition; no new mode/repository prescription |
| Unrequested Product help | No new Product handoff without user request | Requirements standard retains boundary |
| Informational architecture Pass | Record reference and stop; no bootstrap or duplicate implementation handoff | Input dispatch and recovery agree |
| Delivery receipt incomplete | Blocked / Delivery Receipt Evidence Gap follows existing delivery-correction rule | Distinct from unresolved user/external prerequisite |
| Delivery receipt after cleanup | Verify durable returned evidence; write separate reporting result and link finalized artifacts read-only | No worktree recreation or repeated finalization |
| Bootstrap failure | Persist precise blocker in safe reporting workspace, not task drafts in shared checkout | Isolation precedes task-document creation |
| Zero or multiple matching handoff rules | Return to caller for zero; apply every actual matching rule otherwise, then stop | Generic handoff convention retained |
| File-backed handoff | Persist full context/result before rule lookup; record applied route; mention and attach same absolute path | Shell and skill agree with README; not live-executed |

## Two-pass review

Macro pass: the user-approved sequence is consistent across the Solution Designer,
its templates, team config, README and downstream artifact contracts. Conditional
recipient policy no longer lives in the Solution Designer's main skill or design
reference/template. Requirements approval, specialist boundaries and conditional
independent reviews remain intact. No new runtime state layer was introduced.

Micro pass: readiness and approval terminology separated; QR/use-case traceability
slots added; bootstrap metadata aligned; maintenance-oriented example wording
removed from the main workflow; obsolete self-handoff and early-classification
branches removed. Shared examples were not shortened. Useful safeguards for user
approval, evidence, isolation, migration, reviewer scope and finalization remain.

Remaining limitation: this does not certify live agent interpretation, attachment
parameter behavior, or all downstream prompts' compliance with every README rule.
Downstream edits were limited to the changed design/classification artifact contract.
