<template>
    <nuxt-link
        class="fixed bottom-16 right-1 z-50 flex flex-col items-center bg-tuscany p-1 text-2xs text-white"
        to="/article/target-day-bonus"
        @click="uiStore.toggleSearchResults(false)"
    >
        <p class="leading-none">Next Target</p>
        <p class="mb-1 font-riverside text-2xl leading-none">£3,000</p>
        <span class="leading-none underline">What is this?</span>
    </nuxt-link>
</template>

<script setup>
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
</script>
