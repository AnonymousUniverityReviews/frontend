import { api } from "~/services/api";

export function getLoginState() {
    return api<{ loggedIn: boolean, userData: { id: number } }>('/auth/status');
}