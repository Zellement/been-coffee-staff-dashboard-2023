<template>
    <button
        class="flex transition-all duration-300 dark:hover:text-butterscotch-500 hover:text-white"
        @click="uiStore.toggleSearchResults"
    >
        <Icon
            name="carbon:search"
            class=""
        />
    </button>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

</script>
