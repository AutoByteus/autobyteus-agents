<script setup>
// #/folie/<id>/<step>[/loesungen]: one slide on the whole page (tests, screenshots, quick look).
import { ref, computed } from "vue";
import Folie from "../../folien/Folie.vue";
import { route, folieDaten, ladeFolien } from "../store.js";
const id = computed(() => route.teile[0]);
const schritt = ref(+(route.teile[1] || 0));
const bereit = ref(false);
ladeFolien([id.value]).then(() => (bereit.value = true));
</script>
<template>
  <div class="einzel"><Folie v-if="bereit && folieDaten(id)" v-model:schritt="schritt" :folie="folieDaten(id)" :loesungen="route.teile[2] === 'loesungen'" :modus="route.teile[2] === 'ende' ? 'ende' : 'live'" /></div>
</template>
