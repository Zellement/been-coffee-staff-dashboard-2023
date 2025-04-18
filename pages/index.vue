<template>
    <div class="relative">
        <div class="flex flex-col gap-16 pb-32 pt-8">
            <birthdays-anniversaries />
            <template v-if="!keyholder">
                <advent-calendar />
                <dashboard-intro />
                <homebase-shifts-today />
                <carousel-recently-updated-articles />
                <carousel-routine-tasks />
                <sanity-notices fixed-height />
                <carousel-social-reviews />
                <carousel-team-members />
                <carousel-been-awesome-winners />
                <carousel-recent-orders />
                <carousel-standing-orders />
                <carousel-checks />
            </template>
            <template v-else>
                <bank-holidays />
                <carousel-checks />
                <carousel-routine-tasks />
                <advent-calendar />
                <homebase-shifts-today />
                <carousel-recent-orders />
                <sanity-notices fixed-height />
                <carousel-social-reviews />
                <carousel-recently-updated-articles />
                <carousel-standing-orders />
                <carousel-been-awesome-winners />
                <carousel-team-members />
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
