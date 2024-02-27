<template>
    <nuxt-link
        class="fixed z-50 flex flex-col items-center p-1 text-white rounded text-2xs bottom-16 right-1 bg-tuscany"
        to="/article/target-day-bonus"
        @click="uiStore.toggleSearchResults(false)"
    >
        <p class="leading-none">
            Next Target
        </p>
        <p class="mb-1 text-2xl leading-none font-riverside">
            £2,250
        </p>
        <span class="leading-none underline">What is this?</span>
    </nuxt-link>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

</script>
