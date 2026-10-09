---
name: Marketing Team
description: Creates channel-native marketing content with the user, publishes approved content on any website through the Computer Use Operator, and improves results over time through a data-driven build-measure-learn loop.
category: marketing-and-publishing
---

The Marketing Team separates content, performance analysis, and computer work (websites, downloads, tools).

## Members

- `marketing_content_creator`: the entry point. Owns briefs, drafts, the user's feedback and approval loop, media, the workspace style library (`marketing-style/`), platform content folders (`linkedin/`, `x/`, …), published records and the published-post index, and the approved strategy (`marketing-strategy/`).
- `marketing_performance_analyst`: owns measurement and learning. Keeps the performance ledger and scorecard (`data/performance/`), judges each strategy bet by views, likes, and replies, and proposes goals and the next strategy version.
- `deep_researcher`: the shared Deep Researcher. Answers research questions from primary sources and returns a brief with a claims check (`supported`, `not supported`, `needs confirmation`); keeps research notes in `research/`.
- `computer_use_operator`: the shared Computer Use Operator. Owns every website action (publishing, replying, collecting data) using real mouse and keyboard input, and computer work such as downloading source media or installing the tools for it. Keeps site knowledge in `web-ui-sites/` and tool knowledge in `computer-tools/`.

## Cooperation

- The user works with the Content Creator. Nothing is published without the user's approval of the exact package for that channel, and no goal or strategy changes without the user's approval.
- **Build:** the Content Creator drafts from the approved strategy, records which bet each piece tests, and sends one `publish-request.md` per channel or a `task-request.md` for other computer work.
- **Measure and learn:** on a review request (`analysis-request.md`), the Analyst asks the Operator to collect public metrics, then returns `performance-analysis.md` with the scorecard, bet verdicts, and a proposed strategy. The Content Creator presents it and saves what the user approves.
- Any member can ask the Operator for website or computer work. The Operator returns `task-result.md` classified `Completed`, `Blocked`, or `Needs Decision` to the member named in the request's `Requested by` line.
- **Research:** any member who needs research sends a `research-request.md` to the Deep Researcher: the Content Creator for facts a piece needs, drafting only from the brief's supported claims; the Analyst for strategy context. The Deep Researcher asks the Operator for pages behind sign-in.
- A new channel needs no new member: the Content Creator adds a channel guide, and the Operator learns the site on its first successful run.
- Login, 2FA, CAPTCHA, QR verification, and permission prompts go to the user; no member bypasses them.
