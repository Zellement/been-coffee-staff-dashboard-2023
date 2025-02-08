<template>
    <client-only>
        <Vue3Lottie :animation-data="ChristmasTree" class="h-auto w-full" />
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import ChristmasTree from '@/assets/lottie/christmas-tree'
</script>
