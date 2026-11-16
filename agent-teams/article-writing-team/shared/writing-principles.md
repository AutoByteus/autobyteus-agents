# Writing Principles

The team's quality standard for every article. The writer builds an article by it and the reviewer judges by it, in the same order. Two files add to it: [explanatory-writing.md](explanatory-writing.md) for how an explanatory article is built, and [figures-and-page.md](figures-and-page.md) for figures. The skills say who does what and when; the rules live in these files. Every statement below is a requirement: "each section does one job" means each section must.

## The Foundation: Build Understanding, Then Write It

An article has two layers. The bottom layer is the understanding the reader builds: the concepts, how they relate, and the road from what the reader already holds to the point, each new idea placed on ideas they already have. The top layer is the writing (mode, sections, paragraphs, sentences, style), and it reflects the bottom layer: plan the road in the outline first, then write it. Writing cannot repair a broken road. A reader who meets several words they cannot place skips the paragraph, even when each word is defined.

- **Start from what the reader has.** The brief records the concepts the reader already brings.
- **A concept comes after what it rests on.** A product, a component, a coined term or what a number means appears only once the concepts it rests on are in place, in words the reader has or the article has already given.
- **One or two new concepts per paragraph.** A paragraph with more is split, or its extra concepts move later. A list or table that pairs each new name with something the reader already holds places each one.
- **The opening depends on the reader.** A summary opens the article only when the reader can place every word in it: an expert reader, or a summary written in familiar words. Otherwise the opening gives the question and the route, and the answer comes where its concepts exist.

Example: an article on a self-improving agent platform starts from how a person learns by doing, draws the concepts from it (three kinds of memory, a second eye, a record of what went wrong), maps them to engineering, and only then names the product; "an observer" then means the second eye the reader already knows is needed. Anti-examples: that article's first draft followed the human steps with a paragraph naming the product, an observer, a manager agent, a Task and their status, five words the reader could not yet place; and an article about retries that opens with "our idempotency-key middleware" before saying what goes wrong when a request is sent twice.

An article is built like software:
- **The spine:** the line of ideas the reader follows.
- **One home per idea:** each idea stated once, where it belongs.
- **The test:** reading it as the reader would.
- **Work from large to small:** the point, then the section chain, then the paragraphs, then the sentences. A larger unit that is wrong cannot be fixed by polishing a smaller one.

## 1. Grounding: Style Never Creates Facts

- Every claim, opponent, common belief, observation, causal explanation, production experience and source context in the article comes from the understanding package (section 2) or from the user, including the small links between claims: that two things are the same, that one caused the other, who did something. Style may shape voice, rhythm, order, emphasis, title and rhetorical pressure; it never adds facts. This holds in every mode, in conversions and in polish passes.
- Credit each outside source only with what it says. A model the article builds from several sources is the article's own, and says so.
- When the article describes parts that run and parts only designed or planned, the reader can tell which is which at every mention, in the companion pieces too: a planned part is never written in plain present tense.
- A contrast such as `not X, but Y`, `the common explanation is`, `the deeper problem is` or `X should start with Y` is allowed only when the `X` side is grounded in a source, a supplied note, an inspected code path, an observed workflow, a prior implementation, or an explicit user claim. If it is not, remove the contrast and write the supported claim directly.
- A `should` recommendation, a root-cause claim and a production observation (`we observed`, `we found`, `this worked`) need the same anchor. Do not frame the article as a debate or recommendation the user did not ask for.
- When style guidance conflicts with the source basis, the source basis wins. When the user gives a more exact mechanism, it replaces the earlier generic explanation at once.

## 2. Understanding Before Writing

- An article that depends on facts, systems, documents, code, papers, current events or supplied material is written from an explicit understanding package, named by its investigation modes:
  - `supplied-source`: files, notes, links, transcripts, screenshots or articles the user supplied;
  - `workspace-source`: project files, code, docs, tests, logs, examples or existing artifacts;
  - `online-research`: the web, documentation, public repositories, announcements, standards;
  - `paper-document`: papers, PDFs, reports, manuals, specifications, long documents;
  - `experiential-builder`: the user's firsthand sequence, observations, decisions and runtime behavior.
- Use the smallest set that honestly supports the article: do not over-research a style rewrite, and do not under-research technical, factual or current-world claims.
- Mechanism claims about code or a workspace rest on concrete paths, commands, observed behavior or artifacts. So do claims about what a product has today (built, not built, in use, released): the ledger names who opened which primary source. A teammate's or the requester's statement that names no source says where to look; it is not the check. A claim no one on the team could check is written as unverified or left out. Current-world claims carry source dates and uncertainty. Claims about a paper or document come from reading it, not from its title or abstract; when the full text cannot be opened, the source index says so and the claim stays within what was read.
- If understanding is weak, narrow the claims or investigate more before polishing prose. Going back to investigate at any stage is normal; record what was added.

## 3. Mode And Ownership

Choose the mode by the kind of article, never by whose material it is:

| Mode | Use when | How it reads |
| --- | --- | --- |
| `technical-blog` | **The default for any technical topic**, including the author's own product, workflow or experience. | An engineer explaining how something works and what they learned. It opens as the foundation says (the point, or the question and the route), gives a short map, and follows one logic spine ([explanatory writing](explanatory-writing.md), section 2); each part shows how its mechanism works, with a real example or number. It speaks to the reader about their problem (`you`) and names what they already do in words they already use. Low rhetoric. |
| `essay` | Only when the user asks for an argument, opinion or strategic viewpoint. | The thesis in the first paragraph; a grounded contrast may open; medium to high rhetorical pressure. |
| `paper-report` | Only when the user asks for a formal, report-like or scientific document. | Scope, method, observations, limitations and bounded conclusions, in that order. |

- A story told in time order (we used, then it broke, then we changed) is not a mode. Use time order only when the topic itself is a history or a postmortem the user asked for; otherwise the history appears inside a concept section as evidence.
- Naming an author profile does not change the mode or authorize rhetoric (section 4).
- When the article is about the author's own product, workflow or runtime, the author's facts are written in first person (`we built`, `we measured`, `I review`), as evidence. Do not turn them into detached analyst prose, unless the user asks for it.

## 4. Style And Platform

- Use an author's voice profile only when the user asks for that voice. Do not adopt a voice from what the workspace contains, such as a social-media voice guide or earlier posts, unless the user asks for it.
- A requested profile shapes word choice, rhythm, tone and examples, inside the chosen mode (section 3) and within the source basis (section 1). It never changes the mode or the structure, and never distorts the reasoning.
- If the profile is bootstrapping or weakly evidenced, keep structure and truth before attempting imitation. If it has variants, choose one and stay in it.
- Platform fit shapes title, pacing and formatting, never the argument. The packaging rules are in [platform-output-rules.md](platform-output-rules.md) and [formats.md](formats.md).

## 5. Bilingual Fidelity (Only For Bilingual Or Conversion Work)

- Do not lose claims and do not add claims. Keep section intent, argument order and terminology stable.
- Rewrite natively in the target language instead of translating line by line.

## 6. Priorities And User Corrections

One order for writing, revising and reviewing. Fix the highest failing level first; a lower one never compensates for a higher one:

1. Factual and mechanism accuracy, including the user's corrections.
2. Understanding and source support: load-bearing claims checked against the primary source, not only the writer's notes.
3. The point, the mode and opening, and the ownership stance.
4. The concept road (the foundation), the section chain and reader continuity.
5. Paragraph jobs and bridges.
6. Evidence weight, and visual usefulness and factuality.
7. Style fit.
8. Bilingual fidelity and platform fit.
9. Sentence polish.

The user's feedback is a hard constraint on the next pass, carried until the article passes, and a revision is complete only when the failure is removed, not softened:

| User cue | Response |
| --- | --- |
| `too salesy`, `too much Medium tone`, `too much rhetoric`, `reads like a novel`, `like literature` | Move to `technical-blog` (or `paper-report` if asked); remove contrastive hooks, emphasis lines, rhetorical questions and story bridges. |
| `be direct`, `start from what we used`, `write from our product perspective` | Open on the system as it is and what it does; the author's facts in first person. |
| `too detached`, `sounds like someone else built it` | Restore builder ownership language throughout. |
| `too repetitive`, `don't repeat again and again` | Remove repeated restatements, duplicate summaries and second comparison tables. |
| `too indirect`, `too much like an article about the article` | Open on the subject itself; remove meta-commentary. |
| `more factual`, `scientific`, `paper-like` | Lead with scope, mechanism and observation, not thesis compression. |
| `not accurate`, with new detail | Replace the generic explanation with the user's mechanism. |
| `this feels vague` | Replace blurred nouns with the exact components ([explanatory writing](explanatory-writing.md), section 3). |
| `too many details`, `readers can't understand this` | Move the proof trail (IDs, versions, file names, counts, internal quotes) out of the prose into the package (explanatory writing, section 3). |

When several cues apply, follow the order above.
