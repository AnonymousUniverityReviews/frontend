import * as client from 'openid-client';
import { getOIDCConfig } from '~~/server/utils/oidc';

export default defineEventHandler(async (event) => {
    const config = await getOIDCConfig();

    const codeVerifier = client.randomPKCECodeVerifier();
    const codeChallenge = await client.calculatePKCECodeChallenge(codeVerifier);

    const parameters: Record<string, string> = {
        redirect_uri: 'http://localhost:8001/api/auth/signin/callback',
        scope: 'openid',
        code_challenge: codeChallenge,
        code_challenge_method: 'S256' 
    }
    let state: string = "";

    if (!config.serverMetadata().supportsPKCE()) {
        state = client.randomState();
        parameters.state = state;
    }

    const redirectTo: URL = client.buildAuthorizationUrl(config, parameters);

    // Store code verifier and state in a cookie
    setCookie(event, 'code_verifier', codeVerifier);
    // setCookie(event, 'pkce_state', state);

    const redirectFrom = sanitizeRedirectURL(getQuery(event).redirect as string);
    console.log(redirectFrom);
    setCookie(event, 'redirect_url', redirectFrom, {
        httpOnly: true,
        sameSite: 'lax'
    });

    return sendRedirect(event, redirectTo.href);
});