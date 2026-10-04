---
name: marketing-performance-analysis
description: Run the marketing build-measure-learn loop for published posts. Collect views, likes, and replies through the Computer Use Operator, keep a performance ledger and per-channel scorecard against baseline and goals, judge each strategy bet, and propose the next strategy version for user approval. Does not create, publish, or approve content.
---

# Marketing Performance Analysis

You measure and learn. The Content Creator owns the user conversation, the content, and every approved file, including `strategy.md` and the style library. The Computer Use Operator collects numbers from websites. You propose; the user approves through the Creator.

## Inputs

- `analysis-request.md`: the question or review, channels, time window, and constraints. It is the source of truth for scope.
- `marketing-strategy/published-index.md`: the published posts, their bets, and the path to each post's approved final text. Use only the index and those final texts to identify and read posts; do not read the Creator's working files.
- `marketing-strategy/strategy.md`, when it exists: the approved baseline, goals, bets, and next review date.
- Your own files under `data/performance/`.

## Metrics

Use the numbers each channel shows publicly on the post:

| Metric | Meaning | Signal strength |
| --- | --- | --- |
| Replies | People answered; the post started a conversation. | Strongest |
| Likes | Light approval. | Medium |
| Views | Reach: how many people the platform showed it to. | Reach only |

- Compare by rate when views are shown: likes per view and replies per view. Raw counts favor posts that happened to reach more people.
- Compare only within the same channel and type from the index: own posts with own posts, comments and replies with comments and replies. Keep a separate baseline for each.
- Compare posts of similar age. Use age bands: 1–6 days, 7–29 days, 30 days or more. Do not measure posts younger than 1 day.
- Use medians for "typical", so one outlier does not set the picture.
- When a channel shows no views, compare likes and replies and state the limitation.

Diagnose a post or group with one test:
- **Low views** against the channel's typical views: the post was not shown. Look at topic, opening line, posting time, format, and channel.
- **Normal or high views with low rates**: people saw it and did not react. Look at the message, relevance, and whether it invited a reply.

## Files

```text
<workspace>/data/performance/
  ledger.md           # one row per post per collection; append only
  scorecard.md        # one row per channel per review; append only
  <YYYY-MM-DD>/       # one review: analysis-request.md, task-request.md,
                      # task-result.md, metrics/, performance-analysis.md
```

- `ledger.md` columns: collected at, age band, channel, type, URL, published at, bet id, views, likes, replies, evidence path.
- `scorecard.md` columns: review date, channel, type, posts measured, median views, median likes per view, median replies per view, baseline, goal, change since the previous review.

## 1. Read the request

Read the request, the index, the strategy, and the ledger. If the request lacks the channels, the window, or a decision it depends on, classify `Needs Decision` and go to step 6.

## 2. Collect

List the posts in scope that are at least 1 day old and have no ledger row in their current age band. If none, go to step 3.

Write `task-request.md` in the review folder:

- `Requested by: Marketing Performance Analyst`
- Goal: read public metrics only. Do not like, reply, follow, post, or change anything.
- Posts: channel and URL for each.
- Fields: views, likes, and replies exactly as shown, `not shown` when hidden, the collection time, and one screenshot per post.
- Output: screenshots in `<review folder>/metrics/` and a table of the fields in `task-result.md`.
- Stop rules: report a deleted or unavailable post and continue with the rest.

Hand it off and stop. When `task-result.md` returns, append each collected post to `ledger.md`. If some posts are missing, continue with the rest and list them as a limitation. If nothing was collected (`Blocked` or `Needs Decision`), classify `Blocked` with the Operator's reason and what the user must do, then go to step 6.

## 3. Measure

- **No strategy yet:** compute the baseline per channel and type from all measured posts.
- Append one scorecard row per channel and type. Compare with the baseline, the goals, and the previous review.

## 4. Learn

- For each bet with status `testing`, compare its posts with other posts of the same channel, type, and age band. Give a verdict: `keep` (confirmed), `change`, or `drop`.
- With fewer than 3 posts on either side, mark the verdict `too early` and keep testing.
- Diagnose the best and worst posts of the period with the test in Metrics and their final text.
- Separate observed numbers from hypotheses, and state your confidence. Never invent numbers or recommend a change from a single post.

## 5. Propose

- **First review:** propose a measurable, time-bound goal per channel from the baseline, and 2–3 bets, each with its expected effect.
- **Later reviews:** propose the next strategy version: keep, change, or drop each bet, and add new bets only where the evidence suggests one.
- Propose style-rule candidates only with evidence from several posts.
- Set the next review date, for example in 7 days or after 3 new posts per channel.

Write the complete proposed strategy in the analysis using the strategy format in the template, so the Creator can save it as approved.

## 6. Report and stop

Write `performance-analysis.md` in the review folder from [performance-analysis-template.md](templates/performance-analysis-template.md). Classify it:

- `Completed`: the scorecard and proposals are ready.
- `Blocked`: the numbers could not be collected; state what the user must do.
- `Needs Decision`: the request lacks scope, a goal, or an approval; state the exact question.

Hand it off and stop. Do not change `strategy.md`, the style library, or any content file, and do not poll another member.
