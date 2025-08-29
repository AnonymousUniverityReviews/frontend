export default defineNuxtRouteMiddleware((to) => {
    if (to.params.id && !/^\d+$/.test(String(to.params.id))) {
        return abortNavigation(createError({ statusCode: 404, statusMessage: 'Page not found' }))
    }
})