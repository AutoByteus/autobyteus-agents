<script setup>
// Step animation: elements of the SVG (by id) appear, disappear or get a class per step.
// Steps are cumulative: step k applies steps 0..k.
import { computed, inject, onMounted, ref, watch, nextTick } from "vue";
const props = defineProps({ b: Object, schritt: { type: Number, default: 0 } });
const emit = defineEmits(["schritt"]);
const modus = inject("folienModus", ref("live"));
const flaeche = ref(null);
const n = computed(() => props.b.schritte.length - 1);
const liste = (v) => (Array.isArray(v) ? v : v ? String(v).split(/[\s,]+/) : []).filter(Boolean);
const klassen = (v) => {
  if (!v) return [];
  if (typeof v === "object" && !Array.isArray(v)) return Object.entries(v);
  return liste(v).map((e) => e.split(":"));
};
function anwenden() {
  const el = flaeche.value;
  if (!el) return;
  const alle = new Set();
  props.b.schritte.forEach((s) => liste(s.zeigen).forEach((id) => alle.add(id)));
  const finde = (id) => el.querySelector(`[id="${id}"]`);
  for (const id of alle) finde(id)?.classList.add("aus");
  props.b.schritte.forEach((s) => klassen(s.klasse).forEach(([id, k]) => k && finde(id)?.classList.remove(k)));
  for (let i = 0; i <= props.schritt && i < props.b.schritte.length; i++) {
    const s = props.b.schritte[i];
    liste(s.zeigen).forEach((id) => finde(id)?.classList.remove("aus"));
    liste(s.verbergen).forEach((id) => finde(id)?.classList.add("aus"));
    klassen(s.klasse).forEach(([id, k]) => k && finde(id)?.classList.add(k));
  }
}
onMounted(anwenden);
watch(() => [props.schritt, props.b], () => nextTick(anwenden));
const text = computed(() => props.b.schritte[Math.min(props.schritt, n.value)]?.text || "");
</script>
<template>
  <figure class="schritte" role="img" :aria-label="b.alt">
    <div ref="flaeche" class="svg-flaeche" v-html="b.svg"></div>
    <figcaption class="schritt-text" v-html="text"></figcaption>
    <div v-if="modus === 'live' && n > 0" class="schritt-knoepfe">
      <button class="knopf rund" :disabled="schritt <= 0" title="Schritt zurück" @click="emit('schritt', schritt - 1)">◀</button>
      <span class="schritt-zahl">{{ Math.min(schritt, n) + 1 }} / {{ n + 1 }}</span>
      <button class="knopf rund" :disabled="schritt >= n" title="Nächster Schritt" @click="emit('schritt', schritt + 1)">▶</button>
    </div>
  </figure>
</template>
