<template>
    <div
        class="flex relative flex-col w-3/4 p-4 gap-2 shadow-lg min-w-[300px] card"
    >
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
        <h3
            v-if="title"
            class="font-krete font-bold text-lg"
        >
            {{ title }}
        </h3>
        <div class="flex flex-col h-full">
            <button
                class="uppercase text-2xs mt-4 flex items-center gap-1"
                @click="toggleDetails"
            >
                Toggle all review feedback
                <div
                    class="relative flex w-3 h-3"
                >
                    <Icon
                        v-if="showDetails"
                        name="mdi:minus"
                        class="absolute top-0flex w-3 h-3 transition-all"
                    />
                    <Icon
                        v-else
                        name="mdi:plus"
                        class="absolute top-0flex w-3 h-3 transition-all"
                    />
                </div>
            </button>
            <div v-if="showDetails">
                <div>
                    <h3 class="mb-2 krete-title !text-base mt-8 ">
                        Feedback
                    </h3>
                    <p v-if="reviewText">
                        ‟{{ reviewText }}＂
                    </p>
                    <p v-else>
                        No feedback left.
                    </p>
                    <slot name="feedbackExtra" />
                </div>
                <div
                    v-if="response"
                    class="text-tuscany-500 dark:text-tuscany-100 italic"
                >
                    <h3 class="!text-sm krete-title mt-8 ">
                        Response
                    </h3>
                    <p class="!text-xs">
                        {{ response }}
                    </p>
                </div>
            </div>
        </div>
    </div>
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
    }
})

const uiStore = useUiStore()

const showDetails = computed(() => uiStore.showReviewDetails)

const toggleDetails = () => {
    uiStore.toggleShowReviewDetails()
}

// const { shortDateConverter } = useDateUtils()

</script>
