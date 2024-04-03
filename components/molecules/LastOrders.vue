<template>
    <div class="relative">
        <div class="container ">
            <h2 class="h1">
                Recent 15 Orders
            </h2>
        </div>
        <div
            v-if="allOrders"
            class="px-2 overflow-hidden md:px-4"
        >
            <div class="w-full py-8 overflow-x-scroll ">
                <div class="flex flex-row w-full space-x-4">
                    <div
                        v-for="item in allOrders"
                        :key="item._id"
                        class="flex relative flex-col w-3/4 p-4 shadow-lg  min-w-[300px] bg-seashell-400 dark:bg-navy-400"
                    >
                        <div class="absolute top-0 left-0 uppercase -translate-y-1/2 bg-white text-3xs px-2 dark:text-navy-50 dark:bg-navy-400 text-gray-400 py-0.5 tracking-wider">
                            {{ item.supplier.title }}
                        </div>
                        <div class="flex flex-col w-full">
                            <div class="flex justify-between h-16 p-1 mb-2 overflow-hidden bg-white border border-gray-200 ">
                                <img
                                    :src="$urlFor(item.supplier.logo).height(50).fit('clip').url()"
                                    class="w-auto my-auto max-w-[50%] pl-4"
                                    height="60"
                                    loading="lazy"
                                >
                                <img
                                    :src="$urlFor(item.orderedBy.image).width(54).height(54).url()"
                                    class=" aspect-square"
                                    width="54"
                                    height="54"
                                    loading="lazy"
                                >
                            </div>
                            <div
                                class="mb-4 text-xs italic text-center opacity-50"
                            >
                                <p>
                                    Ordered by {{ getOrderedBy(item) }} on
                                    {{ dateConverterWithDay(item.orderDate) }}
                                </p>
                            </div>
                            <div class="flex flex-col text-sm">
                                <span class="flex flex-row items-center justify-center space-x-1 dark:text-butterscotch-500 text-navy-500">
                                    <Icon
                                        class="w-6 h-6 p-1"
                                        name="clarity:truck-solid"
                                    />
                                    <span>
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
                            <div class="flex flex-col mt-4">
                                <h3 class="h4">
                                    Details
                                </h3>
                                <div class="content">
                                    <PortableText
                                        :value="item.orderDetails"
                                    />
                                </div>
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
import { PortableText } from '@portabletext/vue'

const query = groq`
*[_type == "order"][0..14] | order(expectedDeliveryDate desc){
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
const getOrderedBy = (item) => {
    return item.orderedBy?.name ?? 'Sarah'
}

</script>
