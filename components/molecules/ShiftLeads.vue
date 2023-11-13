<template>
    <div class="flex flex-col shift-leads">
        <h2 class="mb-4 h4">
            Close lead
        </h2>
        <div class="flex flex-col md:flex-row md:flex-wrap md:gap-8">
            <label
                v-for="member in team"
                :key="member.id"
                class="relative flex flex-row items-center gap-2 py-3"
            >
                <input
                    type="radio"
                    name="Team member"
                    :value="member.name"
                    class="ml-2 opacity-0"
                    required
                    @click="toggleIsOtherSelected(false)"
                >

                <div class="absolute left-0 flex w-12 h-12 p-1 overflow-hidden -translate-y-1/2 rounded-full shift-leads__img-wrapper aspect-square top-1/2">
                    <img
                        :alt="member.name"
                        :src="`${member?.picture?.url}?w=50`"
                        class="object-cover w-full h-full rounded-full"
                    >
                </div>
                <span class="pl-8 shift-leads__member-name">{{ member.name }}</span>
            </label>
            <label
                class="relative flex flex-row items-center gap-2 py-3"
            >
                <input
                    type="radio"
                    name="Team member"
                    required
                    value="Other"
                    class="ml-2 opacity-0"
                    @click="toggleIsOtherSelected(true)"
                >

                <div class="absolute left-0 flex w-12 h-12 p-1 overflow-hidden -translate-y-1/2 rounded-full shift-leads__img-wrapper aspect-square top-1/2">
                    <img
                        alt="Placeholder"
                        src="@/assets/images/been-staff-dashboard.png"
                        class="object-cover w-full h-full rounded-full"
                    >
                </div>
                <span class="pl-8">Other</span>
            </label>
            <label v-if="otherSelected">
                <input
                    class="w-full p-1 mt-4 md:mt-2"
                    type="text"
                    placeholder="Hello, who are you?"
                    name="Other team member"
                >
            </label>
        </div>
    </div>
</template>

<script setup>

const state = reactive({
    isOtherSelected: false
})

const otherSelected = computed(() => {
    return state.isOtherSelected
})

const toggleIsOtherSelected = (value) => {
    state.isOtherSelected = value ?? !state.isOtherSelected
}

const QUERY = `
query {
    allTeams(orderBy: name_ASC, filter: {managerKeyHolder: {eq: "true"}}) {
        id
        name
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
        }
    }
`
const { data } = await useGraphqlQuery({ query: QUERY })

const team = computed(() => {
    return data.value?.allTeams
})
</script>
