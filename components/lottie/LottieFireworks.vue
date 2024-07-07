<template>
    <client-only>
        <Vue3Lottie
            :animation-data="Fireworks"
            class="object-contain w-full h-auto"
        />
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import Fireworks from '@/assets/lottie/fireworks'

</script>
