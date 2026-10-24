<script setup>
import Quelle from "./Quelle.vue";
defineProps({ b: Object });
</script>
<template>
  <figure class="bild">
    <img :src="b.datei" :alt="b.alt" draggable="false">
    <figcaption v-if="b.unterschrift" v-html="b.unterschrift"></figcaption>
    <Quelle :q="b.quelle" />
  </figure>
</template>
