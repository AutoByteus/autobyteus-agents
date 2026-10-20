# Design Spec

- task_size: `Medium`; architectural_risk: `High` (changes the stored run shape)

## Spine

`Run page -> RunController -> RunService -> RunRepository`

## Design

- `RunController.archive` calls `RunService.archive`. `RunController.isArchived` reads the flag directly from `RunRepository`, because the service has no read method for it.
- `RunService.archive` accepts a run as finished when `status === "done"` or, for runs stored before this change, when the old `finished` field is true, so old stored runs keep working. No data migration.
- One `RunRecord` type in `src/shared/record.ts` serves agent runs, team runs, and team members; all type-specific fields are optional.
- `RunService.getById(id)` serves both agent and team runs and infers the kind from the id prefix.
- Persisted data: existing stored runs use `finished: true` instead of `status`; read both.

## Change Scope

- In scope: `src/runs/*`, `src/shared/record.ts`.
- Removal plan: none.
