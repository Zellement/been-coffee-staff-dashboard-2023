<template>
    <div class="relative">
        <div class="flex flex-col pb-32 gap-16 pt-8">
            <template v-if="!keyholder">
                <dashboard-intro />
                <recently-updated-articles />
                <advent-calendar v-if="isXmasTheme" />
                <team-members />
                <been-awesome-winners />
                <last-orders />
                <standing-orders />
            </template>
            <template v-else>
                <keyholder-nav />
                <last-orders />
                <standing-orders />
                <recently-updated-articles />
                <advent-calendar v-if="isXmasTheme" />
                <been-awesome-winners />
                <team-members />
            </template>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
import { useUiStore } from '@/stores/ui'

const userStore = useUserStore()
const uiStore = useUiStore()

const keyholder = computed(() => {
    return userStore?.keyholderLayout
})

const isXmasTheme = computed(() => {
    return uiStore.isXmasThemed
})

useHead({
    title: 'Been Staff Dashboard'
})

</script>
