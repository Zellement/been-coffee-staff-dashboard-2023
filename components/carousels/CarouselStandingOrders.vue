<template>
    <div class="relative">
        <div class="container">
            <h2 class="h1">
                Standing Orders
            </h2>
        </div>
        <div
            v-if="standingOrders"
        >
            <carousel-wrapper
                class="pt-2"
                track-classes="pt-6"
            >
                <li
                    v-for="item in standingOrders"
                    :key="item._id"
                    class="relative w-64 min-w-64 !rounded-tl-none !rounded-tr-none card"
                >
                    <div class="absolute -top-px border dark:border-navy-500 border-b-0 left-0 uppercase -translate-y-full bg-white text-3xs px-2 dark:text-navy-50 dark:bg-navy-700 text-gray-400 py-0.5 tracking-wider">
                        {{ item.supplier.title }}
                    </div>
                    <div class="flex col-span-2 px-1 py-2 mb-4 rounded-full">
                        <img
                            class="w-auto h-auto m-auto max-h-14 shadow-lg p-2 rounded-full"
                            :src="$urlFor(item.supplier.logo).height(60).url()"
                            height="60"
                        >
                    </div>
                    <div class="flex flex-col col-span-5 text-xs">
                        <span class="flex flex-row items-center my-auto space-x-2 dark:text-butterscotch-500 text-navy-500">
                            <Icon
                                class="w-5 h-5 "
                                name="clarity:truck-solid"
                            />
                            <span>{{ item.frequency }}
                            </span>
                        </span>
                    </div>
                    <template v-if="item.standingOrderDetails">
                        <div class="flex flex-col mt-4">
                            <card-order-details :details="item.standingOrderDetails" />
                        </div>
                    </template>
                </li>
            </carousel-wrapper>
        </div>
    </div>
</template>

<script setup>

const query = groq`
*[_type == "standingOrder"]{
    supplier->{
        logo,
        title
    },
    _id,
    frequency,
    standingOrderDetails
}
`

const sanity = useSanity()

const { data } = await useAsyncData('standingOrders', () => sanity.fetch(query))

const standingOrders = computed(() => {
    return data.value
})

</script>
