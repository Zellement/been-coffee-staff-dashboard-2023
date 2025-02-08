<template>
    <div
        :class="showInstantSearch"
        class="fixed inset-0 z-50 flex overscroll-none bg-butterscotch pb-12 transition-all duration-500 dark:bg-navy-500"
    >
        <button
            class="fixed right-2 top-2"
            @click="uiStore.toggleSearchResults()"
        >
            <Icon
                name="ri:close-circle-line"
                class="h-8 w-8 transition-all duration-300 hover:rotate-90"
            />
        </button>

        <div
            class="mx-auto mt-8 flex w-full flex-col md:m-0 md:grid md:grid-cols-2"
        >
            <all-articles />
            <all-categories class="mt-auto h-48 w-full md:m-0 md:h-auto" />
        </div>
    </div>
</template>

<script setup>
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const showInstantSearch = computed(() => {
    return uiStore.showSearchResults
        ? 'opacity-100'
        : 'opacity-0 pointer-events-none'
})
</script>
