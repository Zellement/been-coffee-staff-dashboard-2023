<template>
    <div
        v-if="user"
        class="overflow-hidden"
    >
        <site-header />
        <div class="layout">
            <main>
                <slot />
            </main>
        </div>
    </div>
    <auth-login v-else />
</template>

<script setup>

import { useUserStore } from '@/stores/user'

const user = useSupabaseUser()

const client = useSupabaseClient()

// After the user is logged in, this will only return
// the logged-in user's data - in this case a single row
const { data: profile } = await client
    .from('profiles')
    .select('display_name, till_pin, payslip_dir')

const userStore = useUserStore()

userStore.setUserData(profile[0])

</script>
