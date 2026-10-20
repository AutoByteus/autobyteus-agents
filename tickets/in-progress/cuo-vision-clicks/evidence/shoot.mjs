// Screenshot a page and record the true rectangles (CSS px) of target ids, without printing them.
import { createRequire } from "node:module";
const require = createRequire("/Users/normy/autobyteus_org/autobyteus-workspace-superrepo/autobyteus-web/package.json");
const { chromium } = require("playwright-core");
import { writeFileSync } from "node:fs";
const [url, out, dpr, scrollY, idsCsv] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: Number(dpr) });
await page.goto(url, { waitUntil: "load" });
if (Number(scrollY)) await page.evaluate((y) => window.scrollTo(0, y), Number(scrollY));
await page.waitForTimeout(300);
await page.screenshot({ path: `${out}.png` });
const rects = await page.evaluate((ids) => Object.fromEntries(ids.map((s) => {
  const el = document.querySelector(s); if (!el) return [s, null];
  const r = el.getBoundingClientRect(); return [s, { x: r.x, y: r.y, w: r.width, h: r.height }];
})), idsCsv.split("|"));
writeFileSync(`${out}.truth.json`, JSON.stringify({ dpr: Number(dpr), scrollY: Number(scrollY), rects }, null, 1));
await browser.close();
console.log("saved", out);
