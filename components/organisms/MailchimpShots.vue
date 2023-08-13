<template>
    <div>{{ data }}</div>
</template>

<script setup>
const { data } = await useFetch('/api/mailchimp')

// const mailchimp = require('@mailchimp/mailchimp_marketing')

// const runtime = useRuntimeConfig()

// mailchimp.setConfig({
//     apiKey: runtime.public.MC_KEY,
//     server: runtime.public.MC_CLIENT
// })

// async function callPing () {
//     const response = await mailchimp.ping.get()
//     console.log(response)
// }

// callPing()
</script>
