import type { EsrbRating } from '@src/common/enums/esrb-rating.enum.ts'
import type { IGame, IPartialGame } from '@src/common/interfaces/game.interface.ts'
import type { Nullable } from '@src/common/utilities/nullable.util'

export interface IGetAllGamesData {
  getAllGames: {
    data: IPartialGame[]
    totalPages: number
    totalCount: number
    hasNextPage: boolean
  }
}

export interface IGetAllGamesVariables {
  input: {
    page: number
    pageSize: number
  },
  filter?: {
    name: Nullable<string>
    rating: Nullable<number>
    isCompleted: Nullable<boolean>
    genres: Nullable<string[]>
    platforms: Nullable<string[]>
    esrbRating: Nullable<EsrbRating>
  }
}

export interface IGetGameData {
  getGameById: IGame
}

export interface IGetGameVariables {
  id: string
}