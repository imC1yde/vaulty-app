import { APP_ROUTES, BASE_ROUTES } from '@src/common/constants/routes.constant.ts'

export const navbarData: [ string, string ][] = [
  [ 'Главная', BASE_ROUTES.HOME ],
  [ 'Инвентарь', APP_ROUTES.CUSTOM ],
  [ 'Игры', APP_ROUTES.GAMES ]
]