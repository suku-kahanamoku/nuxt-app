<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  width?: string,
}>();
</script>

<template>
  <img alt="Logo" class="logo" src="/assets/logo.svg" :width="width || 140" />
</template>

<style scoped>
</style>
