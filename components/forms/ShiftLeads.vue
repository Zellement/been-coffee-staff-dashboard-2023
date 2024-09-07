<template>
    <div class="flex flex-col shift-leads">
        <h2 class="mb-4 h4">
            Lead
        </h2>
        <div
            v-if="hasTeam"
            class="flex flex-col md:flex-row md:flex-wrap md:gap-8"
        >
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
                        v-if="member.image"
                        :alt="member.name"
                        :src="$urlFor(member.image).width(60).height(60).url()"
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

const query = groq`*[_type == "teamMember" && managerKeyHolder && !formerEmployee]|order(name asc){
    name,
      image
}
`

const sanity = useSanity()

const { data } = await useAsyncData('latestUpdatedArticles', () => sanity.fetch(query))

const hasTeam = computed(() => {
    return data.value && data.value.length > 0
})
const team = computed(() => {
    return data.value
})

</script>
