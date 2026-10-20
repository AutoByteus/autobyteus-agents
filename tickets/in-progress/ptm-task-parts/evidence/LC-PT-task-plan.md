# Task plan — cross-node collaboration between paired installs

- Project: Nodeapp (`project_00a3cea2-0dd6-4345-935b-292d7ca6d27c`)
- Request: "I want cross-node collaboration: two paired installs work on the same Projects. It comes in three slices that the software team will do one at a time: (a) node discovery and pairing, (b) syncing Project Tasks between paired nodes, (c) syncing Project files. (c) needs (b) first. Plan it for me; nothing is dispatched today."
- Goal and done: two installs of the app on different machines can find and pair with each other, and from then on work on the same Projects — a Task created or changed on either node shows up on the other, and a Project's files are available on both. Done when all three slices are delivered and a user on either paired node sees the same Projects, Tasks and Project files.
- Plan approval: "Approved, and yes, (b) depends on (a). Create the Tasks; don't dispatch anything." — 2026-10-20

## Tasks

Listed in dispatch order; each Task comes after the Tasks it depends on.

| # | Task | Part of | Depends on | Worker | Key | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Cross-node collaboration on shared Projects (goal; never dispatched) | — | — | — | `nodeapp-1` | DONE |
| 2 | Slice (a): node discovery and pairing | 1 (`nodeapp-1`) | — | never dispatched | `nodeapp-2` | DONE |
| 3 | Slice (b): sync Project Tasks between paired nodes | 1 (`nodeapp-1`) | 2 (`nodeapp-2`) | never dispatched | `nodeapp-3` | DONE |
| 4 | Slice (c): sync Project files between paired nodes | 1 (`nodeapp-1`) | 3 (`nodeapp-3`) | never dispatched | `nodeapp-4` | CANCELLED |

Row 1 is the parent Task: it holds the goal and what done looks like for the whole, and is never dispatched. Rows 2–4 are its parts, dispatched one at a time to the software team, as the user asked.

## Open questions and changes

- Dependency between (a) and (b): the user stated only that (c) needs (b). I proposed (b) depending on (a) as well, because syncing Tasks needs an established pairing and a node identity to sync with. Confirmed by the user, 2026-10-20.
- Open for slice (b) (`nodeapp-3`), for the team to raise with the user if the codebase does not answer it: is a shared Project opt-in per Project, or implied by the pairing? — moot, the slice was not dispatched.
- Change of plan, 2026-10-20 (the user): slices (a) and (b) "were already built in another project and I checked them myself, they work" — `nodeapp-2` and `nodeapp-3` closed DONE on the user's own check. Slice (c) dropped — `nodeapp-4` CANCELLED with that reason. Goal Task `nodeapp-1` closed DONE on the user's instruction; cross-node collaboration is file sync short by the user's choice. Nothing was ever dispatched, so no worker, worktree or branch cleanup was needed. This plan is closed.
