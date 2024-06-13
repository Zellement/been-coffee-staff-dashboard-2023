<template>
    <div class="relative">
        <div class="container ">
            <h2 class="h1">
                Standing Orders
            </h2>
        </div>
        <div
            v-if="standingOrders"
            class="px-2 overflow-hidden md:px-4 xl:px-6"
        >
            <div class="w-full py-8 overflow-x-scroll">
                <div class="flex flex-row w-full space-x-4">
                    <div
                        v-for="item in standingOrders"
                        :key="item._id"
                        class="flex relative flex-col w-3/4 p-4 !rounded-tl-none !rounded-tr-none md:w-auto min-w-[300px] sm:w-2/5 card"
                    >
                        <div class="absolute -top-px border dark:border-navy-500 border-b-0 left-0 uppercase -translate-y-full bg-white text-3xs px-2 dark:text-navy-50 dark:bg-navy-700 text-gray-400 py-0.5 tracking-wider">
                            {{ item.supplier.title }}
                        </div>
                        <div class="flex col-span-2 px-1 py-2 mb-4 overflow-hidden  rounded-full">
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
                                <order-details :details="item.standingOrderDetails" />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
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
