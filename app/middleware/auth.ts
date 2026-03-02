export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.server) return;

    const nuxtApp = useNuxtApp();
    const oidc = nuxtApp.$oidc as any;

    if (!oidc) return;

    const user = await oidc.getUser();

    if (!user || user.expired) {
        await oidc.signinRedirect({ state: to.fullPath });
        return abortNavigation();
    }
});