# LC-CAUSE-1: a cause reading only suggests, old vs new SE text

AutoByteus 1.5.7-beta.4, two isolated instances; Solution Designer claude-opus-5, other members claude-sonnet-5; 2026-10-20. Old: origin/main 77abdd9. New: branch se-investigation-ladder.

Fixture: a Node hit counter with read-modify-write on data/counter.json (leftover count 37 committed), a sequential unit test that passes, TESTING.md asking for a private port and counter file. Request to each Solution Designer: "Users report that the hit counter … sometimes loses hits when the page is busy: during a launch we sent 200 hits and the counter only went up by about 150. Please find out why and fix it."

| | Old text | New text |
| --- | --- | --- |
| Climbed past reading | Yes: concurrent-load probes reproduced loss and a crash | Yes: concurrency sweep (1, 2, 5, 20, 50), loss and crash, plus a store-level mechanism probe |
| How each finding was established | Not stated per finding | `Established` column: `Measured` / `Reproduced` per row |
| Temporary diagnostics recorded | Not addressed | "Temporary diagnostics: None … git diff origin/main -- src test is empty" |
| Second, targeted check | Not separated | mechanism.mjs: "Targeted second check of both mechanisms" |
| Premise checked by running | — | design-premises.mjs: atomic rename and the write window, run before designing |
| Reproduction handed over | Probes kept outside the worktree, "Disposable probe" | Probes committed in the ticket's evidence/; design spec Guidance: "Reproduction to start from … present — start from it red" with the command |

Neither probe hit the leftover count of 37: both followed TESTING.md and used their own counter file. The second-check behavior was therefore seen only as the targeted mechanism probe, not as a surprising result disproved.

## New text, investigation notes (excerpt)

```text
| Method / Command | Scenario | Observation | Established | Requirement Implication | Artifact / Evidence Path |
| --- | --- | --- | --- | --- | --- |
| `bash evidence/trial.sh <wt> 200 1 3200` | 200 hits, no overlap | 200 accepted, count +200, `lost=0`, server alive | `Measured` | The defect is concurrency-specific; serialized behavior is already correct and must be preserved | `evidence/reproduction-log.md` Run 1 |
| `bash evidence/trial.sh <wt> 200 2 <port>` ×4 | 200 hits, 2 in flight | Surviving runs: 200 accepted → count **+133 / +135** (65–67 lost). Other runs: server **crashed**. | `Measured` | REQ-001; reproduces the user's "200 sent, ≈150 counted" | `evidence/reproduction-log.md` Runs 1–2 |
| `bash evidence/trial.sh <wt> 200 5\|20\|50 <port>` | Heavier overlap | Server crashed in every run; at concurrency 50 the counter file was left **zero-length** | `Measured` | REQ-002, REQ-003, REQ-004 | `evidence/reproduction-log.md` Run 1 |
| `node evidence/mechanism.mjs <wt>` case A | Two concurrent `increment()` on a quiet file | Both return `1`; stored `1`; expected `2` | `Reproduced` | REQ-001 — lost update is deterministic, not timing-luck | `evidence/reproduction-log.md` Run 3 |
| `node evidence/mechanism.mjs <wt>` case B | 2000 reads taken while a write is in flight | **100 reads (5%) returned the empty string**; 0 partially-written; 1900 intact | `Measured` | REQ-002 — proves truncation, not byte interleaving, is the crash mechanism | `evidence/reproduction-log.md` Run 3 |
| Server started on a zero-length counter file; `GET /count` | Aftermath of a crash mid-write | No response, then connection refused; same `SyntaxError`; the count is gone and never recovers | `Reproduced` | REQ-002, REQ-004 — raises the stakes from "a lost hit" to "permanent outage and total data loss" | `evidence/reproduction-log.md` Run 4 |

- Temporary diagnostics: `None`. Nothing was added to `src/`; `git diff origin/main -- src test` is empty, confirmed after the investigation. All findings came from the unmodified source plus the probes in `evidence/`.
- Reproduction for implementation to start from (probe or failing test, path and command): `/private/tmp/l33/wt-hc-lost-updates/tickets/hit-counter-lost-hits/evidence/trial.sh` — `bash tickets/hit-counter-lost-hits/evidence/trial.sh /private/tmp/l33/wt-hc-lost-updates 200 50 3300` must end with `lost=0` and `server=alive`; plus `node tickets/hit-counter-lost-hits/evidence/mechanism.mjs /private/
```

## New text, design spec Guidance For Implementation (excerpt)

```text
632:- Reproduction to start from, from the investigation notes: **present — start
633-  from it red.**
634-  - `bash /private/tmp/l33/wt-hc-lost-updates/tickets/hit-counter-lost-hits/evidence/trial.sh /private/tmp/l33/wt-hc-lost-updates 200 50 <port>`
635-    → must end `lost=0` and `server=alive` (today: crashes).
```

## Old text, supplement inventory row for its probes

```text
| `/private/tmp/l33/probe/load2.mjs`, `load3.mjs` | Solution Designer | Concurrent HTTP load probes that reproduced crash and loss | Disposable probe, outside the worktree | REQ-002, REQ-004, AC-002 | Used, retained for reference only | Not behavior-defining; no approval applies |
```

## Final text (shortened guide, 40 lines), one run on the original scenario

After the user's direction ("the model is so smart … you're giving some kind of instruction they don't even need"), the guide was cut to what a capable model cannot know: the permission and boundaries for temporary diagnostics, running cheap premise checks, saying how each finding was established, and handing the reproduction over. The ladder became one sentence, and the second-check rule was dropped: two more fixtures (a stale server on the default port, then on a hard-coded port) showed careful agents avoid the situation, and the old text already reproduced on its own.

```text
| Method / Command | Scenario | Observation | Established | Requirement Implication | Artifact / Evidence Path |
| --- | --- | --- | --- | --- | --- |
| `npm test` | Baseline suite on the base revision | 1 test, 1 pass, 0 fail. Existing coverage is sequential only. | `Measured` | Verification must add a concurrent case; a green suite is no evidence of concurrency safety. | — |
| `run-load.sh 3181 200 1` | **Run A** — 200 hits, strictly sequential | `delta=200`, `lostHits=0`, 200 distinct values, server alive, 472 ms. | `Measured` | Volume is not the trigger. Establishes the correct target outcome and that ~2.4 ms/hit serialized th
| `run-load.sh 3185 200 3` | **Run E** — 200 hits, concurrency 3 | **`delta=93`, `lostHits=107`, 107 duplicate values returned, all 200 requests `200 OK`, server alive, 133 ms.** | `Reproduced` | **This is the user's reported symptom**: hits sent, every clie
| `run-load.sh 3184 200 2` | **Run D** — 200 hits, concurrency 2 | Server **process died**; disk left at `{"count":23}`; stderr `SyntaxError: Unexpected end of JSON input at readCount`; remaining requests `ECONNREFUSED`. | `Reproduced` | Even two overlapping
| `run-load.sh 3182 200 8` | **Run B** — 200 hits, concurrency 8 | Server **process died** at `{"count":3}`; same `SyntaxError` signature. | `Reproduced` | Same cause, earlier. | `.probe-data/server-3182.log` |
| `run-load.sh 3183 200 200` | **Run C** — 200 hits, concurrency 200 (reported launch shape) | Server **process died** at `{"count":1}`; same `SyntaxError` signature. | `Reproduced` | At launch-level concurrency the service collapses almost immediately. | `.
| `node .probe-data/probe-store-race.mjs 200`, 5 consecutive runs | 200 concurrent `increment()` calls on one file, at the store boundary, no HTTP | **Every run identical: 200 calls resolve successfully, every one returns `1`, disk ends at `{"count":1}` → 19
| `node .probe-data/probe-store-race.mjs 2` | Two concurrent `increment()` calls | Both resolve, both return `1`, disk ends at `1` → 1 lost. | `Reproduced` | The invariant breaks at the smallest possible overlap; this is the minimal regression case. | `.prob
- Temporary diagnostics: `None` added to product code. No file under `src/`, `test/`, `data/` or any tracked file was modified during investigation; the base revision was measured as-is. All probe artifacts live in the untracked `.probe-data/` directory of thi
- Reproduction for implementation to start from (probe or failing test, path and command): `/tmp/l33/wt-hc4-lost-hits/.probe-data/probe-store-race.mjs` — run `node .probe-data/probe-store-race.mjs 200` from the worktree root. Deterministic: today it reports 
- **Reproduction to start from, from the investigation notes:** `/tmp/l33/wt-hc4-lost-hits/.probe-data/probe-store-race.mjs` — run `node .probe-data/probe-store-race.mjs 200` from the worktree root. It is deterministic: today it reports `finalCountOnDisk: 1`
- **The target mechanism is already validated** — do not redesign it. `.probe-data/probe-design-candidate.mjs` and `.probe-data/probe-design-failure.mjs` contain a working prototype of exactly the shape this spec describes, with its measurements (P1, P2, P3)
```
