export default defineNuxtRouteMiddleware((to, from) => {
    const { loggedIn, login } = useOidcAuth();

    if (!loggedIn.value) {
        return navigateTo('/auth/login', { external: true });
    }
})