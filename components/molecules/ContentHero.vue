<template>
    <div
        class="flex flex-col items-start w-full pt-8 mt-10 text-left border-b-2 border-butterscotch-200 dark:border-navy-400 md:items-center"
    >
        <h1 class="text-6xl dark:text-white font-riverside">
            {{ title }}
        </h1>
        <h2 class="mt-2 text-2xl font-krete text-tuscany">
            {{ subtitle }}
        </h2>
        <p
            v-if="
                date"
            class="mt-4 text-xs opacity-50"
        >
            Last updated: {{ dateConverter(date) }}
        </p>
        <ul
            v-if="categories"
            class="flex flex-wrap w-full gap-2 py-4 mt-4 border-t-2 border-butterscotch-200 dark:border-navy-400"
        >
            <li
                v-for="category in categories"
                :key="category._id"
                class="text-xs font-krete text-tuscany"
            >
                <nuxt-link
                    class="underline underline-offset-2"
                    :to="`/category/${category.slug.current}`"
                >
                    {{ category.title }}
                </nuxt-link>
            </li>
        </ul>
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
    },
    categories: {
        type: Array,
        required: false,
        default: null
    }
})

</script>
