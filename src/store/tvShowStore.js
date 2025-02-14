import { create} from "zustand"

const useTvShowStore = create((set) => ({
    search: '',
    setSearch: (show) => set ({search: show}),

    trendingPage: 1,
    setTrendingPage: (page) => set ({pageTrending: page}),
    popularPage: 1,
    setPopularPage: (page) => set ({pagePopular: page}),
    ratingPage: 1,
    setRatingPage: (page) => set ({pageRating: page}),

    nextTrendingPage: () => set((state) =>({trendingPage: state.trendingPage + 1})),
    prevTrendingPage: () => set((state) =>({trendingPage: Math.max(state.trendingPage - 1, 1)})),
    nextPopularPage: () => set ((state) =>({popularPage: state.popularPage + 1})),
    prevPopularPage: () => set ((state) => ({popularPage: Math.max(state.popularPage -1, 1)})),
    nextRatingPage: () => set ((state) =>({ratingPage: state.ratingPage +1})),
    prevRatingPage: () => set ((state) =>({ratingPage: Math.max(state.ratingPage -1, 1)}))
}))

export default useTvShowStore