# Interactive Requirements Visualizer Review

Review Status: Implemented; final macro and micro consistency review passed

## User request and scope

Add a separate Product Prototyper skill for interactive, animated
requirements visualization. Keep it distinct from final product prototyping,
allow the same Product Prototyper to receive either mode, preserve Product
Design & Prototyping ownership of its repository and tickets, and recheck the
Requirements Engineering, Product Design & Prototyping, and Software
Development Department contracts for logical and usable handoffs.

## Preserved behavioral invariants

- Requirements Engineering owns canonical requirements, acceptance criteria,
  clarification decisions when it owns that context, and explicit user
  approval.
- Product Prototyper owns the separate prototype repository, project, ticket
  lifecycle, durable commits, visualizer source, and final prototype artifacts.
- Prototype Bootstrapper owns only current-experience baseline parity and
  returns its report to Product Prototyper.
- Interactive visualization is exploratory review evidence, not a final
  `ui-ux-spec.md`, production architecture, or implicit approval.
- Final prototype mode remains the path for approved UI/UX specification and
  normative final visual references.
- Completed work calls `get_handoff_rules`, applies every matching rule, and
  sends to each exact returned recipient; no matching rule returns to the
  user/calling workflow.

## Macro analysis

### Package structure and ownership

The existing final-prototype skill already owns runnable product experiences,
baseline acceptance, final UI/UX specifications, and final visual references.
Adding visualization as a second mode inside the same Product Prototyper keeps
repository and ticket ownership unified without conflating exploratory and
final artifacts. A sibling `interactive-requirements-visualizer` skill is the
authoritative workflow for the new mode; the agent prompt only selects the
mode.

### Flow and handoff

Requirements Engineering now chooses the least expensive visual path:
interactive visualization for unresolved questions, final prototyping after
behavior is sufficiently understood, or no prototype when direct evidence is
enough. The department config carries explicit mode fields on both incoming
routes. Product results distinguish review-ready visualization, final
prototype completion, requirement impact, not recommended, and blocked
outcomes.

Direct user requests and Requirements Engineering requests use the same mode
contract. The sender is not used as a separate workflow branch; if no handoff
rule applies, the Product Prototyper returns the result to the user or calling
workflow.

### Artifacts, validation, and approval

The visualizer produces a brief, runnable source, review record, browser
validation evidence, review URL when available, modeled-state/mock-boundary
notes, and open questions. Its ticket stays in progress while clarification
is open. The final-prototype skill remains the only owner of `ui-ux-spec.md`
and normative final visual references. Browser interaction, replay/reset,
responsive behavior, and non-motion accessibility are explicit visualizer
checks.

## Micro analysis

- Replaced sender-specific language with request-mode language so direct user
  and agent-originated requests are handled identically.
- Distinguished “review-ready” from “approved” throughout Product and
  Requirements documentation.
- Used “mode-appropriate artifacts” where the prior generic UI/UX wording
  could imply that exploratory visualization creates a final specification.
- Kept the shared principles authoritative for repository, ticket, approval,
  and baseline rules; kept visualization interaction heuristics in the new
  skill to avoid duplicating its detailed checklist in team files.
- Kept `send_message_to` and dynamic handoff wording aligned with the existing
  team authoring convention.

## Files changed

- Product Prototyper agent config and prompt
- New `interactive-requirements-visualizer` skill and two output templates
- Existing final-prototype mode boundary
- Product Design & Prototyping team contract and shared principles
- Requirements Engineer skill and Requirements Engineering team contract
- Software Development Department routes, summary, and Head ownership wording

## Validation plan

- Parse every JSON file.
- Resolve changed Markdown links and skill bindings.
- Confirm both Product Prototyper skills have matching config and frontmatter.
- Verify the three-team roster and rooted cross-team routes.
- Search for stale repository, ownership, mode, and handoff wording.
- Run `git diff --check` and repeat macro and micro content review.

## Final review and validation

- JSON parsing passed for all 115 repository JSON files.
- Product Prototyper skill bindings, frontmatter names, required handoff tools,
  team coordinators, three-team roster, and mode-specific routes all passed
  focused assertions.
- All local Markdown links in the changed Product, Requirements, and shared
  principle files resolved.
- `git diff --check` passed, and the new visualizer files contain no trailing
  whitespace.
- Macro review found and repaired the final-prototype approval gate applying
  incorrectly to visualization-only work, the visualizer's blocked outcome
  not matching the parent route, and contradictory ticket-closure wording.
- Micro review found no remaining mode, ownership, approval, or handoff
  inconsistency in the changed package.

The repository has a few pre-existing broken relative links outside this
changed package; they were not altered because they belong to unrelated agent
packages.

Target skill files changed during implementation: the new visualizer skill,
the final-prototype skill boundary, and the Requirements Engineer skill.

Analysis artifact:
`.codex/artifacts/interactive-requirements-visualizer/optimization-analysis.md`
