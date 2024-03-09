<template>
    <div
        v-if="team?.length"
        class="relative"
    >
        <div class="container flex flex-row justify-between">
            <h2 class="h1">
                Team
            </h2>
            <nuxt-link
                class="button"
                to="/team"
            >
                See the whole team
            </nuxt-link>
        </div>
        <div class="px-2 overflow-hidden md:px-4">
            <div class="w-full py-8 overflow-x-scroll">
                <div class="flex flex-row space-x-4">
                    <div
                        v-for="item in team"
                        :key="item.id"
                        class="relative w-80 min-w-[200px] flex"
                    >
                        <span class="absolute bottom-0 left-0 flex flex-col px-2 py-1 text-xs rounded-tr bg-seashell dark:bg-navy-500">
                            <span class="leading-tight">{{ item.name }}</span>
                            <span class="leading-tight opacity-50 text-2xs">{{ item.role }}</span>
                        </span>
                        <span class="absolute bottom-0 right-0 flex flex-col items-end px-2 py-1 text-xs rounded-tl bg-seashell dark:bg-navy-500">
                            <span class="leading-tight opacity-50 text-2xs">Started on</span>
                            <span class="leading-tight text-2xs">{{ dateConverter(item.startDate) }}</span>
                        </span>
                        <div class="flex w-full overflow-hidden">
                            <img
                                :src="$urlFor(item.image).width(400).height(700).url()"
                                height="400"
                                width="700"
                                loading="lazy"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { dateConverter } from '@/scripts/helpers'
import { useTeamStore } from '@/stores/team'

const teamStore = useTeamStore()

const team = computed(() => {
    return teamStore.currentTeam
})

console.log(team.value)

</script>
