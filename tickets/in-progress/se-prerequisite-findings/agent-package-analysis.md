# Agent Package Analysis: "prerequisite" findings in the Software Engineering Team

- Status: `Completed`
- Operation: `update` (update intent: `extend`)
- Package type: `team`
- Target package: `agent-teams/software-engineering-team` (worktree `/tmp/spf`, branch `se-prerequisite-findings`, from `origin/main` at `f03c33b`)
- Files read in full in this conversation, unchanged since apart from my merged PRs (`git log 582736a..origin/main` is empty for the team):
  - the Solution Designer `SKILL.md` and its references and templates;
  - the code reviewer `SKILL.md`;
  - the implementation-engineer, architecture-reviewer and API/E2E skills;
  - `team.md` and `team-config.json`.
- Read again for this Task: Example 11 in `shared/design-examples.md`, the requirements template's Scope Guardrail, and the design spec's Change Scope.
- Request/reference: Task `autobyteus-agents-30`; the Solution Designer's feedback `skill-feedback-prerequisite-findings.md` (copy here); the user's framing in the Task.

## Where "this ticket or follow-up" is defined today

- **Code reviewer `SKILL.md`, "Ticket Scope":** the questions, three outcomes (this ticket, follow-up, Requirement Gap) and how to send follow-ups.
- **`team.md`:** one paragraph: keep to scope; problems outside become follow-ups; see Example 11.
- **Example 11:** the worked case and a table of common situations. One row says "an old bug in code the ticket calls makes an in-scope acceptance criterion fail → **this ticket**".
- **Requirements template, Review Authority:** adjacent concerns are non-blocking follow-ups.
- **Solution Designer:** writes the Scope Guardrail and Change Scope, and sends follow-ups at the delivery receipt. Its Recovery table has "Non-requirement external blocker" (outside the product), but nothing for a blocker inside the product that needs its own Task.

## Findings

| # | Area | Evidence | Change |
| --- | --- | --- | --- |
| F1 | Structure (one owner) | The kinds of finding are defined in the code reviewer skill, `team.md` and Example 11; the Solution Designer, the architecture reviewer and the implementer only point at parts | Add `shared/ticket-scope.md` as the one owner of the kinds (this ticket, **prerequisite**, follow-up, Requirement Gap), their tests, timing and who acts. The code reviewer section keeps only its reviewer actions; `team.md` and Example 11 point to it. |
| F2 | Missing behavior | In the Jira case (autobyteus-175), MCP auth headers were never sent. The fix was too large to absorb, but without it the goal could not be met. The skill had no kind for this, so the designer improvised. Example 11's row would wrongly call it "this ticket". | Define the prerequisite, with the test "If this stays as it is, can this ticket still reach its goal safely?" Absorb it if small and within the direction; otherwise it gets its own Task first and this ticket waits. Correct Example 11's row. |
| F3 | Content flow | The Solution Designer sends findings only at the delivery receipt | Solution Designer step 1 and step 3.2: trace through real dependencies and confirm with a cheap probe. A Recovery row raises a prerequisite at once: record it, ask the user, send the Task to the "Requested by" agent, and pause or narrow the ticket. The requirements template gets a Prerequisites table. |
| F4 | Content flow | Downstream roles find the same thing during review or validation | The architecture reviewer, implementation engineer and code reviewer (including failure-origin review) route a prerequisite to the Solution Designer as `Requirement Gap`, naming it a prerequisite. API/E2E needs no change: its failures go to failure-origin review. |

## Preserved behavior

- Follow-ups (when to prefer them, how they are sent) and Review Authority.
- The code reviewer's entry-point limits and its existing classifications and routes (no new route: prerequisites use the existing `Requirement Gap` route to the Solution Designer).

## Not in this Task

- **The Project Task Manager's skill** (for a follow-up Task): when a prerequisite arrives, create its Task, set the paused Task's `depends_on`, dispatch with the user's approval, and when it is DONE, message the paused team to continue. Its current skill covers forwarded user requests, `depends_on` and relaying, but not "tell the paused team to continue".
- **The feedback's side lesson** (a kept test seam became dead code) is already Core Principle 7 (no dead code). No change here.

## Revised during the work (user direction, 2026-10-19)

- **Definition by functionality, not size.** The user: "If it belongs to the current ticket, then it's not a prerequisite … if it … should be accomplished first, which is completely blocking the current, but … from the scope of functionality, doesn't belong to the current one, [it is] the prerequisite." The size test ("absorb it if small") is removed. The test is two questions: does it block the ticket's goal (safely)? Whose functionality is it? The user may still choose to widen the ticket to include it.
- **Placement along the Solution Designer's working sequence.** The user: "analyze the working progress of solution designer to put this prerequisite in a proper place."

| Step | Prerequisite handling |
| --- | --- |
| Step 1, investigate | Found by tracing through real dependencies and confirming with a probe; always a `Needs user` decision, raised at once |
| Step 2, approve | No self-approval "within the direction" while a prerequisite is open; the approval records the user's decision and the scope it leaves |
| Step 3, architecture investigation | Found and judged the same way |
| Result and Handoff | A third blocker kind, `Waiting For Prerequisite` (by Task key) |
| Incoming notifications | "Prerequisite delivered" means resume |
| Recovery | One routed from another role is handled the same way |
| Delivery receipt | Follow-ups only |

The procedure has one owner, the Solution Designer skill's new **Prerequisites** section (record, ask at once, send the agreed Task, pause or narrow, resume); each step points to it. The shared `ticket-scope.md` keeps the definition, the test, the other roles' routing, and what the Task-managing agent does.
