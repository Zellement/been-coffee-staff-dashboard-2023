<template>
    <div>
        <div class="sticky top-0 flex flex-row items-center justify-between gap-2 py-1.5 bg-seashell dark:bg-navy mb-6">
            <div class="flex flex-row gap-3">
                <div
                    class="flex self-stretch w-4"
                    :class="style"
                />
                <div class="flex flex-col ">
                    <h3 class="h6">
                        {{ titleBrow }}
                    </h3>
                    <h3 class="h3">
                        {{ title }}
                    </h3>
                </div>
            </div>
            <p
                class="flex flex-col justify-between duration-300 transform-all"
            >
                <span class="leading-none text-2xs">Total</span>
                <span>{{ totalValueFormatted }}</span>
            </p>
            <p
                class="flex flex-col justify-between duration-300 transform-all"
            >
                <span class="leading-none text-2xs">Difference</span>
                <span
                    :class="differenceColor"
                >{{ differenceFormatted }}</span>
            </p>
        </div>
        <div class="flex flex-col gap-2">
            <div class="grid grid-cols-3">
                <span class="font-bold">Cash</span>
                <span class="font-bold">Value</span>
                <span class="font-bold">Count</span>
            </div>
            <label
                v-for="(item) in state.denominations"
                :key="`black-tin__${item}`"
                class="grid grid-cols-3 gap-2"
            >
                <span>{{ item.denomination }}</span>
                <span>{{ getValue(item) }}</span>
                <input
                    v-model="item.value"
                    :name="`${item}_amount`"
                    type="number"
                >
            </label>
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

const getValue = (item) => {
    return formatter.format(item.value * item.multiple)
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
    return formatter.format(totalValue.value)
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
