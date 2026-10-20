# LC-SR-1: fresh Agent Package Creator (rounds 1-2 text) runs a full small update in a scratch repository
# AutoByteus 1.5.6 isolated instance, claude_agent_sdk, claude-opus-5, 2026-10-20
## prompt
Please update the greeting-writer skill in the repository at /tmp/csr2-live/repo: every greeting must address the customer by name, and when the name is unknown it must say "Hello there". You may commit on a new branch; there is no remote.
## reply
Done. `greeting-writer` now requires every greeting to address the customer by name, with "Hello there" when the name is unknown.

**The change** (`skills/greeting-writer/SKILL.md`, 3 lines):

```markdown
1. Read the request: the occasion and the customer, including their name.
2. Write two or three friendly sentences for the occasion, opening with the customer's
   name, as in "Hi Dana,". When the request gives no name, open with "Hello there".
3. Save it as `greeting.md` in the folder the request names.
```

Before editing, I read the whole package (one `SKILL.md`) plus `AGENTS.md` and traced where the customer's name travels: step 1 read "the customer", step 2 composed the text without ever using it, step 3 saved the file — the name was collected and dropped. So the rule belongs in step 2, the step that writes the words, with the unknown-name case as its exception right beside it, and step 1 now names the name as an input. I deliberately did **not** restate the rule in the frontmatter `description` (it owns selection, not procedure) and added no reference, template, or required field: a second copy drifts, and this delta owns no distinct instructions.

**Checks:** link checker clean (0 broken); folder and frontmatter `name` still aligned; `"Hello there"` appears in exactly one place; diff confined to steps 1–2 (+3/−2). No Agent, Team, or Org exists here, so there was no binding or route to reconcile, and no skill validator was installed. Real use is a **desk run only** — I applied the final text to two scenarios: a named customer produced "Hi Dana, thank you for renewing…", a nameless request produced "Hello there, and welcome!…", both saved as `greeting.md`. The isolated-app run the skill prefers wasn't possible (no agent package, no app available), which the result records as a limitation.

**Delivered** as one commit, `5be1874`, on the new branch `skill/greeting-writer-address-by-name`; nothing pushed (no remote). Work notes committed alongside, per `AGENTS.md`:
- `/private/tmp/csr2-live/repo/tickets/in-progress/greeting-writer-address-by-name/agent-package-analysis.md`
- `/private/tmp/csr2-live/repo/tickets/in-progress/greeting-writer-address-by-name/agent-package-result.md`

`get_handoff_rules` returned no rules, so this returns to you. Two judgment calls worth your eye: "address by name" is implemented as the greeting's opening only (the name isn't required again later), and the example opens with "Hi" while the fallback is fixed at "Hello there" as you specified, so the two cases differ slightly in tone. Say the word if you want either tightened.## repository after the run
5be1874 feat(greeting-writer): address the customer by name
04e2d7c init
 skills/greeting-writer/SKILL.md                    |  5 +-
 .../agent-package-analysis.md                      | 72 +++++++++++++++++
 .../agent-package-result.md                        | 90 ++++++++++++++++++++++
 3 files changed, 165 insertions(+), 2 deletions(-)
