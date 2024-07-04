<template>
    <span
        :disabled="temperatureChecks"
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

const temperatureChecks = computed(() => {
    return supabaseStore.daily_temperatures
})

const dueTime = 8

const date = new Date()

const hours = date.getHours()

const displayText = computed(() => {
    return temperatureChecks.value ? '' : 'Due at 8am'
})

const classes = computed(() => {
    return temperatureChecks.value ? 'pill--complete' : hours < dueTime ? '' : 'pill--urgent'
})

const icon = computed(() => {
    return temperatureChecks.value ? 'material-symbols:check-rounded' : 'material-symbols:warning'
})

</script>
