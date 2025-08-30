export default defineEventHandler(async (event) => {
    const loggedIn = getCookie(event, 'access_token');

    return {
        loggedIn: Boolean(loggedIn),
        userData: {
            id: 100 // temporary, will be changed in future
        }
    };
});
