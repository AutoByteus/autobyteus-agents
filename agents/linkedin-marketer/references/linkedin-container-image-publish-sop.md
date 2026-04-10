# SOP: LinkedIn image attachment and publish (hardened)

## Purpose

Create and publish a LinkedIn post with local image attachments using exact browser JavaScript and shell commands, with minimal exploration.

This SOP is the container-specific source of truth for LinkedIn posting runs that use:
- Browser MCP for browser-side JavaScript
- native Ubuntu file chooser automation
- local image files already present in the container or workspace

Use this together with [linkedin-container-attachment-runbook.md](./linkedin-container-attachment-runbook.md) when the run needs prior validation context.

## 0. Operator inputs

Set these values before running the SOP.

### Required variables
- `LINKEDIN_URL`
- `IMAGE_1_PATH`
- `IMAGE_2_PATH` (optional if only one image)
- `POST_TEXT`

### Example values
- `LINKEDIN_URL=https://www.linkedin.com/feed/`
- `IMAGE_1_PATH=/home/autobyteus/data/temp_workspace/codex_mcp_infographic_1.png`
- `IMAGE_2_PATH=/home/autobyteus/data/temp_workspace/codex_mcp_infographic_2.png`
- `POST_TEXT=`
  ```text
  This was done completely automatically by Codex.

  Codex controlled a containerized Ubuntu environment, used Chrome through Browser MCP, generated images through an image MCP, attached the images to LinkedIn, and published the post end-to-end.

  The two images in this post were also generated automatically as part of the workflow.

  This is a practical example of autonomous agent workflows combining browser automation, container execution, and image generation tools.
  ```

## 1. Preconditions

- LinkedIn account is already logged in.
- A browser tab for LinkedIn is available in Browser MCP.
- Shell has `xdotool` and `scrot`.
- Local image files already exist.
- Use Browser MCP for browser JavaScript steps.
- Use shell for Ubuntu GUI/file-picker automation steps.

## 2. Execution context rules

Every step below is marked as one of:
- **Browser JS**: run in the LinkedIn tab via browser script execution
- **Shell**: run as a shell command in Ubuntu
- **Visual check**: confirm result via screenshot or page state

Do not improvise unless a recovery branch explicitly says to.

## 3. Find or confirm the LinkedIn browser tab

### 3.1 Preferred tab identification

Target a tab whose URL contains:
- `linkedin.com/feed`

### 3.2 If the tab is uncertain

Use Browser MCP tab listing and attach flow first, then continue only after a LinkedIn feed tab is attached.

Expected result:
- all Browser JS below executes against the LinkedIn feed tab

## 4. Reset to feed

### Step 4.1: Open LinkedIn feed

**Browser JS**
```js
window.location.href = 'https://www.linkedin.com/feed/'
```

### Step 4.2: Wait until feed is visible

**Visual check**

Expected result:
- feed page is open
- LinkedIn top nav is visible
- `Start a post` area is visible or soon available

Optional:

**Shell**
```bash
scrot /home/autobyteus/data/temp_workspace/step4_feed.png
```

## 5. Open post composer

### Step 5.1: Click `Start a post`

**Browser JS**
```js
(() => {
  const start = [...document.querySelectorAll('div,button')]
    .find(el => (el.innerText || '').trim() === 'Start a post');
  if (!start) return {ok:false, reason:'Start a post not found'};
  start.click();
  return {ok:true};
})()
```

### Step 5.2: Verify composer opened

**Visual check**

Expected result:
- a LinkedIn post composer modal opens

Optional:

**Shell**
```bash
scrot /home/autobyteus/data/temp_workspace/step5_composer.png
```

### Recovery if Step 5.1 fails

**Browser JS**
```js
(() => {
  const start = [...document.querySelectorAll('[aria-label], div, button')]
    .find(el => (el.getAttribute?.('aria-label') || '').trim() === 'Start a post' || (el.innerText || '').includes('Start a post'));
  if (!start) return {ok:false, reason:'Start a post fallback not found'};
  start.click();
  return {ok:true};
})()
```

## 6. Open photo flow

### Step 6.1: Click `Photo`

**Browser JS**
```js
(() => {
  const photo = [...document.querySelectorAll('div,button')]
    .find(el => (el.innerText || '').trim() === 'Photo');
  if (!photo) return {ok:false, reason:'Photo button not found'};
  photo.click();
  return {ok:true};
})()
```

### Step 6.2: Verify next state

**Visual check**

Expected result:
One of these should happen:
- native Ubuntu `Open Files` dialog opens
- LinkedIn media editor opens after a chooser interaction

Optional:

**Shell**
```bash
scrot /home/autobyteus/data/temp_workspace/step6_photo.png
```

### Recovery if Step 6.1 fails

**Browser JS**
```js
(() => {
  const photo = [...document.querySelectorAll('[aria-label], div, button')]
    .find(el => (el.getAttribute?.('aria-label') || '').trim() === 'Photo' || (el.innerText || '').includes('Photo'));
  if (!photo) return {ok:false, reason:'Photo fallback not found'};
  photo.click();
  return {ok:true};
})()
```

## 7. Upload first image through Ubuntu file chooser

### Step 7.1: Select first image using absolute path

**Shell**
```bash
W=$(xdotool search --name 'Open Files' | tail -n 1)
xdotool windowactivate --sync $W
xdotool key --clearmodifiers ctrl+l
xdotool type --delay 20 '/home/autobyteus/data/temp_workspace/codex_mcp_infographic_1.png'
xdotool key Return
printf 'window=%s\n' "$W"
```

If using a different image, replace the path string with `IMAGE_1_PATH`.

### Step 7.2: Verify LinkedIn media editor opened

**Visual check**

Expected result:
- LinkedIn media editor is visible
- first image is attached
- editor usually shows `1 of 1`

Optional:

**Shell**
```bash
scrot /home/autobyteus/data/temp_workspace/step7_first_image.png
```

### Recovery if chooser is already in correct folder and `Ctrl+L` path mode fails

**Shell**
```bash
W=$(xdotool search --name 'Open Files' | tail -n 1)
xdotool windowactivate --sync $W
xdotool key --clearmodifiers ctrl+f
sleep 0.2
xdotool type --delay 20 'codex_mcp_infographic_1.png'
sleep 0.3
xdotool key Return
```

## 8. Access LinkedIn media editor shadow root

### Step 8.1: Confirm shadow root exists

**Browser JS**
```js
(() => {
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  if (!root) return {ok:false, reason:'shadow root not found'};
  return {ok:true};
})()
```

Expected result:
- `{ok:true}`

### Step 8.2: Inspect editor buttons

**Browser JS**
```js
(() => {
  const host = document.querySelector('#interop-outlet');
  const root = host && host.shadowRoot;
  if (!host) return {ok:false, reason:'no #interop-outlet'};
  if (!root) return {ok:false, reason:'no shadowRoot'};
  const buttons = [...root.querySelectorAll('button')].map((b,i)=>({
    i,
    aria: b.getAttribute('aria-label'),
    text: (b.innerText||'').trim(),
    cls: (b.className||'').toString().slice(0,140),
    id: b.id || null,
    disabled: !!b.disabled
  }));
  return {ok:true, buttonCount: buttons.length, buttons};
})()
```

Expected result:
- should include buttons like `Add`, `Delete`, `Next`

## 9. Branch: remove accidental duplicate only if needed

### Condition

Run this step only if the editor shows an accidental duplicate or more images than intended.

### Step 9.1: Delete selected second image

**Browser JS**
```js
(() => {
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  if (!root) return {ok:false, reason:'no root'};
  const previews = [...root.querySelectorAll('button[aria-label^="Select "]')];
  if (previews.length < 2) return {ok:false, reason:'need at least 2 previews', count: previews.length};
  previews[1].click();
  const del = [...root.querySelectorAll('button')].find(b => (b.innerText||'').trim() === 'Delete');
  if (!del) return {ok:false, reason:'no delete button'};
  del.click();
  return {ok:true, previews: previews.length, deletedSelected: 2};
})()
```

Expected result:
- extra image removed

## 10. Branch A: one-image post

If publishing with only one image:
- skip Section 11
- continue directly to Section 12

## 11. Branch B: two-image post

### Step 11.1: Click `Add`

**Browser JS**
```js
(() => {
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  if (!root) return {ok:false, reason:'no root'};
  const add = [...root.querySelectorAll('button')].find(b => (b.innerText||'').trim() === 'Add');
  if (!add) return {ok:false, reason:'no Add button'};
  add.click();
  return {ok:true};
})()
```

Expected result:
- Ubuntu `Open Files` dialog opens

### Step 11.2: Select second image by absolute path

**Shell**
```bash
W=$(xdotool search --name 'Open Files' | tail -n 1)
xdotool windowactivate --sync $W
xdotool key --clearmodifiers ctrl+l
xdotool type --delay 20 '/home/autobyteus/data/temp_workspace/codex_mcp_infographic_2.png'
xdotool key Return
printf 'window=%s\n' "$W"
```

If using a different image, replace the path string with `IMAGE_2_PATH`.

### Step 11.3: Verify both images attached

**Visual check**

Expected result:
- editor shows `2 of 2`
- both images visible in preview rail

Optional:

**Shell**
```bash
scrot /home/autobyteus/data/temp_workspace/step11_two_images.png
```

### Recovery if chooser is already in correct folder

**Shell**
```bash
W=$(xdotool search --name 'Open Files' | tail -n 1)
xdotool windowactivate --sync $W
xdotool key --clearmodifiers ctrl+f
sleep 0.2
xdotool type --delay 20 'codex_mcp_infographic_2.png'
sleep 0.3
xdotool key Return
```

## 12. Move from media editor to final composer

### Step 12.1: Click `Next`

**Browser JS**
```js
(() => {
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  if (!root) return {ok:false, reason:'no root'};
  const next = [...root.querySelectorAll('button')].find(
    b => (b.innerText||'').trim() === 'Next' || b.getAttribute('aria-label') === 'Next'
  );
  if (!next) return {ok:false, reason:'no Next button'};
  next.click();
  return {ok:true};
})()
```

### Step 12.2: Verify final composer

**Visual check**

Expected result:
- final post composer modal is visible
- attached images are visible
- `Post` button is visible

Optional:

**Shell**
```bash
scrot /home/autobyteus/data/temp_workspace/step12_final_composer.png
```

## 13. Insert post text

### Step 13.1: Insert full text into final editor

**Browser JS**
```js
(() => {
  const text = `This was done completely automatically by Codex.

Codex controlled a containerized Ubuntu environment, used Chrome through Browser MCP, generated images through an image MCP, attached the images to LinkedIn, and published the post end-to-end.

The two images in this post were also generated automatically as part of the workflow.

This is a practical example of autonomous agent workflows combining browser automation, container execution, and image generation tools.`;
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  if (!root) return {ok:false, reason:'no shadow root'};
  const editor = root.querySelector('div[role="textbox"][contenteditable="true"]');
  if (!editor) return {ok:false, reason:'shadow textbox editor not found'};
  const html = text.split('\n\n').map(p => `<p>${p.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>`).join('');
  editor.focus();
  editor.innerHTML = html;
  editor.dispatchEvent(new InputEvent('input', {bubbles:true, inputType:'insertText', data:text}));
  editor.dispatchEvent(new Event('change', {bubbles:true}));
  return {ok:true, paragraphs:text.split('\n\n').length};
})()
```

If using different post content, replace the `text` constant with `POST_TEXT` content.

### Step 13.2: Verify inserted text

**Visual check**

Expected result:
- post body contains the intended text
- multiple paragraphs are visible if provided

Optional:

**Shell**
```bash
scrot /home/autobyteus/data/temp_workspace/step13_text.png
```

## 14. Publish post

### Step 14.1: Click `Post`

**Browser JS**
```js
(() => {
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  const post = [...(root?.querySelectorAll('button') || []), ...document.querySelectorAll('button')]
    .find(b => (b.innerText||'').trim() === 'Post');
  if (!post) return {ok:false, reason:'Post button not found'};
  post.click();
  return {ok:true};
})()
```

### Step 14.2: Verify success

**Visual check**

Expected result:
- LinkedIn shows `Post successful`
- newly published post appears near top of feed

Optional:

**Shell**
```bash
scrot /home/autobyteus/data/temp_workspace/step14_posted.png
```

## 15. Recovery snippets

### Re-list shadow-root buttons

**Browser JS**
```js
[...(document.querySelector('#interop-outlet')?.shadowRoot?.querySelectorAll('button') || [])].map(b => ({
  text: (b.innerText || '').trim(),
  aria: b.getAttribute('aria-label'),
  id: b.id,
  cls: b.className
}))
```

### Click `Add`

**Browser JS**
```js
(() => {
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  const btn = [...root.querySelectorAll('button')].find(b => (b.innerText||'').trim() === 'Add');
  if (!btn) return {ok:false};
  btn.click();
  return {ok:true};
})()
```

### Click `Delete` on current selection

**Browser JS**
```js
(() => {
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  const btn = [...root.querySelectorAll('button')].find(b => (b.innerText||'').trim() === 'Delete');
  if (!btn) return {ok:false};
  btn.click();
  return {ok:true};
})()
```

### Click `Next`

**Browser JS**
```js
(() => {
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  const btn = [...root.querySelectorAll('button')].find(b => (b.innerText||'').trim() === 'Next');
  if (!btn) return {ok:false};
  btn.click();
  return {ok:true};
})()
```

### Click `Post`

**Browser JS**
```js
(() => {
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  const btn = [...(root?.querySelectorAll('button') || []), ...document.querySelectorAll('button')]
    .find(b => (b.innerText||'').trim() === 'Post');
  if (!btn) return {ok:false};
  btn.click();
  return {ok:true};
})()
```

## 16. Validation notes from actual test

This SOP was validated on a fresh run that successfully:
- opened a new LinkedIn post
- attached two generated infographic images
- inserted post text
- published successfully

The main correction discovered during validation was:
- final text editor is inside `#interop-outlet.shadowRoot`
- text insertion must target `div[role="textbox"][contenteditable="true"]`
- text insertion should set paragraph HTML and dispatch input and change events
