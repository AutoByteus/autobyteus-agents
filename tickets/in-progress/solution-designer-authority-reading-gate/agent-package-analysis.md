# Agent Package Analysis

- Status: `Completed` (analysis revision 2, approved by the user)
- Operation: `update`
- Package type: `skill`
- Target package: `solution-designer`, bundled skill of the Solution Designer agent: `/home/autobyteus/workspace/autobyteus-agents/agent-teams/software-engineering-team/agents/solution-designer/skills/solution-designer/`. `/home/autobyteus/workspace/autobyteus-workspace/.claude/skills/solution-designer` symlinks to it.
- Scope included:
  - `SKILL.md`, `references/architecture-design.md`, `references/requirements-engineering.md`, and all four templates
  - the owning `agent.md`
  - read-only review of every consumer of the shared design files and of the Solution Designer's outputs: `architecture-reviewer`, `code-reviewer` and `implementation-engineer` skills (their `SKILL.md`, the design-review-report template, and the implementation-handoff template), plus `team.md`
- Scope excluded:
  - edits to `shared/design-principles.md` and `shared/design-examples.md`
  - edits to the other agents' skills
  - team config and routes
  - the `collaboration-member-artifact-hydration` ticket
- Request/reference:
  - Feedback from `/solution_designer` (2026-10-06). On two tickets it skipped `references/requirements-engineering.md` and `design-principles.md`; the skip went unnoticed and led to a missed owner path (DI-001).
  - The user's follow-up direction: judge the skill by **when each file is introduced along the work path**. Read the design principles when design work starts; read the design-spec template when the spec is written. Changes must not break the other agents that share these files.
- Revision history:
  - Revision 1 diagnosed wording and recording gaps. The update applied from it is described in `agent-package-result.md`; the baseline below includes it.
  - Revision 2 adds the work-path timing lens, the cross-agent dependency check, and a reordered findings list.

## Baseline

| File | Current responsibility |
| --- | --- |
| `SKILL.md` | Bootstrap; phases 1-4 with reading gates (added in revision 1); recovery; an "Artifacts" section (L212-) that is the only place three of the four templates are linked; handoff. |
| `references/requirements-engineering.md` | Investigation, requirements, Product integration and readiness standards. |
| `references/architecture-design.md` | In order: investigation standard → migration convention check → design production rules (L41 holds the only pointer to the principles as "canonical design authority" and to the design-spec template as "mandatory design structure") → size/risk classification. |
| `design-principles.md`, `design-examples.md` | Symlinks at the skill root to `../../../../shared/`. Shared with three other agents. |
| `templates/*` | Skeletons for four artifacts. The design-spec template also has a "Design Reading Order" (L85-99) that tells the agent how to reason through the design. |
| `agent.md` | Identity, skill pointer, reading-gate pointer (revision 1), handoff protocol. |

### Cross-agent dependency map (read-only)

| Consumer | What it depends on | Constraint for this update |
| --- | --- | --- |
| `architecture-reviewer` | Its own root symlink `design-principles.md` ("Required Shared Reads", L42-44); `references/design-examples.md` symlink. It reviews `design-spec.md`: the behavior/production-path map, Task Design Health Assessment (verdict rows: presence, root-cause classification, refactor decision; template L70-77), task size/risk. | Keep design-spec section names and existing health-assessment fields. New fields must be additive. |
| `code-reviewer` | Root `design-principles.md` (L78-83); `references/design-examples.md`. It reads the design spec's behavior/production-path map on every route. | Same as above. |
| `implementation-engineer` | Root `design-principles.md` (L52-54). Its handoff template copies task size/risk from `design-spec.md` (L33) and checks "posture / root-cause classification / refactor decision" (L63-70). | Keep those design-spec field names and meanings. |
| All four skills | `shared/design-principles.md` L132 links `design-examples.md#example-10` as a sibling file. | Don't move the Solution Designer's root symlinks. All consumers place the principles at the skill root, and in this skill the sibling link resolves only because both files sit at the root. |

`grep` across the repo (excluding `tickets/`) found no external reference to the Solution Designer's `SKILL.md` section names or template file names. Restructuring the inside of `SKILL.md` therefore doesn't affect other agents.

## Preserved behavior

- Phase order: bootstrap → investigation/requirements → explicit user approval → architecture design → classification → handoff.
- Approval rules, recovery table semantics, the SR record, result classifications and the handoff protocol.
- Proportionate written output, with reasoned `N/A` sections.
- `design-examples.md` stays optional.
- The four artifact files and every design-spec section/field that the other agents consume: the behavior/production-path map, Task Design Health Assessment fields, and Task Size And Architectural Risk fields.
- The shared files, their placement, and the other agents' skills stay unchanged.

## Work-path trace: when each file is introduced

| Moment in the actual work | File the agent needs | Where `SKILL.md` introduces it now | Fit |
| --- | --- | --- | --- |
| Bootstrap step 4: create `requirements-doc.md` and begin `investigation-notes.md` (L64-65) | requirements-doc and investigation-notes templates | Only in "Artifacts", L216-217, about 150 lines later | **Late / detached** |
| Start requirements investigation | `requirements-engineering.md` | Phase 1 reading gate | Good (since revision 1) |
| First coherent baseline: create SR-001 (Phase 1 bullet) | SR template | Only in "Artifacts" | **Detached** |
| Before approval | readiness gate | Phase 2 → requirements standards | Good |
| After approval, before architecture investigation | `architecture-design.md`, `design-principles.md` | Phase 3 reading gate. Inside `architecture-design.md`, the principles pointer comes only at L41, after the investigation and migration sections. | Gate good; **pointer inside the reference is late** |
| Architecture investigation | (same) | Phase 3 bullet 4, placed **after** the bullet "Produce a design spec…" | **Order inverted** |
| Shaping the design | `design-examples.md` (optional) | Phase 3 gate (upfront) | Acceptable; better at this step |
| Writing the design spec | design-spec template | Only in "Artifacts" L221 and `architecture-design.md` L41, where it is called the "mandatory design structure" | **No link at the writing step; framed as a design method** |
| Classifying the completed design | `architecture-design.md#task-size…` | Phase 4 | Good |

Pattern: the authorities now arrive on time, but the templates arrive either before the work (an agent that skims reads "Artifacts" and the templates early) or detached from the step that writes them. The design-spec template also presents itself as the reasoning method ("mandatory design structure", "Design Reading Order"). That is how a filled template came to substitute for applying the principles (reported cause 3).

## Findings

Ordered by priority: structure and ownership, then content flow, grounding, clarity and economy.

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure / ownership | `architecture-design.md` L41 calls the design-spec template "the mandatory design structure" and the principles "the canonical design authority" in one sentence. The template's "Design Reading Order" (L85-99) prescribes how to reason. | `architecture-design.md`; design-spec template | Two files compete to own *how to design*. The template looks self-sufficient, so the principles get skipped. | `architecture-design.md`: the principles own design reasoning; the template records the completed design. Template L85: one sentence saying the order follows `design-principles.md` §Practical Application Guide. Keep the section and its order (no consumer depends on its text). |
| 2 | Content flow | Work-path trace rows 1, 3, 7: three templates are linked only in "Artifacts" (L212-), and the design-spec template has no link at its writing step. | `SKILL.md` | Templates are read either too early, where they act as the guide, or not at the moment of writing. | Link each template at the step that creates its artifact: bootstrap step 4 (requirements-doc, investigation notes), the Phase 1 SR-001 bullet, L106 (SR template), and the Phase 3 "write the design spec" step (design-spec template). Reduce "Artifacts" to ongoing maintenance rules and remove its template list. Don't add an upfront file map, which would recreate the upfront list. |
| 3 | Content flow | Phase 3 bullets: "Produce a design spec…" (L143) comes before "Perform additional architecture-level current-state investigation" (L148). | `SKILL.md` | The written order says write first, investigate second. That supports treating investigation as optional for small changes. The second ticket's missed owner path was an investigation gap. | Reorder Phase 3: reconfirm isolation → architecture investigation (including the migration-convention check) → design decisions with the principles (examples optional here) → write `design-spec.md` from the template, proportionate in written detail → handle requirement implications. |
| 4 | Content flow | `architecture-design.md` order: investigation standard (L5) → migration (L15) → production rules with the authority pointer (L41). | `architecture-design.md` | An agent reading this file in order gets to the principles only after investigation guidance. | Move the authority sentence to the file's opening paragraph: the principles govern investigation and design. Keep the template pointer in Design Production Rules, at the writing moment. |
| 5 | Structure (one owner) | The rule "proportionality limits writing, not reading" appears in the `SKILL.md` gate (owner), the template L99 clause "proportionality never reduces the design reading gate", and `agent.md` "however small the task". | `SKILL.md` (owner) | Duplicate rule text, against the one-owner principle. | Remove the template clause; keep "written detail". Trim `agent.md` to a plain pointer: "Pass each phase's reading gate in the skill before that phase's work." |
| 6 | Grounding | Template field "Structural triggers that fire… (or `None`, after checking every trigger)". | design-spec template | `None` carries no evidence, so the field can become ritual text. | Change to: "Structural triggers that fire, each with evidence; if none fire, name the triggers this change could plausibly hit and the evidence ruling each out." |
| 7 | Clarity | Revision-1 analysis ordered its findings by discovery, not priority. | this analysis | Weaker diagnosis. | Fixed in this revision. |

### Observations outside this skill's scope (no change planned)

- `shared/design-principles.md` L132 links `design-examples.md` as a sibling. That link resolves from `shared/` and from this skill. At the symlink location inside `architecture-reviewer` and `code-reviewer`, the examples sit under `references/`; `implementation-engineer` has no examples file. Whether the link breaks there depends on whether the runtime resolves links from the symlink's target. Not verified. Owner: the shared files and the consumer layouts.
- `architecture-reviewer` and `code-reviewer` could check the new `Authorities read` and `Structural triggers` fields. Those skills have separate owners and would need a separate request.

## Planned changes (approved by the user; applied afterward, see `agent-package-result.md`)

- `SKILL.md`:
  - Link templates at their creation steps (Finding 2).
  - Reorder the Phase 3 bullets (Finding 3).
  - Move the `design-examples.md` mention to the design-shaping step.
  - Reduce "Artifacts" to maintenance rules.
  - Keep the reading-gate paragraph as the single owner of the read-versus-write rule.
- `references/architecture-design.md`: authority sentence to the opening; template framed as the record of the design (Findings 1, 4).
- `templates/design-spec-template.md`: rename Design Reading Order to Section Fill Order, with a one-sentence pointer to the principles; remove the duplicate proportionality clause; reword the triggers field (Findings 1, 5, 6). No section renames and no changes to fields the consumers read.
- `agent.md`: plain gate pointer (Finding 5).
- Not changing: the shared files, symlink placement, other agents' skills, `requirements-engineering.md`, the requirements-doc and SR templates.

## Open questions and approvals

- User approved this analysis and the two decisions below (conversation, 2026-10-06), and asked for a pull request after the change.
- Decision, "Design Reading Order": keep the list but rename the section to "Section Fill Order". The principles own design reasoning; this section only maps reasoning stages to template sections. It stays because the template's physical order differs from its fill order (for example, Task Size is placed early but completed last). No consumer references the heading.
- Decision, skill validator: search only inside the `autobyteus-agents` repo. Frontmatter is unchanged; links and anchors are checked directly.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Consumers of shared files | 4 skills | `ls -la` symlinks: SD root (principles and examples); arch-reviewer and code-reviewer root principles plus `references/` examples; impl-engineer root principles only |
| Consumers of SD outputs | 3 skills | arch-reviewer `SKILL.md` L35-80 and report template L70-77; code-reviewer `SKILL.md` L66-95; impl-engineer `SKILL.md` L40-75 and handoff template L33, L63-70 |
| External refs to SD section/template names | None | `grep -rn` over the repo, excluding `tickets/` and the SD skill itself |
| Principle anchors exist | Pass | `#task-design-health-assessment` (L181), `#structural-triggers` (L236), `#practical-application-guide` (L156) |
| Work-path timing trace | Done | table above, against current `SKILL.md` and `architecture-design.md` line numbers |
| Skill validator | Not run | see open questions |

## Next action

The user reviews this analysis. If approved, I apply the planned changes, rerun link/anchor checks and the cross-agent field check, and update `agent-package-result.md`.

## Handoff state

Returned to the user in conversation for review. No handoff before the edits are applied.
