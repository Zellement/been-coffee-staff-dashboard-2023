<template>
    <div class="flex h-full flex-col">
        <button
            class="mt-auto flex items-center gap-1 text-2xs uppercase hover:underline"
            @click="toggleDetails"
        >
            Toggle details
            <div class="relative flex h-3 w-3">
                <Icon
                    name="mdi:minus"
                    class="top-0flex absolute h-3 w-3 transition-all"
                    :class="minusClasses"
                />
                <Icon
                    name="mdi:plus"
                    class="top-0flex absolute h-3 w-3 transition-all"
                    :class="plusClasses"
                />
            </div>
        </button>
        <div v-if="state.showDetails">
            <h3 class="krete-title mb-2 mt-8 !text-base not-italic">Details</h3>
            <slot name="extraData" />
            <div v-if="details" class="content">
                <template v-if="string">
                    {{ details }}
                </template>
                <PortableText v-else :value="details" />
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
    return state.showDetails
        ? 'opacity-100 scale-100 rotate-0'
        : 'rotate-180 scale-50 opacity-0'
})

const plusClasses = computed(() => {
    return state.showDetails
        ? 'rotate-180 scale-50 opacity-0'
        : 'opacity-100 scale-100 rotate-0'
})

const toggleDetails = () => {
    state.showDetails = !state.showDetails
}
</script>
