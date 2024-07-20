<template>
    <nuxt-link
        to="/"
        class="flex items-center gap-2 group"
    >
        <img
            class="w-8 h-8"
            src="@/assets/images/been-staff-dashboard.png"
        >
        <div
            v-if="showHomeIcon"
            class="flex flex-row items-center gap-1 group-hover:text-butterscotch-500"
        >
            <Icon
                name="material-symbols:house"
                class="w-6 h-6 "
            />
            <Icon
                name="material-symbols:keyboard-double-arrow-left"
                class="w-6 h-6 "
            />
            Go home
        </div>
    </nuxt-link>
</template>

<script setup>

const route = useRoute()

const showHomeIcon = computed(() => {
    return route.fullPath !== '/' || route.fullPath !== '/locations/willington'
})

</script>
