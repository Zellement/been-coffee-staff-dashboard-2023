<template>
    <div
        class="flex flex-col items-start w-full py-8 mt-10 text-left md:items-center"
    >
        <h1 class="text-6xl dark:text-white font-riverside">
            {{ title }}
        </h1>
        <h2 class="mt-2 text-2xl font-krete text-tuscany">
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
