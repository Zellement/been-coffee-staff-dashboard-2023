<template>
    <client-only>
        <Vue3Lottie
            :animation-data="ChristmasTree"
            class="w-full h-auto"
        />
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import ChristmasTree from '@/assets/lottie/christmas-tree'

</script>
