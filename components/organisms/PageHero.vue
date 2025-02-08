<template>
    <div
        class="mt-10 flex w-full flex-col items-start py-8 text-left md:items-center"
    >
        <h1 class="font-riverside text-6xl dark:text-white">
            {{ title }}
        </h1>
        <h2 class="mt-2 font-krete text-2xl text-tuscany">
            {{ subtitle }}
        </h2>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    }
})
</script>
