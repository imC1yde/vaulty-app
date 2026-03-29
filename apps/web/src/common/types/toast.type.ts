import type { ToastType } from '@src/common/enums/toast-type.enum.ts'

export type Toast = {
  id: number
  message: string
  type: keyof typeof ToastType
}