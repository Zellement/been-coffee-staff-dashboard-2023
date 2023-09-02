<template>
    <div class="pb-8 border-b border-seashell-600 dark:border-navy-300">
        <div class="sticky top-0 grid grid-cols-6 justify-between gap-2 py-1.5 bg-seashell dark:bg-navy mb-6 ">
            <div class="flex flex-row self-end col-span-3 gap-3 md:col-span-4">
                <div
                    class="flex self-stretch w-4"
                    :class="style"
                />
                <div class="flex flex-col ">
                    <h3 class="leading-none font-riverside">
                        {{ titleBrow }}
                    </h3>
                    <h3 class="text-xl leading-none font-riverside">
                        {{ title }}
                    </h3>
                </div>
            </div>
            <div class="flex flex-row justify-between w-full col-span-3 md:col-span-2">
                <p
                    class="flex flex-col self-end justify-between leading-none duration-300 transform-all"
                >
                    <span class="text-right text-2xs">Total</span>

                    <input
                        tabindex="-1"
                        readonly
                        :class="totalColor"
                        :value="totalValueFormatted"
                        :name="`${collection} total`"
                        class="w-full text-right"
                    >
                </p>
                <p
                    v-if="props.collection !== 'Banking'"
                    class="flex flex-col self-end justify-between mt-auto leading-none duration-300 denominations-end transform-all"
                >
                    <span class="text-right text-2xs">
                        <Icon
                            name="mdi:plus-minus-variant"
                            class="flex w-3 h-3 "
                        />
                    </span>
                    <input
                        tabindex="-1"
                        readonly
                        :class="differenceColor"
                        :value="differenceFormatted"
                        :name="`${collection} difference`"
                        class="w-full text-right"
                    >
                </p>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div class="grid items-center grid-cols-12">
                <span class="col-span-2 font-bold">Cash</span>
                <span class="col-span-5 font-bold">Value</span>
                <span class="col-span-5 font-bold">Count</span>
            </div>
            <div
                v-for="denomination in state.denominations"
                :key="`black-tin__${denomination}`"
                class="grid items-center grid-cols-12"
            >
                <span class="col-span-2">{{ denomination.denomination }}</span>
                <input
                    class="col-span-5 pointer-events-none"
                    readonly
                    tabindex="-1"
                    :value="getValue(denomination)"
                    :name="`${collection} ${denomination.denomination} value`"
                >
                <input
                    v-model="denomination.value"
                    class="col-span-5"
                    :name="`${collection} ${denomination.denomination} count`"
                    type="number"
                >
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    collection: {
        type: String,
        required: true
    },
    collectionBrow: {
        type: String,
        required: false,
        default: null
    },
    collectionStyle: {
        type: String,
        required: true
    }
})

const title = computed(() => {
    return props.collection
})

const titleBrow = computed(() => {
    return props.collectionBrow
})

const style = computed(() => {
    return props.collectionStyle
})
const state = reactive({
    denominations: [
        { denomination: '1p', value: 0, multiple: 0.01 },
        { denomination: '2p', value: 0, multiple: 0.02 },
        { denomination: '5p', value: 0, multiple: 0.05 },
        { denomination: '10p', value: 0, multiple: 0.1 },
        { denomination: '20p', value: 0, multiple: 0.2 },
        { denomination: '50p', value: 0, multiple: 0.5 },
        { denomination: '£1', value: 0, multiple: 1 },
        { denomination: '£2', value: 0, multiple: 2 },
        { denomination: '£5', value: 0, multiple: 5 },
        { denomination: '£10', value: 0, multiple: 10 },
        { denomination: '£20', value: 0, multiple: 20 }
    ]
})

const formatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP'
})

const getValue = (denomination) => {
    return formatter.format(denomination.value * denomination.multiple)
}

const totalValue = computed(() => {
    let value = 0
    state.denominations.forEach(element => {
        value = value + (element.value * element.multiple)
    }
    )
    return value
})

const totalValueFormatted = computed(() => {
    return totalValue.value === 0 ? '£--.--' : formatter.format(totalValue.value)
})

const totalColor = computed(() => {
    return totalValue.value === 0 ? 'opacity-20' : null
})

const difference = computed(() => {
    return totalValue.value - 100
})

const differenceFormatted = computed(() => {
    return totalValue.value === 0 ? '£--.--' : formatter.format(difference.value)
})

const differenceColor = computed(() => {
    return totalValue.value === 0 ? 'opacity-20' : difference.value === 0 ? 'text-green-500' : 'text-red-500'
})

watch(difference, (newVal, oldVal) => {
    if (newVal === oldVal) return false
    state.totalsAnimating = true
    setTimeout(() => {
        state.totalsAnimating = false
    }, 500)
})

</script>
