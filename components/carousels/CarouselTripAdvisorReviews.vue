<template>
    <div class="relative">
        <div class="container flex flex-row justify-between">
            <h2 class="h1 flex gap-2 items-center">
                <Icon
                    name="simple-icons:tripadvisor"
                    class="w-6 h-6 translate-y-px"
                />
                Reviews
            </h2>
            <nuxt-link
                class="button flex-shrink-0 self-end"
                target="_blank"
                to="https://www.tripadvisor.co.uk/Restaurant_Review-g1234748-d23838579-Reviews-Been_Coffee-Willington_Derbyshire_England.html"
            >
                See more
            </nuxt-link>
        </div>
        <div
            v-if="tripadvisorData"
        >
            <carousel-wrapper>
                <template
                    v-for="item in tripadvisorData"
                    :key="item.id"
                >
                    <card-review
                        :string="true"
                        :name="item.user.username"
                        :date-string="shortDateConverter(item.published_date)"
                        :rating="item.rating"
                        :review-text="item.text"
                        :title="item.title"
                        :response="item?.owner_response?.text"
                    />
                </template>
            </carousel-wrapper>
        </div>
    </div>
</template>

<script setup>
import { useReviewsStore } from '@/stores/reviews'

const reviewsStore = useReviewsStore()

const { shortDateConverter } = useDateUtils()

const tripadvisorData = computed(() => {
    return reviewsStore.reviewsTripadvisor
})

</script>
