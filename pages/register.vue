<template>
    <auth-signup v-if="isDan" />
</template>

<script setup>
const client = useSupabaseClient()
const { data: profile } = await client
    .from('profiles')
    .select('id')

const isDan = computed(() => {
    return profile[0].id === '0b72ea1d-c4fb-42f2-9eaf-b80eba62aa42'
})

useHead({
    title: 'Register a new user'
})

</script>
