<template>
    <div class="relative">
        <div class="container flex flex-row justify-between">
            <h2 class="h1 flex gap-2 items-center">
                <Icon
                    name="mingcute:google-fill"
                    class="w-6 h-6 translate-y-px"
                />
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
                    v-for="item in googleReviewData"
                    :key="item.id"
                >
                    <card-review
                        :string="true"
                        :name="item.user.name"
                        :date-string="item.date"
                        :rating="item.rating"
                        :review-text="item.snippet"
                        :response="item.response?.snippet"
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

const reviewsStore = useReviewsStore()

const googleReviewData = computed(() => {
    return reviewsStore.reviewsGoogle
})

</script>
