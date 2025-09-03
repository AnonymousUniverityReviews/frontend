import { useSessionStore } from "~/stores/session"
import { pageObjects } from "~/constants/global";

function validateObjectIDRateURL(path: string): boolean {
    // Regex for URL path in format "/[object]/[id]/rate"
    const regex = /^\/(\w+)\/(\d+)\/rate$/;

    if (regex.test(path)) {
        const [, object, id] = regex.exec(path)!;

        const session = useSessionStore();
        
        if (!session.authorized) {
            return false;
        }

        if (!pageObjects.includes(object!)) {
            return false;
        }
    }

    return true;
}

export default defineNuxtRouteMiddleware(async (to, from)=> {
    if (to.path === '/login-frame' || from.path === '/login-frame') return;

    if (import.meta.server) return;

    const session = useSessionStore();

    if (!session.loaded) {
        await session.checkIfAuthorizedGlobally();
        session.markFirstLoad();
    }

    if (!validateObjectIDRateURL(to.path)) {
        return abortNavigation("Not authorized.");
    }
})