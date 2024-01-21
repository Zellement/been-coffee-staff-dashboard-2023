<template>
    <div class="flex flex-col w-full container px-10 pt-0 pb-32 mx-auto">
        <h1 class="mb-8 h1">
            The Team
        </h1>

        <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
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
                <ul class="flex flex-col p-4 bg-butterscotch-200 rounded shadow-xl text-xs dark:bg-black mx-2 -mt-2 md:mx-4 md:-mt-4 relative">
                    <li
                        class="flex flex-row items-center justify-between gap-2 font-krete text-sm"
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
const QUERY = `
query {
    allTeams(filter: {formerEmployee: {eq: "false"}}) {
        id
        name
        position
        picture {
            responsiveImage {
                alt
                base64
                bgColor
                title
                srcSet
                }
            url
            }
        role
        managerKeyHolder
        startDate
        birthday
        }
    }
`

const team = computed(() => {
    return data.value?.allTeams
})

const { data } = await useGraphqlQuery({ query: QUERY })

useHead({
    title: 'The Team'
})

</script>
