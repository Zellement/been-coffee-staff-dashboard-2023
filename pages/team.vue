<template>
    <div class="container flex flex-col w-full px-10 pt-0 pb-32 mx-auto">
        <h1 class="mb-8 h1">
            The Team
        </h1>

        <ul
            v-if="team"
            class="grid grid-cols-1 gap-6 mx-auto max-w-screen-3xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-8"
        >
            <li
                v-for="member in team"
                :key="member.id"
                class="max-w-[280px] mx-auto"
            >
                <div class="flex w-full overflow-hidden">
                    <SanityImage
                        :asset-id="`${member.image.asset._ref}`"
                        auto="format"
                        fit="crop"
                        class="object-cover w-full h-full"
                        :fp-x="member.image.hotspot?.x"
                        :fp-y="member.image.hotspot?.y"
                        w="500"
                        h="700"
                    />
                </div>
                <ul class="relative flex flex-col p-4 mx-2 -mt-16 text-xs  shadow-lg card  md:mx-4 md:-mt-6">
                    <li class="text-lg font-krete">
                        {{ member.name }}
                    </li>
                    <li
                        class="flex flex-row items-center justify-between gap-2 text-sm font-krete "
                    >
                        {{ member.role }}
                    </li>

                    <li
                        class="flex flex-row items-center justify-between gap-2"
                    >
                        <Icon
                            :name="member.managerKeyHolder ? `material-symbols:check` : 'iconamoon:sign-times-fill'"
                            :class="member.managerKeyHolder ? `text-green-500` : `text-red-500`"
                        />
                        Key Holder
                    </li>
                    <li
                        class="flex flex-row items-center justify-between gap-2"
                    >
                        <Icon name="heroicons:cake-16-solid" />
                        <span>{{ member.birthday ? dateConverterNoYear(member.birthday) : '--' }}</span>
                    </li>
                    <li
                        class="flex flex-row items-center justify-between gap-2"
                    >
                        <Icon name="material-symbols-light:play-circle" />
                        {{ dateConverter(member.startDate) }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { dateConverterNoYear, dateConverter } from '@/scripts/helpers'

import { useTeamStore } from '@/stores/team'

const teamStore = useTeamStore()

const team = computed(() => {
    return teamStore.currentTeam
})

useHead({
    title: 'The Team'
})

</script>
