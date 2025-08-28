import { getLoginState } from "~/services/authService";

export const useSessionStore = defineStore('sessionStore', {
    state: () => ({
        authorized: false,
        loaded: false
    }),
    actions: {
        async checkIfAuthorized() {
            this.authorized = (await getLoginState()).loggedIn;
            return this.authorized;
        },
        markFirstLoad() {
            this.loaded = true;
        }
    }
})