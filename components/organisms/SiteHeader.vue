<template>
    <header class="container fixed top-0 left-0 z-50 flex flex-row items-center justify-between w-full gap-2 pt-2">
        <site-logo />
        <button
            class="relative overflow-hidden button button--sm"
            @click.prevent="shareBtn()"
        >
            <span
                v-if="copied"
                class="absolute inset-0 flex text-green-900 bg-green-500 pointer-events-none"
            >
                <span class="flex items-center justify-center w-full h-full">
                    <Icon
                        name="material-symbols-light:check-small-rounded"
                    /> <span class="text-2xs">Copied</span>
                </span>
            </span>

            <Icon name="material-symbols:share" /> Share
        </button>
    </header>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const copied = ref(false)

const currentUrl = computed(() => uiStore.currentUrl)

const shareData = computed(() => {
    return {
        url: currentUrl.value
    }
})

const shareBtn = async () => {
    if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
    } else {
        navigator.clipboard.writeText(shareData.value.url)
    }
    copied.value = true
    changeBack()
}

const changeBack = () => {
    setTimeout(() => {
        copied.value = false
    }, 3000)
}

</script>
