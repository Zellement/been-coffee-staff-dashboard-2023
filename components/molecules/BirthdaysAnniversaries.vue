<template>
    <div
        v-if="hasTeamMembersToShow"
        class="relative"
    >
        <div class="px-2 overflow-hidden md:px-4">
            <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
                <div
                    v-for="member in teamWithBirthdays"
                    :key="member.id"
                    class="relative flex w-full overflow-hidden"
                >
                    <div class="flex w-full overflow-hidden relative aspect-[4/5]">
                        <div class="absolute bottom-0 left-0 right-0 w-full h-1/2 bg-navy-500/50">
                            <lottie-happy-birthday
                                :key="`lottie___birthday__${member.id}`"
                            />
                        </div>
                        <span class="absolute bottom-0 p-4 text-3xl text-white -translate-x-1/2 left-1/2 left font-riverside">{{ member.name }}</span>
                        <img
                            :alt="member.name"
                            :src="`${member?.picture?.url}?w=300`"
                            class="object-cover w-full h-full"
                        >
                    </div>
                </div>
                <div
                    v-for="member in teamWithAnniversaries"
                    :key="member.id"
                    class="relative flex w-full overflow-hidden"
                >
                    <div class="flex w-full overflow-hidden relative aspect-[4/5]">
                        <div class="absolute bottom-0 left-0 right-0 w-full h-2/3 bg-gradient-to-t from-seashell-600">
                            <lottie-celebration
                                :key="`lottie__celeb__${member.id}`"
                                class=""
                            />
                        </div>
                        <img
                            :alt="member.name"
                            :src="`${member?.picture?.url}?w=300`"
                            class="object-cover w-full h-full"
                        >
                        <span class="absolute bottom-0 right-0 flex flex-col w-12 p-px pr-2 leading-none text-right rounded-tl-full text-2xs font-riverside bg-navy text-butterscotch aspect-square">
                            <span class="flex flex-col my-auto ml-auto">

                                <span class="text-xl leading-none ">{{ yearFinder(member.startDate) }}</span>

                                <span class="leading-none">{{ yearFinder(member.startDate) === 1 ? 'Year' : 'Years' }}</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { dateConverterNoYear, dateConverterYearOnly } from '@/scripts/helpers'
import { useTeamStore } from '@/stores/team'

const todaysDate = new Date()

const todaysDateWithoutYear = dateConverterNoYear(todaysDate)
const thisYear = computed(() => {
    return dateConverterYearOnly(todaysDate)
})

const teamStore = useTeamStore()

const team = computed(() => {
    return teamStore.currentTeam
})

const yearFinder = (startYear) => {
    return dateConverterYearOnly(thisYear.value) - dateConverterYearOnly(startYear)
}

const teamWithBirthdays = computed(() => {
    const teamMembers = []
    team.value.forEach((member) => {
        if (dateConverterNoYear(member.birthday) === todaysDateWithoutYear) {
            return teamMembers.push(member)
        }
    })
    return teamMembers
})

const teamWithAnniversaries = computed(() => {
    const teamMembers = []
    team.value.forEach((member) => {
        if ((dateConverterNoYear(member.startDate) === todaysDateWithoutYear) && dateConverterYearOnly(member.startDate) !== dateConverterYearOnly(todaysDate)) {
            return teamMembers.push(member)
        }
    })
    return teamMembers
})

const hasTeamMembersToShow = computed(() => {
    return teamWithBirthdays.value.length > 0 || teamWithAnniversaries.value.length > 0
})

</script>
