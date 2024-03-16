<template>
    <div
        v-if="articleData"
        class="container flex flex-col items-center pb-20 mb-16 space-y-8"
    >
        <content-hero
            :title="articleData.title"
            :subtitle="articleData.subtitle"
            :date="articleData.publishedAt"
        />
        <PortableText
            :value="articleData.content"
            :components="myPortableTextComponents"
        />
    </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'
// import { getFileAsset } from '@sanity/asset-utils'

const route = useRoute()
const query = groq`*[_type == "article" && slug.current == '${route.params.slug}'] [0]{
    title,
    subtitle,
    publishedAt,
    content 
}
`
const sanity = useSanity()

const { data } = await useAsyncData('singleArticle', () => sanity.fetch(query))

const articleData = computed(() => {
    return data.value
})

const myPortableTextComponents = {
    types: {
        file: ({ value }) => {
            console.log(value)
            // const fullAsset = getFileAsset(value)
            // console.log(fullAsset)

            // h('a', { src:  }) console.log(value)
        },
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

</script>
