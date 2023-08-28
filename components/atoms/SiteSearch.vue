<template>
    <button
        class="flex p-2 transition-all duration-300 dark:hover:text-butterscotch-500 hover:text-white"
        @click="uiStore.toggleSearchResults"
    >
        <Icon
            name="carbon:search"
            class="w-6 h-6"
        />
    </button>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

</script>
