<template>
    <div
        class="overflow-hidden"
    >
        <site-header />
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
        <button
            v-if="uiStore.showDisableTheme"
            class="fixed z-10 flex flex-row items-center gap-2 text-xs top-2 right-3"
            @click="uiStore.setTheme('standard')"
        >
            <span
                :class="toggleClasses"
                class="relative w-6 h-4 rounded-3xl"
            >
                <span
                    :class="toggleActiveClasses"
                    class="absolute w-2 h-2 transition-all duration-300 bg-white rounded-full dark:bg-white left-1/2 top-1"
                />
            </span>
            Bah, humbug!
        </button>
        <nuxt-page />
        <instant-search />
        <profile-data />
        <current-target />
        <site-footer />
    </div>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const fixPage = computed(() => {
    return uiStore.fixBody
})

const uiStore = useUiStore()

const toggleClasses = computed(() => {
    return !uiStore.isXmasTheme.value ? 'bg-green-500' : 'dark:bg-white/30 bg-black/20'
})

const toggleActiveClasses = computed(() => {
    return uiStore.isXmasTheme.value ? '-translate-x-full' : 'ml-auto'
})

onMounted(() => {
    // uiStore.setXmasMonth()
    // uiStore.setNewYearTheme()
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
