<template>
    <div class="">{{ data }}</div>
</template>

<script lang="ts" setup>
const data = ref(null)

const fetchData = async () => {
    data.value = useFetch('api/weather-api.js')
}

fetchData()
</script>
