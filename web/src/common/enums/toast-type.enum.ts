export const ToastType = {
  INFO: 'Info',
  ERROR: 'Error'
} as const

export type ToastType = typeof ToastType[keyof typeof ToastType]