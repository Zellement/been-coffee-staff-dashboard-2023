<template>
    <div class="relative">
        <div class="flex flex-col gap-16 pt-8 pb-32">
            <birthdays-anniversaries />
            <template v-if="!keyholder">
                <dashboard-intro />
                <recently-updated-articles />
                <carousel-trip-advisor-reviews />
                <!-- <advent-calendar v-if="isXmasTheme" /> -->
                <carousel-team-members />
                <carousel-been-awesome-winners />
                <carousel-recent-orders />
                <carousel-standing-orders />
                <carousel-checks />
            </template>
            <template v-else>
                <carousel-checks />
                <carousel-recent-orders />
                <recently-updated-articles />
                <carousel-trip-advisor-reviews />
                <carousel-standing-orders />
                <!-- <advent-calendar v-if="isXmasTheme" /> -->
                <carousel-been-awesome-winners />
                <carousel-team-members />
            </template>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
// import { useUiStore } from '@/stores/ui'

const userStore = useUserStore()
// const uiStore = useUiStore()

const keyholder = computed(() => {
    return userStore?.keyholderLayout
})

useHead({
    title: 'Been Staff Dashboard'
})

</script>
