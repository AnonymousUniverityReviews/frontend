<template>
    <div class="flex w-screen h-screen items-center justify-center">
        Redirecting...
    </div>
</template>

<script setup lang="ts">
onMounted(() => {
    const safeFrom = getSafeRedirectURL(history.state.back);
    navigateTo(`/api/auth/signin?redirect=${safeFrom}`, { external: true })
})
</script>