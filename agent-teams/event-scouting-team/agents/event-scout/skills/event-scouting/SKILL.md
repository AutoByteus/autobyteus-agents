---
name: event-scouting
description: Find the events most relevant to the user's purposes (for example finding a technical co-founder, or meeting investors) on Luma and other event sites through the Computer Use Operator, score each event's relevance from the people it is likely to bring, keep a tracker of every event considered, shortlist the best for approval, request registration only for approved events, and then line up conversations at them with `event-networking`.
---

# Event Scouting

You own the judgment and the record. The Computer Use Operator does every website action for you: browsing event sites, collecting event details, and registering. You may read a public page's text with `read_url` and use `search_web` to discover event pages or calendars; you never register or log in yourself.

## Workspace

```text
<workspace>/events/
  event-profile.md                       # why the user goes to events, and what they want from them
  event-tracker.md                       # every event considered, one row each
  searches/<YYYY-MM-DD>/                 # search-request.md, task-result.md, captures
  shortlists/<YYYY-MM-DD>-shortlist.md   # what was proposed and what the user chose
  registrations/<YYYY-MM-DD-event-slug>/ # registration-request.md, task-result.md, evidence
```

`event-tracker.md` columns: event URL, title, date and time (with time zone), place or `online`, host, purpose, relevance (1–10), status, reason, last updated. Status is one of `found`, `shortlisted`, `skipped`, `approved`, `registered`, `pending host approval`, `waitlisted`, `declined`, `attended`. An event is identified by its canonical URL; for Luma that is `https://luma.com/<slug>` (`lu.ma` links redirect there). Never add a second row for the same event.

## 1. Profile

If `event-profile.md` is missing, build it with the user from [event-profile-template.md](templates/event-profile-template.md): the purposes they go to events for (for example finding a technical co-founder, or meeting investors), and for each the people they want to meet, what counts and what does not, and what a relevant event looks like; the calendars and hosts worth following, city and travel radius, whether online events count, the time window and available days, cost limit, languages, and anything they never want. Ask only what you cannot infer, and get the user's confirmation of the saved profile.

When the user changes a preference, or says how an event went, update the profile, for example a host worth following or a format that wastes time.

## 2. Search

Write `search-request.md` in `searches/<YYYY-MM-DD>/` and hand it off. It states:

- the pages to visit: on Luma, the city page for each city in the profile (for example `luma.com/berlin`), the category pages that fit the profile's purposes (for example `luma.com/ai`, `luma.com/tech`), and the calendars the profile follows; then any other site the profile or the user names. Luma's public pages have no keyword search;
- the time window and the city or region;
- the fields to capture for each event: URL, title, date and time with time zone, venue or area, online or in person, host or organizer, a short description, price, registration type (open, host approval, waitlist, sold out), attendee count when shown, and the guests or featured guests the page shows (names and short descriptions);
- read-only: browse and capture only; never register, RSVP, follow, or message anyone;
- stop rules: stop after the time window is covered or about 60 events are captured; skip pages that need a login and list them;
- the output: a table of the fields in `task-result.md`, captures in the same folder.

Hand it off and stop. When `task-result.md` returns, handle `Blocked` and `Needs Decision` by telling the user what is needed. Between searches you may use `search_web` (for example `site:luma.com investor <city>`) and `read_url` to find extra event pages, and include their URLs in the next request. A plain page read does not show Luma event dates; take dates from the Operator's capture.

## 3. Assess

For each captured event:

1. Match its URL against the tracker. Update a known event; add a new one as `found`.
2. Skip it, with the reason, when it breaks the profile: outside the window or radius, over the cost limit, a language the user does not speak, sold out without a waitlist, or on the never list.
3. Score the rest from 1 to 10 for the purpose it serves best: how likely the event brings the people that purpose names, and lets the user meet them. Judge by who will be there, not by the topic, in this order: who attends (the guests or featured guests shown, the host's audience, the description), the host's track record, the format (time to talk versus talks only), size (enough of the right people, small enough to meet them), and timing. Write the score with a one-line reason that names its evidence. Do not guess an audience the page does not support; when it is unclear, say so, and let the doubt lower the score.

## 4. Shortlist

Write `shortlists/<YYYY-MM-DD>-shortlist.md`: the events scoring 7 or more, and the best below that if fewer than three do, sorted by date, each with purpose, score and reason, date and time, place, host, price, registration type, and why it fits. Mark events on the same evening as a choice. Show it to the user and ask which to register for. Record the choices in the shortlist and the tracker (`approved` or `declined`).

## 5. Register approved events

For each approved event, write `registration-request.md` in `registrations/<YYYY-MM-DD-event-slug>/` from [registration-request-template.md](templates/registration-request-template.md) and hand it off, one request per event.

- Registration shares the user's details. Include only answers the user approved; a form question without an approved answer makes the Operator stop with `Needs Decision`.
- A paid event needs the user's approval of the exact price.

When `task-result.md` returns:
- **`Completed`:** set the tracker status from the evidence (`registered`, `pending host approval`, or `waitlisted`) and report it to the user with the date, place, and any confirmation details.
- **`Needs Decision`:** ask the user, record the answer, and send a new request.
- **`Blocked`:** tell the user what they need to do.

## Report and stop

After each search, shortlist, or registration result, report to the user and stop. Do not poll another member. Never invent an event, a detail the page does not show, or a registration outcome without evidence.
