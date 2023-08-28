<template>
    <auth-signup v-if="isDan" />
</template>

<script setup>
const client = useSupabaseClient()
const { data: profile } = await client
    .from('profiles')
    .select('id')

const isDan = computed(() => {
    return profile[0].id === 'b48f44d2-42c9-4d63-944a-0211996868c3'
})

useHead({
    title: 'Register a new user'
})

</script>
