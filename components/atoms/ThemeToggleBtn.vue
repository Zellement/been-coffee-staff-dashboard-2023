<template>
    <button
        class="fixed z-10 flex flex-row items-center gap-2 text-xs top-12 right-3"
        @click="uiStore.setTheme(uiStore.theme === 'standard' ? null : 'standard')"
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
        {{ uiStore.themeToggleBtn.text }}
    </button>
</template>

<script setup>
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const toggleClasses = computed(() => {
    return uiStore.theme === 'standard' ? 'bg-green-500' : 'dark:bg-white/30 bg-black/20'
})

const toggleActiveClasses = computed(() => {
    return uiStore.theme !== 'standard' ? '-translate-x-full' : 'ml-auto'
})
</script>
