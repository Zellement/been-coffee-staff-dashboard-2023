<template>
    <!-- <pre class="col-span-full">{{ allNotices }}</pre> -->
    <div
        v-if="totalNotices > 0"
        class="col-span-full p-4 relative"
        :class="background"
    >
        <span class="absolute z-10 flex gap-1 top-0 right-0 -translate-y-1/2 text-2xs font-sans">
            <span class="px-1 bg-navy-300 text-butterscotch-500">{{ shortDateConverter(allNotices[currentNotice].publishedAt) }}</span>
            <span class="px-1 bg-navy-300 text-butterscotch-500">{{ currentNotice + 1 }} / {{ totalNotices }}</span>
        </span>
        <div
            class="absolute top-0 bottom-0 transition-all right-0 h-full bg-white/10"
            :style="bgTimerClasses"
        />
        <div
            class="relative"
            :class="fixedHeight ? 'h-[50vh] overflow-y-scroll' : null"
        >
            <h2 class="font-riverside text-lg">
                {{ allNotices[currentNotice].title }}
            </h2>

            <div class="content">
                <PortableText
                    :value="allNotices[currentNotice].content"
                    :components="myPortableTextComponents"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'
import { getFileAsset, getImageAsset } from '@sanity/asset-utils'
import { NuxtPicture } from '#components'

const { shortDateConverter } = useDateUtils()

defineProps({
    fixedHeight: {
        type: Boolean,
        default: false
    }
})

const queryNotices = groq`
*[_type == "notice" && dateTime(_updatedAt) > dateTime(now()) - 60*60*24*10]|order(publishedAt desc)`

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

const myPortableTextComponents = {
    types: {
        fileVideo: ({ value }) => {
            // console.log('value', value)

            const fullAsset = getFileAsset(value, { projectId: 'mxklvbih', dataset: 'production' })
            // console.log(fullAsset)

            if (!fullAsset.url) {
                console.error('No URL returned for video')
                return null
            }

            return h('video', { class: 'w-auto h-full max-h-[80dvh] mx-auto', controls: true }, [
                h('source', { src: fullAsset.url, type: `video/${fullAsset.extension}` }),
                'Your browser does not support the video tag.'
            ])
        },
        image: ({ value }) => {
            const fullAsset = getImageAsset(value, { projectId: 'mxklvbih', dataset: 'production' })
            const image = `${fullAsset.url}?h=1000&w=1000&fit=max&fm=webp`

            return h(NuxtPicture, { src: image, sizes: '336px', class: 'block w-full' })
        }
    }

}

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
