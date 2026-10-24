<script setup>
defineProps({ b: Object });
</script>
<template>
  <div class="gleichung">
    <p v-if="b.wort" class="wort" v-html="b.wort"></p>
    <p class="formel" v-html="b.html"></p>
  </div>
</template>
