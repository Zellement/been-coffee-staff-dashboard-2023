// useAuth.js
import { ref, onMounted } from 'vue'
import { createAuth0Client } from '@auth0/auth0-vue'
import authConfig from './authConfig.js'

const auth0Client = ref(null)
const isAuthenticated = ref(false)

export async function initAuth0 () {
    auth0Client.value = createAuth0Client({
        domain: authConfig.domain,
        clientId: authConfig.clientId,
        redirectUri: authConfig.redirectUri
    })
}

export async function checkAuthentication () {
    isAuthenticated.value = await auth0Client.value.isAuthenticated()
}

// Initialize auth0Client when the module is imported
initAuth0()

onMounted(() => {
    checkAuthentication()
})

export { auth0Client, isAuthenticated }
