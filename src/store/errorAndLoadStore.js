import { create} from "zustand"

const useErrorAndLoadStore = create((set) => ({
    loading: true,
    setLoading: (loading) => set({loading}),
    
    error: null,
    setError: (error) => set({error}),    
}))

export default useErrorAndLoadStore