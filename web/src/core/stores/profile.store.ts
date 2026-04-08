import type { IUser } from '@src/common/interfaces/user.interface.ts'
import type { Nullable } from '@src/common/utilities/nullable.util.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IProfileStore {
  user: Nullable<IUser>
  isAuthorized: boolean
  isInitialized: boolean
  login: (user: IUser) => void
  setUser: (user: IUser) => void
  clearProfile: () => void
}

export const useProfileStore = create<IProfileStore>()(persist((set) => {
    return {
      user: null,
      isAuthorized: false,
      isInitialized: false,
      login: (user: IUser) => set({
        user: user,
        isAuthorized: true,
        isInitialized: true
      }),
      setUser: (user: IUser) => set({
        user: user
      }),
      clearProfile: () => set({
        user: null,
        isAuthorized: false,
        isInitialized: true
      })
    }
  },
  {
    name: 'profile-storage',
    storage: createJSONStorage(() => localStorage)
  }
))