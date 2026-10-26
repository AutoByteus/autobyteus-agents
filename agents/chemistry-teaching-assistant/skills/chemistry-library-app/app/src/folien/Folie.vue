<script setup>
// One slide on a 1920×1080 stage, scaled to its container.
// modus: "live" (interactive), "statisch" (thumbnail: no interaction, no motion),
//        "ende" (all animation steps done; print and PPTX).
import { computed, provide, ref, watch, onMounted, onBeforeUnmount, toRef } from "vue";
import Baustein from "./Baustein.vue";
import { TYPEN } from "../shared/schema.js";

const props = defineProps({
  folie: { type: Object, required: true },
  modus: { type: String, default: "live" },
  schritt: { type: Number, default: 0 },
  loesungen: { type: Boolean, default: false },
  kennung: { type: Boolean, default: true },
});
const emit = defineEmits(["update:schritt"]);

const MEDIEN = new Set(["bild", "svg", "schritte", "regler", "hotspot"]);
const gruppen = computed(() => {
  const m = [], a = [];
  for (const b of props.folie.bausteine) (MEDIEN.has(b.art) ? m : a).push(b);
  return { m, a };
});
const layout = computed(() => {
  const l = props.folie.layout;
  if (l === "voll") return "voll";
  if (!gruppen.value.m.length || !gruppen.value.a.length) return "voll";
  return l === "bild-rechts" ? "bild-rechts" : "bild-links";
});

// Global step → step of each step animation, in order.
const anteile = computed(() => {
  let rest = props.modus === "ende" ? Infinity : props.schritt;
  return props.folie.bausteine.map((b) => {
    const n = b.art === "schritte" ? (b.schritte || []).length - 1 : 0;
    const k = Math.min(n, Math.max(0, rest));
    rest -= n;
    return k;
  });
});
function setzeTeil(index, k) {
  let vorher = 0;
  props.folie.bausteine.forEach((b, i) => { if (i < index && b.art === "schritte") vorher += b.schritte.length - 1; });
  emit("update:schritt", vorher + k);
}
provide("folienModus", toRef(props, "modus"));
provide("loesungenAn", toRef(props, "loesungen"));

const huelle = ref(null);
const skala = ref(0.2);
let beobachter;
function messe() {
  const el = huelle.value;
  if (!el) return;
  skala.value = Math.min(el.clientWidth / 1920, el.clientHeight / 1080) || 0.01;
}
onMounted(() => { messe(); beobachter = new ResizeObserver(messe); beobachter.observe(huelle.value); });
onBeforeUnmount(() => beobachter && beobachter.disconnect());
watch(() => props.folie.id, messe);
</script>

<template>
  <div ref="huelle" class="folie-huelle">
    <div class="folie" :class="['m-' + modus]" :style="{ transform: `translate(-50%,-50%) scale(${skala})` }" :data-folie="folie.id">
      <div v-if="kennung" class="f-kopf"><span class="f-typ" :class="'t-' + folie.typ">{{ TYPEN[folie.typ] }}</span></div>
      <h1 class="f-frage" v-html="folie.frage"></h1>
      <div class="f-rumpf" :class="'l-' + layout">
        <template v-if="layout === 'voll'">
          <div class="f-spalte">
            <Baustein v-for="(b, i) in folie.bausteine" :key="folie.id + i" :b="b" :schritt="anteile[i]" @schritt="setzeTeil(i, $event)" />
          </div>
        </template>
        <template v-else>
          <div class="f-spalte f-medien">
            <template v-for="(b, i) in folie.bausteine" :key="folie.id + 'm' + i">
              <Baustein v-if="MEDIEN.has(b.art)" :b="b" :schritt="anteile[i]" @schritt="setzeTeil(i, $event)" />
            </template>
          </div>
          <div class="f-spalte f-aktion">
            <template v-for="(b, i) in folie.bausteine" :key="folie.id + 'a' + i">
              <Baustein v-if="!MEDIEN.has(b.art)" :b="b" :schritt="anteile[i]" @schritt="setzeTeil(i, $event)" />
            </template>
          </div>
        </template>
      </div>
      <p v-if="folie.merke" class="f-merke"><span>Merke</span> <span v-html="folie.merke"></span></p>
    </div>
  </div>
</template>
