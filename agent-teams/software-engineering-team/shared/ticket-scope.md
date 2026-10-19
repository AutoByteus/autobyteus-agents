# Ticket Scope: This Ticket, Prerequisite, Or Follow-up

Every role judges what it finds against the ticket's boundary: the requirements
doc's Scope Guardrail and, once the design is decided, the design spec's Change
Scope. The guardrail's Review Authority applies. A finding is one of four kinds.
This file defines them; each role's skill says how it acts on them.

| Kind | Test | What happens | When |
| --- | --- | --- | --- |
| **This ticket** | It is an inherent part of the ticket: the change introduced it (including a design problem in the code the change adds); it is a problem in the functionality the ticket changes, without which an in-scope acceptance criterion or preserved behavior fails; the design spec already places it in this change, such as a refactor its design-health assessment requires; or a team rule makes it part of every change, such as dead code in touched files ([Core Principle 7](design-principles.md#7-no-dead-code)) or a file the change takes over or grows past the size limit. | Fixed in this ticket through the normal route. | As found. |
| **Prerequisite** | It blocks the ticket: the ticket's goal cannot be reached, or cannot be reached safely, until it is fixed. **And** it belongs to other functionality, outside the ticket's scope. Its size does not decide this. | Its own Task, done first; this ticket waits for it. | As soon as the investigation shows it, not at the end of the ticket. |
| **Follow-up** | Everything the ticket delivers works without it, as with a pre-existing bug or design problem in surrounding code, even code the change touches. When the ticket works and you are unsure, prefer a follow-up: it keeps the ticket small and loses nothing. | Recorded with its evidence and sent to the agent that manages the project's Tasks. | When the role's work ends (a review, the delivery receipt). |
| **Requirement Gap** | Fixing it would need behavior the requirements do not approve. | Back to the Solution Designer, which asks the user. | As found. |

## The prerequisite test

Ask two questions:

1. **"If this stays as it is, can this ticket still reach its goal safely?"**
   If yes, it is not a prerequisite (it may be a follow-up).
2. **"Whose functionality is it?"** If it is the functionality this ticket
   changes, it is this ticket. If it is other functionality, it is a
   prerequisite.

Prerequisites often hide in the real dependencies, such as a library, a
service, or a runtime. Our own tests often replace these with fakes, so a trace
that stops at our code and tests misses them.

## Who acts on a prerequisite

- **The Solution Designer** writes it down and asks the agent that delegated
  the Task to create the prerequisite's Task and give it to the Solution
  Designer first (its skill's Prerequisites section).
- **Any other role that finds one** (architecture review, implementation, code
  review, failure-origin review) records the evidence and routes it to the
  Solution Designer as a `Requirement Gap`, naming it a prerequisite. It does not
  absorb it or route it as a `Local Fix`.
- **The agent that delegated the Task** (normally the Project Task Manager)
  creates the prerequisite's Task, makes the waiting Task depend on it, has
  the prerequisite done first, preferably by the same Solution Designer, which
  already knows the context, and tells it to continue the waiting Task once the
  prerequisite is done.

## Example

The ticket (autobyteus-175) asked what works today for Jira through a ready-made
MCP server.
- Tracing a connection end to end, from the settings form through `mcps.json`
  and the MCP server class into the MCP SDK, the designer found that our
  transport options pass `headers`, but the SDK reads `requestInit.headers`.
  The unit test replaced the SDK with a fake, so it could not show this.
- A probe against a real local server proved that no `Authorization` header
  arrived, and a control proved the fix.
- Test: if this stays, can the ticket reach its goal? No, because Atlassian's
  server cannot connect at all. Whose functionality is it? The MCP transport's,
  not the Jira preset's. So it is a prerequisite.
- The designer wrote it down and sent it, with its evidence and a suggested
  Task, to the Project Task Manager. The fix became its own
  Task (autobyteus-179), done first, and the Jira work continued on top of it.
- Two more prerequisites came from the same investigation: the vault could not
  hold MCP secrets, and the MCP gateway exposed credentialed tools without a
  token.

[Example 11](design-examples.md#example-11-keeping-a-ticket-in-scope-during-technical-review)
works through the other kinds during technical review.
