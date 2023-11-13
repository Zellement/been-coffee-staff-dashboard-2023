<template>
    <NuxtLayout>
        <NuxtPage />
        <instant-search />
        <profile-data />
        <keyholder-nav />
        <current-target />
    </NuxtLayout>
</template>

<script setup>

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
