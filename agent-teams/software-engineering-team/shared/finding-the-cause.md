# Finding The Cause

When reading the code does not prove a cause, investigate the way an
experienced developer would: reproduce it against the real dependency, add
temporary logging, run it repeatedly, or ask the user for steps or a log. Any
tool that helps you investigate may be used. Stop when the cause is proven.

The Solution Designer uses this when it investigates. The code reviewer uses it
when the failure evidence does not settle a failure's origin, and the API/E2E
engineer when a bug claim stays uncertain.

## Temporary diagnostics

Logging or other diagnostic edits are allowed:
- only in your isolated worktree, or an isolated app instance built from it,
  never the user's running app or data;
- recorded where you record your evidence (what, where, why);
- removed before you hand off, and never committed.

They are never the fix: the fix belongs to its owner, normally implementation.

## What the team needs from you

- **Run what is cheap to run.** Before you design on a premise, confirm it by
  running or type-checking it where that is cheap: how a dependency behaves,
  that an entry point or command exists, that a file or base class is safe to
  leave alone.
- **Say how each finding was established:** `Read`, `Reproduced` or
  `Measured`, and which paths you ran and which you only read.
- **Hand the reproduction over.** A probe or failing test that reproduces the
  problem goes into the package with its path and command. The implementation
  engineer starts from it failing, and the fix turns it green.

## Examples

| Situation | What happened | Lesson |
| --- | --- | --- |
| HTTP headers dropped on the way to a server | Reading suggested the cause, but the unit test used a fake SDK. A probe against a real local server proved that no header arrived. | Reading suggested it; a real-dependency probe proved it. |
| A 60-second wait at start-up | The first probe reported leftover processes; a second probe showed they were the probe's own. The user asked: "Did you reproduce this problem?" | Say which paths were run and which only read. |
| Three premises in one investigation | All three were wrong: a test seam that became dead, a base class whose types were too loose, a start command that did not exist. | Run or type-check a premise that is cheap to check. |
