<template>
    <client-only>
        <Vue3Lottie
            :animation-data="EasterEgg"
            class="object-contain w-full h-auto"
        />
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import EasterEgg from '@/assets/lottie/easter-egg'

</script>
