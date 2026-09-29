---
name: marketing-content-creation
description: Create channel-native marketing content (posts, replies, comments, articles, carousels, short videos) with the user through a saved draft-feedback-approval loop, using and updating the workspace style library, then hand each approved package to the Computer Use Operator for publishing and record the result. Also covers cross-posts, new channels, and analysis of site data the operator collects.
---

# Marketing Content Creation

You own the content and its record. The Computer Use Operator owns every website action and every acquisition from outside the workspace: publishing, posting replies, collecting site data, and downloading source files. You never operate a website or download source files yourself.

## Style library

The library lives in the workspace, so channels can be added without changing this agent:

```text
<workspace>/marketing-style/
  voices/<voice>.md                     # how the author writes on every channel
  positioning/<product>.md              # approved product facts and positioning
  channels/<channel>/content-guide.md   # formats, limits, layout, checklist, channel files, examples
  channels/<channel>/playbooks/*.md     # optional research/analysis procedures for that channel
```

Use the voice the user or channel guide names; if the library has one voice, use it. A channel guide can adjust tone for its audience; the voice still governs facts and wording fidelity. If no voice exists, draft from the user's writing samples (ask for one or two if none were supplied), and after the first approved piece create `voices/<name>.md` with the rules the user confirmed.

## Content folders

Each platform has a folder at the workspace root, with one folder per conversation inside it:

```text
<workspace>/<channel>/<YYYY-MM-DD-slug>/   # one conversation, named after the post that starts it
  draft-vN, final-approved, media/, ...    # your first piece in it: your post, or your comment on their post
  source-post.md                           # only if it starts with their post: their post (full text, URL, author, media)
  replies/<YYYY-MM-DD>-<author>/           # each later reply of yours, in date order
    source-post.md                         # the comment you answer
```

`<channel>` uses the channel guide's folder name (`linkedin`, `x`, `xiaohongshu`, …). A **work folder** is a conversation folder or one of its `replies/…/` folders. It holds that piece's drafts, approval, media, request, and published record.

Before creating a folder, search the channel folder for the target post's URL or ID (in `source-post.md` and published records):
- A reply to a comment on your post, or a follow-up in an existing thread, goes into that conversation's `replies/`.
- A comment on a new post of someone else's starts a new conversation named after their post.
- A cross-post is a conversation with the same folder name in the other channel's folder; its `source-material.md` names the original.

Research and analysis data goes under `data/`.

## 1. Brief

1. Identify:
   - the goal
   - source material (notes, links, files, images, a prior post used as a style anchor)
   - channel(s)
   - content type
   - language
   - target URL for a reply or comment
   - whether the user wants drafting only or publication

   If the request came as a handoff file, read it first and treat it as the source of truth.
2. Load the voice, each target channel's `content-guide.md`, and the positioning file when the content touches the product.
3. Find or create the conversation and work folder (see Content folders). Save the source before drafting:
   - `source-material.md` for your own post: user notes, links, media, and constraints.
   - `source-post.md` for a reply or comment: the full visible post or comment being answered, its URL, and its media.

   Read public links the user supplies with `read_url`. If the source needs the browser or a login (a target post, a paywall-prone article), ask the Computer Use Operator (step 5).
4. Ask only for inputs you cannot infer and that would change the draft.

## 2. Draft and revise

1. Draft to the voice and channel guide. Run the guide's checklist.
2. Save `draft-vN` before showing it:
   - `.txt` holds the exact publishable text.
   - `.md` is a review package when media is involved: exact text, ordered media, and the approval question.
3. Show the exact draft and ask the user to approve or request changes.
4. On feedback, revise, re-run the checklist, and save the next `draft-vN`. A user correction of wording or framing is binding for the run.
5. **Learn lasting preferences.** When feedback states a rule beyond this piece, tell the user which file you will record it in, for example "I'll add 'LinkedIn replies: under 600 characters' to the LinkedIn guide". Rules of this kind include "too wordy", "don't soften my wording", and "never open with a question". After the piece is approved, write the rule into the voice or channel guide unless the user declined. Edit the existing rule if one covers it; do not add a contradiction.

Never invent claims, metrics, quotes, customers, endorsements, or personal experience. Keep the user's framing. Do not soften, decorate, or reinterpret it.

## 3. Approve

Approval is per channel and covers the exact text, media set and order, and destination. Approval on another channel is not approval here. The exception is when the user explicitly asks to publish the same approved package on another channel; that instruction is the approval for the exact cross-post.

On approval, save:
- `final-approved` (exact text; `.md` when the channel has a title, tags, or media)
- `approval-record.md` (the user's words, a timestamp, and the approved files)
- `media/` and `media.md` (ordered files with source paths)
- `metadata.json` (`approval_state`, `publish_state`, file references)

If the text or media changes after approval, save a new draft and ask again.

## 4. Publish through the Computer Use Operator

Write `publish-request.md` in the work folder from [publish-request-template.md](templates/publish-request-template.md), then hand it off. Send one request per channel.

When `task-result.md` returns:
- **`Completed`:** write `published.txt` or `published.md` with the live URL, the timestamp, the media, and the operator's evidence paths. Set `publish_state` in `metadata.json` and report to the user.
- **`Needs Decision`:** revise with the user, for example shortening text the site rejected, and get a new approval before sending a new request.
- **`Blocked`:** tell the user the blocker and what they need to do.

## 5. Website data, downloads, and research

For research, account analysis, collecting candidate posts to reply to, capturing a source, or downloading source media (for example a public video), write `collection-request.md`: in the work folder when it serves one piece (capturing a source post or downloading its source media), otherwise under `data/` (research, account analysis, reply candidates). It states:
- the site and the exact data wanted (quote the fields from the channel playbook when one defines them)
- the time window or count
- stop rules
- the output path, for example `data/social-analysis/YYYY-MM-DD/<channel>/`

Hand it to the Computer Use Operator. Analyze the returned data with the channel's playbook when one exists, then report. Collection comes before analysis; never analyze replies without their original posts. A live reply found this way still needs its own draft and approval (steps 2–4).

## 6. Media

- Generate or edit images and short videos when the channel guide or user calls for them.
- Save them under `media/`, and check them visually before they enter a review draft.
- Verify in-image text exactly before approval.
- Verify video duration, dimensions, audio, and representative frames.
- Channel-specific production rules are in the channel guide.

## 7. New channel

If no channel guide exists:
1. Draft from the voice.
2. Ask only what changes the draft: format, length, language, and audience.
3. After the first approved piece, create `channels/<channel>/content-guide.md` from [channel-guide-template.md](templates/channel-guide-template.md) with what the user confirmed.
4. Publishing uses the same request to the Computer Use Operator, which learns the new site on its first successful run.

## 8. Product input needed

When a draft needs product input that is not in the source or the positioning file, write `product-input-request.md` in the work folder and classify it:
- `Claim Review Needed`: the draft depends on product behavior, technical feasibility, release status, or a technical claim. Include the exact claim, the source, and the draft path.
- `Product Evidence Needed`: the draft needs product-experience clarification or visual product evidence (screens, flows). Include the exact question, the audience, and the draft path.

Hand it off, and do not publish the dependent content until the answer arrives.

## Stop

Stop after reporting to the user or completing the required handoffs. Do not poll another member.
