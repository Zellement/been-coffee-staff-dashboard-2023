<template>
    <div class="scroll-mt-32">
        <div class="relative flex w-full flex-col overflow-hidden lg:pt-2">
            <!-- :id="buttonId" -->
            <!-- :class="buttonClasses" -->
            <!-- :aria-controls="contentId" -->
            <button
                class="flex items-center gap-1 text-2xs uppercase"
                :aria-label="`Toggle the content of ${title}`"
                :aria-expanded="openAccordion"
                @click.prevent="toggleAccordion"
            >
                <div
                    :class="[
                        'justify relative flex w-full flex-row items-center gap-2 pb-1'
                    ]"
                >
                    <span class="flex flex-col items-center gap-1">
                        <span v-if="title">
                            {{ title }}
                        </span>
                    </span>
                    <Icon :name="iconName" class="transition-transform" />
                </div>
            </button>

            <div class="accordion" role="region" :class="accordionClasses">
                <div ref="slotData" class="accordion-content">
                    <div class="relative pt-0 lg:pt-4">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/*---------------------
State, emits, refs & props
---------------------*/

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    isOpen: {
        type: Boolean,
        default: false
    }
})

const shouldBeOpen = computed(() => {
    return props.isOpen
})

// const slotData = ref<HTMLElement>()
const openAccordion = ref(false)

/*---------------------
Computed
---------------------*/

const iconName = computed(() => {
    return openAccordion.value ? 'bx:minus' : 'bx:plus'
})

const accordionClasses = computed(() => {
    return openAccordion.value ? 'expanded' : ''
})

/*---------------------
Functions
---------------------*/

const toggleAccordion = () => {
    openAccordion.value = !openAccordion.value
    if (!openAccordion.value) return
    emit('open')
}

/*---------------------
Hooks
---------------------*/

watch(
    shouldBeOpen,
    (value) => {
        openAccordion.value = value
    },
    { immediate: true }
)
</script>

<style lang="scss" scoped>
.accordion {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 700ms;
}
.accordion-content {
    min-height: 0;
    transition: visibility 700ms;
    visibility: hidden;
}
.accordion.expanded {
    grid-template-rows: 1fr;
}
.accordion.expanded .accordion-content {
    visibility: visible;
}
</style>
