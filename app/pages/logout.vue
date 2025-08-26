<template>
    <div class="flex w-screen h-screen items-center justify-center">
        Redirecting...
    </div>
</template>

<script setup lang="ts">
onMounted(() => {
    navigateTo('/api/auth/signout', { external: true })
})
</script>