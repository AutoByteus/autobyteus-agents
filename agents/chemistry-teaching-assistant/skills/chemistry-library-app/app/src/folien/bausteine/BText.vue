<script setup>
defineProps({ b: Object });
</script>
<template><p class="text" v-html="b.text"></p></template>
