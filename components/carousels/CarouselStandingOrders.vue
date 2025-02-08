<template>
    <div class="relative">
        <div class="container">
            <h2 class="h1">Standing Orders</h2>
        </div>
        <div v-if="standingOrders">
            <carousel-wrapper class="pt-2" track-classes="pt-6">
                <li
                    v-for="item in standingOrders"
                    :key="item._id"
                    class="card relative w-64 min-w-64 !rounded-tl-none !rounded-tr-none"
                >
                    <div
                        class="absolute -top-px left-0 -translate-y-full border border-b-0 bg-white px-2 py-0.5 text-3xs uppercase tracking-wider text-gray-400 dark:border-navy-500 dark:bg-navy-700 dark:text-navy-50"
                    >
                        {{ item.supplier.title }}
                    </div>
                    <div class="col-span-2 mb-4 flex rounded-full px-1 py-2">
                        <img
                            class="m-auto h-auto max-h-14 w-auto rounded-full p-2 shadow-lg"
                            :src="$urlFor(item.supplier.logo).height(60).url()"
                            height="60"
                        />
                    </div>
                    <div class="col-span-5 flex flex-col text-xs">
                        <span
                            class="my-auto flex flex-row items-center space-x-2 text-navy-500 dark:text-butterscotch-500"
                        >
                            <Icon class="h-5 w-5" name="clarity:truck-solid" />
                            <span>{{ item.frequency }} </span>
                        </span>
                    </div>
                    <template v-if="item.standingOrderDetails">
                        <div class="mt-4 flex flex-col">
                            <card-order-details
                                :details="item.standingOrderDetails"
                            />
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
