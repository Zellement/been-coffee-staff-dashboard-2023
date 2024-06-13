<template>
    <div class="relative">
        <div class="container ">
            <h2 class="h1 flex gap-2 items-center">
                <Icon
                    name="simple-icons:tripadvisor"
                    class="w-8 h-8 "
                />
                Latest TripAdvisor Reviews
            </h2>
        </div>
        <div
            v-if="tripadvisorData"
            class="px-2 overflow-hidden md:px-4 xl:px-6"
        >
            <div class="w-full py-8 overflow-x-scroll ">
                <div class="flex flex-row w-full space-x-4">
                    <div
                        v-for="item in tripadvisorData"
                        :key="item.id"
                        class="flex relative flex-col w-3/4 p-4 gap-2 shadow-lg  min-w-[300px] bg-seashell-400 dark:bg-navy-400"
                    >
                        <div class="flex gap-2">
                            <Icon
                                name="material-symbols:person"
                                class="w-6 h-6 text-butterscotch"
                            />
                            {{ item.user.username }}
                        </div>
                        <div class="flex gap-2">
                            <Icon
                                name="material-symbols:calendar-month-outline-sharp"
                                class="w-6 h-6 text-butterscotch"
                            />
                            {{ shortDateConverter(item.published_date) }}
                        </div>

                        <div class="flex gap-1">
                            <Icon
                                v-for="i in item.rating"
                                :key="i"
                                name="material-symbols:star"
                                class="w-6 h-6 text-butterscotch"
                            />
                        </div>
                        <h3 class="font-krete font-bold text-lg">
                            {{ item.title }}
                        </h3>
                        <div class="">
                            <order-details
                                :details="item.text"
                                :string="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { shortDateConverter } = useDateUtils()

const { data } = await useFetch('/api/tripadvisor')

const tripadvisorData = computed(() => {
    return data.value.data
})

</script>
