# Investigation Notes

## Investigation boundary

The existing `agent-teams/kids-coloring-story-team` is the reference package. This
investigation covers its team contract, four member boundaries, shared production rules,
handoff gates, and reusable artifact patterns. It does not alter that team or carry over
its coloring-only project outputs.

## Sources consulted

- `agent-teams/kids-coloring-story-team/team.md`
- `agent-teams/kids-coloring-story-team/team-config.json`
- `agent-teams/kids-coloring-story-team/shared/coloring-production-principles.md`
- `agent-teams/kids-coloring-story-team/agents/story-activity-designer/agent.md`
- `agent-teams/kids-coloring-story-team/agents/story-activity-designer/skills/story-activity-designer/SKILL.md`
- `agent-teams/kids-coloring-story-team/agents/coloring-page-illustrator/agent.md`
- `agent-teams/kids-coloring-story-team/agents/coloring-page-illustrator/skills/coloring-page-illustrator/SKILL.md`
- `agent-teams/kids-coloring-story-team/agents/child-experience-reviewer/agent.md`
- `agent-teams/kids-coloring-story-team/agents/child-experience-reviewer/skills/child-experience-reviewer/SKILL.md`
- `agent-teams/kids-coloring-story-team/agents/printable-pack-producer/agent.md`
- `agent-teams/kids-coloring-story-team/agents/printable-pack-producer/skills/printable-pack-producer/SKILL.md`
- `AGENTS.md`

## Existing entrypoints and ownership

The coloring team is coordinated by `story_activity_designer`, followed by
`coloring_page_illustrator`, `child_experience_reviewer`, and
`printable_pack_producer`. It uses explicit upstream approval, recurring-character
references, page-level visual indexes and generation logs, actual-image review, and
approved-manifest-only packaging.

The new team can preserve that four-boundary shape while changing each role's product
contract:

| Existing boundary | Picture-book boundary |
| --- | --- |
| Story/activity planning | Picture-book author/editor: age, reading level, story arc, page-turn rhythm, exact page text, and approval |
| Coloring-page illustration | Picture-book illustrator: full-color style, recurring-character references, page art, and text-safe composition |
| Child-experience review | Picture-book reviewer: story-image match, continuity, readability, typography, text fidelity, and child safety |
| Printable pack production | Book production editor: ordered digital/print pages, cover/end matter when approved, export QA, and delivery report |

## Key constraints and design implications

- This is a separate team, not a renamed or modified coloring team.
- The normal story length should be above 20 illustrated pages for a strong reading
  experience. The brief may choose another count when the story, age, or format justifies
  it, but it must record the rationale.
- Every story image is a full page in the approved book format. Text is part of the image
  surface and must be exact, legible, language-correct, and safely placed inside the
  artwork. Layout must not silently add or rewrite captions.
- Coloring-specific concepts must not survive into the new contract: black-and-white
  line art, coloring usability, paired colored references, coloring prompts, and separate
  colored-reference packages.
- Recurring characters still need approved references and page-by-page continuity checks.
- Independent visual review must happen before final assembly, and packaging must use
  only reviewer-approved page assets.
- A digital-first reading experience should be supported, with optional print/booklet
  export when approved. The team should not require A4 coloring pages.
- Source text and translations need the same exact-wording discipline as the reference
  team, but the normal output is a prose picture book rather than isolated captions.

## Likely affected area

Add a new top-level directory:

`agent-teams/kids-picture-story-team/`

It should contain `team.md`, `team-config.json`, `shared/picture-book-production-principles.md`,
four local member directories with `agent.md`, `agent-config.json`, and `SKILL.md`, and
role-specific templates for the durable brief, storyboard, visual asset index, review
report, and book production report.

The repository `README.md` should gain a short standalone section describing the new team
without changing the existing coloring-team description.

## Validation approach

Validation can be static and structural: confirm all referenced files exist, symlinked
shared references resolve, JSON configs parse, member refs match the team config, no
coloring-only terms remain in the new team contract/skills, and the new team is present in
the README. No image generation or book export is required for adding the team definition.
