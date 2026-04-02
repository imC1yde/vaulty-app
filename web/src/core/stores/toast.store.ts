import type { ToastType } from '@src/common/enums/toast-type.enum.ts'
import type { Toast } from '@src/common/types/toast.type.ts'
import { create } from 'zustand'

interface IToastStore {
  toasts: Toast[]
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<IToastStore>((set) => ({
  toasts: [],
  addToast: (message: string, type: ToastType) => {
    const id = Date.now();
    set((state) => ({ toasts: [ ...state.toasts, { id, message, type } ] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id: number) =>
    set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }))
}))