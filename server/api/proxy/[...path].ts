import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  // 1. Extract the backend URL from runtime config
  const config = useRuntimeConfig()
  let backendBaseUrl = config.public.apiBase || 'https://localhost:8081'
  // Ensure backendBaseUrl doesn't end with /api to avoid duplication with path
  backendBaseUrl = backendBaseUrl.replace(/\/api\/?$/, '')

  console.log('[API Proxy] Incoming request path:', event.path)
  
  // 2. Extract Authorization header sent by the SPA
  const authHeader = getHeader(event, 'Authorization') || getHeader(event, 'authorization')
  if (authHeader) {
      console.log('[API Proxy] Authorization header present')
  }

  // 3. Define public paths that do not require authentication
  const publicPaths = [
    '/api/universities',
    '/api/reviews'
  ]

  // Check if the current path starts with any of the public paths
  const path = event.path.replace(/^\/api\/proxy\//, '')
  const isPublic = publicPaths.some(p => path.startsWith(p) || ('/' + path).startsWith(p))

  console.log('[API Proxy Debug] Path:', path, 'Original:', event.path, 'IsPublic:', isPublic);

  // 4. Construct the dynamic target path
  const target = joinURL(backendBaseUrl, path)

  // 5. Proxy the request and forward the Authorization header if available
  const headers: Record<string, string> = {}
  if (authHeader) {
    headers.Authorization = authHeader
  }

  return proxyRequest(event, target, {
    headers
  })
})
