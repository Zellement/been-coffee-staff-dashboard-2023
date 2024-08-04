import { defineStore } from 'pinia'

export const useReviewsStore = defineStore('reviews', {
    state: () => ({
        reviewsTripadvisor: null
    }),
    getters: {
    },
    actions: {
        async fetchTripAdvisorReviews () {
            const client = useSupabaseClient()
            const { data } = await client.from('reviews').select('reviews_tripadvisor').eq('id', 1)

            if (data[0].reviews_tripadvisor && data[0].reviews_tripadvisor.length > 0) {
                this.reviewsTripadvisor = data[0].reviews_tripadvisor
            } else {
                const { data } = await useFetch('/api/tripadvisor')
                await client
                    .from('reviews')
                    .update({ reviews_tripadvisor: data.value.data })
                    .eq('id', 1)
                this.reviewsTripadvisor = data.value.data
            }
        },
        async fetchAllReviews () {
            this.fetchTripAdvisorReviews()
        }

    }
})
