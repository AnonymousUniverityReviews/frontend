import * as client from 'openid-client';

let cachedConfig: client.Configuration | null = null;

export async function getOIDCConfig() {
    if (!cachedConfig) {
        const { oidc } = useRuntimeConfig();

        if (process.env.NODE_ENV === 'development') {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        }

        cachedConfig = await client.discovery(
            new URL(oidc.issuer),
            oidc.clientId,
            oidc.clientSecret,
            undefined,
            process.env.NODE_ENV === 'development' ? { 
                execute: [client.allowInsecureRequests] 
            } : undefined
        );
    }
    return cachedConfig;
}