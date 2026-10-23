# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `agent`
- Update intent: `repair` (the PM verifies and closes delivered Tasks itself; reuse a copy when moving a Task)
- Target package: Project Task Manager, `agents/project-task-manager/` (`autobyteus-agents`)
- Scope included: PM skill steps 5, 6, 7 and one scenario row; one phrase in `agent-orgs/autobyteus-org/org.md`; one anti-pattern entry and two sentences in the Creator's live-check guide (the mistake made during this check).
- Scope excluded: PM `agent.md`, `agent-config.json` (the user's local edit untouched), templates; all Software Engineering Team files.
- Request/reference: Task autobyteus-agents-55 and the PM's follow-up message (2026-10-23).

## Summary

The chain behind autobyteus-275: the PM wrote "the user's check" into the Task's done, the Solution Designer turned it into an acceptance criterion and reported it as "the open item before you close", and the PM waited, even after it had verified the merge and the release. The PM's skill already said not to wait for a user check the user did not ask for. It gave no positive duty to verify the work itself, and it still treated the user's check as a valid done item.

Changes:
- **Step 5:** a release stays a separate decision. The team's test evidence and the PM's own check verify the work, so the user's check is not part of done.
- **Step 7, check:** the PM checks the result itself: it reads the receipt and test report and verifies with read-only checks (git, a release or image, a read-only tool call that shows the new behaviour). A user check named by the Task or the worker is the PM's when that evidence settles it. "I run it" is enough. The PM asks the user only what needs him (a product or scope decision, his own data or machine, how something looks to him), once, naming what to look at, and that question does not hold a finished Task open. When it closes, it says which evidence it used.
- **Step 7, move a Task:** delegate by ID to a copy on the board that did that kind of work; a new copy only when none fits or the user asks for one.
- **Aligned with 275 (v1.5.9-beta.2):** a follow-up to the same copy no longer needs its earlier Task closed, a report is matched by the Task key it names, and "a copy has one current Task" is removed.
- **Org summary:** "the user's checks" became "the delivery evidence".

Worker side: no change. The Solution Designer, Delivery and API/E2E rules already treat a user check as an exception and defer to what the Task asks for. Once the PM stops writing it into done, they stop reporting it. One note for a later tidy-up: the Solution Designer's receipt section still lists "explicit user verification" among Delivery's duties, which is older wording than Delivery's own "verification from the evidence".

## Ownership and design decisions

- What counts as done, how a result is verified, and when the user is asked: PM skill steps 5 and 7, with no new section.
- How a live check must not start real work: the Creator's `live-checks.md`, with the incident recorded in `package-anti-patterns.md` #28.

## Changed paths

### Modified

- `agents/project-task-manager/skills/project-task-management/SKILL.md`
- `agent-orgs/autobyteus-org/org.md`
- `agents/agent-package-creator/skills/agent-package-creation/references/live-checks.md`
- `agents/agent-package-creator/skills/agent-package-creation/references/package-anti-patterns.md`

### Added

- `tickets/in-progress/pm-evidence-based-closure/` (analysis, live-replay evidence, this result)

### Moved or renamed / Removed

- None

## Durable artifacts and evidence

- Analysis: `tickets/in-progress/pm-evidence-based-closure/agent-package-analysis.md`
- Validation evidence: `tickets/in-progress/pm-evidence-based-closure/live-replay-evidence.md`

## Approval state

- State: `Approved`: the user's direction is in the Task. The PM's message added the move rule.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | `N/A` | No JSON changed; `org-config.json` still parses. |
| Frontmatter and names align | `Pass` | PM skill frontmatter unchanged. |
| Links and anchors | `Pass` | `check-links.py`: 0 broken in both skills. |
| Wording comparison | `Pass` | `compare-wording.py`: only "each" dropped (the release and the user's check are no longer "each its own Task"); "unless" kept. |
| Live replay, 275 message | `Pass` | Old text held the Task open and asked for the user's OK. New text closed it, listed its evidence, read the receipt and said the user's verdict does not hold it open (A-new, A3-new). |
| Live, new Task's done | `Pass` (no regression) | Neither version wrote a user check into done in a fresh session. |
| Live, move a Task | `Pass` | With "another creator": old text started a new copy; final text delegated by ID to the copy that did autobyteus-2 first. With the user's literal "a new agent package creator", both start a new copy, which is the user's explicit instruction (step 4). |
| Run that tested nothing | Recorded | One new-text run never opened its skill. The check was repeated after asking the PM to load its skill, as a long-running PM in real use already has. |

## Risks and questions

- **Today's move case:** the user literally said "delegate to a new agent package creator", and with that wording the PM still starts a new copy. That is correct, because an explicit instruction is the user's decision. The new rule changes the outcome when the user asks for "another" worker or does not say.
- **The running PM:** its session started on 2026-10-08 and was compacted (967k tokens down to 14k), and it quoted a rule removed on 2026-10-20. It gets this change through the skill-update notice. A fresh PM session would load the whole current skill.
- **The open "user checks" on the PM's board** (AC-408, AC-506, AC-605) are leftovers of the old habit. The PM can now judge them itself and drop them from its reports.
- **Isolated-instance incident:** two real Creator copies ran during the check. The only lasting effect was a local branch and two worktrees under `/tmp`, all removed. Nothing was pushed.
- **Main checkout:** local `main` holds a commit (`191057f`, SE design examples, 17:27) that is not on `origin/main` and is not part of this Task.
