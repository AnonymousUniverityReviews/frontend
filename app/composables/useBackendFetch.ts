export const useBackendFetch = <T>(request: string | (() => string), opts?: any) => {
  return useFetch<T>(request, {
    ...opts,
    // Tell Nuxt to use the SSR-aware fetch instance under the hood
    $fetch: useRequestFetch() 
  })
}