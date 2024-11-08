<template>
    <div class="relative">
        <div class="container flex flex-row justify-between">
            <h2 class="h1 flex gap-2 items-center">
                Reviews
            </h2>
            <nuxt-link
                class="button flex-shrink-0 self-end"
                target="_blank"
                to="https://www.google.com/search?q=been+coffee&rlz=1C5CHFA_enGB999GB999&oq=been+coffe&gs_lcrp=EgZjaHJvbWUqDAgAECMYJxiABBiKBTIMCAAQIxgnGIAEGIoFMhAIARAuGK8BGMcBGIAEGI4FMgYIAhBFGDkyBwgDEAAYgAQyBggEEEUYQTIGCAUQRRhBMgYIBhBFGEEyBggHEEUYPagCALACAA&sourceid=chrome&ie=UTF-8&zx=1721406730390&no_sw_cr=1#lrd=0x4879f76a544386ad:0xdd73c388e6606809,1,,,,"
            >
                See more
            </nuxt-link>
        </div>
        <div
            v-if="googleReviewData"
        >
            <carousel-wrapper>
                <template
                    v-for="item in allReviews"
                    :key="item.id"
                >
                    <card-review
                        :string="true"
                        :name="item.user"
                        :date-string="item.dateString"
                        :rating="item.rating"
                        :review-text="item.response"
                        :icon="item.icon"
                        :title="item.title ?? null"
                    >
                        <template #feedbackExtra>
                            <ul class="mt-6 italic">
                                <li v-if="item?.details?.food">
                                    Food: {{ item?.details?.food }}
                                </li>
                                <li v-if="item?.details?.service">
                                    Service: {{ item?.details?.service }}
                                </li>
                                <li v-if="item?.details?.atmosphere">
                                    Atmosphere: {{ item?.details?.atmosphere }}
                                </li>
                            </ul>
                        </template>
                    </card-review>
                </template>
            </carousel-wrapper>
        </div>
        <div
            v-else
            class="container py-4"
        >
            <h2>Why no Google reviews?</h2>
            <p>We are running a free tier to retrieve Google reviews. So on occasion, the API may not return any data. Please try again another day.</p>
        </div>
    </div>
</template>

<script setup>
import { useReviewsStore } from '@/stores/reviews'
const { shortDateConverter } = useDateUtils()
const reviewsStore = useReviewsStore()

const googleReviewData = computed(() => {
    return reviewsStore.reviewsGoogle
})

const tripadvisorData = computed(() => {
    return reviewsStore.reviewsTripadvisor
})

function normalizeGoogleReview (review) {
    console.log(review.response?.snippet)
    return {
        id: review.review_id,
        date: new Date(review.iso_date),
        dateString: shortDateConverter(new Date(review.iso_date)),
        rating: review.rating,
        text: review.snippet,
        user: review.user.name,
        source: 'Google',
        icon: 'mingcute:google-fill',
        details: {
            food: review.details.food,
            service: review.details.service,
            atmosphere: review.details.atmosphere
        },
        response: review.response?.snippet ?? null
    }
}

function normalizeTripadvisorReview (review) {
    // console.log(review)
    return {
        id: review.id,
        date: new Date(review.published_date),
        dateString: shortDateConverter(new Date(review.published_date)),
        rating: review.rating,
        text: review.text,
        user: review.user.username,
        title: review.title,
        source: 'Tripadvisor',
        icon: 'simple-icons:tripadvisor',
        details: null,
        response: review.response
    }
}

const allReviews = computed(() => {
    // Normalize the data
    const normalizedGoogleReviews = googleReviewData.value.map(normalizeGoogleReview)
    const normalizedTripadvisorReviews = tripadvisorData.value.map(normalizeTripadvisorReview)

    // Merge the arrays
    const mergedReviews = normalizedGoogleReviews.concat(normalizedTripadvisorReviews)

    // Sort the merged array by date in descending order
    mergedReviews.sort((a, b) => b.date - a.date)

    // Return the sorted array
    return mergedReviews
})

</script>
