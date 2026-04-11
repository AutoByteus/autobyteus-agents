# SOP: Weixin gongzhonghao article publish

## Purpose

Create and publish a Weixin Official Account article from local translated content, using exact browser JavaScript and Ubuntu file chooser automation.

This SOP is the container-specific source of truth for Weixin runs that use:
- Browser MCP for browser-side JavaScript
- local translated article files
- local cover assets
- Ubuntu file chooser automation

Use this together with [weixin-gongzhonghao-publish-learning-record.md](./weixin-gongzhonghao-publish-learning-record.md) when the run needs prior validation context.

## 0. Operator inputs

Set before execution:
- `DRAFT_LIST_URL=https://mp.weixin.qq.com/cgi-bin/appmsg?begin=0&count=10&type=77&action=list_card&token=...&lang=zh_CN`
- `NEW_ARTICLE_URL=https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=77&token=...&lang=zh_CN`
- `TITLE_TEXT=架构设计代理与代码审查代理，才是端到端 AI 软件工程的核心`
- `TRANSLATION_FILE=/home/autobyteus/data/temp_workspace/weixin_gongzhonghao_article_translation_zh.md`
- `COVER_PNG=/home/autobyteus/data/temp_workspace/weixin_cover.png`

Optional expected published link format:
- `https://mp.weixin.qq.com/s/...`

## 1. Preconditions

- User is already logged into `mp.weixin.qq.com`.
- Browser tab is attached and usable.
- Shell has `xdotool`.
- If generating a cover PNG from SVG, shell has Chromium.
- User is available for QR verification if Weixin requests it.

## 2. Open 草稿箱 and start a new article

### Preferred URL

Open directly:
```text
https://mp.weixin.qq.com/cgi-bin/appmsg?begin=0&count=10&type=77&action=list_card&token=...&lang=zh_CN
```

### Create article

Preferred direct editor open:
```text
https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=77&token=...&lang=zh_CN
```

Reason:
- this is more reliable than clicking the homepage `文章` tile

## 3. Fill title and body

### Browser JS

```js
(() => {
  const title = '架构设计代理与代码审查代理，才是端到端 AI 软件工程的核心';
  const paragraphs = [
    '本文根据作者 Ryan Zheng 在 Medium 发布的英文原文翻译整理。',
    '最近，我越来越清楚地意识到，端到端 AI 软件工程中真正的核心工作到底是什么。',
    '我目前的结论很简单：',
    '核心工作并不是代码生成本身，而是架构设计与代码审查。在一个 agentic system 中，这意味着架构设计代理和代码审查代理。',
    '行业里已经有一种相当普遍的看法：AI 生成的代码其实无法被真正审查。',
    '我认为，这种看法在实践中往往是对的。但我也认为，人们通常给出的解释还不够深。',
    '常见的解释是：AI agent 生成代码太多、太快。',
    '这当然是真的。但这并不是根因。',
    '结合我们自己之前的经验，更深层的问题其实是架构碎片化。',
    '在我们的 workflow skill 还不成熟之前，我们并不真正清楚，哪些内容必须在设计原则层面和代码审查层面被明确约束。所以我们让 coding agent 独自写了太多代码。',
    '后来，当 bug 开始出现时，我们一遍又一遍地看到了同样的模式。',
    'coding agent 会不断压缩上下文、重建上下文、反复重读大量文件，但依然很难重新恢复对整体的完整理解。',
    '这最终成了一个非常重要的信号。',
    '原文链接：',
    'https://ryan-zheng.medium.com/architecture-design-and-code-review-agents-are-the-core-of-end-to-end-ai-software-engineering-fb122ec14808'
  ];

  const titleEl = document.querySelector('#title');
  if (!titleEl) return {ok:false, reason:'title not found'};
  titleEl.value = title;
  titleEl.dispatchEvent(new Event('input', {bubbles:true}));
  titleEl.dispatchEvent(new Event('change', {bubbles:true}));

  const pm = document.querySelector('.ProseMirror');
  if (!pm) return {ok:false, reason:'editor not found'};
  const html = paragraphs.map(p => `<section><span>${p.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</span></section>`).join('');
  pm.innerHTML = html;
  pm.dispatchEvent(new InputEvent('input', {bubbles:true, inputType:'insertText', data:paragraphs.join('\n\n')}));
  pm.dispatchEvent(new Event('change', {bubbles:true}));

  return {ok:true};
})()
```

### Verify

Expected:
- title is filled
- body text is visible inside `.ProseMirror`

## 4. Prepare a local cover image

If `weixin_cover.png` does not exist, create it from SVG.

### Shell

```bash
chromium --headless --no-sandbox --disable-gpu \
  --window-size=900,383 \
  --screenshot=/home/autobyteus/data/temp_workspace/weixin_cover.png \
  file:///home/autobyteus/data/temp_workspace/weixin_cover.svg
```

Expected result:
- `/home/autobyteus/data/temp_workspace/weixin_cover.png` exists

## 5. Upload the image into the article body

## Important strategy

Do **not** depend on the side-panel cover uploader as the primary path.

Use the local image as a normal body image first.
That body image can later be selected as the official cover.

### 5.1 Trigger the native file picker

Use editor image insert control or the file input.
If browser JS can open the chooser:
```js
(() => {
  const input = document.querySelector('input[type=file]');
  if (!input) return {ok:false};
  input.click();
  return {ok:true};
})()
```

### 5.2 Select file in Ubuntu chooser

### Shell

```bash
W=$(xdotool search --name 'Open Files' | tail -n 1)
xdotool windowactivate --sync $W
xdotool key --clearmodifiers ctrl+l
xdotool type --delay 10 '/home/autobyteus/data/temp_workspace/weixin_cover.png'
xdotool key Return
```

### Verify

Expected:
- the image is inserted into the body
- `.ProseMirror` contains an image element like `img.rich_pages.wxw-img.js_insertlocalimg`

## 6. Save draft before publish

### Browser JS

```js
(() => {
  const btn=[...document.querySelectorAll('button')].find(b=>(b.innerText||'').replace(/\s+/g,'').includes('保存为草稿'));
  if(!btn) return {ok:false};
  btn.click();
  return {ok:true};
})()
```

### Verify

Expected:
- page saves successfully
- draft gets an `appmsgid`
- save indicators show `已保存`

## 7. Start publish flow

### Browser JS

```js
(() => {
  const btn=[...document.querySelectorAll('button')].find(b=>(b.innerText||'').replace(/\s+/g,'').includes('发表'));
  if(!btn) return {ok:false};
  btn.click();
  return {ok:true};
})()
```

## 8. If Weixin asks to choose a cover image

### Trigger condition

A dialog appears with text like:
- `选择图片`
- `请从正文插入的图片和视频封面中选择封面`

### 8.1 Select the body image as cover

### Browser JS

```js
(() => {
  const img = document.querySelector('.weui-desktop-dialog_img-picker .appmsg_content_img.cover');
  if(!img) return {ok:false, reason:'image option not found'};
  img.click();
  return {ok:true};
})()
```

### 8.2 Finish image selection

### Browser JS

```js
(() => {
  const btn=[...document.querySelectorAll('.weui-desktop-dialog button')].find(b=>(b.innerText||'').replace(/\s+/g,'').includes('完成'));
  if(!btn) return {ok:false, reason:'完成 not found'};
  btn.click();
  return {ok:true};
})()
```

## 9. If Weixin shows `编辑封面`

### Trigger condition

Visible button or text includes:
- `编辑封面`
- `确认`

### Browser JS

```js
(() => {
  const btn=[...document.querySelectorAll('button')].find(b=>(b.innerText||'').replace(/\s+/g,'').includes('确认') && b.getBoundingClientRect().width>0);
  if(!btn) return {ok:false};
  btn.click();
  return {ok:true};
})()
```

## 10. If Weixin asks for 创作来源

### Trigger condition

Dialog text includes a statement about:
- 时事 / 公共政策 / 社会事件 / AI生成

### Working action used in this run

### Browser JS

```js
(() => {
  const btn=[...document.querySelectorAll('button')].find(b=>(b.innerText||'').replace(/\s+/g,'').includes('无需声明并发表') && b.getBoundingClientRect().width>0);
  if(!btn) return {ok:false};
  btn.click();
  return {ok:true};
})()
```

Note:
- if your content requires a declared source, choose the compliant option instead

## 11. If Weixin shows notification confirmation

### Trigger condition

Dialog text includes:
- `已开启群发通知`
- `继续发表`

### Browser JS

```js
(() => {
  const btn=[...document.querySelectorAll('button')].find(b=>(b.innerText||'').replace(/\s+/g,'').includes('继续发表') && b.getBoundingClientRect().width>0);
  if(!btn) return {ok:false};
  btn.click();
  return {ok:true};
})()
```

## 12. If Weixin requires QR verification

### Trigger condition

Text includes:
- `微信验证`
- `扫码后，请联系管理员进行验证`

### Required human step

- ask the user or admin to scan the QR code
- wait for confirmation

### After user confirms scan

Refresh or navigate to publish record:
```text
https://mp.weixin.qq.com/cgi-bin/appmsgpublish?sub=list&begin=0&count=10&token=...&lang=zh_CN
```

## 13. Verify final success in publish record

### Publish record URL

```text
https://mp.weixin.qq.com/cgi-bin/appmsgpublish?sub=list&begin=0&count=10&token=...&lang=zh_CN
```

### Expected success signals

- target title appears in the top record
- status is `已发表`
- notice text shows:
  - `已开启通知，内容已在公众号列表和公众号主页展示`
- audience line shows something like:
  - `已通知XX人`
  - `失败0人`

### Public link verification

The publish record entry should expose an article anchor like:
```text
https://mp.weixin.qq.com/s/...
```

## 14. Recovery checklist

### If homepage article tile is unreliable

Do not keep retrying.
Use direct editor URL from `草稿箱 -> 写新文章`.

### If side-panel cover upload does not stick

Do not fight that path.
Use body-image upload first, then choose cover during publish.

### If publish seems stuck after QR scan

Open `发表记录` directly and inspect the newest entry.
Often the publish already completed and the editor tab simply did not become the best verification surface.

### If top record shows `等候发表`

Wait a few seconds and refresh `发表记录`.
If publication succeeds, it will update to `已发表`.

## 15. Canonical result from this run

Successful published article:
- title:
  - `架构设计代理与代码审查代理，才是端到端 AI 软件工程的核心`
- publish record status:
  - `已发表`
- public link:
  - `https://mp.weixin.qq.com/s/qoFQdBdNqzeB-cFNebCW9Q`

## 16. SOP for correcting an already-published article

Use this when the article was already published, but the source text later changes or the first translation was incomplete.

### 16.1 Typical trigger

Examples:
- source article was initially paywalled or preview-only
- only partial translation was published
- full source text later becomes available
- published Weixin article must be corrected

### 16.2 Rewrite the local translation file first

Before touching Weixin:
1. retrieve the full source text
2. rewrite the local translation file completely
3. confirm the new file is final

Canonical file used in this run:
```text
/home/autobyteus/data/temp_workspace/weixin_gongzhonghao_article_translation_zh.md
```

### 16.3 Open the re-edit page for the published article

Do **not** assume the normal new-article editor URL will work.

Observed failed path:
- `media/appmsg_edit_v2 ... action=edit ... appmsgid=...`
- result may show:
  - `此草稿已发表，可前往发表记录查看`

Working re-edit URL pattern:
```text
https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=77&appmsgid=<copy_appmsg_id>&isMul=1&get_delete=1&token=...&lang=zh_CN&re_edit=1
```

In this run, the working re-edit URL used:
- `appmsgid=309957484`
- later saved into a new editable state with:
  - `appmsgid=309957489`

### 16.4 Replace title, summary, and body in the re-edit page

Use the same field targets as before:
- title:
  - `#title`
- summary:
  - `#js_description`
- body:
  - `.ProseMirror`

Important note:
- for correction, fully replace the body with the final translation
- do not append to the previous partial article unless that is explicitly desired

### 16.5 Save before re-publish

### Browser JS

```js
(() => {
  const btn=[...document.querySelectorAll('button')].find(b => (b.innerText||'').replace(/\s+/g,'').includes('保存为草稿'));
  if(!btn) return {ok:false};
  btn.click();
  return {ok:true};
})()
```

### Verify

Expected signals:
- page text includes `已保存`
- history may show a new save record like `手动保存`
- editor may switch to a new `appmsgid`

### 16.6 Re-publish the corrected article

### Browser JS

```js
(() => {
  const btn=[...document.querySelectorAll('button')].find(b => (b.innerText||'').replace(/\s+/g,'').includes('发表'));
  if(!btn) return {ok:false};
  btn.click();
  return {ok:true};
})()
```

### 16.7 If Weixin shows `未开启群发通知`

Observed in this correction run.

### Browser JS

```js
(() => {
  const btn=[...document.querySelectorAll('button,a')].find(el => (el.innerText||'').replace(/\s+/g,'').trim() === '继续发表');
  if(!btn) return {ok:false};
  btn.click();
  return {ok:true};
})()
```

### 16.8 If Weixin requires verification again

Even for a correction publish, Weixin may again show:
- `微信验证`
- `扫码验证`

Required action:
- ask the user or admin to scan again
- wait for confirmation

### 16.9 Important behavior difference vs initial publish

During this correction run:
- re-publish did **not** require re-selecting the cover image again
- no new cover-selection dialog was needed

So the correction flow may be simpler than the initial publish flow.

### 16.10 Final verification after correction publish

Check homepage recent-publish area or `发表记录`.

Expected signals from this run:
- new entry time:
  - `今天 04:16`
- status:
  - `已发表`
- wording:
  - `未开启群发通知，内容已在公众号主页展示`
- new public link:
  - `https://mp.weixin.qq.com/s/yarrky3-lgrkYtL2SQqK-g`

### 16.11 Critical operational conclusion

A correction publish may **create a new published article entry and new public URL**, instead of overwriting the old public article in place.

Therefore, after correction publish, always verify:
1. whether a new publish record was created
2. whether the public URL changed
3. whether the old article still remains in history
4. which URL should be treated as the canonical final article
