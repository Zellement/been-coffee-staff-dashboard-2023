<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <instant-search />
    <profile-data />
</template>

<script setup>
import mailchimp from '@mailchimp/mailchimp_marketing'

const runtime = useRuntimeConfig()

mailchimp.setConfig({
    apiKey: runtime.public.MC_KEY,
    server: runtime.public.MC_SERVER
})

async function callPing () {
    const response = await mailchimp.ping.get()
    console.log(response)
}

callPing()

</script>

<!--
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
    @apply translate-x-full;
}
</style> -->
