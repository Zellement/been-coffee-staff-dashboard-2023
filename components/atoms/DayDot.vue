<template>
    <div class="flex flex-col items-center gap-4">
        <h2 class="h4">
            <template v-if="props.title">
                {{ props.title }}
            </template>
            <template v-else>
                Today: <span>{{ dateConverterWithDayNoYear(props.date) }}</span>
            </template>
        </h2>
        <div class="flex flex-col">
            <div class="flex flex-col items-center w-24 h-24 overflow-hidden bg-white border-2 border-white rounded-full">
                <span
                    class="flex w-full text-xl basis-1/2 font-riverside"
                    :class="dayDotConverter[getDayNumeric(props.date)].classes"
                >
                    <span class="m-auto">{{ getDayAlpha(props.date) }}</span>
                </span>
                <span
                    class="flex w-full text-xl basis-1/2 font-riverside"
                >
                    <span class="m-auto text-black -translate-y-0.5">
                        {{ getDate(props.date) }} / {{ getMonth(props.date) }}
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>

import { dateConverterWithDayNoYear } from '@/scripts/helpers'

const props = defineProps({
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: false,
        default: null
    }
})

const getDayNumeric = (date) => {
    return date.getDay()
}

const getDayAlpha = (date) => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return dayNames[date.getDay()]
}

const getDate = (date) => {
    return date.getDate()
}

const getMonth = (date) => {
    return date.getMonth() + 1
}

const dayDotConverter = [
    {
        classes: 'bg-black text-white'
    },
    {
        classes: 'bg-blue-400 text-white'
    },
    {
        classes: 'bg-yellow-500 text-black'
    },
    {
        classes: 'bg-red-500 text-white'
    },
    {
        classes: 'bg-yellow-800 text-white'
    },
    {
        classes: 'bg-green-500 text-white'
    },
    {
        classes: 'bg-orange-500 text-white'
    }
]

</script>
