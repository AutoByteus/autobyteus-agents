<script setup>
// Tap a card, then a compartment (works on boards and tablets); dragging also works with a mouse.
import { inject, ref, computed } from "vue";
const props = defineProps({ b: Object });
const modus = inject("folienModus", ref("live"));
const live = computed(() => modus.value === "live");
const ort = ref(props.b.karten.map(() => null));
const gewaehlt = ref(null);
const geprueft = ref(false);
const imFach = (f) => props.b.karten.map((k, i) => ({ k, i })).filter((e) => ort.value[e.i] === f);
const frei = computed(() => props.b.karten.map((k, i) => ({ k, i })).filter((e) => ort.value[e.i] === null));
function waehle(i) { if (!live.value) return; geprueft.value = false; gewaehlt.value = gewaehlt.value === i ? null : i; }
function lege(f) {
  if (gewaehlt.value === null) return;
  ort.value[gewaehlt.value] = f; gewaehlt.value = null; geprueft.value = false;
}
function ziehStart(e, i) { e.dataTransfer.setData("text/plain", String(i)); gewaehlt.value = i; }
function ablegen(e, f) { e.preventDefault(); const i = +e.dataTransfer.getData("text/plain"); if (!Number.isNaN(i)) { gewaehlt.value = i; lege(f); } }
const richtig = computed(() => props.b.karten.filter((k, i) => ort.value[i] === k.fach).length);
function zuruecksetzen() { ort.value = props.b.karten.map(() => null); geprueft.value = false; gewaehlt.value = null; }
</script>
<template>
  <div class="sortieren">
    <div class="pool" @click.self="lege(null)" @dragover.prevent @drop="ablegen($event, null)">
      <button v-for="e in frei" :key="e.i" class="sk" :class="{ sel: gewaehlt === e.i }" :disabled="!live" :draggable="live" @click="waehle(e.i)" @dragstart="ziehStart($event, e.i)">
        <img v-if="e.k.bild" :src="e.k.bild" alt="" draggable="false"><span v-html="e.k.text"></span>
      </button>
      <span v-if="!frei.length" class="leer">alle Karten liegen</span>
    </div>
    <div class="faecher" :style="{ '--n': b.faecher.length }">
      <div v-for="f in b.faecher" :key="f" class="fach" :class="{ ziel: gewaehlt !== null }" role="button" :aria-disabled="gewaehlt === null ? 'true' : null" tabindex="0" @click="lege(f)" @keydown.enter="lege(f)" @dragover.prevent @drop="ablegen($event, f)">
        <b>{{ f }}</b>
        <button v-for="e in imFach(f)" :key="e.i" class="sk" :class="{ sel: gewaehlt === e.i, ok: geprueft && e.k.fach === f, no: geprueft && e.k.fach !== f }" :disabled="!live" :draggable="live" @click.stop="waehle(e.i)" @dragstart="ziehStart($event, e.i)">
          <img v-if="e.k.bild" :src="e.k.bild" alt="" draggable="false"><span v-html="e.k.text"></span>
        </button>
      </div>
    </div>
    <div v-if="live" class="leiste">
      <button class="knopf" :disabled="frei.length === b.karten.length" @click="geprueft = true">Prüfen</button>
      <button class="knopf hell" :disabled="frei.length === b.karten.length && !geprueft" @click="zuruecksetzen">Neu</button>
      <span v-if="geprueft" class="ergebnis">{{ richtig }} von {{ b.karten.length }} richtig</span>
    </div>
    <div v-if="geprueft" class="rueck">
      <template v-for="(k, i) in b.karten" :key="i"><p v-if="k.rueckmeldung && ort[i] !== null && ort[i] !== k.fach" class="hinweis" v-html="k.rueckmeldung"></p></template>
    </div>
  </div>
</template>
