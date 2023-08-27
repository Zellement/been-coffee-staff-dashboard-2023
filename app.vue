<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <instant-search />
    <profile-data />
    <current-record />
    {{ users }}
</template>

<script setup>

// import { useUserStore } from '@/stores/users'

// const userData = userDetails(data.value.user.name)

// userStore.setUserEnvs(userData)

import { useRuntimeConfig } from 'nuxt/app'

import { createClient } from '@supabase/supabase-js'

const runtimeConfig = useRuntimeConfig()

// const {
//     data
// } = useAuth()

// const userStore = useUserStore()

// userStore.setUser(data.value.user.name)

const supabase = createClient(runtimeConfig.public.SUPABASE_URL, runtimeConfig.public.SUPABASE_KEY)

const users = ref([])

async function getUsers () {
    const { data } = await supabase.from('userdata').select()
    users.value = data
    console.log(users.value)
}

onMounted(() => {
    getUsers()
})

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
    @apply translate-x-full;
}
</style>
