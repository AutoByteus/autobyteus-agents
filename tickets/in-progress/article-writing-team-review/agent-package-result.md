# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `team`
- Update intent: `repair` and `simplify` (a team written before the creator's principles existed)
- Target package: Article Writing Team, `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/article-writing-team`
- Scope included: team files, both members and their three skills, references, templates, shared files; two new anti-pattern entries in the creator.
- Scope excluded: STORM Team; voice content of the `ryan` and `normy` profiles and examples; other teams (follow-ups below).
- Request/reference: "Use your principles to analyze the whole team … and improve it."

## Summary

The team's routes could not run: neither agent had `get_handoff_rules` or a post-work transition. Beyond that, the same rules lived in many files (the opening-progression rule in eight, the image-tool order in five), `team.md` repeated the members' procedures, the reviewer could not read the platform rules it had to enforce, and tool lists did not match the work. I fixed these at their owners. All behavior in the analysis's "preserved" list is kept; no rule was dropped, only moved to one place or shortened.

## Ownership and design decisions

- Handoff retrieval and post-work transition: both `agent.md` + `get_handoff_rules` in both `agent-config.json`.
- Recipients and conditions: `team-config.json` only. Skills now classify results ("ready for pre-draft review") and name no recipient.
- Entry, coordination, and final delivery: writer's `agent.md` and `article-writing` Step 10; `team.md` summarizes.
- Files in a request and what each handoff carries: new `shared/article-package.md` (includes the previously missing `research-handoff.md`).
- Platform packaging and visual legibility: `shared/platform-output-rules.md` (moved from the writer's references so the reviewer can read it); legibility now covers WeChat too.
- Investigation mode names and image tool order: `shared/writing-principles.md`.
- `brief.md`: created by `article-writing`; research fields updated by `article-researcher`.
- Outline and visual-plan fields: their templates; skills point to them.
- Profile creation: style registry.
- Review mode choice, `Unclear`, one decision per report, minimum re-review: `article-reviewer`.
- Tool grants: writer −`generate_speech`, +`edit_image`; reviewer −`start_background_process`, `get_process_output`, `stop_background_process`.

## Changed paths

### Added

- `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/article-writing-team/shared/article-package.md`
- `/Users/normy/autobyteus_org/autobyteus-agents/tickets/in-progress/article-writing-team-review/{agent-package-analysis.md, agent-package-result.md, validate-package.py}`

### Modified (all under `agent-teams/article-writing-team/` unless noted)

- `team.md` (98 → 26 lines), `team-config.json`
- `agents/article-writer/{agent.md, agent-config.json}`, `agents/article-reviewer/{agent.md, agent-config.json}`
- `agents/article-writer/skills/article-writing/SKILL.md`, `skills/article-researcher/SKILL.md`, `agents/article-reviewer/skills/article-reviewer/SKILL.md`
- `agents/article-writer/skills/article-writing/references/{style-workflow.md, style-registry.md}`
- `agents/article-writer/skills/article-writing/templates/{visual-plan-template.md, visual-asset-index-template.md}`, `agents/article-reviewer/skills/article-reviewer/templates/review-report-template.md`
- `shared/writing-principles.md` (investigation modes named; "Required Questions" removed)
- `/Users/normy/autobyteus_org/autobyteus-agents/agents/agent-package-creator/skills/agent-package-creation/references/package-anti-patterns.md` (new entries 18 and 19; entries 4 and 12 extended)

### Moved or renamed

- `agents/article-writer/skills/article-writing/references/platform-output-rules.md` → `shared/platform-output-rules.md` (`git mv`; the rename is staged in the index, nothing is committed)

### Removed

- None.

## Durable artifacts and evidence

- Result: `/Users/normy/autobyteus_org/autobyteus-agents/tickets/in-progress/article-writing-team-review/agent-package-result.md`
- Analysis: `/Users/normy/autobyteus_org/autobyteus-agents/tickets/in-progress/article-writing-team-review/agent-package-analysis.md`
- Validation script: `/Users/normy/autobyteus_org/autobyteus-agents/tickets/in-progress/article-writing-team-review/validate-package.py` (run as `python3 -I validate-package.py <team dir>`)

## Approval state

- State: `Not required` for the edits (the user asked for the improvement). Commit, push, and PR: `Pending`; not authorized, nothing committed.
- Open decisions for the user are listed below.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | Pass | script: `team-config.json` and both `agent-config.json` |
| Frontmatter and names align | Pass | script: frontmatter `name` equals folder and `skillNames` for all three skills |
| Skill folder/frontmatter align | Pass | same |
| Configured `skillNames` resolve | Pass | script |
| Markdown links and references resolve | Pass | script walked every `.md` link in the team, including the moved file |
| Skill validator | Not available | `quick_validate.py` found, needs the `yaml` module, which is not installed; not run |
| Member refs, coordinator, rooted routes | Pass | coordinator is a member; `/article_writer` and `/article_reviewer` resolve; both agents have `get_handoff_rules` and `send_message_to` and the transition text |
| Recipient names in skills/templates | Pass | script finds no `article_writer`/`article_reviewer` in any `SKILL.md` or template |
| Placeholders | Pass | no TODO/TBD/FIXME |
| Imported shared dependencies | N/A | team has none |
| Ownership and cross-file consistency | Pass | greps for removed sections (`Issue Routing`, `cumulative`, `Handoff Rules`) and `image_gen__imagegen` (now only in `writing-principles.md`) |
| Scope/diff review | Pass | changes confined to the team, the creator's anti-pattern file, and the ticket folder; other modified files in the working tree predate this work |
| Final review against the standard and anti-patterns | Pass | two rounds: round 1 found the `read_media_file` grant unverified (the repo's image reviewers inspect with `read_file`), a stale "cumulative package" phrase, and a duplicate `Outline Revision` sentence; round 2 found nothing. Jargon scan of added lines found no vague qualifiers |
| Runtime registration and live behavior | Not run | no runtime available; routes and tool names are checked against files only |

## Risks, questions, and blockers

1. **Image tool order (your decision).** The article team prefers `image_gen__imagegen`, then `generate_image`. The picture-book team says the opposite and calls `image_gen__imagegen` "never primary". I kept each as it was. Pick one and I will align both.
2. `edit_image` is added to the writer because its skill asks for image-to-image editing; I took the tool name from the picture-book team's config and did not test it. Viewing images is described as "view the final raster", not tied to a tool, because I could not confirm that `read_media_file` handles images.
3. `ryan.md` repeats a cue table that `style-workflow.md` already holds. Left alone because it is your voice profile; say so if you want it trimmed.
4. Size: `article-writing/SKILL.md` went from 275 to 184 lines and `team.md` from 98 to 26; the shared principles are still about 280 lines and `ryan.md` and its examples are untouched.

### Follow-ups found by the new detection checks (not changed)

- Agents in teams with `handoffs` that lack `get_handoff_rules` (27, across 9 teams): classroom-simulation-team (professor, student); english-bridge-team (worker; uncommitted work in progress); kids-coloring-story-team (4 agents); kids-picture-story-team (4); manga-video-studio-team (4); narrated-presentation-video-team (3); research-to-deck-team (3); software-product-promo-video-team (4). Their skills may also name next recipients (anti-pattern 12).
- `software-engineering-team/agents/implementation-engineer` has `generate_speech` and no text mentioning speech, voice, or audio.
- Image-inspecting agents (about 15, e.g. kids-coloring, manga, deck, promo teams) lack an image-viewing tool by name; this is only a problem if `read_file` cannot show images, which I could not check. Confirm once before acting on it.

## Next expected action

Review the diff. Tell me the image tool order, and whether to commit or open a PR. If you want, I can run the same fixes on one of the follow-up teams.

## Handoff state

- `get_handoff_rules` called: Yes
- Matching routes: None (empty rule list)
- Handoffs sent: None
- Caller return: Yes; no rule matched and the user named no collaborator, so the result goes back to the user.

---

# Round 2 (2026-10-15): workflow fit for technical articles

Analysis: the "Round 2" section of `agent-package-analysis.md` (findings R1 to R7). Operation `update`, intent `optimize`. Status `Completed`. Added as commits on PR #50 at the user's request.

## Summary

The first round fixed wiring and ownership. This round fixes the workflow itself so it matches how a technical article is actually written: decide the point, outline small, draft, then review the draft against primary sources.

## What changed

- **Small outline (R1).** `outline-template.md` shrinks from about 100 fields to: the point, opening and reader, anchor example, a section chain (claim, question answered, evidence, leads-to), ending move, visual opportunities. The idea spine, reader progression, question ladder, and per-paragraph beats are gone. Principles 4 to 4C are rewritten to match; paragraph jobs are checked on the draft by a reverse outline. The pre-draft review is light and no longer asks for paragraph plans.
- **Primary-source spot checks (R2).** The reviewer checks the load-bearing claims, numbers, commands, and quotes against the primary source, not the writer's notes, and records them in the report. A contradicted claim is an `Evidence Gap`.
- **Short path (R3).** Rewrites, conversions, short notes, and supplied drafts skip research (unless claims need it), the pre-draft review, and usually the visual plan.
- **Decide the point (R4).** New Step 4: main claim, why this reader cares or what is new, strongest evidence, anchor example. Research stays open: drafting can send the writer back to `article-researcher` for a narrow gap.
- **Anchor example (R5).** New principle 4D: show the subject early with a real example, code, or numbers that were run or sourced. Carried into the outline template, drafting step, and review.
- **Cold read (R6).** The reviewer reads the draft alone before opening the package and notes where it was lost.
- **Round limit (R7).** A finding that survives two revisions is marked `recurring` and goes to the user for a decision.

## Changed paths (all under `agent-teams/article-writing-team/`)

`shared/writing-principles.md`, `shared/article-package.md`, `team.md`, `agents/article-writer/skills/article-writing/SKILL.md`, `.../templates/{outline,visual-plan,visual-asset-index}-template.md`, `.../references/style-workflow.md`, `agents/article-writer/skills/article-researcher/SKILL.md`, `agents/article-reviewer/skills/article-reviewer/SKILL.md`, `.../templates/review-report-template.md`. Added: nothing. Removed: nothing. Config files are unchanged in this round.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| JSON, frontmatter, `skillNames`, routes, links, no member names in skills, no placeholders | Pass | `validate-package.py` |
| Stale terms (`idea spine`, `question ladder`, `paragraph beat`, `enrichment chain`) | Pass | grep over all team `.md` files except the profile and example content, which are untouched |
| Reviewer can reach every rule it applies | Pass | spot-check, cold-read, and anchor rules live in principles 4D and 10 plus the reviewer skill |
| Final review against the standard and anti-patterns | Pass | one round: removed duplicate paragraph and enrichment tests from the reviewer, and marked Step 7 as full path only |
| Live behavior | Not run | No run of the team on a real article; the changes follow the reasoning above and should be tried on one |

## Risks and questions

- The lighter outline gives up early paragraph-level control. If drafts come back structurally weak, tighten the section chain, not the paragraph plan.
- Spot checks cost reviewer time: at least five claims per review. Adjust the number after a real run.
- Image tool order (open since round 1) is still your decision.

## Handoff state

- `get_handoff_rules` called: Yes (round 1 result; same empty list applies)
- Caller return: Yes
