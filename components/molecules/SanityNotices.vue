<template>
    <!-- <pre class="col-span-full">{{ allNotices }}</pre> -->
    <div
        v-if="totalNotices > 0"
        class="p-4 relative"
        :class="background"
    >
        <span class="absolute z-10 flex gap-1 top-0 right-2 -translate-y-1/2 text-2xs font-sans">
            <span class="bg-navy-300 flex rounded-full px-2 text-butterscotch-500">
                <span class="my-auto">{{ shortDateConverter(allNotices[currentNotice].publishedAt) }}</span>
            </span>
            <span class="bg-navy-300 flex rounded-full px-2 text-butterscotch-500">
                <span class="my-auto">{{ currentNotice + 1 }} / {{ totalNotices }}</span>
            </span>
            <button
                class="button button--sm !gap-0 bg-navy !text-white"
                @click.prevent="goPrev"
            >

                <Icon
                    name="ic:twotone-chevron-left"
                    class="size-4"
                />
                Prev
            </button>
            <button
                class="button button--sm !gap-0 bg-navy !text-white"
                @click.prevent="goNext"
            >
                Next

                <Icon
                    name="ic:twotone-chevron-right"
                    class="size-4"
                />
            </button>
        </span>
        <div
            class="absolute top-0 bottom-0 transition-all right-0 h-full bg-white/10"
            :style="bgTimerClasses"
        />
        <div
            class="relative flex flex-col"
            :class="fixedHeight ? `${fixedHeightClasses} overflow-y-scroll` : null"
        >
            <h2 class="font-riverside text-xl mb-2">
                {{ allNotices[currentNotice].title }}
            </h2>

            <div class="content mb-4">
                <PortableText
                    :value="allNotices[currentNotice].content"
                    :components="myPortableTextComponents"
                />
            </div>
            <span
                v-if="allNotices[currentNotice].alwaysShow"
                class="text-2xs mt-auto opacity-50  inline-block border-current border px-1.5 py-0.5 self-start w-auto"
            >
                This notice is pinned
            </span>
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
    },
    fixedHeightClasses: {
        type: String,
        default: 'h-[50vh]'
    }
})

const queryNotices = groq`
*[_type == "notice" && (dateTime(_updatedAt) > dateTime(now()) - 60*60*24*10) || alwaysShow]|order(publishedAt desc)`

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

const goNext = () => {
    if (currentNotice.value === totalNotices.value - 1) {
        currentNotice.value = 0
    } else {
        currentNotice.value++
    }
}

const goPrev = () => {
    if (currentNotice.value === 0) {
        currentNotice.value = totalNotices.value - 1
    } else {
        currentNotice.value--
    }
}

watch(timer, (value) => {
    if (value === 0) {
        timer.value = COUNTDOWN
        goNext()
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
