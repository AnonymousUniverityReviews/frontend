export default defineNuxtRouteMiddleware((to) => {
    if (typeof to.params.id === 'string' && !isNumber(to.params.id)) {
        return abortNavigation(createError({ statusCode: 404, statusMessage: 'Page not found' }))
    }
})