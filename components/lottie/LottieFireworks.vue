<template>
    <client-only>
        <Vue3Lottie
            :animation-data="Fireworks"
            class="h-auto w-full object-contain"
        />
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import Fireworks from '@/assets/lottie/fireworks'
</script>
