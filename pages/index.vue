<template>
    <div class="relative">
        <div class="flex flex-col gap-16 pt-8 pb-32">
            <birthdays-anniversaries />
            <template v-if="!keyholder">
                <dashboard-intro />
                <homebase-shifts-today />
                <recently-updated-articles />
                <carousel-google-reviews />
                <carousel-trip-advisor-reviews />
                <carousel-team-members />
                <carousel-been-awesome-winners />
                <carousel-recent-orders />
                <carousel-standing-orders />
                <carousel-checks />
            </template>
            <template v-else>
                <carousel-checks />
                <carousel-routine-tasks />
                <homebase-shifts-today />
                <carousel-recent-orders />
                <carousel-google-reviews />
                <carousel-trip-advisor-reviews />
                <recently-updated-articles />
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
