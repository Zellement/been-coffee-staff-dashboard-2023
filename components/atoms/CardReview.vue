<template>
    <li class="card relative w-64 min-w-64">
        <Icon
            :name="icon"
            class="border- absolute right-0 top-0 size-8 -translate-x-2 -translate-y-2 rounded-full border bg-white p-1 text-butterscotch dark:border-navy-400 dark:bg-navy"
        />
        <div class="flex gap-2">
            <Icon
                name="material-symbols:person"
                class="h-6 w-6 text-butterscotch"
            />
            {{ name }}
        </div>
        <div class="flex gap-2">
            <Icon
                name="material-symbols:calendar-month-outline-sharp"
                class="h-6 w-6 text-butterscotch"
            />
            {{ dateString }}
        </div>

        <div class="relative flex gap-1">
            <Icon
                v-for="i in 5"
                :key="i"
                name="ic:outline-star-outline"
                class="h-6 w-6 text-butterscotch opacity-30"
            />
            <div class="absolute left-0 top-0 flex gap-1">
                <Icon
                    v-for="i in rating"
                    :key="i"
                    name="ic:outline-star"
                    class="h-6 w-6 text-butterscotch"
                />
            </div>
        </div>
        <div class="flex h-full flex-col">
            <div v-if="showDetails">
                <div class="flex flex-col gap-4">
                    <h3 v-if="title" class="text-md font-krete font-bold">
                        &quot;{{ title }}&quot;
                    </h3>
                    <p v-if="reviewText" class="italic">
                        {{ reviewText }}
                    </p>
                    <p v-else>No feedback left.</p>
                    <slot name="feedbackExtra" />
                </div>
                <div
                    v-if="response"
                    class="mt-10 italic text-tuscany-500 dark:text-tuscany-100"
                >
                    <p class="!text-xs">
                        {{ response }}
                    </p>
                </div>
            </div>
        </div>
    </li>
</template>

<script setup>
// import { PortableText } from '@portabletext/vue'

defineProps({
    string: {
        type: Boolean,
        required: false,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    dateString: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviewText: {
        type: String,
        required: false,
        default: null
    },
    response: {
        type: String,
        required: false,
        default: null
    },
    title: {
        type: String,
        required: false,
        default: null
    },
    icon: {
        type: String,
        required: false,
        default: null
    }
})

const uiStore = useUiStore()

const showDetails = computed(() => uiStore.showReviewDetails)
</script>
