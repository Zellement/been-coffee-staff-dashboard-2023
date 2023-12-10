<template>
    <nuxt-link
        to="/"
        class="flex items-center gap-2"
    >
        <img
            class="w-6 h-6"
            src="@/assets/images/been-staff-dashboard.png"
        >
        <div
            v-if="showHomeIcon"
            class="flex flex-row items-center gap-1"
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
    return route.fullPath !== '/'
})

</script>
