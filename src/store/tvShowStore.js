import { create} from "zustand"

const useTvShowStore = create((set) => ({
    search: '',
    setSearch: (show) => set ({search: show})
}))

export default useTvShowStore