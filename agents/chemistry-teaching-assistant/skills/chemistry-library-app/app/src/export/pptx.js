// PowerPoint export: every slide as a picture (end state, solutions hidden), notes as speaker notes.
import { createApp, nextTick } from "vue";
import Folie from "../folien/Folie.vue";
import { ladeSkript, folieDaten, notiz, ladeFolien } from "../app/store.js";

export function notizText(html) {
  const d = document.createElement("div");
  d.innerHTML = String(html || "").replace(/<\/(p|li|h\d|div)>/gi, "\n").replace(/<br\s*\/?>/gi, "\n").replace(/<li>/gi, "• ");
  return (d.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
}
const warteBilder = (el) => Promise.all([...el.querySelectorAll("img")].map((i) => (i.complete ? null : new Promise((ok) => { i.onload = i.onerror = ok; }))));

export async function exportPptx(ids, titel, melde = () => {}) {
  await ladeFolien(ids, { lehrkraft: true });
  await ladeSkript("app/pptx.js");
  const { PptxGenJS, toPng } = window.ChemPptx;
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.title = titel;
  const host = document.createElement("div");
  host.style.cssText = "position:fixed;left:-40000px;top:0;width:1920px;height:1080px;";
  document.body.appendChild(host);
  try {
    for (const [i, id] of ids.entries()) {
      melde(`PowerPoint: Folie ${i + 1} von ${ids.length} …`);
      const f = folieDaten(id);
      if (!f) continue;
      const app = createApp(Folie, { folie: f, modus: "ende" });
      app.mount(host);
      await nextTick(); await document.fonts.ready; await warteBilder(host);
      await new Promise((r) => setTimeout(r, 60));
      const bild = await toPng(host.firstElementChild, { width: 1920, height: 1080, pixelRatio: 1, cacheBust: false, fontEmbedCSS: window.CHEM_SCHRIFTEN || "" });
      app.unmount();
      const s = pptx.addSlide();
      s.addImage({ data: bild, x: 0, y: 0, w: 13.333, h: 7.5 });
      const n = notizText(notiz(id));
      if (n) s.addNotes(n);
    }
  } finally { host.remove(); }
  return pptx.write({ outputType: "blob" });
}
