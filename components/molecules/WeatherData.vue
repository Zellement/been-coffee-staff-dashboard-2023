<template>
    <div class="">{{ data }}</div>
</template>

<script setup>
const { data } = await useFetch('/api/weather-api')
</script>
