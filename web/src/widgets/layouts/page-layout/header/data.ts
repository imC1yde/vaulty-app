import { AppRoutes, BaseRoutes } from '@src/common/enums/routes.enum.ts'

export const data: [ string, string ][] = [
  [ 'Главная', BaseRoutes.HOME ],
  [ 'Инвентарь', AppRoutes.CUSTOM ],
  [ 'Игры', AppRoutes.GAMES ]
]