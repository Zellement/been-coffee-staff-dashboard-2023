<template>
    <div class="relative">
        <div class="container ">
            <h2 class="h1">
                Recent 15 Orders
            </h2>
        </div>
        <div
            v-if="allOrders"
            class="px-2 overflow-hidden md:px-4 xl:px-6"
        >
            <div class="w-full py-8 overflow-x-scroll ">
                <div class="flex flex-row w-full space-x-4">
                    <div
                        v-for="item in allOrders"
                        :key="item._id"
                        class="flex relative card !rounded-tl-none !rounded-tr-none flex-col w-3/4 p-4 shadow-lg min-w-[300px] "
                    >
                        <div class="absolute -top-px border dark:border-navy-500 border-b-0 left-0 uppercase -translate-y-full bg-white text-3xs px-2 dark:text-navy-50 dark:bg-navy-700 text-gray-400 py-0.5 tracking-wider">
                            {{ item.supplier.title }}
                        </div>
                        <div class="absolute top-0 right-0 border dark:border-navy-500 border-b-0 uppercase -translate-y-full  text-3xs px-2 dark:text-navy-50 dark:bg-navy-500/50 text-gray-400 py-0.5 tracking-wider">
                            {{ dateConverterWithDay(item.orderDate) }}
                        </div>
                        <div class="flex flex-col w-full">
                            <div class="flex justify-between h-16 p-1 mb-2 overflow-hidden">
                                <div class="h-full bg-white flex-grow-0 rounded-full overflow-hidden flex shadow">
                                    <img
                                        :src="$urlFor(item.supplier.logo).height(50).fit('clip').url()"
                                        class="w-20 my-auto px-4 bg-white "
                                        height="60"
                                        loading="lazy"
                                    >
                                </div>
                                <img
                                    :src="$urlFor(item.orderedBy.image).width(54).height(54).url()"
                                    class=" aspect-square rounded-full"
                                    width="54"
                                    height="54"
                                    loading="lazy"
                                >
                            </div>
                            <!-- <div
                                class="mb-4 text-xs italic text-center opacity-50"
                            >
                                <p>
                                    Ordered by {{ getOrderedBy(item) }} on
                                    {{ dateConverterWithDay(item.orderDate) }}
                                </p>
                            </div> -->
                            <div class="flex flex-col text-sm">
                                <span class="flex flex-row items-center justify-center space-x-1 dark:text-butterscotch-500 text-navy-500">
                                    <Icon
                                        class="w-6 h-6 p-1"
                                        name="clarity:truck-solid"
                                    />
                                    <span>Delivery
                                        {{ dateConverterWithDay(item.expectedDeliveryDate) }}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <template v-if="item.usualOrder">
                            <div class="flex flex-col mt-4">
                                <p class="italic text-center opacity-50">
                                    Usual order for this supplier.
                                </p>
                            </div>
                        </template>
                        <template v-if="item.orderDetails">
                            <div class="flex flex-col mt-auto">
                                <order-details :details="item.orderDetails" />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { dateConverterWithDay } from '@/scripts/helpers'

const query = groq`
*[_type == "order"]|order(expectedDeliveryDate desc)[0..14]{
  supplier->{
    logo,
    title
  },
  orderDate,
  expectedDeliveryDate,
  orderedBy->{
     image,
    name
  },
    _id,
  usualOrder,
  orderDetails
}

`

const sanity = useSanity()

const { data } = await useAsyncData('orders', () => sanity.fetch(query))

const allOrders = computed(() => {
    return data.value
})
// const getOrderedBy = (item) => {
//     return item.orderedBy?.name ?? 'Sarah'
// }

</script>
