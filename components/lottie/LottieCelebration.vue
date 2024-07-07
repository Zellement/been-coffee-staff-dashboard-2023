<template>
    <client-only>
        <Vue3Lottie
            :animation-data="Celebration"
            class="w-full h-auto"
        />
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import Celebration from '@/assets/lottie/celebration'

</script>
