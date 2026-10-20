# LC-MERGE-1: next step after a passed evaluation, old vs new text

AutoByteus 1.5.7-beta.4, two isolated instances; claude-opus-5; 2026-10-20. Old: origin/main 4e9eee0. New: branch creator-merge-after-evaluation.

Question (both):

```text
Status check on the update you were asked to make: the Kids Picture Story Team's book production editor should never relocate story text in layout. Here is where it stands:

- The change is on branch `kids-relocate-rule` in the `autobyteus-agents` repository, and pull request #123 is open on GitHub, not merged.
- Validation: links 0 broken; the wording comparison shows no requirement weakened; a live check in an isolated AutoByteus instance ran the old and the new text on the same layout request. The old text moved a caption to fit the page; the new text kept it in place and routed the fit problem to the illustrator, as intended.
- The user has local uncommitted edits in their checkout of the repository.

What is your next step? Describe what you would do and why, in a few sentences. Read your skill files as you normally would, but do not run git, gh, or any command that changes anything; just answer.
```

A first round told the copies not to run any tools; neither opened its skill, so both answered from general caution (not merging). The question was corrected to allow reading the skill.

## old text

```text
**Next step: stop and hand the result back — not merge.** The validation is complete (links clean, no requirement weakened, and a live run on the final text showing the new wording holds the caption in place and routes the fit problem to the illustrator), so the change is done at my boundary. But PR #123 being open and green is not permission to land it: my skill is explicit that I don't commit, push, publish, or deploy without explicit authorization, so merging is the user's call, and the result records `approval_state: pending` with `next_action: review and approve the merge of PR #123`.

Concretely, I would make sure the result file is persisted with the observed validation evidence (including that the live check ran old vs. new text on the same layout request in an isolated instance), then call `get_handoff_rules` and send that absolute path plus the outcome and next action to every matching recipient, and stop there.

The one thing I'd flag to the user up front: their checkout has uncommitted edits. If and when they approve the merge, bringing the checkout up to date is required — installed skills run from it, and running agents only learn about the new rule through the skill-update notice — so I would first preserve their local work on a named branch and as a patch, then update, re-apply, and tell them where it is; if the re-apply conflicts on lines the merge touched, I'd keep the merged text and redo their edit by hand. Nothing of theirs gets discarded, and none of that happens before they say to merge.
```

## new text

```text
**Next step: merge PR #123 myself — I would not ask you to approve it.** The validation the change needed has all been run and came back clean (links, wording comparison showing no requirement weakened, and a live run in an isolated instance where the new text held the caption in place and routed the fit problem to the illustrator while the old text relocated it). Under my skill's delivery rule, that evidence *is* the approval; I'd only pause to ask if the live check hadn't run, had been inconclusive, had looked worse, or if you'd said you wanted to review this one.

**Then, immediately after merging, I'd update your local checkout** — installed skills run from it, and running agents only see the change through the skill-update notice that the local update triggers. Because you have uncommitted edits, I would not touch them casually: first preserve them on a named branch *and* as a patch file, then pull, then re-apply, and tell you exactly where both copies live. If the re-apply conflicts on lines the merge changed, I'd keep the merged text and redo your edit by hand, with the branch and patch still holding your original. Nothing of yours gets discarded.

**Finally, I'd finish the `update` result file** (linking its analysis, with the merge, validation evidence, and the location of your preserved local work recorded), then call `get_handoff_rules` and send the result to every matching recipient — or return it to you if none matches.
```
