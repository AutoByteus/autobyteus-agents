# Agent Package Analysis: Computer Use Operator clicks from screenshots

- Status: `Completed`
- Operation: `update` (update intent: `extend`)
- Package type: `agent` (`agents/computer-use-operator` with its bundled skill `computer-use-operation`)
- Target package: worktree `/tmp/cuo`, branch `cuo-vision-clicks`, from `origin/main` at `ca5c149`
- Files read in full: `agent.md`, `agent-config.json`, `SKILL.md`, `scripts/native_click.py`, `scripts/choose_file.py`, `scripts/paste_file.py`, both templates; the shared `web-ui-automation` skill (`autobyteus-skills/web-ui-automation/SKILL.md`, a separate repository, not changed here).
- Request/reference: Task autobyteus-agents-31 (the PM). The user, 2026-10-19: "you can measure yourself … take a screenshot … It's extremely high accuracy"; "the browser tool to get the coordinates is the secondary approach"; work "just like a real human" with screenshots and X tools.

## Measurements (evidence in `evidence/`)

Blind protocol: the screenshot was taken with Playwright Chromium, the click point was named from the image alone and saved, and only then was the truth read: the element's `getBoundingClientRect()`, plus `document.elementFromPoint()` at the point (what a click would land on). Distances are in CSS px.

| Case | Image | Result | Mean distance from centre |
| --- | --- | --- | --- |
| t1 test page | 1280×800, DPR 1 | 10/10 hits | 0.4 |
| t2 same page | 2560×1600, DPR 2, shown at 2000×1250 | 10/10 hits | 0.5 |
| t3 scrolled, targets off screen | 1280×800 | 3/3 "not visible", correct | – |
| t4 scrolled to the footer | 2560×1600, DPR 2 | 1/1 hit, 2/2 "not visible" correct | 0.6 |
| t5 Wikipedia (HTTP 418 article) | 2560×1600, DPR 2 | 12/12 hit the intended control | under 2 for small targets |
| Claude runtime in an isolated AutoByteus 1.5.6, operator on `claude-opus-5` | t2 image | 6/6 hits | 0.6 |

The test-page targets include a 13×13 checkbox, a 16×16 ✕, 26 px icon buttons and the caret half of a split button.

Findings:

- **M1 Accuracy is not the risk.** Every visible target was hit, and every target off screen was reported as not visible rather than guessed.
- **M2 The risk is units.** The runtime shows a large image smaller than the file (2560×1600 shown as 2000×1250, stated factor 1.28). A point read from the image must be scaled to the file's pixels, then to screen pixels. Skipping it misses by 28% on that image (and by 2× more if CSS px were assumed on a DPR 2 shot).
- **M3 How the image reaches the model differs by runtime.** On `claude_agent_sdk` the agent opened the PNG with the runtime's own `Read` tool (`read_media_file` is not in that toolset), and the runtime stated the resize factor. On the `autobyteus` runtime `read_media_file` loads the image and refuses when the model has no image input ("The selected model does not support image input"). Codex was not measured (usage limit), nor the `autobyteus` runtime (no API key in the isolated instance).
- **M4 The browser `screenshot` tool returned no image** in the isolated app (`browser_bridge_unavailable`). A full-screen capture with a native tool does not depend on the browser bridge and also shows native dialogs and other apps.
- **M5 Not measurable on this Mac:** the native X11 click (no `xdotool`). `native_click.py` takes only an element rectangle, so a point read from a screenshot cannot be passed to it.

## The design

The user's model: the agent works like a person. It looks at the screen, clicks what it sees, and looks again. Locating through the DOM is the fallback.

| Concern | Today | New | Owner |
| --- | --- | --- | --- |
| Primary locate | DOM rect + window metrics (`web-ui-automation`) | Full-screen screenshot; read the point off the image | `SKILL.md` §2 "Operating the screen" |
| Units | CSS→screen formula | Image as seen → screenshot file → screen; the capture helper prints the file and screen sizes | `SKILL.md`, `screen_capture.py` |
| Capability | Not addressed | Observable: if an opened screenshot shows you its content, use vision; if the image cannot be loaded or the tool says the model has no image input, use the DOM path | `SKILL.md` |
| Fallback | – | DOM locate per `web-ui-automation` when the target is not on screen, look-alikes cannot be told apart, the exact text or value matters, or a vision click missed | `SKILL.md` (points to the shared skill) |
| Checking a click | Read-only check after each helper | After a click whose result matters, a fresh screenshot compared with the one before | `SKILL.md` |
| Click by point | Rect only | `native_click.py --at X,Y [--scale S]` | script |
| Site knowledge for vision | Locators only | Elements table gets "Looks like / where"; optional reference crop for icon-only controls next to the file | template, `SKILL.md` Knowledge |
| Safety | Confirmation gate | Unchanged; before the final click of a gated action, the screenshot must show that the point is on the approved control | `SKILL.md` |

Boundary with `web-ui-automation`: that shared skill stays the owner of DOM locating, the CSS→screen mapping and native-input tools. The operator's skill owns the vision-first loop and says when to use the DOM path. Nothing is copied. The shared skill's own description still calls DOM inspection "the locator"; the operator's skill states the order for this agent. Updating the shared skill to name vision as an equal locator is a suggestion for its own repository, not part of this change.

## Preserved behavior

- The confirmation gate, human checkpoints, access limits, the knowledge rules and the report are unchanged.
- The DOM path, the rectangle mode of `native_click.py`, and `paste_file.py`/`choose_file.py` remain.
- "Check the target window is on top before the first click" stays, now satisfied by the screenshot itself.
- No change to `agent.md`, `agent-config.json` (`run_bash`, `read_media_file`, `screenshot` are already there).

## Real-use check plan

- Here (macOS): helper unit checks with stub `scrot`/`xdotool` on PATH (`--at`, `--scale`, `--dry-run`, size output); a live run in an isolated app where the operator reads the new skill and locates targets on a test page screenshot with the conversion.
- On the user's Linux machine (needs X11): `screen_capture.py`, then one `native_click.py --at` on the test page, and one harmless real-site action (open a menu, no posting).
