<template>
    <div
        class="container flex flex-col items-center w-full pb-20 mb-16 lg:gap-16"
    >
        <template
            v-if="articleData"
        >
            <page-hero
                :title="articleData.title"
                :subtitle="articleData.subtitle"
                :date="articleData.publishedAt"
                :categories="articleData.categories"
            />
            <div class="flex flex-col w-full max-w-screen-xl lg:flex-row lg:gap-8 xl:gap-20">
                <div class="grid w-full grid-cols-2 py-4 lg:flex lg:flex-col lg:gap-8 lg:basis-1/4">
                    <p
                        v-if="articleData._updatedAt"
                        class="text-xs opacity-50 font-krete"
                    >
                        Created: {{ dateConverter(articleData.publishedAt) }}<br>
                        Updated: {{ dateConverter(articleData._updatedAt) }}
                    </p>
                    <ul
                        v-if="articleData.categories"
                        class="flex flex-row flex-wrap gap-2 ml-auto lg:m-0"
                    >
                        <li
                            v-for="category in articleData.categories"
                            :key="category._id"
                            class="text-xs font-krete text-tuscany"
                        >
                            <nuxt-link
                                class="underline underline-offset-2"
                                :to="`/category/${category.slug.current}`"
                            >
                                {{ category.title }}
                            </nuxt-link>
                        </li>
                    </ul>
                    <div
                        v-if="articleData.files"
                        class="py-8 col-span-full lg:p-0"
                    >
                        <h2 class="mb-2 font-krete">
                            <Icon
                                name="material-symbols-light:file-copy-rounded"
                                class="w-4 h-4 "
                            />
                            Related files &amp; downloads
                        </h2>
                        <div class="w-full pb-4 overflow-x-scroll ">
                            <ul
                                class="flex w-full gap-4 lg:flex-col lg:gap-2"
                            >
                                <li
                                    v-for="file in articleData.files"
                                    :key="file._key"
                                    class="flex "
                                >
                                    <a
                                        :href="file.file.asset.url"
                                        target="_blank"
                                        class="w-full relative h-full min-w-[270px] pl-6 py-1 pr-2 text-xs font-krete border dark:border-navy-300 border-seashell-600 lg:py-2 text-tuscany "
                                    >
                                        <Icon
                                            name="material-symbols-light:file-copy-rounded"
                                            class="absolute w-3 h-3 opacity-50 left-2 top-3 lg:opacity-0"
                                        />
                                        {{ file.value }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="w-full lg:basis-2/3 ">
                    <div class="content lg:max-w-screen-sm ">
                        <PortableText
                            :value="articleData.content"
                            :components="myPortableTextComponents"
                        />
                    </div>
                    <nuxt-link
                        v-if="nextArticle"
                        :to="nextArticle.slug.current"
                        class="inline-flex flex-col p-4 mt-8 transition-colors duration-300 bg-butterscotch-500 dark:bg-navy-400 dark:hover:bg-navy-600 hover:bg-butterscotch-600"
                    >
                        <span class="opacity-70">Next Article</span>
                        <span class="font-serif text-xl">{{ nextArticle.title }} &raquo;</span>
                    </nuxt-link>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'
import { dateConverter } from '@/scripts/helpers'
import { getFileAsset, getImageAsset } from '@sanity/asset-utils'
import { NuxtPicture } from '#components'

const route = useRoute()
const query = groq`*[_type == "article" && slug.current == '${route.params.slug}'] [0]{
    title,
    subtitle,
    publishedAt,
    _updatedAt,
    content,
    nextArticle->{
        title,
        subtitle,
        slug
    },
    files[]{
      _key,
        value,
        file{
            asset->{
                url
            }
        }
    },
    sticky,
    categories[]->{
        _id,
    slug,
    title,
  },
}
`

const sanity = useSanity()

const { data } = await useLazyAsyncData('singleArticle', () => sanity.fetch(query))

const articleData = computed(() => {
    return data.value
})

const nextArticle = computed(() => {
    return articleData.value?.nextArticle
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
            // :src="$urlFor(currentWinner.winner.image).width(300).height(400).url()"
            // const image = $urlFor(fullAsset.assetId).width(800).url()
            // console.log('value', value)
            // console.log('full asset', fullAsset)
            const image = fullAsset.url

            // return h(resolveComponent('NuxtLink'), { key, href, target }, linkContent)

            return h(NuxtPicture, { src: image, class: 'w-full' })
        }
        // callToAction: ({ value, isInline }, { slots }) =>
        //     isInline
        //         ? h('a', { href: value.url }, value.text)
        //         : h('div', { class: 'callToAction' }, value.text)
    }

    // marks: {
    //     link: ({ value }, { slots }) => {
    //         const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
    //         return h('a', { href: value.href, rel }, slots.default?.())
    //     }
    // }
}

watch(articleData, (newVal) => {
    useHead({
        title: newVal?.title
    })
})

</script>
