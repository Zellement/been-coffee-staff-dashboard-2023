<template>
    <div
        class="overflow-hidden"
    >
        <site-header />
        <button-toggle-theme
            v-if="uiStore.themeToggleBtn.show"
        />
        <nuxt-page />
        <modal-instant-search />
        <modal-profile-data />
        <current-target />
        <site-footer />
        <modal-checks />

        <!-- Themed stuff -->
        <snow-fall
            v-if="uiStore.isXmasTheme"
            class="dark:opacity-40"
        />

        <lottie-swinging-santa
            v-if="uiStore.isXmasTheme"
        />
        <lottie-new-year
            v-if="uiStore.isNewYearTheme"
        />
        <lottie-easter-bunny
            v-if="uiStore.isEasterTheme"
        />
    </div>
</template>

<script setup>

const fixPage = computed(() => {
    return uiStore.fixBody
})

const uiStore = useUiStore()

onMounted(() => {
    uiStore.setTheme()
})

useHead({
    bodyAttrs: {
        class: computed(() => {
            if (fixPage.value) return 'overflow-hidden'
            return ''
        })
    }
})

</script>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
