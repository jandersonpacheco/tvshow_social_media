import { googleLogout } from '@react-oauth/google'
import { create } from 'zustand'

const SSOUserInfo = create((set) => ({
    profile: '',
    setProfile: ((userInfo) => set ({ profile: userInfo })),

    logout: (navigate) => {
        googleLogout()
        set({profile: ''})
        //navigate('/')
    }
}))

export default SSOUserInfo
