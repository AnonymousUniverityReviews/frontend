import { useSessionStore } from "~/stores/session"

export default defineNuxtRouteMiddleware(async (to, from)=> {
    if (import.meta.server) return;

    const session = useSessionStore();

    if (!session.loaded) {
        await session.checkIfAuthorized();
        session.markFirstLoad();
    }
})