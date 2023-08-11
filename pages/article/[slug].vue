<template>
    <div class="container flex flex-col items-center space-y-8">
        <div class="flex flex-col items-center p-8 text-center shadow-xl bg-seashell/10 rounded-xl">
            <p class="text-xs">
                Last updated: {{ dateConverter(data.article._updatedAt) }}
            </p>
            <h1 class="h1">
                {{ data.article.title }}
            </h1>
            <h2 class="h2 text-tuscany">
                {{ data.article.subtitle }}
            </h2>
        </div>
        <template v-if="articleData.articleContent">
            <div
                v-for="content in articleData.articleContent"
                :key="content.id"
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
                        :class="content.fullWidth ? 'w-full' : 'max-w-screen-md'"
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
                    <ul class="flex flex-col space-y-2">
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
            </div>
        </template>
    </div>
</template>

<script setup>
import { dateConverter } from '@/scripts/helpers'

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
                        url
                        width
                        height
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

</script>
