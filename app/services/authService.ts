import { api } from "~/services/api";

export function getLoginState() {
    return api<{ loggedIn: boolean }>('/auth/status');
}