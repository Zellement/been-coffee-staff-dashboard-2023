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
    data
} = useAuth()

console.log(data.value)

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
