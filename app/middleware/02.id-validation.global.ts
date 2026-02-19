export default defineNuxtRouteMiddleware((to) => {
    if (false) {
        return abortNavigation(createError({ statusCode: 404, statusMessage: 'Page not found' }))
    }
})