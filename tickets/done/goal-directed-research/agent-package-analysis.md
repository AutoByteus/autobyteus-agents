# Analysis — remove artificial research-count stops

- Status: **Completed analysis; approved correction ready to apply**
- Operation: `update`; intent: `repair`
- Package type: `team`
- Target: Supervised Research Team, `agent-teams/supervised-research-team/`
- Request: `autobyteus-agents-8`, delegated 2026-10-28; follows creation Task 5.
  User explicitly rejects total-return limits and fixed no-progress-count stops,
  including the proposed two-return extension. No confirmation is required.
- Baseline: fetched `origin/main`, `1ae93e344410e8a9425bd23e122af426ed12e029`.
- Scope: both skills, common contract, continuation route, human discovery docs,
  regression evidence, and the matching Creator anti-pattern's incident/detection.
- Excluded: real research, study edits/restart, duplicate production team,
  publication/external contact, platform changes, unrelated packages/local settings.

## Files read and ownership

Full read of all package files: `team.md`, `team-config.json`, both members'
`agent.md` and `agent-config.json`, `research-supervision/SKILL.md`,
`evidence-research/SKILL.md`, and canonical `shared/research-contract.md` (also the
content of both skill symlinks). Roster, identity, tools and topology are unchanged.
The shared contract owns artifacts/evidence standards; supervisory decisions live
in the supervisor skill; the researcher owns execution/reporting; config owns routes.

Repository `AGENTS.md`, authoring/design/skill principles, Creator workflow,
anti-patterns, analysis/result contracts, previous creation design/result/validation
and its scripts were read in this task or the preceding creation turn and compared
to the unchanged base. This is not a fresh audit of unrelated packages.

Read the real study's `study.md`, `terminal-assessment.md`, `cycles/C006/review.md`
and `adoption-observations.md` under the supplied private study path, read-only.
The relevant incident: six reviewed returns, useful work remaining, no-progress
streak zero, yet the package-imposed return allowance forced a stop and another
numbered allowance proposal. Private scientific content is neither copied into
this public repository nor used as test data.

## Flow and root cause

Original goal → supervisor copies default quotas into study → bounded research
assignment → researcher report → independent evidence review → supervisor compares
counters → terminal counter stop → route no longer matches Continue → user must
intervene. Thus the package, not a locally invented study rule, owns the failure.
The original source explicitly required the default; the study followed it.

The requested fix is the right ownership boundary. Raising six, granting two more,
or resetting counters would preserve the defect. Splitting more roles or adding a
watchdog would not fix it and is outside this request.

| Finding | Canonical evidence/owner | Change |
| --- | --- | --- |
| Arbitrary quota replaces goal-directed supervision | Supervisor skill intake: six returns, two no-progress returns; decision section treats either as Budget exhausted | Remove both thresholds and extension policy. Continue on informative authorized work; review/revise unproductive methods rather than count-stop. |
| Generic budget wording can preserve the old quota downstream | Shared study record requires budget used/remaining; researcher says batch limit; Continue route requires remaining budget | Keep historical counts and actual resources, not a remaining-return allowance. Distinguish command timeouts from study termination. Route on goal, permissions, actual resources and one outstanding assignment. |
| Existing stopped studies carry obsolete policy forward | Resumption preserves counters but has no supersession rule | Keep dated evidence/assessments and numbering. Record the approved removal in current state; no reset, numbered extension or repeated permission question. |
| Ambiguous terminal category | Budget exhausted conflates count thresholds and actual limits | Remove the artificial terminal state from current decisions; genuine resource/dependency failures use Blocked or Decision needed, with evidence and restart condition. Historical statuses stay historical. |
| Previous tests validated the defective policy | Creation Case C expects an artificial budget stop | Preserve archived evidence as baseline; clearly mark old testing/docs superseded. Add final-text tests that cross the old thresholds and preserve real stops/review. |
| Route definitions may be snapshotted in existing runs | Installed `TeamRunContext`, `TeamRunConfig`, execution-tree builder freeze/store handoffs; restore reconstructs tree handoffs; `get_handoff_rules` returns collaboration's outgoing snapshot | Verify reload/skill-notice and old-route behavior in an isolated existing run. Report exact supported continuation to the manager; do not edit production runtime records. |

## Preserved behavior and mapping

- Researcher authors; a different supervisor checks original requirements and raw
  evidence before completion. Negative/inconclusive findings, limited claims,
  manuscript-readiness distinction and transparent incompleteness remain.
- Evidence/cycle files are not overwritten. Counts remain historical accounting.
- Explicit user stops, actual access/compute/time/cost limitations, safe experiment
  timeouts, and meaningful blocker/decision escalation remain. No paid/cloud work,
  contact or publication authority is added; no automatic crash recovery is promised.
- Existing addresses, coordinator, skill attachments, normal message handoffs,
  duplicate-assignment protection and terminal caller fallback remain.
- Old count-based Budget exhausted → superseded restriction, not completion or an
  invitation to reset history. Actual resource exhaustion → Blocked/Decision needed
  if no useful authorized work remains. Individual experiment timeout → checkpoint
  and review; it alone does not end an otherwise actionable study.

## Planned edits and verification

Edit the two skills, shared contract, supervisor→researcher condition, team summary
and README wording. Extend anti-pattern 13 (proxy-triggered blocking) with the count
incident and scan all package instructions for similar count gates, recording other
candidates without changing their unreviewed behavior. Mark old creation narratives
and replay recipe historical; leave old raw artifacts and fixture scripts intact.

Tests use only synthetic threshold-classifier/missing-file studies in an isolated
installed AutoByteus server. First replay the old stop at return six, then reload
final files and send the user's new direction to that **same test run**, verifying
continued work and unchanged run IDs even if routing remains snapshotted. Separately
exercise a repeated-no-progress history with a useful revised method, a genuine
missing-data blocker, and an explicit user pause. All live work is bounded by the
fixture's finite question and an external test timeout, not a replacement package
cycle quota. Check source/evidence fingerprints, actual tools/messages and cleanup.

Static baseline: JSON/frontmatter/links/skill validation pass; source search confirms
the count gates. Baseline structural validity did not prevent the behavioral defect.
Final checks include state/route consistency, removal of active counter-based stops,
preserved safeguards and exact correspondence between tested and delivered text.

## Workspace and approvals

The original checkout has local changes to team config (launch model/defaults and
serialization), team summary (final newline), and Creator config. Before edits,
all three were preserved unchanged on `preserve/autobyteus-agents-8-local-settings`
(commit `70a3cef7217a315a3b480f3e3d162020e55e3d3d`) and a private patch at
`/home/autobyteus/workspace/autobyteus-agents/.git/agent-package-backups/autobyteus-agents-8/working-tree.patch`.
They remain in the user's checkout while the fix is developed separately. Preserve
and reapply those settings when updating main; do not publish the backup branch.

No scope/permission question is unresolved. The user already authorized this repair.
Next: apply and validate the correction, merge and update the checkout, then report
resume guidance to the manager without restarting the real research ourselves.
