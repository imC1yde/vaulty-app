export const BaseRoute = {
  HOME: '/',
  AUTH: '/authorize',
  INVENTORY: '/inventory'
} as const

export const AppRoutes = {
  CUSTOM: `${BaseRoute.INVENTORY}/custom`,
  GAMES: `${BaseRoute.INVENTORY}/games`,
  SIGN_UP: `${BaseRoute.AUTH}/sign-up`,
  SIGN_IN: `${BaseRoute.AUTH}/sign-in`
} as const

