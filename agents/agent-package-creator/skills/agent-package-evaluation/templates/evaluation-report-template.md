# Evaluation Report

- Evaluated: `<package, path, commit>`; for a change, the old commit and the new
- Question: `<what the user asked, or what the change must show>`
- Date, app version, runtime:
- Criteria: `<path to the criteria file>`, written `<when, before which run>`

## Verdict

`Better` / `No difference` / `Worse` / `Inconclusive` / `Could not run`, or for a package on its own, how far its user can rely on it. In two to four sentences: what the runs showed, and the next action.

## Runs

| Run | Text (old/new) | Request | Model | Instance | Output |
| --- | --- | --- | --- | --- | --- |
| | | | | | `<path>` |

## Read as its user

What the user of the output would notice on reading each output whole, before any criterion: the first thing they see, what they could rely on, and what would stop them.

## Criteria

| # | Criterion | Result | Evidence (run, step, file) |
| --- | --- | --- | --- |
| | | `Met` / `Not met` / `Untested` | |

## Old against new

For a change: where the outputs differ, and where they do not. When both pass alike, whether the scenario let the real failure happen.

## Defects and generalization

- Defects left, each with its evidence and the file or rule that causes it.
- Whether the gain comes from a general rule or from fitting this one case, and which kinds of input were not tried.
