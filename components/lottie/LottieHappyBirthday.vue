<template>
    <client-only>
        <Vue3Lottie :animation-data="HappyBirthday" class="h-auto w-full" />
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import HappyBirthday from '@/assets/lottie/happy-birthday'
</script>
