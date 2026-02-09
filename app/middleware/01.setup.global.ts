import { useSessionStore } from "~/stores/session"

export default defineNuxtRouteMiddleware(async (to, from)=> {
    if (to.path === '/login-frame' || from.path === '/login-frame') return;

    if (import.meta.server) return;

    const session = useSessionStore();

    if (!session.loaded) {
        const authorized = await session.checkIfAuthorizedGlobally();
        if (authorized) {
            session.markFirstLoad();
        }
        else {
            // navigateTo(`/api/auth/signin`, { external: true });
        }
    }
})