# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `agent`
- Update intent: the Computer Use Operator clicks from screenshots first, with the DOM path as the fallback (Task autobyteus-agents-31)
- Target package: `agents/computer-use-operator` (bundled skill `computer-use-operation`)
- Scope included: `SKILL.md`, `scripts/native_click.py`, new `scripts/screen_capture.py`, `templates/site-knowledge-template.md`
- Scope excluded: `agent.md`, `agent-config.json` (no change needed); the shared `web-ui-automation` skill in `autobyteus-skills` (a separate repository)
- Request/reference: Task autobyteus-agents-31; the user, 2026-10-19: "you can measure yourself … It's extremely high accuracy"; "the browser tool to get the coordinates is the secondary approach"

## Summary

Measured first ([analysis](agent-package-analysis.md)). Every visible target was hit, including a 13×13 checkbox and a 16×16 ✕:

- 10/10 on the test page at DPR 1 and 10/10 at DPR 2;
- 12/12 on Wikipedia;
- 6/6 through the AutoByteus Claude runtime.

All 7 checks of targets off screen were correctly reported as not visible. The real risk is units: the runtime shows a 2560×1600 image at 2000×1250.

The skill now works like a person:

- **Look:** capture the whole screen.
- **Click:** read the point off the image and click it, after a stated conversion to screen pixels.
- **Check:** after clicks that matter, take a new screenshot and compare it with the one before.

DOM locating (`web-ui-automation`) is the fallback, used when:

- images cannot be seen;
- the target is off screen and easier to find in the page;
- several controls look alike;
- a click from the image did not do what was expected.

The live check on the final text: the operator captured the (stub) screen, read the Follow button off the image, converted with scale 0.64 and clicked at (1003, 750), the button's exact centre. Then it took a second screenshot to check the result.

## Ownership and design decisions

- Vision-first loop, unit conversion, when to fall back, after-click check: `computer-use-operation/SKILL.md` §2 "Screen".
- DOM locating, CSS→screen mapping, native-input tool choice: the shared `web-ui-automation` (unchanged; the operator's skill points to it).
- Capture and sizes: `scripts/screen_capture.py`. Clicking a point or a rectangle: `scripts/native_click.py`.
- What a control looks like and where it is: the site knowledge Elements table, with an optional reference crop in `<site-slug>/refs/`.
- Safety: the confirmation gate stays; it now also asks for a fresh screenshot showing that the final click is on the approved control and the content shown is the approved content.

## Changed paths

### Added

- `/tmp/cuo/agents/computer-use-operator/skills/computer-use-operation/scripts/screen_capture.py`
- `/tmp/cuo/tickets/in-progress/cuo-vision-clicks/` (analysis, result, evidence)

### Modified

- `/tmp/cuo/agents/computer-use-operator/skills/computer-use-operation/SKILL.md`
- `/tmp/cuo/agents/computer-use-operator/skills/computer-use-operation/scripts/native_click.py`
- `/tmp/cuo/agents/computer-use-operator/skills/computer-use-operation/templates/site-knowledge-template.md`

### Moved or renamed

- None

### Removed

- None

## Durable artifacts and evidence

- Result: `/tmp/cuo/tickets/in-progress/cuo-vision-clicks/agent-package-result.md`
- Analysis: `/tmp/cuo/tickets/in-progress/cuo-vision-clicks/agent-package-analysis.md`
- Design/requirements: None
- Validation evidence:
  - `/tmp/cuo/tickets/in-progress/cuo-vision-clicks/evidence/`: answers, truth files and scoring scripts for t1–t5;
  - `runtime-claude-agent-sdk.json` and `runtime-image-delivery.md`;
  - `LC-01-click-from-screenshot.log`.
- Generated package artifacts: None

## Approval state

- State: `Pending`
- Evidence or decision reference: the PR, for the user's review

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | `N/A` | No JSON changed; `agent-config.json` still parses |
| Frontmatter and names align | `Pass` | `quick_validate.py`: "Skill is valid!" |
| Skill folder/frontmatter align | `Pass` | Same |
| Configured `skillNames` resolve | `Pass` | The isolated app loaded `computer-use-operator` with both skills; the run loaded `computer-use-operation` |
| Markdown links and references resolve | `Pass` | All six links in `SKILL.md` exist |
| Skill validator and changed scripts | `Pass` | `py_compile`; `native_click.py`: `--at`, `--scale`, `--double`, `--dry-run`, rect mode unchanged, both-or-neither errors; `screen_capture.py` with stub `scrot`/`xdotool` |
| Member refs, coordinator, and rooted routes | `N/A` | Agent only |
| Imported shared dependencies | `Pass` | `web-ui-automation` exists in `autobyteus-skills`; read in full |
| Ownership and cross-file consistency | `Pass` | DOM mechanics stay in `web-ui-automation`; the template's new column matches the Knowledge list |
| Scope/diff review | `Pass` | Four package files plus the ticket folder |
| Final review against the standard and anti-patterns | `Pass` | Old/new comparison in the analysis ("Preserved behavior"); observable fallback triggers; no fixed after-every-click ritual; LC-01 on the final text |

## Risks, questions, and blockers

- **Not measured here:**
  - a real X11 click and capture (this Mac has no `xdotool`);
  - the Codex runtime (usage limit until 2026-10-25);
  - the `autobyteus` runtime (no API key in the isolated instance).
- **Suggested check on the user's Linux machine:**
  1. Run `screen_capture.py`.
  2. Run one `native_click.py --at` on a test page.
  3. Do one harmless real-site action (open a menu; no posting).
- **The browser `screenshot` tool returned no image** in the isolated app (`browser_bridge_unavailable`). The new loop does not depend on it.
- **Suggested follow-up:** `web-ui-automation`'s description still calls DOM inspection "the locator". The operator's skill sets the order for this agent; the shared skill could name vision as an equal locator in its own repository.

## Next expected action

The user reviews and merges the PR. Then update the local checkout and report to the PM.

## Handoff state

- `get_handoff_rules` called: `No` (after the merge)
- Matching routes: None yet
- Handoffs sent: None yet
- Caller return: after the merge
