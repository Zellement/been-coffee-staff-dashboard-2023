<template>
    <div class="relative">
        <div class="container">
            <h2 class="h1">Recently Updated Articles</h2>
        </div>
        <carousel-wrapper>
            <li v-for="item in data" :key="item._id" class="card w-40 min-w-40">
                <nuxt-link
                    class="border-current/40 flex flex-grow flex-col transition-colors duration-300 hover:underline"
                    :to="`/article/${item.slug?.current}`"
                >
                    <span class="krete-title !text-sm">{{ item.title }}</span>
                    <span class="mt-auto text-2xs opacity-50"
                        >Updated: {{ inputDate(item._updatedAt) }}</span
                    >
                </nuxt-link>
            </li>
        </carousel-wrapper>

        <div class="container flex w-full">
            <button-site-search
                display-text="See all articles"
                class="button ml-auto"
            />
        </div>
    </div>
</template>

<script setup>
const query = groq`*[_type == "article"]|order(_updatedAt desc)[0..5]{  
  title,
  subtitle,
  publishedAt,
  _updatedAt,
  slug,
}

`

const sanity = useSanity()

const { data } = await useAsyncData('latestUpdatedArticles', () =>
    sanity.fetch(query)
)

const inputDate = (date) => {
    const theDate = new Date(date)
    return theDate.toLocaleString('en-GB', {
        timeZone: 'Europe/London',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}
</script>
