<template>
    <div class="relative">
        <div class="container flex flex-row justify-between">
            <h2 class="h1 flex items-center gap-2">Reviews</h2>
            <button
                class="button flex items-center gap-1 text-2xs uppercase hover:underline"
                @click="toggleDetails"
            >
                Toggle feedback
                <div class="relative flex h-3 w-3">
                    <Icon
                        v-if="showDetails"
                        name="mdi:minus"
                        class="top-0flex absolute h-3 w-3 transition-all"
                    />
                    <Icon
                        v-else
                        name="mdi:plus"
                        class="top-0flex absolute h-3 w-3 transition-all"
                    />
                </div>
            </button>
        </div>
        <div v-if="googleReviewData">
            <carousel-wrapper>
                <template v-for="item in allReviews" :key="item?.id">
                    <card-review
                        :string="true"
                        :name="item.user ?? 'Anonymous'"
                        :date-string="item.dateString"
                        :rating="item.rating"
                        :review-text="item.reviewText"
                        :response="item.response"
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
        <div v-else class="container py-4">
            <h2>Why no Google reviews?</h2>
            <p>
                We are running a free tier to retrieve Google reviews. So on
                occasion, the API may not return any data. Please try again
                another day.
            </p>
        </div>
    </div>
</template>

<script setup>
import { useReviewsStore } from '@/stores/reviews'
const { shortDateConverter } = useDateUtils()
const reviewsStore = useReviewsStore()
const uiStore = useUiStore()

const googleReviewData = computed(() => {
    return reviewsStore.reviewsGoogle ?? []
})

const tripadvisorData = computed(() => {
    return reviewsStore.reviewsTripadvisor ?? []
})

const toggleDetails = () => {
    uiStore.toggleShowReviewDetails()
}
const showDetails = computed(() => uiStore.showReviewDetails)

function normalizeGoogleReview(review) {
    return {
        id: review.review_id ?? '',
        date: new Date(review.iso_date),
        dateString: shortDateConverter(new Date(review.iso_date)),
        rating: review.rating,
        reviewText: review.snippet,
        user: review?.user?.name,
        source: 'Google',
        icon: 'mingcute:google-fill',
        details: {
            food: review.details?.food,
            service: review.details?.service,
            atmosphere: review.details?.atmosphere
        },
        response: review.response?.snippet ?? null
    }
}

function normalizeTripadvisorReview(review) {
    return {
        id: review.id ?? '',
        date: new Date(review.published_date),
        dateString: shortDateConverter(new Date(review.published_date)),
        rating: review.rating,
        reviewText: review.text ?? '',
        user: review?.user?.username,
        title: review.title,
        source: 'Tripadvisor',
        icon: 'simple-icons:tripadvisor',
        details: null,
        response: review.owner_response?.text ?? ''
    }
}

const allReviews = computed(() => {
    // Normalize the data
    const normalizedGoogleReviews = googleReviewData.value?.map(
        normalizeGoogleReview
    )
    const normalizedTripadvisorReviews = tripadvisorData.value?.map(
        normalizeTripadvisorReview
    )

    // Merge the arrays
    const mergedReviews = normalizedGoogleReviews.concat(
        normalizedTripadvisorReviews
    )

    // Sort the merged array by date in descending order
    mergedReviews.sort((a, b) => b.date - a.date)

    // Return the sorted array
    return mergedReviews
})
</script>
