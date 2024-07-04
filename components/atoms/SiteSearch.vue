<template>
    <button
        @click="uiStore.toggleSearchResults()"
    >
        <Icon
            name="ri:menu-search-line"
            class="w-6 h-6"
        />
    </button>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

</script>
