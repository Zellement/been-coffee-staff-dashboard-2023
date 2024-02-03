<template>
    <client-only>
        <Vue3Lottie
            :animation-data="SwingingSanta"
            :height="300"
            :width="300"
        />
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import SwingingSanta from '@/assets/lottie/swinging-santa'

</script>
