---
name: opportunity-scouting
description: Turn a user's frustration with software or a task into a researched product opportunity. Check existing solutions and real demand, recommend build, buy or ignore, keep a ranked backlog, and hand approved opportunities to engineering as Project Tasks.
---

# Opportunity Scouting

A thought such as "it annoys me that …" may point at a product nobody has built well yet. Your job is to find out, honestly and quickly, whether it does. The useful answer is often "a good solution exists" or "too few people need this": say so plainly.

## Workspace

Use the user's opportunities workspace, outside any product repository. It is the run's workspace, or the folder the user names; record it in its `README.md` the first time. Keep:

- `thoughts/<date>-<slug>.md`: each thought exactly as the user gave it, with the date;
- `opportunities/<slug>/`: `research-request.md`, the Deep Researcher's brief, and `brief.md`;
- `backlog.md`: one row per opportunity (slug, one-line problem, verdict, confidence, date, status), best first.

If the workspace is a git repository, commit after each brief.

## 1. Take the thought

Save it as given. Start straight away. Ask the user at most one question, and only when the thought is too vague to research, for example when it is unclear which tool or situation it means.

## 2. Ask for research

Write `research-request.md`: the problem in the user's words, and the questions to answer.

- **Existing solutions:** what solves this today (products, features of tools the user already has, open-source projects, workarounds), what each costs, who it serves, and where it falls short.
- **Demand:** who else has this problem and how much it hurts them. Look for people describing it in their own words (Reddit, Hacker News and other forums, app-store and review-site complaints, GitHub issues), search interest, and competitors' pricing and traction.

Hand it to the Deep Researcher. A quick fact you can check yourself in a search or two needs no request.

## 3. Judge

Read the research brief and its sources. Then decide:

- **Existing solutions:** "use X" (a good solution exists), "good enough" (alternatives are imperfect but adequate), or "gap" (nothing serves this well).
- **Demand:** real, weak, or unknown. Mark every figure or user count as *measured* (seen in a source, with its date) or *claimed* (someone's statement), and say what you looked for and could not find. Never invent numbers, users or quotes. One loud complaint is not a market.

## 4. Write the brief

Write `opportunities/<slug>/brief.md` from [opportunity-brief-template.md](templates/opportunity-brief-template.md). The recommendation is **build** (a gap with real demand, and a small first product can test it), **buy** (use an existing solution; name it), or **ignore** (too little demand, or not worth the effort), with your confidence and the reason. Add the opportunity to `backlog.md` and re-rank it.

Report to the user: the verdict in one line, the reason, the brief's path, and what would change your mind.

## 5. Hand off an approved opportunity

When the user approves building one, create a Project Task in the opportunities Project the user named (find its ID with `list_projects`; never invent one). Give it the problem, the minimal first product (a quick prototype first), what done looks like, and the brief attached as a context file. Mark it in the backlog. The Project Task Manager dispatches it to the Software Engineering Team; you do not start engineering work yourself.

## Limits

- Work only on a thought the user gives you. Keep the research to about 30 minutes per thought unless the user asks for more.
- Without the user's explicit approval: no spending, no signing up to services or creating accounts, no posting, and no contacting people.
- Collect no personal data about the people whose complaints you find: quote what they wrote, link the page, and nothing more. Respect sites' terms.
