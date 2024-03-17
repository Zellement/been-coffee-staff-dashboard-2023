<template>
    <div
        v-if="articleData"
        class="container flex flex-col items-center pb-20 mb-16 space-y-8"
    >
        <content-hero
            :title="articleData.title"
            :subtitle="articleData.subtitle"
            :date="articleData.publishedAt"
            :categories="articleData.categories"
        />
        <div class="content">
            <PortableText
                :value="articleData.content"
                :components="myPortableTextComponents"
            />
        </div>
    </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'

const route = useRoute()
const query = groq`*[_type == "article" && slug.current == '${route.params.slug}'] [0]{
    title,
    subtitle,
    publishedAt,
    _updatedAt,
    content,
    files,
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
