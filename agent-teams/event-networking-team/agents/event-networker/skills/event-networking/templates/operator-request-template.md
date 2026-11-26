# Operator request — <kind: guest list / profile reads / inbox check / send approved messages> — <event title> — <date>

## Event

- Event URL: <exact URL, or "find it": the user's registered event named <name> on <date>>
- Date and time: <with time zone>

## Kind

<One of the two below; delete the other.>

### Read only

Open and read only. Do not click Connect, Follow, Message, RSVP or any other control that changes something or that others can see.

- Pages to read: <the guest list of the event / the profile URLs listed below / the conversations and pending invitations of the people listed below>
- Capture for each: <for a guest list: name, bio as written, links (LinkedIn, X, website, others), event-site profile URL; for a profile: headline, current and past roles with companies and dates, and the connection degree (1st, 2nd, 3rd); for an inbox: each message with its date and sender, and whether an invitation was accepted>
- Approved scope: <for profile reads: the number of profiles the user approved, with the user's words and time>
- Pace: read profiles in short batches with pauses. Stop at any security check, warning or limit and report `Blocked`.
- People:

| # | Name | URL |
| --- | --- | --- |
| 1 | <name> | <URL> |

### Send approved messages

Send exactly these messages, one per recipient, and nothing else. Each was approved by the user as written.

| # | Recipient and profile URL | Channel | Exact text | User's approval (words, time) |
| --- | --- | --- | --- | --- |
| 1 | <name, URL> | <message / connection request with note / X direct message / email from <account>> | <text> | <"…", time> |

If a channel is not available, the text does not fit, a note cannot be added, or the site shows anything other than the approved recipient and text, do not send that message; report `Needs Decision` for it with what the site showed, and continue with the others. Verify each sent message on the site (for example the sent message in the conversation, or the invitation shown as pending).

## Output

- Save `task-result.md` and the captures in: `<absolute request folder>/`
- Keep every file this task makes in that folder, scratch files and screenshots included: they hold other people's data. Nothing goes to `/tmp` or another shared folder.
- For each person or message: the outcome and how it was verified.
