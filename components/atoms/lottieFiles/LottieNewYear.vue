<template>
    <client-only>
        <Vue3Lottie
            :animation-data="NewYear"
            :height="300"
            :width="300"
            class="object-contain w-full h-auto"
        />
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import NewYear from '@/assets/lottie/new-year'

</script>
