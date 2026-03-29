export const ToastType = {
  INFO: 'Info',
  ERROR: 'Error'
} as const

export type ToastType = keyof typeof ToastType