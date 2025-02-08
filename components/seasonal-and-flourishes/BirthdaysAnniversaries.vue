<template>
    <div v-if="hasTeamMembersToShow" class="relative">
        <div class="overflow-hidden px-2 md:px-4">
            <h2 class="h1 mb-8">Celebrations today!</h2>
            <div
                class="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
            >
                <div
                    v-for="member in teamWithBirthdays"
                    :key="member.id"
                    class="relative flex w-full overflow-hidden"
                >
                    <div
                        class="relative flex aspect-[4/5] w-full overflow-hidden"
                    >
                        <div
                            class="absolute bottom-0 left-0 right-0 h-1/2 w-full bg-navy-500/50"
                        >
                            <lottie-happy-birthday
                                :key="`lottie___birthday__${member.id}`"
                            />
                        </div>
                        <span
                            class="left absolute bottom-0 left-1/2 -translate-x-1/2 p-4 font-riverside text-3xl text-white"
                            >{{ member.name }}</span
                        >
                        <img
                            :src="
                                $urlFor(member.image)
                                    .width(600)
                                    .height(1000)
                                    .url()
                            "
                            height="400"
                            width="700"
                            loading="lazy"
                            class="h-full w-full object-cover"
                        />
                    </div>
                </div>
                <div
                    v-for="member in teamWithAnniversaries"
                    :key="member.id"
                    class="relative flex w-full overflow-hidden"
                >
                    <div
                        class="relative flex aspect-[4/5] w-full overflow-hidden"
                    >
                        <div
                            class="absolute bottom-0 left-0 right-0 h-2/3 w-full bg-gradient-to-t from-seashell-600"
                        >
                            <lottie-celebration
                                :key="`lottie__celeb__${member.id}`"
                                class=""
                            />
                        </div>
                        <img
                            :src="
                                $urlFor(member.image)
                                    .width(600)
                                    .height(1000)
                                    .url()
                            "
                            height="400"
                            width="700"
                            loading="lazy"
                            class="h-full w-full object-cover"
                        />
                        <span
                            class="absolute bottom-0 right-0 flex aspect-square w-12 flex-col rounded-tl-full bg-navy p-px pr-2 text-right font-riverside text-2xs leading-none text-butterscotch"
                        >
                            <span class="my-auto ml-auto flex flex-col">
                                <span class="text-xl leading-none">{{
                                    yearFinder(member.startDate)
                                }}</span>

                                <span class="leading-none">{{
                                    yearFinder(member.startDate) === 1
                                        ? 'Year'
                                        : 'Years'
                                }}</span>
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
    return (
        dateConverterYearOnly(thisYear.value) - dateConverterYearOnly(startYear)
    )
}

const teamWithBirthdays = computed(() => {
    const teamMembers = []
    team.value?.forEach((member) => {
        if (dateConverterNoYear(member.birthday) === todaysDateWithoutYear) {
            return teamMembers.push(member)
        }
    })
    return teamMembers
})

const teamWithAnniversaries = computed(() => {
    const teamMembers = []
    team.value?.forEach((member) => {
        if (
            dateConverterNoYear(member.startDate) === todaysDateWithoutYear &&
            dateConverterYearOnly(member.startDate) !==
                dateConverterYearOnly(todaysDate)
        ) {
            return teamMembers.push(member)
        }
    })
    return teamMembers
})

const hasTeamMembersToShow = computed(() => {
    return (
        (teamWithBirthdays.value && teamWithBirthdays.value.length > 0) ||
        (teamWithAnniversaries.value && teamWithAnniversaries.value.length > 0)
    )
})
</script>
