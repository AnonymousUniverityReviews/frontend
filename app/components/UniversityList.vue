<template>
  <div>
    <h2>Universities</h2>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <ul v-else>
      <li v-for="uni in universities" :key="uni.id">
        {{ uni.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Automatically uses the composable from composables/useBackendFetch.ts
// No import needed due to Nuxt auto-imports

const { data: universities, pending, error } = await useBackendFetch<any[]>('/api/proxy/universities')
</script>
