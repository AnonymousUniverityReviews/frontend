export default defineNuxtRouteMiddleware(async (to, from)=> {
    if (import.meta.server) return;

    // Here should be some code if needed...
})