export async function api<T>(
    url: string,
    options: any = {}
) {
    const config = useRuntimeConfig()

    try {
        return await $fetch<T>(url, {
            baseURL: config.public.apiBase,
            ...options,
        })
    } catch (err: any) {
        console.error("API Error:", err)
        throw err
    }
}