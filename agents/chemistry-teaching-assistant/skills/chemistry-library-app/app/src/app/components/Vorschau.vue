<script setup>
// Large interactive preview of one slide, with its notes for the teacher. Esc or ✕ closes; ← → browse.
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import Folie from "../../folien/Folie.vue";
import { folieInfo, folieDaten, notiz, ladeFolien, inStunde, umschalten } from "../store.js";
const props = defineProps({ id: String, liste: { type: Array, default: () => [] } });
const emit = defineEmits(["zu", "wechsel"]);
const schritt = ref(0);
const loesungen = ref(false);
const info = computed(() => folieInfo(props.id));
const daten = computed(() => folieDaten(props.id));
watch(() => props.id, (id) => { schritt.value = 0; loesungen.value = false; ladeFolien([id], { lehrkraft: true }); }, { immediate: true });
const pos = computed(() => props.liste.indexOf(props.id));
function blaettern(d) { const z = props.liste[pos.value + d]; if (z) emit("wechsel", z); }
function taste(e) {
  if (e.key === "Escape") emit("zu");
  else if (e.key === "ArrowRight" && !e.target.closest("input")) blaettern(1);
  else if (e.key === "ArrowLeft" && !e.target.closest("input")) blaettern(-1);
}
onMounted(() => addEventListener("keydown", taste));
onBeforeUnmount(() => removeEventListener("keydown", taste));
</script>

<template>
  <div class="modal" @click.self="emit('zu')">
    <div class="modal-in vorschau">
      <div class="vs-kopf">
        <b>{{ id }}</b> · {{ info.titel }} · {{ info.min }} min
        <span class="vs-knoepfe">
          <button class="k2" :disabled="pos <= 0" title="vorherige Folie (←)" @click="blaettern(-1)">◀</button>
          <button class="k2" :disabled="pos < 0 || pos >= liste.length - 1" title="nächste Folie (→)" @click="blaettern(1)">▶</button>
          <button class="k2" @click="loesungen = !loesungen">{{ loesungen ? "Lösungen verbergen" : "Lösungen zeigen" }}</button>
          <button class="k2" :class="inStunde(id) ? 'raus' : 'rein'" @click="umschalten(id)">{{ inStunde(id) ? "✓ entfernen" : "+ Stunde" }}</button>
          <button class="k2" title="schließen (Esc)" @click="emit('zu')">✕</button>
        </span>
      </div>
      <div class="vs-rumpf">
        <div class="vs-folie"><Folie v-if="daten" :key="id" v-model:schritt="schritt" :folie="daten" :loesungen="loesungen" /></div>
        <aside class="vs-notizen"><h4>Notizen für die Lehrkraft</h4><div v-html="notiz(id) || '<p>Keine Notizen.</p>'"></div></aside>
      </div>
    </div>
  </div>
</template>
