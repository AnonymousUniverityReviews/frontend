import * as client from 'openid-client';

export default defineEventHandler(async (event) => {
    const config: client.Configuration = await client.discovery(
        new URL("http://localhost:8080/.well-known/openid-configuration"),
        "mvc",
        undefined,
        undefined,
        {
            execute: [client.allowInsecureRequests]
        }
    )

    const id_token_hint = getCookie(event, 'id_token') ?? "";

    const parameters: Record<string, string> = {
        post_logout_redirect_uri: 'http://localhost:8001/api/auth/signout/callback',
        id_token_hint
    }

    const redirectTo: URL = client.buildEndSessionUrl(config, parameters);

    return sendRedirect(event, redirectTo.href);
});
