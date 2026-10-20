# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `agent` (Agent Package Creator and its bundled skill)
- Update intent: `optimize`: the creator's own package follows its own principles
- Request/reference: the user, 2026-10-19; analysis `agent-package-analysis.md`

## Changes

- **One owner for validation:** `SKILL.md` step 4 owns the checks.
  - Principles §9 and skill-authoring's "Validate the skill as loaded" now point to it.
  - Step 4 absorbed the two checks only skill-authoring had: one effective trigger and behavior, and comparing the old and new contract.
- **One owner for handoff design:** step 3 points to principles §2 and §6. §2 now lists what a handoff carries (moved from step 3).
- **Real-use check:**
  - step 4's new "Real use" item: check routing, handoff, decision or recording changes in a live app, on the final text;
  - `references/live-checks.md` (new): the AutoByteus recipe, from importing the package to cleanup;
  - `scripts/send-message.mjs` (new): sends a member a message in a team or Org run.
- **Frame and facts:**
  - principles §4 opens with "Design a package like software", which maps the principles to architecture, spine, single owner, interfaces, refactor with comparison and tests, plus the two differences: an interpreting model, and silent bugs;
  - §7 records the observed delegated-copy facts.
- **Anti-patterns:**
  - an index; entries ordered by number in each section;
  - 23 merged into 4 ("One rule or fact in several places"; the index keeps 23 as merged);
  - 7 extended with "trust a capable model; don't script every step".
- **Merge rule:** when re-applying local work conflicts, keep the merged text and re-apply the local change by hand.
- **One home per kind of record** (added 2026-10-20, after the follow-ups discussion on Task autobyteus-agents-34):
  - principles §2: records of one kind that several roles produce get one file the roles add to, and their own documents cite the IDs; moving records into one home is not duplication, copying them is. §4's software frame: "one table per entity".
  - anti-pattern 4 renamed "One rule, fact or kind of record in several places", with the incident and a detect check (count the documents that hold one kind of record).
  - step 1 and new anti-pattern 24: when a request proposes a fix, map the information or flow across every role first, then judge the proposal.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | Pass | `quick_validate.py`: valid |
| Links | Pass | 0 broken |
| Script | Pass | `node --check`; a real run against an isolated app delivered "Script test only…" to a team member, which replied "OK" |
| Old to new | Pass | Every validation item from §9 and skill-authoring is in step 4; every part of the old step 3 handoff paragraph is in §2 or §6; entry 23's incident, instead and detect are in entry 4; no reference to entry 23 elsewhere |
| Live check, kind of record | Pass | `evidence/LC-KR-old-text.md`, `evidence/LC-KR-new-text.md`: a fresh Creator asked a neutral question about the SE team's follow-ups recommended one `follow-ups.md` and one sender on both texts; on the new text it cited the rule ("One kind of record, one home"). So the first miss came mainly from anchoring on the proposed field, which anti-pattern 24 now covers. |
| Final review | Pass | Round 1: the skill-authoring pointer still repeated a step 4 rule (cut). Round 2: the old-to-new map found the handoff field list missing (moved to §2). Round 3: no findings. |
