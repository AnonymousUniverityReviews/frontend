import * as client from 'openid-client';

export default defineEventHandler(async (event) => {
    // const config: client.Configuration = await client.discovery(
    //     new URL("http://localhost:8080/.well-known/openid-configuration"),
    //     "mvc",
    //     undefined,
    //     undefined,
    //     {
    //         execute: [client.allowInsecureRequests]
    //     }
    // )

    // const code_verifier = getCookie(event, 'code_verifier');
    // const state = getCookie(event, 'pkce_state');

    // let getCurrentUrl = (...args: any): URL => {
    //     return new URL(getRequestURL(event));
    // }

    // let tokens: client.TokenEndpointResponse = await client.authorizationCodeGrant(
    //     config,
    //     getCurrentUrl(),
    //     {
    //         pkceCodeVerifier: code_verifier
    //     },
    // )

    deleteCookie(event, 'access_token');
    deleteCookie(event, 'id_token');
    deleteCookie(event, 'refresh_token');

    return sendRedirect(event, '/'); // back to frontend
});
