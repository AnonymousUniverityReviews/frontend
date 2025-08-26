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

    const code_verifier = getCookie(event, 'code_verifier');
    const state = getCookie(event, 'pkce_state');

    let getCurrentUrl = (...args: any): URL => {
        return new URL(getRequestURL(event));
    }

    let tokens: client.TokenEndpointResponse = await client.authorizationCodeGrant(
        config,
        getCurrentUrl(),
        {
            pkceCodeVerifier: code_verifier
        },
    )

    // console.log('Token Endpoint Response', tokens)

    deleteCookie(event, 'code_verifier');

    setCookie(event, 'access_token', tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: tokens.expires_in, // seconds
    });

    if (tokens.id_token) {
        setCookie(event, 'id_token', tokens.id_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
    }
    

    if (tokens.refresh_token) {
        setCookie(event, 'refresh_token', tokens.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });
    }

    return sendRedirect(event, '/'); // back to frontend
});
