# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `team`
- Update intent: `restructure` — split content ownership from website operation so any channel can be added without a new agent
- Target package: Marketing Team — `/home/autobyteus/workspace/autobyteus-private-agents/agent-teams/marketing-team`
- Scope included: Marketing Team roster, routes, and summary; new Marketing Content Creator with bundled skill; removal of the six platform/coordinator agents; Web UI Operator team participation; `autobyteus-org` routes; workspace style library and site profiles migrated from the retired skills.
- Scope excluded: `autobyteus-skills` (`web-ui-automation` unchanged); `northstar-operating-company` marketing-org (separate org-local team); existing run/data folders in the marketing workspace; pre-existing uncommitted `agent-config.json` changes in `autobyteus-agents`.
- Request/reference: User conversation 2026-09-28. One Content Creator the user works with and a Web UI Operator that publishes. Existing site knowledge converted to native-input site knowledge. The Org updated. Content folders owned by the Content Creator. Writing styles kept.

## Summary

The team now has two members. `marketing_content_creator` (coordinator, team-local) owns briefs, drafts, the feedback and approval loop, lasting-preference learning, media, run folders, and published records. `web_ui_operator` (the shared public agent) does all website work from file-backed requests and returns a classified `task-result.md`.

Writing knowledge moved to `<marketing-workspace>/marketing-style/`:
- one voice (`ryan`)
- AutoByteus positioning
- five channel guides
- analysis playbooks

Website knowledge moved to `<marketing-workspace>/web-ui-sites/<host>/` for six hosts. The operator reads these profiles.

## Ownership and design decisions

- Content, approval, and published record: `marketing-content-creation/SKILL.md` (bundled, private).
- Voice, channel style, positioning, and analysis playbooks: workspace `marketing-style/` (data the creator reads and updates; a channel guide owns its run-folder root).
- Website mechanics: workspace `web-ui-sites/` (the operator's knowledge), actuated only with native input per `web-ui-automation`.
- Request and result contract: `publish-request-template.md` (creator) and the operator skill's `Completed` / `Blocked` / `Needs Decision` classification and `task-result.md`.
- Routing: `team-config.json`, with two rule sets. Org cross-team routes are in `autobyteus-org/org-config.json`, now addressing `/marketing_team/marketing_content_creator`.
- Recorded approval: the operator accepts a request file recording the user's approval of the exact content, media, and destination, and never submits anything different.
- Defaults the user did not dispute: lasting preferences are announced and recorded unless declined; one voice to start.

## Changed paths

### Added

- `/home/autobyteus/workspace/autobyteus-private-agents/agent-teams/marketing-team/agents/marketing-content-creator/agent.md`
- `/home/autobyteus/workspace/autobyteus-private-agents/agent-teams/marketing-team/agents/marketing-content-creator/agent-config.json`
- `/home/autobyteus/workspace/autobyteus-private-agents/agent-teams/marketing-team/agents/marketing-content-creator/skills/marketing-content-creation/SKILL.md`
- `…/marketing-content-creation/templates/publish-request-template.md`, `…/templates/channel-guide-template.md`
- `/home/autobyteus/workspace/autobyteus-marketing-workspace/marketing-style/` (`voices/ryan.md`, `positioning/autobyteus.md`, `channels/{linkedin,x,xiaohongshu,weixin-gongzhonghao,weixin-channel}/content-guide.md`, 4 playbooks)
- `/home/autobyteus/workspace/autobyteus-marketing-workspace/web-ui-sites/{linkedin.com,x.com,creator.xiaohongshu.com,xiaohongshu.com,mp.weixin.qq.com,channels.weixin.qq.com}/site-knowledge.md`

### Modified

- `/home/autobyteus/workspace/autobyteus-private-agents/agent-teams/marketing-team/team.md`, `team-config.json`
- `/home/autobyteus/workspace/autobyteus-agents/agents/web-ui-operator/agent.md`, `agent-config.json`, `skills/website-knowledge-automation/SKILL.md`; template renamed `templates/site-profile-template.md` -> `templates/site-knowledge-template.md`
- `/home/autobyteus/workspace/autobyteus-agents/README.md` (Web UI Operator entry)
- `/home/autobyteus/workspace/autobyteus-agents/agent-orgs/autobyteus-org/org-config.json`, `org.md`
- Local, git-ignored: `/home/autobyteus/workspace/autobyteus-marketing-workspace/.codex/skills/` — four broken links replaced with links to `marketing-content-creation`, `website-knowledge-automation`, and `web-ui-automation`.

### Removed

- `…/marketing-team/agents/{marketing-coordinator,linkedin-marketer,x-marketer,xiaohongshu-marketer,weixin-gongzhonghao-marketer,weixin-channel-marketer}/` (git history keeps the originals; commit `6053fb2` is the last state)

## Approval state

- State: `Approved`
- Evidence: The user confirmed the split, native-input-only website work with converted site knowledge, updating the Org, creator ownership of content folders, and keeping writing styles (conversation 2026-09-28).

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | `Pass` | team-config, creator config, operator config, org-config |
| Frontmatter and names align | `Pass` | creator folder/agent name; team member refs |
| Skill folder/frontmatter align | `Pass` | `marketing-content-creation`, `website-knowledge-automation` |
| Configured `skillNames` resolve | `Pass` (bundled) / `Not checked` (runtime) | Bundled skills exist; `web-ui-automation` exists in autobyteus-skills; runtime catalog not observed |
| Markdown links and references resolve | `Pass` | skill template links exist |
| Skill validator | `Pass` | quick_validate: both "Skill is valid!" |
| Member refs, coordinator, and rooted routes | `Pass` | coordinator is a member; routes use `/marketing_content_creator` and `/web_ui_operator`; shared agent ref follows the `presentation-chemie` pattern |
| Imported shared dependencies | `Not checked` | The `web-ui-operator` shared ID must be in the runtime catalog alongside the private team |
| Stale names | `Pass` | grep for old member/agent names in the private repo and autobyteus-org: none (northstar is a separate team) |
| Scope/diff review | `Pass` | only the listed paths changed |

## Migration completeness and principles review (2026-09-28, user-requested)

- Finding (round 1): the first pass lost necessary site detail. The fix added the missing facts to the site profiles: Weixin OA editor, draft, and publish-record URLs; the `图片 → 本地上传` and chooser `Open` fallbacks; rich-paste order and verification; publish-record success wording; the Xiaohongshu `/publish/success` interim step and chooser note; LinkedIn tab, legacy shadow-root, and chooser-environment facts; X prefill and media rules.
- Round 1 also archived all 33 retired documents under `sources/`. Principles review (round 2) found that archive was a set of competing procedures built around retired script methods: it gave rules a second owner and made every run read about 7,900 lines. The archive was removed. The profiles and channel guides own the necessary knowledge. The unedited originals remain at private-agents commit `6053fb2`.
- Round 2 fixes:
  - Web UI Operator skill and template reverted to the two-file site folder.
  - Playbook directives repointed from the retired agents and their `references/`, `SKILL.md`, and "agent folder" to the Content Creator, the Web UI Operator, `marketing-style/`, and `web-ui-sites/`.
  - The X profile no longer claims native multi-image selection was verified; a quote-post procedure and the per-card collection fields were added.
  - The Content Creator `agent.md` no longer repeats the skill's ownership statement; its collection requests quote the playbook's fields.
- Not migrated, by decision: 6 `agent-config.json` tool lists (no site knowledge); `x_attach_media.mjs` (a DevTools upload method the user ruled out).
- Checks: both skills valid; 4 changed JSON files parse; cross-file `.md` links resolve; no `sources/` references remain.

## Site knowledge format change (2026-09-28, user-requested)

- The user asked for website knowledge and SOPs, not run logs or per-task records.
- Web UI Operator: one file per site, `web-ui-sites/<site>/site-knowledge.md`. Sections: access and operating rules, page map, elements, read-only locate scripts, operation SOPs, pitfalls. `experience-log.md` was removed. The file changes only when a run proves new or different knowledge.
- Template renamed to `site-knowledge-template.md`; README wording updated.
- Workspace: six profiles converted, and six experience logs removed. Read-only locate scripts were added for LinkedIn (current and legacy composers), X (active composer), Xiaohongshu (`xhs-publish-btn` target), Weixin OA (editor and image ingestion), and Weixin Channels (the `wujie-app` probe). All pass `node --check`.
- The playbook link was updated to `site-knowledge.md`; the skill is valid.

## Principles review round 3 (2026-09-28, user-requested)

- Package design §6/§7: the Org routes from the Content Creator were topic prose, and one had no outcome the creator produced. The creator skill now defines `Claim Review Needed` and `Product Evidence Needed` (`product-input-request.md`). The Org rules now use the "classifies the outcome as …" form.
- Package design §5, tool fit: `read_url` now has a stated use (public links the user supplies; browser or login sources go to the Operator).
- Grounding: this record's changed paths were updated to the site-knowledge format and the template rename.
- No findings: Operator skill, template, and shell; team config and summary; voice, positioning, and channel guides; playbooks; site knowledge files.

## Native input helpers (2026-09-28, user-approved)

- Added `website-knowledge-automation/scripts/`:
  - `native_click.py`: viewport rectangle to a native click, with a point fraction and scale.
  - `paste_file.py`: exact file paste through a live `xclip` owner and Ctrl+V; plain text or HTML.
  - `choose_file.py`: native chooser with Ctrl+L, absolute path, confirm key, and a wait for close.
- The skill lists them in Execute, with a rule to confirm the browser is the active top window before clicking.
- Tests passed:
  - compile
  - click math (center, 0.6/0.55 point, scale 2)
  - empty-rectangle rejection
  - byte-exact UTF-8/CJK/emoji clipboard round trip on the secondary selection
  - chooser path validation and no-window failure
  - empty-file rejection
- Incident: an early live test on shared display `:99` opened a zenity window behind the user's Chromium. The test click (755,366) landed on the text of the user's open X post. Test keys (Ctrl+V, Ctrl+Tab, Tab, Return) were reported by xdotool as going to the zenity window. A read-only DevTools check afterwards showed the post was not liked, reposted, or bookmarked, no dialog was open, and the reply box was empty; the tab URLs were normal. No isolated display (Xvfb/Xephyr) is available, so live click and paste were not re-tested; the first supervised site run will exercise them.

## Per-platform conversation folders (2026-09-28, user-requested)

- Final layout at the workspace root: `<channel>/<YYYY-MM-DD-slug>/`, one folder per conversation (`linkedin/`, `x/`, `xiaohongshu/`, `weixin-gongzhonghao/`, `weixin-channel/`), next to `marketing-style/`, `web-ui-sites/`, and `data/`. The conversation folder holds the user's first piece: their post, or their comment on someone else's post, with that post in `source-post.md`. Later replies go in `replies/<date>-<author>/`. A cross-post uses the same folder name under the other channel.
- An intermediate `marketing-content/` layout (conversations with `post/<channel>/`) was replaced at the user's request because it hid the platforms and added a redundant root level.
- Content Creator skill: the `Content folders` section owns this layout and the search-before-create rules; channel guides keep only `Channel files`; `team.md` names the platform folders; the LinkedIn guide's examples point to `linkedin/…`.
- Principles review of this change: clarified the conversation-root file list; outreach logs and collection requests that do not serve one piece go under `data/`; removed the duplicated "research under `data/research/`" rule from two guides; skill valid.
- Workspace migration:
  - 142 original folders moved with `git mv` into 81 platform conversations: linkedin 49, x 26, xiaohongshu 2, weixin-gongzhonghao 3, weixin-channel 1.
  - 1,023 exact data-mirror duplicates removed; 44 unique files kept under `data-mirror/`.
  - The mapping (original to final path, all 103 targets verified) is kept privately at `autobyteus-marketing-workspace/data/audits/2026-09-28-content-migration-mapping.md`.

## Writing-style completeness (2026-09-28, user-requested)

- The style files were checked against the retired `writing-style.md` and `x-writing-style.md`. The X style was fully carried over; the LinkedIn worked examples had been reduced to summaries.
- Restored verbatim in the LinkedIn guide, next to the rules they illustrate: the example cadence; the before/after pairs for redundant emphasis, contrast, and direct product evidence; the blocked overlong reply with its rewrite. The voice avoid-list regained "novel-like transitions".
- The workspace commit excluded live team work present at the time: new conversations and the `reddit` channel, and Operator knowledge edits.

## Team moved to the public repository (2026-09-28, user-requested)

- Reason: all private data (voice, positioning, channel guides, website knowledge, content) is in the workspace. The team package contained only two personal references.
- Moved from `autobyteus-private-agents/agent-teams/marketing-team` to `autobyteus-agents/agent-teams/marketing-team` with the same ID, so the Org's shared `marketing-team` reference resolves in this repository.
- Generalized: the default voice is now the voice the user or guide names, or the library's only voice; with no voice, the creator drafts from the user's samples and creates `voices/<name>.md` after the first approved piece. The example data path is `data/social-analysis/…`.
- `autobyteus-org/org.md` and the README no longer describe the team as private; the README gains a Marketing Team entry. The workspace's local skill link now points to the public path.
- Checks: JSON parses; skill valid; shared member `web-ui-operator` exists here; no personal references remain in the team package.

## Web UI Operator became the Computer Use Operator (2026-09-29, user-requested)

- Trigger: in a live run (a Xiaohongshu roundup that needed source videos), the Operator declined to install and run `yt-dlp` because its scope was "websites, via native UI". The Content Creator is barred from operating websites or downloading, so no member owned plain computer work.
- The agent was renamed with `git mv`: `agents/web-ui-operator` → `agents/computer-use-operator`, and its skill `website-knowledge-automation` → `computer-use-operation`.
- The skill has one task loop with two capabilities. Websites keep every prior rule (`web-ui-automation`, site knowledge, helper scripts, active-window check). Computer tools cover the shell, installs from official sources (user-level or isolated first, all reported), background jobs, access limits (no DRM, login, or paywall bypass; no cookie or credential sharing; a denial from the source itself is reported), and output checks. New tool knowledge lives at `computer-tools/<tool>.md` (new template). The shared confirmation gate, human checkpoints, and outcome classes are unchanged.
- Tools added: background processes, `download_media`, `download_video`, `download_audio`, `read_media_file`.
- Marketing Team: member `computer_use_operator` (ref `computer-use-operator`); collection requests now cover media downloads. The Content Creator's wording, `team.md`, the README, and the workspace style library use the new name. Past run records are unedited.
- Principles review fixes: knowledge files are created only once something is proven, for both sites and tools; the access rule is limited to denials from the source itself, so another ordinary tool on a public source is allowed; a YAML-breaking colon in the skill description was fixed.
- Checks: both skills valid; JSON parses; all skill links resolve; scripts compile; no stale names outside run records.

## Principles review: Computer Use Operator and Marketing Team (2026-09-29, user-requested)

- Structure, ownership, flow, and routing hold. Each agent file has identity, a skill pointer, and the handoff transition. Each skill owns its loop, outcomes, and gates. `team-config.json` owns two route sets that match the produced files and outcomes. Tools fit the skills.
- Fixed:
  - Content Creator intro contradicted its own `read_url` use. The Operator now owns website actions and downloads, and reading public page text stays with the creator.
  - `team.md` and the README said "content from website work"; now "computer work (websites, downloads, tools)".
  - Collection-request fields now cover downloads.
  - The publish-request template allows `final-approved.md`.
  - The Operator's metadata probe names `ffprobe` or `read_media_file`.
- Checks: both skills valid; three configs parse; the member is referenced consistently.

## Risks, questions, and blockers

- Native input has not been verified on LinkedIn, X, Xiaohongshu, or Weixin Official Account text insertion. The first publish on each site should be supervised. Weixin Channels video was already native-verified.
- X multi-image selection through the native chooser is unverified; the profile says one file per chooser round with count verification.
- The operator stores site knowledge in the current workspace. The team must run with `autobyteus-marketing-workspace` as its workspace to use the seeded profiles.
- Retired agents had platform-only research modes: X notification mining, LinkedIn activity analysis, and outreach discovery. They now split into operator collection plus creator analysis via the playbooks. The playbooks contain old script snippets, labelled as descriptions only.

## Next expected action

The user reviews the changes. Commit the three repos when asked. Run a supervised first publish per channel.

## Handoff state

- `get_handoff_rules` called: `Unavailable`
- Matching routes: None
- Handoffs sent: None
- Caller return: Yes
