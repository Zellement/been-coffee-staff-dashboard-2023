<template>
    <div
        v-if="data && today"
        class="inline-flex w-auto -translate-y-1.5 items-center gap-1 rounded bg-butterscotch-200 px-1 py-1 text-2xs leading-none dark:bg-navy-700"
    >
        <Icon class="mr-2" :name="getWeatherIcon(data.current.weather_code)" />
        {{ data.current.temperature_2m }}{{ data.current_units.temperature_2m }}
    </div>
    <div
        v-if="data && !today"
        class="inline-flex w-auto -translate-y-1.5 items-center gap-1 rounded bg-butterscotch-200 px-1 py-1 text-2xs leading-none dark:bg-navy-700"
    >
        <Icon class="mr-2" :name="getWeatherIcon(data.daily.weather_code[0])" />
        {{ data.daily.temperature_2m_min[0]
        }}{{ data.current_units.temperature_2m }} -
        {{ data.daily.temperature_2m_max[0]
        }}{{ data.current_units.temperature_2m }}
    </div>
</template>

<script setup>
defineProps({
    today: {
        type: Boolean,
        default: true
    }
})

const { getWeatherIcon } = useIconUtils()
const { backwardsDate } = useDateUtils()

const dToday = new Date()
const dTomorrow = new Date()
dTomorrow.setDate(dToday.getDate() + 1)

const shortDateTomorrow = backwardsDate(dTomorrow)

const { data } = await useFetch('/api/weather-api', {
    query: {
        params: `current=temperature_2m,weather_code&daily=weather_code,temperature_2m_min,temperature_2m_max&start_date=${shortDateTomorrow}&end_date=${shortDateTomorrow}`
    }
})
</script>
