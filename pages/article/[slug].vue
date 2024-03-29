<template>
    <div class="container flex flex-col items-center pb-20 mb-16 space-y-8">
        <content-hero
            :title="data.article.title"
            :date="data.article._updatedAt"
            :subtitle="data.article.subtitle"
        />
        <template v-if="articleData.articleContent">
            <div
                v-for="content in articleData.articleContent"
                :key="content.id"
                class="w-full overflow-x-auto"
            >
                <div
                    v-if="content._modelApiKey === 'text_block'"
                    class="max-w-screen-md mx-auto content"
                    v-html="content.text"
                />
                <div
                    v-if="content._modelApiKey === 'image_block'"
                >
                    <div
                        :class="content.fullWidth ? 'w-full' : 'max-w-screen-md mx-auto'"
                    >
                        <img
                            v-for="image in content.images"
                            :key="image.id"
                            :src="image.url"
                        >
                    </div>
                </div>
                <div
                    v-if="content._modelApiKey === 'download_block'"
                >
                    <ul class="flex flex-col max-w-screen-md mx-auto space-y-2">
                        <li
                            v-for="pdf in content.pdfs"
                            :key="pdf.id"
                            class="flex button"
                        >
                            <a
                                :href="pdf.url"
                                target="_blank"
                            >
                                {{ pdf.title }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div
                    v-if="content._modelApiKey === 'video_block'"
                    class="max-w-screen-md mx-auto content"
                >
                    <video
                        :width="content.video.width"
                        :height="content.video.height"
                        controls
                        class="mx-auto"
                    >
                        <source
                            :src="content.video.url"
                            :type="content.video.video.mimeType"
                        >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>

const QUERY = `query ArticleQuery ($slug: String!) {
        article(filter: {slug: {eq: $slug}}) {
            _updatedAt
            slug
            subtitle
            title
            articleContent {
                ... on DownloadBlockRecord {
                    id
                    _modelApiKey
                    pdfs {
                        url
                        title
                    }
            }
                ... on ImageBlockRecord {
                    id
                    _modelApiKey
                    fullWidth
                    images {
                        url
                        id
                    }
                }
                ... on TextBlockRecord {
                    id
                    text
                    _modelApiKey
                }
                ... on VideoBlockRecord {
                    id
                    _modelApiKey
                    video {
                        width
                        height
                        video {
                            streamingUrl
                            thumbnailUrl
                        }
                        url
                        mimeType
                    }
                }
            }
        }
    }
`
const route = useRoute()
const { data } = await useGraphqlQuery({ query: QUERY, variables: { slug: route.params.slug } })

const articleData = computed(() => {
    return data.value.article
})

useHead({
    title: data.value?.article.title
})
</script>
