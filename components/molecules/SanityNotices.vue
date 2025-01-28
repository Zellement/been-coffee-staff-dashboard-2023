<template>
    <!-- <pre class="col-span-full">{{ allNotices }}</pre> -->
    <div v-if="totalNotices > 0" class="relative p-4" :class="background">
        <span
            class="absolute right-0 top-0 z-10 flex -translate-y-1/2 gap-1 font-sans text-2xs"
        >
            <span class="bg-navy-300 px-1 text-butterscotch-500">{{
                shortDateConverter(allNotices[currentNotice].publishedAt)
            }}</span>
            <span class="bg-navy-300 px-1 text-butterscotch-500"
                >{{ currentNotice + 1 }} / {{ totalNotices }}</span
            >
            <button
                class="bg-navy-500 px-1 text-white"
                @click.prevent="changeCurrentNotice"
            >
                Next
            </button>
        </span>
        <div
            class="absolute bottom-0 right-0 top-0 h-full bg-white/10 transition-all"
            :style="bgTimerClasses"
        />
        <div
            class="relative"
            :class="
                fixedHeight ? `${fixedHeightClasses} overflow-y-scroll` : null
            "
        >
            <h2 class="mb-2 font-riverside text-xl">
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
    },
    fixedHeightClasses: {
        type: String,
        default: 'h-[50vh]'
    }
})

const queryNotices = groq`
*[_type == "notice" && (dateTime(_createdAt) > dateTime(now()) - 60*60*24*10) || alwaysShow]|order(publishedAt desc)`

const sanity = useSanity()

const { data } = await useAsyncData('queryAllNotices', () =>
    sanity.fetch(queryNotices)
)

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
    return currentNotice.value % 2 === 0
        ? 'bg-tuscany-500 text-white'
        : 'bg-butterscotch-500 text-navy-500'
})

const bgTimerClasses = computed(() => {
    return `width: ${(timer.value / COUNTDOWN) * 100}%;`
})

const myPortableTextComponents = {
    types: {
        fileVideo: ({ value }) => {
            // console.log('value', value)

            const fullAsset = getFileAsset(value, {
                projectId: 'mxklvbih',
                dataset: 'production'
            })
            // console.log(fullAsset)

            if (!fullAsset.url) {
                console.error('No URL returned for video')
                return null
            }

            return h(
                'video',
                {
                    class: 'w-auto h-full max-h-[80dvh] mx-auto',
                    controls: true
                },
                [
                    h('source', {
                        src: fullAsset.url,
                        type: `video/${fullAsset.extension}`
                    }),
                    'Your browser does not support the video tag.'
                ]
            )
        },
        image: ({ value }) => {
            const fullAsset = getImageAsset(value, {
                projectId: 'mxklvbih',
                dataset: 'production'
            })
            const image = `${fullAsset.url}?h=1000&w=1000&fit=max&fm=webp`

            return h(NuxtPicture, {
                src: image,
                sizes: '336px',
                class: 'block w-full'
            })
        }
    }
}

const changeCurrentNotice = () => {
    if (currentNotice.value === totalNotices.value - 1) {
        currentNotice.value = 0
    } else {
        currentNotice.value++
    }
    timer.value = COUNTDOWN
}

watch(timer, (value) => {
    if (value === 0) {
        changeCurrentNotice()
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
