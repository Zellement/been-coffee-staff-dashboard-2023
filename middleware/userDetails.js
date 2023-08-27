import { useRuntimeConfig } from 'nuxt/app'
import { useUserStore } from '@/stores/users'

const runtimeConfig = useRuntimeConfig()
const userStore = useUserStore()

export default defineNuxtRouteMiddleware((to) => {
    console.log(to)
    if (userStore.user === 'dan') {
        console.log('Bello')
        userStore.userTillPin = runtimeConfig.DAN_TILL_PIN
    }
    console.log('jskhdfbf')
})
