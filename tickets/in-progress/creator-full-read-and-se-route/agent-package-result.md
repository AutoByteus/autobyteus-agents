# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `agent` (Agent Package Creator) and `team` (Software Engineering Team)
- Update intent: `repair`
- Target package: `agents/agent-package-creator/`; `agent-teams/software-engineering-team/`
- Request/reference: Project Task `project_task_11fd9f8d-…` (user, 2026-10-13). Analysis: [agent-package-analysis.md](agent-package-analysis.md).

## Summary

### Part 1: the Agent Package Creator reads the whole package

The rule existed in weak form in four places. It is strengthened at its owner and the copies point to it:

- **`SKILL.md` "Inputs and operation":** before `analyze` or `update`, "build the full picture, as an experienced reviewer would before judging anyone's work":
  - read in full every file of the affected package, the Team or Org files, the shared files they link to, and the sibling members the change affects;
  - "A search shows where a phrase is, not how the package works";
  - base findings and designs on that read, and list the files read in the analysis.
- **`package-design-principles.md` §9:** points to the skill's rule instead of restating it.
- **`package-anti-patterns.md` #10:** extended for the same cause and retitled "Deciding from a stale or partial view of the package". It adds the PR #45 incident, the instruction to read the whole package including linked shared files, and a Detect check that compares the analysis's files-read list with the package's files and links.
- **`result-and-handoff-contract.md` `baseline` and the analysis template:** "Files read in full", so every analysis shows the read was done.

### Part 2: route from the test-code review to the implementation engineer

- **`team-config.json`:** new `/code_reviewer` → `/implementation_engineer` rule: "When post-API/E2E test-code review finds an implementation-owned Local Fix that this change caused or that blocks an in-scope acceptance criterion. Unrelated pre-existing problems stay follow-ups."
- **code-reviewer `SKILL.md`:**
  - the test-code rules say a source defect the change caused, revealed by the changed tests (for example an assertion weakened so a wrong result passes), is an implementation-owned `Local Fix` that returns through source review, API/E2E and this review;
  - the Handoff Rules name `/implementation_engineer` for it.
- **Test-review report template:** a `Local Fix` may be implementation-owned in that case.
- **Return path:** unchanged and already present. Implementation → code reviewer when a reviewer-requested Local Fix is complete on the Large/High route, then API/E2E, then the test-code review.

## Preserved behavior

- `analyze` changes nothing, and the analysis comes before edits. The anti-pattern-entry rule and the final review loop are unchanged.
- All existing SE routes are unchanged. Ticket Scope still applies: unrelated pre-existing problems stay follow-ups.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | Pass | `team-config.json` (27 → 28 rules). |
| Skill validator | Pass | `quick_validate.py` → "Skill is valid!" for `agent-package-creation` and `code-reviewer`. |
| Markdown links and anchors | Pass | The new `../SKILL.md#inputs-and-operation` links resolve. |
| Member refs and rooted routes | Pass | The new route's `from` and `to` are existing members. |
| Ownership and cross-file consistency | Pass | One read rule in the skill; §9 and anti-pattern 10 point to it. The route matches the reviewer's skill, its template, the implementation engineer's inbound `Local Fix` handling, and the existing return route. |
| Scope/diff review | Pass | 8 files (+15/−10) and this ticket folder. |
| Final review against the standard and anti-patterns | `Pass` (round 2) | Round 1: anti-pattern 10's incident ran past the catalog's "single line" rule, so it was shortened; the route condition named a skill section ("by Ticket Scope"), so it now states the result plainly. Round 2 was clean. |
| Anti-pattern 10 detection sweep | N/A | Its new check compares an analysis's files-read list, a field that starts with this change; earlier analyses have none to compare. |

## Risks and notes

- The main checkout has uncommitted local edits to `package-anti-patterns.md` (entries 15–16). This PR edits entry 10 in the same file, so after merge a fast-forward of that checkout stops until those local edits are committed or set aside. Git refuses to update a file with local changes, even in different lines.
