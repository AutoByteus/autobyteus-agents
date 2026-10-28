# Validation — Supervised Research Team

**Result: Pass for the scoped package and observed scenarios.** This is evidence
of package behavior, not a scientific validation of SemFlow, a publishability
certificate, or a promise of indefinitely autonomous research.

## Static and final-text checks

- [Structural check and source fingerprints](validation/static-checks.log): all three
  JSON files parse; team/member frontmatter, folder/skill names and explicit skill
  attachments align; coordinator and both local members resolve; two unique rooted
  sender–recipient pairs, with no shared dependency. All configured tools exist in
  the [observed runtime catalog](validation/tool-catalog.json).
- Standard `quick_validate.py` passed for both skills. Creator `check-links.py`
  passed for the package and repository README (zero broken/unnamed links); no broken
  symlinks or unfinished markers. The staged check identified CRLF in the original
  CSV fixtures; ticket-local Git attributes preserve those hashed bytes and accept
  CR-at-EOL rather than altering evidence. The final staged/range whitespace check
  passes. Validation scripts compiled
  and executed successfully. There are no production scripts to test.
- [Loaded definitions](validation/loaded-catalog.json): actual isolated server loaded
  both agents and their skills with null/empty load issues. The team was discovered
  from its configured package root; a redundant import returned “already exists”,
  then `reloadAgentPackageDefinitions` succeeded. No production catalog registration
  or user-app change is claimed.
- The final package matched the live copy byte-for-byte, including the two symlinks.
  No runtime instruction was changed after these tests. Later changes are test
  artifacts/documentation only.
- Final review covered ownership, flow, grounding, clarity and economy against the
  Creator standard and anti-patterns. Before the live runs, clarified that the new
  assignment must have no *other delivered* assignment outstanding, and that paper
  readiness does not expand authorization. No remaining package defect was found;
  no new anti-pattern entry was needed. Existing packages were not restructured.

### Outcome routing review

| Producer/result | Destination/recovery |
| --- | --- |
| Supervisor `Continue`, new bounded assignment | Existing researcher through the configured route; never normal delegation. |
| Researcher `Review requested`, `Checkpoint`, `Blocked`, `Decision needed` | Existing supervisor; candidate completion is not team certification. |
| Supervisor `Complete`, `Blocked`, `Decision needed`, `Budget exhausted`, `Paused` | No internal continuation; return to user/caller or matching parent rule. |
| Failed/unavailable delivery | Persist pending handoff and report to caller; no invented execution or completion. |
| Duplicate/stale handoff | Saved decision rather than duplicate work; changed evidence requires a new review. |

User-requested collaboration remains allowed. Rule addresses live only in config;
role procedures own decisions. One shared contract supplies the bar both roles use.
A two-agent split is justified by independent criticism, not by sequential writing.

## Live execution

[Runtime identity](validation/runtime.json): isolated installed Linux AutoByteus
server, manifest version `0.1.1` and recorded entry-file SHA256, separate data root
and port 45051; real `codex_app_server`, `gpt-6-astra`, high reasoning, Codex CLI
`0.164.0`. No claim about Electron UI or a source-worktree app build. A temporary
Codex home linked only the existing sign-in file; user CLI settings were not edited.
Only this team was imported. Tests used synthetic folders, not SemFlow or user data.
Isolation was instance/data/workspace isolation, not an OS-level security sandbox.

Each case received **one initial caller message**, no reminders. Actual members
opened their attached skills and the shared contract. All four internal sends were
accepted with `DELIVERED`; no delegates or external collaborators were launched.
See [machine assertions](evidence/assertions.json) and the actual per-case message
logs, observable tool events and final artifacts. System prompts and model reasoning
are excluded from archived events; commands, tool results and replies are retained.

| Case and tested point | Observed behavior and evidence |
| --- | --- |
| **A: premature completion** | Seeded C001 claimed completion/publication readiness from 2 smoke rows, although the original goal required 12 evaluation rows across three families. Supervisor independently opened/reran the evidence, rejected the claim and wrote four concrete findings with closure conditions in [C001 review](evidence/case-a/study/cycles/C001/review.md). It persisted [C002](evidence/case-a/study/cycles/C002/assignment.md) and actually messaged the researcher. |
| **A: continued work without a user reminder** | The researcher executed C002, kept C001 unchanged and returned a [new report](evidence/case-a/study/cycles/C002/report.md) with raw predictions, source hashes, reproduction code, per-case comparisons and counterexamples. [Team messages](evidence/case-a/team-messages.jsonl) show both directions; [events](evidence/case-a/observable-events.jsonl) show the first supervisor turn ended, then the researcher's message triggered its next review turn. |
| **A: defensible limited conclusion** | Supervisor independently reran/recomputed all 12 cases, checked report rows and preservation hashes, then concluded [Complete / Not ready](evidence/case-a/study/cycles/C002/review.md). Candidate 7/12 versus baseline 8/12; neither perfect accuracy nor generalization/publication was claimed. Candidate wins one case, so baseline's better aggregate score was not inflated into per-case dominance. Creator also reproduced the same raw result. No C003 was issued. |
| **B: intake and real access blocker** | Supervisor created a bounded original-goal study and sent one assignment. Researcher attempted the sole authorized missing CSV, recorded `FileNotFoundError`, and returned `Blocked`. Supervisor independently reproduced the access failure and delivered [Blocked, no invented mean](evidence/case-b/study/cycles/C001/review.md), with the caller-owned restart action and budget condition. [Messages](evidence/case-b/team-messages.jsonl), [events](evidence/case-b/observable-events.jsonl). |
| **C: budget exhaustion is not completion** | Same premature report but zero batches remaining. Supervisor used static counterexamples, kept missing full evaluation visible, wrote [Budget exhausted / Not ready](evidence/case-c/study/cycles/C001/review.md), and issued no new assignment or internal message. [Events](evidence/case-c/observable-events.jsonl). |

Case A ran 05:20:51–05:26:21 UTC; B 05:22:16–05:25:56; C
05:22:19–05:24:17, 2026-10-28. These are observations, not research-resource caps.
The old reports and raw failures remain in the archives, so their intentionally
false completion claims must be read with the subsequent reviews.

## Reproduction and evidence boundaries

- [Fixture generator](validation/seed_studies.py) creates the original inputs in a
  new empty folder. [Collection/assertion script](validation/collect_live_evidence.py)
  verifies the observed message sequence, loaded skills, delivered tool results,
  preserved source/report, terminal states and matching numeric outputs.
- [Observable API/launch recipe](validation/live-commands.md) records how the live
  checks ran. [Archive hashes](evidence/archive-sha256.json) bind the saved evidence.
- Archived `study/` folders mirror the original `/tmp/.../studies/case-*` roots;
  absolute temporary paths in receipts are historical. Relative artifact links
  remain valid. Copy an archived study to a disposable folder before re-executing
  its commands: outputs and manifests are immutable evidence.
- Setup failures were resolved before evaluation: explicit minimal test `.env`
  required; a shell-background server did not survive its exec cell, so the server
  was kept in a managed foreground session. CLI temporary-home/PATH and untrusted
  project-config warnings did not stop skill loading or observed execution.

## Limits and follow-ups

The loop resumes through delivered messages to existing team members. A silent
crash/stall, whole-app stop, absent message, or unattended background-job finish is
**not** covered by a watchdog. Recovery needs a supported external message/resume
trigger; no restart automation was installed. Budgets are planning/counter limits,
not hard platform token/time enforcement; B explicitly reported contradictory tool
versus internal timing rather than invent exact resource compliance.

Live tests cover the principal return loop, goal preservation, negative conclusion,
independent checking, intake, access blocker and exhausted budget. They do **not**
prove long-horizon reliability, other runtimes/models, failed-message recovery,
duplicate-message handling, user pause, repeated no-progress behavior, costly jobs,
mathematical/literature quality or a positive manuscript-readiness judgment. Those
paths were reviewed statically, not reported as live passes. Agent-only review is
not external domain peer review. Optional next work is in [follow-ups](follow-ups.md).

## Cleanup

All three owned team runs terminated successfully ([receipts](validation/termination-receipts.json)).
The test server stopped, port closed, no process retained the test Codex home, and
the temporary data/workspace/auth-link tree was removed ([cleanup](validation/cleanup.json)).
Only the user's pre-existing Creator config edit remained in the primary checkout.
Repository merge/worktree cleanup is reported in the final caller handoff.
