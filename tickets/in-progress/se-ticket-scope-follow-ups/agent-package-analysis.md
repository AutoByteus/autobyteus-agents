# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (intent: `repair`)
- Package type: `team` members (Software Engineering Team): code reviewer (main), Solution Designer requirements template
- Target package: `agent-teams/software-engineering-team/` at `origin/main` `25dd779`
- Scope included:
  - code reviewer `agent.md`, `agent-config.json`, `SKILL.md`, report templates;
  - requirements-doc template ("Request / ticket", Scope Guardrail);
  - for scope-creep patterns: implementation-engineer, api-e2e-engineer and architecture-reviewer skills.
- Scope excluded:
  - how much to validate (Task `9c96bc42`);
  - `team-config.json` routes (unchanged; follow-up requests go outside the team);
  - other roles' existing follow-up lists (see Findings 6).
- Request/reference: Project Task `project_task_62a46806-…` (user, 2026-10-13).

## Baseline

| Location | Current rule |
| --- | --- |
| requirements-doc template, "Scope Guardrail (Mandatory)" | "The canonical change boundary for requirements, architecture design, implementation, and technical review." It has In-Scope Use Cases, Out Of Scope, Non-Goals, Preserved Behavior Boundary, and Review Authority. Review Authority says every blocking finding "must cite an approved requirement, acceptance criterion, or preserved-behavior ID", and "an adjacent concern outside the approved boundary may be recorded as a non-blocking … separate-ticket candidate". |
| requirements-doc template line 12 | "Request / ticket:". It doesn't record who requested the work, so it gives no destination for follow-ups. |
| architecture reviewer `SKILL.md` line 71 | "Treat a concern that the scope guardrail explicitly places out of scope as non-blocking unless evidence shows the design violates a different approved requirement." |
| implementation engineer `SKILL.md` lines 64–66, 89 | Stays within the Scope Guardrail; "List dead code found elsewhere as a follow-up." |
| api-e2e engineer `SKILL.md` lines 98, 110 | Existing tests get an `Out Of Scope` disposition; "Do not use this stage to introduce unrelated test or source architecture changes." |
| code reviewer `SKILL.md` | Step 2 confirms "out-of-scope behavior" but never uses it. The candidate gate offers only `Promote` / `Hold for Evidence` / `Reject`, and every promoted finding becomes a `Local Fix` / `Design Impact` / … routed into this ticket. "Audit existing as well as newly introduced … machinery" (line 193). The failure-origin list has no "pre-existing, unrelated to this change". |
| code reviewer `agent-config.json` | `send_message_to`, `get_handoff_rules`; no `list_available_agents`. |

## Observed defect (user, 2026-10-13)

A UI ticket was implemented and passed API/E2E. Back at code review, the reviewer found an unrelated problem, analysed it, and sent it to the implementation engineer, who started fixing it in the ticket. Each round found more, so the scope kept growing. That return to code review was the successful-API/E2E test-code review, whose rules already limit it to "durable test files added, updated, or removed during API/E2E".

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Ownership / content flow | The code reviewer doesn't apply the guardrail's Review Authority; the architecture reviewer does (line 71) | code reviewer `SKILL.md` | Promoted findings outside the ticket reopen implementation, round after round. | A "Ticket Scope" section: the guardrail is the boundary. For each promoted finding, judge in-ticket vs `Follow-up` (caused by this change, blocks an in-scope acceptance criterion or preserved behavior, or a trivial fix in code the change touches, versus pre-existing and unrelated), with worked examples including the user's UI case. |
| 2 | Content flow | No follow-up path | code reviewer `SKILL.md`, `agent-config.json` | Out-of-scope findings either grow the ticket or are lost. | Record follow-ups in the report and send one follow-up request to the agent that manages the project's Tasks (the requester recorded in the requirements doc, or one found with `list_available_agents`). If there is none, leave them in the report. A follow-up never fails the review or reopens implementation. Add `list_available_agents`. |
| 3 | Content flow | The failure-origin list lacks "pre-existing, unrelated" | code reviewer `SKILL.md` | An unrelated failing test is attributed to this ticket. | Add that origin: send a follow-up and return to API/E2E to record it as out of scope. |
| 4 | Clarity | Entry points | code reviewer `SKILL.md` | Test-code and failure-origin reviews widened into source review (the user's case). | One line: an unrelated observation at any entry point is a follow-up, not a reason to widen the review. |
| 5 | Grounding | requirements-doc "Request / ticket:" | Solution Designer requirements template | The reviewer can't tell who manages the Task. | "Request / ticket, and the requester or delegating agent's address:". |
| 6 | Consistency | The implementation engineer lists follow-ups; the architecture reviewer has "separate-ticket candidates"; neither sends them anywhere | — | Not scope creep; those roles already stay in scope. | No change in this PR (the smallest coherent delta). Noted as a possible follow-up: one shared follow-up path for the team. |

The Solution Designer needs no new scope statement: the Scope Guardrail and Review Authority are already firm, so the fix is that the code reviewer applies them.

## Principle check of the follow-up path

§6: "A role never contacts anyone that neither the user nor the rules named." The follow-up recipient sits outside the team, so a team rule can't name it. Here the user named the path explicitly (follow-ups to the Project Task Manager, found with `list_available_agents`), and the Task's own requester is recorded in the package. The skill names the role generically ("the agent that manages the project's Tasks"), not another team's internals (anti-pattern 3).

## Second analysis (user, 2026-10-13): is the ticket's scope written clearly, when, and where does the reviewer reason about it?

### Solution Designer: where the scope is written

| Question | Finding | Evidence |
| --- | --- | --- |
| Is the scope written explicitly? | **Yes, at the behavior level.** | requirements-doc template "Scope Guardrail (Mandatory)": In-Scope Use Cases (`UC-*`), Out Of Scope, Non-Goals, Preserved Behavior Boundary, Review Authority ("Every blocking … finding must cite an approved requirement, acceptance criterion, or preserved-behavior ID"; outside concerns are "non-blocking … separate-ticket candidate"). |
| When is it written? | **Only in the requirements phase, before the solution is decided.** Nothing tells the designer to revisit it after design. | requirements-engineering.md line 24; SKILL step 1. SKILL steps 3–4 (design, classify) never mention scope again. |
| Is there a final scope after the solution is decided? | **No single statement.** The concrete change set is spread across the design spec's file mapping, its removal plan (with `In This Change` / `Follow-up`), and the change sequence. The "Intended Change" section is an empty heading with no guidance. | design-spec template lines 41, 194, 299, 362. |
| Does the skill itself name the guardrail? | **No.** `SKILL.md` never says "Scope Guardrail"; it is only in the reference and the template, so it is easy to fill thinly. | `grep` on SD `SKILL.md`. |
| Clear enough for a reviewer judging a code finding? | **Partly.** Use cases say what behavior changes; a reviewer looking at a neighbouring panel needs to know which areas the change touches and which it deliberately leaves. | — |

### Code reviewer: where the scope reasoning happens (PR #45 as it stands)

| Question | Finding | Evidence |
| --- | --- | --- |
| Explicit instruction to respect scope? | **Yes, added by PR #45.** | New "Ticket Scope" section. |
| Clear judgement wording (this ticket / follow-up / requirement gap) with examples? | **Yes, added by PR #45**, including the user's UI case. | Ticket Scope section. |
| Is the judgement placed in the workflow where the reviewer reasons? | **No.** Ticket Scope is a separate section. The review sequence (steps 1–7) doesn't call it, the test-code review rules (the entry point of the user's case) don't mention it, and the candidate table has no scope column, so the decision isn't recorded where findings are decided. | code-reviewer `SKILL.md` "Implementation Review Basis And Sequence", "Successful API/E2E Test-Code Review Rules"; report template "Candidate Finding And Mechanism Gate" table. |

### Recommended changes (to PR #45)

- **Solution Designer:**
  - when the design is complete (step 4), write the ticket's final scope in the design spec's "Intended Change", renamed "Change Scope": the guardrail's in-scope IDs, the areas and files this change modifies, what it deliberately leaves untouched, and follow-ups found during design. The requirements guardrail stays the behavior boundary and the authority;
  - name the guardrail in SKILL step 1;
  - the design-spec template gets guidance for that section.
- **Code reviewer:**
  - sequence step 2 reads the guardrail and the design's Change Scope as the review boundary;
  - step 6 judges each promoted candidate's scope (Ticket Scope);
  - step 7 routes only in-ticket findings and sends follow-ups;
  - the test-code review rules say an unrelated problem noticed there is a follow-up;
  - the candidate table gets a Scope column.

## Third analysis (user, 2026-10-13): does it work end to end with PR #45?

Each case was walked through the PR branch text, checking at every handoff that the next role receives what it needs and has an instruction and a route for it.

| Case | Path | Works? | Evidence / gap |
| --- | --- | --- | --- |
| A. User's UI case: unrelated pre-existing bug noticed at the test-code review | SD fills "Requested by" and Change Scope → package reaches the reviewer with requirements and design → test-code rule says it's a follow-up → Follow-ups in the report → one message to "Requested by" (or a Task manager via `list_available_agents`) → Pass → `/delivery_engineer` | **Yes** | The test-review pass route to delivery exists in `team-config.json`; `list_available_agents` and `send_message_to` are in the tools. |
| B. Unrelated problem found during implementation review | step 2 reads the scope → step 6 judges it a follow-up → step 7 routes only in-ticket findings → Pass → API/E2E | **Yes** | Sequence steps 2, 6, 7; candidate Scope column. |
| C. API/E2E fails on a pre-existing problem unrelated to the change | API/E2E `Fail` → failure-origin review → origin "pre-existing, unrelated" → follow-up sent → "return the package to the API/E2E owner to record the failure as out of scope" | **No, two breaks** | (1) No `team-config.json` rule from `/code_reviewer` to `/api_e2e_engineer` matches. The existing conditions cover "coverage, test code, fixtures, environment, execution, or reporting", so `get_handoff_rules` gives no route and the reviewer falls back to returning to the caller. (2) The API/E2E skill has no instruction for this return: its `Out Of Scope` disposition covers existing tests in the coverage investigation, not a failure handed back from failure-origin review. |
| D. The follow-up request reaches the Project Task Manager | PM receives "please create a follow-up Task …" from a worker | **Works in practice, not written down** | PM `SKILL.md` §5 covers "Requests forwarded for the user" (the user's own requests) and "New work arrives", but nothing says what to do with a worker's follow-up proposal: create it as TODO, tell the user, dispatch only on approval. |
| E. A ticket already in flight, with no Change Scope in its design spec | reviewer step 2 reads "the design spec's Change Scope" | **Mostly** | The guardrail still applies, but the text doesn't say what to do when the Change Scope is missing. |

### Recommended fixes

1. **C, needed:**
   - extend the `team-config.json` failure-origin route to `/api_e2e_engineer` with "…or a pre-existing problem unrelated to this change, which API/E2E records as out of scope";
   - add one API/E2E skill line: when failure-origin review returns a failure as pre-existing and unrelated, record it as out of scope with the follow-up reference, and finish the result on the in-scope checks.
2. **D, optional, PM package:** one line in PM §5: a worker's follow-up request becomes a TODO Task (or extends the open Task it belongs to), the PM tells the user, and dispatches only on approval.
3. **E, small:** reviewer step 2 reads "…and the design spec's Change Scope when it has one".

## Fourth analysis (user, 2026-10-13): read the whole package first

The user pointed out that the earlier revisions were made without reading the whole code reviewer package. Read now in full:
- `agent.md`, `agent-config.json`, `SKILL.md`;
- all three templates;
- both references, which are symlinks to the team's shared `design-principles.md` (516 lines) and `design-examples.md` (1209 lines).

| Finding | Evidence | Consequence |
| --- | --- | --- |
| The team already has one shared home for review examples. | `shared/design-examples.md` holds Example 9 ("Rejecting An Unreachable Edge Case During Technical Review") and Example 10, with "How The Roles Use This Example"; it says to "add examples when new … practices need concrete shape guidance". It is linked from the solution designer, architecture reviewer, implementation engineer and code reviewer. | The reviewer-only `references/ticket-scope-scenarios.md` would have been a second example location seen by one role. The scope examples belong in shared Example 11. |
| Two scenarios restated rules the shared principles own. | Core Principle 7 Scope (dead code in touched files vs elsewhere as a follow-up); Task Design Health Assessment (refactor needed now / not / deferred). | Example 11 points to them instead of restating them. |
| The size audit can force refactors of old files the change touches. | Report template "Source File Size And Structure Audit": `>500` hard-limit and `>220` delta checks on every changed source file; the SKILL applies the thresholds "only to changed implementation-source files". | This is an existing team policy whose intent for pre-existing oversized files is undocumented. Example 11 defers to the size checks and the design-health decision; the policy question goes to the user. |
| The reviewer's "Required Shared Reads" consulted the examples "only when a concrete structural example is needed". | code-reviewer `SKILL.md` line 81 | It now also covers a finding's scope. |

## Fifth analysis (user, 2026-10-13): full consistency and real-workflow review of both packages

Read in full on the PR branch (`d0d6b12`):
- **Solution Designer:** `agent.md`, `agent-config.json`, `SKILL.md`, `requirements-engineering.md`, `architecture-design.md`, and the four templates;
- **code reviewer:** `agent.md`, `agent-config.json`, `SKILL.md`, and the three templates;
- **shared:** `design-principles.md`; `design-examples.md` (Examples 9–11 and the role-use and usage sections in full, and the outline of Examples 1–8, which are design shapes with no scope or workflow rules);
- **team:** `team.md`, `team-config.json`.

### Real workflow check

- **Solution Designer:**
  1. intake;
  2. investigate;
  3. requirements with the Scope Guardrail;
  4. reasoned decisions;
  5. approve (self within the direction, or the user);
  6. architecture investigation;
  7. design decisions;
  8. Change Scope;
  9. classify from the final scope;
  10. hand off;
  11. delivery receipt.

  This matches how a designer works; the readiness gate checks scope before approval.
- **Code reviewer:** read the ticket's scope (step 2) → trace scenarios → collect observations → candidate gate → scope judgement for each promoted finding (step 6) → score and route this ticket's findings, send follow-ups (step 7). This matches how a reviewer works.
- **A regression first noticed at the test-code review** has a route through the existing chain: a test-coverage `Local Fix` to API/E2E, whose new test fails, then failure-origin review, then the implementation engineer. The follow-up noted in revision 4 (no direct route) is therefore not a gap.

### Inconsistencies found

| # | Where | Inconsistency | Fix |
| --- | --- | --- | --- |
| 1 | requirements-doc template lines 9 and 16 | "Approved by …; reference" (added in #41) duplicates "Approval state and reference". | One field. |
| 2 | requirements-doc template line 169 | `Needs user` "(scope or product direction)" is narrower than the skill's five criteria. | Point to the skill's criteria. |
| 3 | requirements-doc Review Authority line 71; requirements-engineering line 26; architecture-reviewer `SKILL.md` line 70 | "separate-ticket candidate", while the reviewer, Core Principle 7 and the design spec say "follow-up". | Use "follow-up" (stable terminology). |
| 4 | solution-revision-record template line 13 | SR-001 status offers only "Draft / Ready for Approval"; a within-direction approval can be `Approved` at once (#41). | Add `Approved`. |
| 5 | design-spec Section Fill Order | Item 10 is change scope, but Task Size "is completed last" and is not numbered; sizing needs the final scope. | Add "11. task size and architectural risk". |
| 6 | design-spec "Intended Change" / "Change Scope" | Intended Change is an empty heading next to Change Scope; the early intent and the final boundary are hard to tell apart. Change Scope "files this change modifies" also re-lists the Target File Mapping (anti-pattern 4). Design-health deferrals are not linked to follow-ups. | One guidance line for Intended Change; Change Scope points to the file mapping; its follow-ups include deferred refactors. |
| 7 | Solution Designer `SKILL.md` | Follow-ups recorded by the designer (Change Scope) and the implementation engineer (dead code elsewhere, oversized files) are never sent anywhere; only the reviewer sends its own. | At the delivery receipt, the designer sends the package's unsent follow-ups to the delegating agent ("Requested by"), or lists them in its result when the user asked directly. |
| 8 | code-reviewer `SKILL.md` Ticket Scope | The "Follow-up … even code the change touches" bullet contradicts Core Principle 7 and the reviewer's own checklist ("Dead code removed in the touched files"), and the size rule for files the change grows. | "This ticket" also covers what a team rule makes part of every change: dead code in touched files, and a file the change takes over or grows past the size limit. |
| 9 | `team.md` | Still names the removed "Software Development Department" org (`66e417b`); and the team summary doesn't mention the scope and follow-up convention the roles now share. | Fix the stale name; add one line on the shared scope convention. |
