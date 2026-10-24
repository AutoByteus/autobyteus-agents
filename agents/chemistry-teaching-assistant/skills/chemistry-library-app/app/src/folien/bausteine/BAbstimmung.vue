<script setup>
// The teacher counts raised hands per answer, then reveals the solution.
// merken: counts are kept in this browser under that key; vergleich: shows the counts kept under
// another key as "vorher" (for example a vote before and after the lesson).
import { inject, ref, computed, watch } from "vue";
const props = defineProps({ b: Object });
const modus = inject("folienModus", ref("live"));
const loesungen = inject("loesungenAn", ref(false));
const live = computed(() => modus.value === "live");
const SCHLUESSEL = "chem-abstimmung:";
const lies = (k) => { try { const v = JSON.parse(localStorage.getItem(SCHLUESSEL + k) || "null"); return Array.isArray(v) && v.length === props.b.optionen.length ? v : null; } catch { return null; } };
const stimmen = ref((props.b.merken && live.value && lies(props.b.merken)) || props.b.optionen.map(() => 0));
const vorher = computed(() => (props.b.vergleich ? lies(props.b.vergleich) : null));
watch(stimmen, (v) => { if (props.b.merken && live.value) try { localStorage.setItem(SCHLUESSEL + props.b.merken, JSON.stringify(v)); } catch { /* storage blocked */ } }, { deep: true });
const offen = ref(false);
const zeigen = computed(() => offen.value || loesungen.value);
const max = computed(() => Math.max(1, ...stimmen.value, ...(vorher.value || [])));
const leer = computed(() => stimmen.value.every((x) => !x));
function neu() { stimmen.value = props.b.optionen.map(() => 0); offen.value = false; }
</script>
<template>
  <div class="abstimmung">
    <div v-for="(o, i) in b.optionen" :key="i" class="ab-zeile" :class="{ richtig: zeigen && o.richtig }">
      <span class="ab-text" v-html="o.text"></span>
      <span class="ab-balken"><i v-if="vorher" class="vorher" :style="{ width: (vorher[i] / max * 100) + '%' }"></i><i class="jetzt" :style="{ width: (stimmen[i] / max * 100) + '%' }"></i></span>
      <span class="ab-zahl">{{ stimmen[i] }}<small v-if="vorher" class="ab-vorher">vorher {{ vorher[i] }}</small></span>
      <span v-if="live" class="ab-knoepfe">
        <button class="knopf rund" title="eine Stimme weniger" :disabled="!stimmen[i]" @click="stimmen[i]--">−</button>
        <button class="knopf rund" title="eine Stimme mehr" @click="stimmen[i]++">+</button>
      </span>
    </div>
    <div v-if="live" class="leiste">
      <button class="knopf" @click="offen = !offen">{{ zeigen ? "Auflösung ausblenden" : "Auflösen" }}</button>
      <button class="knopf hell" :disabled="leer" title="Zähler auf null setzen (neue Klasse)" @click="neu">Neu zählen</button>
    </div>
    <div v-if="zeigen" class="hinweis" v-html="b.aufloesung"></div>
  </div>
</template>
