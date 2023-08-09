<template>
    <button @click="uiStore.toggleSearchResults">
        <Icon name="carbon:search" class="" />
    </button>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

</script>
