export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig()

    if (import.meta.dev && config.public.useMsw) {
        if (import.meta.client) {
            const { worker } = await import('../mocks/browser')
            await worker.start({
                onUnhandledRequest: 'bypass',
            })
            console.log('[MSW] Worker is running')
        }

        if (import.meta.server) {
            const { server } = await import('../mocks/server')
            server.listen({
                onUnhandledRequest: 'bypass',
            })
            console.log('[MSW] Server is running')
        }
    }
})
