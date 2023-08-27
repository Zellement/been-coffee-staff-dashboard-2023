<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <instant-search />
    <profile-data />
    <current-record />
</template>

<script setup>

import { useUserStore } from '@/stores/users'

const {
    data
} = useAuth()

const userStore = useUserStore()

userStore.setUser(data.value.user.name)

// const userData = userDetails(data.value.user.name)

// userStore.setUserEnvs(userData)

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
