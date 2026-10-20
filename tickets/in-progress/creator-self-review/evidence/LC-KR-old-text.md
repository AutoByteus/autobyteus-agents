# LC-KR-old: fresh Agent Package Creator (old text), neutral question about SE team follow-ups
# AutoByteus 1.5.6 isolated instance, claude_agent_sdk, claude-opus-5, 2026-10-20; package: origin/main a658b0c
## prompt
Analyze only. Do not edit any package file, do not commit, and do not open a pull request; you may write notes in your own workspace.

In the Software Engineering Team at /tmp/sfr/agent-teams/software-engineering-team, several roles find follow-ups: problems outside the current ticket that should become their own Tasks later. Review how follow-ups are recorded and sent today across all roles, then recommend how the team should structure this information and who should send it, following your own principles.

Reply with your recommendation in at most 15 lines.
## reply
Analysis (no package file touched): `/private/tmp/apc-live/old/analysis/agent-package-analysis.md`

**Today.** One fact — "a problem outside this ticket" — has five homes and shapes: a prose bullet in the design spec's Change Scope, two lines buried in the implementation handoff's legacy checklist, a full table duplicated in both code-review templates, and nothing at all in the architecture-review, API/E2E and delivery reports. API/E2E and Delivery don't even link `shared/ticket-scope.md`, though it names "the delivery receipt" as a follow-up moment. Two roles send: the code reviewer after each review, the Solution Designer at the receipt — each with its own recipient-discovery procedure. The designer's sweep enumerates three sources, so the test-review report's follow-ups, API/E2E's and delivery's are never sent; and because the sweep sits on the Terminal path, a ticket that ends `Blocked` takes every recorded follow-up with it. Only the code reviewer has `list_available_agents`; the designer, which must reach an agent outside the team, does not.

**Recommendation.** Give the fact one owner: an append-only `follow-ups.md` in the ticket folder, with the row shape defined once in `shared/ticket-scope.md` (ID · what and where · evidence · why it's outside this ticket · suggested Task · found by · sent). Any role that finds one appends a row; its own report cites the ID instead of repeating the record. Extend `ticket-scope.md` with a "Who acts on a follow-up" section mirroring the prerequisite one.

**Who sends.** One sender: the Solution Designer. It already owns intake, the requirements doc's "Requested by" and prerequisite requests, so the boundary to the Task manager is its boundary. It sends every row marked `Not sent`, in one message, whenever the ticket leaves the team — Terminal *or* Blocked — then marks the rows. The code reviewer stops sending and just appends; `list_available_agents` moves to the designer's config. The recipient is outside the team, so this stays a skill-level convention, not a `team-config.json` route, with the user as the fallback on standalone runs.

Open for you before any `update`: Solution Designer vs Delivery Engineer as the sender, and whether an urgent follow-up (old security risk) should leave immediately rather than at ticket end.