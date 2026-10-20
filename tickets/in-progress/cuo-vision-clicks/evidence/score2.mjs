import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const require = createRequire("/Users/normy/autobyteus_org/autobyteus-workspace-superrepo/autobyteus-web/package.json");
const { chromium } = require("playwright-core");
const S = 1.28, browser = await chromium.launch();
// t4: test page, scored against truth
{ const truth = JSON.parse(readFileSync("t4-footer.truth.json")), ans = JSON.parse(readFileSync("t4-footer.answers.json")).displayed;
  for (const [sel, r] of Object.entries(truth.rects)) { const a = ans[sel];
    const vis = r.y + r.h > 0 && r.y < 800;
    if (!a) { console.log(`t4 ${sel}: answered not visible; truly ${vis ? "VISIBLE" : "not visible"}`); continue; }
    const cx = a[0] * S / 2, cy = a[1] * S / 2;
    console.log(`t4 ${sel}: off-centre ${Math.hypot(cx - r.x - r.w / 2, cy - r.y - r.h / 2).toFixed(1)} css px, inside=${cx >= r.x && cx <= r.x + r.w && cy >= r.y && cy <= r.y + r.h}`); } }
// t5: real Wikipedia page, report what a click at each point would hit
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
await page.goto("https://en.wikipedia.org/wiki/HTTP_418", { waitUntil: "load" }); await page.waitForTimeout(300);
for (const [desc, [x, y]] of JSON.parse(readFileSync("t5-wiki.answers.json")).displayed) {
  const cx = x * S / 2, cy = y * S / 2;
  const hit = await page.evaluate(([x, y]) => { const el = document.elementFromPoint(x, y); if (!el) return "none";
    const c = el.closest("a,button,input,label,summary,[role=button]") || el; const r = c.getBoundingClientRect();
    return `${c.tagName.toLowerCase()}${c.id ? "#" + c.id : ""} "${(c.innerText || c.value || c.getAttribute("aria-label") || c.getAttribute("title") || "").trim().slice(0, 30)}" ${c.type === "radio" ? "value=" + c.value : ""} rect ${Math.round(r.width)}x${Math.round(r.height)} off-centre ${Math.hypot(x - r.x - r.width / 2, y - r.y - r.height / 2).toFixed(1)}`; }, [cx, cy]);
  console.log(`t5 ${desc} -> ${hit}`); }
await browser.close();
