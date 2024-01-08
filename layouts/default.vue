<template>
    <div
        class="overflow-hidden"
    >
        <site-header />
        <snow-fall
            v-if="isXmasTheme"
            class="dark:opacity-40"
        />
        <div
            v-if="isXmasTheme"
            class="absolute top-0 right-0 flex w-1/2 h-auto overflow-hidden pointer-events-none "
        >
            <lottie-swinging-santa class="-translate-y-10 translate-x-1/4" />
        </div>
        <div
            v-if="isNewYearTheme"
            class="absolute top-0 right-0 flex w-[400px] h-auto overflow-hidden pointer-events-none "
        >
            <lottie-new-year class="" />
        </div>
        <button
            v-if="showBahHumbug"
            class="fixed z-10 flex flex-row items-center gap-2 text-xs top-2 right-3"
            @click="uiStore.toggleXmasTheme()"
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

const isXmasTheme = computed(() => {
    return uiStore.isXmasThemed
})

const isNewYearTheme = computed(() => {
    return uiStore.isNewYearThemed
})

const showBahHumbug = computed(() => {
    return uiStore.showBahHumbug
})

const toggleClasses = computed(() => {
    return !isXmasTheme.value ? 'bg-green-500' : 'dark:bg-white/30 bg-black/20'
})

const toggleActiveClasses = computed(() => {
    return isXmasTheme.value ? '-translate-x-full' : 'ml-auto'
})

onMounted(() => {
    uiStore.setXmasMonth()
    uiStore.setNewYearTheme()
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
