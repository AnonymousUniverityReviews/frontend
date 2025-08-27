export default defineEventHandler(async (event) => {
    deleteCookie(event, 'access_token');
    deleteCookie(event, 'id_token');
    deleteCookie(event, 'refresh_token');

    const redirectTo = getSafeRedirectURL(getCookie(event, "redirect_url"));
    deleteCookie(event, "redirect_url");

    return sendRedirect(event, redirectTo); // back to frontend
});
