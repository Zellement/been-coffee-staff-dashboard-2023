<template>
    <nuxt-link to="/" class="group flex items-center gap-2">
        <img class="h-8 w-8" src="@/assets/images/been-staff-dashboard.png" />
        <div
            v-if="showHomeIcon"
            class="flex flex-row items-center gap-1 group-hover:text-butterscotch-500"
        >
            <Icon name="material-symbols:house" class="h-6 w-6" />
            <Icon
                name="material-symbols:keyboard-double-arrow-left"
                class="h-6 w-6"
            />
            Go home
        </div>
    </nuxt-link>
</template>

<script setup>
const route = useRoute()

const showHomeIcon = computed(() => {
    return route.path !== '/' && route.path !== '/locations/willington'
})
</script>
