<template>
    <client-only>
        <Vue3Lottie
            :animation-data="EasterEgg"
            class="h-auto w-full object-contain"
        />
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import EasterEgg from '@/assets/lottie/easter-egg'
</script>
