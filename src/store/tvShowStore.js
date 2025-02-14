import { create} from "zustand"

const useTvShowStore = create((set) => ({
    search: '',
    setSearch: (show) => set ({search: show}),

    pageTrending: 1,
    setPageTrending: (page) => set ({pageTrending: page}),
    pagePopular: 1,
    setPagePopular: (page) => set ({pagePopular: page}),
    pageRating: 1,
    setPageRating: (page) => set ({pageRating: page}),

    nextPageTrending: () => set((state) =>({pageTrending: state.pageTrending + 1})),
    prevPageTrending: () => set((state) =>({pageTrending: Math.max(state.pageTrending - 1, 1)})),
    nextPagePopular: () => set ((state) =>({pagePopular: state.pagePopular + 1})),
    prevPagePopular: () => set ((state) => ({pagePopular: Math.max(state.pagePopular -1, 1)})),
    nextPageRating: () => set ((state) =>({pageRating: state.pageRating +1})),
    prevPageRating: () => set ((state) =>({pageRating: Math.max(state.pageRating -1, 1)}))
}))

export default useTvShowStore