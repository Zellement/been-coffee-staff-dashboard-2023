<template>
    <div class="">
        weather
    </div>
</template>

<script setup>
import { fetchWeatherApi } from 'openmeteo'
const params = {
    latitude: 52.9228,
    longitude: -1.4766,
    current: 'temperature_2m',
    forecast_days: 1
}
const url = 'https://api.open-meteo.com/v1/forecast'
const responses = await fetchWeatherApi(url, params)

// Helper f

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0]

const current = response.current()

const utcOffsetSeconds = response.utcOffsetSeconds()

const weatherData = {
    current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0).value(),
        weatherCode: current.variables(1).value()
    }

}
console.log(weatherData)

// // Attributes for timezone and location
// const utcOffsetSeconds = response.utcOffsetSeconds()
// // const timezone = response.timezone()
// // const timezoneAbbreviation = response.timezoneAbbreviation()
// // const latitude = response.latitude()
// // const longitude = response.longitude()

// const hourly = response.hourly()

// // Note: The order of weather variables in the URL query and the indices below need to match!
// const weatherData = {
//     hourly: {
//         time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
//             (t) => new Date((t + utcOffsetSeconds) * 1000)
//         ),
//         temperature2m: hourly.variables(0).valuesArray()
//     }
// }

// `weatherData` now contains a simple structure with arrays for datetime and weather data
// for (let i = 0; i < weatherData.hourly.time.length; i++) {
//     console.log(
//         weatherData.hourly.time[i].toISOString(),
//         weatherData.hourly.temperature2m[i]
//     )
// }

</script>
