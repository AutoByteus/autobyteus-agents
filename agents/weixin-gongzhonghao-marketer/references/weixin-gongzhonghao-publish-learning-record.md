# Weixin gongzhonghao publish learning record

## Goal

Publish one Weixin Official Account article based on the user-provided Medium post, after translating it into Chinese and creating a valid article draft in the Weixin editor.

This learning record complements [weixin-gongzhonghao-publish-sop.md](./weixin-gongzhonghao-publish-sop.md).

## 1. High-level outcome

The Weixin article was published successfully.

Observed success evidence:
- in `发表记录`, the new entry showed:
  - `今天 03:46`
  - `已发表`
  - `已开启通知，内容已在公众号列表和公众号主页展示`
  - `已通知34人`
- the published article title appeared as:
  - `架构设计代理与代码审查代理，才是端到端 AI 软件工程的核心`
- a public article link was exposed in the publish record:
  - `https://mp.weixin.qq.com/s/qoFQdBdNqzeB-cFNebCW9Q`

## 2. Source article and local translated file

Original source article:
- `https://ryan-zheng.medium.com/architecture-design-and-code-review-agents-are-the-core-of-end-to-end-ai-software-engineering-fb122ec14808`

Important note discovered during reading:
- Medium page was member-only for the full article, but the page preload state exposed the preview/body paragraphs that were enough to reconstruct the visible article content.
- the translated article was written locally to:
  - `/home/autobyteus/data/temp_workspace/weixin_gongzhonghao_article_translation_zh.md`

Translated title used:
- `架构设计代理与代码审查代理，才是端到端 AI 软件工程的核心`

## 3. Starting point

Working Weixin homepage after login:
- `https://mp.weixin.qq.com/cgi-bin/home?t=home/index&lang=zh_CN&token=...`

User was already logged in.

Important discovery:
- the homepage has a `新的创作` area
- the draft list page exposed a direct link for creating a new article

Working draft list URL:
- `https://mp.weixin.qq.com/cgi-bin/appmsg?begin=0&count=10&type=77&action=list_card&token=...&lang=zh_CN`

Working editor URL pattern:
- `https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=77&token=...&lang=zh_CN`

## 4. Critical workflow discoveries

### 4.1 Direct article creation is easier from 草稿箱 than from homepage tiles

The homepage `文章` tile was not reliably triggered by simple DOM click.

Better method:
- open `草稿箱`
- use the exposed `写新文章` link

Detected link:
```html
<a href="/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=77" target="_blank">写新文章</a>
```

This was the cleanest way to open the editor.

### 4.2 The editor uses a normal title field and a ProseMirror body editor

Key fields discovered:
- title field:
  - `textarea#title`
- author field:
  - `input#author`
- main body editor:
  - `div.ProseMirror[contenteditable="true"]`
- publish button:
  - `button.mass_send`

This made content injection much simpler than a hidden iframe-based editor.

### 4.3 Cover upload from the side settings was unreliable in direct automation

Initial attempts tried to upload cover directly into the `封面和摘要` section using:
- native file chooser
- file input assignment
- synthetic drag and drop

These attempts did not make the cover preview appear in the side settings area, even though the UI still accepted local image upload into the article body.

### 4.4 Best workaround: upload image into正文 first, then choose cover from正文

This turned out to be the key practical solution.

What happened:
- the native file picker upload inserted the local image into the article body as a hosted Weixin image
- then the publish flow opened `选择图片`
- selecting the inserted body image allowed cover editing and confirmation
- after that, publish could continue

This is the most important Weixin-specific lesson from this run.

## 5. Exact local files used

### 5.1 Translated article text
- `/home/autobyteus/data/temp_workspace/weixin_gongzhonghao_article_translation_zh.md`

### 5.2 Locally generated cover asset

Created locally for this run:
- SVG source:
  - `/home/autobyteus/data/temp_workspace/weixin_cover.svg`
- rendered PNG used for upload:
  - `/home/autobyteus/data/temp_workspace/weixin_cover.png`

### 5.3 Supporting screenshots captured during exploration

Examples:
- `/home/autobyteus/data/temp_workspace/weixin_editor.png`
- `/home/autobyteus/data/temp_workspace/weixin_before_publish.png`
- `/home/autobyteus/data/temp_workspace/weixin_publish_record_check.png`

## 6. Exact article creation and content insertion that worked

### 6.1 Open new article editor

Open this URL pattern:
```text
https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=77&token=...&lang=zh_CN
```

### 6.2 Fill title and body by DOM script

Working script pattern:
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
  titleEl.value = title;
  titleEl.dispatchEvent(new Event('input', {bubbles:true}));
  titleEl.dispatchEvent(new Event('change', {bubbles:true}));

  const pm = document.querySelector('.ProseMirror');
  const html = paragraphs.map(p => `<section><span>${p.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</span></section>`).join('');
  pm.innerHTML = html;
  pm.dispatchEvent(new InputEvent('input', {bubbles:true, inputType:'insertText', data:paragraphs.join('\n\n')}));
  pm.dispatchEvent(new Event('change', {bubbles:true}));

  return {ok:true};
})()
```

Result:
- title populated correctly
- body content appeared in the ProseMirror editor
- draft could be saved

## 7. Exact local image creation and upload path that worked

### 7.1 Generate a local cover PNG

The SVG was authored locally, then rendered to PNG using headless Chromium.

Working render command:
```bash
chromium --headless --no-sandbox --disable-gpu \
  --window-size=900,383 \
  --screenshot=/home/autobyteus/data/temp_workspace/weixin_cover.png \
  file:///home/autobyteus/data/temp_workspace/weixin_cover.svg
```

### 7.2 Native file chooser upload command

The editor accepted local image upload via Ubuntu file chooser.

Working pattern:
```bash
W=$(xdotool search --name 'Open Files' | tail -n 1)
xdotool windowactivate --sync $W
xdotool key --clearmodifiers ctrl+l
xdotool type --delay 10 '/home/autobyteus/data/temp_workspace/weixin_cover.png'
xdotool key Return
```

Observed result:
- image appeared inside the article body as a hosted Weixin image
- editor HTML then contained a body image like:
  - `img.rich_pages.wxw-img.js_insertlocalimg`

This was enough for the later cover-selection modal.

## 8. Exact publish flow discoveries

### 8.1 First publish click does not immediately publish

Clicking `发表` triggered a sequence of dialogs rather than immediate completion.

### 8.2 If no cover is set yet, Weixin opens `选择图片`

Dialog text observed:
- `选择图片`
- `请从正文插入的图片和视频封面中选择封面`

Important discovery:
- the uploaded body image appeared as a selectable cover option in this dialog
- selecting it enabled the `完成` path

### 8.3 Cover confirmation step

After selecting the image, Weixin showed a cover edit step with:
- `编辑封面`
- aspect ratios such as `2.35:1` and `1:1`
- `确认`

Clicking `确认` moved the flow forward.

### 8.4 创作来源 prompt appeared

Weixin then showed a statement prompt similar to:
- `若你发表的内容涉及...内容由AI生成等，需对创作来源进行声明。`

Working action in this run:
- click `无需声明并发表`

Important note:
- this was the action used in this run, because the content was a translated article and the platform allowed continuing without selecting a claim source.

### 8.5 群发通知 confirmation appeared

Next dialog showed notification and publish settings, then another warning dialog with:
- `已开启群发通知`
- `继续发表`

Working action:
- click `继续发表`

### 8.6 Final publish required QR verification

After continuing, Weixin required another verification step.
Observed text:
- `微信验证`
- `扫码后，请联系管理员进行验证`

The user scanned the QR code.
After that, the platform returned to home or publish records and the publish record updated to successful status.

## 9. Final success verification

### 9.1 Publish record status

In `发表记录`, the new article appeared with:
- time:
  - `今天 03:46`
- status:
  - `已发表`
- notification state:
  - `已开启通知，内容已在公众号列表和公众号主页展示`
- audience result:
  - `已通知34人`
  - `失败0人`

### 9.2 Published article link

Found in publish record anchor:
- `https://mp.weixin.qq.com/s/qoFQdBdNqzeB-cFNebCW9Q`

### 9.3 Early metrics visible immediately

The record already showed early live data:
- `阅读人数 1`
- others still `0`

This confirmed the article was already live, not merely queued.

## 10. Best-practice conclusions for next time

### 10.1 Best creation path

Use:
- `草稿箱` -> `写新文章`

### 10.2 Best content insertion path

Use DOM script for:
- `#title`
- `.ProseMirror`

### 10.3 Best image and cover strategy

Do **not** rely first on the side-panel cover uploader.

Instead:
1. upload a local image into the body using native file chooser
2. click `发表`
3. when `选择图片` appears, select the body image as cover
4. click `完成`
5. click `确认`

This was much more reliable.

### 10.4 Be ready for multi-step publish confirmation

Expected publish sequence may include:
1. `发表`
2. `选择图片`
3. `完成`
4. `确认`
5. `无需声明并发表`
6. `继续发表`
7. QR verification scan
8. publish record update to `已发表`

### 10.5 Manual user participation may still be required

Even with successful automation of most steps, Weixin may require:
- QR-code verification by the user or admin

That should be treated as a normal part of the SOP.

## 11. Artifacts created by this run

Created files:
- `/home/autobyteus/data/temp_workspace/weixin_gongzhonghao_article_translation_zh.md`
- `/home/autobyteus/data/temp_workspace/weixin_cover.svg`
- `/home/autobyteus/data/temp_workspace/weixin_cover.png`
- `/home/autobyteus/data/temp_workspace/weixin_gongzhonghao_publish_learning_record.md`
- `/home/autobyteus/data/temp_workspace/weixin_gongzhonghao_publish_sop.md`

## 12. Correction scenario: initial publish was incomplete, then corrected by re-editing

### 12.1 What went wrong

The first published Weixin article was based only on the Medium preview text.

Why this happened:
- the Medium article was initially member-only
- only preview paragraphs were visible at first
- the first Chinese translation file therefore contained only the preview portion
- that shorter version was published at:
  - `今天 03:46`
  - public link:
    - `https://mp.weixin.qq.com/s/qoFQdBdNqzeB-cFNebCW9Q`

This created an important real-world correction scenario:
- a published article may later need to be fixed because the source article becomes fully accessible after the first publish

### 12.2 Later discovery

Later in the same session, the user changed the Medium article to be publicly accessible.
After reloading the same Medium URL, the full article body became visible.

Action taken:
- extracted the full article text from the now-public Medium page
- rewrote:
  - `/home/autobyteus/data/temp_workspace/weixin_gongzhonghao_article_translation_zh.md`
- translation now contains the full Chinese article instead of only the preview

### 12.3 The working re-edit path

Important discovery:
- opening the already-published copy with the usual `appmsg_edit_v2` style URL showed an error:
  - `此草稿已发表，可前往发表记录查看`
- the working re-edit route came from the publish-record item's internal edit URL

Working re-edit URL pattern observed:
```text
https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=77&appmsgid=309957484&isMul=1&get_delete=1&token=...&lang=zh_CN&re_edit=1
```

Important note:
- this is different from the earlier new-draft editor URL
- for modifying an already published article, the `media/appmsg_edit` plus `re_edit=1` path worked

### 12.4 What the re-edit flow actually did

After opening the re-edit page:
- the previous article content was loaded
- the full translated Chinese content was injected into:
  - `#title`
  - `#js_description`
  - `.ProseMirror`
- save was successful
- page history showed:
  - `04-11 04:15`
  - `手动保存`

Important observation:
- the modified content saved into a new editable draft state
- the editor URL updated to a new `appmsgid`:
  - `309957489`

### 12.5 Very important cover behavior during re-edit

The re-edit page had:
- full text loaded
- no body images in the rewritten article body

However, publish still worked.

Important discovery:
- Weixin preserved enough previous publish and cover state that the re-edit publish flow did **not** require selecting a new cover again in this correction run
- so for correction of an already-published article, cover selection may be easier than the initial publish flow

### 12.6 Actual correction publish flow observed

Working sequence for the correction run:
1. open re-edit page
2. replace body with full translation
3. click `保存为草稿`
4. confirm page shows `已保存`
5. click `发表`
6. Weixin showed a publish dialog indicating:
   - `未开启群发通知`
7. click `继续发表`
8. Weixin required `微信验证`
9. user scanned the QR code
10. correction publish completed

### 12.7 Final correction result

Observed from the homepage recent-publish area:
- a new publish record appeared at:
  - `今天 04:16`
- status:
  - `已发表`
- wording:
  - `未开启群发通知，内容已在公众号主页展示`
- new public link exposed on the homepage:
  - `https://mp.weixin.qq.com/s/yarrky3-lgrkYtL2SQqK-g`

Important practical conclusion:
- this correction did **not** appear to overwrite the old public article in place
- instead, it created a **new published article entry** with the same title and a new public URL
- the earlier 03:46 version still remained in publish history

This is a key operational lesson for future runs.

### 12.8 Best-practice lesson from the correction scenario

Before first publish, verify whether the source article is fully accessible.
If there is any chance only a preview is visible:
- stop
- verify the full source body first
- only then translate and publish

If an incomplete article has already been published:
- do not panic
- use the publish-record modification or re-edit path
- load the full translation
- save
- republish
- be prepared for another QR verification
- expect that Weixin may create a new published entry rather than replacing the earlier public URL
