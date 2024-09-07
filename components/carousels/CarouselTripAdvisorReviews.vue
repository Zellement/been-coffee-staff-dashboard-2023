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
            class="px-2 overflow-hidden md:px-4 xl:px-6"
        >
            <div class="w-full py-8 overflow-x-scroll ">
                <div class="flex flex-row w-full space-x-4">
                    <template
                        v-for="item in tripadvisorData"
                        :key="item.id"
                    >
                        <card-review
                            :details="item.snippet ?? null"
                            :string="true"
                            :name="item.user.username"
                            :date-string="shortDateConverter(item.published_date)"
                            :rating="item.rating"
                            :review-text="item.text"
                            :title="item.title"
                            :response="item?.owner_response?.text"
                        />
                    </template>
                </div>
            </div>
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
