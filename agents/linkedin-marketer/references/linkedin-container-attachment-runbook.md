# LinkedIn attachment automation runbook (detailed)

This file records the exact working procedure used to:
1. generate images locally in the workspace
2. attach them to a LinkedIn post
3. use native Ubuntu file chooser automation
4. use shadow-root-aware JavaScript for LinkedIn editor controls
5. publish the post

The purpose is to avoid rediscovery next time.

This learning record complements [linkedin-container-image-publish-sop.md](./linkedin-container-image-publish-sop.md).

## 1. Core lessons learned

### 1.1 What worked

- **Image generation tool** worked when using a detailed, high-fidelity prompt.
- **Native OS file picker automation** worked reliably for selecting image files.
- **LinkedIn media editor controls** were reachable through an **open shadow root**.
- Once the shadow root was queried directly, **Delete / Add / Next / Post** actions became scriptable.

### 1.2 What did not work initially

- Querying the main document DOM only, for example:
  ```js
  document.querySelectorAll('button')
  ```
  did **not** expose the LinkedIn media-editor controls.

### 1.3 Why the initial JS failed

- The LinkedIn editor UI was inside:
  ```js
  document.querySelector('#interop-outlet').shadowRoot
  ```
- So the earlier DOM search missed it because it never crossed the shadow DOM boundary.

### 1.4 Best strategy next time

- Use **browser-side JS** for LinkedIn controls inside the shadow root.
- Use **OS automation** for the native file picker.
- Use screenshots only as verification, not as the primary control path.

## 2. Files used

### Generated images

- First image:
  `/home/autobyteus/data/temp_workspace/test_image_high_fidelity.png`
- Second image:
  `/home/autobyteus/data/temp_workspace/test_image_high_fidelity_2.png`

### Learning files

- Earlier short note:
  `/home/autobyteus/data/temp_workspace/linkedin_upload_experience.md`
- This detailed runbook:
  `/home/autobyteus/data/temp_workspace/linkedin_attachment_runbook_detailed.md`

## 3. Image generation that worked

A high-fidelity prompt succeeded where earlier simpler prompts failed.

### Example successful generation call pattern

- Output file path:
  `/home/autobyteus/data/temp_workspace/test_image_high_fidelity.png`
- Prompt style:
  long, photorealistic, cinematic, highly detailed landscape request
- Generation config used:
  ```json
  {"size":"1024x1024","quality":"high"}
  ```

### Example successful prompt structure

Use something like:
- "Create an ultra-high-fidelity photorealistic image of ..."
- include lighting details
- include foreground / midground / background
- include texture realism
- include atmosphere / depth / lens quality
- specify "no text or watermark"

### Second successful image

- Output file path:
  `/home/autobyteus/data/temp_workspace/test_image_high_fidelity_2.png`
- Also created with a detailed high-fidelity prompt

## 4. LinkedIn UI structure discovered

### Important shadow host

```js
document.querySelector('#interop-outlet')
```

### Important shadow root

```js
document.querySelector('#interop-outlet').shadowRoot
```

### Why this matters

The LinkedIn media modal/editor controls were inside this open shadow root.

This means normal document-level queries were insufficient.

## 5. Exact JavaScript patterns that worked

### 5.1 Inspect all buttons inside LinkedIn media editor shadow root

Use this first when the editor is open:

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

#### What this revealed

It exposed buttons like:
- `Dismiss`
- `Manage (2)`
- `Edit`
- `Tag`
- `Alternative text`
- `Duplicate`
- `Delete`
- `Add`
- `Next`

This was the key breakthrough.

### 5.2 Remove a duplicate image from the LinkedIn media editor

This script worked to select the second image preview and click `Delete`:

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

#### Result

After this, the editor changed from `2 of 2` / duplicate state to `1 of 1`.

### 5.3 Click `Add` in the shadow-root editor

This opened the native Ubuntu file picker from inside the LinkedIn editor:

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

### 5.4 Click `Next` from the shadow-root editor

This advanced from editor view to the final posting composer:

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

### 5.5 Click `Post` from either shadow root or main document

This final script succeeded in publishing:

```js
(() => {
  const host = document.querySelector('#interop-outlet');
  const root = host?.shadowRoot;
  const scopes = [document, root].filter(Boolean);
  const found = [];
  for (const scope of scopes) {
    for (const b of scope.querySelectorAll('button')) {
      found.push({
        text:(b.innerText||'').trim(),
        aria:b.getAttribute('aria-label'),
        cls:(b.className||'').toString().slice(0,120)
      });
    }
  }
  const post = [...(root?.querySelectorAll('button')||[]), ...document.querySelectorAll('button')]
    .find(b => (b.innerText||'').trim() === 'Post');
  if (!post) return {ok:false, buttons: found.slice(0,80)};
  post.click();
  return {ok:true};
})()
```

#### Why this version is better

It searches both:
- main document
- shadow root

So if LinkedIn moves the final composer between layers, this is more robust.

## 6. Native Ubuntu file picker automation that worked

### 6.1 Why OS automation was needed

The actual file attachment step used LinkedIn's native file chooser, not a simple DOM file input interaction.

So the correct strategy was:
- click LinkedIn's UI control that opens the file chooser
- automate the native Ubuntu file dialog with `xdotool`

This was **not clipboard paste**.
This was the normal upload flow.

### 6.2 Environment facts discovered

A shell check showed:
- `DISPLAY=:99`
- `xdotool` available at `/usr/bin/xdotool`
- `scrot` available at `/usr/bin/scrot`

These were enough for GUI automation and screenshots.

### 6.3 Useful OS commands used

#### Check GUI tools available

```bash
python3 - <<'PY'
import shutil
for cmd in ['scrot','xdotool','wmctrl','python','python3']:
    print(cmd, shutil.which(cmd))
PY
```

#### Find browser or dialog windows

```bash
xdotool search --name 'LinkedIn'
xdotool search --name 'Open Files'
```

#### Activate a window

```bash
xdotool windowactivate --sync WINDOW_ID
```

#### Take a screenshot for verification

```bash
scrot /home/autobyteus/data/temp_workspace/some_name.png
```

### 6.4 Exact successful path-entry method for file upload

#### Strategy that worked best

Use the native file picker's path-entry mode and enter the absolute file path.

#### Command pattern

```bash
xdotool windowactivate --sync <OPEN_FILES_WINDOW_ID>
xdotool key --clearmodifiers ctrl+l
xdotool type --delay 20 '/absolute/path/to/file.png'
xdotool key Return
```

#### Example used successfully

```bash
xdotool windowactivate --sync 12582924
xdotool key --clearmodifiers ctrl+l
xdotool type --delay 10 '/home/autobyteus/data/temp_workspace/test_image_high_fidelity.png'
xdotool key Return
```

#### Important caution

A previous attempt accidentally typed an unwanted `keyReturn` string into the location field because of command chaining issues.

So next time, prefer splitting into separate `xdotool` steps or chaining carefully.

### 6.5 Exact successful command for selecting the second image

When the file picker was already open to the workspace, this also worked:

```bash
W=$(xdotool search --name 'Open Files' | tail -n 1)
xdotool windowactivate --sync $W
xdotool key --clearmodifiers ctrl+f
sleep 0.2
xdotool type --delay 20 'test_image_high_fidelity_2.png'
sleep 0.3
xdotool key Return
```

#### Why this worked

Because the file picker was already in the correct directory, searching by filename was enough.

#### More robust alternative

Prefer absolute-path entry with `Ctrl+L` if the current directory is uncertain.

## 7. Full working workflow used in the successful run

### 7.1 Initial state

- LinkedIn feed open and authenticated.
- LinkedIn editor modal open.
- One uploaded image existed, but at one point an accidental duplicate was present.

### 7.2 Remove accidental duplicate

Use shadow-root JS:
- inspect buttons
- select second preview
- click `Delete`

Script used:
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

### 7.3 Add a new second image

Use shadow-root JS to click `Add`:
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

Then use OS file picker automation to select:
```bash
W=$(xdotool search --name 'Open Files' | tail -n 1)
xdotool windowactivate --sync $W
xdotool key --clearmodifiers ctrl+f
sleep 0.2
xdotool type --delay 20 'test_image_high_fidelity_2.png'
sleep 0.3
xdotool key Return
```

### 7.4 Move to final composer

Use shadow-root JS:
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

### 7.5 Publish the post

Use the cross-scope `Post` search:
```js
(() => {
  const host = document.querySelector('#interop-outlet');
  const root = host?.shadowRoot;
  const post = [...(root?.querySelectorAll('button')||[]), ...document.querySelectorAll('button')]
    .find(b => (b.innerText||'').trim() === 'Post');
  if (!post) return {ok:false};
  post.click();
  return {ok:true};
})()
```

#### Verification of success

A screenshot after publish showed:
- toast: `Post successful. View post`
- new post visible near top of feed
- both images attached

## 8. Recommended exact shortcut workflow for next time

If doing this again, do this and do not re-explore:

### Step A: Generate image(s)

Create one or more detailed, photorealistic images and save them to known absolute file paths.

### Step B: Open LinkedIn image editor

If not already open:
- open LinkedIn feed
- start post
- click `Photo`

### Step C: Use native OS picker to upload first image

Use `Ctrl+L` in the Ubuntu file chooser and enter the absolute path.

### Step D: For all editor controls, go directly to shadow root

Do **not** waste time scanning only the main DOM.

Always start with:
```js
const root = document.querySelector('#interop-outlet')?.shadowRoot;
```

### Step E: Use shadow-root JS to manage media

- inspect buttons
- delete unwanted duplicates
- click `Add`
- click `Next`

### Step F: Use OS chooser again for additional images

Use file picker automation again for each additional image.

### Step G: Publish

Use the cross-scope `Post`-click script.

## 9. Reusable snippets

### 9.1 Minimal shadow-root getter

```js
const root = document.querySelector('#interop-outlet')?.shadowRoot;
root
```

### 9.2 Dump all button labels inside shadow root

```js
[...(document.querySelector('#interop-outlet')?.shadowRoot?.querySelectorAll('button') || [])].map(b => ({
  text: (b.innerText || '').trim(),
  aria: b.getAttribute('aria-label'),
  id: b.id,
  cls: b.className
}))
```

### 9.3 Click `Add`

```js
(() => {
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  const btn = [...root.querySelectorAll('button')].find(b => (b.innerText||'').trim() === 'Add');
  if (!btn) return {ok:false};
  btn.click();
  return {ok:true};
})()
```

### 9.4 Click `Delete` on selected preview

```js
(() => {
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  const del = [...root.querySelectorAll('button')].find(b => (b.innerText||'').trim() === 'Delete');
  if (!del) return {ok:false};
  del.click();
  return {ok:true};
})()
```

### 9.5 Click `Next`

```js
(() => {
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  const next = [...root.querySelectorAll('button')].find(b => (b.innerText||'').trim() === 'Next');
  if (!next) return {ok:false};
  next.click();
  return {ok:true};
})()
```

### 9.6 Click `Post` robustly

```js
(() => {
  const root = document.querySelector('#interop-outlet')?.shadowRoot;
  const post = [...(root?.querySelectorAll('button') || []), ...document.querySelectorAll('button')]
    .find(b => (b.innerText||'').trim() === 'Post');
  if (!post) return {ok:false};
  post.click();
  return {ok:true};
})()
```

### 9.7 OS chooser absolute-path method

```bash
W=$(xdotool search --name 'Open Files' | tail -n 1)
xdotool windowactivate --sync $W
xdotool key --clearmodifiers ctrl+l
xdotool type --delay 20 '/absolute/path/to/file.png'
xdotool key Return
```

## 10. Final recommendation

Next time, the shortest path is:
1. generate image(s)
2. open LinkedIn media editor
3. use OS file picker automation for upload
4. use `#interop-outlet.shadowRoot` for editor controls
5. use robust `Post`-click JS to publish

Do not repeat the earlier mistake of exploring only the main document DOM.

## 11. Additional findings from SOP validation rerun

A second full end-to-end rerun was performed specifically to validate whether the SOP could be followed directly.

### 11.1 Outcome of rerun

The rerun successfully:
- opened a fresh LinkedIn post
- attached two newly generated infographic images
- inserted explanatory post text
- published successfully

This confirmed that the workflow is reproducible.

### 11.2 New issue discovered during rerun

The original SOP text-insertion step was still flawed.

#### Problem

The earlier SOP tried to insert text using a main-document lookup such as:
```js
document.querySelector('[contenteditable="true"]')
```
and then used a simple:
```js
document.execCommand('insertText', false, text)
```

#### What happened in practice

- the final LinkedIn post editor was **not** found in the main document
- the final editor actually lived inside the LinkedIn shadow root
- even when insertion partially worked, only the first line was reliably inserted in one attempt

### 11.3 Correct final text editor location

The final text editor was found inside:
```js
document.querySelector('#interop-outlet')?.shadowRoot
```

The correct target element was:
```js
div[role="textbox"][contenteditable="true"]
```

### 11.4 Corrected text insertion method

The working approach was:
1. enter the shadow root
2. locate the textbox editor inside the shadow root
3. convert paragraphs into `<p>...</p>` HTML
4. assign `editor.innerHTML`
5. dispatch `input` and `change` events

Working insertion script:
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

### 11.5 Why this matters

This means the important LinkedIn post flow has two separate shadow-root interactions:
- media editor controls inside `#interop-outlet.shadowRoot`
- final post text editor also inside `#interop-outlet.shadowRoot`

So future automation should assume LinkedIn overlays may continue to move critical controls into the same shadow-root container.

### 11.6 SOP hardening lessons learned

The rerun also showed that a good operational SOP for a technical operator should include:
- exact JavaScript, not only "click X" instructions
- exact shell commands for file chooser automation
- branch logic for:
  - one image vs two images
  - duplicate removal only if needed
  - chooser path uncertainty
- explicit execution context for each step:
  - Browser JS
  - Shell
  - Visual check
- verification expectations after each major action

### 11.7 Concrete hardening improvements applied to SOP

After rerun, the SOP was upgraded to include:
- operator inputs (`IMAGE_1_PATH`, `IMAGE_2_PATH`, `POST_TEXT`, `LINKEDIN_URL`)
- Browser JS / Shell / Visual check labels
- branch sections for one-image and two-image posts
- duplicate-removal branch
- recovery snippets
- corrected text insertion step
- validation note from actual rerun

### 11.8 Current conclusion after rerun

At this stage:
- the workflow is proven to work end-to-end
- the SOP is materially stronger than before validation
- the biggest confirmed failure mode discovered during rerun was the old text-insertion method
- that issue has now been corrected in the SOP

### 11.9 Recommendation for future runs

When repeating this workflow:
- do not re-explore the main DOM first
- go directly to the hardened SOP
- assume post editor and media editor are both under `#interop-outlet.shadowRoot`
- prefer absolute-path file chooser uploads unless current folder certainty is high
