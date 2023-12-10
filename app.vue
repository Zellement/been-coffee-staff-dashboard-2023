<template>
    <NuxtLayout>
        <snow-fall
            v-if="isXmasTheme"
        />
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
        <NuxtPage />
        <instant-search />
        <profile-data />
        <current-target />
    </NuxtLayout>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const isXmasTheme = computed(() => {
    return uiStore.isXmasThemed
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
})

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
    @apply translate-x-full;
}

</style>
