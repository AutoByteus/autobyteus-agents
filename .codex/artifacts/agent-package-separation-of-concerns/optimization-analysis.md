# Agent Package Separation Of Concerns Review

Review Status: Implemented; macro and micro consistency review passed

## User request and review scope

Define and apply a clear separation of concerns for `agent.md`, `team.md`,
`SKILL.md`, `team-config.json`, `agent-config.json`, templates, and shared
references. Make the contract explicit in `README.md` so new teams have one
authoritative authoring pattern instead of copying overlapping workflow and
handoff instructions.

The review covered the repository guidance, the Requirements Engineering Team,
the Product Design & Prototyping Team, and the canonical Evidence-Driven
Delivery example. The existing independent-team, repository, ticket, approval,
and result-based handoff behavior is preserved.

## Current behavior and ownership baseline

- `agent.md` already acts as a runtime prompt, but the Product Prototyper and
  Prototype Bootstrapper prompts also repeated repository, baseline, artifact,
  and handoff workflow owned by their skills and team contract.
- `team.md` describes team identity, member boundaries, shared communication,
  and high-level paths.
- `SKILL.md` contains the specialist work procedure, artifacts, validation,
  result classifications, and recovery rules.
- `team-config.json` contains the runtime roster and conditional rooted
  handoff rules.
- `agent-config.json` wires skills and tools but should not carry behavior.
- README guidance described these boundaries in several sections, but the
  ownership model was not consolidated and some wording said that skills owned
  routing rules without distinguishing result preparation from recipient
  selection.

## Preserved behavioral invariants

1. Each specialist remains responsible only for its own work, artifacts,
   validation, result classification, and recovery.
2. Requirements Engineering remains the requirements and approval owner;
   Product Design & Prototyping remains the prototype repository and experience
   owner; Prototype Bootstrapper remains a bounded baseline specialist.
3. The Evidence-Driven Delivery example remains an incremental
   investigator/planner/implementer/validator loop.
4. Result-based agents persist their result, call `get_handoff_rules`, apply
   every matching rule, message every exact returned recipient, and stop.
5. `team-config.json` remains the authority for conditional route conditions
   and canonical recipient addresses.
6. The current `send_message_to` convention is preserved. `delegate_task` stays
   a separate delegated-execution mechanism, not a silent substitute for a
   completed-result handoff.

## Macro analysis

### Ownership and package structure

**Finding M1 — Medium — README ownership guidance was distributed across
overlapping sections.**

The README separately described team packages, conditional handoffs, agent
packages, and core files. Those sections were individually useful, but there
was no single matrix stating what each file owns and must not own.

**Disposition: Add and align.** Add one canonical file-ownership matrix and a
review checklist. Keep the existing detailed sections as implementation
guidance, but update them to reference the same ownership model.

**Finding M2 — Medium — the Product Prototyper and Bootstrapper agent prompts
contained reusable work procedure.**

Repository layout, baseline parity, ticket/commit ownership, and acceptance
details were already authoritative in the team contract and bundled skills.
Repeating them in `agent.md` made the fixed runtime shell longer and created
potential drift.

**Disposition: Move/trim.** Keep identity, skill selection, global boundaries,
communication convention, and tone in `agent.md`; leave detailed procedure and
artifacts in the skills/team contract.

**Finding M3 — Low — the planner skill named downstream roles in its routing
step.**

The team config already owns the conditional recipient mapping, while the
planner skill should define incremental planning and the result needed for
routing.

**Disposition: Update.** Make the skill prepare and classify the next result,
then use the configured handoff protocol without encoding recipient selection.

### Work and handoff flow

The stable cross-file flow is:

```text
input -> specialist skill -> artifacts/result -> classification
-> get_handoff_rules -> all matching team-config rules
-> declared handoff tool -> exact returned recipients -> stop
```

The skill owns the left side and the result contract. `agent.md` or `team.md`
states the team's communication convention. `team-config.json` owns the
conditional routes and addresses. This allows routing to change without
rewriting specialist work, while allowing the same agent to be invoked by a
user, another agent, or a resumed workflow.

## Micro analysis

- Replaced the ambiguous phrase “skills own routing rules” with the more
  precise distinction: skills own result classification and the post-work
  handoff procedure; team config owns route conditions and recipients.
- Explicitly documented that all matching rules may apply, so wording does
  not imply a single recipient.
- Explicitly documented that a team must choose one normal handoff mechanism
  for each workflow and must not mix `send_message_to` and `delegate_task`
  accidentally.
- Kept the standard agent-shell transition concise and consistent across the
  Requirements Engineer, Product Prototyper, and Prototype Bootstrapper
  prompts.
- Removed repeated Product Prototyper and Bootstrapper procedure from their
  agent prompts without removing the authoritative skill or team instructions.

## Files changed

- `README.md`
- `agent-teams/requirements-engineering-team/agents/requirements-engineer/agent.md`
- `agent-teams/product-design-prototyping-team/agents/product-prototyper/agent.md`
- `agent-teams/product-design-prototyping-team/agents/prototype-bootstrapper/agent.md`
- `agent-teams/evidence-driven-delivery-team/agents/planner/skills/planner/SKILL.md`
- this analysis artifact

## Validation

- Reviewed the canonical README contract and its cross-references.
- Reviewed the three current Requirements/Product agent shells and their team
  contracts for ownership and communication alignment.
- Confirmed the three relevant `agent-config.json` files expose
  `get_handoff_rules` and `send_message_to`.
- Confirmed `team-config.json` remains the routing authority and no route
  addresses were moved into the agent shells.
- `git diff --check` passed.
- A second macro pass found no ownership or flow contradiction. A second micro
  pass found no remaining ambiguous recipient wording in the changed guidance.

Target skill files changed during implementation:
`agent-teams/evidence-driven-delivery-team/agents/planner/skills/planner/SKILL.md`.

Analysis artifact:
`.codex/artifacts/agent-package-separation-of-concerns/optimization-analysis.md`
