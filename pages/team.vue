<template>
    <div class="container mx-auto flex w-full flex-col px-10 pb-32 pt-0">
        <h1 class="h1 mb-8">The Team</h1>

        <ul
            v-if="team"
            class="mx-auto grid max-w-screen-3xl grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        >
            <li
                v-for="member in team"
                :key="member.id"
                class="mx-auto max-w-[280px]"
            >
                <div class="flex w-full overflow-hidden">
                    <SanityImage
                        :asset-id="`${member.image.asset._ref}`"
                        auto="format"
                        fit="crop"
                        class="h-full w-full object-cover"
                        :fp-x="member.image.hotspot?.x"
                        :fp-y="member.image.hotspot?.y"
                        w="500"
                        h="700"
                    />
                </div>
                <ul
                    class="card relative mx-2 -mt-16 flex flex-col p-4 text-xs shadow-lg md:mx-4 md:-mt-6"
                >
                    <li class="font-krete text-lg">
                        {{ member.name }}
                    </li>
                    <li
                        class="flex flex-row items-center justify-between gap-2 font-krete text-sm"
                    >
                        {{ member.role }}
                    </li>

                    <li
                        class="flex flex-row items-center justify-between gap-2"
                    >
                        <Icon
                            :name="
                                member.managerKeyHolder
                                    ? `material-symbols:check`
                                    : 'iconamoon:sign-times-fill'
                            "
                            :class="
                                member.managerKeyHolder
                                    ? `text-green-500`
                                    : `text-red-500`
                            "
                        />
                        Key Holder
                    </li>
                    <li
                        class="flex flex-row items-center justify-between gap-2"
                    >
                        <Icon name="heroicons:cake-16-solid" />
                        <span>{{
                            member.birthday
                                ? dateConverterNoYear(member.birthday)
                                : '--'
                        }}</span>
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
