<template>
    <li
        :key="task.value"
        class="flex flex-col  w-1/4 min-w-[100px] items-start gap-2 p-4 bg-white shadow-lg card mr-4 relative"
    >
        <div class="absolute top-0 px-2 rounded-lg  left-0 text-tuscany-500 dark:text-navy-50 bg-butterscotch-200 -mt-2 ml-2 flex items-center gap-1 text-2xs dark:bg-navy-700">
            <Icon
                name="mdi:repeat"
                class="w-3 h-3  "
            />
            <span>{{ task.frequency }} days</span>
        </div>
        {{ task.name }}
        <!-- <div class="flex justify-between items-center w-full gap-4">
                                <span class="flex items-center gap-2 relative">
                                    <div class="flex flex-col">
                                        <span class="text-2xs">{{ link.brow }}</span>
                                        <h3 class="font-krete">{{ link.title }}</h3>
                                    </div>
                                </span>
                                <div class=" absolute top-0 right-0 -mt-2 mr-1">
                                    <checks-status
                                        :is-complete="link.status.isComplete"
                                        :due-time="link.status.dueTime"
                                        :display-text="link.status.displayText"
                                    />
                                </div>
                            </div>
                            <ul
                                v-if="!basic"
                                class="flex flex-row items-center gap-2 text-2xs mt-auto"
                            >
                                <li
                                    v-for="subnav in link.subnav"
                                    :key="subnav.url"
                                >
                                    <nuxt-link
                                        v-if="subnav.url"
                                        :to="subnav.url"
                                        :target="subnav.blank ? '_blank' : null"
                                        class="flex flex-row button items-center gap-1 p-0.5 px-1"
                                    >
                                        {{ subnav.title }}

                                        <Icon
                                            v-if="subnav.blank"
                                            name="iconamoon:link-external-fill"
                                            class="w-3 h-3 transition-all duration-300 hover:rotate-90"
                                        />
                                    </nuxt-link>
                                </li>
                            </ul> -->
    </li>
</template>

<script setup>

defineProps({
    task: {
        type: Object,
        required: true
    }
})
</script>
