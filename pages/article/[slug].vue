<template>
    <div class="container">
        <p>Last updated: {{ dateConverter(data.article._updatedAt) }}</p>
        <h1 class="h1">{{  data.article.title }}</h1>
        <h2 class="h2">{{  data.article.subtitle }}</h2>

        {{data}}
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
            ... on TextBlockRecord {
                id
            }
            }
        }
    }
`
const route = useRoute()
const { data } = await useGraphqlQuery({ query: QUERY, variables: { slug: route.params.slug } })

</script>
