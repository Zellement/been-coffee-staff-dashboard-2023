<template>
    <span
        :disabled="isComplete"
        class="pill"
        :class="classes"
    >
        <div
            v-if="supabaseStore.loading"
            class="absolute inset-0 bg-navy text-white"
        >
            <Icon
                name="ph:spinner-gap-light"
                class="text-lg"
            />
        </div>
        <Icon
            :name="icon"
            class="w-4 h-4"
        />
        {{ showDisplayText }}
    </span>
</template>

<script  setup>
import { useSupabaseStore } from '@/stores/supabase'
const supabaseStore = useSupabaseStore()

const props = defineProps({
    isComplete: Boolean,
    dueTime: {
        type: Number,
        default: 18
    },
    displayText: {
        type: String,
        default: 'Due at 6pm'
    }
})

const showDisplayText = computed(() => {
    return props.isComplete ? '' : props.displayText
})

const date = new Date()

const hours = date.getHours()

const classes = computed(() => {
    return props.isComplete ? 'pill--complete' : hours < props.dueTime ? '' : 'pill--urgent'
})

const icon = computed(() => {
    return props.isComplete ? 'material-symbols:check-rounded' : 'material-symbols:warning'
})

</script>
