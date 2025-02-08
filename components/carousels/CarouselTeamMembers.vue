<template>
    <div v-if="team?.length" class="relative">
        <div class="container flex flex-row justify-between">
            <h2 class="h1">Team</h2>
            <nuxt-link class="button" to="/team">
                See the whole team
            </nuxt-link>
        </div>
        <carousel-wrapper>
            <li
                v-for="item in team"
                :key="item.id"
                class="relative flex w-full min-w-[200px] lg:min-w-[240px]"
            >
                <span
                    class="absolute bottom-0 left-0 flex flex-col items-start"
                >
                    <span
                        class="translate-y-px !rounded-none bg-white px-2 py-1 font-serif text-base leading-tight dark:bg-navy dark:text-white"
                        >{{ item.name }}</span
                    >
                    <span
                        class="!rounded-none bg-white px-2 py-1 text-2xs leading-tight dark:bg-navy dark:text-white"
                        >{{ item.role }}</span
                    >
                </span>
                <div class="flex w-full overflow-hidden">
                    <img
                        :src="$urlFor(item.image).width(450).height(700).url()"
                        height="450"
                        width="700"
                        loading="lazy"
                    />
                </div>
            </li>
        </carousel-wrapper>
    </div>
</template>

<script setup>
import { useTeamStore } from '@/stores/team'

const teamStore = useTeamStore()

const team = computed(() => {
    return teamStore.currentTeam
})
</script>
