<template>
    <div class="flex flex-col items-start w-full p-4 text-left shadow-xl md:items-center bg-gradient-to-b from-butterscotch-500 to-butterscotch-600 rounded-xl dark:from-navy-600 dark:to-navy-700">
        <p
            v-if="date"
            class="text-xs"
        >
            Last updated: {{ dateConverter(date) }}
        </p>
        <h1 class="h1">
            {{ title }}
        </h1>
        <h2 class="h2 text-tuscany">
            {{ subtitle }}
        </h2>
    </div>
</template>

<script setup>

import { dateConverter } from '@/scripts/helpers'

defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false,
        default: null
    }
})

</script>
