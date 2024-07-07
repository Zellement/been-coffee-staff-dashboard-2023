<template>
    <label class="grid justify-between w-full grid-cols-12 gap-2 lg:items-center">
        <span class="mb-2 font-bold col-span-full md:col-span-4">{{ item }}</span>
        <span class="relative grid items-center justify-center grid-cols-2 col-span-5 gap-1 md:col-span-3 md:col-start-5">
            <span
                :class="[plusMinusClasses, dynamicMinusClasses]"
                @click="togglePlusMinus('minus')"
            >Below 0&deg;</span>
            <span
                :class="[plusMinusClasses, dynamicPlusClasses]"
                @click="togglePlusMinus('plus')"
            >
                Above 0&deg;</span>
        </span>
        <input
            v-model="input"
            class="col-span-4 col-start-6 text-center dark:bg-navy-400 md:col-span-2 md:col-start-9"
            min="0"
            :name="`${item} raw`"
            step=".1"
            type="number"
            placeholder="Temp"
            required
        >
        <input
            :name="item"
            readonly
            class="col-span-2 col-start-11 text-center bg-transparent pointer-events-none"
            :value="valueString"
        >
    </label>
</template>

<script setup>

const props = defineProps({
    item: {
        type: String,
        required: true
    },
    plusOrMinus: {
        type: String,
        required: false,
        default: 'plus'
    }
})

const plusMinusClasses = computed(() => {
    return 'px-1 flex items-center justify-center bg-gradient-to-b col-span-1 whitespace-no-wrap text-2xs cursor-pointer'
})

const dynamicPlusClasses = computed(() => {
    return state.plusOrMinus === 'plus' ? 'from-orange-500 to-orange-800 text-white' : 'bg-none'
})

const dynamicMinusClasses = computed(() => {
    return state.plusOrMinus === 'minus' ? 'from-blue-500 to-blue-400 text-white' : 'bg-none'
})

const input = ref()

const state = reactive({
    plusOrMinus: props.plusOrMinus
})

const togglePlusMinus = (value) => {
    state.plusOrMinus = value
}

const isAboveZero = computed(() => { return state.plusOrMinus === 'plus' ? '+' : '-' })

const valueString = computed(() => {
    return input.value ? `${isAboveZero.value}${input.value}°C` : '- -'
})

</script>
