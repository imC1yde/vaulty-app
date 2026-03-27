import type { Nullable } from '@src/common/types/nullable.type.ts'
import type { User } from '@src/common/types/user.type.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IProfileStore {
  token: Nullable<string>
  user: Nullable<User>
  setProfile: (token: string, user: User) => void
  clearProfile: () => void
}

export const useProfileStore = create<IProfileStore>()(persist((set) => ({
    token: null,
    user: null,
    setProfile: (token: string, user: User) => set({
      token: token,
      user: user
    }),
    clearProfile: () => set({
      token: null,
      user: null
    })
  }),
  {
    name: 'app-profile-storage',
    storage: createJSONStorage(() => localStorage)
  }
))