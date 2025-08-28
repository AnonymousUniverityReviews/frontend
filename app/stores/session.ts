import { getLoginState } from "~/services/authService";

export const useSessionStore = defineStore('sessionStore', {
    state: () => ({
        authorized: false,
        loaded: false
    }),
    actions: {
        async checkIfAuthorizedLocally() {
            this.authorized = (await getLoginState()).loggedIn;
            return this.authorized;
        },
        async checkIfAuthorizedGlobally() {
            /**
             * In future this function will not be identical to checkIfAuthorizedLocally.
             * checkIfAuthorizedLocally will check only for existance of token inside user's cookies,
             * while checkIfAuthorizedGlobally will try to verify token from cookies on back-end side.
             */
            this.authorized = (await getLoginState()).loggedIn;
            return this.authorized;
        },
        markFirstLoad() {
            this.loaded = true;
        }
    }
})