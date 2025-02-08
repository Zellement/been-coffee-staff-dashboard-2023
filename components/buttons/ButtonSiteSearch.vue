<template>
    <button
        class="flex items-center gap-2"
        @click="uiStore.toggleSearchResults()"
    >
        <Icon name="ri:menu-search-line" class="h-6 w-6" />
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
