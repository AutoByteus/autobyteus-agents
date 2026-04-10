# LinkedIn Platform Actions

This file contains the distilled browser actions for LinkedIn publishing. Use these exact patterns instead of exploratory browsing when the task is to publish an approved draft.

For containerized Ubuntu runs that attach local image files through Browser MCP plus shell automation, also load:
- `references/linkedin-container-image-publish-sop.md`
- `references/linkedin-container-attachment-runbook.md`

Those two files are the source of truth for:
- native `Open Files` chooser automation with `xdotool`
- media-editor controls inside `#interop-outlet.shadowRoot`
- final post text insertion inside `#interop-outlet.shadowRoot`
- the validated one-image versus two-image attachment flow

## Core route

- Preferred compose route: `https://www.linkedin.com/preload/sharebox/`
- Do not rely on feed-surface `Start a post` flows when the direct compose route is available.

## Preconditions

- User has explicitly approved the exact final draft for this run.
- Login state is valid.
- Any intended media is ready before compose actions begin.

## Action 1: Open compose surface

### Tool pattern
- open or navigate a browser tab to `https://www.linkedin.com/preload/sharebox/`

### Verify
- `.ql-editor[role="textbox"]` exists
- page is interactive

### If it fails
- if login or security UI appears, stop for human intervention

## Action 2: Insert approved text

### Target
- `.ql-editor[role="textbox"]`

### JS pattern
Use a Quill-compatible insertion approach so LinkedIn recognizes the text as real editor content.

```javascript
(() => {
  const editor = document.querySelector('.ql-editor[role="textbox"]');
  if (!editor) return { ok: false, reason: 'editor_not_found' };
  editor.focus();
  document.execCommand('selectAll', false, null);
  document.execCommand('delete', false, null);
  document.execCommand('insertText', false, APPROVED_TEXT);
  return {
    ok: true,
    text: editor.innerText || editor.textContent || '',
  };
})();
```

Replace `APPROVED_TEXT` with the final approved draft content.

### Verify
- inserted text meets expected length threshold
- opening line matches
- ending line matches
- `Post` button becomes enabled

### If it fails
- repeat insertion once
- re-run length plus opening plus ending checks
- do not publish if integrity checks fail

## Action 3: Verify media state

### Verify
- attached media matches user intent
- composer shows expected media presence before publish

### If media is wrong
- correct it before publish
- do not rely on later edit mode for media replacement

## Action 4: Publish

### Target
- primary composer action button
- reliable selector: `button.share-actions__primary-action`

### JS pattern
```javascript
(() => {
  const btn = document.querySelector('button.share-actions__primary-action');
  if (!btn) return { ok: false, reason: 'publish_button_not_found' };
  if (btn.disabled) return { ok: false, reason: 'publish_button_disabled' };
  btn.click();
  return { ok: true };
})();
```

### Rule
- click publish once

## Action 5: Verify success

### Success signals
- success toast appears
- canonical post URL is available, typically `/feed/update/...` or activity URL

### Verify live post
- open the live post URL
- verify rendered opening line
- verify media presence if applicable
- capture one evidence screenshot

## Stable fallbacks

- If feed composer behavior is noisy, use `/preload/sharebox/`.
- If text insertion partially drops content, reinsert once with Quill-compatible input semantics.
- If publish verification screenshot is flaky, treat toast plus canonical post URL plus rendered text as the primary success criteria.
- If the publish result is wrong and media must change, use delete plus repost instead of edit-mode media replacement.
