<template>
    <li
        class="w-64 min-w-64 card relative"
    >
        <Icon
            :name="icon"
            class="size-8 text-butterscotch absolute top-0 right-0 -translate-y-2 -translate-x-2 bg-white dark:bg-navy p-1 rounded-full border border- dark:border-navy-400"
        />
        <div class="flex gap-2">
            <Icon
                name="material-symbols:person"
                class="w-6 h-6 text-butterscotch"
            />
            {{ name }}
        </div>
        <div class="flex gap-2">
            <Icon
                name="material-symbols:calendar-month-outline-sharp"
                class="w-6 h-6 text-butterscotch"
            />
            {{ dateString }}
        </div>

        <div class="flex gap-1 relative">
            <Icon
                v-for="i in 5"
                :key="i"
                name="ic:outline-star-outline"
                class="w-6 h-6 text-butterscotch opacity-30"
            />
            <div class="absolute top-0 left-0 flex gap-1">
                <Icon
                    v-for="i in rating"
                    :key="i"
                    name="ic:outline-star"
                    class="w-6 h-6 text-butterscotch"
                />
            </div>
        </div>
        <div class="flex flex-col h-full">
            <div v-if="showDetails">
                <div class="flex flex-col gap-4">
                    <h3
                        v-if="title"
                        class="font-krete font-bold text-md"
                    >
                        &quot;{{ title }}&quot;
                    </h3>
                    <p
                        v-if="reviewText"
                        class="italic"
                    >
                        {{ reviewText }}
                    </p>
                    <p v-else>
                        No feedback left.
                    </p>
                    <slot name="feedbackExtra" />
                </div>
                <div
                    v-if="response"
                    class="text-tuscany-500 mt-10 dark:text-tuscany-100 italic"
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
