# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `agent` (Agent Package Creator and its bundled skill), plus two one-line restorations the new check found
- Update intent: `extend`: a restructure keeps every requirement as strong as it was
- Target package: `agents/agent-package-creator` (worktree `/tmp/ccw`, branch `creator-compare-wording`, from `origin/main` at `d4b3d18`)
- Scope included: `SKILL.md` step 4, `package-design-principles.md` §9, `package-anti-patterns.md` (new entry 26), new `scripts/compare-wording.py`; the instances found by the new detection check: `agent-teams/software-engineering-team/shared/design-principles.md` (one "should"), `agent-teams/kids-picture-story-team/agents/book-production-editor/agent.md` ("relocate")
- Scope excluded: `agent.md`, `agent-config.json`, the other references and templates
- Request/reference: the user, 2026-10-20, after #84 to #86: "we don't lose information … if they're talking about actually different thing and you remove certain stuff … we have to be cautious"; "You also found a problem for your own skill … If you think your own skill can be improved, go ahead."

## Analysis (short; files read in full this conversation)

| # | Finding | Owner | Change |
| --- | --- | --- | --- |
| 1 | Step 4's old-to-new map checks that every section and name has a new home, not that the moved text still requires the same thing. #84 passed that map but softened eleven requirements ("should be derived" → "is derived", "justify it explicitly" → "record why", "must follow ownership" lost in a merge). Found only after the user asked: four by reading line by line (#85), seven by counting requirement words (#86). | `SKILL.md` step 4 | Compare each reworded or merged statement with its original: requirement words, qualifiers, named cases; merge only statements that said the same thing |
| 2 | §9 says how to run a restructure but not that it must keep requirement strength | principles §9 | "keep every requirement as strong as it was" |
| 3 | No entry names this mistake, so no detection check runs | anti-patterns | Entry 26, "Softening requirements while restructuring" |
| 4 | Counting by hand (#86) was slow and easy to skip; the comparison is mechanical, the judgement is not | scripts | `compare-wording.py --old … --new …`: requirement-word counts, then every old sentence with a requirement word that is no longer verbatim, beside its closest new sentence, those whose match lacks the word first. The output is a reading list, not a verdict. |

## Detection check across the repository (anti-pattern 26)

`compare-wording.py` on each restructure merged in this session (old files at the merge's first parent, new files at the merge):

| PR | Sentences listed (lacking a requirement word) | Real losses after reading each beside its new home |
| --- | --- | --- |
| #84 vs #85 state | 48 (19) | The seven #86 restored, all flagged first; on today's `main`, 12 remain listed, all merged or moved, except one design question that lost "should" (restored here) |
| #70 creator | 5 (3) | None: "stop", "never invent a recipient" live in `agent.md` and the contract |
| #76 SE | 5 (3) | None: scope and follow-up rules live in `ticket-scope.md` |
| #77 SE handoff | 53 (30) | None: routing, no-poll, stop, revision records, "never infer a prior result" all present in `handoff.md` or the role skills |
| #78, #79 SE | 10 (7), 10 (6) | None: "on every route" lives in `handoff.md`'s table and the templates; the delivery verification block is in its skill |
| #82 Product | 37 (18) | None: parity, same starting state, each inventory item, input gap all present. "Do not poll" became "and stops" in `team.md`; judged equivalent |
| #83 Kids | 19 (9) | One: "layout must not silently add, rewrite, or relocate [text]" became "never add or rewrite"; "relocate" restored |

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Links | Pass | `check-links.py` on the creator and the SE team: 0 broken, 0 unnamed |
| Script | Pass | On the pre-#86 guide it lists all seven softened sentences in its first group with `LACKS`; hard-wrapped Markdown is joined into paragraphs first (the Kids and SE skills wrap at 80–90 columns); ~7 s for a 500-line guide |
| Live check | Pass | `evidence/LC-RS-1-old-vs-new.md`. The same neutral request ("several rules appear in more than one section … restructure so each rule has one home … without changing what the writer does") went to an old-text and a new-text creator, each in its own isolated instance and fixture copy. The old text turned "Every statistic **must** cite a primary source" into "Every statistic cites…" and dropped "always" from "the client's guide always wins", the #84 pattern. The new text kept both, ran `compare-wording.py` four times, recorded "each rule is stated once, at the strength of its strongest previous copy", and in its own review removed a `must` it had added that the original lacked. |
| Final review | Pass | Read the diff against the skill-authoring principles and anti-patterns 4, 7, 24, 25: the check sits once in step 4, §9 states the principle, entry 26 points to both; the script is a reading aid, and the step leaves the judgement to the reader |

## Limitations

- `compare-wording.py` knows a fixed list of English requirement words; it does not see a softened adjective ("complete" → "relevant") or a dropped named case. Step 4 still asks for those by reading.
- One live scenario, one model.
