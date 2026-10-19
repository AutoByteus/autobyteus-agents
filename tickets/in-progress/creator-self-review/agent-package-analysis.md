# Agent Package Analysis: the Agent Package Creator reviews itself

- Status: `Completed`
- Operation: `update` (update intent: `optimize`)
- Package type: `agent` (`agents/agent-package-creator` with its bundled skill `agent-package-creation`)
- Target package: worktree `/tmp/csr`, branch `creator-self-review`, from `origin/main` at `ca5c149`
- Files read in full:
  - `agent.md`, `agent-config.json`, `SKILL.md`, `package-design-principles.md` and `package-anti-patterns.md` (read again now);
  - `skill-authoring-principles.md`, `result-and-handoff-contract.md` and both templates, read in full in this conversation and unchanged since (`git log`).
- Request/reference: the user, 2026-10-19: "do you think your own package follows this? … we can make your own package better … then improve your agent package first", after agreeing that writing a package is like writing software (architecture, a data-flow spine, reuse instead of duplication, refactoring).

## The lens: a package is software

| Software | Package | Today in this package |
| --- | --- | --- |
| Architecture, boundaries | Org, Team, agent, skill; who owns which work | Good (§1) |
| Data-flow spine | The workflow from request to result | Good (skill steps 1–5) |
| One owner, no duplication | One file per rule; pointers elsewhere | **Broken in three places** (F1) |
| Interfaces | Handoffs and their files | Good (§2, §6, result contract) |
| Data model | Information structure of the documents roles produce | Good since #62 (§2) |
| Refactor with a comparison | Map old to new so no check is lost | Present (step 4, since #62) |
| Tests | Validator, link checks, **real runs** | **Real runs missing** (F3) |
| Code organization | Easy to find and read | **Anti-pattern file disordered** (F2) |

Where packages differ from code, stated nowhere yet (F4):

- **The runtime is a model that interprets.** Over-specifying fights its judgement; the user asked twice today for less rigid text.
- **Bugs are silent.** Drifting copies and wrong wording fail quietly, so owners and real runs matter more than in code.

## Findings

| # | Area | Evidence | Owner | Change |
| --- | --- | --- | --- | --- |
| F1 | One owner | The validation list appears in `SKILL.md` step 4, again in principles §9 ("validate … JSON syntax, frontmatter, configured skill resolution, links …"), and again in skill-authoring "Validate the skill as loaded". Handoff design appears in `SKILL.md` step 3, principles §2 and §6. | `SKILL.md` step 4; principles §2 and §6 | §9 and skill-authoring point to step 4. Step 4's skill bullet absorbs the two checks only skill-authoring had (one effective trigger and behavior; compare the old trigger, outputs, approvals, recovery and stop). Step 3's handoff paragraph points to §2 and §6. |
| F2 | Structure | Anti-pattern IDs are out of order within sections (5, 12, 18, 23; …, 21, 22, 20, 19). Entries 4 and 23 share one cause (no single owner, for a rule or a fact). | `package-anti-patterns.md` | Order entries by ID within each section and add an index table (ID, title, section). Merge 23 into 4; the index keeps 23's ID as "merged into 4" so earlier references still resolve. |
| F3 | Missing behavior | Today live runs in an isolated app found two real defects (the writer drafted before the brief; the old size rule absorbed a prerequisite), and one live check ran on text that later changed. Step 4 only says "observed checks". The AutoByteus mechanics were rediscovered each time: import a package, start a team or Org run, send a member a message, read the logs. | `SKILL.md` step 4; a new reference | Step 4: when a change alters how agents route, hand off or decide, run a real-use check in a live app (an isolated instance) on the final text, and record what it showed. A new `references/live-checks.md` holds the AutoByteus recipe, and `scripts/send-message.mjs` sends a member a message in a team or Org run. |
| F4 | Grounding and frame | Platform facts that changed designs were found in code each time: a delegated copy carries the Org's rules for its address; an address reaches only the standing instance, a copy only its run ID; a copy has one current Task. There is no stated frame for judging a package as software. | Principles §4 and §7 | A short "Design a package like software" paragraph opening §4 (the mapping and the two differences). §7 records the delegated-copy facts. |
| F5 | Missing lessons | The user's "don't over-script; the model is smart" (prerequisite flow, 2026-10-19). A merge whose re-apply conflicted with the user's local edit (#66). | Anti-pattern 7; `SKILL.md` merge rule | Extend entry 7's incident and instead. The merge rule: when the re-apply conflicts, keep the merged text and re-apply the local change by hand; the branch and patch keep the original. |

## Preserved behavior

All operations, steps, gates, the result contract and templates, every principle and every anti-pattern (23's content moves into 4; nothing is dropped).

## Checks planned

Skill validator; links; the old-to-new map for the moved validation items and the anti-pattern merge; the script's syntax and a run against an isolated app.
