# LC-RS-1: restructure request, old vs new creator text

Case: the same neutral request to two Agent Package Creator runs, each in its own isolated instance and its own copy of a fixture repository. Request: "In the repository at <repo>, the Blog Writer agent's skill `agents/blog-writer/skills/blog-writing/SKILL.md` has grown repetitive: several rules appear in more than one section. Please restructure the skill so each rule has one home and it reads well, without changing what the writer does. Edit the files in place (no commit or pull request needed) and write your result in the repository."

App: AutoByteus 1.5.7-beta.4, isolated instances; runtime claude_agent_sdk; model claude-opus-5; 2026-10-20. Old text: origin/main d4b3d18. New text: branch creator-compare-wording.

## Original skill (fixture)

```markdown
---
name: blog-writing
description: Write a client blog post from a brief, with sourced facts, in the client's voice, ready for the editor.
---

# Blog Writing

## Getting started

Read the brief. Use the house style guide only when the client has none; the client's guide always wins where both exist. Keep the post between 800 and 1,200 words unless the brief sets another length.

Every statistic must cite a primary source; a news article that reports a statistic is not a primary source. Do not invent quotes, and never attribute a paraphrase as a direct quote.

## Writing

Open with the reader's problem, not the client's product. Headlines should be under 70 characters. Use the client's product names exactly as the brief spells them.

Statistics should have sources. Avoid jargon the brief's audience would not know; when a technical term is needed, define it on first use.

Write in the client's voice. Follow the house style guide.

## Images

Use only images the client supplied or images with a licence that allows commercial use. Record each image's source and licence in the post notes.

## Before sending

Check that facts are sourced. Do not publish anything yourself; only the editor publishes. Get the editor's approval before anything goes live.

Headlines under 70 characters, unless the client asks otherwise.

Make sure there are no made-up quotes.

## Sending

Send the post, its notes, and the source list to the editor named in the brief.

## Writing tips

- Short paragraphs.
- Sources for numbers.
- One idea per paragraph.
- The client's guide comes first.
```

## Restructured by the old text

```markdown
---
name: blog-writing
description: Write a client blog post from a brief, with sourced facts, in the client's voice, ready for the editor.
---

# Blog Writing

Write a client blog post from a brief and hand the finished post to the editor.

## Start from the brief

Read the brief. Keep the post between 800 and 1,200 words unless the brief sets another length.

Write in the client's voice, following the client's style guide. Use the house style guide only where the client has none; where both cover the same point, the client's guide wins.

## Write the post

- Open with the reader's problem, not the client's product.
- Keep the headline under 70 characters, unless the client asks otherwise.
- Spell the client's product names exactly as the brief spells them.
- Keep paragraphs short, one idea each.
- Avoid jargon the brief's audience would not know; define a technical term you do need on first use.

## Sources, quotes, and images

Every statistic cites a primary source; a news article that reports a statistic is not a primary source.

Do not invent quotes, and never attribute a paraphrase as a direct quote.

Use only images the client supplied or images with a licence that allows commercial use. Record each image's source and licence in the post notes.

## Before sending

Check that the facts are sourced — each statistic to a primary source — that no quote is made up, and that the headline fits.

## Send to the editor

Send the post, its notes, and the source list to the editor named in the brief. Do not publish anything yourself: only the editor publishes, and nothing goes live without the editor's approval.
```

compare-wording.py, original -> this version:

```text
Requirement words (old -> new):
  must            1 -> 0     DROPPED
  should          2 -> 0     DROPPED
  never           1 -> 1   
  always          1 -> 0     DROPPED
  do not          2 -> 2   
  only            3 -> 3   
  every           1 -> 1   
  each            1 -> 3   
  unless          2 -> 2   

Old sentences with requirement words not found verbatim in the new files: 6 (4 whose closest new sentence lacks one, listed first)

- OLD: Use the house style guide only when the client has none; the client's guide always wins where both exist.
  NEW: Use the house style guide only where the client has none; where both cover the same point, the client's guide wins.
  LACKS: always

- OLD: Every statistic must cite a primary source; a news article that reports a statistic is not a primary source.
  NEW: Every statistic cites a primary source; a news article that reports a statistic is not a primary source.
  LACKS: must

- OLD: Headlines should be under 70 characters.
  NEW: Keep the headline under 70 characters, unless the client asks otherwise.
  LACKS: should

- OLD: Statistics should have sources.
  NEW: Start from the brief
  LACKS: should

- OLD: Do not publish anything yourself; only the editor publishes.
  NEW: Do not publish anything yourself: only the editor publishes, and nothing goes live without the editor's approval.

- OLD: Headlines under 70 characters, unless the client asks otherwise.
  NEW: Keep the headline under 70 characters, unless the client asks otherwise.
```

## Restructured by the new text

```markdown
---
name: blog-writing
description: Write a client blog post from a brief, with sourced facts, in the client's voice, ready for the editor.
---

# Blog Writing

## Start from the brief

Read the brief. It names the audience, the client's product names, and the editor who receives the finished post.

Write in the client's voice. Use the house style guide only when the client has none; the client's guide always wins where both exist. Keep the post between 800 and 1,200 words unless the brief sets another length.

## Write the post

- Open with the reader's problem, not the client's product.
- Keep the headline under 70 characters, unless the client asks otherwise.
- Use the client's product names exactly as the brief spells them.
- Keep paragraphs short, one idea each.
- Avoid jargon the brief's audience would not know; when a technical term is needed, define it on first use.

## Sources and quotes

Every statistic must cite a primary source; a news article that reports a statistic is not a primary source. Do not invent quotes, and never attribute a paraphrase as a direct quote.

## Images

Use only images the client supplied or images with a licence that allows commercial use. Record each image's source and licence in the post notes.

## Check and send

Before sending, check the draft against the rules above: the facts are sourced, no quote is invented or re-attributed, and the headline is within the limit.

Do not publish anything yourself: only the editor publishes, and nothing goes live without the editor's approval. Send the post, its notes, and the source list to the editor named in the brief.
```

compare-wording.py, original -> this version:

```text
Requirement words (old -> new):
  must            1 -> 1   
  should          2 -> 0     DROPPED
  never           1 -> 1   
  always          1 -> 1   
  do not          2 -> 2   
  only            3 -> 3   
  every           1 -> 1   
  each            1 -> 2   
  unless          2 -> 2   

Old sentences with requirement words not found verbatim in the new files: 4 (2 whose closest new sentence lacks one, listed first)

- OLD: Headlines should be under 70 characters.
  NEW: Keep the headline under 70 characters, unless the client asks otherwise.
  LACKS: should

- OLD: Statistics should have sources.
  NEW: Start from the brief
  LACKS: should

- OLD: Do not publish anything yourself; only the editor publishes.
  NEW: Do not publish anything yourself: only the editor publishes, and nothing goes live without the editor's approval.

- OLD: Headlines under 70 characters, unless the client asks otherwise.
  NEW: Keep the headline under 70 characters, unless the client asks otherwise.
```

## The new-text run's own record (agent-package-result.md, excerpts)

```text
- Scope excluded: frontmatter (`name`, `description` unchanged), `agent.md`, `agent-config.json`, and the writer's behavior — every rule keeps its strength, qualifiers, and named cases
The body is now four steps that follow the work — `Start from the brief`, `Write the post`, `Sources and quotes`, `Images`, `Check and send`. Each rule is stated once, at the strength of its strongest previous copy and with every exception it carried. The pre-send check survives as a gate that names the rules ("the facts are sourced, no quote is invented or re-attributed, and the headline is within the limit") instead of restating them, so it still checks the same three things without becoming a second copy. 23 lines were replaced by 14; the file went from 7 sections to 5.
| Statistic must cite a primary source; a news article is not one | `Getting started`, `Writing` ("Statistics should have sources"), `Writing tips` ("Sources for numbers") | `Sources and quotes`, `must` kept |
| Requirement wording preserved | `Pass` | `compare-wording.py --old /tmp/blog-writing-SKILL.old.md --new .../SKILL.md`: `must`, `never`, `always`, `do not`, `only`, `every`, `unless` unchanged; `should` 2 → 0, both instances being the weaker duplicates of rules now stated once as `must cite a primary source` and `Keep the headline under 70 characters, unless the client asks otherwise`. All four listed sentences read beside their new homes: two are the merged headline rule, one the merged sourcing rule, one the merged publishing/approval sentence |
| Final review against the standard and anti-patterns | `Pass` | Two rounds. Round 1 removed an invented input ("the angle") and a `must` the original did not have from the brief-intake sentence; round 2 dropped the length mention from that sentence so the length rule has one home. Anti-pattern 4 (one rule in several places) is the defect fixed; 7, 12, 14, 19, 21, 25, 26 checked and clear |
```

Calls to compare-wording.py in the run traces: old 0, new 4.
