<script setup>
// Exported lesson. Student file: slides with navigation, no notes. Teacher file: overview and
// presenter view; the audience window is written from this file without the notes.
import { ref } from "vue";
import Leinwand from "../folien/Leinwand.vue";
import Vortrag from "../folien/Vortrag.vue";
import Folie from "../folien/Folie.vue";

const D = window.CHEM_EXPORT;
const nachId = Object.fromEntries(D.folien.map((f) => [f.id, f]));
const folie = (id) => nachId[id];
const notiz = (id) => (D.notizen ? D.notizen[id] || "" : "");
const ids = D.folien.map((f) => f.id);
const praesentiert = ref(false);
const gesamt = D.folien.reduce((s, f) => s + (f.min || 0), 0);

function oeffnePublikum() {
  const w = window.open("", "chem-publikum-export", "popup,width=1280,height=760");
  if (!w) return null;
  const ohneNotizen = { ...D, notizen: null, lehrkraft: false, publikum: true };
  const stil = document.getElementById("chem-stil").textContent;
  const skript = document.getElementById("chem-player").textContent;
  const json = JSON.stringify(ohneNotizen).replace(/</g, "\\u003c");
  w.document.open();
  w.document.write(`<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><title>${(D.titel || "").replace(/[<&]/g, "")}</title><style>${stil.replace(/<\/style/gi, "<\\/style")}</style></head><body><div id="app"></div><script>window.CHEM_EXPORT=${json};<\/script><script>${skript.replace(/<\/script/gi, "<\\/script")}<\/script></body></html>`);
  w.document.close();
  return w;
}
</script>

<template>
  <Leinwand v-if="D.publikum" :folie="folie" />
  <Leinwand v-else-if="!D.lehrkraft" :folie="folie" :liste="ids" eigenstaendig />
  <Vortrag v-else-if="praesentiert" :liste="ids" :folie="folie" :notiz="notiz" :titel="D.titel" :minuten-geplant="gesamt" :oeffne-publikum="oeffnePublikum" @ende="praesentiert = false" />
  <div v-else class="p-start">
    <header><h1>{{ D.titel }}</h1><p>{{ ids.length }} Folien · {{ gesamt }} min · Lehrkraft-Fassung mit Notizen</p>
      <button class="p-knopf" @click="praesentiert = true">▶ Präsentieren</button></header>
    <p class="p-hinweis">„Präsentieren“ öffnet ein Publikumsfenster nur mit Folien. Diese Fassung enthält Notizen: nicht an Schülerinnen und Schüler weitergeben.</p>
    <ol class="p-liste">
      <li v-for="f in D.folien" :key="f.id"><div class="p-bild"><Folie :folie="f" modus="statisch" /></div><div><b>{{ f.titel }}</b><small>{{ f.id }} · {{ f.min }} min</small><div class="p-notiz" v-html="notiz(f.id)"></div></div></li>
    </ol>
  </div>
</template>
