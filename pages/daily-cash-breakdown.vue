<template>
    <div class="flex flex-col w-full max-w-screen-md px-10 pt-0 pb-32 mx-auto">
        <h1 class="mb-8 h1">
            Daily Cash Breakdown
        </h1>

        <div
            v-if="state.hasSent"
            class="flex flex-row items-center gap-6 p-4 mb-8 border border-green-500"
        >
            <Icon
                name="noto-v1:party-popper"
                class="w-12 h-12 animate-pulse"
            />
            <div>
                <h2 class="h2">
                    Yeah, we all good!
                </h2>
                <p> All sent, thanks.</p>
            </div>
        </div>

        <div
            v-if="state.hasErrored"
            class="flex flex-row items-center gap-6 p-4 mb-8 border border-red-500"
        >
            <Icon
                name="noto:skull-and-crossbones"
                class="w-12 h-12 animate-ping"
            />
            <div>
                <h2 class="h2">
                    Hmmm...
                </h2>
                <p> Looks like something isn't behaving. Please let Dan know pronto.</p>
                <p>
                    In the meantime, let's go old school and <a
                        class="underline"
                        href="https://forms.gle/ain6gfLguMcnRQsa7"
                        target="_blank"
                    >use this form</a>.
                </p>
            </div>
        </div>

        <form
            v-if="!state.isSending && !state.hasSent && !state.hasErrored"
            id="daily-cash-breakdown"
            ref="dailyCashBreakdown"
            class="flex flex-col gap-8 daily-cash-breakdown-form"
            name="daily-cash-breakdown"
            @submit.prevent="submitToGoogleSheets"
        >
            <div class="flex flex-col">
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

                        <div class="absolute left-0 flex w-12 h-12 p-1 overflow-hidden -translate-y-1/2 rounded-full daily-cash-breakdown-form__img-wrapper aspect-square top-1/2">
                            <img
                                :alt="member.name"
                                :src="`${member?.picture?.url}?w=50`"
                                class="object-cover w-full h-full rounded-full"
                            >
                        </div>
                        <span class="pl-8 daily-cash-breakdown-form__member-name">{{ member.name }}</span>
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

                        <div class="absolute left-0 flex w-12 h-12 p-1 overflow-hidden -translate-y-1/2 rounded-full daily-cash-breakdown-form__img-wrapper aspect-square top-1/2">
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
                            class="w-full mt-4 lg:mt-2"
                            type="text"
                            placeholder="Hello, who are you?"
                            name="Other team member"
                        >
                    </label>
                </div>
            </div>
            <div>
                <h2 class=" h4">
                    Waste
                </h2>
                <p class="mb-4">
                    Have you put waste through the till?
                </p>
                <label
                    class="flex flex-row items-center gap-2"
                >
                    <input
                        type="radio"
                        required
                        value="yes"
                        name="Waste thru till"
                    >
                    <span>Yes</span>
                </label>
                <label
                    class="flex flex-row items-center gap-2"
                >
                    <input
                        type="radio"
                        required
                        value="No, zero waste to declare"
                        name="Waste thru till"
                    >
                    <span>No, zero waste to declare</span>
                </label>
                <label
                    class="flex flex-row items-center gap-2"
                >
                    <input
                        type="radio"
                        required
                        value="No, see notes"
                        name="Waste thru till"
                    >
                    <span>No, see notes</span>
                </label>
            </div>
            <daily-cash-breakdown-collection
                collection-brow="(Black tin)"
                collection="Banking"
                collection-style="bg-black"
            />
            <daily-cash-breakdown-collection
                collection="Till float"
                collection-style="bg-butterscotch-500"
            />
            <daily-cash-breakdown-collection-safe
                collection-brow="(Red tin)"
                collection="Safe"
                collection-style="bg-red-500"
            />
            <textarea
                placeholder="Notes and comments"
                class="h-40"
                name="Comments"
            />
            <button
                type="submit"
                class="button"
            >
                I'm done, submit!
            </button>
        </form>
        <div
            v-else-if="state.isSending"
            class=""
        >
            Sending, please wait...
        </div>
    </div>
</template>
<script setup>

const dailyCashBreakdown = ref()

const runtimeConfig = useRuntimeConfig()

const scriptURL = runtimeConfig.public.GOOGLE_SHEETS_SCRIPT_DAILY_CASH_BREAKDOWN
// const form = document.forms['submit-to-google-sheet']

const submitToGoogleSheets = () => {
    const formData = new FormData(dailyCashBreakdown.value)
    state.isSending = true
    state.hasSent = false
    fetch(scriptURL, { method: 'POST', body: formData })
        .then((response) => {
            console.log('Success!', response)
            state.isSending = false
            state.hasSent = true
        })
        .catch(error => console.error('Error!', error.message))
}

useHead({
    title: 'Daily Cash Breakdown'
})

const toggleIsOtherSelected = (value) => {
    state.isOtherSelected = value ?? !state.isOtherSelected
}

const state = reactive({
    isOtherSelected: false,
    isSending: false,
    hasSent: false,
    hasErrored: false
})

const otherSelected = computed(() => {
    return state.isOtherSelected
})

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
