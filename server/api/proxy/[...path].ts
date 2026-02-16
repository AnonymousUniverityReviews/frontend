import { joinURL } from 'ufo'
import { getUserSession } from 'nuxt-oidc-auth/runtime/server/utils/session.js'

export default defineEventHandler(async (event) => {
  // 1. Extract the backend URL from runtime config
  const config = useRuntimeConfig()
  const backendBaseUrl = config.public.apiBase || 'http://localhost:8080' 

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


  // 3. Reject if unauthenticated or token is missing
  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Session expired or invalid. Please log in again.',
    })
  }

  // 4. Construct the dynamic target path
  // Removes '/api/proxy/' from the incoming path to get the remaining segments
  const path = event.path.replace(/^\/api\/proxy\//, '')
  const target = joinURL(backendBaseUrl, path)

  // 5. Proxy the request and inject the Authorization header
  return proxyRequest(event, target, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
})
