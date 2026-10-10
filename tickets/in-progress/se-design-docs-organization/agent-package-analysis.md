# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (began as `analyze`; user approved on 2026-10-10)
- Package type: `team` (Software Engineering Team, design documents)
- Target package: `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/software-engineering-team/` at `origin/main` `eea734b`
- Scope included: `shared/design-principles.md` (438 lines), `shared/design-examples.md` (1,209), Solution Designer `SKILL.md`, `references/architecture-design.md`, `templates/design-spec-template.md`; both reviewers' skills and templates; Implementation Engineer skill; the shared-file links in each skill.
- Scope excluded: changes to any file; requirements documents beyond cross-references.
- Request/reference: User, 2026-10-10: "is there some problem with the content organization and relationships?"
- Criteria applied: `package-design-principles.md` §3 (one owner per rule) and §4 in priority order; anti-patterns 4 (copied rule), 14 (plain language); skill-authoring "Use supporting resources deliberately".

## Answer

Yes. The intended split is sound: `design-principles.md` is the shared standard (what a good design is), read by all four roles; `architecture-design.md` is the Solution Designer's process (how to produce one); `design-spec-template.md` is the output format. But the boundaries leak: rules from the shared standard are restated in the process file, the design template, and the Code Reviewer's skill; inside the shared file two sections restate each other; and the shared examples file is linked inconsistently, which breaks links.

## Baseline

| File | Intended owner of |
| --- | --- |
| `shared/design-principles.md` | The design standard: 7 core principles, derived checks, practical guide, health assessment, triggers, patterns, questions, smells. |
| `shared/design-examples.md` | Worked examples for the principles. |
| `solution-designer/references/architecture-design.md` | The designer's process: investigation, migration check, production rules, size/risk classification. |
| `solution-designer/templates/design-spec-template.md` | The design document's structure. |
| Reviewer and implementer skills | Their own procedures, applying the shared standard. |

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure and ownership (defect) | `design-examples.md` is linked at the skill root for the Solution Designer, under `references/` for both reviewers, and not at all for the Implementation Engineer. `design-principles.md` links `design-examples.md#example-10-…`, which resolves only in the Solution Designer. | Skill folders | Broken example link in three of four roles; the implementer cannot reach the examples the principles cite. | One placement for both shared files in every skill (skill root, next to `design-principles.md`), including the Implementation Engineer; fix the skills' own links. |
| 2 | Structure and ownership | `architecture-design.md` "Design Production Rules" restates shared rules: the three data-transition decisions (Directly Usable, Discard or Rebuild, Migration Required), removals and compatibility rejection, design-health mapping, and the file-then-folder order. | `architecture-design.md` | Two versions of the same rules; readers cannot tell which governs (the confusion the user reported). | Keep only the designer's process (inputs, order of work, template, classification); replace restated rules with pointers to the principle sections. Retitle to "Architecture Design Process" so the name says it is the process. |
| 3 | Structure and ownership | Code Reviewer `SKILL.md` has its own 66-line scenario and candidate-finding sections with 7 definitions repeated from Core Principle 6 (scenario classes, independent evidence). | Code Reviewer skill | The reviewer and the designer can apply different versions of the same gate. | Keep the review-specific procedure (Promote / Hold for Evidence / Reject, what to record); point to Core Principle 6 for the scenario classes and evidence rule. |
| 4 | Structure and ownership | `design-spec-template.md` lines 104–106 restate policy ("No backward compatibility; remove legacy code paths", "Treat removal as first-class design work…"). | Design spec template | A template that carries rules competes with the principles. | Templates keep fields; replace the policy text with a pointer. |
| 5 | Content flow | Inside `design-principles.md`, Derived Checks and Practical Application Guide state the same five rules (removal in scope, tightening reusable structures, file responsibilities before folders, clean-cut replacement, shared core with specialized variants). | `design-principles.md` | Twice the reading for the same rule; the two copies can drift. | Derived Checks hold the rules (what must be true); the Practical Application Guide holds the order of work and points to the checks instead of restating them. |
| 6 | Economy (anti-pattern 14) | The plain-language sweep counted 297 jargon signals in this team, the most of any package; `design-principles.md` is 438 lines and the examples 1,209. | Shared files | Hard to apply in one pass. | After findings 1–5, a plain-language pass on the shared principles. |

## Recommended changes

Not applied; they need an `update` request. Order: 1 (broken links) → 2 and 4 (process file and template point to the standard) → 3 (Code Reviewer points to Principle 6) → 5 (shared file internal duplication) → 6 (language pass, separately).

## Open questions and approvals

1. Finding 1 applied (user, 2026-10-10: "1 definitely needs to be fixed"): `design-examples.md` is linked at the skill root in all four roles (moved for both reviewers, added for the Implementation Engineer); the reviewers' own links updated; 9 example links resolve as each role sees them. Findings 2–5 applied after the user's instruction "if your principles find all these points need to be fixed, fix it now" (see `agent-package-result.md`). Finding 6 (plain-language pass) later.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Shared-file links per skill | Inconsistent | `find -type l` per skill folder. |
| Rule restatement across files | Counted | Topic searches: clean-cut 7 files, data transitions 9 files, scenario classes 8 files (template option lists counted but not treated as defects). |
| Derived Checks vs Practical Guide | 5 rules in both | Section-limited searches. |

## Handoff state

- `get_handoff_rules` called: `Yes`
- Handoffs sent: None
- Caller return: Yes; no rule matched.
