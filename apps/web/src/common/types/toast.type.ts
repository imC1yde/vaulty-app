import type { ToastType } from '@src/common/constants/toast-type.constant.ts'

export type Toast = {
  id: number
  message: string
  type: keyof typeof ToastType
}