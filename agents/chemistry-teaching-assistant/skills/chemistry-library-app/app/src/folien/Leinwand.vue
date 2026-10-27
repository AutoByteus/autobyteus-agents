<script setup>
// Audience view: only the slide. Driven by the presenter window, or on its own (eigenstaendig)
// when there is no presenter. It never receives notes.
import { computed, ref, onMounted, onBeforeUnmount, watch } from "vue";
import Folie from "./Folie.vue";

const props = defineProps({
  folie: { type: Function, required: true },
  eigenstaendig: { type: Boolean, default: false },
  liste: { type: Array, default: () => [] },
  vorbereiten: { type: Function, default: async () => {} },
});
const z = ref({ folien: props.liste, index: 0, schritt: 0, loesungen: false, schwarz: false });
const bereit = ref(props.eigenstaendig);
const aktuell = computed(() => props.folie(z.value.folien[z.value.index]));
const melde = (d) => window.opener && !window.opener.closed && window.opener.postMessage(d, "*");

async function nachricht(e) {
  const d = e.data;
  if (!d || d.chem !== "zeige") return;
  await props.vorbereiten(d.folien);
  z.value = d; bereit.value = true;
}
function weiter() {
  const f = aktuell.value;
  if (f && z.value.schritt < f.schritte) z.value.schritt++;
  else if (z.value.index < z.value.folien.length - 1) { z.value.index++; z.value.schritt = 0; z.value.loesungen = false; }
}
function zurueck() {
  if (z.value.schritt > 0) z.value.schritt--;
  else if (z.value.index > 0) { z.value.index--; const f = props.folie(z.value.folien[z.value.index]); z.value.schritt = f ? f.schritte : 0; z.value.loesungen = false; }
}
function taste(e) {
  if (e.target.closest && e.target.closest("input,textarea,select")) return;
  if (e.key === "f" || e.key === "F") { if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen(); return; }
  if (props.eigenstaendig) {
    if (["ArrowRight", " ", "PageDown", "Enter"].includes(e.key)) { e.preventDefault(); weiter(); }
    else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); zurueck(); }
    else if (e.key === "b" || e.key === "B" || e.key === ".") z.value.schwarz = !z.value.schwarz;
    else if (e.key === "l" || e.key === "L") z.value.loesungen = !z.value.loesungen;
    return;
  }
  if (["ArrowRight", "ArrowLeft", " ", "PageDown", "PageUp", "Enter", "Backspace", "b", "B", ".", "l", "L", "Home", "End", "g", "G", "z", "Z"].includes(e.key)) { e.preventDefault(); melde({ chem: "taste", key: e.key }); }
}
function schrittVonFolie(w) { if (props.eigenstaendig) z.value.schritt = w; else melde({ chem: "schritt", wert: w }); }
const bereitMelden = () => { if (!props.eigenstaendig) melde({ chem: "bereit" }); };
onMounted(() => { addEventListener("message", nachricht); addEventListener("keydown", taste); addEventListener("hashchange", bereitMelden); bereitMelden(); });
onBeforeUnmount(() => { removeEventListener("message", nachricht); removeEventListener("keydown", taste); removeEventListener("hashchange", bereitMelden); });
watch(() => props.liste, (l) => { if (props.eigenstaendig) z.value.folien = l; });
defineExpose({ weiter, zurueck });
</script>

<template>
  <div class="leinwand" :class="{ schwarz: z.schwarz }">
    <Folie v-if="bereit && aktuell && !z.schwarz" :key="z.folien[z.index]" :folie="aktuell" :schritt="z.schritt" :loesungen="z.loesungen" @update:schritt="schrittVonFolie" />
    <p v-if="!bereit" class="lw-warten">Warte auf das Präsentationsfenster …</p>
    <div v-if="eigenstaendig && bereit" class="lw-nav">
      <button class="lw-k" title="zurück (←)" @click="zurueck">◀</button>
      <span>{{ z.index + 1 }} / {{ z.folien.length }}</span>
      <button class="lw-k" title="weiter (→)" @click="weiter">▶</button>
    </div>
  </div>
</template>
