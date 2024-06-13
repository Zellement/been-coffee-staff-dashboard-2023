<template>
    <div class="flex flex-col h-full">
        <button
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
        </button>
        <div v-if="state.showDetails">
            <h3 class="mb-2 krete-title mt-8">
                Details
            </h3>
            <div class="content">
                <template v-if="string">
                    {{ details }}
                </template>
                <PortableText
                    v-else
                    :value="details"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'

defineProps({
    details: {
        type: [Object, String],
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
