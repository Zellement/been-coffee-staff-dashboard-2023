<template>
    <div
        v-if="articleData"
        class="container flex flex-col items-center pb-20 mb-16"
    >
        <content-hero
            :title="articleData.title"
            :subtitle="articleData.subtitle"
            :date="articleData.publishedAt"
            :categories="articleData.categories"
        />
        <div class="flex flex-col">
            <div class="grid w-full grid-cols-2 py-4">
                <p
                    v-if="articleData._updatedAt"
                    class="text-xs opacity-50 font-krete"
                >
                    Last updated: {{ dateConverter(articleData._updatedAt) }}
                </p>
                <ul
                    v-if="articleData.categories"
                    class="flex flex-row flex-wrap gap-2 ml-auto"
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
                    class="py-8 col-span-full"
                >
                    <h2 class="font-krete">
                        <Icon
                            name="material-symbols-light:file-copy-rounded"
                            class="w-4 h-4 "
                        />
                        Related files &amp; downloads
                    </h2>
                    <div class="w-full pb-4 overflow-x-scroll">
                        <ul
                            class="flex w-full gap-4"
                        >
                            <li
                                v-for="file in articleData.files"
                                :key="file._key"
                                class="flex "
                            >
                                <a
                                    :href="file.asset.url"
                                    target="_blank"
                                    class="w-full relative h-full min-w-[270px] pl-4 py-1 pr-2 text-xs font-krete shadow dark:shadow-navy-400 text-tuscany rounded"
                                >
                                    <Icon
                                        name="material-symbols-light:file-copy-rounded"
                                        class="absolute left-0 w-3 h-3 opacity-50 top-3"
                                    />
                                    {{ file.asset.originalFilename }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="content">
                <PortableText
                    :value="articleData.content"
                    :components="myPortableTextComponents"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'
import { dateConverter } from '@/scripts/helpers'
// import { getFileAsset } from '@sanity/asset-utils'

const route = useRoute()
const query = groq`*[_type == "article" && slug.current == '${route.params.slug}'] [0]{
    title,
    subtitle,
    publishedAt,
    _updatedAt,
    content,
    files[]{
      _key,
      asset->{
        url,
        originalFilename
      }
    },
    sticky,
    categories[]->{
        _id,
    slug,
    title
  },
}
`
const sanity = useSanity()

const { data } = await useAsyncData('singleArticle', () => sanity.fetch(query))

console.log(data)

// const getAsset = (asset) => {
//     console.log('asset', asset)
//     // const file = getFileAsset(asset, { projectId: 'mxklvbih', dataset: 'production' })
//     // console.log('file', file)
// }

const articleData = computed(() => {
    return data.value
})

const myPortableTextComponents = {
    types: {
        // file: ({ children, value }) => {
        //     console.log(value)
        //     console.log(children)

        //     const fullAsset = getFileAsset(value, { projectId: 'mxklvbih', dataset: 'production' })
        //     console.log(fullAsset.url)

        //     const fileName = getUrlFilename(fullAsset.url)
        //     console.log(fileName)

        //     // return h('a', { src: fullAsset.asset.url, target: '_blank' }, 'Download')
        // },
        image: ({ value }) => h('img', { src: value.imageUrl })
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

useHead({
    title: data.value?.title
})

</script>
