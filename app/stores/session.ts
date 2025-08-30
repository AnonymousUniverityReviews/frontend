import { getLoginState } from "~/services/authService";

export const useSessionStore = defineStore('sessionStore', {
    state: () => ({
        authorized: false,
        loaded: false,
        userData: {
            id: 0
        }
    }),
    actions: {
        async checkIfAuthorizedLocally() {
            const loginState = await getLoginState();
            this.authorized = loginState.loggedIn;
            this.userData = loginState.userData;
            return this.authorized;
        },
        async checkIfAuthorizedGlobally() {
            /**
             * In future this function will not be identical to checkIfAuthorizedLocally.
             * checkIfAuthorizedLocally will check only for existance of token inside user's cookies,
             * while checkIfAuthorizedGlobally will try to verify token from cookies on back-end side.
             */
            const loginState = await getLoginState();
            this.authorized = loginState.loggedIn;
            this.userData = loginState.userData;
            return this.authorized;
        },
        markFirstLoad() {
            this.loaded = true;
        }
    }
})