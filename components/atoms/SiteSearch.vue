<template>
    <button
        class="flex items-center gap-2 p-2 transition-all duration-300 dark:hover:text-butterscotch-500 hover:text-white"
        @click="uiStore.toggleSearchResults()"
    >
        <Icon
            name="ri:menu-search-line"
            class="w-6 h-6"
        />
        {{ displayText }}
    </button>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

defineProps({
    displayText: {
        type: String,
        required: false,
        default: null
    }
})

</script>
