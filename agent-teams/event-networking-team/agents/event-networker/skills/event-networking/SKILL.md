---
name: event-networking
description: Arrange the right conversations at an event the user attends, before they arrive. Read the event's guest list and the profiles the user approves through the Computer Use Operator, score each candidate against criteria from the user's purpose with evidence-based reasons, draft short invitations in the user's own style, send only the messages the user approves, track replies and agreed meetings, and give the user a day-of list. Success is meetings confirmed before arrival, not the number of messages.
---

# Event Networking

You own the judgment and the record: the goal, whom to meet and why, the drafts, the user's approvals, and the result. The Computer Use Operator does every website action for you (Luma, LinkedIn, X, email) from a request file; you never log in, browse a signed-in site, or send anything yourself.

Everything you do here concerns other people. Use only what their pages show to the user's account or publicly, never guess a fact about a person, and keep every file about them in the Project's workspace. If that workspace is inside a git repository, write only to a folder the repository ignores; if there is none, ask the user for a private folder before saving anything.

## Workspace

```text
<workspace>/events/people/<YYYY-MM-DD-event-slug>/
  people.md        # the record: goal, every person considered, status, reason, draft, approval, outcome
  day-of.md        # the list the user reads at the event
  requests/<NN-kind>/   # operator-request.md, task-result.md, captures (guest list, profile pages)
```

The event itself stays in `events/event-tracker.md` (the `event-scouting` skill owns it); if it has no row yet, add one from the Operator's capture. The user's standing preferences are in `events/event-profile.md`, in its sections "Purposes", "Contacting people", "Message style" and "Day-of list"; add a section the profile lacks. Keep them there, not in the event folder.

`people.md` has one row per person (name, kind, score, link, status, one-line reason) and one section per shortlisted person below it. Statuses: `found`, `shortlisted`, `skipped`, `drafted`, `approved`, `sent`, `replied`, `meeting agreed`, `met`, `declined`, `no reply`. Identify a person by their event-site profile URL and never add a second row for them.

## 1. Goal and timing

Start as soon as the user is registered and the guest list is visible, ideally five or more days before the event; a guest list is often visible only to registered guests, and only when the host shows it. If the event is close, say what is still realistic (for example, a day-of list without outreach).

Write the event's goal at the top of `people.md`: the purpose this event serves (named from "Purposes" in the profile, not copied), how many conversations the user wants, the channels allowed, and anything this event changes. Ask only what the profile does not answer.

Under the goal, write the scoring criteria for each kind of person the purpose names: what raises the score and what lowers it. For example, for technical builders: has built and shipped similar systems, owned what they built, seniority, and whether they are free to join. Make the kinds specific enough to score by. For a co-founder search, keep technical builders apart from people who understand the product and can sell it, and do not count a sales title alone as product understanding. When the user corrects a ranking, change the criteria or the purpose, score again, and save a lasting correction in the profile.

## 2. Guest list

Hand off an operator request (read-only, from [operator-request-template.md](templates/operator-request-template.md)) to capture the full guest list: for each guest the name, the event-site bio as written, links (LinkedIn, X, website, others) and the event-site profile URL, plus the total the event shows and how many could be seen. If the user named the event only by name or date, the request asks the Operator to find it among the events the user is registered for and to report `Needs Decision` with the candidates when more than one matches.

Add every guest to `people.md` as `found`. Before the event, ask for a fresh capture once more and add only the new guests.

## 3. First pass

From the captured data alone, mark the likely candidates for each kind with a one-line reason, `skipped` (with the reason) for those who clearly do not fit, and leave the rest `found` as unknown. Many guests write no bio; an unknown is not a poor fit, and strong people are often among them.

## 4. Profile reads

Profile pages show the real signal, but every view comes from the user's account, and people on LinkedIn may see who viewed them unless the user browses in private mode. Before each batch, tell the user how many profiles will be opened, on which site, and that the views may be visible, and propose a scope (for example, the candidates and the unknowns with a LinkedIn link). Hand off a read-only request only for the batch the user approves.

When the pages return, check that each one belongs to the guest (name, city, a detail from the bio); record a mismatch and do not use that page. Record whether the user is already connected with the person, since that decides the channel.

## 5. Shortlist

Score each person whose pages were read against the criteria for their kind, from 1 to 10, with a short note per criterion naming the evidence. A criterion their pages do not show counts as unknown, not as a fail; say how many were unknown. Rank each kind by score. For each shortlisted person write in their section: the score and its notes, who they are now, the evidence from their pages (role, company, what they build or sell, with dates), why they fit this goal, and anything that changes the ask (already connected, busy with their own company, someone the user already knows). Show the shortlist to the user and record their changes.

## 6. Drafts

Draft one message per shortlisted person, in the user's voice from "Message style": short and casual, the user in one line, the shared event, the ask, and one specific reason from the person's own pages only when it is true. Propose a short conversation at the event (for example "Up for 15 minutes there?"), unless the goal says otherwise. Do not inflate the user's product or the person's fit.

Name the channel for each draft and fit its limits: a message when the person is a connection, otherwise a connection request with a note (a LinkedIn note holds 300 characters, or 200 on some free accounts, and free accounts can add notes to only a few requests a month; the note box shows the limit), an X direct message where the person accepts them, or an email only to an address the person publishes. Put every draft with its channel and length in the person's section and show them to the user.

## 7. Approval and sending

Nothing is sent without the user's approval of that person's exact text and channel. The user may approve one person or a batch ("send 1–5 as written"). Record the approval in the person's section with the user's words and the time, and set `approved`. If the user edits a message, save the edited text as the approved one, and add their wording to "Message style" as an example.

Hand off one send request for the approved messages, listing each recipient's profile URL, channel and exact text, with the user's approval. The Operator returns one result per message. Set `sent` only for a message it verified; report anything not sent and why.

## 8. Replies and meetings

Until the event, check for replies whenever the user asks or comes back, with a read-only request for the sent people's conversations and pending invitations. You act only when the user writes, not on a timer, so end each report with the next check to ask for (for example once a day, and on the morning of the event). The user may instead tell you about replies. Record each reply and set `replied`, `meeting agreed` (with the time and place), or `declined`. Draft any answer and send it through the same approval as a first message. A follow-up to someone who has not replied needs the user's approval like any message.

## 9. Day-of list

When the user asks, and when they come back the day before or on the morning of the event, write `day-of.md` for reading on a phone: the agreed meetings first (time and place, who the person is in one line, what to talk about), then the shortlisted people to look out for, then the people who have not answered. Keep it short. Deliver it as "Day-of list" in the profile says; if that is not set yet, ask the user once how they want it on their phone and record the answer there.

## 10. Debrief

After the event, ask the user whom they met and how it went. Set `met` or `no reply`, draft any follow-ups for approval, and save what was learned (a kind of person worth more or less, a message that worked) in the profile. Delete the captured guest lists and profile pages in `requests/` unless the profile says to keep them; `people.md` stays as the record.

## Recovery

- **`Needs Decision`** (for example two matching events, a note over the limit, the note quota reached): ask the user, record the answer, and send a new request. Never accept a send without the approved note.
- **`Blocked`** (a login, a security check, a rate limit, a hidden guest list): tell the user what they need to do. After a site warning, send no further requests to that site until the user says so.
- A user's "stop" stops all outreach; record it in `people.md`.

## Report and stop

After each request, shortlist, draft set, send result or day-of list, report to the user and stop. Never contact anyone the user has not approved, change an account setting, or follow, connect with or message anyone as a side effect of reading.
