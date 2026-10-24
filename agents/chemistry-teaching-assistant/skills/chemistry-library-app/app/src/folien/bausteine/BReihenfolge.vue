<script setup>
import { inject, ref, computed } from "vue";
const props = defineProps({ b: Object });
const modus = inject("folienModus", ref("live"));
const loesungen = inject("loesungenAn", ref(false));
const live = computed(() => modus.value === "live");
// Fixed shuffle (same on every screen): reverse the second half, then interleave.
function mische(n) {
  const a = [...Array(n).keys()];
  const m = a.filter((i) => i % 2).concat(a.filter((i) => !(i % 2)).reverse());
  return m.join() === a.join() ? a.reverse() : m;
}
const folge = ref(mische(props.b.elemente.length));
const geprueft = ref(false);
const aufgeloest = computed(() => loesungen.value);
const anzeige = computed(() => (aufgeloest.value ? props.b.elemente.map((_, i) => i) : folge.value));
function schiebe(pos, d) {
  const z = pos + d;
  if (z < 0 || z >= folge.value.length) return;
  const f = [...folge.value];[f[pos], f[z]] = [f[z], f[pos]]; folge.value = f; geprueft.value = false;
}
const richtig = computed(() => folge.value.filter((e, pos) => e === pos).length);
</script>
<template>
  <div class="reihenfolge">
    <ol>
      <li v-for="(e, pos) in anzeige" :key="e" :class="{ ok: (geprueft || aufgeloest) && e === pos, no: geprueft && !aufgeloest && e !== pos }">
        <span class="rf-text" v-html="b.elemente[e]"></span>
        <span v-if="live && !aufgeloest" class="rf-knoepfe">
          <button class="knopf rund" :disabled="pos === 0" title="nach oben" @click="schiebe(pos, -1)">▲</button>
          <button class="knopf rund" :disabled="pos === anzeige.length - 1" title="nach unten" @click="schiebe(pos, 1)">▼</button>
        </span>
      </li>
    </ol>
    <div v-if="live" class="leiste">
      <button class="knopf" @click="geprueft = true">Prüfen</button>
      <span v-if="geprueft" class="ergebnis">{{ richtig }} von {{ b.elemente.length }} an der richtigen Stelle</span>
    </div>
    <div v-if="b.aufloesung && (aufgeloest || (geprueft && richtig === b.elemente.length))" class="hinweis" v-html="b.aufloesung"></div>
  </div>
</template>
