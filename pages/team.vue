<template>
    <div class="container flex flex-col w-full px-10 pt-0 pb-32 mx-auto">
        <h1 class="mb-8 h1">
            The Team
        </h1>

        <ul class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8">
            <li
                v-for="member in team"
                :key="member.id"
            >
                <h3 class="h4">
                    {{ member.name }}
                </h3>
                <div class="flex w-full overflow-hidden aspect-[4/5]">
                    <img
                        :alt="member.name"
                        :src="`${member?.picture?.url}?w=300`"
                        class="object-cover w-full h-full"
                    >
                </div>
                <ul class="relative flex flex-col p-4 mx-2 -mt-2 text-xs rounded shadow-xl bg-butterscotch-200 dark:bg-black md:mx-4 md:-mt-4">
                    <li
                        class="flex flex-row items-center justify-between gap-2 text-sm font-krete"
                    >
                        {{ member.role }}
                    </li>

                    <li
                        class="flex flex-row items-center justify-between gap-2"
                    >
                        <Icon
                            :name="member.managerKeyHolder ? `material-symbols:person-check` : 'iconamoon:sign-times-fill'"
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
