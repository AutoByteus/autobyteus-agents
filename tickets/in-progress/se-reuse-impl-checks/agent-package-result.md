# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `team`
- Update intent: `extend`: the implementation engineer records its checks; code review and API/E2E reuse unchanged results instead of repeating them
- Target package: Software Engineering Team, `agent-teams/software-engineering-team/`
- Request/reference: Task `autobyteus-agents-26`; analysis `agent-package-analysis.md`

## Summary

- **Implementation records its checks:** the handoff's "Local Implementation Checks Run" (free text) becomes one **Checks Run** table: check ID, command or steps, commit tested, environment, code it exercises, criteria or behavior, result, evidence files, the line to look for. It also lists the checks not run, and why.
- **API/E2E reads it first** and reuses a result when it ran on the commit being validated, or the files changed since do not touch the code it exercises, and its evidence is enough to judge from. A reused check is planned and recorded as a case of kind `Reused` that names the check ID, by reference and not copied. It reruns when the code changed, the result is unclear, or the evidence is not enough. Reused results count on the same terms as its own: the confidence gates, direct proof of critical criteria, the mock rule and realistic-system validation all still apply.
- **The code reviewer** reads the checks first and does not rerun them just to confirm.
- **Delivery's path** stays criterion → cases → files → quoted line; a `Reused` case points one row further, to the implementation check.
- **Evidence-writing rules** have one owner, `shared/evidence-files.md`, used by both writers. The file names start with the check or case ID.

## Changed paths

- **Added:**
  - `shared/evidence-files.md`, with symbolic links in the implementation-engineer and API/E2E skills' `references/`;
  - this ticket folder.
- **Modified:**
  - `implementation-handoff-template.md`: the Checks Run table; the frontend check names check IDs;
  - implementation `SKILL.md`: record checks; rerun the affected ones after a later change;
  - API/E2E `SKILL.md`: an evidence pointer, the reuse rule, and a commit pointer;
  - `api-e2e-coverage-investigation-template.md`: Planned Cases Kind `Reused`;
  - `api-e2e-execution-coverage-report-template.md`: how a `Reused` case appears;
  - code reviewer `SKILL.md`: the rerun rule;
  - delivery `SKILL.md`: reused cases (paragraph reflowed).

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | Pass | API/E2E, implementation, code reviewer, delivery: valid |
| Links resolve | Pass | 0 broken; the new symbolic links resolve |
| Nothing lost | Pass | Every rule moved out of the API/E2E Outputs is in `evidence-files.md`. The implementation template keeps "not API/E2E sign-off", "no broader environments", and the preview setup (restored after review). |
| Real-use check | Pass | `mock-check/reuse-check.md`: a real two-commit git repository. A review fix changed `src/server/api.ts`; under the rule, IMP-01 (`src/theme/`) is reused and IMP-02 (`src/server/`) is rerun. The AC-001 journey that implementation did not run is run by API/E2E. Delivery's path still ends at the file and the quoted line. |
| Final review | Pass | Round 1: reflowed the delivery paragraph (no hyphen break); shortened the Planned Cases "Why" header; restored the preview-setup mention. Round 2: no findings. |

## Grounding

In `workspace-skill-collision-fix`, implementation ran typecheck, unit (5,830), integration (396) and two e2e files. API/E2E then reran the same commands (API-01, API-02, API-04), because the implementation notes had no commit or evidence.

## Related Task

`autobyteus-agents-10` (9c96bc42, validation proportional to the change) is kept separate. It decides how much to test for a change's risk; this one removes repeats. It can build on the `Reused` kind and the Checks Run table.

## Limits

- The check was a mock read by the Agent Package Creator; the diff was real.
- The next real ticket will show reuse in practice.
