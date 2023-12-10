<template>
    <div class="relative">
        <div class="flex flex-col pb-32">
            <template v-if="keyholder">
                <keyholder-nav />
                <last-orders />
                <standing-orders />
                <been-awesome-winners />
                <team-members />
            </template>
            <template v-else>
                <dashboard-intro />
                <team-members />
                <been-awesome-winners />
                <last-orders />
                <standing-orders />
            </template>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const keyholder = computed(() => {
    return userStore?.keyholderLayout
})

useHead({
    title: 'Been Staff Dashboard'
})

</script>
