# Supervised Research Team — design and acceptance

> Historical creation snapshot. Its fixed research-count stopping policy was superseded by [Task 8](../goal-directed-research/agent-package-analysis.md). Preserve its observations as baseline evidence; use [current validation](../goal-directed-research/validation.md) for the corrected package.

Task `autobyteus-agents-5`, Project `project_4b3f19d9-7fba-44b5-9747-84d2cd47dbc0`, delegated 2026-10-28. Operation: create; update intent: new-package. Base inspected: `origin/main` `020a8e0`. Work is isolated on `feat/supervised-research-team`; the user's unrelated uncommitted Creator launch configuration is untouched.

## Goal and boundaries

A reusable research team must catch premature completion, return actionable evidence gaps to the researcher, and independently assess the resulting claims against the original goal. Negative, contradictory and limited conclusions are valid; manuscript readiness is a separate assessment. No SemFlow investigation, downloads, paper submission, scheduler deployment, or changes to existing research roles are included.

The partial 2026-10-28 intake at `/home/autobyteus/workspace/autobyteus-marketing-workspace/research-intake/2026-10-28-chatgpt-conversation/task-result.md` was read as motivation only. Its self-reported results and missing downloads are not research evidence for this package.

## Existing capabilities and choice

Read in full: repository `AGENTS.md`, `README.md`, `docs/agent-package-authoring.md`; Creator skill and its design, skill-authoring, anti-pattern, live-check, result-contract references and result template; Research Engineer's definition, config, skill, principles and eleven templates; Deep Researcher's definition, config, skill and brief template. Compared the team summaries/configs of Evidence-Driven Delivery, Article Writing, STORM, and the Research To Deck summary; Mathematics config for contemporary routing. These latter comparisons are purpose/routing checks, not comprehensive audits of their internal skills.

- Research Engineer already joins literature, experiments, analysis, negative results and reproducibility. Its explicit standalone/self-review contract cannot be mounted unchanged to supply mandatory independent supervision.
- Deep Researcher supplies source-grounded briefs and claims checks, not the integrated empirical/reproduction loop or an independent research-completion gate.
- Evidence-Driven Delivery has message-driven return paths but splits research across delivery roles. STORM and Article Writing focus on sourced writing; Research To Deck reviews presentation artifacts. None is the requested research-supervision boundary.
- An existing unmerged analysis on `origin/analysis/evidence-driven-research-fit` (commit `2c30c2d`) was consulted as historical context, not applied. This task's explicit new-team direction supersedes its unresolved topology choice; existing packages remain unchanged.

**Two local roles, not three:** Researcher retains investigation, methods, implementation, analysis and any requested manuscript writing in one context. Research Supervisor combines intake, sustained supervision and independent critical review, and never repairs the researcher's primary results. A separate planner or writer would add context loss without another independence boundary. The research-to-supervisor handoff loses private working context; a goal-preserving study file, append-only evidence records and versioned cycle artifacts carry the relevant context instead. The gain is a fresh check of raw evidence rather than self-certification. No external domain reviewer is impersonated.

## Ownership

- `team.md`: purpose, roles and entry; config: roster/coordinator and conditional messages.
- Each `agent.md`: identity, skill reminder and universal post-work transition; config: tools and attachment.
- `research-supervision`: goal preservation, independent audit, continuation decisions, finite supervision budget, readiness assessment and final delivery.
- `evidence-research`: research methods, execution, reproducibility and candid candidate reports.
- `shared/research-contract.md`: shared scientific bar, durable artifact schema and delivery/recovery semantics. Both skills open symlinked copies; there is one canonical file.
- No inherited shared catalog dependency, model hard-coding or runtime restart guarantee.

## Planned verification

Static: JSON/frontmatter/skill attachment, one route per sender-recipient pair, complete state routing, link/symlink checks, standard skill validator, tool availability, diff and anti-pattern review.

Live: an isolated AutoByteus server using the installed container build and signed-in Codex via a temporary CLI home; only this team is imported, and all work lands in synthetic disposable study folders. This tests actual agent tools and message delivery, not Electron UI. No SemFlow files or user repositories are exposed as research inputs. Normal messages can only reach the two members of this test team; no delegated workers or external recipients are needed.

Case A: a seeded researcher completion claim based on only a smoke result faces a goal requiring held-out positive, negative and boundary cases. Observe supervisor rejection, an actionable assignment delivered through actual handoff tools, researcher continuation, independent recomputation and a limited defensible conclusion without inventing paper readiness. Also exercise initial intake and a real access/budget stop in bounded cases. Preserve prompts, artifacts, messages and model/runtime identities; map every claim to observed steps. No claim of recovery after a runtime crash without a supported external trigger.

## Decisions settled without extra intake

The user already chose separate research and review functions and finite honest limits. Two roles are the smallest match. Configurable bounded batches are safer than an unbounded keep-going promise; their defaults are declared in the supervision skill and can be changed by the user. No extra scientific scope or spending is silently authorized.
