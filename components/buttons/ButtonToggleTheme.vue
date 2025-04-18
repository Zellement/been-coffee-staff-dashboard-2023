<template>
    <button
        class="fixed right-4 top-12 z-10 flex flex-row items-center gap-1 rounded-xl border border-gray-300 px-1 py-px text-xs dark:border-navy-100"
        @click="
            uiStore.setTheme(uiStore.theme === 'standard' ? null : 'standard')
        "
    >
        <span :class="toggleClasses" class="relative h-4 w-6 rounded-3xl">
            <span
                :class="toggleActiveClasses"
                class="absolute left-1/2 top-1 h-2 w-2 rounded-full bg-white transition-all duration-300 dark:bg-white"
            />
        </span>
        <Icon
            :class="iconActiveClasses"
            :name="uiStore.themeToggleBtn.icon"
            class="h-5 w-5"
        />
        <!-- {{ uiStore.themeToggleBtn.text }} -->
    </button>
</template>

<script setup>
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const toggleClasses = computed(() => {
    return uiStore.theme !== 'standard'
        ? 'bg-green-600 dark:bg-green-500'
        : 'dark:bg-white/30 bg-black/20'
})

const iconActiveClasses = computed(() => {
    return uiStore.theme !== 'standard'
        ? 'text-green-600 dark:text-green-500'
        : 'text-current'
})

const toggleActiveClasses = computed(() => {
    return uiStore.theme === 'standard' ? '-translate-x-full' : 'ml-auto'
})
</script>
