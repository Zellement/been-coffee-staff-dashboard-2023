<template>
    <div class="relative">
        <div class="container " />
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
            class="px-2 overflow-hidden md:px-4 xl:px-6"
        >
            <div class="w-full py-8 overflow-x-scroll ">
                <div class="flex flex-row w-full space-x-4">
                    <div
                        v-for="item in googleReviewData"
                        :key="item.id"
                        class="flex relative flex-col w-3/4 p-4 gap-2 shadow-lg  min-w-[300px] card"
                    >
                        <div class="flex gap-2">
                            <Icon
                                name="material-symbols:person"
                                class="w-6 h-6 text-butterscotch"
                            />
                            {{ item.user.name }}
                        </div>
                        <div class="flex gap-2">
                            <Icon
                                name="material-symbols:calendar-month-outline-sharp"
                                class="w-6 h-6 text-butterscotch"
                            />
                            {{ shortDateConverter(item.iso_date) }}
                        </div>

                        <div class="flex gap-1 relative">
                            <Icon
                                v-for="i in 5"
                                :key="i"
                                name="ic:outline-star-outline"
                                class="w-6 h-6 text-butterscotch opacity-30"
                            />
                            <div class="absolute top-0 left-0 flex gap-1">
                                <Icon
                                    v-for="i in item.rating"
                                    :key="i"
                                    name="ic:outline-star"
                                    class="w-6 h-6 text-butterscotch"
                                />
                            </div>
                        </div>
                        <div class="">
                            <card-order-details
                                :details="item.snippet ?? null"
                                :string="true"
                            >
                                <template #extraData>
                                    <ul class="mb-6">
                                        <li v-if="item.details.food">
                                            Food: {{ item.details.food }}
                                        </li>
                                        <li v-if="item.details.service">
                                            Service: {{ item.details.service }}
                                        </li>
                                        <li v-if="item.details.atmosphere">
                                            Atmosphere: {{ item.details.atmosphere }}
                                        </li>
                                    </ul>
                                </template>
                                <template
                                    v-if="item?.response?.snippet"
                                    #response
                                >
                                    <div
                                        class="mt-8 italic border-t pt-8 border-opacity-30 border-gray-500"
                                    >
                                        {{ item?.response?.snippet }}
                                    </div>
                                </template>
                            </card-order-details>
                        </div>
                    </div>
                </div>
            </div>
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
const { shortDateConverter } = useDateUtils()

const googleReviewData = computed(() => {
    return reviewsStore.reviewsGoogle
})

</script>
