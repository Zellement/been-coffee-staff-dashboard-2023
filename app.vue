<template>
    <div>
        <NuxtPwaManifest />
        <NuxtLoadingIndicator
            color="#D05C32"
            :height="3"
        />
        <NuxtLayout>
            <NuxtPage
                :transition="{
                    name: 'page',
                    mode: 'out-in'
                }"
            />
        </NuxtLayout>
    </div>
</template>

<script setup>

const teamStore = useTeamStore()
const supabaseStore = useSupabaseStore()
const reviewsStore = useReviewsStore()
const routineTasksStore = useRoutineTasksStore()

teamStore.fetchCurrentTeam()
supabaseStore.fetchAllChecks()
reviewsStore.fetchAllReviews()
routineTasksStore.fetchAllRoutineTasks()

useHead({
    meta: [
        {
            name: 'theme-color',
            content: '#FAB944'
        }
    ]
})

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
    @apply opacity-0 translate-y-4;
}

</style>
