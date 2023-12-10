export default defineNuxtRouteMiddleware(to => {
    const user = useSupabaseUser()
    console.log(user)

    if (user?.value?.aud === 'authenticated') {
        return
    }

    if (to.fullPath === '/login') return

    return navigateTo('/login')
})
