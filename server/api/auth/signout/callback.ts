export default defineEventHandler(async (event) => {
    deleteCookie(event, 'access_token');
    deleteCookie(event, 'id_token');
    deleteCookie(event, 'refresh_token');

    return sendRedirect(event, '/'); // back to frontend
});
