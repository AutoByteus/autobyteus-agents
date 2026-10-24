<script setup>
defineProps({ b: Object });
</script>
<template>
  <figure class="svg" role="img" :aria-label="b.alt">
    <div class="svg-flaeche" v-html="b.svg"></div>
    <figcaption v-if="b.unterschrift" v-html="b.unterschrift"></figcaption>
  </figure>
</template>
