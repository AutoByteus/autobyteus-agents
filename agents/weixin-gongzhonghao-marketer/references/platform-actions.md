# Weixin Gongzhonghao Platform Actions

This file contains the distilled browser and publish-flow actions for Weixin Official Account article publishing. Use these exact patterns instead of exploratory browsing when the task is to publish an approved article.

For containerized Ubuntu runs that use Browser MCP, local translation files, local cover assets, and shell automation, also load:
- `references/weixin-gongzhonghao-publish-sop.md`
- `references/weixin-gongzhonghao-publish-learning-record.md`

Those two files are the source of truth for:
- direct draft-list and editor URL usage
- ProseMirror article insertion
- local cover generation and `xdotool` chooser automation
- body-image-first cover selection during publish
- correction publish through the re-edit flow

## Core route

- Preferred authoring surface: `mp.weixin.qq.com`
- Preferred new-article path: `草稿箱` or direct new-article editor URL
- Preferred correction path: publish-record re-edit URL with `media/appmsg_edit` and `re_edit=1`
- Do not rely on the homepage `文章` tile as the primary entry point

## Preconditions

- User has explicitly approved the exact final title and body for this run.
- Login state on `mp.weixin.qq.com` is valid.
- If translating from an external source, source completeness is verified or the final local translation file is already finalized.
- Any intended local cover asset is ready before publish actions begin, or the validated body-image-first cover path is available.
- User is available for QR verification if Weixin requests it.

## Action 1: Open the correct editor surface

### New article
- open or navigate to the draft-list URL or the direct new-article editor URL

### Correction-republish
- open the re-edit URL from the publish record
- do not assume the standard `appmsg_edit_v2` new-draft URL will work for published content

### Verify
- title field `#title` exists
- main body editor `.ProseMirror` exists
- page is interactive

### If it fails
- if login or account verification is required, stop for human intervention
- if the new-article path is unreliable from homepage tiles, use the direct draft-list or editor URL instead

## Action 2: Insert approved title and body

### Targets
- title: `textarea#title` or `#title`
- optional summary on correction flow: `#js_description`
- body editor: `div.ProseMirror[contenteditable="true"]` or `.ProseMirror`

### Rule
- insert the exact approved Chinese title and body
- if using a local translated file, load it first and use it as the source of truth
- do not publish a draft based on a preview-only source unless the user explicitly approved that limitation

### Verify
- title matches expected final title
- body visibly matches expected final body
- if summary is used, it matches the intended summary

### If it fails
- re-focus the correct editor
- retry once with verified state checks
- do not publish if title/body integrity checks fail

## Action 3: Prepare cover state

### Initial publish rule
- do not rely first on the side-panel cover uploader
- prefer uploading the local image into the article body, then selecting that body image as cover during publish if Weixin asks

### Correction flow rule
- if the re-edit flow already preserves usable cover state, do not force a new cover-selection path

### Verify
- either a usable body image exists for later cover selection
- or existing cover state is already sufficient

## Action 4: Save draft

### Rule
- click `保存为草稿` before publish

### Verify
- page shows `已保存` or equivalent save state
- draft acquires or preserves an `appmsgid`

## Action 5: Start publish flow

### Rule
- click `发表` once
- expect a multi-step dialog sequence instead of immediate completion

### Possible follow-up dialogs
- `选择图片`
- `编辑封面`
- 创作来源声明 dialog
- 群发通知 / `继续发表`
- `微信验证`

## Action 6: Handle publish dialogs

### If `选择图片` appears
- select the previously inserted body image as cover
- click `完成`

### If `编辑封面` appears
- click `确认` after the cover state is acceptable

### If 创作来源 prompt appears
- choose the compliant action for the content
- if the validated run allowed `无需声明并发表` and the content fits that path, use it
- otherwise do not guess; stop and ask for human judgment when needed

### If notification confirmation appears
- click `继续发表` when the state is expected

### If `微信验证` appears
- stop for user or admin QR verification
- resume verification after the human step

## Action 7: Verify success

### Primary success surface
- `发表记录`

### Verify
- the target title appears in the newest publish record
- status is `已发表`
- publish-record text matches the resulting notification state
- a public article URL like `https://mp.weixin.qq.com/s/...` is captured when available

### If the publish state is ambiguous
- refresh `发表记录`
- if the record shows `等候发表`, wait briefly and refresh again
- do not assume failure just because the editor tab looks stale after QR verification

## Correction-publish special rule

- after correction-republish, verify whether Weixin created a new published entry and a new public URL instead of overwriting the original article in place
- identify which URL should be treated as canonical for the user

## Stable fallbacks

- If the homepage creation tile is unreliable, use the direct draft-list or new-article editor URL.
- If side-panel cover upload does not stick, use the validated body-image-first cover strategy.
- If the source article may be paywalled or preview-only, stop and verify source completeness before first publish.
- If correction publishing is needed, use the publish-record re-edit path rather than the new-draft editor route.
- If the editor or publish flow seems stale after QR verification, treat `发表记录` as the primary verification surface.
