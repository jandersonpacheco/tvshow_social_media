import { create} from "zustand"

const useTvShowStore = create((set) => ({
    search: '',
    setSearch: (show) => set((state) => ({
        search: show
    }))
}))

export default useTvShowStore