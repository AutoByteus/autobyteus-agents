# Investigation Notes: Create Agent Team Architect

## Investigation goals

- Determine the repository's current standalone-agent and bundled-skill package conventions.
- Identify the canonical ownership boundaries among `agent.md`, `agent-config.json`, `SKILL.md`, README documentation, and result-based handoff rules.
- Confirm whether the requested two-mode `create`/`update` design fits existing practice and whether a separate optimizer/auditor/repair mode is necessary.
- Identify the minimum package and validation surface for a reusable Agent Team Architect.

## Sources and commands consulted

### Repository files

- [AGENTS.md](../../../AGENTS.md): current-repository-only scope, source-of-truth rule, and no-subagent rule.
- [README.md](../../../README.md): standalone-agent descriptions; supported agent-bundled and standalone skill layouts; shared team references; communication; outcome-based handoffs; separation-of-concerns contract; agent package authoring and sanity-check guidance.
- [agents/skill-optimizer/agent.md](../../../agents/skill-optimizer/agent.md): thin standalone-agent shell that delegates detailed behavior to an attached skill.
- [agents/skill-optimizer/agent-config.json](../../../agents/skill-optimizer/agent-config.json): explicit `skillNames` wiring and file-operation tools for a standalone skill-oriented agent.
- [agents/product-prototyper/agent.md](../../../agents/product-prototyper/agent.md): thin agent prompt pattern for a bundled/shared specialist workflow.
- [agents/research-engineer/agent.md](../../../agents/research-engineer/agent.md): standalone workflow identity and artifact-oriented responsibilities.
- [agent-teams/evidence-driven-delivery-team/agents/planner/agent.md](../../../agent-teams/evidence-driven-delivery-team/agents/planner/agent.md): explicit result-based handoff shell.
- [agent-teams/evidence-driven-delivery-team/agents/planner/agent-config.json](../../../agent-teams/evidence-driven-delivery-team/agents/planner/agent-config.json): `send_message_to` and `get_handoff_rules` runtime wiring.
- [agent-teams/evidence-driven-delivery-team/agents/planner/skills/planner/SKILL.md](../../../agent-teams/evidence-driven-delivery-team/agents/planner/skills/planner/SKILL.md): skill-owned workflow, artifacts, result classification, and handoff boundary.
- [agent-teams/evidence-driven-delivery-team/team.md](../../../agent-teams/evidence-driven-delivery-team/team.md): team-wide ownership and cumulative handoff principles.
- [agent-teams/evidence-driven-delivery-team/team-config.json](../../../agent-teams/evidence-driven-delivery-team/team-config.json): result-based conditional routing model.
- [agent-teams/article-writing-team/team.md](../../../agent-teams/article-writing-team/team.md): team contract versus member-skill boundary and artifact visibility.
- [agent-teams/software-engineering-team/team.md](../../../agent-teams/software-engineering-team/team.md): current result-based convention using `get_handoff_rules`, exact recipients, and `send_message_to`.
- [agent-teams/software-engineering-team/agents/architecture-reviewer/skills/architecture-reviewer/SKILL.md](../../../agent-teams/software-engineering-team/agents/architecture-reviewer/skills/architecture-reviewer/SKILL.md): exact recipient and stop-after-handoff wording.
- [agent-teams/software-engineering-team/agents/code-reviewer/skills/code-reviewer/SKILL.md](../../../agent-teams/software-engineering-team/agents/code-reviewer/skills/code-reviewer/SKILL.md): validation and handoff emphasis for review-oriented work.

### External/shared skill files

- [.codex/skills/software-engineering-workflow-skill/SKILL.md](../../../.codex/skills/software-engineering-workflow-skill/SKILL.md): staged engineering workflow, ticket artifacts, design gates, validation, and final handoff rules.
- [.codex/skills/software-engineering-workflow-skill/shared/design-principles.md](../../../.codex/skills/software-engineering-workflow-skill/shared/design-principles.md): data-flow spine, ownership, boundary encapsulation, separation of concerns, placement, naming, and no-legacy-retention design language.
- [.codex/skills/software-engineering-workflow-skill/stages/01-investigation/investigation-guide.md](../../../.codex/skills/software-engineering-workflow-skill/stages/01-investigation/investigation-guide.md): durable investigation dossier requirements.
- [.codex/skills/software-engineering-workflow-skill/stages/03-design/proposed-design-template.md](../../../.codex/skills/software-engineering-workflow-skill/stages/03-design/proposed-design-template.md): design basis structure.
- [.codex/skills/software-engineering-workflow-skill/stages/04-future-state-runtime-call-stack/future-state-runtime-call-stack-template.md](../../../.codex/skills/software-engineering-workflow-skill/stages/04-future-state-runtime-call-stack/future-state-runtime-call-stack-template.md): future-state use-case and spine model.
- [.codex/skills/software-engineering-workflow-skill/stages/05-future-state-runtime-call-stack-review/future-state-runtime-call-stack-review-template.md](../../../.codex/skills/software-engineering-workflow-skill/stages/05-future-state-runtime-call-stack-review/future-state-runtime-call-stack-review-template.md): two-clean-round review gate and missing-use-case sweep.
- [Skill Optimizer](../../../.codex/skills/skill-optimizer/SKILL.md): package topology, macro-first analysis, instruction ownership, explicit analysis-before-editing, validation, and two-pass optimization requirements.
- [optimization-rubric.md](../../../.codex/skills/skill-optimizer/references/optimization-rubric.md): detailed optimization review tests referenced by the Skill Optimizer workflow.

### Commands run

- `git fetch origin --prune`: refreshed tracked remote refs before dedicated worktree creation.
- `git worktree add -b codex/agent-team-architect /home/autobyteus/workspace/autobyteus-agents-agent-team-architect origin/main`: created the isolated ticket worktree from the current remote default branch.
- `find . -maxdepth 3 -type f | sort`: inventoried repository roots and agent/team package files.
- `find agent-teams/evidence-driven-delivery-team/agents/planner -maxdepth 4 -type f -print | sort`: verified a complete team-local bundled-skill topology.
- `grep -n '^###\\|^## ' README.md`: located README package-contract sections and standalone-agent placement.
- `grep -RIn --exclude-dir=.git --exclude='*.json' 'get_handoff_rules\\|send_message_to\\|Handoff' agent-teams agents README.md`: sampled current handoff wording and tool expectations.
- `git status --short --branch`: confirmed the original checkout had unrelated user changes and was not used for implementation.
- `git rev-parse main` and `git rev-parse origin/main`: confirmed `main` and refreshed `origin/main` resolved to the same base commit before worktree creation.

## Scope triage

**Classification: Medium.** The change is not application source code, but it introduces a reusable instruction package spanning an agent shell, runtime wiring, a bundled skill, reference files, README documentation, and ticket-level contracts. The design must preserve cross-file ownership and result-based handoff behavior, so a design basis and runtime-flow review are warranted. It does not require external services, schema migration, or product-runtime implementation.

## Current package and ownership findings

### Standalone agent pattern

Standalone agents use `agents/<agent-id>/agent.md` plus `agent-config.json`. `agent.md` is intentionally thin: frontmatter, identity, attached-skill authority, and only durable runtime stance. `agent-config.json` explicitly lists runtime tools and `skillNames`; skill presence alone is not treated as automatic attachment.

The new agent should therefore use:

```text
agents/agent-team-architect/
  agent.md
  agent-config.json
  skills/
    agent-team-architecture/
      SKILL.md
      references/
```

The selected skill is agent-specific, so bundling is preferable to adding a new shared top-level skill source.

### File responsibility boundaries

README's content contract is explicit:

- `agent.md`: identity, role, authoritative skill reminder, runtime-only stance, and universal handoff convention.
- `agent-config.json`: explicit skill attachment and runtime tool wiring.
- `SKILL.md`: inputs, work sequence, decisions, artifacts, validation, recovery, result classification, and handoff procedure for the agent's own responsibility.
- `team.md`/`team-config.json`: only relevant if this agent later participates in a team; they own team identity/boundaries and conditional recipient routing, not specialist workflow.
- references/templates: durable principles, schemas, and examples with one canonical owner per rule.
- README: human-facing package overview and links, not a competing runtime procedure.

This supports putting the create/update workflow in one skill and keeping the agent prompt small.

### Handoff pattern

Current team practice treats the completed result as the routing input:

1. complete only the owned responsibility;
2. persist the result and durable artifacts;
3. classify the result with route-relevant fields;
4. call `get_handoff_rules`;
5. apply every matching rule;
6. send to every exact returned `recipient_address` using `send_message_to`;
7. return to the user/caller when no rule matches and stop after successful handoffs.

The new standalone agent is not itself a team coordinator, so it should expose the handoff tools for future team use and keep recipient selection out of the skill. The skill can define the result envelope and procedure; a future containing team or caller owns conditional routing.

### Existing optimizer relationship

The repository already has a standalone `Skill Optimizer` for skill-level optimization, backed by the external `skill-optimizer` skill. The requested agent should not duplicate that responsibility or be named `Agent Team Optimizer`. It should optimize agent-team packages as its subject. If its update task changes a bundled skill, it can apply the same optimizer rubric as a quality lens while retaining agent-team architecture as its primary scope.

## Design implications

1. Use **Agent Team Architect** as the display name and `agent-team-architect` as the package ID. The name covers creation and evolution without overloading the word optimizer.
2. Use one bundled skill named `agent-team-architecture`; expose only `create` and `update` modes.
3. Treat `optimize`, `repair`, `correct`, `extend`, and `simplify` as update intents or requested outcomes, not separate modes. Treat audit and verification as internal quality steps.
4. `create` should inspect the target scope, choose a coherent topology, assign ownership, write the package, validate it, and deliver a result envelope.
5. `update` should inspect the existing topology, preserve intended behavior, apply the smallest coherent change, reconcile affected references/configuration, validate, and deliver a result envelope.
6. Detailed design doctrine and artifact schema should live in linked references, not be copied between README, agent shell, and skill.
7. The skill should include a `design basis` or `change plan` outcome so architecture changes are explicit. It should not act as the domain specialist that the designed team contains.
8. User approval remains authoritative for materially changed behavior, team scope, irreversible removals, or ambiguous ownership; the agent should surface those decisions instead of silently inventing them.
9. The package should require file-backed outcomes and cumulative artifact paths, but must not hard-code recipient addresses.

## Open questions

- No blocking questions. The user has chosen the two-mode design and has requested implementation using the design and optimization practices.
- The exact result artifact filename can be chosen during design; `agent-team-result.md` is a suitable default, with the actual workspace path supplied at runtime.

## Investigation conclusion

Repository evidence supports a medium-scope `Agent Team Architect` package with a single bundled `agent-team-architecture` skill and exactly two modes (`create`, `update`). The architecture should preserve the existing separation-of-concerns and conditional result-handoff conventions while keeping detailed best practices in the skill/reference topology rather than duplicating them in the README or agent shell.
