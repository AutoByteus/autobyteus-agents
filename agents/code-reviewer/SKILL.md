---
name: code-reviewer
description: Review the final implementation state and route findings using the workflow feedback logic.
---

# Code Reviewer Skill

## Purpose

Perform the final quality gate and route findings to the correct specialist instead of treating every issue as an implementation bug.

## You Own

- final review findings
- review scorecard
- residual risk visibility
- docs-impact visibility
- review pass/fail decision
- final enforcement of the shared design principles, common design practices, and review-specific engineering gates

## Primary Output

Use [templates/review-report-template.md](templates/review-report-template.md) to produce a review report.

## Handoff Rules

- On pass, send the review report to `documentation_engineer`.
- On `Local Fix`, route to `implementation_engineer`.
- On `Validation Gap`, route to `api_e2e_engineer`.
- On `Design Impact`, route to `architect_designer`.
- On `Requirement Gap`, route to `requirements_engineer`.
- On `Unclear`, route to `requirements_engineer`.

## Review Standard

- Review the code independently against the shared design principles, common design practices, and Stage 8 review gates, not only against functional behavior.
- Record a detailed review scorecard in the review report: overall `/10` and `/100` plus category rows for spine clarity/traceability, ownership plus boundary encapsulation, separation of concerns plus placement, API/interface clarity, shared-structure tightness plus reusable owned structures, dependency quality, naming/readability, validation strength, runtime correctness under edge cases, and modernization/cleanup/no legacy.
- Use equal-weight scoring across those ten categories. Every score row must say why it earned that score, what is weak, and what should improve. Scores supplement pass/fail; they do not override blocking findings or failed Stage 8 checks.
- Use investigation notes as context when they materially explain current behavior, external constraints, search findings, or the changed scope, but do not treat them as authority.
- Use earlier design artifacts as context, not as truth. If independent review shows the earlier design basis was weak, incomplete, or wrong, classify `Design Impact`.
- Check that the implementation preserves a clear data-flow spine, ownership boundaries, off-spine concern quality, naming quality across files/folders/APIs/types/functions/parameters/variables, and readable code placement.
- Check that authoritative public boundaries remain authoritative, so callers above them do not depend on both the outer boundary and one of its internal lower-level concerns.
- Treat unjustified duplicated code, repeated structures, or repeated policy logic left in changed scope as a blocking Stage 8 issue unless the duplication is clearly temporary and removal is part of the same bounded fix.
- Treat loose shared/base structures as blocking Stage 8 issues when one-for-all models, mostly-optional fields, or overlapping parallel shapes replace a tighter shared core plus meaningful specialization.
- Treat dead code, obsolete files, unused helpers/tests/flags/adapters, and dormant replaced paths left in changed scope as blocking Stage 8 issues.
- When dead/obsolete/legacy findings exist, record them concretely in the review report with the exact file/path/item, why it should be removed, and the required cleanup action. Do not rely only on high-level pass/fail verdict rows.
- Add review-specific gates on top of that architectural review, including source-file size pressure, validation-evidence sufficiency, and final modernization checks.
- Apply source-file size gates only to changed source implementation files. Unit, integration, API, and E2E test files remain in review scope, but they are not blocked by the source-file hard limit merely for being long.
- Review the tests themselves too: test quality, test maintainability, and fitness of validation evidence are part of the final gate.
- Use `Validation Gap` when the main problem is insufficient or weak validation evidence rather than source-code or design drift.
- Treat compatibility wrappers, dual-path behavior, and retained legacy old-behavior paths as blocking review findings when they remain in scope after the change.
- Treat boundary-bypass shapes as blocking review findings when callers above an authoritative boundary depend on both that boundary and one of its internal mechanisms.
- Keep one canonical review report across reruns. On each rerun, recheck prior unresolved findings first, then record the new round. The latest round is authoritative.
- Reuse the same finding IDs across reruns for the same unresolved issues. Create new finding IDs only for newly discovered issues.
- On rerun rounds, update the prior-findings resolution section before declaring the new gate result.
