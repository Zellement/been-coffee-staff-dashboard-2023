<template>
    <NuxtLayout>
        <NuxtPage />
        <instant-search />
        <profile-data />
        <keyholder-nav v-if="keyholder" />
        <current-target />
    </NuxtLayout>
</template>

<script setup>

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const keyholder = computed(() => {
    return userStore.userData?.keyholder
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
