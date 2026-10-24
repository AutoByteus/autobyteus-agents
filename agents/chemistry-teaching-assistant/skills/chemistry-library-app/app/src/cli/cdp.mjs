// Minimal Chrome DevTools Protocol client: system Chrome, Node's built-in WebSocket, no npm packages.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const KANDIDATEN = [
  process.env.CHROME,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

export function findeChrome() {
  return KANDIDATEN.find((p) => fs.existsSync(p)) || null;
}

const warte = (ms) => new Promise((r) => setTimeout(r, ms));

export class Browser {
  static async starte({ breite = 1920, hoehe = 1080 } = {}) {
    const chrome = findeChrome();
    if (!chrome) throw new Error("Chrome/Chromium nicht gefunden; Pfad in der Umgebungsvariable CHROME angeben");
    if (typeof WebSocket === "undefined") throw new Error("Node 22 oder neuer nötig (eingebautes WebSocket)");
    const profil = fs.mkdtempSync(path.join(os.tmpdir(), "chem-pruefen-"));
    const proc = spawn(chrome, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--hide-scrollbars",
      "--remote-debugging-port=0", `--user-data-dir=${profil}`, `--window-size=${breite},${hoehe}`, "--disable-popup-blocking", "about:blank"], { stdio: "ignore" });
    const datei = path.join(profil, "DevToolsActivePort");
    for (let i = 0; i < 100 && !fs.existsSync(datei); i++) await warte(100);
    if (!fs.existsSync(datei)) throw new Error("Chrome startet nicht");
    const [port, pfad] = fs.readFileSync(datei, "utf8").trim().split("\n");
    const b = new Browser(proc, profil, breite, hoehe);
    await b.verbinde(`ws://127.0.0.1:${port}${pfad}`);
    return b;
  }
  constructor(proc, profil, breite, hoehe) { Object.assign(this, { proc, profil, breite, hoehe, id: 0, offen: new Map(), hoerer: [] }); }
  verbinde(url) {
    return new Promise((ok, fehler) => {
      this.ws = new WebSocket(url);
      this.ws.onopen = () => ok();
      this.ws.onerror = (e) => fehler(new Error("CDP: " + (e.message || "Verbindung fehlgeschlagen")));
      this.ws.onmessage = (m) => {
        const d = JSON.parse(m.data);
        if (d.id && this.offen.has(d.id)) { const { ok: a, fehler: f } = this.offen.get(d.id); this.offen.delete(d.id); d.error ? f(new Error(d.error.message)) : a(d.result); }
        else if (d.method) for (const h of this.hoerer) h(d);
      };
    });
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    return new Promise((ok, fehler) => this.offen.set(id, { ok, fehler }));
  }
  auf(h) { this.hoerer.push(h); return () => (this.hoerer = this.hoerer.filter((x) => x !== h)); }
  async seite(url) {
    const { targetId } = await this.send("Target.createTarget", { url: "about:blank" });
    const s = await this.anhaengen(targetId);
    if (url) await s.gehe(url);
    return s;
  }
  async anhaengen(targetId) {
    const { sessionId } = await this.send("Target.attachToTarget", { targetId, flatten: true });
    const s = new Seite(this, targetId, sessionId);
    await s.init();
    return s;
  }
  async ziele() { return (await this.send("Target.getTargets")).targetInfos.filter((t) => t.type === "page"); }
  async schliesse() {
    try { this.ws.close(); } catch { /* already closed */ }
    this.proc.kill();
    await warte(300);
    fs.rmSync(this.profil, { recursive: true, force: true });
  }
}

export class Seite {
  constructor(b, targetId, sessionId) { Object.assign(this, { b, targetId, sessionId, fehler: [] }); }
  async init() {
    const s = this.sessionId;
    this.ab = this.b.auf((d) => {
      if (d.sessionId !== s) return;
      if (d.method === "Runtime.exceptionThrown") this.fehler.push((d.params.exceptionDetails.exception || {}).description || d.params.exceptionDetails.text);
      else if (d.method === "Runtime.consoleAPICalled" && d.params.type === "error") this.fehler.push(d.params.args.map((a) => a.value ?? a.description ?? "").join(" "));
      else if (d.method === "Log.entryAdded" && d.params.entry.level === "error") this.fehler.push(`${d.params.entry.text} ${d.params.entry.url || ""}`.trim());
      else if (d.method === "Page.javascriptDialogOpening") this.b.send("Page.handleJavaScriptDialog", { accept: true }, s).catch(() => {});
      else if (d.method === "Page.fileChooserOpened") this.dateiwahl = true;
    });
    await Promise.all(["Runtime.enable", "Page.enable", "Log.enable"].map((m) => this.b.send(m, {}, s)));
    await this.b.send("Page.setInterceptFileChooserDialog", { enabled: true }, s);
    await this.b.send("Emulation.setDeviceMetricsOverride", { width: this.b.breite, height: this.b.hoehe, deviceScaleFactor: 1, mobile: false }, s);
  }
  send(m, p) { return this.b.send(m, p, this.sessionId); }
  async werte(ausdruck) {
    const r = await this.send("Runtime.evaluate", { expression: ausdruck, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text);
    return r.result.value;
  }
  async gehe(url) {
    await this.send("Page.navigate", { url });
    await this.warteAuf("document.readyState === 'complete'", 15000);
  }
  async warteAuf(ausdruck, ms = 8000) {
    const ende = Date.now() + ms;
    while (Date.now() < ende) {
      try { if (await this.werte(`!!(${ausdruck})`)) return true; } catch { /* page is loading */ }
      await warte(50);
    }
    return false;
  }
  async bild(datei) {
    const { data } = await this.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(datei, Buffer.from(data, "base64"));
  }
  async pdf(datei) {
    const { data } = await this.send("Page.printToPDF", { landscape: true, printBackground: true, preferCSSPageSize: true });
    fs.writeFileSync(datei, Buffer.from(data, "base64"));
    return Buffer.from(data, "base64");
  }
  async taste(key) {
    const code = { " ": "Space", ArrowRight: "ArrowRight", ArrowLeft: "ArrowLeft", Escape: "Escape" }[key] || key;
    await this.send("Input.dispatchKeyEvent", { type: "keyDown", key, code, text: key.length === 1 ? key : undefined });
    await this.send("Input.dispatchKeyEvent", { type: "keyUp", key, code });
  }
  async zu() { this.ab(); await this.b.send("Target.closeTarget", { targetId: this.targetId }).catch(() => {}); }
}
export { warte };
