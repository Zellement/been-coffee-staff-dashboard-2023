<template>
    <div
        class="px-4 mx-auto overflow-hidden max-w-screen-xs"
    >
        <slot />
    </div>
</template>

<script setup>

useHead({
    title: 'Login to the Been Staff Dashboard'
})

</script>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
