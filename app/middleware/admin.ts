export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn, user, login } = useOidcAuth()

  if (!loggedIn.value) {
    return login()
  }

  // Check for Admin role
  const roles = user.value?.userInfo?.role || []
  const isAdmin = Array.isArray(roles) ? roles.includes('Admin') : roles === 'Admin'

  if (!isAdmin) {
    return navigateTo('/')
  }
})
