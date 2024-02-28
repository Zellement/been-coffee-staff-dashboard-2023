<template>
    <client-only>
        <div
            class="absolute top-0 right-0 flex w-[400px] h-auto overflow-hidden pointer-events-none "
        >
            <Vue3Lottie
                :animation-data="NewYear"
                :height="300"
                :width="300"
                class="object-contain w-full h-auto"
            />
        </div>
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import NewYear from '@/assets/lottie/new-year'

</script>
