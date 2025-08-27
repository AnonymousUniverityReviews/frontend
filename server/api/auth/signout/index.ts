import * as client from 'openid-client';
import { getOIDCConfig } from '~~/server/utils/oidc';

export default defineEventHandler(async (event) => {
    const config = await getOIDCConfig();

    const id_token_hint = getCookie(event, 'id_token') ?? "";

    const parameters: Record<string, string> = {
        post_logout_redirect_uri: 'http://localhost:8001/api/auth/signout/callback',
        id_token_hint
    }

    const redirectTo: URL = client.buildEndSessionUrl(config, parameters);

    const redirectFrom = sanitizeRedirectURL(getQuery(event).redirect as string);
    console.log(redirectFrom);
    setCookie(event, 'redirect_url', redirectFrom, {
        httpOnly: true,
        sameSite: 'lax'
    });

    return sendRedirect(event, redirectTo.href);
});
