<template>
    <div
        class="container mb-16 flex w-full flex-col items-center pb-20 lg:gap-16"
    >
        <template v-if="articleData">
            <page-hero
                :title="articleData.title"
                :subtitle="articleData.subtitle"
                :date="articleData.publishedAt"
                :categories="articleData.categories"
            />
            <div
                class="flex w-full max-w-screen-xl flex-col lg:flex-row lg:gap-8 xl:gap-20"
            >
                <div
                    class="grid w-full grid-cols-2 py-4 lg:flex lg:basis-1/4 lg:flex-col lg:gap-8"
                >
                    <p
                        v-if="articleData._updatedAt"
                        class="font-krete text-xs opacity-50"
                    >
                        Created: {{ dateConverter(articleData.publishedAt)
                        }}<br />
                        Updated: {{ dateConverter(articleData._updatedAt) }}
                    </p>
                    <ul
                        v-if="articleData.categories"
                        class="ml-auto flex flex-row flex-wrap gap-2 lg:m-0"
                    >
                        <li
                            v-for="category in articleData.categories"
                            :key="category._id"
                            class="font-krete text-xs text-tuscany"
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
                        class="col-span-full py-8 lg:p-0"
                    >
                        <h2 class="mb-2 font-krete">
                            <Icon
                                name="material-symbols-light:file-copy-rounded"
                                class="h-4 w-4"
                            />
                            Related files &amp; downloads
                        </h2>
                        <div class="w-full overflow-x-scroll pb-4">
                            <ul class="flex w-full gap-4 lg:flex-col lg:gap-2">
                                <li
                                    v-for="file in articleData.files"
                                    :key="file._key"
                                    class="flex"
                                >
                                    <a
                                        :href="file.file.asset.url"
                                        target="_blank"
                                        class="relative h-full w-full min-w-[270px] border border-seashell-600 py-1 pl-6 pr-2 font-krete text-xs text-tuscany dark:border-navy-300 lg:py-2"
                                    >
                                        <Icon
                                            name="material-symbols-light:file-copy-rounded"
                                            class="absolute left-2 top-3 h-3 w-3 opacity-50 lg:opacity-0"
                                        />
                                        {{ file.value }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="w-full lg:basis-2/3">
                    <div class="content lg:max-w-screen-sm">
                        <PortableText
                            :value="articleData.content"
                            :components="myPortableTextComponents"
                        />
                    </div>
                    <nuxt-link
                        v-if="nextArticle"
                        :to="nextArticle.slug.current"
                        class="mt-8 inline-flex flex-col bg-butterscotch-500 p-4 transition-colors duration-300 hover:bg-butterscotch-600 dark:bg-navy-400 dark:hover:bg-navy-600"
                    >
                        <span class="opacity-70">Next Article</span>
                        <span class="font-serif text-xl"
                            >{{ nextArticle.title }} &raquo;</span
                        >
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

const { data } = await useLazyAsyncData('singleArticle', () =>
    sanity.fetch(query)
)

const articleData = computed(() => {
    return data.value
})

const nextArticle = computed(() => {
    return articleData.value?.nextArticle
})

const myPortableTextComponents = {
    types: {
        fileVideo: ({ value }) => {
            const fullAsset = getFileAsset(value, {
                projectId: 'mxklvbih',
                dataset: 'production'
            })

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
            const image = fullAsset.url

            return h(NuxtPicture, { src: image, class: 'w-full' })
        }
    }
}

watch(articleData, (newVal) => {
    useHead({
        title: newVal?.title
    })
})
</script>
