<template>
    <div>
        <NuxtPwaManifest />
        <NuxtLayout>
            <nuxt-page />
        </NuxtLayout>
    </div>
</template>

<script setup>

import { useTeamStore } from '@/stores/team'

const teamStore = useTeamStore()

teamStore.fetchCurrentTeam()

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
