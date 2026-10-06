# Agent Package Analysis

- Status: `Completed`
- Operation: `analyze` (simulated run of the new team against the live Luma site)
- Package type: `team`
- Target package: Event Scouting Team, `/Users/normy/autobyteus_org/autobyteus-agents-event-scouting/agent-teams/event-scouting-team/` (branch `agent-teams/event-scouting-team`, uncommitted)
- Scope included: every step and handoff of `event-scouting/SKILL.md`, both templates, `team-config.json`; live checks of `luma.com/discover`, `luma.com/ai`, `luma.com/berlin`, and one event page (`luma.com/3a5lxu30`).
- Scope excluded: package changes; a real browser run by the Computer Use Operator; sign-in and registration (not attempted).
- Request/reference: User, 2026-10-06: "If you simulate it, does it work?"

## Verdict

The team's structure works: roles, the request/result handoffs, approvals, the tracker, and registration statuses all hold up in the simulated run. Three assumptions about Luma are wrong and would make the first search weaker or noisier than intended. All three are small fixes in the skill and profile template.

## Observed Luma behavior

| Check | Observation |
| --- | --- |
| Domain | `lu.ma/discover` returns 301 to `luma.com/discover`; event links are relative (`/3a5lxu30`). |
| Discover page | Lists cities (`/berlin`, `/london`, …) and categories (`/ai`, `/tech`, `/crypto`, …). No keyword search box. |
| Category page `/ai` | Lists popular organizer calendars (Air Street, Latent.Space, The AI Collective, Claude Community Events, …) and a map-based "nearby" section; no city filter in the page text. |
| City page `/berlin` | Lists events of every topic with title, hosts, venue, and labels (`Waitlist`, `Near Capacity`, attendee counts, occasional price). No topic filter; dates not present in the fetched text (rendered in the browser). |
| Event page | Title, hosts, registration type ("Approval required", button "Request to Join"), summary are readable; date/time not in fetched text; venue "hidden until approved". |

## Simulated run

1. Profile: works as written.
2. Search: the request asks the Operator for "searches for the profile's keywords" on Luma, which Luma's public pages do not offer (finding 1).
3. Operator capture: a real browser shows dates, so the Operator can capture them; the Scout's own `read_url` cannot (finding 1).
4. Assess: deduplication by URL breaks when the same event appears as `lu.ma/x` and `luma.com/x` (finding 2).
5. Shortlist and approval: works.
6. Registration: "Request to Join" with host approval maps to the existing `pending host approval` status; venue is revealed only after approval. Approval-required events typically ask for a LinkedIn profile, company, or a reason to join, which the profile template does not collect, so most registrations would stop with `Needs Decision` (finding 3).
7. Handoffs: Scout → Operator → Scout resolve through the two configured routes.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Grounding | No keyword search on Luma's public discover, category, or city pages; city pages mix all topics; category pages surface organizer calendars. | `event-scouting/SKILL.md` step 2; profile template | The search request asks for something the site does not do; good recurring hosts are not used. | Search the city page(s), the relevant category pages (`/ai`, `/tech`), and the organizer calendars the profile lists; use `search_web` (for example `site:luma.com investor <city>`) to find more. Add "Calendars and hosts to follow" to the profile. Note that dates come from the Operator's capture, not `read_url`. |
| 2 | Clarity | `lu.ma` redirects to `luma.com`; event paths are short slugs. | `event-scouting/SKILL.md` Workspace | Duplicate tracker rows for one event. | Record the canonical `https://luma.com/<slug>` URL and match events by it. |
| 3 | Content flow | "Approval required" / "Request to Join" on the sampled founder event; typical questions need a LinkedIn URL, company, and a short reason. | Profile template | Most registrations stop for a decision. | Add LinkedIn URL, a one-line intro, and per-lane "why I want to join" answers to the profile's approved registration details. |

## Recommended changes

Not applied; they need an `update` request. Edits stay in the uncommitted branch: `SKILL.md` steps 2 and the Workspace note, and `event-profile-template.md`.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Luma pages publicly readable | Pass | WebFetch of four pages. |
| Dates readable without a browser | Fail | Not in fetched text of city or event pages. |
| Sign-in and registration | Not run | Requires the user's account; left to the Operator's human checkpoints. |
| Team routes | Pass | Two routes resolve (earlier validation). |

## Next action

Applied on 2026-10-06 (user: commit and push directly): all three fixes in `SKILL.md` and `event-profile-template.md`.

## Handoff state

- `get_handoff_rules` called: `Yes`
- Handoffs sent: None
- Caller return: Yes; no rule matched.
