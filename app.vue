<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <instant-search />
    <profile-data />
    <current-record />
</template>

<script setup>
const {
    status,
    data,
    lastRefreshedAt,
    getCsrfToken,
    getProviders,
    getSession,
    signIn,
    signOut
} = useAuth()

console.log(status.value)
console.log(data.value)
console.log(lastRefreshedAt.value)
console.log(getCsrfToken)
console.log(getProviders)
console.log(getSession)
console.log(signIn.value)
console.log(signOut.value)

console.log(useAuth())

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
    @apply translate-x-full;
}
</style>
