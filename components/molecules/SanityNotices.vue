<template>
    <div
        v-if="totalNotices > 0"
        class="col-span-full p-4 relative"
        :class="background"
    >
        <span class="absolute z-10 flex gap-1 top-0 right-0  -translate-y-1/2 text-2xs font-krete  ">
            <span class="px-1 bg-navy-300 text-butterscotch-500">{{ shortDateConverter(allNotices[currentNotice].publishedAt) }}</span>
            <span class="px-1 bg-navy-300 text-butterscotch-500">{{ currentNotice + 1 }} / {{ totalNotices }}</span>
        </span>
        <div
            class="absolute top-0 bottom-0 transition-all right-0 h-full bg-white/10"
            :style="bgTimerClasses"
        />
        <div class="relative">
            <h2 class="h5">
                {{ allNotices[currentNotice].title }}
            </h2>
            <PortableText :value="allNotices[currentNotice].content" />
        </div>
    </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'

const { shortDateConverter } = useDateUtils()

const queryNotices = groq`
*[_type == "notice"]
`
const sanity = useSanity()

const { data } = await useAsyncData('queryAllNotices', () => sanity.fetch(queryNotices))

const allNotices = computed(() => {
    return data.value
})

const totalNotices = computed(() => {
    return allNotices.value.length
})

const COUNTDOWN = 10

const timer = ref(COUNTDOWN)

const currentNotice = ref(0)

const background = computed(() => {
    return currentNotice.value % 2 === 0 ? 'bg-tuscany-500 text-white' : 'bg-butterscotch-500 text-navy-500'
})

const bgTimerClasses = computed(() => {
    return `width: ${(timer.value / COUNTDOWN) * 100}%;`
})

watch(timer, (value) => {
    if (value === 0) {
        timer.value = COUNTDOWN
        if (currentNotice.value === totalNotices.value - 1) {
            currentNotice.value = 0
        } else {
            currentNotice.value++
        }
    }
})

onMounted(() => {
    if (totalNotices.value > 1) {
        setInterval(() => {
            timer.value--
        }, 1000)
    }
})

</script>
