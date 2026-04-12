export const BaseRoutes = {
  HOME: '/',
  AUTH: '/authorize',
  INVENTORY: '/inventory'
} as const

export const AppRoutes = {
  CUSTOM: `${BaseRoutes.INVENTORY}/custom`,
  GAMES: `${BaseRoutes.INVENTORY}/games`,
  SIGN_UP: `${BaseRoutes.AUTH}/sign-up`,
  SIGN_IN: `${BaseRoutes.AUTH}/sign-in`
} as const

export type Route = typeof BaseRoutes[keyof typeof BaseRoutes] | typeof AppRoutes[keyof typeof AppRoutes]

