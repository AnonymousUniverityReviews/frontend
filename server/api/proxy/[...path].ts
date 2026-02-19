import { joinURL } from 'ufo'
import { getUserSession } from 'nuxt-oidc-auth/runtime/server/utils/session.js'

export default defineEventHandler(async (event) => {
  // 1. Extract the backend URL from runtime config
  const config = useRuntimeConfig()
  let backendBaseUrl = config.public.apiBase || 'https://localhost:8081'
  // Ensure backendBaseUrl doesn't end with /api to avoid duplication with path
  backendBaseUrl = backendBaseUrl.replace(/\/api\/?$/, '')

  console.log('[API Proxy] Incoming request path:', event.path)
  console.log('[API Proxy] Cookie header:', getHeader(event, 'cookie'))

  // 2. Extract the secure server-side session using nuxt-oidc-auth
  let accessToken = null

  try {
    const session = await getUserSession(event)
    accessToken = session.accessToken

    console.log("[API Proxy] Session retrieved:", {
      hasAccessToken: !!accessToken,
      userId: session.userId,
      provider: session.provider
    })
  } catch (err) {
    console.error("[API Proxy] Error retrieving session:", err)
  }


  // 3. Define public paths that do not require authentication
  const publicPaths = [
    '/api/universities',
    '/api/reviews'
  ]

  // Check if the current path starts with any of the public paths
  // Note: event.path includes /api/proxy prefix, so we check the target path logic
  const path = event.path.replace(/^\/api\/proxy\//, '')
  const isPublic = publicPaths.some(p => path.startsWith(p) || ('/' + path).startsWith(p))

  console.log('[API Proxy Debug] Path:', path, 'Original:', event.path, 'IsPublic:', isPublic);

  // 4. Reject if unauthenticated and not a public path
  if (!accessToken && !isPublic) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Session expired or invalid. Please log in again.',
    })
  }

  // 5. Construct the dynamic target path
  const target = joinURL(backendBaseUrl, path)

  // 6. Proxy the request and inject the Authorization header if available
  const headers: Record<string, string> = {}
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  return proxyRequest(event, target, {
    headers
  })
})
