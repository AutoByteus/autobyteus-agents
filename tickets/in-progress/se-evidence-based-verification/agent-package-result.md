# Agent Package Creation Result

- Status: `Completed` (pending the user's approval and merge)
- Operation: `update`
- Package type: `team` (Software Engineering Team)
- Update intent: `repair`
- Target package: `agent-teams/software-engineering-team/`
- Request/reference: Project Task `project_task_c2b4ff85-…` (user, 2026-10-13). Analysis: [agent-package-analysis.md](agent-package-analysis.md).

## Why delivery always waited

1. Its skill had an unconditional "wait for explicit user verification" before finalizing, repeated across the team.
2. Nobody owned judging the evidence.
3. There was no route from delivery to API/E2E for more evidence, so waiting for the user was the only option.
4. The release decision was taken at the manual check.

The API/E2E evidence was already decision-grade; nothing downstream was told to use it.

## Summary

- **Delivery `SKILL.md`, new "Verify From Evidence":**
  - the delivery engineer judges whether the evidence proves the change works, from the critical acceptance criteria, confidence, the journeys run and their evidence, mocks, and what wasn't tested;
  - if it does, it records the judgement and continues without waiting;
  - if not, it names the gap and asks API/E2E (or the defect's owner), then judges again;
  - it asks the user only when evidence can't settle it, saying why: taste or feel no approved design settles, things tests can't reach (the user's own accounts, machines, nodes), or a check the user asked for;
  - the user can always ask to check;
  - two examples.
- **Delivery `SKILL.md`, new "Release Decision":** release is a product decision separate from verification. Release only when the user asked, or the release guide makes it the default; otherwise finalize and say a release is available. Release safety rules unchanged.
- **Delivery `SKILL.md` Purpose, You Own and workflow lines; `agent.md`:**
  - "user-verification hold" and "user signal" become verification from evidence;
  - re-verification after the target advances uses the rerun evidence;
  - the terminal message carries the verification record and the release decision;
  - routing names `/api_e2e_engineer` for missing or weak evidence.
- **Delivery templates:**
  - the report's "User Verification" becomes "Verification" (evidence judgement, evidence relied on, more evidence requested, user check yes/no and why), plus a new "Release Decision" section, and Final Status updated;
  - the revision record is updated to match.
- **`team-config.json`:**
  - new route `/delivery_engineer` → `/api_e2e_engineer` when the evidence is too weak;
  - the delivery → designer terminal rule says "after verification (from the validation evidence, or the user's check where one was needed)".
- **API/E2E:**
  - the skill marks any behavior only the user can check, and why, and accepts delivery's request for more evidence;
  - the investigation's "Not Tested / Infeasible / Deferred" table gets an "Only The User Can Check?" column;
  - the execution report's latest result gets "Behavior only the user can check, and why".
- **Solution Designer:** the step-2 safety net is "the verification before finalization"; the receipt check verifies the "verification record" instead of an "explicit user-verification reference".
- **`team.md`:** the delivery engineer owns "verification from the evidence, finalization and the release the user or the release guide decides".

## Worked examples

**Sufficient evidence, no manual check.**
1. A ticket changes a settings page.
2. API/E2E proves every acceptance criterion through the real UI, with screenshots and DOM assertions, at 96% confidence, no category below 90%, and nothing marked "only the user can check".
3. The delivery engineer integrates the latest base, reruns a smoke check, and judges the evidence sufficient.
4. It records that judgement and finalizes.
5. The user didn't ask for a release, and the release guide's default is no release, so it finalizes without releasing and says a beta or stable release is available.
6. It returns `Delivery Completed` to the designer.

**The user still checks.**
1. A ticket changes how the app connects to the user's remote nodes.
2. API/E2E proves the connection logic against an emulated node, but marks the real-node connection "only the user can check: the user's own nodes".
3. The delivery engineer asks the user to check that connection, saying why, and finalizes after the user confirms.

**Evidence too weak.**
1. The report proves the API but not the UI journey for a critical acceptance criterion.
2. The delivery engineer sends the gap to `/api_e2e_engineer` (new route), which adds the journey, and the delivery engineer judges again.
3. The user is not asked.

## Proposed for the AutoByteus project's `RELEASE.md` (not edited here)

"Release Decision" currently says "The user decides at verification." Proposed: "The user decides, in the request or any time before finalization. Without a decision, finalize with no release (the default)." This keeps the existing default and removes the tie to a manual verification step.

## Preserved behavior

- Integration refresh and rerun, docs sync, finalization order, the release guide's precedence, OS-portable names, pipeline watching, partial releases, never moving a published tag, cleanup and blockers.
- The user can always ask to check.
- Requirements and Product visual approvals upstream are unchanged.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | Pass | `quick_validate.py` → "Skill is valid!" for delivery-engineer, api-e2e-engineer and solution-designer. |
| Changed JSON parses | Pass | `team-config.json`; the diff shows only the edited rule and the new route. |
| Member refs and routes | Pass | The new route's `from` and `to` are existing members; the return path is the existing API/E2E → code reviewer or delivery. |
| Stale wording | Pass | No "user verification", "user signal" or "verification hold" left in the team. |
| Ownership and cross-file consistency | Pass | Verification is owned by the delivery skill. API/E2E marks user-only checks. The designer's safety net and receipt, `team.md` and the config use the same terms. |
| Scope/diff review | Pass | 10 files (+88/−32) and this ticket folder. |
| Final review against the standard and anti-patterns | `Pass` (round 2) | Round 1 clarified that in the second example the delivery engineer finalizes after the user's check. Round 2 was clean. Checked anti-patterns 3, 4, 6, 8, 12 and 14: the targets stay in the API/E2E skill and are not restated. |
