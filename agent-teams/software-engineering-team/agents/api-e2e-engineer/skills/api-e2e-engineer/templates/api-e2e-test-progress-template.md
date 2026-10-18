# API/E2E Test Progress

Your own progress log while tests run. The conversation can be compacted in the middle of a run, and afterwards you may not remember which cases already ran, which one was running, or how they ended. This file tells you. Read it first whenever you pick the run back up, or are unsure what has already run.

- Write a `Started` row right before a case begins and a `Completed` row with its result right after it ends, before the next case starts. During a long case, add `Checkpoint` rows.
- Only add rows; never change earlier ones.
- Keep it to progress. What a case ran, its evidence and what it proves go into the execution report's Cases table when the case completes.

- Execution coverage report:
- Planned cases: the coverage investigation's Planned Cases (same case IDs)

| Time | Case ID | Event (`Started`/`Checkpoint`/`Completed`) | Result (`Pass`/`Fail`/`Blocked`/`Not Tested`) | Note (what is running and where, what to do next) |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
