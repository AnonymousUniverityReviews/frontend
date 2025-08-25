<template>
<p v-if="id">Test, id: {{ id }}</p>
<p v-else>Test, no id!</p>
</template>

<script setup lang="ts">
const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
const id = route.params.id;
</script>