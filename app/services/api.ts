export async function api<T>(
    url: string,
    options: any = {}
) {
    const config = useRuntimeConfig()

    // Auth is handled server-side now
    
    try {
        // Use relative path to call the Nuxt server proxy (which injects the token)
        return await $fetch<T>(`/api${url}`, {
            ...options,
            // headers will be handled by the server proxy
        })
    } catch (err: any) {
        console.error("API Error:", err)
        throw err
    }
}