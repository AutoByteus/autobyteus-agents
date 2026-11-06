# The Project's Own Documents

A project keeps its own rules in three documents at its repository root. They
are project-level, standing documents: they hold what every future change in
the project follows, not the record of one ticket, release or failure. The team
follows them; each role's skill says when it reads them. When a project lacks
one, the team creates it, so the next ticket finds the project's rules in one
place instead of working them out again.

| Document | What it holds | Read by | Owner: creates it when missing, adds and changes its rules |
| --- | --- | --- | --- |
| `DESIGN.md` | The project's architecture, the conventions its code follows, its own design principles, and its design cases | Solution Designer before design; implementation and the reviewers | Solution Designer; creates it during architecture design |
| `TESTING.md`, the testing guideline | How the project is tested: setup, test layers and their commands, gated suites, environments, credentials and test data, and the rules every test run follows | Implementation, API/E2E, code reviewer | API/E2E engineer; creates it before it hands off its first result |
| `RELEASE.md`, the release guide | How a change is finalized, released and rolled out | Delivery engineer | Delivery engineer; creates it before the final commit (before tagging on a release request) |

A document counts as present when the project keeps it under another name and
its `AGENTS.md` names that file for the purpose, such as a README section for
releases. Closer `DESIGN*.md` or `TESTING*.md` files for parts of the
repository refine the root one; they do not replace a missing root file.

## What goes in them

- What every future change in the project follows: a rule, practice,
  principle or convention, a command, a component and its owner. Write it as
  the rule, with its reason when the reason helps a reader apply it.
- Not the story of one ticket, release or failure: what happened, its runs,
  versions, dates, decisions, evidence and results stay in that ticket's
  documents, which are archived with it. When an incident teaches something,
  write the rule it teaches, not the incident.
- Not the team's general practice: it stays in the team's files; do not copy
  it in.
- The one exception is `DESIGN.md`'s design cases: a design mistake whose
  lesson future designs of the same shape need, kept to what such a design
  needs. The testing guideline and the release guide have no case sections; a
  lesson from a test or release failure goes in as a rule.

## Creating a missing document

- Create it in the ticket that first needs it, in the ticket's worktree, from
  your skill's template for it. Commit it on the ticket branch with your other
  documents, so it is finalized with the ticket, and record its path as created
  in your report.
- Write what this work established: what you read in the code, configuration
  and existing docs, and what you ran. Leave out a section you know nothing
  about rather than guessing; a later ticket adds it when it learns it. A first
  version is short.
- Keep it to what goes in them (above).
- A rule the project has not decided, such as whether a change is released by
  default or which data tests may use, is the user's decision. Write what you
  observed and used, and name the open decision in your report.
- When the project has a root `AGENTS.md`, add one line to it naming the new
  document and when to read it.
- From then on it is the project's document, like one the project wrote.

## Keeping them current

- When a ticket changes what a document describes (a component, a convention,
  a test command, a release step), the ticket updates it; a new or changed rule
  is written by the document's owner. Delivery's docs sync checks the three
  documents against the final change, including discrepancies the ticket's
  reports recorded, such as a command that no longer works.
- The Solution Designer adds the project's design cases to its `DESIGN.md`
  (its skill's Recovery).
- A rule the project set stays the project's: when the work shows one is
  wrong, propose the fix in your report, and change it only when the user
  agrees or the ticket is about it. When a document says how it may be
  updated, follow that.

## When a later stage catches a problem

A problem that passed one stage and was caught at a later one, such as a
release pipeline failing on a change that passed validation, is fixed twice:
the defect through the normal route, and the stage that let it through.

- The check that would have caught it goes into the document of the earliest
  stage that can reproduce it, whoever owns that document: usually the
  testing guideline (a rule or a test), not the document of the role that
  noticed it.
- The release guide gets a check, such as a pipeline run before tagging, only
  for what no local machine can reproduce, such as another operating
  system's packaging or a limit of the release runner. That a local machine
  cannot reproduce it is shown by a real attempt from a fresh start, not
  assumed.
- Adding that check is part of the ticket that caught the problem. Changing
  or removing a rule the project set still follows the rule above.
