<template>
    <span
        :disabled="testAgainst"
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
        {{ displayText }}
    </span>
</template>

<script setup>
import { useSupabaseStore } from '@/stores/supabase'

const supabaseStore = useSupabaseStore()

const testAgainst = computed(() => {
    return supabaseStore.daily_cash_breakdown
})

const dueTime = 18

const date = new Date()

const hours = date.getHours()

const displayText = computed(() => {
    return testAgainst.value ? '' : hours < dueTime ? 'Due by 6pm' : 'Due at 6pm'
})

const classes = computed(() => {
    return testAgainst.value ? 'pill--complete' : hours < dueTime ? '' : 'pill--urgent'
})

const icon = computed(() => {
    return testAgainst.value ? 'material-symbols:check-rounded' : 'material-symbols:warning'
})

</script>
