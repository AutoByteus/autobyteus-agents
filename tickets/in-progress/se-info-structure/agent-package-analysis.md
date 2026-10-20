# Agent Package Analysis: the Software Engineering Team's information structure

- Status: `Completed` (step 1, the analysis; waiting for the user's decisions)
- Operation: `analyze` (then `update` with the parts the user approves)
- Package type: `team` (`agent-teams/software-engineering-team`)
- Target package: worktree `/tmp/sis`, branch `se-info-structure`, from `origin/main` at `96f7850`
- Files read in full: `team.md`; the six role skills; `shared/ticket-scope.md`, `shared/handoff-references.md`, `shared/evidence-files.md`.
- Mapped by script: every `references/` folder and symbolic link; every link inside `shared/`; which role's own files name which shared file and section; hard-coded member addresses; repeated rules and document lists.
- Read by outline: `design-principles.md`, `design-examples.md`.
- Other packages: all teams and Orgs, for the same pattern.
- Request/reference: Task autobyteus-agents-36; the user, 2026-10-20: "I still feel like we have some information structure issue … ownership."

## The map

**Shared files and who uses them.** Columns: lines; the roles whose own skill or template names the file; the roles that only have a link to it.

| Shared file | Lines | Named by (role's own files) | Linked but never named |
| --- | --- | --- | --- |
| `ticket-scope.md` | 81 | all six | – |
| `handoff-references.md` | 68 | all six | – |
| `evidence-files.md` | 10 | implementation, API/E2E | – |
| `design-principles.md` | 516 | Solution Designer (15 links), architecture reviewer, code reviewer, implementation | **delivery, API/E2E** |
| `design-examples.md` | 1,287 | Solution Designer, architecture reviewer, code reviewer | **implementation, delivery, API/E2E** |

**Links between shared files.**

| From | To |
| --- | --- |
| `ticket-scope.md` | `design-principles.md` (Core Principle 7), `design-examples.md` (Example 11) |
| `design-principles.md` | `design-examples.md` (Example 10), `ticket-scope.md` |
| `design-examples.md` | `design-principles.md`, `ticket-scope.md` |

Each role reads shared files through its own `references/` folder, so a link resolves only when that role also has the target. Hence:

- **Five link-only symbolic links.** These are delivery's and API/E2E's two design files, and implementation's `design-examples.md`. They exist only so that another shared file's links resolve; no skill of that role names them. Every change to those large files sends their running agents a skill-update notice for content they never use. This is what the user saw.
- **The STORM team has the same coupling with the opposite symptom.** Its shared `storm-production-principles.md` links `storm-source-notes.md`, which no role has, so the link is broken in all six skills. No other team has a link-only link.

## Findings: structural or cosmetic, and size

| # | Finding | Kind | Size | Cause |
| --- | --- | --- | --- | --- |
| S1 | Link-only links (5) and the resulting notices; STORM's broken link | **Structural (coupling)** | small to fix | Shared files link files that not every reader has. Nothing owns "what a role reads": each role's link set is hand-picked, and grows to satisfy other files. |
| S2 | Scope judgement in two homes. `ticket-scope.md` defines the kinds; Example 11 (about 75 lines, inside the 1,287-line design examples) holds the worked case and the "Common situations" table. The code reviewer links Example 11 directly. | **Structural (two homes)** | small | Example 11 was written before `ticket-scope.md` existed. Moving it next to the definition also removes `ticket-scope.md`'s need to link `design-examples.md`. |
| S3 | Recipients written in skills: the code reviewer's Classification Rules map each outcome to an address (9 addresses, one per route). The architecture reviewer has 6 and delivery 3, mostly "normally `/x`". `team-config.json` owns these routes. | **Structural (duplicate authority)** | small | Anti-pattern 12. A renamed member or a changed route leaves these wrong. |
| S4 | No single list of the ticket's documents. Five skills enumerate the package they receive ("design spec" 18 mentions in 6 skills; "implementation handoff" 17 in 5). `handoff-references.md` already says "the package means these documents in the ticket folder", but no file lists them with writer, reader and route. | **Structural (repeated list)** | medium | Each skill grew its own list. Adding `follow-ups.md` required edits in several places. |
| S5 | Role shells repeat their skills. Four `agent.md` files restate the skill's review invariant and revision-record rules. The transition (`get_handoff_rules`, send, stop) is in the skills, not in `agent.md` as the team's convention places it. The same handoff mechanics are in 4–5 skills ("Use AutoByteus `send_message_to`…", "Codex-native…", "Do not poll"). | Duplicate, low risk | small to medium | Text copied when roles were created. It drifts only on change, so it is close to cosmetic. |
| C1 | `design-principles.md` mixes design principles with routing classification (Task Size And Architectural Risk) and review checklists | Cosmetic for now | – | Every reader of the routing section also reads the principles, so no role carries something it does not need. Splitting would add a file and links for no current reader. |
| C2 | `design-examples.md` is 1,287 lines | Cosmetic | – | Large, but used by the roles that have it, one example at a time. S2 removes the one part that belongs elsewhere. |

## The smallest structure that fixes the causes

1. **A role links only what its own skill names** (S1). A shared file links only files that every role reading it also has; otherwise it names them in plain text ("Core Principle 7 in the team's design principles"). Concretely:
   - remove the five link-only links;
   - fix the cross-links: `ticket-scope.md` → design files, and `design-principles.md` → Example 10;
   - fix STORM's link the same way.

   The check becomes mechanical: a link no file of the role names, or a broken link, is a defect. I would add that check to the Creator's link script and anti-patterns (my own package).
2. **Scope judgement in one home** (S2): move Example 11 into `ticket-scope.md` as its worked example and common situations, and leave a one-line pointer in `design-examples.md`.
3. **Recipients only in `team-config.json`** (S3): skills say the outcome and "use `get_handoff_rules`"; drop the addresses.
4. **One map of the ticket's documents** (S4): extend `handoff-references.md`, which already owns "the package", with a table: document, writer, readers, route. The five skills' input lists become "the package (handoff-references.md) plus the specific things this role needs".
5. **Shells and mechanics** (S5): each `agent.md` keeps identity and the transition; skills keep the role's procedure; `team.md` keeps the shared mechanics once.

## Cost and order

| PR | Contents | Files | Risk |
| --- | --- | --- | --- |
| 1 | S1 (+ STORM), with the checker addition in my package | 5 links, about 4 lines in shared files, 1 STORM line | low |
| 2 | S2 | `ticket-scope.md`, `design-examples.md`, the code reviewer's link | low |
| 3 | S3 + S5 | 3 skills (S3), 6 `agent.md` and 5 skills (S5) | medium: touches every role's handoff text; needs a full team run as its live check |
| 4 | S4 | `handoff-references.md`, 5 skills | medium: the input lists also encode route differences, which the map must keep |

Each PR gets an old-to-new map, a link check, and a live check. For PR 3 and PR 4: a small ticket run end to end through the team.

## Questions for the user

1. Agree with S1–S5 as the real problems, and C1–C2 left alone?
2. All four PRs, or stop after the first two (the clear structural fixes) and decide on 3–4 later?
3. Bundle autobyteus-agents-37 (the "Delivery Completed" wording) into PR 3, which touches delivery's handoff text anyway?
