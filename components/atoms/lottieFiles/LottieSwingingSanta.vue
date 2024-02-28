<template>
    <client-only>
        <div class="absolute top-0 right-0 flex w-1/2 h-auto overflow-hidden pointer-events-none">
            <Vue3Lottie
                :animation-data="SwingingSanta"
                :height="300"
                :width="300"
                class="-translate-y-10 translate-x-1/4"
            />
        </div>
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import SwingingSanta from '@/assets/lottie/swinging-santa'

</script>
