export const BASE_ROUTES = {
  HOME: '/',
  AUTH: '/authorize',
  INVENTORY: '/inventory'
} as const

export const APP_ROUTES = {
  CUSTOM: `${BASE_ROUTES.INVENTORY}/custom`,
  GAMES: `${BASE_ROUTES.INVENTORY}/games`,
  SIGN_UP: `${BASE_ROUTES.AUTH}/sign-up`,
  SIGN_IN: `${BASE_ROUTES.AUTH}/sign-in`
}

