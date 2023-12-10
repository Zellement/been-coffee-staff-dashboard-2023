export default defineNuxtRouteMiddleware(to => {
    const user = useSupabaseUser()

    if (user?.value?.aud === 'authenticated') {
        return
    }

    if (to.fullPath === '/login') return

    return navigateTo('/login')
})
