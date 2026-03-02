import { useOidcAuth } from './useOidcAuth'

export const useBackendFetch = <T>(request: string | (() => string), opts?: any) => {
  const { accessToken } = useOidcAuth()
  
  return useFetch<T>(request, {
    ...opts,
    onRequest({ request, options }) {
      if (accessToken.value) {
        options.headers = options.headers || {}
        if (options.headers instanceof Headers) {
          options.headers.set('Authorization', `Bearer ${accessToken.value}`)
        } else if (Array.isArray(options.headers)) {
          (options.headers as Array<[string, string]>).push(['Authorization', `Bearer ${accessToken.value}`])
        } else {
          ;(options.headers as Record<string, string>).Authorization = `Bearer ${accessToken.value}`
        }
      }
      
      // Call original onRequest if provided inside opts
      if (opts?.onRequest) {
        opts.onRequest({ request, options })
      }
    },
    $fetch: useRequestFetch() 
  })
}