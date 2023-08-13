<template>
    <div>hleo</div>
</template>

<script setup>
import mailchimp from '@mailchimp/mailchimp_marketing'
// const mailchimp = require('@mailchimp/mailchimp_marketing')

// import { createRequire } from 'node:module'
// const require = createRequire(import.meta.url)

// const mailchimp = require('@mailchimp/mailchimp_marketing')

const runtime = useRuntimeConfig()

mailchimp.setConfig({
    apiKey: runtime.public.MC_KEY,
    server: runtime.public.MC_CLIENT
})

async function callPing () {
    const response = await mailchimp.ping.get()
    console.log(response)
}

callPing()
</script>
