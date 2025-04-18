<template>
    <div class="">
        <slot />

        <button-toggle-theme v-if="uiStore.themeToggleBtn.show" class="-mt-2" />
        <!-- Themed stuff -->
        <snow-fall v-if="uiStore.isXmasTheme" class="dark:opacity-40" />

        <lottie-swinging-santa v-if="uiStore.isXmasTheme" />
        <lottie-new-year v-if="uiStore.isNewYearTheme" />
        <lottie-easter-bunny v-if="uiStore.isEasterTheme" />
    </div>
</template>

<script setup>
const uiStore = useUiStore()

useHead({
    title: 'Willington at a glance'
})

onMounted(() => {
    uiStore.setTheme()
})
</script>
