<template>
    <client-only>
        <Vue3Lottie
            :animation-data="HappyBirthday"
            class="w-full h-auto"
        />
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import HappyBirthday from '@/assets/lottie/happy-birthday'

</script>
