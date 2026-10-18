# Writing Evidence Files

Evidence is the proof later roles judge from, often without running anything themselves. Write it for that reader. The implementation engineer and the API/E2E engineer both follow these rules; each lists its files in its own table (the implementation handoff's Checks Run, the execution report's Cases).

- **Where:** the ticket folder's `evidence/` folder, or where the project's testing guideline says. Start each file name with its check or case ID (for example `IMP-03-unit-backends.log`, `API-02-browser-toggle.png`), so files from both roles sit together without clashing. Name files so every operating system can check them out (for example, no `:`).
- **Header:** start each text file with a short header: the command or step, the commit, the environment, the date, and the check or case ID. A screenshot or other binary file gets these from its row.
- **Excerpt:** for a long log, save a short excerpt with the lines that prove the result next to the full log, or record where the full log is when it is too large to commit.
- **Observed checks:** save a check you only observed (a page, a console, a running app) as a file, such as a screenshot, a DOM snapshot or the copied output, not only as a line in a document.
- **What to look for:** in the row that lists the file, quote the key line exactly as it appears, or name the count or the screenshot detail, so a reader can find it.
- **Durable:** before you hand off, commit your evidence and documents with the ticket folder on the ticket branch, unless the project's testing guideline says otherwise, and give the commit in the handoff. Then the evidence survives if the worktree is removed before delivery archives the ticket.
