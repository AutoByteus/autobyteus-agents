# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (the user asked to analyze the whole team against the creator's principles and improve it)
- Update intent: `repair` and `simplify` (bring a team built before the principles existed into line)
- Package type: `team`
- Target package: Article Writing Team, `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/article-writing-team`
- Scope included: `team.md`, `team-config.json`, both members (`article-writer`, `article-reviewer`), their three skills with all references and templates, and `shared/writing-principles.md`. Also the README row and sibling-team conventions used for comparison.
- Scope excluded: STORM Team (a different team that also writes articles; the request says "article writing team", which is this one). Content of the author-style profile `ryan.md` and its examples (voice content, not structure). The `autobyteus-skills` repository.
- Request/reference: "We have an article writing team. Use your design principles to analyze the whole team … analyze carefully and improve it."
- Commit read: `ed23b4d` on `main`, in sync with `origin/main` (fetched). Unrelated local edits exist in other teams; they are not touched.

## Files read in full

Team: `team.md`, `team-config.json`.
Writer: `agents/article-writer/agent.md`, `agent-config.json`, `skills/article-writing/SKILL.md`, `references/{style-workflow,style-registry,platform-output-rules}.md`, `references/profiles/{ryan,normy,profile-template}.md`, `references/examples/{ryan-examples,normy-examples,example-template}.md`, `templates/{outline,visual-plan,visual-asset-index,style-profile-notes}-template.md`, `skills/article-researcher/SKILL.md`.
Reviewer: `agents/article-reviewer/agent.md`, `agent-config.json`, `skills/article-reviewer/SKILL.md`, `templates/review-report-template.md`.
Shared: `shared/writing-principles.md`.
Comparison: `evidence-driven-delivery-team` planner (config, agent.md), `storm-team` cited-article-writer (config, agent.md), `kids-picture-story-team` picture-book-illustrator (config, image-tool rule), `research-to-deck-team` deep-researcher agent.md; creator `package-design-principles.md`, `skill-authoring-principles.md`, `package-anti-patterns.md`, `result-and-handoff-contract.md`.

## Baseline

| File | Current responsibility |
| --- | --- |
| `team.md` | Purpose, shared-reads rule, artifact visibility rule, roles, 7-step delivery flow, working agreement, issue-routing table, ownership, send-back rules, team rules. Says "detailed operating rules … belong in each member's own agent definition", then restates many of them. |
| `team-config.json` | Coordinator `article_writer`; two members; two routes (writer→reviewer, reviewer→writer), one broad rule each. |
| `article-writer` `agent.md` / config | Identity, "follow article-researcher then article-writing". Tools include `generate_speech`; no `get_handoff_rules`; no post-work transition. |
| `article-reviewer` `agent.md` / config | Identity, "follow article-reviewer". No `get_handoff_rules`; no post-work transition; carries three process-control tools. |
| `article-writing` skill | End-to-end writer workflow: brief, understanding, style, outline, visual plan, draft, revise, handoff. |
| `article-researcher` skill | Research phase of the same agent: reuse, brief, notes, sources, ledger, `research-handoff.md`, readiness gate. |
| `article-reviewer` skill | Review modes, 8 steps, decision values, re-review rule. |
| `shared/writing-principles.md` | Quality bar read by both roles. |
| `references/*`, `templates/*` | Style workflow, registry, profiles, examples, platform rules (writer-private); outline, visual, style templates; review template. |

## Preserved behavior

- Writer is the entry and coordinator; reviewer gates understanding/style/outline/visual plan before drafting, then the draft; every revision gets a full-package re-review.
- Hierarchical outline with idea spine, representation decision per idea, question ladder, section and paragraph beats; positive-first openings in non-essay modes; "style never creates facts"; visualization-load trigger; builder ownership voice; user corrections override style habit; bilingual fidelity.
- All decision values (`Pass`, `Brief Gap`, … `Unclear`), the `ryan` and `normy` profiles, the style registry protocol, and the artifact file names.
- Image production order stays as written (see open question 1).

## Findings

Ordered by authoring-standard priority.

| # | Area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure/ownership: handoff wiring broken | Neither `agent-config.json` has `get_handoff_rules`; neither `agent.md` has the post-work transition (compare planner, cited-article-writer). The team-config rules can never be retrieved. Detection of anti-pattern 12. | `agent-config.json`, `agent.md` ×2 | Routing depends on skill text and chat memory, not the configured routes. | Add `get_handoff_rules`; add the transition to both `agent.md`. |
| 2 | Structure: recipients hard-coded in skills | `article-writing` SKILL line 273 "Send the outline package to `article_reviewer`"; `style-workflow.md:60`; review template "Next Handoff – Send back to". Anti-pattern 12. | skills, team-config | A rename or reroute needs edits in skill text. | Skill classifies the result ("ready for outline review"); config owns recipient. |
| 3 | Structure: coordinator duties missing | `team-config.json` registers `article_writer`; `team.md:7` says "no separate orchestrator"; no file says the writer answers the user at the end. Reviewer `Pass` routes to writer (config) but writer's skill never says what to do with a pass. | `article-writing` skill, `team.md` | No role owns final delivery or user questions. | Writer's skill gets a "finish" step and a "ask the user" rule; `team.md` states the entry/final contract. |
| 4 | Ownership: `team.md` is a second procedure | `team.md` Delivery Flow, Working Agreement, Send-Back Rules, Team Rules (≈60 lines) restate writer/reviewer steps and principles; its own line 8–9 says they belong in members. The Issue Routing table sends all 11 values to one role. | `team.md` | Competing procedure; three places to edit per rule. | Reduce `team.md` to purpose, roster/boundaries, entry/final contract, cooperation summary, pointers. |
| 5 | Ownership: reviewer's quality bar is unreadable to the reviewer | Reviewer must judge "platform fit" and "mobile-legible" visuals; `platform-output-rules.md` sits in the writer's skill, which the reviewer does not have. No "mobile" text anywhere in the reviewer's package (grep). | shared files | Platform fit is reviewed without its rules. | Move `platform-output-rules.md` to `shared/`; both roles read it. |
| 6 | Ownership: artifact list copied four times and incomplete | Artifact lists in `team.md` (visibility rule), writer skill (Package Artifacts + Handoff Rules), reviewer skill (Expected Inputs). None lists `research-handoff.md` or `research-open-questions.md`, which the researcher produces and the writing skill requires (`SKILL.md:87`). | new `shared/article-package.md` | The reviewer is never told to read the research handoff; writer's list omits a required file. | One shared package file lists artifacts, owners, and what each handoff carries; others point to it. |
| 7 | Ownership: same rule in many files | Opening-progression rule: 8 files (principles §3, writer steps 3/4/5/8, style-workflow ×3, ryan ×3, reviewer ×4, templates). Image tool order: 5 files (`image_gen__imagegen` ×7). Investigation modes: principles, writer skill, researcher skill. Outline checks: writer step 5 (16 lines), reviewer step 4 (22 lines), outline template gate, principles §4–4C. Visual-plan fields: writer step 6 (23 lines) and the template. Profile creation: style-workflow step 2 and registry. Revision precedence: principles §13, style-workflow, ryan.md. Anti-pattern 4. | principles, templates, registry | Fixing one copy leaves the rest; copies already drift (e.g. gate lists differ). | One owner each: principles (rules, mode names, image tool order), templates (field lists and gates), registry (profile creation). Others point. |
| 8 | Ownership: `brief.md` has two writers | Writing step 1 (15 fields incl. style, visuals) and researcher step 2 (11 fields) both "write `brief.md`". | writing skill | Two procedures for one file; fields disagree. | Writing skill creates it; researcher updates research fields only. |
| 9 | Flow: reviewer cannot tell which mode applies | Six review modes listed with no rule for choosing; the report template has no mode-dependent fields; "Polish Review" has no steps; `Unclear` is undefined; one report with several finding classes has no rule for the single decision value. | reviewer skill | Inconsistent decisions between runs. | Add a mode-selection rule from what the package contains, define `Unclear`, decision = class of the highest-priority finding. |
| 10 | Flow: pre-draft gate repeats earlier gates | Writer step 7 lines 218–228 re-list checks from steps 4–5. | writing skill | Longer procedure, drift risk. | Step 7 keeps only what is new: reviewer pass, visual plan ready. |
| 11 | Flow: no recovery for user-owned gaps | `Brief Gap`/`Source Gap` can need information only the user has; no rule tells the writer to ask. | writing skill | Writer may guess or loop. | One rule: ask targeted questions for gaps only the user can close. |
| 12 | Grounding: tool list does not fit the work | `generate_speech` on the writer: no speech step in any file. The writer's skill requires "image-to-image" but the writer has no `edit_image` (the picture-book illustrator has it). Reviewer has `start_background_process`/`get_process_output`/`stop_background_process`; its work only reads and may run a cited command with `run_bash`. | `agent-config.json` ×2 | Required step cannot be done; unused tools widen the surface. | Writer: −`generate_speech`, +`edit_image`. Reviewer: −3 process tools. I first also planned `read_media_file` for viewing rasters, then dropped it: the repo's image reviewers inspect with `read_file` only, and the tool's image support is not verified. Skills now say "view the final raster". |
| 13 | Grounding: image order differs from a sibling team | Article team: `image_gen__imagegen` first when available. Picture-book team: `generate_image` first, `image_gen__imagegen` only as fallback and "never primary". Neither tool order was observed to be right. | writer skill | Two teams give opposite instructions for the same runtime. | Not changed; user decision (open question 1). |
| 14 | Grounding/clarity: broken pointer | `style-workflow.md:97` sends WeChat and Medium work to "mobile-legibility rules" in platform rules; only the Medium section has them; WeChat (mobile-first) has none. | platform rules | WeChat diagrams get no legibility check. | Make the legibility rules a platform-neutral section. |
| 15 | Economy: package-history and meta prose | Writer skill lines 9–10 ("do not add another research agent or another writing skill"); `team.md:19` (not "a second attached writer skill"); principles "Required Questions" (≈25 lines) restate the rules above them; template `Decision Values` duplicates the skill. | various | Words that change no action. | Remove; keep the failure-pattern list (a detection aid). |
| 16 | Boundary: reviewer's limit stated only in `team.md` | "Do not ask the reviewer to fix structure by rewriting" is only in `team.md` Send-Back Rules; the reviewer skill lacks it. | reviewer skill | Rule disappears when `team.md` is trimmed. | Move one line into the reviewer skill. |

No instance of anti-pattern 1 (forbidding user-directed collaboration), 2 (outcome only a parent routes), 3 (another team's internals), 5 (identity collision: "Article Writing Team" is unique), 6 (project specifics in a reusable skill: `AutoByteus` appears only in the `ryan` profile and its examples as style content), 7, 8, 15 was found.

## Planned changes

Config and agent shells
- `agents/article-writer/agent-config.json`: add `get_handoff_rules`, `edit_image`; remove `generate_speech`.
- `agents/article-reviewer/agent-config.json`: add `get_handoff_rules`; remove the three process tools.
- Both `agent.md`: add the post-work transition (`get_handoff_rules`, `send_message_to`, user-directed collaboration, return to user if no rule). Writer shell names intake and final delivery.
- `team-config.json`: replace the two broad rules with rules that name the result states the roles produce (outline-stage package ready; full draft ready; review decision `Pass`; review decision with required revisions).

Team and shared
- `team.md`: shorten to navigation and cooperation (see finding 4).
- New `shared/article-package.md`: artifacts, owners, the cumulative package for each handoff, active user constraints.
- `shared/platform-output-rules.md`: moved from the writer's references; platform-neutral visual legibility section.
- `shared/writing-principles.md`: name the investigation modes; keep image tool order here as the one owner; remove "Required Questions".

Skills and templates
- `article-writing/SKILL.md`: pointers for outline and visual-plan fields; remove duplicated mode list; one `brief.md` owner; shorter pre-draft gate; ask-the-user rule; finish step; classified handoff without recipient names; link updates.
- `article-researcher/SKILL.md`: updates research fields of `brief.md`; modes by pointer; adds the artifact-package pointer.
- `article-reviewer/SKILL.md`: mode selection, `Unclear`, decision mapping, boundary line, `research-handoff.md` in inputs, shared platform rules, a shorter outline checklist.
- `references/style-workflow.md`, `style-registry.md`: link updates, single owner for profile creation, no recipient names.
- Templates: `visual-plan-template.md` gains visual types and status values; `review-report-template.md` loses duplicated decision list and "Send back to".

Creator
- `agents/agent-package-creator/.../package-anti-patterns.md`: add an entry for tool lists that do not match the work, and for a reviewer's standard held in files it cannot read.

## Open questions and approvals

1. **Image tool order.** The article team prefers `image_gen__imagegen`; the picture-book team prefers `generate_image`. I kept the article team's order. Tell me which order you want and I will align both teams.
2. `ryan.md` and its examples hold generic cue tables that overlap `style-workflow.md`. I left the profile alone because it is voice content you tuned. Say so if you want it trimmed.
3. Approval: the request asks for improvement; no commit, push, or PR is authorized. Changes stay uncommitted.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| JSON parses | Pass | `team-config.json`, both `agent-config.json` |
| Links resolve | Pass (before change) | link scan; relative `../../../../shared/...` resolves to the team root |
| `get_handoff_rules` present | Fail | none in either config |
| Recipient names in skills | Fail | 3 hits (finding 2) |
| Reviewer has platform rules | Fail | no "mobile" text, rules in writer-only path |
| Duplicate rule scan | Fail | counts in finding 7 |
| Repo-wide: members of handoff-configured teams lacking `get_handoff_rules` | 27 other agents | listed in the result as follow-ups |
| Runtime catalog/registration | Not run | no runtime available |

## Next action

Apply the planned changes (this update), then validate and write the result.
