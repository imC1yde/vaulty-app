export const BASE_ROUTES = {
  HOME: '/',
  AUTH: '/authorize',
  INVENTORY: '/inventory'
} as const

export const APP_ROUTES = {
  CUSTOM: `${BASE_ROUTES.INVENTORY}/custom`,
  GAMES: `${BASE_ROUTES.INVENTORY}/games`
}

