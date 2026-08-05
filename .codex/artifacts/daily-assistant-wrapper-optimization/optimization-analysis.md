# Daily Assistant Wrapper Optimization Analysis

Review Status: Implementation complete - validation passed
Review date: 2026-08-05

## User request and review scope

The user asked for an analysis of the Daily Assistant agent on the premise that `agent.md` should be a wrapper and the attached skill should own the reusable operating behavior.

Scope:

- `agents/daily-assistant/agent.md`
- `agents/daily-assistant/agent-config.json`
- `agents/daily-assistant/skills/shell-first-operating-practice/SKILL.md`
- repository wrapper and agent-bundled-skill conventions in `README.md`

This is an analysis-only pass. No authoritative runtime file has been edited.

## Current behavior and package/file ownership baseline

### Runtime topology

1. `agent-config.json` owns the Daily Assistant tool list and explicitly attaches only `shell-first-operating-practice`.
2. `agent.md` currently owns the agent identity, broad task lifecycle, tone, preamble behavior, planning guidance, shell-routing reminders, change-safety rules, and final reporting reminders.
3. `shell-first-operating-practice/SKILL.md` owns a detailed shell-first operating procedure: orientation, inspection, search, planning, bounded command execution, repository/file operations, process and network operations, and verification.
4. There are no references, templates, scripts, or assets linked from the Daily Assistant skill. The package contains one wrapper, one config, and one skill.
5. `README.md` describes `agent.md` as a distilled runtime prompt and bundled `SKILL.md` as the fuller specialist workflow and collaboration guidance. It also requires explicit `skillNames` wiring.

### Current wrapper contents

`agent.md` is currently a substantial behavior prompt, not only a wrapper. It contains:

- role identity and a general-purpose mission;
- a pointer to the shell skill;
- default tone and user-update expectations;
- a universal first-tool `pwd` rule;
- an eight-step general task loop;
- preamble instructions and examples;
- planning criteria;
- generic tool-use and non-shell fallback guidance;
- file-change, safety, minimality, repository, and verification rules;
- a repeated critical-reminders summary.

### Current skill contents

The attached skill already contains most shell-specific versions of:

- orient/inspect/search/plan/execute/verify/report flow;
- `pwd`, repository-root, and dirty-worktree checks;
- precise search and bounded output rules;
- deterministic shell use and editing guidance;
- preservation of unrelated work and destructive-operation limits;
- process, network, archive, Git, project-runtime, and verification guidance;
- anti-patterns and failure-avoidance rules.

## Preserved behavioral invariants and boundaries

Any approved optimization must preserve unless the user explicitly approves a behavior change:

- Daily Assistant identity and general-purpose task scope;
- all tools and explicit `skillNames` wiring in `agent-config.json`;
- shell-capable work using the bundled shell-first practice;
- workspace orientation and repository-state inspection before shell edits;
- inspect-before-edit, precise search, bounded deterministic commands, and relevant verification;
- preservation of unrelated user work and complete paths;
- minimal focused changes and project-native commands where available;
- destructive-action caution and the existing Git protections;
- concise, direct, friendly communication and meaningful progress updates;
- planning for non-trivial work, adaptation after results, and a clear final report;
- no commits or branches unless explicitly requested, if this remains an agent-wide rule;
- no claim of verification when no check was actually run.

The user approved preserving the behavior while migrating reusable operating behavior into the attached skill and removing redundancy. The user also confirmed that the existing name `shell-first-operating-practice` is preferred and should remain unchanged. The implementation therefore keeps the current skill identifier and treats “shell-first” as the foundational operating strategy, not as a rename target.

## Macro analysis

### Package structure and ownership

**Finding M-1 — High — `agent.md` is not currently just a wrapper.**

Evidence:

- `agent.md` lines 7, 11-13, 15-28, 30-47, 49-70, and 72-77 contain behavior that is not merely identity or skill routing.
- `agent-config.json` attaches only `shell-first-operating-practice`.
- That skill’s frontmatter and purpose explicitly scope it to shell-capable operation (skill lines 2-16).

Impact: reducing `agent.md` to identity plus a skill pointer immediately removes the broad task loop, preamble behavior, non-shell tool guidance, and several agent-wide safety/reporting boundaries. The wrapper-only premise is therefore not behavior-preserving without first moving or re-scoping those rules.

**Finding M-2 — Medium — shell behavior has two competing owners.**

Evidence:

- The wrapper repeats the shell-skill pointer at lines 9, 55, and 76.
- The wrapper’s `pwd`/iteration/verification rules overlap with the skill’s core loop and entry procedure at lines 18-45 and 68-74.
- Preservation, destructive-action, Git, and verification guidance also appears in both files.

Impact: an update to the shell skill can leave the wrapper stale, and qualifiers can diverge. The shell skill should be the single owner of shell-specific operation; the wrapper should not restate that workflow.

**Finding M-3 — High — the attached skill’s scope does not cover the full configured tool surface.**

Evidence: `agent-config.json` exposes `run_bash`, web/page tools, background-process tools, media tools, image tools, and speech tools, but attaches only a shell-first skill. `agent.md` explicitly describes shell, web, browser, background-process, and media capabilities at lines 49-55.

Impact: if the wrapper becomes only a pointer to the current shell skill, browser, web, image, speech, and media tasks have no attached authoritative operating contract beyond generic model behavior. This is the key architectural decision that must be resolved before editing.

**Finding M-4 — Low — the wrapper has structural summary duplication.**

Evidence:

- `How You Work` gives an eight-step loop, while the skill gives a seven-step shell loop.
- `Critical Reminders` repeats the workspace, adaptation, skill-routing, preamble, and reporting rules already stated above.
- Shell skill routing is stated three times in the wrapper.

Impact: the wrapper is longer and less authoritative than necessary, and repeated reminders can create prompt noise without adding a new branch or output.

**Finding M-5 — Keep — runtime wiring is correctly owned by `agent-config.json`.**

Evidence: the skill name is explicitly declared in `skillNames`, and the configured tool names are kept out of prose. This matches the repository’s agent-bundle convention.

Impact: no config relocation is needed. Any skill rename or folder move would require a coordinated config update and explicit validation.

### Content architecture and logical flow

The intended wrapper-only spine would be:

`role identity -> authoritative skill pointer -> runtime-only specialization`

The current package spine is instead split:

- `agent.md`: general task behavior plus shell routing;
- `shell-first-operating-practice/SKILL.md`: shell execution behavior;
- `agent-config.json`: tool/skill wiring.

The approved architecture is option 1: the existing skill remains named `shell-first-operating-practice` and becomes the single owner of the reusable operating behavior. The name is intentionally retained because “shell-first” accurately describes the preferred way to use Unix-style system tools, while “operating practice” describes repeatable foundational habits rather than a task-specific workflow. The skill may include the general task loop, communication, planning, safety, and reporting rules needed to apply that practice without changing its identifier.

### Behavioral grounding, outputs, validation, recovery, and handoff

The current shell skill has clear operating outputs and quality gates: changed state, verification, and remaining caveats. It also has recovery/avoidance controls for bounded commands, destructive operations, processes, Git, and unverified results.

The wrapper adds agent-wide behaviors that are not represented in the skill:

- pre-tool user communication;
- when to plan for non-trivial work;
- adaptation after observing results;
- use of non-shell tools when shell is unavailable or not applicable;
- broad final reporting and root-cause/minimality guidance;
- the explicit no-commit/no-branch boundary.

These are grounded in the existing wrapper, but there is no independent runtime or repository source proving that they must be universal. If they are intended commitments, they must move to the authoritative general skill before the wrapper is reduced. If they are only authoring guidance, they may be removed after confirming no user-visible behavior depends on them.

No additional handoff artifact, recovery file, script, or reference is needed for this analysis. The current package has no cross-file link topology to repair.

### Metadata and cross-file consistency

- `skillNames`, the skill folder name, and the skill frontmatter name currently agree.
- The wrapper metadata `description: General Agent` and `role: General Agent` are accurate but generic; they do not explain the shell-first specialization or the broad configured tool surface.
- The skill name, folder, and configured `skillNames` entry will remain unchanged. The skill description and purpose may be clarified so that “shell-first” is understood as the foundational operating strategy rather than a claim that every task is shell-only.
- Updating catalog metadata would be a separate, low-risk clarity improvement, but it is user-visible and not required to establish wrapper/skill ownership.

## Micro analysis

This pass is downstream of the macro scope decision above.

### Wording and terminology

- `shell-capable work`, `shell-first-operating-practice`, and `run_bash` are consistently named.
- `agent.md` alternates between broad tool behavior and shell-specific routing, which makes the scope of “authoritative” unclear.
- `Use the tools provided by the runtime` is generic and adds little because the configured tool surface already provides the contract.
- `How You Work` and `Core Operating Loop` should not both describe the same normal path.
- The `Critical Reminders` section is a recap rather than a distinct decision point.

### Qualifiers and transitions

**Important qualifier conflict:** the wrapper says the first tool action for every task must be `pwd`; the skill scopes its `pwd` entry rule to starting a new task and allows a host prompt to have already performed it. If the rule remains universal, one owner must state that precisely. If it is intended only for shell/repository work, the wrapper’s universal wording should be narrowed; that would be a behavior change requiring approval.

The transition from general task behavior to shell behavior is currently repeated rather than routed once. A concise wrapper should state the route once, and the skill should own the detailed shell path.

### Redundancy and economy

The largest economy opportunity is structural: remove duplicated shell instructions from the wrapper only after their required behavior has a surviving owner. Sentence-level deletion alone would risk deleting the only owner of non-shell behavior.

Potential micro dispositions:

- **Keep or Move:** concise tone and meaningful progress updates; retain in the wrapper only if tone is intentionally runtime-only, otherwise move to the general skill.
- **Move:** the general task loop, preamble rule, planning criteria, adaptation/reporting guidance, and general change boundaries if the attached skill becomes the sole behavior owner.
- **Merge:** the wrapper’s workspace/iteration/verification language with the skill’s shell loop and entry procedure.
- **Remove:** repeated `Critical Reminders` after the surviving owner is confirmed.
- **Remove or Rewrite:** the generic “use tools provided by the runtime” sentence and duplicated shell-routing sentences.
- **Keep:** the no-commit/no-branch rule if it remains an intentional agent-wide authority boundary; otherwise move it to the authoritative general skill.

### Negative and prohibitive instruction dispositions

| Instruction | Disposition | Reason |
| --- | --- | --- |
| “Your first tool action … must be to run `pwd`” | Keep or Rewrite | It protects workspace orientation, but its universal scope conflicts with the shell-specific skill boundary and may affect web/media-only tasks. Resolve scope before editing. |
| “If no shell tool is available, use the best available workspace-inspection method” | Move or Remove | Keep only if the general operating skill owns non-shell fallback; otherwise the configured agent always exposes `run_bash` and the shell skill already says not to pretend shell work. |
| “Do not commit changes or create branches unless explicitly requested” | Keep or Move | Distinct side-effect/authority boundary; not redundant with the current shell skill’s narrower Git prohibitions. |
| “Avoid destructive actions unless the user explicitly asks” | Merge | A real safety boundary already expressed in the shell skill; keep one authoritative copy. |
| “Follow the shell skill instead of relying on dedicated file tools” | Rewrite or Remove | The configured agent does not expose the ordinary dedicated text-file tools named by this guidance; the positive shell-first route may be sufficient. Preserve media-specific tools if they have separate semantics. |
| “Keep the user informed with concise preambles and a clear final summary” | Keep or Move | User-visible communication contract; move if the skill becomes the sole owner, otherwise retain in a short wrapper. |

## Findings and evidence summary

### Macro findings

- **M-1 High:** the current wrapper owns broad behavior that the attached shell-only skill does not cover.
- **M-2 Medium:** shell operation is duplicated across wrapper and skill.
- **M-3 High:** one attached shell skill does not provide an authoritative contract for the full configured web/browser/media tool surface.
- **M-4 Low:** repeated loops, reminders, and routing lines create structural redundancy.
- **M-5 Keep:** explicit config wiring is correct and should remain in `agent-config.json`.

### Micro findings

- The most important wording issue is the unresolved scope of the universal `pwd` rule.
- Repeated shell-routing and reminder language can be removed after ownership is stabilized.
- The tone and user-update rules are concise but need an owner decision.
- Several prohibitions protect real boundaries and must not be removed merely to make the wrapper shorter.

## Approved improvements

### Macro actions implemented

1. **Move — `agents/daily-assistant/skills/shell-first-operating-practice/SKILL.md`**
   - Moved the general task loop, entry procedure, preambles, planning guidance, communication style, tool routing, safety boundaries, minimality rules, and reporting requirements into the skill.
   - Kept the existing `shell-first-operating-practice` name because it accurately describes the foundational operating strategy. The skill now explicitly says shell-first is not shell-only.

2. **Update — `agents/daily-assistant/agent.md`**
   - Reduced the wrapper to Daily Assistant identity plus one authoritative skill pointer.
   - Removed duplicated workflow, tone, preamble, planning, tool-use, safety, and reminder sections.

3. **Keep — `agents/daily-assistant/agent-config.json`**
   - Preserved all tools and the existing `skillNames` entry without renaming or rewiring the skill.

### Micro actions implemented

1. **Merge — normal-path instructions**
   - The skill now owns one general task loop and one clearly scoped shell-first command loop.
2. **Keep — workspace entry**
   - Preserved the first-tool `pwd` behavior and repository-state checks in the skill.
3. **Remove — duplicated wrapper text**
   - Removed the wrapper’s repeated shell-routing lines, `Critical Reminders`, and duplicate process guidance.
4. **Keep — safety and authority boundaries**
   - Preserved unrelated-work protection, destructive-action caution, no-commit/no-branch behavior, and honest verification reporting in the skill.
5. **Keep — user-visible communication**
   - Preserved concise/direct/friendly tone, meaningful progress updates, preambles, assumptions, environment requirements, and next-step guidance in the skill.

## Assumptions, open questions, risks, and validation plan

### Assumptions

- The current repository is the only scope; unrelated dirty worktree changes remain untouched.
- Existing shell-first behavior and general Daily Assistant behavior are intentional and should be preserved.
- The skill identifier should remain `shell-first-operating-practice`.

### Open questions

None blocking. A future change may move this agent-bundled foundational skill into a shared standalone source if multiple agents need it; that is outside this change.

### Risks

- Making the wrapper minimal before moving general behavior would silently weaken non-shell task behavior; the implementation moved that behavior first.
- Broadening a skill named `shell-first-operating-practice` without clarifying its purpose could create scope and metadata drift; the description and purpose now explain that shell-first is the foundational strategy, not a shell-only restriction.
- The existing skill is currently agent-bundled. Reusing it across multiple agents later may justify moving it to a shared standalone source, but that is outside this approved change.
- Removing the no-commit/no-branch or honest-verification rules would weaken authority and safety boundaries.
- Keeping the universal `pwd` rule may add unnecessary shell work for non-shell tasks; narrowing it would be a deliberate behavior change.

### Validation performed

1. Standard skill validator: passed with `Skill is valid!`.
2. `agent-config.json` JSON parsing: passed.
3. Skill folder/frontmatter/config-name resolution: passed.
4. Markdown reference-path check: passed; no broken local links exist.
5. Focused ownership checks: passed; wrapper contains one skill pointer and the migrated sections are present in the skill.
6. `git diff --check`: passed.
7. Trailing-whitespace check: passed.

### Final two-pass review

- Macro: package topology, wrapper/skill/config ownership, preserved task flow, shell entry, safety boundaries, outputs, verification, and future reuse boundary are coherent.
- Micro: duplicated wrapper reminders and routing were removed; terminology remains `shell-first-operating-practice`; qualifiers are explicit; retained prohibitions protect distinct boundaries.

### Validation plan for future changes

- Repeat the package validator, config-resolution, link, whitespace, and two-pass checks if the skill is later moved or shared.

## Implementation and validation record

- Approval: User approved preserving behavior, migrating reusable behavior into the skill, removing redundancy, and retaining the name `shell-first-operating-practice`.
- Target runtime files changed after approval: `agents/daily-assistant/agent.md` and `agents/daily-assistant/skills/shell-first-operating-practice/SKILL.md`.
- Behavior preserved: Daily Assistant identity, task loop, first-tool workspace orientation, preambles, planning, tone, shell-first operation, file/repository safety, no-commit/no-branch boundary, verification, and final reporting.
- Intentional structural change: reusable behavior now has one authoritative skill owner; `agent.md` is a thin wrapper.
- Skill name: unchanged as `shell-first-operating-practice`.

## Target skill files changed during analysis: None

## Target skill files changed after explicit approval

- `agents/daily-assistant/agent.md`
- `agents/daily-assistant/skills/shell-first-operating-practice/SKILL.md`

## Analysis artifact

`.codex/artifacts/daily-assistant-wrapper-optimization/optimization-analysis.md`
