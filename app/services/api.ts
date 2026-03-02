import { useOidcAuth } from '../composables/useOidcAuth'

export async function api<T>(
    url: string,
    options: any = {}
) {
    const config = useRuntimeConfig()
    const { accessToken } = useOidcAuth()

    try {
        const headers = new Headers(options.headers || {})
        if (accessToken.value) {
            headers.set('Authorization', `Bearer ${accessToken.value}`)
        }

        // Use relative path to call the Nuxt server proxy (which injects the token)
        console.log(`[API Proxy] Calling /api/proxy${url} with options:`, options)
        return await $fetch<T>(`/api/proxy${url}`, {
            ...options,
            headers
        })
    } catch (err: any) {
        console.error("API Error:", err)
        throw err
    }
}