# LC-RL-2-old: fresh Agent Package Creator (old text), update request on a small drifted test package (own copy per run)
# AutoByteus 1.5.6, two isolated instances, claude_agent_sdk, claude-opus-5, 2026-10-20; package: origin/main 488aa2b
# Test package: blog team whose shared style-guide.md holds content rules plus the writer's handoff, the editor's publishing and return procedures, and a glossary.
## prompt
Update request, analysis step only: write your analysis, then stop before editing any package file. Do not commit.

Package: the Blog Team at /tmp/crl-live2/old/blog-agents/agent-teams/blog-team (a git repository; put your work notes where its AGENTS.md says).

Requested change: every blog post must now start with a one-sentence summary in bold.

Reply with the main points of your analysis in at most 12 lines.
## reply
Analysis written to `/tmp/crl-live2/old/blog-agents/tickets/in-progress/bold-summary-opening/agent-package-analysis.md`. No package file changed, nothing committed.

- Read all 12 files at commit `90b5cfc` (team, config, shared style guide, both agents, configs, both bundled skills, both symlinked references); working tree clean, no remote.
- The rule has an existing owner: `shared/style-guide.md` is the one standard both roles read (symlinked into each skill). No new file, role, or route is needed — this is a content rule, so `team.md`, `team-config.json`, both `agent.md` and both configs stay untouched.
- Plan: add one short "Opening" rule to the style guide (one bold sentence summarizing the post, first line of the body under the title) and state there that writer and editor both apply it.
- Main defect found: both skills copy the style guide's section list ("Voice, Headings and Images" — `blog-writing/SKILL.md:10`, `blog-editing/SKILL.md:9`). A new section is invisible until two more files are edited; miss the editor's copy and the reviewer never checks the new rule.
- Fix for that: group the post-content sections under one "Post standards" heading and have both skills point at the group, so the next style rule needs one edit, not three.
- Second defect: `references/style-guide.md` is a symlink that `find -type f` does not list, and neither skill says so — a role can conclude the standard is missing. Add the one-line "open symlinked files by path" hint.
- Deliberately not duplicated into the editor's publishing checklist; checking all post standards already covers it.
- Open questions before editing: bold summary above or below the H1 title; does it apply to in-flight drafts and already-published posts; approval for the regrouping (slightly larger diff than adding one section).
- Pre-existing, left as follow-ups: the editor is told to set CMS fields and post in `#marketing` but has only file and messaging tools; a published post has no terminal route back to the requester.
- Status `Requirement Gap` on those three questions; a live writer→editor run belongs to the `update` that applies the text.