# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (intent: `repair`)
- Package type: `agent` (Agent Package Creator) and `team` (Software Engineering Team route)
- Target package: `agents/agent-package-creator/` and `agent-teams/software-engineering-team/` at `origin/main` `bf6faad`
- Scope included:
  - Part 1, every file of the Agent Package Creator, read in full: `agent.md`, `agent-config.json`, `SKILL.md`, the four references, the two templates.
  - Part 2: `team-config.json` (every route), code-reviewer `SKILL.md` and test-review template (read in full in Task `62a46806`, and the changed areas again here), and the implementation engineer's return handling.
- Scope excluded: other members' procedures.
- Request/reference: Project Task `project_task_11fd9f8d-…` (user, 2026-10-13).

## Part 1: read the whole package before judging or changing it

### Baseline: where the rule already exists

| Location | Current text | Weakness |
| --- | --- | --- |
| `SKILL.md` "Inputs and operation" | "Before `analyze` or `update`, read the affected topology: definition/config files, attached skills and resources, members, routes, shared dependencies, and affected docs." | Doesn't say *in full*, doesn't say a search is not a read, and doesn't say the judgement must rest on that read. |
| `package-design-principles.md` §9 | "For `analyze` and `update`, read the full affected package and write its baseline …" | A second statement of the same rule (anti-pattern 4). |
| `package-anti-patterns.md` #10 "Working from a stale or unrelated checkout" | "Breaks §9: read the actual current package before deciding." | Same cause (deciding from an incomplete view of the package), but it only covers the stale-checkout case. |
| `skill-authoring-principles.md` "Write the operating contract" | "For an update, read the existing skill and linked resources first" | Consistent; skill-specific. |
| Analysis template "Baseline"; contract `baseline` | "Each reviewed file and what it currently owns." | Nothing shows the files were read in full, or that linked shared files were followed. |

### Observed defect (Task `62a46806`, PR #45, 2026-10-13)

The creator changed the code reviewer after reading its `SKILL.md`, `agent.md` and config, but only searching its templates and never opening its two references. Those were links to the team's shared `design-principles.md` and `design-examples.md`. It created a reviewer-only examples file. After reading every file it found the team already keeps shared review examples (Examples 9 and 10), moved the content to shared Example 11, and removed the duplicate. A later full read of the Solution Designer and code reviewer found nine more inconsistencies the partial reads had missed.

### Findings and planned changes

| # | Priority area | Owner | Change |
| --- | --- | --- | --- |
| 1 | Content flow | `SKILL.md` "Inputs and operation" | Make it the one clear rule. Before analyzing or changing, build the full picture: read in full every file of the affected package, the containing Team or Org files, the shared files they link to, and the sibling members the change affects. A search shows where a phrase is, not how the package works. Base findings and designs on that read, and list the files read in the analysis. |
| 2 | Ownership | principles §9 | Point to the skill's rule instead of restating it. |
| 3 | Grounding | anti-pattern #10 | Extend it, same cause: "Deciding from a stale or partial view of the package", with the PR #45 incident; Detect: compare the analysis's files-read list with the package's files and links. |
| 4 | Content flow | analysis template; result contract `baseline` | A "Files read in full" line; baseline is each file read in full. |

## Part 2: route from the test-code review to the implementation engineer

### Baseline

- From the post-API/E2E test-code review, `team-config.json` has routes `/code_reviewer` → `/api_e2e_engineer` ("When post-API/E2E test-code review fails and an API/E2E-owned correction is required"), → `/solution_designer` (Design Impact / Requirement Gap / Unclear), and → `/delivery_engineer` (pass). There is no route → `/implementation_engineer`.
- The return already exists: `/implementation_engineer` → `/code_reviewer` "When an implementation-owned Local Fix requested by the code reviewer … is complete, the existing package is task_size=Large or architectural_risk=High, and the updated implementation must return for source review." Test-code review only happens on the Large/High route, so the fix returns through source review, then API/E2E, then the test-code review (code-reviewer Classification Rules: "After an implementation-owned fix, require source review and API/E2E again").
- The implementation engineer already accepts "an implementation-owned `Local Fix`" from a review stage (`SKILL.md` lines 47 and 158).
- code-reviewer `SKILL.md` test-code rules and Handoff Rules name only `/api_e2e_engineer` for a failed test-code review; the test-review template's Classification gives `Local Fix` to `api_e2e_engineer` only.

### Findings and planned changes

| # | Priority area | Owner | Change |
| --- | --- | --- | --- |
| 5 | Ownership / routing | `team-config.json` | New `/code_reviewer` → `/implementation_engineer` rule: when post-API/E2E test-code review finds an implementation-owned Local Fix that belongs to this ticket by Ticket Scope (the change caused it, or it blocks an in-scope acceptance criterion); unrelated pre-existing problems stay follow-ups. |
| 6 | Content flow | code-reviewer `SKILL.md` test-code rules and Handoff Rules | Say that a source defect the change caused, revealed by the changed tests, is an implementation-owned `Local Fix` that returns through source review, API/E2E and this review. |
| 7 | Consistency | test-review report template | `Local Fix` may be implementation-owned for such a defect. |

The implementation engineer, API/E2E and delivery need no change: the return route and their inbound handling already exist.
