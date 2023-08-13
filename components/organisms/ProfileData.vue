<template>
    <div
        class="fixed inset-0 z-50 flex duration-500 bg-tuscany/80 backdrop-blur dark:bg-navy/80"
        :class="showPanel"
    >
        <div class="relative p-4 pt-12 m-auto bg-white shadow-xl lg:p-12 dark:bg-navy rounded-xl">
            <button
                class="absolute top-2 right-2"
                @click="uiStore.toggleProfileData"
            >
                <Icon
                    name="ri:close-circle-line"
                    class="w-8 h-8 transition-all duration-300 hover:rotate-90"
                />
            </button>
            <h2 class="h1">
                Hello, { user }
            </h2>
            <ul>
                <li>Till pin: 5454</li>
                <li>
                    <nuxt-link
                        target="_blank"
                        to="https://google.com"
                    >
                        Payslips
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const showPanel = computed(() => {
    return uiStore.showProfileData ? 'opacity-100' : 'opacity-0 pointer-events-none'
})
</script>
