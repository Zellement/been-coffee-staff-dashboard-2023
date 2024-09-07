<template>
    <div>
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
            <!-- <button
                class="mx-auto uppercase text-2xs mt-auto flex items-center gap-1"
                @click="toggleDetails"
            >
                Toggle details
                <div
                    class="relative flex w-3 h-3"
                >
                    <Icon
                        name="mdi:minus"
                        class="absolute top-0flex w-3 h-3 transition-all"
                        :class="minusClasses"
                    />
                    <Icon
                        name="mdi:plus"
                        class="absolute top-0flex w-3 h-3 transition-all"
                        :class="plusClasses"
                    />
                </div>
            </button> -->
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
</template>

<script setup>
// import { PortableText } from '@portabletext/vue'

defineProps({
    details: {
        type: [Object, String, null],
        required: true
    },
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
    }
})

// const { shortDateConverter } = useDateUtils()

</script>
