<template>
    <Vue3Lottie
        :animation-data="NewYear"
        :height="300"
        :width="300"
        class="object-contain w-full h-auto"
    />
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import NewYear from '@/assets/lottie/new-year'

</script>
