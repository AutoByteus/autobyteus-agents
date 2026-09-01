# Agent Team Design Principles

Use this reference with the `agent-team-architecture` skill. It defines the package-level design checks; the skill defines the create/update workflow.

## 1. Model the complete package spine

For every operation, identify the full meaningful path rather than only the file being edited:

- **Create:** request -> package contract -> ownership/topology -> canonical package files -> cross-file reconciliation -> validation -> result/handoff.
- **Update:** request + existing package -> baseline and impact map -> canonical owner change -> reconciliation -> validation -> result/handoff.

Name the start, end, governing owner, and reason for each primary or return path. Include a bounded local cycle when validation or re-entry materially changes the workflow.

## 2. Give every rule one canonical owner

Use the following boundaries:

| Concern | Owner |
| --- | --- |
| Agent identity and runtime stance | `agent.md` |
| Tool and skill wiring | `agent-config.json` |
| Specialist procedure and result classification | member `SKILL.md` |
| Team identity and high-level cooperation | `team.md` |
| Conditional recipients and route conditions | `team-config.json` |
| Detailed principles and reusable schemas | references/templates |
| Human-facing package overview | `README.md` |

A short reminder may point to an authoritative rule, but two files must not define competing versions of the same behavior.

## 3. Preserve authoritative boundaries

A caller should depend on one authoritative boundary for a concern. Do not make a team coordinator and a member skill both own the same specialist procedure. Do not make an agent prompt and its skill both define the full workflow. Do not put recipient addresses in a skill when runtime configuration owns them.

If a boundary lacks enough API or information for its actual use case, strengthen that boundary or redesign ownership explicitly. Do not normalize a bypass.

## 4. Keep team and specialist scopes separate

The Architect designs package structure. A target team's specialists own their domain execution, domain artifacts, private repositories, tickets, branches, worktrees, implementation details, and specialist-level validation. The Architect should describe those boundaries and modify package definitions only within the approved package-architecture scope.

`team.md` summarizes cooperation. Member skills explain how the member does its work. `team-config.json` routes completed results. These concerns are related but not interchangeable.

## 5. Keep the mode surface small

Use `create` when the target package is new and `update` when an existing package changes. Use `update_intent` to preserve why an update was requested:

- `optimize`
- `repair`
- `correct`
- `extend`
- `simplify`
- another concise, user-grounded reason

Audit, validation, and verification are checks inside the operation. Do not create separate modes for activities that do not have an independent user outcome or ownership boundary.

## 6. Prefer existing structures and clean ownership

Reuse the repository's current directory layout, frontmatter, configuration shape, skill packaging, handoff tools, and README conventions. Add a new layer only when it owns a distinct policy, transformation, lifecycle, or boundary. Remove obsolete or duplicate paths when a clean update replaces them; do not retain compatibility wrappers or dual paths merely to avoid cleanup.

Choose a bundled skill when one agent owns it. Use a shared standalone skill source only when multiple agents genuinely need the same behavior.

## 7. Make updates evidence-based

An update begins with a read of the complete relevant package. Record the baseline, requested delta, affected owners, and files. Preserve behavior outside approved scope. When intended behavior, scope, or ownership is ambiguous, record a requirement/approval gap and stop before making the material decision.

## 8. Design the artifact and handoff boundary

The result artifact is the boundary between package work and routing. It must make the operation, status, update intent, changed paths, evidence, approvals, risks, and next action visible without hidden conversation context.

After the result exists, `get_handoff_rules` is the routing authority. Apply every matching rule and use `send_message_to` for every exact returned recipient. If no rule matches, return to the caller. Do not hard-code a recipient or continue into another specialist's work.

## 9. Apply the validation bar

A package is not complete because files exist. Check:

- JSON parses;
- frontmatter and names agree;
- configured skills resolve to the intended folder/frontmatter;
- local links and references resolve;
- member references and rooted addresses resolve when a team is in scope;
- ownership is non-overlapping;
- README describes the package without duplicating runtime instructions;
- the diff contains only the approved scope;
- limitations and failed checks are recorded truthfully.

## 10. Keep instructions economical

Prefer a positive instruction that states the desired result. Keep a negative instruction only when it prevents a plausible safety, authority, ambiguity, recovery, output, validation, or obsolete-path mistake. Remove duplicated warnings and generic prohibitions that do not change a decision.
