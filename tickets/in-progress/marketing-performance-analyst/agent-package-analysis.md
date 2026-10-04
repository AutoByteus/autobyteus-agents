# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (began as `analyze`; user approved the update on 2026-10-04)
- Package type: `team`
- Target package: Marketing Team, `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/marketing-team/`
- Scope included: `team.md`, `team-config.json`, Marketing Content Creator (agent, config, `marketing-content-creation` skill and templates), the shared Computer Use Operator's tools, and the Team's placement in `autobyteus-org`.
- Scope excluded: Changes to any package; the actual marketing workspace content (its location was not provided); the Northstar Operating Company Org, which is a platform demonstration, not a production package (user direction, 2026-10-04).
- Request/reference: User request, 2026-10-04: some published posts get strong engagement (views, likes, replies) and others get none; nobody explains why or turns that into strategy. Is a marketing analysis member missing?

## Baseline

| File | Current responsibility |
| --- | --- |
| `team.md` | Two members: Content Creator (entry point; content, approval, style library, records) and Computer Use Operator (all website and computer actions). |
| `team-config.json` | Coordinator `marketing_content_creator`; routes Creator → Operator (`publish-request.md`, `task-request.md`) and Operator → Creator (`task-result.md`). |
| `marketing-content-creator/agent.md` | Identity; follow `marketing-content-creation`; post-result handoff. |
| `marketing-content-creation/SKILL.md` | Brief → draft/revise → approve → publish → record. Step 5 lets the Creator request site data and "analyze collected data with the channel's playbook when one exists". Frontmatter adds "Also covers ... analysis of site data the operator collects". Style library learns only from user feedback (step 2.5). |
| `templates/publish-request-template.md`, `channel-guide-template.md` | Publishing request; channel guide (formats, style rules, checklist, approved examples). No performance fields. |
| `computer-use-operator/agent-config.json` | Browser tools (`read_page`, `dom_snapshot`, `screenshot`, `run_script`) that can read visible metrics and analytics pages through the UI. |
| `autobyteus-org/org-config.json` | Mounts `marketing-team` (shared); routes product facts and evidence to and from `/marketing_team/marketing_content_creator`. |

## Preserved behavior

- The Content Creator remains the entry point and owns briefs, drafts, the user's approval loop, the style library, content folders, and published records.
- Nothing is published without the user's approval of the exact package per channel.
- The Computer Use Operator remains the only member that operates websites; login, 2FA, CAPTCHA, and permissions go to the user.
- Product-claim and product-evidence routes in `autobyteus-org` stay with the Content Creator.
- Pre-publication research (topic research, reply candidates, source capture) stays with the Content Creator.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure and ownership (missing behavior) | No member owns "why did this post perform, and what should we do next". Analysis is a side clause in the Creator's skill (frontmatter line 3; step 5 line 108) with no procedure, output, or decision. | Team topology | The user keeps publishing without learning; good and bad results stay unexplained. | Add a team-local **Marketing Performance Analyst** that owns performance measurement, diagnosis, and strategy recommendations as a distinct decision and output. |
| 2 | Structure and ownership | The Creator would grade its own content, and analysis has a different lifecycle (periodic, across many posts and channels) from per-piece drafting. | Team topology | Folding analysis into the Creator's skill makes an already broad skill broader and weakens the review. | Keep analysis out of the Creator; the Creator consumes the Analyst's result. |
| 3 | Content flow (missing behavior) | `published.md` records URL, timestamp, media, and evidence only (SKILL.md step 4); no metrics, no later checkpoint. | `marketing-content-creation`, new Analyst skill | Posts cannot be compared: numbers are missing, or taken at different ages. | The Analyst keeps a performance ledger built from published records, with metrics collected by the Operator at fixed post ages (for example 24 h and 7 d), plus a one-time backfill of past posts. |
| 4 | Content flow (missing behavior) | The style library learns from user feedback only (step 2.5); audience response never reaches `marketing-style/`, and no strategy file exists. | Creator skill, new Analyst skill | Strategy stays implicit and does not improve. | The Analyst writes evidence-backed strategy recommendations and proposed style rules; the user approves; the Creator writes approved rules into the library and loads the current strategy at brief time (step 1.2). |
| 5 | Grounding | Social metrics are noisy: small samples, platform algorithms, posting time, follower changes, and UI-visible numbers that differ by channel. | New Analyst skill | Confident "reasons" from a handful of posts would mislead. | The Analyst separates observed numbers from hypotheses, states sample size and confidence, and proposes small experiments (for example the same topic with two hooks) instead of claiming causes. |
| 6 | Structure and ownership | Operator → Creator is the only return route for `task-result.md` (`team-config.json`). | `team-config.json` | The Analyst could not receive its own data results. | Add Analyst → Operator (data collection `task-request.md`) and Operator → Analyst (its `task-result.md`) routes, plus Creator ↔ Analyst routes. |
| 7 | Clarity | `channels/<channel>/playbooks/*.md` are described as "research/analysis procedures" (SKILL.md line 19), mixing pre-publication research with performance analysis. | Creator skill | Unclear which member reads which playbook. | Creator keeps research playbooks; performance metrics and their definitions per channel move to the Analyst's skill or a channel metrics section it owns. |

## Recommended changes

Approved for `update` on 2026-10-04. Final plan after the user's decisions (0, 0c, 4 and 5 defaults):

Loop ownership: Goal and Strategy are proposed by the Analyst and approved by the user; Create is done by the Creator (records the bet per post); Collect by the Operator; Measure and Decide by the Analyst; approved changes are written by the Creator.

Workspace artifacts:
- `marketing-strategy/strategy.md` (Creator writes after approval): baseline, goals per channel, bets with id, expected effect, and status (`testing` / `confirmed` / `dropped`), next review date, version history.
- `marketing-strategy/published-index.md` (Creator, see H1): one row per published post.
- `data/performance/ledger.md` (Analyst): one row per post per collection: channel, URL, published time, bet id, collected time, post age, views, likes, replies.
- `data/performance/scorecard.md` (Analyst): one row per channel per review: posts, typical views, likes per view, replies per view, against baseline and goal.
- `data/performance/<YYYY-MM-DD>/`: `analysis-request.md` (Creator), `task-request.md` and its `task-result.md` (Analyst and Operator), `performance-analysis.md` (Analyst).

Changes by file:
- New `agents/marketing-performance-analyst/`: `agent.md`; `agent-config.json` (`read_file`, `write_file`, `edit_file`, `run_bash`, `get_handoff_rules`, `send_message_to`; no browser tools); bundled skill `marketing-performance-analysis` with the loop procedure (ledger from published records and bet ids; metrics request to the Operator; first-run baseline and goal proposal; scorecard; low-views versus low-engagement diagnosis; keep/change/drop verdict per bet with a minimum-sample rule; proposed strategy version, style-rule candidates, next review date) and a `performance-analysis` template.
- `marketing-content-creation/SKILL.md`: load approved `strategy.md` at brief time and say when a review is due; choose the bet a piece applies with the user and record `strategy_bet` in `metadata.json`; new performance-review section (write `analysis-request.md`, present the Analyst's result, write approved strategy and style changes); remove performance analysis from the frontmatter and step 5; add "Requested by" to `task-request.md`.
- `publish-request-template.md`: add "Requested by: marketing_content_creator".
- `team-config.json`: add the member; routes Creator → Analyst, Analyst → Creator, Analyst → Operator, Operator → Analyst; Operator → Creator rule limited to Creator requests.
- `team.md` and README Marketing Team entry: add the member and the loop.
- No change to the shared Computer Use Operator or to `autobyteus-org` (the Creator stays the entry point).

## Handoff and principles check of the plan

Checked against `package-design-principles.md` §2 (a handoff moves a completed, classified result; the receiver depends on that result, not the sender's private files), §3 (one owner per rule; recipients only in config), and §6 (route conditions from statuses members actually produce; mutually exclusive routes; distinct success and recovery paths).

| # | Problem in the plan above | Principle | Correction |
| --- | --- | --- | --- |
| H1 | The Analyst would scan the Creator's content folders (`<channel>/**/published.*`, `metadata.json`) to find posts and bets. | §2: receiver must not depend on the sender's private layout. | The Creator owns `marketing-strategy/published-index.md`: one row per published post (published time, channel, type, URL, bet id, path to the approved final text), appended when a publish result is `Completed`. The Analyst reads this index and the approved final text it points to (a published result), not the Creator's working files. |
| H2 | The Analyst's result had no defined outcomes, so the Analyst → Creator route had no status to match. | §6: conditions from produced statuses. | `performance-analysis.md` is classified `Completed` (scorecard and proposals ready), `Blocked` (metrics could not be collected; states what the user must do), or `Needs Decision` (the request lacks scope, goal, or approval). One route carries all three; the Creator handles each. |
| H3 | Two members now send requests to the Operator, but its result route names no requester. | §6: mutually exclusive routes. | Every Operator request states `Requested by: <member>`. Operator → Creator matches only Creator requests; Operator → Analyst only Analyst requests. The Operator's own files stay unchanged; the team config chooses the recipient. |

Confirmed clean:
- Recipients appear only in `team-config.json`; skills say "hand off", never an address.
- One writer per file: Creator writes `strategy.md`, `published-index.md`, `analysis-request.md`, and the style library; Analyst writes the ledger, scorecard, its metrics request, and `performance-analysis.md`; Operator writes `task-result.md`.
- Request format owned by its writer: `analysis-request.md` fields in the Creator's skill; the metrics request in the Analyst's skill.
- Each sender stops after its handoff and resumes when the result arrives; no polling. Operator login and CAPTCHA prompts still go straight to the user.
- Recovery path: Operator `Blocked` → Analyst `Blocked` → Creator tells the user → user resolves → Creator sends a new analysis request.

Final routes in `team-config.json`:

| # | From → To | When |
| --- | --- | --- |
| 1 | Creator → Operator | `publish-request.md` or `task-request.md` (Requested by Creator) is ready. |
| 2 | Operator → Creator | `task-result.md` is saved for a request by the Creator, outcome `Completed`, `Blocked`, or `Needs Decision`. |
| 3 | Creator → Analyst | `analysis-request.md` is ready. |
| 4 | Analyst → Operator | A metrics `task-request.md` (Requested by Analyst) is ready. |
| 5 | Operator → Analyst | `task-result.md` is saved for a request by the Analyst, any outcome. |
| 6 | Analyst → Creator | `performance-analysis.md` is saved, outcome `Completed`, `Blocked`, or `Needs Decision`. |

## Open questions and approvals

0. Decided (user, 2026-10-04): one role owns both analysis and strategy; the Analyst gets all channel data through the Computer Use Operator, which already knows how to operate each channel (finding 6 routes).
0b. Superseded by 0c (metrics: views, likes, replies only).
0c. Decided (user, 2026-10-04): marketing is goal-oriented and improves continuously from data. The Analyst owns the loop: baseline and measurable goals (user-approved), strategy as testable bets with expected effect, posts tagged with the bet they apply (Creator, at brief time), a per-channel scorecard compared with baseline and previous periods, and a keep/change/drop verdict per bet at each review. Strategy versions keep history so improvement is visible. Metrics: views, likes, replies (no reposts/shares); replies strongest, then likes, views as reach; compare by rate and similar post age.
1. Approve adding the member? Proposed name: Marketing Performance Analyst (`marketing_performance_analyst`), owning both diagnosis and strategy recommendations. The alternative is a separate strategist, but one role is enough at current volume.
2. Answered by 0c: public views, likes, and replies on any channel; no analytics-page login required.
3. Where is the marketing workspace with past posts, so the first run can backfill the posts that did well and those that did not?
4. Should the Analyst stay behind the Content Creator (current single entry point), or should you be able to ask it directly?
5. Confirm authority: the Analyst recommends; you approve; the Creator applies approved rules.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Team members and routes read | Pass | `team-config.json`: 2 members, 2 routes. |
| Existing analysis capability located | Pass | `marketing-content-creation/SKILL.md` lines 3, 19, 100–108 only. |
| Operator can read metrics | Plausible, not observed | Browser read tools exist; per-site metric access depends on login and was not tested. |
| Marketing workspace data | Not checked | Location not provided. |

## Next action

Apply the recommended changes with corrections H1–H3, validate, and write `agent-package-result.md` in this folder.

## Handoff state

- `get_handoff_rules` called: `Yes`
- Handoffs sent: None
- Caller return: Yes; no rule matched (`{"handoffs":[]}` for this Agent).
