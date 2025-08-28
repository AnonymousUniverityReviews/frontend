export default defineEventHandler(async (event) => {
    const loggedIn = getCookie(event, 'access_token');

    return {
        loggedIn: Boolean(loggedIn)
    };
});
