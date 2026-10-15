# Choosing What To Hand Off

When you finish your work, decide what to hand off, as a person would before
passing work to a colleague. You did the work, so you know what you produced,
what changed and what the receiver has to act on. Think it through instead of
forwarding everything you received.

## Think it through

- **What did I produce or change?** Your result, report or handoff file, your
  revision record entry, and anything new the receiver must look at, such as
  changed test files for a test review or the evidence of a failing case.
- **What will the receiver do next?** The route you classified tells you:
  review a design, build it, validate it, review tests, deliver it.
- **Which files will it open for that?** Name those, with absolute paths, and
  attach them in the reference-files field. Usually that is a handful of
  current documents, such as the requirements doc and design spec, plus your
  own result.

Everything else stays where it is. The ticket's documents link to each other:
the revision records index every round, the implementation handoff and the
API/E2E execution report list the upstream documents, the execution report's
Acceptance-Criteria Proof table links the evidence, and the investigation
notes keep the supplement inventory. Name the ticket folder so the receiver
can find anything else it needs. The code is in the worktree at the branch and
commit you name.

"The package" in a role's inputs means these documents in the ticket folder.
It says what the role works from, not what every message must attach.

## Signs you are forwarding instead of choosing

- You are attaching files because you received them.
- The list grows with every hop.
- It includes earlier rounds' reports, whole evidence folders or repository
  source files.
- You are building an index or hash list to prove nothing was dropped.

## Example

**Before.** The Solution Designer resumed API/E2E validation after an
acceptance revision. Its handoff file was clear and named about fifteen
documents to read. The message attached 1,618 files: every reference earlier
roles had passed on, including 884 evidence files, 374 implementation-evidence
files, 223 code-review-evidence files and about 85 repository source files. Its
text said "all 1614 incoming refs preserved", backed by a 756 KB package index.
The receiver had to find the right files among them, and the message was slow
to open.

**After.** The Solution Designer asks what API/E2E will do next: resume
validation against the revised acceptance criteria. So it attaches its
handoff file, the requirements doc with the new approval record, the solution
revision record, the design spec, and the API/E2E coverage investigation,
case ledger, execution report and revision record that API/E2E will update.
The handoff file names the ticket folder and the review and implementation
reports in case they are needed, and says the earlier evidence is linked from
the proof table. That is nine files instead of 1,618, and the
receiver loses nothing it needs.
