export async function api<T>(
    url: string,
    options: any = {}
) {
    const config = useRuntimeConfig()

    // Auth is handled server-side now
    
    try {
        // Use relative path to call the Nuxt server proxy (which injects the token)
        console.log(`[API Proxy] Calling /api/proxy${url} with options:`, options)
        return await $fetch<T>(`/api/proxy${url}`, {
            ...options,
            // headers will be handled by the server proxy
        })
    } catch (err: any) {
        console.error("API Error:", err)
        throw err
    }
}