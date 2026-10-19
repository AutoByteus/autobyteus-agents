// Score answers: map image px -> CSS px (divide by DPR), check inside the true rect, and hit-test in a real browser.
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const require = createRequire("/Users/normy/autobyteus_org/autobyteus-workspace-superrepo/autobyteus-web/package.json");
const { chromium } = require("playwright-core");
const browser = await chromium.launch();
for (const [name, key] of [["t1-dpr1", null], ["t2-dpr2", "original"], ["t3-scrolled", null]]) {
  const truth = JSON.parse(readFileSync(`${name}.truth.json`));
  let ans = JSON.parse(readFileSync(`${name}.answers.json`)); if (key) ans = ans[key];
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: truth.dpr });
  await page.goto("file:///tmp/cuo-measure/page.html"); if (truth.scrollY) await page.evaluate((y) => scrollTo(0, y), truth.scrollY);
  let hits = 0, n = 0, errs = [];
  for (const [sel, r] of Object.entries(truth.rects)) {
    const a = ans[sel]; n++;
    const visible = r && r.y + r.h > 0 && r.y < 800 && r.x < 1280 && r.x + r.w > 0;
    if (!a) { const ok = !visible; hits += ok; console.log(`${name} ${sel}: answered not visible; truly ${visible ? "VISIBLE" : "not visible"} -> ${ok ? "correct" : "WRONG"}`); continue; }
    const cx = a[0] / truth.dpr, cy = a[1] / truth.dpr;
    const inside = cx >= r.x && cx <= r.x + r.w && cy >= r.y && cy <= r.y + r.h;
    const hitId = await page.evaluate(([x, y, s]) => { const el = document.elementFromPoint(x, y); return el && (el.matches(s) || el.closest(s)) ? "target" : (el ? el.tagName + "#" + el.id : "none"); }, [cx, cy, sel]);
    const err = Math.hypot(cx - (r.x + r.w / 2), cy - (r.y + r.h / 2)); errs.push(err);
    hits += hitId === "target";
    console.log(`${name} ${sel}: rect ${Math.round(r.w)}x${Math.round(r.h)} | off-centre ${err.toFixed(1)} css px | inside=${inside} | click hits ${hitId}`);
  }
  console.log(`== ${name}: ${hits}/${n} correct; mean off-centre ${errs.length ? (errs.reduce((a, b) => a + b, 0) / errs.length).toFixed(1) : "-"} css px\n`);
  await page.close();
}
await browser.close();
