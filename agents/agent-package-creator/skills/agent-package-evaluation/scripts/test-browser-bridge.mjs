// Test browser bridge for evaluating agents that use the browser tools (open_tab, navigate_to, list_tabs,
// close_tab, read_page, screenshot, run_script, dom_snapshot) in an isolated AutoByteus app, without the user's
// browser. It serves the /browser/* bridge API against a separate Chromium (its own --user-data-dir and
// --remote-debugging-port) and logs every call. Start the app with AUTOBYTEUS_BROWSER_BRIDGE_BASE_URL=http://127.0.0.1:<port>
// and AUTOBYTEUS_BROWSER_BRIDGE_TOKEN=<token>. Test-only routes: POST /test/state (each attached tab, who opened it,
// whether it is alive, and every Chromium page) and POST /test/seed-other-task-tab {"url"} (a tab another task opened).
//   CDP_PORT=9333 BRIDGE_PORT=9440 BRIDGE_TOKEN=<token> BRIDGE_DIR=/tmp/test-browser-bridge node test-browser-bridge.mjs
import http from "node:http";
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";

const CDP = `http://127.0.0.1:${process.env.CDP_PORT || 9333}`;
const PORT = Number(process.env.BRIDGE_PORT || 9440);
const TOKEN = process.env.BRIDGE_TOKEN || "test-token";
const DIR = process.env.BRIDGE_DIR || "/tmp/test-browser-bridge";
const LOG = `${DIR}/bridge.jsonl`;
const SHOTS = `${DIR}/shots`;
mkdirSync(SHOTS, { recursive: true });

const tabs = new Map(); // tab_id -> { targetId, created_at, attached_by, owner }
let nextId = 1;
const log = (o) => appendFileSync(LOG, JSON.stringify({ t: new Date().toISOString(), ...o }) + "\n");

async function targets() {
  return (await (await fetch(`${CDP}/json/list`)).json()).filter((t) => t.type === "page");
}
async function cdp(targetId, method, params = {}) {
  const t = (await targets()).find((x) => x.id === targetId);
  if (!t) throw Object.assign(new Error("tab is gone"), { code: "browser_tab_not_found" });
  return await new Promise((resolve, reject) => {
    const ws = new WebSocket(t.webSocketDebuggerUrl);
    const timer = setTimeout(() => { try { ws.close(); } catch {} reject(new Error(`CDP timeout: ${method}`)); }, 30000);
    ws.onopen = () => ws.send(JSON.stringify({ id: 1, method, params }));
    ws.onmessage = (m) => {
      const d = JSON.parse(String(m.data));
      if (d.id === 1) { clearTimeout(timer); ws.close(); d.error ? reject(new Error(d.error.message)) : resolve(d.result); }
    };
    ws.onerror = () => { clearTimeout(timer); reject(new Error("CDP websocket error")); };
  });
}
async function evaluate(targetId, expression) {
  const r = await cdp(targetId, "Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return r.result?.value;
}
async function waitLoaded(targetId) {
  for (let i = 0; i < 60; i++) {
    try {
      const st = await evaluate(targetId, "JSON.stringify([document.readyState, location.href])");
      const [ready, href] = JSON.parse(st);
      if (ready === "complete" && href !== "about:blank") return;
    } catch {}
    await new Promise((r) => setTimeout(r, 400));
  }
}
function tabOf(body) {
  const tab = tabs.get(String(body.tab_id));
  if (!tab) throw Object.assign(new Error(`unknown tab_id ${body.tab_id}`), { code: "browser_tab_not_found" });
  return tab;
}
async function current(tab) {
  const t = (await targets()).find((x) => x.id === tab.targetId);
  return t ? { url: t.url, title: t.title } : null;
}
async function openAttached(url, owner) {
  const t = await (await fetch(`${CDP}/json/new?${encodeURI(url)}`, { method: "PUT" })).json();
  const tab_id = String(nextId++);
  tabs.set(tab_id, { targetId: t.id, created_at: new Date().toISOString(), attached_by: "open_tab", owner });
  await waitLoaded(t.id);
  return tab_id;
}

const handlers = {
  async "/browser/open"(b) {
    if (b.reuse_existing) {
      for (const [id, tab] of tabs) { const c = await current(tab); if (c && c.url.replace(/\/$/, "") === String(b.url).replace(/\/$/, "")) return { tab_id: id, url: c.url, reused: true }; }
    }
    const tab_id = await openAttached(b.url, "agent");
    return { tab_id, url: (await current(tabs.get(tab_id)))?.url ?? b.url };
  },
  async "/browser/navigate"(b) {
    const tab = tabOf(b);
    await cdp(tab.targetId, "Page.navigate", { url: b.url });
    await new Promise((r) => setTimeout(r, 300));
    await waitLoaded(tab.targetId);
    return { url: (await current(tab))?.url ?? b.url, ok: true, status: 200, tab_id: String(b.tab_id) };
  },
  async "/browser/list"() {
    const out = [];
    for (const [id, tab] of tabs) {
      const c = await current(tab);
      if (!c) { tabs.delete(id); continue; }
      out.push({ tab_id: id, attach_state: "attached", attached_by: tab.attached_by, url: c.url, title: c.title, created_at: tab.created_at });
    }
    return { tabs: out };
  },
  async "/browser/close"(b) {
    const tab = tabOf(b);
    await fetch(`${CDP}/json/close/${tab.targetId}`);
    tabs.delete(String(b.tab_id));
    return { tab_id: String(b.tab_id), closed: true };
  },
  async "/browser/read-page"(b) {
    const tab = tabOf(b);
    const html = await evaluate(tab.targetId, b.mode === "thorough" ? "document.body.innerText" : "document.documentElement.outerHTML");
    return { url: (await current(tab))?.url, content: String(html ?? "").slice(0, 60000) };
  },
  async "/browser/screenshot"(b) {
    const tab = tabOf(b);
    await fetch(`${CDP}/json/activate/${tab.targetId}`);
    const r = await cdp(tab.targetId, "Page.captureScreenshot", { format: "png", captureBeyondViewport: !!b.full_page });
    const file = `${SHOTS}/shot-${Date.now()}.png`;
    writeFileSync(file, Buffer.from(r.data, "base64"));
    return { url: (await current(tab))?.url, file_path: file, artifact_path: file };
  },
  async "/browser/javascript"(b) {
    const tab = tabOf(b);
    return { result: await evaluate(tab.targetId, b.javascript) };
  },
  async "/browser/dom-snapshot"(b) {
    const tab = tabOf(b);
    const max = Math.min(Number(b.max_elements || 300), 2000);
    const js = `(() => { const out=[]; for (const el of document.querySelectorAll('a,button,input,textarea,select,h1,h2,h3,[role]')) { if (out.length>=${max}) break; const r=el.getBoundingClientRect(); out.push({tag:el.tagName.toLowerCase(), role:el.getAttribute('role'), text:(el.innerText||el.value||el.getAttribute('aria-label')||'').trim().slice(0,120), href:el.getAttribute('href'), rect:${b.include_bounding_boxes ? "{x:r.x,y:r.y,width:r.width,height:r.height}" : "undefined"}}); } return out; })()`;
    return { url: (await current(tab))?.url, elements: await evaluate(tab.targetId, js) };
  },
  async "/browser/device-emulation"() { return { applied: true }; },
  // Test-only seeding (not part of the bridge API the agent uses)
  async "/test/seed-other-task-tab"(b) { return { tab_id: await openAttached(b.url, "other-run") }; },
  async "/test/state"() {
    const ts = await targets();
    return { attached: [...tabs].map(([id, t]) => ({ tab_id: id, owner: t.owner, alive: ts.some((x) => x.id === t.targetId) })), chromium_pages: ts.map((t) => ({ id: t.id, url: t.url })) };
  },
};

http.createServer(async (req, res) => {
  let raw = "";
  req.on("data", (c) => (raw += c));
  req.on("end", async () => {
    const send = (code, obj) => { res.writeHead(code, { "content-type": "application/json" }); res.end(JSON.stringify(obj)); };
    if (!req.url.startsWith("/test/") && req.headers["x-autobyteus-browser-token"] !== TOKEN) return send(401, { ok: false, error: { code: "browser_bridge_unavailable", message: "bad token" } });
    const h = handlers[req.url.split("?")[0]];
    let body = {};
    try { body = raw ? JSON.parse(raw) : {}; } catch {}
    if (!h) { log({ path: req.url, body, error: "no handler" }); return send(404, { ok: false, error: { code: "browser_bridge_unavailable", message: `no handler for ${req.url}` } }); }
    try {
      const result = await h(body);
      log({ path: req.url, body, result: req.url.includes("read-page") || req.url.includes("dom-snapshot") ? { url: result.url, size: JSON.stringify(result).length } : result });
      send(200, { ok: true, result });
    } catch (e) {
      log({ path: req.url, body, error: e.message });
      send(200, { ok: false, error: { code: e.code || "browser_bridge_unavailable", message: e.message } });
    }
  });
}).listen(PORT, "127.0.0.1", () => console.log(`bridge on ${PORT}`));
