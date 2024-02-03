<template>
    <div>
        <NuxtPwaManifest />
        <NuxtLoadingIndicator
            color="#D05C32"
            height="5"
        />
        <NuxtLayout>
            <NuxtPage
                :transition="{
                    name: 'page',
                    mode: 'out-in'
                }"
            />
        </NuxtLayout>
    </div>
</template>

<script setup>

import { useTeamStore } from '@/stores/team'

const teamStore = useTeamStore()

teamStore.fetchCurrentTeam()

useHead({
    meta: [
        {
            name: 'theme-color',
            content: '#FAB944'
        }
    ]
})

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
    @apply opacity-0 translate-y-4;
}

</style>
