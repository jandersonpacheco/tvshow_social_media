import { create } from 'zustand'
import { googleLogout } from '@react-oauth/google'

const useUserStore = create((set) => ({
  // Estado do usuário
  userLogin: null,           // dados do usuário (login normal)
  ssoUser: null,        // dados do SSO (Google)
  
  // Métodos
  setUserLogin: (data) => set({ userLogin: data }),
  setSsoUser: (data) => set({ ssoUser: data }),

  // Logout unificado
  logout: () => {
    googleLogout()      // encerra sessão SSO se existir
    set({ user: null, ssoUser: null })
  }
}))

export default useUserStore