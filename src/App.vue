<script setup lang="ts">
import { useCounterStore } from './stores/counter'

const counter = useCounterStore()
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Contador: {{ counter.count }}</h1>
    <button
      @click="counter.increment"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Incrementar
    </button>
  </div>
</template>

<style scoped>
/* Estilo opcional */
</style>
