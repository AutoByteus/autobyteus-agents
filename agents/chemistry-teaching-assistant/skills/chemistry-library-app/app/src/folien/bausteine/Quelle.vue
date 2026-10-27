<script setup>
// Credit line for a photo (small, exempt from the font-size rule).
defineProps({ q: Object });
</script>
<template>
  <p v-if="q" class="quelle">{{ q.titel ? q.titel + " · " : "" }}{{ q.urheber }}{{ q.lizenz ? " · " + q.lizenz : "" }}</p>
</template>
