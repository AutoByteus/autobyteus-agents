# Validation — goal-directed research correction

**Outcome: Pass on final runtime text.** Package source hashes in all corrected
captures match the delivered files. No package behavior was edited after the live
evaluation began.

The live evaluation uses an isolated installed AutoByteus server (server package
version `0.1.1`), `codex_app_server`, `gpt-6-astra`, reasoning `max`, on 2026-10-28.
It does not test or change the real study. The reproducible inputs and invocation
are in [the live recipe](validation/live-commands.md). Six/nine earlier returns
are **seeded history**, not claims of six/nine live experiments.

## Baseline and protected stops

- **Old text, six returns:** the supervisor inspected the supplied data and found
  the full 12-row evaluation still missing. It nevertheless returned **Budget
  exhausted**, explicitly distinguishing the six-return planning limit from
  compute/access exhaustion. It issued no assignment and proposed one more return,
  a replacement ceiling of seven, requiring caller authorization. This reproduces
  the policy failure; it is not evidence of a genuine resource blocker. See
  [old review](evidence/upgrade-before/study/cycles/C006/review.md).
- **Explicit pause with nine returns / three no-progress returns:** the supervisor
  saved **Paused**, retained unmet requirements and historical counts, and did not
  execute the evaluator or dispatch a researcher. It inspected/checksummed files
  only; these are not experiments. The reason was the user's pause, not a count.
  See [pause review](evidence/paused/study/cycles/C009/review.md).
- **Real missing-data blocker:** read-only access produced `FileNotFoundError` for
  the sole authorized cohort CSV. The supervisor saved **Blocked**, computed no
  mean and named the caller's supply-file-and-resume action. Its intake assignment
  was retained but superseded before dispatch; no researcher report or independent
  statistical review was invented. Readiness was **Not assessed**. See
  [blocker review](evidence/blocked/study/cycles/C001/review.md) and its raw access
  output, not a missing-file assumption inferred from a counter.

## Existing-run refresh: what actually changed

The old supervisor run and its team/member IDs were retained. After the baseline
turn became idle, final team files replaced the old files at the same isolated
package path and `reloadAgentPackageDefinitions` succeeded with no load issues.
The [new catalog](evidence/catalog-after.json) returned the goal/resource-based
route. However, the [existing execution tree](evidence/upgrade-after-reload-tree.json)
and its next `get_handoff_rules` result **still carried “remaining budget.”**
Reload did not rewrite that runtime snapshot.

One supported message supplied the user's changed authority and requested resumption
of the same study. The platform emitted a skill-update notice naming `SKILL.md`
and the linked `research-contract.md`. The supervisor reread them, recorded P001
without rewriting C001–C006, created C007 rather than resetting the sequence, and
successfully delivered it to the same allocated researcher run. No count allowance
or second approval was requested. Actual available resources satisfied the older
worded route; it did not enforce a numeric counter in platform code.

Source inspection agrees with the observation: installed `TeamRunContext` and
`TeamRunConfig` freeze the handoffs; the execution-tree builder persists/restores
the saved tree handoffs; `GetHandoffRulesService` returns the collaboration's
outgoing snapshot rather than rereading the catalog. No runtime storage or app
implementation was patched to force this result.

### Guidance for the caller's existing team

1. The package source must be updated in the user's checkout. Reload/refresh package
   definitions for a stale catalog or new launches; do **not** claim that reload
   rewrites an existing team's rules.
2. Send the existing supervisor a supported continuation message with the approved
   removal decision and corrected supervisor skill/shared-contract paths. Require
   it to reread them, inspect current study/evidence and preserve the original goal,
   all prior cycles and dated assessments. No duplicate delegation, new study,
   counter reset or numbered extension is needed.
3. The next assignment should carry that policy change to the existing researcher
   and have it reread its corrected skill/contract. Old “remaining budget” wording
   refers to genuine resources under the updated authority, not a resurrected
   return allowance. Fetch the actual runtime recipients; don't substitute the
   isolated test's addresses/run IDs for the caller's team.
4. Continue useful authorized work; real dependencies, user stops and platform
   limits still require honest checkpoints/escalation. No publication, paid/cloud
   job, external contact, scheduler or crash-restart authority was added.

The supervisor's in-place refresh was exercised. The same allocated researcher ID
was reused, but its first live turn in this fixture occurred **after** the update;
this is not a claim that a previously active old researcher context was separately
hot-reloaded in production. Explicit rereading in the next assignment covers that
uncertainty without spawning a replacement team.

## Continued work and independently supported completion

| Case | Observed continuation | Actual result and review |
| --- | --- | --- |
| Same old stopped team | C007 delivered after six historical returns; exactly one policy-change/resume message, then the normal researcher return | All 12 rows evaluated; supervisor separately recomputed all predictions and reran the evaluator. **Complete / Not ready** for the original finite goal, not for publication. [Final review](evidence/upgrade-after/study/cycles/C007/review.md). |
| Nine returns / three no-progress returns | Supervisor diagnosed repeated smoke/default-split work and delivered changed C010 coverage requirements, without asking for an extension | Researcher performed the missing evaluation; supervisor independently checked all 12 rows/24 predictions, failures and family comparisons. **Complete / Not ready**. [Gap/method review](evidence/stalled/study/cycles/C009/review.md), [final review](evidence/stalled/study/cycles/C010/review.md). |

In both cases the synthetic Candidate scored **7/12**, baseline **8/12**. The
supervisors accepted the evidence-backed rejection of perfection/superiority,
retained a Candidate-only winning case and tied families, and did not claim
statistical significance, unseen-data validity or publishability. The supplied
finite investigation was fulfilled; missing literature/novelty/manuscript work
kept readiness **Not ready**, not an endless demand for a favorable hypothesis.

Each continuation case has two delivered internal messages: supervisor assignment,
researcher result. The final review returned to the caller rather than dispatching
another assignment. There were no additional caller reminders, duplicate members
or delegations. All historical cycle/source/raw/check files from the old snapshot
are byte-preserved and its evidence ledger remains a prefix of the final ledger.
The seeded nine-cycle histories likewise remain unchanged.

## Automated checks and final review

- `validation/static-checks.log`: all 11 package entries, JSON/frontmatter,
  attachments, coordinator, unique rooted handoffs, symlinks and unfinished-marker
  checks pass. Both standard skill validators and package/reference link checks pass.
- `validation/evidence-checks.log`: archived hashes match, corrected source matches
  every corrected live snapshot, stable team/member IDs persist, old historical
  evidence is unchanged, new raw evaluations and supervisory reruns agree with the
  independently computed fixture answer, and no delegates/terminal dispatches occur.
- The lexical source regression test removes the old gates and checks retained
  safeguards; it is not a semantic proof about every future model response.
- Both full terminal reviews and their actual raw/check artifacts were read, not
  judged from the word Complete alone. A final source/diff review against ownership,
  flow, grounding, clarity and applicable anti-patterns found no unresolved in-scope
  issue. Other count-stop candidates are all listed in [follow-ups](follow-ups.md).
- Final staged whitespace, navigational-link and replay checks are recorded in
  `validation/final-checks.log`; shared imported member dependencies and Org checks
  are N/A (the existing team is entirely local; no topology change).

Two harness details are recorded rather than hidden. The first archive verifier
compared whole member objects and failed because lazy first activation fills the
researcher's previously null `platformAgentRunId`. The assertion was corrected to
compare stable address, definition, agent run ID and launch configuration; the same
member was not replaced. No package text changed. Also, the 30-minute **observer**
window expired near the end of the final turns. It did not stop or message any
agent. A subsequent platform query found both complete and idle; final checkpoints,
files and tool receipts—not that timed-out observer—establish the result.

The broad archive link scan reports five relative links inside the byte-preserved
copy `evidence/stalled/study/checks/C010/verification-01/intake-study.md`. That is a
snapshot of study-root `study.md`, not a newly authored document at that nested
location. All five targets exist relative to its original study root. Its bytes
and hashes were not rewritten to disguise relocation; current documents and all
other Markdown links pass. Runtime absolute paths in receipts are historical
provenance: map `$R/studies/<case>/...` to the corresponding `evidence/<case>/study/`
folder (`upgrade` has separate before/after captures) after temporary cleanup.

## Cleanup

All four owned test teams returned successful termination receipts after their
work was idle. The owned server stopped, port 56219 closed, no process retained
the isolated CODEX_HOME, and the temporary root/auth symlink were removed without
touching the sign-in target, production app or real study. See
`validation/final-checkpoints.json`, `validation/termination-receipts.json` and
`validation/cleanup.json`. Git delivery/local-settings preservation receipts are
reported with the final caller handoff after merge.

## Review scope and limitations

The two roles are different model runs, not external peer review. Same-input reruns
test reproducibility, not independent populations or generalization. This small
deterministic fixture can show counter-policy removal and evidence discipline; it
cannot prove indefinite runtime reliability or future scientific success. Real
token/cost depletion, a silent crash, scheduler wakeup and external publication were
not exercised. Existing experiment timeouts and prohibitions were inspected and
honored; no new infrastructure was provisioned.

The isolated runtime warned that temporary-home helper aliases and untrusted
workspace config/hooks were unavailable; attached skills still loaded and the
observed built-in file/process tools ran. These warnings are not hidden as an
assertion of a warning-free deployment.

Historical creation-test raw data/scripts remain unchanged. Their narrative/replay
entry points are marked superseded; their counter-stop Case C is an **old baseline**,
not the current acceptance criterion. The current fixture reuses only their toy
input generation, then replaces their study policy/history.

The requirement-word comparison in `validation/wording-comparison.txt` was read
manually. All four nonverbatim matches are intentional: remove the default count/
cumulative batch allowance; retain no-reset as explicit “do not reset the history”;
replace artificial Budget exhausted with the existing genuine blocker/decision
path; and let new user authority supersede a saved stop while retaining duplicate
handoff protection. Scientific evidence, original-scope, independent review,
permission and publication requirements were not softened.
