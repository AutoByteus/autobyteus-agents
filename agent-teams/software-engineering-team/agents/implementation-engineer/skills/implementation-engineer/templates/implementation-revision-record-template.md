# Implementation Revision Record

Create `implementation-revision-record.md` only when implementation changes after the initial implementation handoff in response to downstream feedback. Keep one canonical file across all later rounds; do not create round-specific copies.

The current code and `implementation-handoff.md` remain authoritative. Record only the implementation delta and rationale needed to locate and review the rework.

## Revision Index

| Revision ID | Triggering Role / Report / Round | Finding IDs | Classification | Related Revision IDs | Result |
| --- | --- | --- | --- | --- | --- |
| IR-001 |  |  | `Local Fix` / `Design Impact` / `Requirement Gap` / `Unclear` | `SR-*`, `CRR-*`, `API-REV-*`, or `N/A` |  |

## Revision Entries

### IR-001 — `<concise revision title>`

- Triggering role, report path, and round:
- Triggering finding IDs:
- Classification:
- Related solution revision ID: `SR-*` / `N/A`
- Related code review revision IDs: `CRR-*` / `N/A`
- Related API/E2E revision IDs: `API-REV-*` / `N/A`
- Why implementation revision was required:
- Approved behavior or requirement IDs affected:
- Implementation delta:
- Changed files or areas:
- Local validation and result:
- Remaining limitations or risks:

Keep prior entries. Add a new entry for later rework instead of rewriting history, except to correct a factual error.
