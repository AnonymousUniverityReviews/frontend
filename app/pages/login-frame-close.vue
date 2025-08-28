<template>
    <div class="flex w-screen h-screen items-center justify-center">
        Login process complete. Finishing...
    </div>
</template>

<script setup lang="ts">
onMounted(() => {
    if (window.parent) {
        window.parent.postMessage({ action: 'close-login-frame' }, window.location.origin)
    }
});
</script>