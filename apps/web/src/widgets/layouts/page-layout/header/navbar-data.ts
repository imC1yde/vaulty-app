import { AppRoutes, BaseRoute } from '@src/common/enums/routes.enum.ts'

export const navbarData: [ string, string ][] = [
  [ 'Главная', BaseRoute.HOME ],
  [ 'Инвентарь', AppRoutes.CUSTOM ],
  [ 'Игры', AppRoutes.GAMES ]
]