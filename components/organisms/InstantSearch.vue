<template>
    <div
        :class="showInstantSearch"
        class="fixed inset-0 z-50 flex pb-12 transition-all duration-500 overscroll-none bg-butterscotch dark:bg-navy-500"
    >
        <button
            class="fixed top-2 right-2"
            @click="uiStore.toggleSearchResults"
        >
            <Icon
                name="ri:close-circle-line"
                class="w-8 h-8 transition-all duration-300 hover:rotate-90"
            />
        </button>

        <div class="flex flex-col w-full mx-auto mt-8 lg:m-0 md:grid md:grid-cols-2">
            <all-articles />
            <all-categories />
        </div>
    </div>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const showInstantSearch = computed(() => {
    return uiStore.showSearchResults ? 'opacity-100' : 'opacity-0 pointer-events-none'
})

</script>
