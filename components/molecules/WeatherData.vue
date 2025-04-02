<template>
    <pre>
            {{ data }}
    </pre>
    <div
        v-if="data"
        class="inline-flex w-auto items-center gap-1 rounded bg-navy-700 p-1 text-2xs"
    >
        <Icon :name="getWeatherIcon(data.current.weather_code)" />
        {{ data.current.temperature_2m }}{{ data.current_units.temperature_2m }}
    </div>
</template>

<script setup>
const { getWeatherIcon } = useIconUtils()
const { backwardsDate } = useDateUtils()

const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)

const shortDateTomorrow = backwardsDate(tomorrow)

const { data } = await useFetch('/api/weather-api', {
    query: {
        params: `current=temperature_2m,weather_code&daily=weather_code&start_date=${shortDateTomorrow}&end_date=${shortDateTomorrow}`
    }
})
</script>
