<template>
    <div class="flex flex-col h-full">
        <button
            class=" uppercase text-2xs hover:underline mt-auto flex items-center gap-1"
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
        </button>
        <div v-if="state.showDetails">
            <h3 class="mb-2 krete-title !text-base mt-8 not-italic">
                Details
            </h3>
            <slot name="extraData" />
            <div
                v-if="details"
                class="content"
            >
                <template v-if="string">
                    {{ details }}
                </template>
                <PortableText
                    v-else
                    :value="details"
                />
            </div>
            <slot name="response" />
        </div>
    </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'

defineProps({
    details: {
        type: [Object, String, null],
        required: true
    },
    string: {
        type: Boolean,
        required: false,
        default: false
    }
})

const state = reactive({
    showDetails: false
})

const minusClasses = computed(() => {
    return state.showDetails ? 'opacity-100 scale-100 rotate-0' : 'rotate-180 scale-50 opacity-0'
})

const plusClasses = computed(() => {
    return state.showDetails ? 'rotate-180 scale-50 opacity-0' : 'opacity-100 scale-100 rotate-0'
})

const toggleDetails = () => {
    state.showDetails = !state.showDetails
}
</script>
