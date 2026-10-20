# LC-RL-2 test package (the blog team given to both runs)

Stored as one file so that no copied `agent.md` or config is loaded as a definition. Both `references/style-guide.md` files were symlinks to `shared/style-guide.md`.

## `AGENTS.md`

````markdown
# Blog agents

Agent and team definitions for the company blog. Work notes go in `tickets/in-progress/<name>/`.
````

## `agent-teams/blog-team/team-config.json`

````json
{
  "members": [
    {
      "memberName": "writer",
      "ref": "writer",
      "refType": "agent",
      "refScope": "team_local"
    },
    {
      "memberName": "editor",
      "ref": "editor",
      "refType": "agent",
      "refScope": "team_local"
    }
  ],
  "coordinatorMemberName": "writer",
  "handoffs": [
    {
      "from": "/writer",
      "to": "/editor",
      "when": [
        "A draft is ready for review."
      ]
    },
    {
      "from": "/editor",
      "to": "/writer",
      "when": [
        "The draft needs changes."
      ]
    }
  ],
  "avatarUrl": null,
  "defaultLaunchConfig": null
}
````

## `agent-teams/blog-team/team.md`

````markdown
---
name: Blog Team
description: Writes and edits blog posts for the company blog.
category: content
---

The writer drafts a post from the request; the editor reviews it and publishes it.
````

## `agent-teams/blog-team/agents/editor/agent-config.json`

````json
{
  "toolNames": [
    "read_file",
    "write_file",
    "edit_file",
    "get_handoff_rules",
    "send_message_to"
  ],
  "skillNames": [
    "blog-editing"
  ]
}
````

## `agent-teams/blog-team/agents/editor/agent.md`

````markdown
---
name: Editor
description: Reviews and publishes blog posts.
category: content
role: editor
---

You are the Editor. Follow `blog-editing`.

After your work, call `get_handoff_rules`, send your result to each returned `recipient_address` with `send_message_to`, and stop.
````

## `agent-teams/blog-team/agents/editor/skills/blog-editing/SKILL.md`

````markdown
---
name: blog-editing
description: Review a blog draft against the style guide, return it with changes or publish it.
---

# Blog Editing

1. Read the draft, the writer's notes and the [style guide](references/style-guide.md).
2. Check the draft against the Voice, Headings and Images sections.
3. If it needs changes, return it as the style guide's "Returning a draft to the writer" describes.
4. Otherwise publish it with the style guide's "Publishing checklist".
````

## `agent-teams/blog-team/agents/writer/agent-config.json`

````json
{
  "toolNames": [
    "read_file",
    "write_file",
    "edit_file",
    "get_handoff_rules",
    "send_message_to"
  ],
  "skillNames": [
    "blog-writing"
  ]
}
````

## `agent-teams/blog-team/agents/writer/agent.md`

````markdown
---
name: Writer
description: Drafts blog posts.
category: content
role: writer
---

You are the Writer. Follow `blog-writing`.

After your work, call `get_handoff_rules`, send your result to each returned `recipient_address` with `send_message_to`, and stop.
````

## `agent-teams/blog-team/agents/writer/skills/blog-writing/SKILL.md`

````markdown
---
name: blog-writing
description: Draft a blog post from a request, following the team style guide, and hand it to the editor.
---

# Blog Writing

1. Read the request and the [style guide](references/style-guide.md).
2. Research the topic and draft the post in the post folder (see the style guide's Glossary).
3. Follow the style guide's Voice, Headings and Images sections.
4. Hand the draft to the editor as the style guide's "Handing a draft to the editor" describes.
````

## `agent-teams/blog-team/shared/style-guide.md`

````markdown
# Style Guide

## Voice

- Write in plain, friendly English. Address the reader as "you".
- Keep paragraphs under four sentences.

## Headings

- Use sentence case for headings.

## Handing a draft to the editor

1. Save the draft as `draft.md` in the post folder.
2. Write `notes-for-editor.md` with open questions and sources.
3. Send the editor both paths.

## Images

- Every image needs alt text and a credit line.
- Use images we own or that are licensed for reuse.

## Publishing checklist (editor)

- Check the title is under 70 characters.
- Check every link opens.
- Set the publish date and category in the CMS.
- Post the link in the #marketing channel.

## Returning a draft to the writer (editor)

- List each change needed with its paragraph number.
- Send it back with the reason.

## Glossary

- "Post folder": `posts/<yyyy-mm-dd>-<slug>/`.
````
