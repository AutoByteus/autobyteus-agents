# Handing Off

## How every role hands off

- Finish and classify your result, and persist your documents first.
- Call `get_handoff_rules`. The rules it returns are the routing authority:
  send with `send_message_to` to each exact returned `recipient_address`, never
  to a recipient picked from memory. A skill names the owning role of an
  outcome; the address comes from the rules.
- Give absolute paths, and attach the files in the reference-files field (what
  to attach: below).
- Stop after the required messages succeed. Do not poll a recipient; act on a
  later incoming message.
- While acting as a team member, use the team's tools, not Codex-native
  collaboration tools such as `spawn_agent`, `wait_agent` or `list_agents`.

## Choosing what to hand off

When you finish your work, decide what to hand off, as a person would before
passing work to a colleague. Two parts:

- **Your own documents always go.** Your skill names them: the documents you
  own and keep current, such as your report and revision record. They are what
  the next role builds on, so every handoff carries them, on every route.
- **Other files are your judgement.** You did the work, so you know what
  changed and what the receiver has to act on. Think it through instead of
  forwarding everything you received.

### Think it through

- **What did I produce or change?** Besides your own documents, anything new
  the receiver must look at, such as changed test files for a test review or
  the evidence of a failing case.
- **What will the receiver do next?** The route you classified tells you:
  review a design, build it, validate it, review tests, deliver it.
- **Which other files will it open for that?** Usually a few current documents
  from earlier roles, such as the requirements doc and design spec. Delivery
  verifies from evidence, so a handoff to delivery also carries the API/E2E
  execution report and the evidence for the critical acceptance criteria,
  even when it comes through the code reviewer.

Everything else stays where it is. The ticket's documents link to each other:
the revision records index every round, the implementation handoff and the
API/E2E coverage investigation list the upstream documents, the execution
report's Cases table lists each case's evidence, and the investigation
notes keep the supplement inventory. Give the ticket folder's absolute path so
the receiver can find anything else it needs. The code is in the worktree;
give its absolute path, branch and commit.

"The package" in a role's inputs means these documents in the ticket folder,
listed below. It says what the role works from, not what every message must
attach.

## The ticket's documents

All live in the ticket folder; evidence in its `evidence/` folder. A role works
from the documents written before its stage on the ticket's route.

| Document | Written by | Exists |
| --- | --- | --- |
| `requirements-doc.md`, `investigation-notes.md`, `solution-revision-record.md`, `design-spec.md`, and the supplements the investigation notes list | Solution Designer | on every route; a release request has only the handoff file |
| `design-review-report.md`, `architecture-review-revision-record.md` | architecture reviewer | when architecture review was selected |
| `implementation-handoff.md`, `implementation-revision-record.md` | implementation engineer | on every route |
| `code-review-report.md`, `code-review-revision-record.md`; `api-e2e-test-review-report.md` after a passed API/E2E run | code reviewer | when source review was selected (`Large` or `High`) |
| coverage investigation, execution coverage report, `api-e2e-revision-record.md` (and the test progress log, its working file) | API/E2E engineer | on every route |
| docs sync report, `handoff-summary.md`, release/deployment report, `delivery-revision-record.md`, `release-notes.md` when required | delivery engineer | on every route; a release request has the release/deployment report, `delivery-revision-record.md` and the release notes the guide requires |
| `follow-ups.md` | any role ([ticket-scope.md](ticket-scope.md#recording-follow-ups)) | when a follow-up was found |
| `evidence/` | implementation and API/E2E (as the team's `evidence-files.md` describes) | when checks ran |

A review that was not selected has no documents; a role that would read them
marks them `N/A — not applicable` and never invents a prior review. A missing
design spec or post-design classification is an upstream gap, not a shortcut.

### Signs you are forwarding instead of choosing

- You are attaching files because you received them.
- The list grows with every hop.
- It includes earlier rounds' reports, whole evidence folders or repository
  source files.
- You are building an index or hash list to prove nothing was dropped.

### Example

**Before.** The Solution Designer resumed API/E2E validation after an
acceptance revision. Its handoff file was clear and named about fifteen
documents to read. The message attached 1,618 files: every reference earlier
roles had passed on, including 884 evidence files, 374 implementation-evidence
files, 223 code-review-evidence files and about 85 repository source files. Its
text said "all 1614 incoming refs preserved", backed by a 756 KB package index.
The receiver had to find the right files among them, and the message was slow
to open.

**After.** The Solution Designer attaches its own documents: the handoff
file, requirements doc, investigation notes, solution revision record and
design spec. Then it asks what API/E2E will do next: resume validation against
the revised acceptance criteria. So it adds the new approval record and the
API/E2E coverage investigation, test progress log, execution report and revision
record that API/E2E will update. The handoff file gives the ticket folder's
absolute path, names the review and implementation reports in case they are
needed, and says the earlier evidence is listed in the execution report's
Cases table. That is
ten files instead of 1,618, and the receiver loses nothing it needs.
